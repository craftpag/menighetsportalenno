export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Hva skjer etter gratisperioden?',
    answer: 'Du velger selv om du vil fortsette. Ingen automatisk belastning. Vi tar kontakt før perioden er over, og du kan enkelt si nei hvis det ikke passer.',
  },
  {
    question: 'Kan vi bytte mal senere?',
    answer: 'Ja, når som helst. Innholdet ditt overføres automatisk til den nye malen. Det tar bare noen få klikk å bytte.',
  },
  {
    question: 'Hva med domenet vårt?',
    answer: 'Vi hjelper deg med å peke domenet ditt til Menighetsportalen. Dette gjøres vanligvis på under en time, og vi guider deg gjennom hele prosessen.',
  },
  {
    question: 'Er det bindingstid?',
    answer: 'Nei. Du kan si opp når som helst med 30 dagers varsel. Ingen kostnader ved oppsigelse.',
  },
  {
    question: 'Kan vi importere fra WordPress?',
    answer: 'Vi hjelper med migrering som en del av oppstarten. Artikler, bilder og annet innhold kan overføres til Menighetsportalen.',
  },
  {
    question: 'Hvem eier innholdet vårt?',
    answer: 'Dere eier alltid alt innhold og data. Ved oppsigelse får dere full eksport av alt innhold. Vi lagrer aldri data lenger enn nødvendig.',
  },
  {
    question: 'Hva med personvern?',
    answer: 'All data lagres i Norge/EU. Full GDPR-kompatibilitet med samtykkebehandling innebygd. Vi tar personvern på alvor.',
  },
  {
    question: 'Hva koster betalinger og transaksjoner?',
    answer: 'Det tilkommer et transaksjonsgebyr på 2% på alle betalinger (gaver, nettbutikk) i tillegg til betalingsleverandørens gebyrer. E-post og SMS er inkludert med rimelig bruk — ved høyere volum kan det tilkomme ekstra kostnader.',
  },
];
