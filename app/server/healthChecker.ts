import { serviceChecks, incidentStore } from './db.js';

// --- Tjenestekonfigurasjon ---

export interface ServiceConfig {
  id: string;
  name: string;
  url: string;
  parseStatus?: (data: unknown, statusCode: number) => 'operational' | 'degraded' | 'down';
}

const defaultServices: ServiceConfig[] = [
  {
    id: 'platform',
    name: 'Nettsideplattform',
    url: process.env.PLATFORM_HEALTH_URL || 'https://api.menighetsportalen.no/api/health',
    parseStatus: (data: unknown) => {
      const d = data as { status?: string; dbConnected?: boolean };
      if (d?.status === 'ok' && d?.dbConnected) return 'operational';
      if (d?.status === 'ok') return 'degraded';
      return 'down';
    },
  },
  {
    id: 'auth',
    name: 'OAuth-tjeneste',
    url: process.env.AUTH_HEALTH_URL || 'https://auth.menighetsportalen.no/.well-known/openid-configuration',
    // Enhver 2xx/3xx = operational, 5xx = down
  },
  {
    id: 'payment',
    name: 'Betalingstjeneste',
    url: process.env.PAYMENT_HEALTH_URL || 'https://payment.menighetsportalen.no/health',
  },
  {
    id: 'email',
    name: 'E-posttjeneste (Resend)',
    url: 'https://api.resend.com/emails',
    parseStatus: (_data: unknown, statusCode: number) => {
      // 401/403 = API er oppe men vi mangler auth → operational
      // 200 = oppe, 5xx = ned
      if (statusCode >= 200 && statusCode < 500) return 'operational';
      return 'down';
    },
  },
  {
    id: 'opti',
    name: 'Bildeoptimalisering (Opti)',
    url: process.env.OPTI_HEALTH_URL || 'https://opti-api.menighetsportalen.no/health/detailed',
    parseStatus: (data: unknown, statusCode: number) => {
      if (statusCode === 503) return 'degraded';
      const d = data as { status?: string };
      if (d?.status === 'ok') return 'operational';
      if (d?.status === 'degradert') return 'degraded';
      return 'down';
    },
  },
];

// --- Sjekk én tjeneste ---

async function checkService(service: ServiceConfig): Promise<{
  status: 'operational' | 'degraded' | 'down';
  responseTimeMs: number;
  details: string;
}> {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(service.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Menighetsportalen-StatusChecker/1.0' },
    });
    const responseTimeMs = Date.now() - start;

    let data: unknown = null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('json')) {
      try { data = await res.json(); } catch { /* tom */ }
    }

    let status: 'operational' | 'degraded' | 'down';
    if (service.parseStatus) {
      status = service.parseStatus(data, res.status);
    } else {
      status = res.ok ? 'operational' : res.status >= 500 ? 'down' : 'degraded';
    }

    // Treg respons = degradert
    if (status === 'operational' && responseTimeMs > 5000) status = 'degraded';

    return { status, responseTimeMs, details: `HTTP ${res.status}` };
  } catch (err) {
    const responseTimeMs = Date.now() - start;
    const message = err instanceof Error ? err.name : 'Ukjent feil';
    if (message === 'AbortError') {
      return { status: 'down', responseTimeMs, details: 'Tidsavbrudd (10s)' };
    }
    return { status: 'down', responseTimeMs, details: message };
  } finally {
    clearTimeout(timeout);
  }
}

// --- Kjør alle sjekker ---

export async function runAllChecks(): Promise<void> {
  const results = await Promise.allSettled(
    defaultServices.map(async (service) => {
      const result = await checkService(service);
      serviceChecks.insert(service.id, result.status, result.responseTimeMs, result.details);

      // Auto-opprett hendelse hvis tjeneste er nede
      if (result.status === 'down') {
        const active = incidentStore.getActive() as { service: string }[];
        const hasActive = active.some((i) => i.service === service.id);
        if (!hasActive) {
          incidentStore.create(`${service.name} utilgjengelig`, service.id);
        }
      }

      return { service: service.id, ...result };
    })
  );

  const timestamp = new Date().toISOString().slice(0, 19);
  const summary = results
    .map((r) => {
      if (r.status === 'fulfilled') return `${r.value.service}: ${r.value.status} (${r.value.responseTimeMs}ms)`;
      return `feil: ${r.reason}`;
    })
    .join(' | ');
  console.log(`[${timestamp}] Helsesjekk: ${summary}`);
}

// --- Start periodisk overvåkning ---

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startHealthChecker(intervalMs: number = 60_000): void {
  console.log(`Helseovervåkning startet (intervall: ${intervalMs / 1000}s)`);

  // Første sjekk etter 5 sekunder
  setTimeout(() => {
    runAllChecks();
    // Rydd opp gamle detaljerte sjekker (behold 7 dager)
    serviceChecks.cleanup(7);
  }, 5000);

  // Deretter periodisk
  intervalId = setInterval(() => {
    runAllChecks();
  }, intervalMs);
}

export function stopHealthChecker(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function getServiceList() {
  return defaultServices.map((s) => ({ id: s.id, name: s.name }));
}
