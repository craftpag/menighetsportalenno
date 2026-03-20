export interface RoadmapItem {
  title: string;
  description?: string;
}

export interface RoadmapPhase {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'planned' | 'wishlist';
  items: RoadmapItem[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'launched',
    label: 'Lansert (Mars 2026)',
    status: 'completed',
    items: [
      { title: 'Komplett menighetsnettside med 3 designmaler' },
      { title: 'Artikler, kalender, prekener og podcast' },
      { title: 'Gavemottak med Vipps, kort, Google Pay og Apple Pay' },
      { title: 'Giverattester for skattefradrag' },
      { title: 'Regnskap med MVA-sporing' },
      { title: 'Nettbutikk med frakt og kuponger' },
      { title: 'Medlemsregister med familier' },
      { title: 'Nyhetsbrev via e-post' },
      { title: 'AI-assistent «Daniel» med 35+ operasjoner' },
      { title: 'Automatisk bildeoptimalisering' },
      { title: 'Dashboard med 18 widgets' },
      { title: 'Smågrupper, frivilligkoordinering og bønnevegg' },
      { title: 'GDPR-kompatibel og WCAG 2.2 AA tilgjengelig' },
      { title: 'Mørk modus og mobiloptimalisert' },
    ],
  },
  {
    id: 'q2-2026',
    label: 'Under utvikling (Q2 2026)',
    status: 'in-progress',
    items: [
      { title: 'SMS-varsling for hendelser og påminnelser' },
      { title: 'Nye designmaler (kvartalsvis lansering)' },
      { title: 'Forbedret kalender med påmelding og billetter' },
      { title: 'Utvidet betalingsintegrasjon med Klarna og bankoverføring' },
      { title: 'Komplett setup-wizard med automatisk sidegenerering' },
    ],
  },
  {
    id: 'q3-q4-2026',
    label: 'Planlagt (Q3–Q4 2026)',
    status: 'planned',
    items: [
      { title: 'Mobilapp for administrasjon' },
      { title: 'Livestreaming-integrasjon (YouTube/Vimeo)' },
      { title: 'Frivilligplanlegger med vaktlister' },
      { title: 'Avansert analyse og rapportering' },
      { title: 'Integrasjon med regnskapsprogrammer (Tripletex, Fiken)' },
      { title: 'Flerspråklig nettside (norsk + engelsk)' },
      { title: 'Arrangementsregistrering med betaling' },
      { title: 'AvtaleGiro for faste giveravtaler' },
    ],
  },
  {
    id: 'wishlist',
    label: 'På ønskelisten (2027+)',
    status: 'wishlist',
    items: [
      { title: 'BankID-innlogging' },
      { title: 'Menighetens egen app (hvitmerket)' },
      { title: 'Chatfunksjon for medlemmer' },
      { title: 'Barnepass-innsjekk (check-in/check-out)' },
      { title: 'Integrasjon med projektor/presentasjonssystemer' },
      { title: 'API for egne integrasjoner' },
    ],
  },
];
