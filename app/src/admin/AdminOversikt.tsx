import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, MessageSquare, Lightbulb, Users, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStats, trialRequests, contactMessages, suggestions, exportAllData } from './adminStore';
import type { TrialRequest, ContactMessage, Suggestion, Stats } from './adminStore';

export function AdminOversikt() {
  const [stats, setStats] = useState<Stats>({
    nyeForesposler: 0,
    nyeMeldinger: 0,
    nyeForslag: 0,
    totaltForesposler: 0,
    totaltMeldinger: 0,
    totaltForslag: 0,
    antallKunder: 0,
    aktiveForesposler: 0,
  });
  const [recentTrials, setRecentTrials] = useState<TrialRequest[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [recentSuggestions, setRecentSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [statsData, trials, msgs, sugs] = await Promise.all([
          getStats(),
          trialRequests.getAll(),
          contactMessages.getAll(),
          suggestions.getAll(),
        ]);
        setStats(statsData);
        setRecentTrials(trials.slice(0, 5));
        setRecentMessages(msgs.slice(0, 5));
        setRecentSuggestions(sugs.slice(0, 5));
      } catch {
        // Feil ved lasting av data
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleExport = async () => {
    try {
      const data = await exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `menighetsportalen-admin-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Kunne ikke eksportere data');
    }
  };

  const statCards = [
    {
      label: 'Nye forespørsler',
      value: stats.nyeForesposler,
      total: stats.totaltForesposler,
      icon: Inbox,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/foresposler',
    },
    {
      label: 'Nye meldinger',
      value: stats.nyeMeldinger,
      total: stats.totaltMeldinger,
      icon: MessageSquare,
      color: 'bg-green-50 text-green-600',
      href: '/admin/foresposler',
    },
    {
      label: 'Nye forslag',
      value: stats.nyeForslag,
      total: stats.totaltForslag,
      icon: Lightbulb,
      color: 'bg-amber-50 text-amber-600',
      href: '/admin/foresposler',
    },
    {
      label: 'Synlige kunder',
      value: stats.antallKunder,
      total: undefined,
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/kunder',
    },
  ];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Oversikt</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E5E2DD] p-5 animate-pulse">
              <div className="h-10 w-10 rounded-lg bg-gray-200 mb-3" />
              <div className="h-8 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Oversikt</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Eksporter
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.href}
              className="bg-white rounded-xl border border-[#E5E2DD] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#636363]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#1A1A1A]">{card.value}</div>
              <p className="text-sm text-[#636363] mt-0.5">
                {card.label}
                {card.total !== undefined && <span className="text-[#636363]"> / {card.total} totalt</span>}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent trials */}
        <div className="bg-white rounded-xl border border-[#E5E2DD] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-[#1A1A1A]">Siste forespørsler</h2>
            <Link to="/admin/foresposler" className="text-xs text-[#2D5A4A] hover:underline">
              Se alle
            </Link>
          </div>
          {recentTrials.length === 0 ? (
            <p className="text-sm text-[#636363] py-4">Ingen forespørsler ennå</p>
          ) : (
            <div className="space-y-3">
              {recentTrials.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-[#F0EDE8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{t.church_name}</p>
                    <p className="text-xs text-[#636363]">{t.contact_name}</p>
                  </div>
                  <span className="text-xs text-[#636363]">{formatDate(t.submitted_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-xl border border-[#E5E2DD] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-[#1A1A1A]">Siste meldinger</h2>
            <Link to="/admin/foresposler" className="text-xs text-[#2D5A4A] hover:underline">
              Se alle
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-[#636363] py-4">Ingen meldinger ennå</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-[#F0EDE8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{m.subject}</p>
                    <p className="text-xs text-[#636363]">{m.name}</p>
                  </div>
                  <span className="text-xs text-[#636363]">{formatDate(m.submitted_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent suggestions */}
        <div className="bg-white rounded-xl border border-[#E5E2DD] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-[#1A1A1A]">Siste forslag</h2>
            <Link to="/admin/foresposler" className="text-xs text-[#2D5A4A] hover:underline">
              Se alle
            </Link>
          </div>
          {recentSuggestions.length === 0 ? (
            <p className="text-sm text-[#636363] py-4">Ingen forslag ennå</p>
          ) : (
            <div className="space-y-3">
              {recentSuggestions.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#F0EDE8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A] line-clamp-1">{s.suggestion}</p>
                    <p className="text-xs text-[#636363]">{s.name} — {s.church}</p>
                  </div>
                  <span className="text-xs text-[#636363]">{formatDate(s.submitted_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
