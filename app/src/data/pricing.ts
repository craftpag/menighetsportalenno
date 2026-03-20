export const mainPlan = {
  name: 'Menighetsportalen',
  price: '6 000',
  period: 'år',
  vatInfo: 'Inkludert MVA',
  description: 'Alt inkludert i plattformen. Ingen oppstartskostnad.',
  features: [
    'Komplett menighetsnettside',
    'Velg blant alle tilgjengelige maler',
    'Artikler, kalender, prekener, podcast',
    'Gavemottak med Vipps, kort, Google/Apple Pay',
    'Giverattester og regnskap',
    'Nettbutikk',
    'Medlemsregister',
    'Nyhetsbrev',
    'AI-assistent "Daniel"',
    'Automatisk bildeoptimalisering',
    'Ubegrenset antall brukere og roller',
    'Hosting og SSL inkludert',
    'Norsk support',
    'Alle fremtidige oppdateringer inkludert',
    'GDPR og WCAG 2.2 AA',
  ],
};

export const addOns = [
  {
    id: 'exclusive',
    name: 'Eksklusiv mal',
    price: '20 000',
    vatInfo: 'Inkludert MVA. Engangskostnad.',
    features: [
      'Vi designer en helt unik mal bare for din menighet',
      'Ingen andre menigheter får tilgang til den',
      'Du bestemmer design, farger, layout og stil',
      'Inkluderer 2 revisjonsrunder',
      'Ferdig levert innen 2–5 uker',
    ],
  },
  {
    id: 'custom',
    name: 'Tilpasset mal',
    price: '10 000',
    vatInfo: 'Inkludert MVA. Engangskostnad.',
    features: [
      'Vi designer en tilpasset mal i samarbeid med deg',
      'Malen blir tilgjengelig for andre menigheter etter lansering',
      'Du får den først og kan påvirke designet',
      'Inkluderer 1 revisjonsrunde',
      'Ferdig levert innen 2–5 uker',
    ],
  },
];
