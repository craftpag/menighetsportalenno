import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Church, ChevronDown, RefreshCw } from 'lucide-react';

// --- Typer ---

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'unknown';
  responseTimeMs: number;
  details: string;
  lastChecked: string | null;
  uptimePercent: number;
}

interface StatusData {
  overall: 'operational' | 'degraded' | 'down';
  services: ServiceStatus[];
  activeIncidents: { id: string; title: string; service: string; status: string; created_at: string }[];
}

interface DailyUptime {
  service: string;
  date: string;
  uptime_percent: number;
  worst_status: string;
}

interface Incident {
  id: string;
  title: string;
  service: string;
  status: string;
  created_at: string;
  resolved_at: string | null;
  updates: { id: string; type: string; message: string; created_at: string }[];
}

// --- Farger ---

const statusColors: Record<string, string> = {
  operational: '#76AD2A',
  degraded: '#FAA72A',
  down: '#E04343',
  unknown: '#94A3B8',
  maintenance: '#2C84DB',
};

const statusLabels: Record<string, string> = {
  operational: 'Operativ',
  degraded: 'Redusert ytelse',
  down: 'Nede',
  unknown: 'Ukjent',
};

const overallLabels: Record<string, string> = {
  operational: 'Alle systemer er operative',
  degraded: 'Noen tjenester har redusert ytelse',
  down: 'Tjenester er utilgjengelige',
};

// --- Oppetidsstolper (90 dager) ---

function UptimeBar({ serviceId, history }: { serviceId: string; history: DailyUptime[] }) {
  const serviceDays = history.filter((d) => d.service === serviceId);

  // Fyll ut 90 dager (manglende dager = 100% oppetid)
  const today = new Date();
  const days = Array.from({ length: 90 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (89 - i));
    const dateStr = date.toISOString().slice(0, 10);
    const found = serviceDays.find((d) => d.date === dateStr);
    return {
      date: dateStr,
      uptime: found?.uptime_percent ?? 100,
      status: found?.worst_status ?? 'operational',
    };
  });

  const getColor = (status: string, uptime: number) => {
    if (status === 'down' || uptime < 90) return statusColors.down;
    if (status === 'degraded' || uptime < 99) return statusColors.degraded;
    return statusColors.operational;
  };

  return (
    <div className="flex gap-[1.5px] items-end">
      {days.map((day) => (
        <div
          key={day.date}
          className="flex-1 h-8 rounded-[1.5px] transition-opacity hover:opacity-70 cursor-default"
          style={{ backgroundColor: getColor(day.status, day.uptime), minWidth: '2px' }}
          title={`${day.date}: ${day.uptime.toFixed(1)}% oppetid`}
        />
      ))}
    </div>
  );
}

// --- Statusmerke for hendelser ---

const incidentBadge: Record<string, { label: string; color: string }> = {
  resolved: { label: 'Løst', color: '#76AD2A' },
  monitoring: { label: 'Overvåker', color: '#2C84DB' },
  investigating: { label: 'Undersøker', color: '#FAA72A' },
};

const updateTypeColors: Record<string, string> = {
  'Løst': '#76AD2A',
  'Overvåker': '#2C84DB',
  'Undersøker': '#FAA72A',
  'Identifisert': '#E86235',
};

// --- Formater tid ---

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
}

// --- Hovedkomponent ---

export function StatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [history, setHistory] = useState<DailyUptime[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statusRes, historyRes, incidentsRes] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/status/history'),
        fetch('/api/status/incidents'),
      ]);
      if (statusRes.ok) setStatus(await statusRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
      if (incidentsRes.ok) setIncidents(await incidentsRes.json());
    } catch {
      // Feilhåndtering — vis forrige data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000); // Oppdater hvert 30. sekund
    return () => clearInterval(interval);
  }, [fetchData]);

  // Generer dato-liste for de siste 14 dagene (for incident-visning)
  const recentDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#DEDCD1' }}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="group">
            <img src="/images/Menighetsportalen Logo.png" alt="Menighetsportalen" className="h-10 transition-transform group-hover:scale-105" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg hover:bg-black/5 transition-colors"
              title="Oppdater"
            >
              <RefreshCw className="w-4 h-4" style={{ color: '#87867F' }} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSubscribe(!showSubscribe)}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-black/5"
                style={{ color: '#141413' }}
              >
                Abonner
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showSubscribe && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSubscribe(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg border p-4 z-20"
                    style={{ backgroundColor: '#fff', borderColor: '#DEDCD1' }}
                  >
                    <p className="text-sm font-medium mb-3" style={{ color: '#141413' }}>
                      Få varsler via e-post
                    </p>
                    <input
                      type="email"
                      placeholder="din@epost.no"
                      className="w-full px-3 py-2 text-sm border rounded-lg mb-2 outline-none focus:ring-2 focus:ring-black/10"
                      style={{ borderColor: '#DEDCD1' }}
                    />
                    <button
                      className="w-full py-2 text-sm font-medium rounded-lg text-white"
                      style={{ backgroundColor: '#141413' }}
                    >
                      Abonner
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-6">
            <div className="h-8 w-80 rounded bg-[#DEDCD1] animate-pulse" />
            <div className="h-4 w-48 rounded bg-[#DEDCD1] animate-pulse" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-40 rounded bg-[#DEDCD1] animate-pulse" />
                <div className="h-8 rounded bg-[#DEDCD1] animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Overall status */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: statusColors[status?.overall || 'unknown'] }}
                />
                <h1 className="text-2xl font-semibold" style={{ color: '#141413' }}>
                  {overallLabels[status?.overall || 'unknown'] || 'Laster...'}
                </h1>
              </div>
              <p className="text-sm ml-[22px]" style={{ color: '#87867F' }}>
                Oppetid de siste 90 dagene.
                {status?.services[0]?.lastChecked && (
                  <span>
                    {' '}Sist sjekket: {formatTime(status.services[0].lastChecked)}
                  </span>
                )}
              </p>
            </div>

            {/* Active incidents banner */}
            {status?.activeIncidents && status.activeIncidents.length > 0 && (
              <div className="mb-8 rounded-lg border p-4" style={{ borderColor: '#FAA72A', backgroundColor: '#FFF9F0' }}>
                <p className="text-sm font-medium" style={{ color: '#E86235' }}>
                  Aktive hendelser:
                </p>
                {status.activeIncidents.map((inc) => (
                  <p key={inc.id} className="text-sm mt-1" style={{ color: '#141413' }}>
                    {inc.title}
                  </p>
                ))}
              </div>
            )}

            {/* Components */}
            <div className="space-y-6 mb-14">
              {status?.services.map((svc) => (
                <div key={svc.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#141413' }}>
                        {svc.name}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${statusColors[svc.status]}15`,
                          color: statusColors[svc.status],
                        }}
                      >
                        {statusLabels[svc.status]}
                      </span>
                    </div>
                    <span className="text-sm tabular-nums" style={{ color: '#87867F' }}>
                      {svc.uptimePercent.toFixed(2)} %
                    </span>
                  </div>
                  <UptimeBar serviceId={svc.id} history={history} />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs" style={{ color: '#87867F' }}>90 dager siden</span>
                    <span className="text-xs" style={{ color: '#87867F' }}>
                      {svc.responseTimeMs > 0 && `${svc.responseTimeMs}ms · `}I dag
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t mb-10" style={{ borderColor: '#DEDCD1' }} />

            {/* Past incidents */}
            <div>
              <h2 className="text-lg font-semibold mb-6" style={{ color: '#141413' }}>
                Tidligere hendelser
              </h2>

              <div className="space-y-6">
                {recentDates.map((dateStr) => {
                  const dayIncidents = incidents.filter(
                    (inc) => inc.created_at.slice(0, 10) === dateStr
                  );

                  return (
                    <div key={dateStr}>
                      <div
                        className="text-xs font-medium uppercase tracking-wider mb-3"
                        style={{ color: '#87867F' }}
                      >
                        {formatDate(dateStr + 'T00:00:00')}
                      </div>

                      {dayIncidents.length === 0 ? (
                        <p
                          className="text-sm pb-4 border-b"
                          style={{ color: '#87867F', borderColor: '#DEDCD1' }}
                        >
                          Ingen hendelser rapportert.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {dayIncidents.map((incident) => {
                            const badge = incidentBadge[incident.status] || incidentBadge.investigating;
                            return (
                              <div
                                key={incident.id}
                                className="border rounded-lg overflow-hidden"
                                style={{ borderColor: '#DEDCD1', backgroundColor: '#fff' }}
                              >
                                <div
                                  className="px-5 py-4 flex items-center justify-between border-b"
                                  style={{ borderColor: '#DEDCD1' }}
                                >
                                  <span className="font-medium text-sm" style={{ color: '#141413' }}>
                                    {incident.title}
                                  </span>
                                  <span
                                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                                    style={{
                                      backgroundColor: `${badge.color}15`,
                                      color: badge.color,
                                    }}
                                  >
                                    {badge.label}
                                  </span>
                                </div>

                                <div className="divide-y" style={{ borderColor: '#F0EDE8' }}>
                                  {incident.updates.map((update) => (
                                    <div key={update.id} className="px-5 py-3 flex gap-4">
                                      <div className="flex-shrink-0 w-20">
                                        <span
                                          className="text-xs font-medium"
                                          style={{ color: updateTypeColors[update.type] || '#87867F' }}
                                        >
                                          {update.type}
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm" style={{ color: '#141413' }}>
                                          {update.message}
                                        </p>
                                        <p className="text-xs mt-1" style={{ color: '#87867F' }}>
                                          {formatTime(update.created_at)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16" style={{ borderColor: '#DEDCD1' }}>
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm" style={{ color: '#87867F' }}>
            <Link to="/" className="hover:underline">Tilbake til menighetsportalen.no</Link>
            <span>·</span>
            <Link to="/kontakt" className="hover:underline">Kontakt</Link>
          </div>
          <p className="text-xs" style={{ color: '#87867F' }}>
            © 2026 Designblokk
          </p>
        </div>
      </footer>
    </div>
  );
}
