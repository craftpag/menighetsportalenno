export interface ComparisonRow {
  feature: string;
  menighetsportalen: string | boolean;
  wordpress: string | boolean;
  agency: string | boolean;
  squarespace: string | boolean;
  tithely: string | boolean;
}

export const comparisonData: ComparisonRow[] = [
  {
    feature: 'Årlig kostnad',
    menighetsportalen: '6 000 kr',
    wordpress: '30 000–41 000 kr',
    agency: '60 000–120 000 kr',
    squarespace: '9 000–14 000 kr',
    tithely: '~13 000 kr + gebyrer',
  },
  {
    feature: 'Skreddersydd for menigheter',
    menighetsportalen: true,
    wordpress: false,
    agency: 'Delvis',
    squarespace: false,
    tithely: true,
  },
  {
    feature: 'Gaver med Vipps',
    menighetsportalen: true,
    wordpress: 'Vanskelig',
    agency: 'Mulig',
    squarespace: false,
    tithely: false,
  },
  {
    feature: 'Giverattester (norsk)',
    menighetsportalen: true,
    wordpress: false,
    agency: 'Egenutviklet',
    squarespace: false,
    tithely: false,
  },
  {
    feature: 'Regnskap/MVA',
    menighetsportalen: true,
    wordpress: false,
    agency: 'Egenutviklet',
    squarespace: false,
    tithely: false,
  },
  {
    feature: 'Medlemsregister',
    menighetsportalen: true,
    wordpress: 'Plugin (~650 kr/år)',
    agency: 'Mulig',
    squarespace: false,
    tithely: 'Delvis',
  },
  {
    feature: 'Nettbutikk',
    menighetsportalen: true,
    wordpress: 'WooCommerce (~3 000 kr/år)',
    agency: 'Mulig',
    squarespace: 'Delvis',
    tithely: false,
  },
  {
    feature: 'Prekener og podcast',
    menighetsportalen: true,
    wordpress: 'Plugin (~1 100 kr/år)',
    agency: 'Mulig',
    squarespace: false,
    tithely: true,
  },
  {
    feature: 'Kalender',
    menighetsportalen: true,
    wordpress: 'Plugin (~1 600 kr/år)',
    agency: 'Mulig',
    squarespace: 'Enkel',
    tithely: true,
  },
  {
    feature: 'Nyhetsbrev',
    menighetsportalen: true,
    wordpress: 'Mailchimp (~1 700 kr/år)',
    agency: 'Mulig',
    squarespace: 'Enkel',
    tithely: true,
  },
  {
    feature: 'WCAG 2.2 AA',
    menighetsportalen: true,
    wordpress: 'Sjelden',
    agency: 'Varierer',
    squarespace: 'Delvis',
    tithely: false,
  },
  {
    feature: 'Norsk språk gjennomgående',
    menighetsportalen: true,
    wordpress: 'Delvis',
    agency: 'Varierer',
    squarespace: false,
    tithely: false,
  },
  {
    feature: 'AI-assistent',
    menighetsportalen: true,
    wordpress: 'Plugin (~1 850 kr/år)',
    agency: false,
    squarespace: false,
    tithely: false,
  },
  {
    feature: 'Vedlikehold nødvendig',
    menighetsportalen: 'Ingen',
    wordpress: '48+ timer/år',
    agency: 'Lite',
    squarespace: 'Lite',
    tithely: 'Lite',
  },
  {
    feature: 'Norsk support',
    menighetsportalen: true,
    wordpress: 'Fellesforum (engelsk)',
    agency: 'Varierer',
    squarespace: 'Engelsk',
    tithely: 'Engelsk',
  },
  {
    feature: 'Antall plugins å holde oppdatert',
    menighetsportalen: '0',
    wordpress: '15–20',
    agency: '15–20',
    squarespace: '0',
    tithely: '0',
  },
];

export const competitors = [
  { key: 'menighetsportalen', name: 'Menighetsportalen', highlight: true },
  { key: 'wordpress', name: 'WordPress (fullutrustet)', highlight: false },
  { key: 'agency', name: 'Byrå + WordPress', highlight: false },
  { key: 'squarespace', name: 'Squarespace/Wix', highlight: false },
  { key: 'tithely', name: 'Tithe.ly (USA)', highlight: false },
];
