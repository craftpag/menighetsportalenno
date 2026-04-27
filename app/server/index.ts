import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  trialRequests,
  contactMessages,
  suggestions,
  customers,
  teamMembers,
  getStats,
  exportAll,
  serviceChecks,
  incidentStore,
} from './db.js';
import { startHealthChecker, getServiceList } from './healthChecker.js';
import { validateSlug } from './slug.js';
import { sendVerificationEmail } from './email.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'menighet2026';
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'http://localhost:5173';

// Auth tokens (deklarert tidlig for bruk i upload-rute)
const tokens = new Set<string>();

// Upload-rute MÅ registreres FØR express.json() for å unngå body-parsing
app.post('/api/upload', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !tokens.has(token)) {
    res.status(401).json({ error: 'Ikke autorisert' });
    return;
  }

  const chunks: Buffer[] = [];
  req.on('data', (chunk: Buffer) => chunks.push(chunk));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const contentType = req.headers['content-type'] || '';
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) { res.status(400).json({ error: 'Mangler boundary' }); return; }

    const parts = body.toString('binary').split('--' + boundary);
    for (const part of parts) {
      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      const headers = part.slice(0, headerEnd);
      if (!headers.includes('filename=')) continue;

      const filenameMatch = headers.match(/filename="([^"]+)"/);
      if (!filenameMatch) continue;

      const ext = path.extname(filenameMatch[1]).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        res.status(400).json({ error: 'Ugyldig filtype' });
        return;
      }

      const fileData = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
      const uploadsDir = path.join(__dirname, '..', 'dist', 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
      fs.writeFileSync(path.join(uploadsDir, filename), fileData, 'binary');
      res.json({ url: `/uploads/${filename}` });
      return;
    }
    res.status(400).json({ error: 'Ingen fil funnet' });
  });
});

app.use(express.json());

// --- Auth ---

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !tokens.has(token)) {
    res.status(401).json({ error: 'Ikke autorisert' });
    return;
  }
  next();
}

// --- Public: Skjema-innsendinger ---

app.post('/api/submit/trial', async (req, res) => {
  const { churchName, contactName, email, phone, slug, location, members, hasWebsite, currentWebsite, template, customTemplate, comment } = req.body;
  if (!churchName || !contactName || !email || !phone) {
    res.status(400).json({ error: 'Mangler påkrevde felt' });
    return;
  }
  if (slug) {
    const slugError = validateSlug(slug);
    if (slugError) {
      res.status(400).json({ error: 'Ugyldig subdomene', reason: slugError });
      return;
    }
    if (trialRequests.findBySlug(slug)) {
      res.status(409).json({ error: 'Subdomenet er allerede reservert', reason: 'taken' });
      return;
    }
  }
  const verificationToken = crypto.randomUUID();
  const id = trialRequests.create({
    churchName, contactName, email, phone,
    location: location || '', members: members || '',
    hasWebsite: hasWebsite || '', currentWebsite: currentWebsite || '',
    template: template || '', customTemplate: customTemplate || '',
    comment: comment || '', slug: slug || '', verificationToken,
    submittedAt: new Date().toISOString(),
  });

  if (slug) {
    const verifyUrl = `${PUBLIC_BASE_URL}/registrer/verifiser?token=${verificationToken}`;
    sendVerificationEmail({ to: email, contactName, churchName, slug, verifyUrl }).catch((err) => {
      console.error(`Verifiseringsepost feilet for ${id}:`, err);
    });
  }

  res.json({ ok: true, id });
});

app.post('/api/registrer/slug-check', (req, res) => {
  const { slug } = req.body;
  if (typeof slug !== 'string') {
    res.status(400).json({ available: false, reason: 'invalid' });
    return;
  }
  const error = validateSlug(slug);
  if (error) {
    res.json({ available: false, reason: error });
    return;
  }
  if (trialRequests.findBySlug(slug)) {
    res.json({ available: false, reason: 'taken' });
    return;
  }
  res.json({ available: true });
});

app.get('/api/registrer/verify/:token', (req, res) => {
  const row = trialRequests.findByToken(req.params.token);
  if (!row) {
    res.status(404).json({ ok: false, reason: 'not-found' });
    return;
  }
  if (!row.verified_at) {
    trialRequests.markVerified(row.id);
  }
  res.json({
    ok: true,
    churchName: row.church_name,
    slug: row.slug,
    alreadyVerified: !!row.verified_at,
  });
});

app.post('/api/submit/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Mangler påkrevde felt' });
    return;
  }
  const id = contactMessages.create({
    name, email, subject, message,
    submittedAt: new Date().toISOString(),
  });
  res.json({ ok: true, id });
});

app.post('/api/submit/suggestion', (req, res) => {
  const { name, church, email, suggestion } = req.body;
  if (!name || !church || !email || !suggestion) {
    res.status(400).json({ error: 'Mangler påkrevde felt' });
    return;
  }
  const id = suggestions.create({
    name, church, email, suggestion,
    submittedAt: new Date().toISOString(),
  });
  res.json({ ok: true, id });
});

// --- Public: Data ---

app.get('/api/customers', (_req, res) => {
  res.json(customers.getVisible());
});

app.get('/api/team', (_req, res) => {
  res.json(teamMembers.getAll());
});

// --- Admin: Login ---

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Feil passord' });
    return;
  }
  const token = crypto.randomUUID();
  tokens.add(token);
  res.json({ token });
});

// --- Upload ---

const uploadsDir = path.join(__dirname, '..', 'dist', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// --- Admin: Alt under /api/admin krever auth ---

app.use('/api/admin', authMiddleware);

// --- Admin: Stats ---

app.get('/api/admin/stats', (_req, res) => {
  res.json(getStats());
});

// --- Admin: Trial Requests ---

app.get('/api/admin/trial-requests', (_req, res) => {
  res.json(trialRequests.getAll());
});

app.patch('/api/admin/trial-requests/:id', (req, res) => {
  trialRequests.updateStatus(req.params.id, req.body.status);
  res.json({ ok: true });
});

app.delete('/api/admin/trial-requests/:id', (req, res) => {
  trialRequests.delete(req.params.id);
  res.json({ ok: true });
});

// --- Admin: Contact Messages ---

app.get('/api/admin/contact-messages', (_req, res) => {
  res.json(contactMessages.getAll());
});

app.patch('/api/admin/contact-messages/:id', (req, res) => {
  contactMessages.updateStatus(req.params.id, req.body.status);
  res.json({ ok: true });
});

app.delete('/api/admin/contact-messages/:id', (req, res) => {
  contactMessages.delete(req.params.id);
  res.json({ ok: true });
});

// --- Admin: Suggestions ---

app.get('/api/admin/suggestions', (_req, res) => {
  res.json(suggestions.getAll());
});

app.patch('/api/admin/suggestions/:id', (req, res) => {
  suggestions.updateStatus(req.params.id, req.body.status);
  res.json({ ok: true });
});

app.delete('/api/admin/suggestions/:id', (req, res) => {
  suggestions.delete(req.params.id);
  res.json({ ok: true });
});

// --- Admin: Customers ---

app.get('/api/admin/customers', (_req, res) => {
  res.json(customers.getAll());
});

async function geocode(location: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location + ', Norway')}&format=json&limit=1`,
      { headers: { 'User-Agent': 'Menighetsportalen/1.0' } }
    );
    const data = await res.json() as { lat: string; lon: string }[];
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch {}
  return null;
}

app.post('/api/admin/customers', async (req, res) => {
  const data = req.body;
  if (data.location) {
    const coords = await geocode(data.location);
    if (coords) { data.lat = coords.lat; data.lon = coords.lon; }
  }
  const id = customers.create(data);
  res.json({ ok: true, id });
});

app.patch('/api/admin/customers/:id', async (req, res) => {
  const data = req.body;
  if (data.location) {
    const coords = await geocode(data.location);
    if (coords) { data.lat = coords.lat; data.lon = coords.lon; }
  }
  customers.update(req.params.id, data);
  res.json({ ok: true });
});

app.delete('/api/admin/customers/:id', (req, res) => {
  customers.delete(req.params.id);
  res.json({ ok: true });
});

// --- Admin: Team ---

app.get('/api/admin/team', (_req, res) => {
  res.json(teamMembers.getAll());
});

app.post('/api/admin/team', (req, res) => {
  const id = teamMembers.create(req.body);
  res.json({ ok: true, id });
});

app.patch('/api/admin/team/:id', (req, res) => {
  teamMembers.update(req.params.id, req.body);
  res.json({ ok: true });
});

app.delete('/api/admin/team/:id', (req, res) => {
  teamMembers.delete(req.params.id);
  res.json({ ok: true });
});

// --- Admin: Export ---

app.get('/api/admin/export', (_req, res) => {
  res.json(exportAll());
});

// --- Admin: Hendelser ---

app.get('/api/admin/incidents', (_req, res) => {
  const incidents = incidentStore.getAll() as { id: string }[];
  const result = incidents.map((inc) => ({
    ...inc,
    updates: incidentStore.getUpdates(inc.id),
  }));
  res.json(result);
});

app.post('/api/admin/incidents', (req, res) => {
  const { title, service } = req.body;
  if (!title || !service) { res.status(400).json({ error: 'Mangler felt' }); return; }
  const id = incidentStore.create(title, service);
  res.json({ ok: true, id });
});

app.post('/api/admin/incidents/:id/update', (req, res) => {
  const { type, message } = req.body;
  if (!type || !message) { res.status(400).json({ error: 'Mangler felt' }); return; }
  incidentStore.addUpdate(req.params.id, type, message);
  res.json({ ok: true });
});

app.delete('/api/admin/incidents/:id', (req, res) => {
  incidentStore.delete(req.params.id);
  res.json({ ok: true });
});

// --- Public: Status ---

app.get('/api/status', (_req, res) => {
  const services = getServiceList();
  const latest = serviceChecks.getLatest() as { service: string; status: string; response_time_ms: number; details: string; checked_at: string }[];
  const uptimeAvg = serviceChecks.getUptimeAverage() as { service: string; avg_uptime: number }[];
  const activeIncidents = incidentStore.getActive();

  const result = services.map((svc) => {
    const check = latest.find((c) => c.service === svc.id);
    const uptime = uptimeAvg.find((u) => u.service === svc.id);
    return {
      id: svc.id,
      name: svc.name,
      status: check?.status || 'unknown',
      responseTimeMs: check?.response_time_ms || 0,
      details: check?.details || '',
      lastChecked: check?.checked_at || null,
      uptimePercent: uptime?.avg_uptime ?? 100,
    };
  });

  res.json({
    overall: result.every((s) => s.status === 'operational') ? 'operational'
      : result.some((s) => s.status === 'down') ? 'down' : 'degraded',
    services: result,
    activeIncidents,
  });
});

app.get('/api/status/history', (_req, res) => {
  const history = serviceChecks.getUptimeHistory(90);
  res.json(history);
});

app.get('/api/status/incidents', (_req, res) => {
  const incidents = incidentStore.getRecent(14) as { id: string }[];
  const result = incidents.map((inc) => ({
    ...inc,
    updates: incidentStore.getUpdates(inc.id),
  }));
  res.json(result);
});

// --- Produksjon: Serve frontend ---

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
  startHealthChecker(60_000); // Sjekk hvert minutt
});
