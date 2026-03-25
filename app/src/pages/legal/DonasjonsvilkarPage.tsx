import { Link } from 'react-router-dom';
import { LegalLayout } from './LegalLayout';

export function DonasjonsvilkarPage() {
  return (
    <LegalLayout title="Vilkår for gaver og donasjoner" lastUpdated="18. mars 2026" currentPath="/donasjonsvilkar">
      <h2 id="hva-er-donasjon">1. Hva er en donasjon?</h2>
      <p>
        En donasjon er en frivillig, ensidig overføring av midler uten krav om motytelse. Donasjoner er ikke kjøp av varer eller tjenester og omfattes derfor <strong>ikke</strong> av forbrukerkjøpsloven eller angrerettloven.
      </p>
      <p>
        <strong>Viktig avgrensning:</strong> Dersom du mottar en vare eller tjeneste i bytte mot donasjonen (f.eks. «donér 500 kr og få en t-skjorte»), regnes transaksjonen som et kjøp, og fulle forbrukerrettigheter gjelder.
      </p>

      <h2 id="mottaker">2. Mottaker</h2>
      <p>
        Donasjoner mottas av den aktuelle menigheten/organisasjonen som driver sin nettside på Menighetsportalen. Mottakers fulle navn og organisasjonsnummer fremgår på den aktuelle menighetens nettside.
      </p>
      <h3>2.1 Plattform</h3>
      <p>
        Donasjoner behandles via plattformen <strong>Menighetsportalen</strong>, levert av Gaulin Gruppen (org.nr. 928 584 542). Gaulin Gruppen er kun teknisk tilrettelegger — alle donerte midler tilfaller den aktuelle menigheten direkte.
      </p>

      <h2 id="betalingsmetoder">3. Betalingsmetoder</h2>
      <p>Vi aksepterer donasjoner via følgende betalingsmetoder, alle behandlet av <strong>Dintero AS</strong> (org.nr. 919 904 638):</p>
      <ul>
        <li><strong>Bankkort</strong> — Visa og Mastercard</li>
        <li><strong>Vipps</strong> — Norsk mobilbetaling</li>
        <li><strong>Bankoverføring</strong> — Direkte til menighetens bankkonto</li>
      </ul>
      <p>
        All betalingsinformasjon behandles direkte av Dintero. Vi lagrer aldri kortnumre eller bankdetaljer. Første betaling krever sterk kundeautentisering (SCA) i henhold til PSD2. Ved å gjennomføre betaling aksepterer du også Dinteros sluttkundevilkår.
      </p>

      <h2 id="formalsbestemte">4. Formålsbestemte gaver</h2>
      <p>
        Du kan velge å øremerke din donasjon til et spesifikt formål (f.eks. misjon, ungdomsarbeid, diakoni). Menigheten forplikter seg til å bruke øremerkede gaver til det angitt formål.
      </p>
      <p>Dersom et formål er fullfinansiert eller avsluttet, vil menigheten kontakte deg for å avtale alternativ bruk av midlene.</p>

      <h2 id="faste-givere">5. Faste givere</h2>
      <p>Du kan registrere deg som fast giver med månedlige donasjoner. Som fast giver:</p>
      <ul>
        <li>Trekkes det avtalte beløpet automatisk hver måned</li>
        <li>Kan du endre beløp eller formål når som helst</li>
        <li>Kan du avslutte avtalen når som helst uten oppsigelsestid — via din brukerkonto eller ved å kontakte menigheten</li>
        <li>Mottar du en årsoppsummering for skattefradrag</li>
      </ul>

      <h2 id="skattefradrag">6. Skattefradrag for gaver</h2>
      <p><strong>Om gavefradrag (skatteloven § 6-50)</strong></p>
      <p>Du kan få fradrag for gaver til godkjente frivillige organisasjoner. Per 2026 gjelder følgende:</p>
      <ul>
        <li>Minimum samlet gave per år: 500 kr</li>
        <li>Maksimalt fradrag: 25 000 kr per person per år</li>
        <li>Fradraget gis automatisk i skattemeldingen</li>
        <li>Du må oppgi fødselsnummer for automatisk rapportering</li>
        <li>Organisasjonen må være godkjent av Skatteetaten</li>
      </ul>

      <h3>6.1 Automatisk innrapportering</h3>
      <p>
        Dersom du oppgir ditt fødselsnummer, rapporterer menigheten automatisk dine gaver til Skatteetaten via Altinn (tredjepartsopplysninger). Fradraget vil da fremkomme automatisk i din skattemelding.
      </p>

      <h3>6.2 Behandling av fødselsnummer</h3>
      <p>
        Ditt fødselsnummer behandles i samsvar med GDPR og personopplysningsloven. Det rettslige grunnlaget er rettslig forpliktelse (GDPR art. 6(1)(c)) — rapporteringsplikt etter skatteloven.
      </p>
      <ul>
        <li>Krypteres med AES-256 ved lagring</li>
        <li>Brukes utelukkende for rapportering til Skatteetaten</li>
        <li>Er kun tilgjengelig for autorisert personell</li>
        <li>Oppbevares i 5 år (jf. bokføringsloven § 13)</li>
        <li>Slettes etter oppbevaringsperioden</li>
      </ul>

      <h2 id="anonyme-gaver">7. Anonyme gaver</h2>
      <p>Du kan gi anonyme gaver uten å oppgi navn eller kontaktinformasjon. Vær oppmerksom på at:</p>
      <ul>
        <li>Anonyme gaver kvalifiserer ikke for skattefradrag</li>
        <li>Vi kan ikke utstede kvittering for anonyme gaver</li>
        <li>Anonyme gaver kan ikke refunderes</li>
      </ul>

      <h2 id="kvittering">8. Kvittering og dokumentasjon</h2>
      <p>Ved donasjoner der du oppgir e-postadresse, vil du motta:</p>
      <ul>
        <li>Bekreftelse per e-post umiddelbart etter donasjonen</li>
        <li>Årsoppgave over gaver i januar påfølgende år</li>
        <li>Tilgang til donasjonshistorikk i din brukerkonto</li>
      </ul>
      <p>Regnskapsmessig dokumentasjon oppbevares i 5 år i henhold til bokføringsloven § 13.</p>

      <h2 id="tilbakebetaling">9. Tilbakebetaling av donasjoner</h2>
      <p>Donasjoner er frivillige gaver og omfattes ikke av angrerettloven. Likevel behandles forespørsler om tilbakebetaling med forståelse:</p>
      <ul>
        <li><strong>Feilbelastning:</strong> Vi refunderer alltid ved feilbelastning eller teknisk feil</li>
        <li><strong>Dobbelttrekk eller feil beløp:</strong> Kontakt menigheten innen 30 dager for full refusjon</li>
        <li><strong>Andre tilfeller:</strong> Kontakt menigheten, og de vil vurdere tilbakebetaling på individuell basis</li>
      </ul>
      <p>Refusjoner behandles via Dintero og tilbakebetales til samme betalingsmiddel.</p>

      <h2 id="personvern">10. Personvern</h2>
      <p>Se <Link to="/personvern">personvernerklæring</Link> for fullstendig informasjon om behandling av personopplysninger i forbindelse med donasjoner.</p>

      <h2 id="transparens">11. Transparens</h2>
      <p>Menigheten forplikter seg til åpenhet om bruk av midler. Som giver har du rett til å:</p>
      <ul>
        <li>Be om innsyn i hvordan midlene brukes</li>
        <li>Motta årsrapport fra menigheten</li>
        <li>Se revidert regnskap (etter godkjenning av årsmøtet)</li>
      </ul>

      <h2 id="mva-fritak">12. MVA-fritak</h2>
      <p>Donasjoner er frivillige gaver uten motytelse og er ikke gjenstand for merverdiavgift (MVA). Donasjonsbeløp inkluderer ikke MVA.</p>

      <h2 id="kontakt">13. Kontakt</h2>
      <p>Spørsmål om gaver eller donasjoner rettes til den aktuelle menigheten. Kontaktinformasjon finner du på menighetens nettside.</p>
      <p>
        <strong>Menighetsportalen (plattformoperatør)</strong><br />
        Gaulin Gruppen — org.nr. 928 584 542<br />
        Gaulinveien 24, 1747 Skjeberg<br />
        E-post: <a href="mailto:hei@menighetsportalen.no">hei@menighetsportalen.no</a>
      </p>
    </LegalLayout>
  );
}
