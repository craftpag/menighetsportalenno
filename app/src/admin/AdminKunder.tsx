import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { adminCustomers } from './adminStore';
import type { Customer } from './adminStore';

const emptyCustomer: Omit<Customer, 'id'> = {
  name: '',
  location: '',
  template: 'Hapet',
  quote: '',
  image: '/images/hero-church.jpg',
  since: '2026',
  website: '',
  visible: 1,
};

export function AdminKunder() {
  const [items, setItems] = useState<Customer[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCustomer);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await adminCustomers.getAll();
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
    setForm(emptyCustomer);
    setDialogOpen(true);
  };

  const openEdit = (customer: Customer) => {
    setEditId(customer.id);
    setForm({
      name: customer.name,
      location: customer.location,
      template: customer.template,
      quote: customer.quote,
      image: customer.image,
      since: customer.since,
      website: customer.website,
      visible: customer.visible,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    if (editId) {
      await adminCustomers.update(editId, form);
    } else {
      await adminCustomers.create(form);
    }
    setDialogOpen(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Slett denne kunden?')) {
      await adminCustomers.delete(id);
      await loadData();
    }
  };

  const toggleVisibility = async (id: string, currentVisible: number) => {
    await adminCustomers.update(id, { visible: currentVisible ? 0 : 1 });
    await loadData();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Kunder</h1>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-[#E5E2DD] p-4 flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">Kunder</h1>
        <Button onClick={openNew} className="bg-[#2D5A4A] hover:bg-[#1F3D32] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Legg til kunde
        </Button>
      </div>

      <p className="text-sm text-[#636363]">
        Kundene som vises her dukker opp på /kunder-siden. Bruk øye-ikonet for å skjule/vise en kunde.
      </p>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E2DD] p-12 text-center">
          <p className="text-[#636363] mb-4">Ingen kunder lagt til ennå.</p>
          <Button onClick={openNew} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Legg til forste kunde
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((customer) => (
            <div
              key={customer.id}
              className={`bg-white rounded-lg border border-[#E5E2DD] p-4 flex items-center gap-4 ${
                !customer.visible ? 'opacity-50' : ''
              }`}
            >
              <img
                src={customer.image}
                alt={customer.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1A1A1A] truncate">{customer.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#2D5A4A]/10 text-[#2D5A4A]">
                    {customer.template}
                  </span>
                </div>
                <p className="text-sm text-[#636363] truncate">{customer.location} · Siden {customer.since}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleVisibility(customer.id, customer.visible)}
                  title={customer.visible ? 'Skjul' : 'Vis'}
                >
                  {customer.visible ? (
                    <Eye className="w-4 h-4 text-[#636363]" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-[#636363]" />
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEdit(customer)}>
                  <Pencil className="w-4 h-4 text-[#636363]" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(customer.id)}
                  className="hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4 text-[#636363]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog for add/edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editId ? 'Rediger kunde' : 'Legg til kunde'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Menighetsnavn</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Bergen Frikirke"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Sted</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Bergen"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Mal</Label>
                <Select value={form.template} onValueChange={(v) => setForm({ ...form, template: v })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hapet">Hapet</SelectItem>
                    <SelectItem value="Lyset">Lyset</SelectItem>
                    <SelectItem value="Kilden">Kilden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Kunde siden</Label>
                <Input
                  value={form.since}
                  onChange={(e) => setForm({ ...form, since: e.target.value })}
                  placeholder="2026"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Nettside</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://bergen-frikirke.menighetsportalen.no"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Sitat</Label>
              <Textarea
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="En fantastisk løsning..."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Bilde-URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/hero-church.jpg"
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
