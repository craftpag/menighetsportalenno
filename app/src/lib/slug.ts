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

export const SLUG_ERROR_MESSAGES: Record<SlugError, string> = {
  'too-short': 'Må være minst 3 tegn',
  'too-long': 'Maks 50 tegn',
  'invalid-chars': 'Kun små bokstaver, tall og bindestrek (-)',
  'invalid-format': 'Kan ikke starte/slutte med bindestrek eller ha to på rad',
  'reserved': 'Dette navnet er reservert — velg et annet',
};

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 50);
}

export function validateSlug(slug: string): SlugError | null {
  if (slug.length < 3) return 'too-short';
  if (slug.length > 50) return 'too-long';
  if (!/^[a-z0-9-]+$/.test(slug)) return 'invalid-chars';
  if (slug.startsWith('-') || slug.endsWith('-') || slug.includes('--')) return 'invalid-format';
  if (RESERVED_SLUGS.has(slug)) return 'reserved';
  return null;
}
