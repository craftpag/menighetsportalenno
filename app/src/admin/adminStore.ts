// ============================================================
// Admin datalagring — API-basert (SQLite backend)
// ============================================================

// --- Typer ---

export interface TrialRequest {
  id: string;
  church_name: string;
  contact_name: string;
  email: string;
  phone: string;
  location: string;
  members: string;
  has_website: string;
  current_website: string;
  template: string;
  custom_template: string;
  comment: string;
  submitted_at: string;
  status: 'ny' | 'kontaktet' | 'aktiv' | 'avslatt';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
  status: 'ny' | 'besvart';
}

export interface Suggestion {
  id: string;
  name: string;
  church: string;
  email: string;
  suggestion: string;
  submitted_at: string;
  status: 'ny' | 'vurdert' | 'planlagt' | 'avvist';
}

export interface Customer {
  id: string;
  name: string;
  location: string;
  template: string;
  quote: string;
  image: string;
  since: string;
  website: string;
  visible: number;
  lat?: number;
  lon?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  sort_order: number;
}

export interface Stats {
  nyeForesposler: number;
  nyeMeldinger: number;
  nyeForslag: number;
  totaltForesposler: number;
  totaltMeldinger: number;
  totaltForslag: number;
  antallKunder: number;
  aktiveForesposler: number;
}

// --- Auth ---

const TOKEN_KEY = 'mp_admin_token';

function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function adminLogin(password: string): Promise<boolean> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) return false;
  const { token } = await res.json();
  sessionStorage.setItem(TOKEN_KEY, token);
  return true;
}

export function adminLogout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function isAdminAuthenticated(): boolean {
  return !!getToken();
}

// --- Admin API-kall ---

async function adminGet<T>(path: string): Promise<T> {
  const res = await fetch(`/api/admin${path}`, { headers: authHeaders() });
  if (res.status === 401) {
    adminLogout();
    window.location.reload();
    throw new Error('Ikke autorisert');
  }
  return res.json();
}

async function adminPost(path: string, body: unknown): Promise<{ ok: boolean; id?: string }> {
  const res = await fetch(`/api/admin${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return res.json();
}

async function adminPatch(path: string, body: unknown): Promise<void> {
  await fetch(`/api/admin${path}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
}

async function adminDelete(path: string): Promise<void> {
  await fetch(`/api/admin${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}

// --- Stats ---

export async function getStats(): Promise<Stats> {
  return adminGet('/stats');
}

// --- Trial Requests ---

export const trialRequests = {
  getAll: () => adminGet<TrialRequest[]>('/trial-requests'),
  updateStatus: (id: string, status: string) => adminPatch(`/trial-requests/${id}`, { status }),
  delete: (id: string) => adminDelete(`/trial-requests/${id}`),
};

// --- Contact Messages ---

export const contactMessages = {
  getAll: () => adminGet<ContactMessage[]>('/contact-messages'),
  updateStatus: (id: string, status: string) => adminPatch(`/contact-messages/${id}`, { status }),
  delete: (id: string) => adminDelete(`/contact-messages/${id}`),
};

// --- Suggestions ---

export const suggestions = {
  getAll: () => adminGet<Suggestion[]>('/suggestions'),
  updateStatus: (id: string, status: string) => adminPatch(`/suggestions/${id}`, { status }),
  delete: (id: string) => adminDelete(`/suggestions/${id}`),
};

// --- Customers ---

export const adminCustomers = {
  getAll: () => adminGet<Customer[]>('/customers'),
  create: (data: Omit<Customer, 'id'>) => adminPost('/customers', data),
  update: (id: string, data: Partial<Customer>) => adminPatch(`/customers/${id}`, data),
  delete: (id: string) => adminDelete(`/customers/${id}`),
};

// --- Team ---

export const adminTeam = {
  getAll: () => adminGet<TeamMember[]>('/team'),
  create: (data: Omit<TeamMember, 'id'>) => adminPost('/team', data),
  update: (id: string, data: Partial<TeamMember>) => adminPatch(`/team/${id}`, data),
  delete: (id: string) => adminDelete(`/team/${id}`),
};

// --- Export ---

export async function exportAllData(): Promise<string> {
  const data = await adminGet('/export');
  return JSON.stringify(data, null, 2);
}

// --- Public API (brukes av offentlige sider) ---

export async function getPublicCustomers(): Promise<Customer[]> {
  const res = await fetch('/api/customers');
  if (!res.ok) return [];
  return res.json();
}

export async function getPublicTeam(): Promise<TeamMember[]> {
  const res = await fetch('/api/team');
  if (!res.ok) return [];
  return res.json();
}

// --- Public: Skjema-innsendinger ---

export async function submitTrial(data: Record<string, string>): Promise<boolean> {
  const res = await fetch('/api/submit/trial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}

export async function submitContact(data: Record<string, string>): Promise<boolean> {
  const res = await fetch('/api/submit/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}

export async function submitSuggestion(data: Record<string, string>): Promise<boolean> {
  const res = await fetch('/api/submit/suggestion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}
