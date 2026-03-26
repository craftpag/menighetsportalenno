import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { adminTeam } from './adminStore';
import type { TeamMember } from './adminStore';

// --- Teammedlemmer ---

const emptyTeamMember: Omit<TeamMember, 'id'> = {
  name: '',
  role: '',
  image: '/images/pastor.jpg',
  sort_order: 0,
};

function TeamTab() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTeamMember);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await adminTeam.getAll();
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

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyTeamMember, sort_order: items.length });
    setDialogOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditId(member.id);
    setForm({ name: member.name, role: member.role, image: member.image, sort_order: member.sort_order });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    if (editId) {
      await adminTeam.update(editId, form);
    } else {
      await adminTeam.create(form);
    }
    setDialogOpen(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Fjern dette teammedlemmet?')) {
      await adminTeam.delete(id);
      await loadData();
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const item = items[index];
    const prev = items[index - 1];
    await adminTeam.update(item.id, { sort_order: prev.sort_order });
    await adminTeam.update(prev.id, { sort_order: item.sort_order });
    await loadData();
  };

  const moveDown = async (index: number) => {
    if (index === items.length - 1) return;
    const item = items[index];
    const next = items[index + 1];
    await adminTeam.update(item.id, { sort_order: next.sort_order });
    await adminTeam.update(next.id, { sort_order: item.sort_order });
    await loadData();
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#E5E2DD] p-4 flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#636363]">
          Teammedlemmene vises på /om-oss-siden. Rekkefølgen bestemmes av sortering.
        </p>
        <Button onClick={openNew} className="bg-[#2D5A4A] hover:bg-[#1F3D32] text-white" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Legg til
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E2DD] p-8 text-center">
          <p className="text-[#636363] mb-4">Ingen teammedlemmer lagt til. Standardverdiene brukes.</p>
          <Button onClick={openNew} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Legg til
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((member, index) => (
            <div key={member.id} className="bg-white rounded-lg border border-[#E5E2DD] p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="text-[#636363] hover:text-[#1A1A1A] disabled:opacity-20"
                >
                  <GripVertical className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === items.length - 1}
                  className="text-[#636363] hover:text-[#1A1A1A] disabled:opacity-20"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>

              <img
                src={member.image}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <span className="font-medium text-[#1A1A1A]">{member.name}</span>
                <p className="text-sm text-[#636363]">{member.role}</p>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => openEdit(member)}>
                  <Pencil className="w-4 h-4 text-[#636363]" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                  className="hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4 text-[#636363]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editId ? 'Rediger teammedlem' : 'Legg til teammedlem'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Navn</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Philip Andre Gaulin"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Rolle</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Grunnlegger og utvikler"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Bilde-URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/team-philip.jpg"
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Avbryt
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#2D5A4A] hover:bg-[#1F3D32] text-white"
                disabled={!form.name.trim()}
              >
                {editId ? 'Lagre' : 'Legg til'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Info-seksjon ---

function InfoTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E5E2DD] p-6">
        <h3 className="font-medium text-[#1A1A1A] mb-3">Datalagring</h3>
        <p className="text-sm text-[#636363] mb-4">
          All data lagres i en SQLite-database på serveren. Data persisterer på tvers av nettlesere
          og maskiner uten behov for eksport/import.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          <strong>Info:</strong> Dataene er sikret på serveren. Du kan eksportere en sikkerhetskopi
          fra oversiktssiden.
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E2DD] p-6">
        <h3 className="font-medium text-[#1A1A1A] mb-3">Innhold som redigeres i kode</h3>
        <p className="text-sm text-[#636363] mb-3">
          Følgende innhold redigeres direkte i kildekoden og er ikke tilgjengelig i admin:
        </p>
        <ul className="text-sm text-[#4A4A4A] space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>Veikart</strong> — src/data/roadmap.ts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>Maler</strong> — src/data/templates.ts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>Priser</strong> — src/data/pricing.ts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>Funksjoner</strong> — src/data/features.ts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>FAQ</strong> — src/data/faq.ts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D5A4A] mt-0.5">•</span>
            <span><strong>Sammenligning</strong> — src/data/comparison.ts</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E2DD] p-6">
        <h3 className="font-medium text-[#1A1A1A] mb-3">Admin-passord</h3>
        <p className="text-sm text-[#636363]">
          Passordet konfigureres på serveren via miljøvariabelen{' '}
          <code className="bg-[#F0EDE8] px-1.5 py-0.5 rounded text-xs">ADMIN_PASSWORD</code>.
          Innlogging gjelder kun for denne nettleser-økten (session).
        </p>
      </div>
    </div>
  );
}

// --- Hovedkomponent ---

export function AdminInnhold() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Innhold</h1>

      <Tabs defaultValue="team">
        <TabsList className="bg-white border border-[#E5E2DD]">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="info">Informasjon</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-4">
          <TeamTab />
        </TabsContent>
        <TabsContent value="info" className="mt-4">
          <InfoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
