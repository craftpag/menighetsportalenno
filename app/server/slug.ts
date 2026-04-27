// MERK: Hold synkron med app/src/lib/slug.ts. Server-side speilvalidering.

const RESERVED_SLUGS = new Set([
  'admin', 'api', 'www', 'ssl', 'mail', 'blog', 'app',
  'kontroll', 'test', 'staging', 'prod', 'dev',
  'menighetsportalen', 'designblokk',
  '404', '500', 'auth', 'login', 'logg-inn', 'logg-ut',
  'registrer', 'oppsett', 'verifiser',
  'support', 'hjelp', 'kontakt', 'om', 'om-oss',
]);

export type SlugError =
  | 'too-short'
  | 'too-long'
  | 'invalid-chars'
  | 'invalid-format'
  | 'reserved';

export function validateSlug(slug: string): SlugError | null {
  if (slug.length < 3) return 'too-short';
  if (slug.length > 50) return 'too-long';
  if (!/^[a-z0-9-]+$/.test(slug)) return 'invalid-chars';
  if (slug.startsWith('-') || slug.endsWith('-') || slug.includes('--')) return 'invalid-format';
  if (RESERVED_SLUGS.has(slug)) return 'reserved';
  return null;
}
