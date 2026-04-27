// Server-side Cloudflare Turnstile-validering.
// Hopper over verifisering når TURNSTILE_SECRET_KEY mangler (dev-modus).

const SECRET = process.env.TURNSTILE_SECRET_KEY;
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface VerifyResult {
  success: boolean;
  reason?: string;
}

export async function verifyTurnstile(token: string, remoteIp?: string): Promise<VerifyResult> {
  if (!SECRET) {
    if (!warnedAboutMissingSecret) {
      console.warn('TURNSTILE_SECRET_KEY mangler — hopper over verifisering (dev-modus).');
      warnedAboutMissingSecret = true;
    }
    return { success: true };
  }
  if (!token) return { success: false, reason: 'missing-token' };

  try {
    const params = new URLSearchParams();
    params.set('secret', SECRET);
    params.set('response', token);
    if (remoteIp) params.set('remoteip', remoteIp);

    const res = await fetch(VERIFY_URL, { method: 'POST', body: params });
    const body = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!body.success) {
      return { success: false, reason: body['error-codes']?.[0] || 'verification-failed' };
    }
    return { success: true };
  } catch (err) {
    console.error('Turnstile-verifisering feilet:', err);
    return { success: false, reason: 'network-error' };
  }
}

let warnedAboutMissingSecret = false;
