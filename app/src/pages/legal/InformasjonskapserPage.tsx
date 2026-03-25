import { Link } from 'react-router-dom';
import { LegalLayout } from './LegalLayout';

export function InformasjonskapserPage() {
  return (
    <LegalLayout title="Informasjonskapsler (cookies)" lastUpdated="18. mars 2026" currentPath="/informasjonskapsler">
      <h2 id="hva-er">1. Hva er informasjonskapsler?</h2>
      <p>
        Informasjonskapsler (cookies) er små tekstfiler som lagres på din enhet (datamaskin, nettbrett eller mobiltelefon) når du besøker en nettside. De brukes for å huske innstillinger, forbedre brukeropplevelsen og samle statistikk.
      </p>

      <h2 id="rettslig-grunnlag">2. Rettslig grunnlag</h2>
      <ul>
        <li><strong>Ekomloven § 3-15</strong> (ny fra 1. januar 2025) — krever informert, uttrykkelig samtykke for lagring av opplysninger på brukerens utstyr, med unntak av teknisk nødvendige informasjonskapsler. Samtykket må oppfylle GDPR-standarden (aktivt, fritt, spesifikt og informert).</li>
        <li><strong>Personvernforordningen (GDPR)</strong> — regulerer behandling av personopplysninger som kan samles inn via informasjonskapsler</li>
        <li><strong>Personopplysningsloven</strong> — norsk gjennomføring av GDPR</li>
      </ul>

      <h2 id="kategorier">3. Kategorier av informasjonskapsler</h2>

      <h3>3.1 Strengt nødvendige informasjonskapsler</h3>
      <p>Disse er nødvendige for at nettsiden skal fungere og kan ikke deaktiveres. De krever ikke samtykke i henhold til ekomloven § 3-15 (3).</p>
      <table>
        <thead>
          <tr><th>Navn</th><th>Formål</th><th>Varighet</th><th>Leverandør</th></tr>
        </thead>
        <tbody>
          <tr><td><code>session_token</code></td><td>Holde deg innlogget</td><td>Økt</td><td>Menighetsportalen</td></tr>
          <tr><td><code>refresh_token</code></td><td>Fornye innlogging</td><td>7 dager</td><td>Menighetsportalen</td></tr>
          <tr><td><code>cart_id</code></td><td>Huske handlekurven din</td><td>30 dager</td><td>Menighetsportalen</td></tr>
          <tr><td><code>cookie_consent</code></td><td>Lagre ditt samtykkevalg</td><td>365 dager</td><td>Menighetsportalen</td></tr>
        </tbody>
      </table>

      <h3>3.2 Statistikk-informasjonskapsler (krever samtykke)</h3>
      <p>Disse hjelper oss å forstå hvordan besøkende bruker nettsiden, slik at vi kan forbedre den. All data er anonymisert.</p>
      <table>
        <thead>
          <tr><th>Navn</th><th>Formål</th><th>Varighet</th><th>Leverandør</th></tr>
        </thead>
        <tbody>
          <tr><td><code>_ga</code></td><td>Skille brukere (anonymisert)</td><td>2 år</td><td>Google Analytics</td></tr>
          <tr><td><code>_ga_*</code></td><td>Opprettholde øktstatus</td><td>2 år</td><td>Google Analytics</td></tr>
          <tr><td><code>_gid</code></td><td>Skille brukere (anonymisert)</td><td>24 timer</td><td>Google Analytics</td></tr>
        </tbody>
      </table>

      <h3>3.3 Betalingsrelaterte informasjonskapsler</h3>
      <p>Disse settes av vår betalingsleverandør Dintero i forbindelse med betalingsprosessen. De er nødvendige for sikker betaling.</p>
      <table>
        <thead>
          <tr><th>Navn</th><th>Formål</th><th>Varighet</th><th>Leverandør</th></tr>
        </thead>
        <tbody>
          <tr><td><code>dintero_*</code></td><td>Betalingsøkt og svindelforebygging</td><td>Økt</td><td>Dintero AS</td></tr>
        </tbody>
      </table>

      <h2 id="tredjepart">4. Tredjepartsinformasjonskapsler</h2>
      <ul>
        <li><strong>Google Analytics</strong> — anonymisert bruksstatistikk. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Googles personvernerklæring</a></li>
        <li><strong>Dintero</strong> — sikker betalingsbehandling. <a href="https://www.dintero.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Dinteros personvernerklæring</a></li>
      </ul>

      <h2 id="samtykke">5. Samtykkeløsning</h2>
      <p>I henhold til ekomloven § 3-15 og GDPR art. 7 bruker vi et samtykkebanner som:</p>
      <ul>
        <li>Vises ved første besøk på nettsiden</li>
        <li>Lar deg velge hvilke kategorier du godtar (granulært valg)</li>
        <li>Ikke bruker mørke mønstre (dark patterns) — alle valg er likestilte</li>
        <li>Lar deg enkelt trekke tilbake samtykke når som helst</li>
        <li>Lagrer bevis på samtykke (tidspunkt og valg)</li>
      </ul>
      <p>Du kan når som helst endre dine samtykkevalg via «Informasjonskapsler»-lenken i bunnteksten på nettsiden.</p>

      <h2 id="nettleser">6. Administrere informasjonskapsler i nettleseren</h2>
      <p>Du kan også administrere informasjonskapsler direkte i nettleseren din:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/nb/kb/informasjonskapsler" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/nb-no/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/nb-no/microsoft-edge/slette-informasjonskapsler-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>
      <p><strong>Merk:</strong> Dersom du blokkerer nødvendige informasjonskapsler, kan deler av nettsiden slutte å fungere (f.eks. innlogging og handlekurv).</p>

      <h2 id="dataoverforing">7. Dataoverføring</h2>
      <p>
        Google Analytics kan overføre data til servere utenfor EØS-området. I slike tilfeller sikres overføringen gjennom EU-kommisjonens standardavtalevilkår (SCC) eller adekvat beslutning (EU-US Data Privacy Framework). Dintero behandler all betalingsdata innenfor EØS.
      </p>

      <h2 id="rettigheter">8. Dine rettigheter</h2>
      <ul>
        <li>Å bli informert om hvilke informasjonskapsler som brukes</li>
        <li>Å samtykke eller avslå ikke-nødvendige informasjonskapsler</li>
        <li>Å trekke tilbake samtykke når som helst</li>
        <li>Å be om innsyn i personopplysninger samlet inn via informasjonskapsler</li>
        <li>Å be om sletting av personopplysninger</li>
      </ul>
      <p>Se vår <Link to="/personvern">personvernerklæring</Link> for mer informasjon.</p>

      <h2 id="kontakt">9. Kontakt</h2>
      <p>Spørsmål om informasjonskapsler rettes til den aktuelle menigheten, eller til plattformoperatør:</p>
      <p>
        Gaulin Gruppen<br />
        Org.nr. 928 584 542<br />
        E-post: <a href="mailto:hei@menighetsportalen.no">hei@menighetsportalen.no</a>
      </p>
      <p>
        Du kan også kontakte <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">Datatilsynet</a> dersom du mener at bruken av informasjonskapsler er i strid med regelverket.
      </p>
    </LegalLayout>
  );
}
