import { useState, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trialRequests, contactMessages, suggestions } from './adminStore';
import type { TrialRequest, ContactMessage, Suggestion } from './adminStore';

// --- Statusfarger ---

const trialStatusColors: Record<string, string> = {
  ny: 'bg-blue-100 text-blue-700',
  kontaktet: 'bg-yellow-100 text-yellow-700',
  aktiv: 'bg-green-100 text-green-700',
  avslatt: 'bg-red-100 text-red-700',
};

const contactStatusColors: Record<string, string> = {
  ny: 'bg-blue-100 text-blue-700',
  besvart: 'bg-green-100 text-green-700',
};

const suggestionStatusColors: Record<string, string> = {
  ny: 'bg-blue-100 text-blue-700',
  vurdert: 'bg-yellow-100 text-yellow-700',
  planlagt: 'bg-green-100 text-green-700',
  avvist: 'bg-red-100 text-red-700',
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// --- Proveperiode-tab ---

function TrialTab() {
  const [items, setItems] = useState<TrialRequest[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await trialRequests.getAll();
      setItems(data);
    } catch {
      // Feil ved lasting
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: TrialRequest['status']) => {
    await trialRequests.updateStatus(id, status);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Slett denne foresporselen?')) {
      await trialRequests.delete(id);
      await loadData();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#E5E2DD] p-4 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-[#636363] py-8 text-center">Ingen forespørsler om prøveperiode ennå.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg border border-[#E5E2DD]">
          <div
            className="flex items-center gap-4 p-4 cursor-pointer"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-[#1A1A1A] truncate">{item.church_name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${trialStatusColors[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-[#636363] truncate">
                {item.contact_name} · {item.email} · {item.phone}
              </p>
            </div>
            <span className="text-xs text-[#636363] whitespace-nowrap">{formatDate(item.submitted_at)}</span>
            {expanded === item.id ? (
              <ChevronUp className="w-4 h-4 text-[#636363]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#636363]" />
            )}
          </div>

          {expanded === item.id && (
            <div className="border-t border-[#F0EDE8] p-4 space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-[#636363]">Sted:</span>{' '}
                  <span className="text-[#1A1A1A]">{item.location || '—'}</span>
                </div>
                <div>
                  <span className="text-[#636363]">Medlemmer:</span>{' '}
                  <span className="text-[#1A1A1A]">{item.members || '—'}</span>
                </div>
                <div>
                  <span className="text-[#636363]">Har nettside:</span>{' '}
                  <span className="text-[#1A1A1A]">
                    {item.has_website === 'yes' ? `Ja — ${item.current_website}` : item.has_website === 'no' ? 'Nei' : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[#636363]">Onsket mal:</span>{' '}
                  <span className="text-[#1A1A1A]">{item.template || '—'}</span>
                </div>
                <div>
                  <span className="text-[#636363]">Tilpasset mal:</span>{' '}
                  <span className="text-[#1A1A1A]">{item.custom_template || '—'}</span>
                </div>
              </div>
              {item.comment && (
                <div className="text-sm">
                  <span className="text-[#636363]">Kommentar:</span>
                  <p className="text-[#1A1A1A] mt-1 bg-[#FAF9F7] p-3 rounded-lg">{item.comment}</p>
                </div>
              )}
              <div className="flex items-center gap-3 pt-2">
                <Select
                  value={item.status}
                  onValueChange={(v) => handleStatusChange(item.id, v as TrialRequest['status'])}
                >
                  <SelectTrigger className="w-40 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">Ny</SelectItem>
                    <SelectItem value="kontaktet">Kontaktet</SelectItem>
                    <SelectItem value="aktiv">Aktiv</SelectItem>
                    <SelectItem value="avslatt">Avslatt</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Kontakt-tab ---

function ContactTab() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await contactMessages.getAll();
      setItems(data);
    } catch {
      // Feil ved lasting
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: ContactMessage['status']) => {
    await contactMessages.updateStatus(id, status);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Slett denne meldingen?')) {
      await contactMessages.delete(id);
      await loadData();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#E5E2DD] p-4 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-[#636363] py-8 text-center">Ingen kontaktmeldinger ennå.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg border border-[#E5E2DD]">
          <div
            className="flex items-center gap-4 p-4 cursor-pointer"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-[#1A1A1A] truncate">{item.subject}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${contactStatusColors[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-[#636363] truncate">{item.name} · {item.email}</p>
            </div>
            <span className="text-xs text-[#636363] whitespace-nowrap">{formatDate(item.submitted_at)}</span>
            {expanded === item.id ? (
              <ChevronUp className="w-4 h-4 text-[#636363]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#636363]" />
            )}
          </div>

          {expanded === item.id && (
            <div className="border-t border-[#F0EDE8] p-4 space-y-3">
              <div className="text-sm">
                <p className="text-[#1A1A1A] bg-[#FAF9F7] p-3 rounded-lg whitespace-pre-wrap">{item.message}</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Select
                  value={item.status}
                  onValueChange={(v) => handleStatusChange(item.id, v as ContactMessage['status'])}
                >
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">Ny</SelectItem>
                    <SelectItem value="besvart">Besvart</SelectItem>
                  </SelectContent>
                </Select>
                <a
                  href={`mailto:${item.email}?subject=Re: ${item.subject}`}
                  className="text-sm text-[#2D5A4A] hover:underline"
                >
                  Svar via e-post
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Forslag-tab ---

function SuggestionTab() {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await suggestions.getAll();
      setItems(data);
    } catch {
      // Feil ved lasting
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: Suggestion['status']) => {
    await suggestions.updateStatus(id, status);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Slett dette forslaget?')) {
      await suggestions.delete(id);
      await loadData();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#E5E2DD] p-4 animate-pulse">
            <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-[#636363] py-8 text-center">Ingen forslag ennå.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg border border-[#E5E2DD] p-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="font-medium text-[#1A1A1A]">{item.name}</p>
              <p className="text-sm text-[#636363]">{item.church} · {item.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${suggestionStatusColors[item.status]}`}>
                {item.status}
              </span>
              <span className="text-xs text-[#636363]">{formatDate(item.submitted_at)}</span>
            </div>
          </div>
          <p className="text-sm text-[#1A1A1A] bg-[#FAF9F7] p-3 rounded-lg mb-3">{item.suggestion}</p>
          <div className="flex items-center gap-3">
            <Select
              value={item.status}
              onValueChange={(v) => handleStatusChange(item.id, v as Suggestion['status'])}
            >
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">Ny</SelectItem>
                <SelectItem value="vurdert">Vurdert</SelectItem>
                <SelectItem value="planlagt">Planlagt</SelectItem>
                <SelectItem value="avvist">Avvist</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Hovedkomponent ---

export function AdminForesposler() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Foresporsler</h1>

      <Tabs defaultValue="trial">
        <TabsList className="bg-white border border-[#E5E2DD]">
          <TabsTrigger value="trial">Proveperiode</TabsTrigger>
          <TabsTrigger value="contact">Kontakt</TabsTrigger>
          <TabsTrigger value="suggestions">Forslag</TabsTrigger>
        </TabsList>

        <TabsContent value="trial" className="mt-4">
          <TrialTab />
        </TabsContent>
        <TabsContent value="contact" className="mt-4">
          <ContactTab />
        </TabsContent>
        <TabsContent value="suggestions" className="mt-4">
          <SuggestionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
