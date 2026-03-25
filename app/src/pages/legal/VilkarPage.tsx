import { Link } from 'react-router-dom';
import { LegalLayout } from './LegalLayout';

export function VilkarPage() {
  return (
    <LegalLayout title="Kjøpsvilkår" lastUpdated="18. mars 2026" currentPath="/vilkar">
      <h2 id="innhold">Innhold</h2>
      <ol>
        <li><a href="#avtalen">Avtalen</a></li>
        <li><a href="#partene">Partene</a></li>
        <li><a href="#pris">Priser og betaling</a></li>
        <li><a href="#avtaleinngaelse">Avtaleinngåelse</a></li>
        <li><a href="#levering">Levering</a></li>
        <li><a href="#angrerett">Angrerett</a></li>
        <li><a href="#forsinkelse">Forsinkelse og mangler</a></li>
        <li><a href="#reklamasjon">Reklamasjon</a></li>
        <li><a href="#selgers-rettigheter">Selgerens rettigheter ved kjøperens mislighold</a></li>
        <li><a href="#personvern">Personvern</a></li>
        <li><a href="#force-majeure">Force majeure</a></li>
        <li><a href="#konfliktlosning">Konfliktløsning</a></li>
        <li><a href="#lovvalg">Lovvalg og verneting</a></li>
        <li><a href="#endringer">Endringer</a></li>
        <li><a href="#kontakt">Kontaktinformasjon</a></li>
      </ol>

      <h2 id="avtalen">1. Avtalen</h2>
      <p>
        Disse kjøpsvilkårene utgjør, sammen med din bestilling og eventuelt individuelt avtalte tilleggsvilkår, den fullstendige avtalen for kjøpet. Vilkårene er utformet i samsvar med <strong>angrerettloven</strong>, <strong>forbrukerkjøpsloven</strong>, <strong>ehandelsloven</strong>, <strong>markedsføringsloven</strong> og <strong>digitalytelsesloven</strong>.
      </p>
      <p>Ved motstrid mellom vilkårene og ufravikelig lovgivning, går lovgivningen foran.</p>

      <h2 id="partene">2. Partene</h2>
      <h3>2.1 Selger</h3>
      <p>
        Selger av varer og tjenester er den menigheten/organisasjonen som driver den aktuelle nettbutikken. Selgers fulle navn, organisasjonsnummer, adresse og kontaktinformasjon fremgår av den enkelte menighets nettside og ordrebekreftelsen du mottar.
      </p>
      <h3>2.2 Plattformoperatør</h3>
      <p>Nettbutikken drives på plattformen <strong>Menighetsportalen</strong>, levert av:</p>
      <p>
        Gaulin Gruppen<br />
        Org.nr.: 928 584 542<br />
        Gaulinveien 24, 1747 Skjeberg
      </p>
      <p>
        Gaulin Gruppen er teknisk tilrettelegger og ikke part i kjøpsavtalen mellom deg og selger. Spørsmål om bestillinger, levering og reklamasjon rettes direkte til selger (den aktuelle menigheten).
      </p>
      <h3>2.3 Kjøper</h3>
      <p>
        Kjøper er den personen som foretar bestillingen. Kjøper må være fylt 18 år for å handle i nettbutikken, eller ha samtykke fra forelder/foresatt.
      </p>

      <h2 id="pris">3. Priser og betaling</h2>
      <h3>3.1 Priser</h3>
      <ul>
        <li>Alle priser er oppgitt i norske kroner (NOK)</li>
        <li>Priser inkluderer merverdiavgift (MVA) der selger er MVA-registrert. Dersom selger ikke er MVA-pliktig, er dette tydelig angitt</li>
        <li>Fraktkostnader og eventuelle tilleggsavgifter vises før du fullfører bestillingen (jf. angrerettloven § 8 (1) bokstav e)</li>
        <li>Ved prisendringer etter bestilling, gjelder prisen som var oppgitt på bestillingstidspunktet</li>
      </ul>

      <h3>3.2 Opplysningsplikt før avtaleinngåelse</h3>
      <p>
        I henhold til angrerettloven § 8 skal du før avtaleinngåelse ha mottatt tydelig informasjon om varens hovedegenskaper, totalprisen inkludert avgifter, leveringskostnader, betalingsvilkår, angrerett, og selgers identitet. Denne informasjonen gis på bestillingssiden før du fullfører kjøpet.
      </p>

      <h3>3.3 Betalingsmetoder</h3>
      <p>
        Betaling behandles av <strong>Dintero AS</strong> (org.nr. 919 904 638), en norsk betalingsløsning. Følgende betalingsmetoder er tilgjengelige (avhengig av selgers oppsett):
      </p>
      <ul>
        <li>Bankkort (Visa, Mastercard)</li>
        <li>Vipps</li>
        <li>Bankoverføring</li>
      </ul>
      <p>
        All betalingsinformasjon behandles direkte av Dintero. Vi lagrer aldri kortnumre eller bankdetaljer. Betalingen er sikret med sterk kundeautentisering (SCA) i henhold til PSD2. Ved å gjennomføre betaling aksepterer du også{' '}
        <a href="https://www.dintero.com/legal/terms-for-end-customer" target="_blank" rel="noopener noreferrer">Dinteros sluttkundevilkår</a>.
      </p>
      <p>Beløp trekkes ved utsending av fysiske varer. For digitale produkter og billetter belastes kortet ved bestilling.</p>

      <h2 id="avtaleinngaelse">4. Avtaleinngåelse</h2>
      <p>
        En bindende kjøpsavtale inngås når du har sendt inn din bestilling og mottar en ordrebekreftelse på e-post. Du må aktivt godta kjøpsvilkårene for å fullføre bestillingen (jf. angrerettloven § 14). Forhåndsavkryssede bokser regnes ikke som gyldig samtykke.
      </p>
      <p>
        Vi forbeholder oss retten til å kansellere bestillinger ved feilprising, utsolgte varer, eller andre forhold som gjør levering umulig. Du vil i så tilfelle bli varslet og mottar full refusjon.
      </p>

      <h2 id="levering">5. Levering</h2>
      <h3>5.1 Leveringstid</h3>
      <p>
        Forventet leveringstid er angitt ved utsjekking. Dersom leveringstid ikke er oppgitt, skal varen leveres innen 30 dager etter bestilling (jf. forbrukerkjøpsloven § 6).
      </p>
      <h3>5.2 Leveringsadresse</h3>
      <p>Du er ansvarlig for å oppgi korrekt leveringsadresse. Ved feil adresse kan det påløpe ekstra fraktkostnader.</p>
      <h3>5.3 Risikoovergang</h3>
      <p>
        Risikoen for varen går over til deg når varen er levert, det vil si når du eller noen du har utpekt har fått varen i besittelse (jf. forbrukerkjøpsloven § 7).
      </p>

      <h2 id="angrerett">6. Angrerett</h2>
      <h3>6.1 Angrefrist</h3>
      <p>
        I henhold til <strong>angrerettloven § 20</strong> har du 14 dagers angrerett. Fristen løper fra dagen etter at du mottok varen (fysiske varer) eller fra dagen etter at avtalen ble inngått (tjenester og digitalt innhold).
      </p>
      <h3>6.2 Slik angrer du</h3>
      <ol>
        <li>Gi selger entydig beskjed innen 14 dager. Du kan bruke <Link to="/angrerett">angrerettsskjemaet</Link> eller gi beskjed på annen tydelig måte (f.eks. e-post)</li>
        <li>Returner varen innen 14 dager etter at du ga beskjed. Varen skal være i vesentlig samme stand som da du mottok den</li>
      </ol>
      <h3>6.3 Returkostnader</h3>
      <p>
        Du bærer selv kostnadene for retur av varen, med mindre selger har avtalt å dekke disse, eller det er levert feil vare (jf. angrerettloven § 25 (2)).
      </p>
      <h3>6.4 Refusjon</h3>
      <p>
        Ved gyldig angrerett refunderes kjøpesummen inkludert opprinnelig fraktkostnad (billigste fraktalternativ) innen 14 dager etter at den returnerte varen er mottatt eller bevis på retur er fremlagt. Refusjonen skjer til samme betalingsmiddel du brukte (jf. angrerettloven § 26).
      </p>
      <h3>6.5 Unntak fra angreretten</h3>
      <p>I henhold til <strong>angrerettloven § 22</strong> gjelder angreretten ikke for:</p>
      <ul>
        <li><strong>Billetter til arrangementer</strong> med bestemt dato (bokstav m) — f.eks. konserter, konferanser og gudstjenester med begrenset kapasitet</li>
        <li><strong>Digitalt innhold</strong> som ikke leveres på fysisk medium, dersom leveringen er påbegynt med ditt uttrykkelige samtykke og du har erkjent at angreretten bortfaller (bokstav l)</li>
        <li><strong>Spesialtilpassede varer</strong> som er tilvirket etter dine spesifikasjoner (bokstav c)</li>
        <li><strong>Forseglede hygieneprodukter</strong> der forseglingen er brutt etter levering (bokstav g)</li>
        <li><strong>Forseglede lyd-/videoopptak eller programvare</strong> der forseglingen er brutt (bokstav i)</li>
        <li><strong>Tjenester</strong> som er fullt utført med ditt uttrykkelige forhåndssamtykke og du har erkjent at angreretten bortfaller (bokstav b)</li>
      </ul>
      <h3>6.6 Verdireduksjon</h3>
      <p>
        Dersom varen er brukt utover det som er nødvendig for å fastslå varens art, egenskaper og funksjon, kan selger trekke fra verdireduksjonen i refusjonen (jf. angrerettloven § 25 (3)).
      </p>
      <p>Se fullstendig informasjon om angrerett på vår <Link to="/angrerett">angrerettsside</Link>.</p>

      <h2 id="forsinkelse">7. Forsinkelse og mangler</h2>
      <h3>7.1 Forsinkelse</h3>
      <p>Dersom varen ikke leveres til avtalt tid, kan du i henhold til forbrukerkjøpsloven:</p>
      <ul>
        <li>Holde tilbake kjøpesummen (§ 19)</li>
        <li>Kreve oppfyllelse (§ 21)</li>
        <li>Heve kjøpet ved vesentlig forsinkelse (§ 23)</li>
        <li>Kreve erstatning (§ 24)</li>
      </ul>
      <h3>7.2 Mangel</h3>
      <p>Dersom varen har en mangel, kan du i henhold til forbrukerkjøpsloven:</p>
      <ul>
        <li>Holde tilbake kjøpesummen (§ 28)</li>
        <li>Kreve retting eller omlevering (§ 29)</li>
        <li>Kreve prisavslag (§ 31)</li>
        <li>Heve kjøpet ved vesentlig mangel (§ 32)</li>
        <li>Kreve erstatning (§ 33)</li>
      </ul>
      <h3>7.3 Digitale ytelser</h3>
      <p>
        For digitalt innhold og digitale tjenester gjelder <strong>digitalytelsesloven</strong>. Ved mangel kan du kreve retting, prisavslag, heving eller erstatning (jf. digitalytelsesloven §§ 28-35).
      </p>

      <h2 id="reklamasjon">8. Reklamasjon</h2>
      <p>Reklamasjon må skje innen rimelig tid etter at du oppdaget eller burde ha oppdaget mangelen. Reklamasjonsfristen er:</p>
      <ul>
        <li><strong>2 år</strong> for de fleste varer (forbrukerkjøpsloven § 27)</li>
        <li><strong>5 år</strong> for varer som er ment å vare vesentlig lenger enn 2 år</li>
        <li>For digitale ytelser som leveres løpende, tilsvarer reklamasjonsfristen avtaleperioden (digitalytelsesloven § 30)</li>
      </ul>
      <p>Reklamasjon rettes direkte til selger (den aktuelle menigheten) med beskrivelse av mangelen. Legg gjerne ved bilder.</p>

      <h2 id="selgers-rettigheter">9. Selgerens rettigheter ved kjøperens mislighold</h2>
      <p>Dersom kjøperen ikke betaler eller oppfyller sine forpliktelser, kan selgeren i henhold til forbrukerkjøpsloven §§ 41-46:</p>
      <ul>
        <li>Holde varen tilbake</li>
        <li>Kreve oppfyllelse av avtalen</li>
        <li>Heve kjøpet</li>
        <li>Kreve erstatning</li>
      </ul>

      <h2 id="personvern">10. Personvern</h2>
      <p>
        Se vår <Link to="/personvern">personvernerklæring</Link> for informasjon om hvordan vi behandler dine personopplysninger. For informasjon om informasjonskapsler, se vår <Link to="/informasjonskapsler">cookie-policy</Link>.
      </p>

      <h2 id="force-majeure">11. Force majeure</h2>
      <p>
        Selger er ikke ansvarlig for forsinkelser eller mangler som skyldes forhold utenfor selgers kontroll, som naturkatastrofer, krig, streik, pandemier, eller offentlige restriksjoner.
      </p>

      <h2 id="konfliktlosning">12. Konfliktløsning</h2>
      <p>Klager rettes til den aktuelle menigheten (selger). Dersom tvisten ikke løses, kan du kontakte:</p>
      <ul>
        <li><strong>Forbrukertilsynet</strong> — <a href="https://www.forbrukertilsynet.no" target="_blank" rel="noopener noreferrer">forbrukertilsynet.no</a></li>
        <li><strong>Forbrukerrådet</strong> — tilbyr mekling i forbrukersaker. <a href="https://www.forbrukerradet.no" target="_blank" rel="noopener noreferrer">forbrukerradet.no</a></li>
        <li><strong>EU-kommisjonens klageportal (ODR)</strong> for netthandel — <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></li>
      </ul>

      <h2 id="lovvalg">13. Lovvalg og verneting</h2>
      <p>
        Kjøpsvilkårene er underlagt norsk lov. Eventuelle tvister skal søkes løst i minnelighet. Dersom dette ikke lykkes, kan tvisten bringes inn for de alminnelige domstoler med kjøperens verneting som utgangspunkt.
      </p>

      <h2 id="endringer">14. Endringer</h2>
      <p>
        Vi forbeholder oss retten til å endre disse vilkårene. Endringer gjelder kun for bestillinger etter at endringene er publisert. Vesentlige endringer vil varsles tydelig.
      </p>

      <h2 id="kontakt">15. Kontaktinformasjon</h2>
      <p>
        Spørsmål om bestillinger, levering, retur eller reklamasjon rettes til den aktuelle menigheten (selger). Kontaktinformasjon finner du på menighetens nettside og i ordrebekreftelsen.
      </p>
      <p>
        <strong>Menighetsportalen (plattformoperatør)</strong><br />
        Gaulin Gruppen — org.nr. 928 584 542<br />
        Gaulinveien 24, 1747 Skjeberg<br />
        E-post: <a href="mailto:hei@menighetsportalen.no">hei@menighetsportalen.no</a>
      </p>
    </LegalLayout>
  );
}
