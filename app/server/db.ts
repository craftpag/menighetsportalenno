import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'menighetsportalen.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// --- Skjema ---

db.exec(`
  CREATE TABLE IF NOT EXISTS trial_requests (
    id TEXT PRIMARY KEY,
    church_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT DEFAULT '',
    members TEXT DEFAULT '',
    has_website TEXT DEFAULT '',
    current_website TEXT DEFAULT '',
    template TEXT DEFAULT '',
    custom_template TEXT DEFAULT '',
    comment TEXT DEFAULT '',
    submitted_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ny'
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ny'
  );

  CREATE TABLE IF NOT EXISTS suggestions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    church TEXT NOT NULL,
    email TEXT NOT NULL,
    suggestion TEXT NOT NULL,
    submitted_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ny'
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    template TEXT NOT NULL DEFAULT '',
    quote TEXT DEFAULT '',
    image TEXT DEFAULT '',
    since TEXT DEFAULT '',
    website TEXT DEFAULT '',
    visible INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT '',
    image TEXT DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS service_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'operational',
    response_time_ms INTEGER DEFAULT 0,
    details TEXT DEFAULT '',
    checked_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS daily_uptime (
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    total_checks INTEGER DEFAULT 0,
    successful_checks INTEGER DEFAULT 0,
    uptime_percent REAL DEFAULT 100,
    worst_status TEXT DEFAULT 'operational',
    PRIMARY KEY (service, date)
  );

  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    service TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'investigating',
    created_at TEXT NOT NULL,
    resolved_at TEXT
  );

  CREATE TABLE IF NOT EXISTS incident_updates (
    id TEXT PRIMARY KEY,
    incident_id TEXT NOT NULL REFERENCES incidents(id),
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

// --- Hjelpefunksjoner ---

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// --- Trial Requests ---

export const trialRequests = {
  getAll: () => db.prepare('SELECT * FROM trial_requests ORDER BY submitted_at DESC').all(),
  getById: (id: string) => db.prepare('SELECT * FROM trial_requests WHERE id = ?').get(id),
  create: (data: Record<string, unknown>) => {
    const id = genId();
    db.prepare(`
      INSERT INTO trial_requests (id, church_name, contact_name, email, phone, location, members, has_website, current_website, template, custom_template, comment, submitted_at, status)
      VALUES (@id, @churchName, @contactName, @email, @phone, @location, @members, @hasWebsite, @currentWebsite, @template, @customTemplate, @comment, @submittedAt, 'ny')
    `).run({ id, ...data });
    return id;
  },
  updateStatus: (id: string, status: string) => {
    db.prepare('UPDATE trial_requests SET status = ? WHERE id = ?').run(status, id);
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM trial_requests WHERE id = ?').run(id);
  },
};

// --- Contact Messages ---

export const contactMessages = {
  getAll: () => db.prepare('SELECT * FROM contact_messages ORDER BY submitted_at DESC').all(),
  create: (data: Record<string, unknown>) => {
    const id = genId();
    db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message, submitted_at, status)
      VALUES (@id, @name, @email, @subject, @message, @submittedAt, 'ny')
    `).run({ id, ...data });
    return id;
  },
  updateStatus: (id: string, status: string) => {
    db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, id);
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
  },
};

// --- Suggestions ---

export const suggestions = {
  getAll: () => db.prepare('SELECT * FROM suggestions ORDER BY submitted_at DESC').all(),
  create: (data: Record<string, unknown>) => {
    const id = genId();
    db.prepare(`
      INSERT INTO suggestions (id, name, church, email, suggestion, submitted_at, status)
      VALUES (@id, @name, @church, @email, @suggestion, @submittedAt, 'ny')
    `).run({ id, ...data });
    return id;
  },
  updateStatus: (id: string, status: string) => {
    db.prepare('UPDATE suggestions SET status = ? WHERE id = ?').run(status, id);
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM suggestions WHERE id = ?').run(id);
  },
};

// --- Customers ---

export const customers = {
  getAll: () => db.prepare('SELECT * FROM customers ORDER BY name').all(),
  getVisible: () => db.prepare('SELECT * FROM customers WHERE visible = 1 ORDER BY name').all(),
  create: (data: Record<string, unknown>) => {
    const id = genId();
    db.prepare(`
      INSERT INTO customers (id, name, location, template, quote, image, since, website, visible)
      VALUES (@id, @name, @location, @template, @quote, @image, @since, @website, @visible)
    `).run({ id, visible: 1, ...data });
    return id;
  },
  update: (id: string, data: Record<string, unknown>) => {
    const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(', ');
    db.prepare(`UPDATE customers SET ${fields} WHERE id = @id`).run({ id, ...data });
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  },
};

// --- Team Members ---

export const teamMembers = {
  getAll: () => db.prepare('SELECT * FROM team_members ORDER BY sort_order, name').all(),
  create: (data: Record<string, unknown>) => {
    const id = genId();
    db.prepare(`
      INSERT INTO team_members (id, name, role, image, sort_order)
      VALUES (@id, @name, @role, @image, @sortOrder)
    `).run({ id, sortOrder: 0, ...data });
    return id;
  },
  update: (id: string, data: Record<string, unknown>) => {
    const mapping: Record<string, string> = { sortOrder: 'sort_order' };
    const mapped: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      mapped[mapping[k] || k] = v;
    }
    const fields = Object.keys(mapped).map((k) => `${k} = @${k}`).join(', ');
    db.prepare(`UPDATE team_members SET ${fields} WHERE id = @id`).run({ id, ...mapped });
  },
  delete: (id: string) => {
    db.prepare('DELETE FROM team_members WHERE id = ?').run(id);
  },
};

// --- Stats ---

export function getStats() {
  const row = (sql: string) => (db.prepare(sql).get() as { c: number }).c;
  return {
    nyeForesposler: row("SELECT count(*) as c FROM trial_requests WHERE status = 'ny'"),
    nyeMeldinger: row("SELECT count(*) as c FROM contact_messages WHERE status = 'ny'"),
    nyeForslag: row("SELECT count(*) as c FROM suggestions WHERE status = 'ny'"),
    totaltForesposler: row('SELECT count(*) as c FROM trial_requests'),
    totaltMeldinger: row('SELECT count(*) as c FROM contact_messages'),
    totaltForslag: row('SELECT count(*) as c FROM suggestions'),
    antallKunder: row('SELECT count(*) as c FROM customers WHERE visible = 1'),
    aktiveForesposler: row("SELECT count(*) as c FROM trial_requests WHERE status = 'aktiv'"),
  };
}

// --- Export/Import ---

export function exportAll() {
  return {
    trialRequests: trialRequests.getAll(),
    contactMessages: contactMessages.getAll(),
    suggestions: suggestions.getAll(),
    customers: customers.getAll(),
    teamMembers: teamMembers.getAll(),
    exportedAt: new Date().toISOString(),
  };
}

// --- Status: Helsesjekker ---

export const serviceChecks = {
  insert: (service: string, status: string, responseTimeMs: number, details: string) => {
    db.prepare(`
      INSERT INTO service_checks (service, status, response_time_ms, details, checked_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(service, status, responseTimeMs, details, new Date().toISOString());

    // Oppdater daglig oppetid
    const today = new Date().toISOString().slice(0, 10);
    const isOk = status === 'operational' ? 1 : 0;
    db.prepare(`
      INSERT INTO daily_uptime (service, date, total_checks, successful_checks, uptime_percent, worst_status)
      VALUES (?, ?, 1, ?, 100, ?)
      ON CONFLICT(service, date) DO UPDATE SET
        total_checks = total_checks + 1,
        successful_checks = successful_checks + ?,
        uptime_percent = ROUND((successful_checks + ?) * 100.0 / (total_checks + 1), 2),
        worst_status = CASE
          WHEN ? = 'down' THEN 'down'
          WHEN worst_status = 'down' THEN 'down'
          WHEN ? = 'degraded' THEN 'degraded'
          WHEN worst_status = 'degraded' THEN 'degraded'
          ELSE 'operational'
        END
    `).run(service, today, isOk, status, isOk, isOk, status, status);
  },

  getLatest: () => {
    return db.prepare(`
      SELECT s.* FROM service_checks s
      INNER JOIN (
        SELECT service, MAX(id) as max_id FROM service_checks GROUP BY service
      ) latest ON s.id = latest.max_id
      ORDER BY s.service
    `).all();
  },

  getUptimeHistory: (days: number = 90) => {
    const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
    return db.prepare(`
      SELECT service, date, uptime_percent, worst_status
      FROM daily_uptime
      WHERE date >= ?
      ORDER BY service, date
    `).all(since);
  },

  getUptimeAverage: () => {
    const since = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
    return db.prepare(`
      SELECT service,
        ROUND(AVG(uptime_percent), 2) as avg_uptime,
        SUM(total_checks) as total,
        SUM(successful_checks) as successful
      FROM daily_uptime
      WHERE date >= ?
      GROUP BY service
    `).all(since);
  },

  cleanup: (keepDays: number = 7) => {
    const cutoff = new Date(Date.now() - keepDays * 86400000).toISOString();
    db.prepare('DELETE FROM service_checks WHERE checked_at < ?').run(cutoff);
  },
};

// --- Status: Hendelser ---

export const incidentStore = {
  getAll: () => db.prepare('SELECT * FROM incidents ORDER BY created_at DESC').all(),
  getRecent: (days: number = 14) => {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    return db.prepare('SELECT * FROM incidents WHERE created_at >= ? ORDER BY created_at DESC').all(since);
  },
  getActive: () => db.prepare("SELECT * FROM incidents WHERE status != 'resolved' ORDER BY created_at DESC").all(),
  create: (title: string, service: string) => {
    const id = genId();
    const now = new Date().toISOString();
    db.prepare('INSERT INTO incidents (id, title, service, status, created_at) VALUES (?, ?, ?, ?, ?)').run(id, title, service, 'investigating', now);
    db.prepare('INSERT INTO incident_updates (id, incident_id, type, message, created_at) VALUES (?, ?, ?, ?, ?)').run(genId(), id, 'Undersøker', `${title} — vi undersøker saken.`, now);
    return id;
  },
  addUpdate: (incidentId: string, type: string, message: string) => {
    db.prepare('INSERT INTO incident_updates (id, incident_id, type, message, created_at) VALUES (?, ?, ?, ?, ?)').run(genId(), incidentId, type, message, new Date().toISOString());
    const statusMap: Record<string, string> = { 'Undersøker': 'investigating', 'Overvåker': 'monitoring', 'Løst': 'resolved' };
    if (statusMap[type]) {
      db.prepare('UPDATE incidents SET status = ? WHERE id = ?').run(statusMap[type], incidentId);
      if (type === 'Løst') db.prepare('UPDATE incidents SET resolved_at = ? WHERE id = ?').run(new Date().toISOString(), incidentId);
    }
  },
  getUpdates: (incidentId: string) => db.prepare('SELECT * FROM incident_updates WHERE incident_id = ? ORDER BY created_at').all(incidentId),
  delete: (id: string) => {
    db.prepare('DELETE FROM incident_updates WHERE incident_id = ?').run(id);
    db.prepare('DELETE FROM incidents WHERE id = ?').run(id);
  },
};

export default db;
