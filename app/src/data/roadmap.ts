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
      { title: 'Fondbasert giving med fremgangsvisning og målbeløp' },
      { title: 'Givekampanjer med pledges og frekvensvalg' },
      { title: 'Giveranalyse med segmentering, heatmap, retensjon og prognoser' },
      { title: 'Giverattester for skattefradrag' },
      { title: 'Regnskap med MVA-sporing, Tripletex og Fiken-integrasjon' },
      { title: 'Nettbutikk med frakt og kuponger' },
      { title: 'Medlemsregister med familier, tagger, egendefinerte felt og CRM' },
      { title: 'Duplikatdeteksjon med poengbasert matching og sammenslåing' },
      { title: 'Min Side — selvbetjeningsportal med 10 faner' },
      { title: 'Medlemsimport via CSV med 4-stegs veiviser' },
      { title: 'Nyhetsbrev og e-post med 25+ maler' },
      { title: 'SMS-varsling med norsk nummervalidering' },
      { title: 'Push-varslinger med 13 kategorier' },
      { title: 'Arbeidsflyter med 21 triggere og 14 steg-typer' },
      { title: 'Sekvenser/dryppkampanjer for onboarding og oppfølging' },
      { title: 'Segmentert meldingssending (grupper, tagger, lister)' },
      { title: 'Skjemabygger med 14 felttyper, dra-og-slipp og automatisering' },
      { title: 'Gudstjenesteplanlegger med dra-og-slipp, 10 elementtyper og maler' },
      { title: 'Innsjekking med QR, navnesøk, familieinnsjekk og barnesikkerhet' },
      { title: 'Oppmøtesporing med trender, per-medlemshistorikk og kiosk-modus' },
      { title: 'Besøkssporing med kilde, konvertering og oppfølging' },
      { title: 'Rom- og ressursbooking med prissetting og godkjenningsflyt' },
      { title: 'Direktesending med YouTube, Vimeo og Facebook Live' },
      { title: 'Kalender med påmelding, kapasitet, venteliste og billetter' },
      { title: 'Gjentakende hendelser og møteplaner' },
      { title: 'AI-assistent «Daniel» med 35+ operasjoner' },
      { title: 'AI-pipeline: transkripsjon → analyse → innholdsgenerering' },
      { title: 'Dashboard med 30 dra-og-slipp-widgets' },
      { title: 'Nettstedsanalyse med trender og toppinnhold' },
      { title: 'Rapporter: medlemsvekst, demografi, retensjon, engasjement' },
      { title: 'PWA med offline-støtte og installeringsbanner' },
      { title: 'Automatisk bildeoptimalisering' },
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
      { title: 'Nye designmaler (kvartalsvis lansering)' },
      { title: 'Visuell sidebygger for egendefinerte sider' },
      { title: 'AvtaleGiro for faste giveravtaler' },
      { title: 'KID-nummer generering og validering' },
      { title: '«Dekk gebyret»-valg for givere' },
      { title: 'Sangbibliotek med tekst, toneart og tagger' },
      { title: 'Påminnelser til påmeldte deltakere (e-post/SMS)' },
      { title: 'Kalender-sync med iCal/Google Calendar' },
      { title: 'Komplett setup-wizard med automatisk sidegenerering' },
    ],
  },
  {
    id: 'q3-q4-2026',
    label: 'Planlagt (Q3–Q4 2026)',
    status: 'planned',
    items: [
      { title: 'AI-videoklipp fra prekener for sosiale medier' },
      { title: 'Auto-publisering til Facebook, Instagram og YouTube' },
      { title: 'Dra-og-slipp e-postbygger (visuell)' },
      { title: 'Frivillig-vaktpåminnelser (push/SMS)' },
      { title: 'PDF-eksport for rapporter og styremøter' },
      { title: 'Klarna som betalingsalternativ' },
      { title: 'Flerspråklig nettside (norsk + engelsk)' },
      { title: 'Medlemskart med geografisk visualisering' },
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
      { title: 'Integrasjon med projektor/presentasjonssystemer' },
      { title: 'Zapier/Make-integrasjon' },
      { title: 'Offentlig API og SDK for tredjeparter' },
    ],
  },
];
