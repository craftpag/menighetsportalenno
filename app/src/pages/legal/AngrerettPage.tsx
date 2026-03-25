import { Link } from 'react-router-dom';
import { LegalLayout } from './LegalLayout';

export function AngrerettPage() {
  return (
    <LegalLayout title="Angrerett og retur" lastUpdated="18. mars 2026" currentPath="/angrerett">
      <h2 id="din-angrerett">1. Din angrerett</h2>
      <p>
        I henhold til <strong>angrerettloven § 20</strong> har du som forbruker rett til å angre kjøp av varer på nett innen 14 dager uten å oppgi noen grunn.
      </p>

      <h3>1.1 Fristens start (angrerettloven § 21)</h3>
      <ul>
        <li><strong>Fysiske varer:</strong> Dagen etter du mottok varen (eller siste vare ved delleveranse)</li>
        <li><strong>Tjenester:</strong> Dagen etter avtalen ble inngått</li>
        <li><strong>Digitalt innhold:</strong> Dagen etter avtalen ble inngått</li>
      </ul>
      <p>
        <strong>Viktig:</strong> Dersom du ikke har mottatt opplysninger om angreretten før avtaleinngåelsen, forlenges fristen med inntil 12 måneder (jf. angrerettloven § 21 (3)).
      </p>

      <h2 id="slik-angrer-du">2. Slik angrer du</h2>
      <ol>
        <li><strong>Gi selger beskjed</strong> — Kontakt den aktuelle menigheten per e-post innen 14 dager. Du kan bruke angrerettsskjemaet nederst på denne siden, eller gi beskjed på annen tydelig måte (jf. angrerettloven § 24).</li>
        <li><strong>Pakk varen forsvarlig</strong> — Varen skal returneres i vesentlig samme stand som du mottok den. Behold gjerne originalemballasjen.</li>
        <li><strong>Send varen tilbake</strong> — Du har 14 dager på å returnere varen etter at du ga beskjed (jf. angrerettloven § 25).</li>
        <li><strong>Motta refusjon</strong> — Selger refunderer kjøpesummen inkludert opprinnelig fraktkostnad (billigste alternativ) innen 14 dager etter at den returnerte varen er mottatt (jf. angrerettloven § 26).</li>
      </ol>

      <h2 id="returadresse">3. Returadresse</h2>
      <p>
        Returadresse er den aktuelle menighetens adresse. Denne finner du i ordrebekreftelsen eller på menighetens nettside. Merk pakken med «Retur» og ditt ordrenummer.
      </p>

      <h2 id="krav-til-varen">4. Krav til varen</h2>
      <p>Du har lov til å undersøke varen på samme måte som du ville gjort i en fysisk butikk. For at angrerett skal gjelde, må varen:</p>
      <ul>
        <li>Være i vesentlig samme stand som da du mottok den</li>
        <li>Være komplett med alle deler og tilbehør</li>
        <li>Ikke være skadet utover normal undersøking</li>
      </ul>

      <h3>4.1 Verdireduksjon</h3>
      <p>
        Hvis varen er brukt utover det som er nødvendig for å fastslå varens art, egenskaper og funksjon, kan selger trekke fra verdireduksjonen i refusjonen (jf. angrerettloven § 25 (3)).
      </p>

      <h2 id="unntak">5. Unntak fra angreretten</h2>
      <p>I henhold til <strong>angrerettloven § 22</strong> gjelder angreretten ikke for:</p>
      <ul>
        <li><strong>Billetter til arrangementer</strong> med bestemt dato (bokstav m) — f.eks. konserter, konferanser og gudstjenester med begrenset kapasitet</li>
        <li><strong>Digitalt innhold</strong> som ikke leveres på fysisk medium, der leveringen er påbegynt med ditt uttrykkelige samtykke og du har erkjent at angreretten bortfaller (bokstav l)</li>
        <li><strong>Spesialtilpassede varer</strong> som er tilvirket etter dine spesifikasjoner (bokstav c)</li>
        <li><strong>Forseglede hygieneprodukter</strong> der forseglingen er brutt etter levering (bokstav g)</li>
        <li><strong>Forseglede lyd-/videoopptak eller programvare</strong> der forseglingen er brutt (bokstav i)</li>
        <li><strong>Tjenester</strong> som er fullt utført med ditt forhåndssamtykke og erkjennelse av at angreretten bortfaller (bokstav b)</li>
      </ul>
      <p>
        <strong>Donasjoner:</strong> Donasjoner og gaver er frivillige overføringer og er ikke kjøp. De omfattes derfor ikke av angrerettloven. Se våre <Link to="/donasjonsvilkar">donasjonsvilkår</Link>.
      </p>

      <h2 id="refusjon">6. Refusjon</h2>
      <p>Ved godkjent retur refunderes:</p>
      <ul>
        <li>Varens pris (inkludert MVA)</li>
        <li>Opprinnelig fraktkostnad (billigste alternativ)</li>
      </ul>
      <p>Refusjonen skjer til samme betalingsmiddel som ble brukt ved kjøpet, med mindre annet er avtalt (jf. angrerettloven § 26 (1)). Refusjonen behandles via Dintero.</p>

      <h3>6.1 Returkostnader</h3>
      <p>
        Du må selv betale for retur av varen, med mindre selger har levert feil vare eller varen er defekt (jf. angrerettloven § 25 (2)). Vi anbefaler å bruke sporbar forsendelse.
      </p>

      <h2 id="defekte-varer">7. Defekte varer og feil levering</h2>
      <p>Hvis du har mottatt en defekt vare eller feil vare, har du rett til (jf. forbrukerkjøpsloven §§ 29-33):</p>
      <ul>
        <li>Gratis retur</li>
        <li>Retting eller omlevering</li>
        <li>Prisavslag</li>
        <li>Heving av kjøpet (ved vesentlig mangel)</li>
        <li>Erstatning</li>
      </ul>
      <p>Kontakt den aktuelle menigheten med beskrivelse og gjerne bilder av problemet. Reklamasjonsfrist er 2 år (5 år for varer som er ment å vare vesentlig lenger).</p>

      <h2 id="angrerettsskjema">8. Angrerettsskjema</h2>
      <p>
        Du kan bruke dette standardiserte skjemaet for å melde fra om at du ønsker å angre kjøpet. Skjemaet er i henhold til angrerettsloven vedlegg 3. Du kan fylle det ut direkte nedenfor og sende det elektronisk, eller kopiere teksten og sende per e-post til selger (den aktuelle menigheten).
      </p>

      <div className="bg-[#FAF9F7] border border-[#E5E2DD] rounded-lg p-6 mt-4">
        <h3 className="text-lg font-bold mb-4">ANGRERETTSSKJEMA</h3>
        <p className="text-sm text-[#4A4A4A] mb-4">(jf. angrerettsloven vedlegg 3)</p>
        <div className="space-y-3 text-sm">
          <p><strong>Til (menighetens navn):</strong></p>
          <p><strong>Menighetens e-post:</strong></p>
          <p>Jeg meddeler herved at jeg angrer min kjøpsavtale om følgende vare(r):</p>
          <p><strong>Vare(r):</strong></p>
          <p><strong>Ordrenummer:</strong></p>
          <p><strong>Bestilt den / mottatt den:</strong></p>
          <p><strong>Ditt navn:</strong></p>
          <p><strong>Din adresse:</strong></p>
          <p><strong>Din e-post:</strong></p>
          <p><strong>Dato:</strong></p>
        </div>
        <p className="text-sm text-[#4A4A4A] mt-4">Du kan også skrive ut denne siden og sende skjemaet per post til menighetens adresse.</p>
      </div>
    </LegalLayout>
  );
}
