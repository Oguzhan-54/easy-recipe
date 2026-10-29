import { OWNER } from '../lib/siteInfo.js'
import LegalPage from './LegalPage.jsx'

// Privacy policy ("Datenschutzerklärung") with the information required by Art. 13 GDPR.
// Researched Oct 2026 (provider terms of Vercel, Cloudflare Workers AI, Google Gemini API, Upstash);
// not legal advice. Vercel, Cloudflare and Upstash state DPF certification in their privacy policies;
// Cloudflare's DPA (v6.4) is part of the Self-Serve Subscription Agreement, so it covers free accounts.
// Google's DPF listing was not verified – check dataprivacyframework.gov before going live.
// Update it whenever a new service, cookie or external resource is added.
function PrivacyPage() {
  return (
    <LegalPage title="Datenschutz">
      <p>
        Hier erfährst du, welche personenbezogenen Daten beim Besuch von
        EasyRecipe verarbeitet werden, wozu, auf welcher Rechtsgrundlage, wie
        lange und welche Rechte du hast. Stand: Oktober 2026.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        <br />
        {OWNER.name}, {OWNER.street}, {OWNER.city}, Deutschland
        <br />
        E-Mail: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
      </p>
      <p>
        Ein Datenschutzbeauftragter ist nicht bestellt, weil dafür keine
        gesetzliche Pflicht besteht. Bei Fragen zum Datenschutz schreib einfach
        an die oben genannte E-Mail-Adresse.
      </p>

      <h2>2. Das Wichtigste in Kürze</h2>
      <ul>
        <li>
          Es gibt kein Benutzerkonto, keine Cookies, kein Tracking, keine
          Analyse-Tools und keine Werbung.
        </li>
        <li>
          Schriften und Bilder werden direkt von dieser Website geladen, nicht
          von fremden Servern.
        </li>
        <li>
          Wenn du ein eigenes Foto analysieren lässt, wird es zusammen mit
          deiner optionalen Notiz an Cloudflare Workers AI übertragen (nur bei
          einer Störung ersatzweise an Google Gemini). EasyRecipe selbst
          speichert weder Foto noch Notiz.
        </li>
        <li>
          Für das Anfragelimit wird deine IP-Adresse höchstens etwa zwei Stunden
          gespeichert.
        </li>
        <li>
          Die fertigen Rezepte auf der Startseite und unter „Rezepte“ senden
          keine Daten an einen KI-Dienst.
        </li>
      </ul>

      <h2>3. Aufruf der Website und Hosting</h2>
      <p>
        Die Website wird bei der Vercel Inc., 440 N Barranca Avenue #4133,
        Covina, CA 91723, USA, gehostet. Die Serverfunktionen von EasyRecipe
        laufen im Rechenzentrum Frankfurt am Main. Bei jedem Aufruf verarbeitet
        Vercel technisch notwendige Daten: deine IP-Adresse, daraus abgeleitet
        ungefähr Land und Stadt, Datum und Uhrzeit, die aufgerufene Seite,
        Browser- und Systeminformationen sowie technische Protokolldaten
        (Server-Logs).
      </p>
      <p>
        Zweck ist, dir die Website auszuliefern, sie stabil zu betreiben und vor
        Angriffen zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        Das berechtigte Interesse liegt in einer sicheren und funktionierenden
        Website. Die Laufzeit-Protokolle der Serverfunktionen sind im genutzten
        Tarif nur etwa eine Stunde abrufbar. Vercel kann Protokolldaten zur
        Sicherheit und Fehleranalyse darüber hinaus nach eigenen Vorgaben
        aufbewahren. EasyRecipe wertet diese Daten nicht aus und protokolliert
        selbst nur technische Fehlermeldungen, niemals Fotos oder Notizen.
      </p>
      <p>
        Vercel verarbeitet die Daten als Auftragsverarbeiter auf Grundlage
        seines Auftragsverarbeitungsvertrags (Data Processing Addendum). Dabei
        können Daten in die USA übermittelt werden. Vercel ist unter dem EU-US
        Data Privacy Framework zertifiziert, für das ein
        Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO).
      </p>

      <h2>4. Keine Cookies, kein Tracking</h2>
      <p>
        EasyRecipe setzt keine Cookies und speichert nichts auf deinem Gerät
        (kein Local Storage, keine Tracking-Pixel). Es werden keine
        Analyse-Dienste, Social-Media-Plugins, Karten, Videos oder Schriften von
        fremden Servern eingebunden. Eine Einwilligung nach § 25 TDDDG ist
        deshalb nicht nötig, und es gibt kein Cookie-Banner. Die Funktion
        „Rezept kopieren“ legt das Rezept nur lokal in deiner Zwischenablage ab.
      </p>

      <h2>5. Bildanalyse mit Cloudflare Workers AI und Google Gemini</h2>
      <p>
        Wenn du ein eigenes Foto hochlädst und auf „Rezept erstellen“ klickst,
        wird das Foto zuerst in deinem Browser verkleinert. Danach werden das
        verkleinerte Foto und deine optionale Notiz über die Serverfunktion von
        EasyRecipe an einen KI-Dienst übertragen. Dieser erkennt das Gericht und
        schickt ein Rezept zurück, das dir angezeigt wird.
      </p>
      <p>
        Zweck ist, dir die von dir angeforderte Rezepterkennung bereitzustellen.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Nutzung der von dir
        angeforderten Funktion). Das Hochladen ist freiwillig. Ohne Foto kann
        kein Rezept erstellt werden, die fertigen Rezepte kannst du aber
        jederzeit ohne Upload nutzen. EasyRecipe speichert weder das Foto noch
        die Notiz oder das erzeugte Rezept. Nach dem Schließen oder Neuladen der
        Seite ist alles weg.
      </p>
      <p>
        <strong>Cloudflare Workers AI (Standard):</strong> Anbieter ist die
        Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA. Die
        Analyse läuft über das KI-Modell Mistral Small 3.1, das Cloudflare auf
        eigenen Servern betreibt. Cloudflare verarbeitet Foto und Notiz nur so
        lange, wie es für die Anfrage nötig ist, speichert sie danach nicht und
        verwendet sie nicht, um KI-Modelle zu trainieren. Cloudflare handelt als
        Auftragsverarbeiter auf Grundlage seines Auftragsverarbeitungsvertrags
        (Data Processing Addendum). Die Anfrage kann in Rechenzentren außerhalb
        der EU verarbeitet werden, insbesondere in den USA. Cloudflare ist unter
        dem EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO) und nutzt
        ergänzend Standardvertragsklauseln (Art. 46 DSGVO).
      </p>
      <p>
        <strong>Google Gemini (nur ersatzweise):</strong> Nur wenn Cloudflare
        gestört ist, zu lange braucht oder keine gültige Antwort liefert, wird
        dieselbe Anfrage an die Gemini API der Google LLC, 1600 Amphitheatre
        Parkway, Mountain View, CA 94043, USA, geschickt. Google verarbeitet die
        Anfrage nach den Gemini-API-Bedingungen für Nutzer im Europäischen
        Wirtschaftsraum als Auftragsverarbeiter und verwendet Fotos, Notizen und
        Antworten nicht, um seine Produkte oder KI-Modelle zu verbessern. Google
        protokolliert Anfragen und Antworten für einen begrenzten Zeitraum,
        ausschließlich um Missbrauch zu erkennen und gesetzlichen Pflichten
        nachzukommen. Die Daten können dabei auch außerhalb der EU verarbeitet
        werden, insbesondere in den USA. Grundlage dafür sind das EU-US Data
        Privacy Framework (Art. 45 DSGVO) bzw. die Standardvertragsklauseln der
        EU-Kommission (Art. 46 DSGVO), die Google in seinem
        Auftragsverarbeitungsvertrag verwendet.
      </p>
      <p>
        Bitte lade keine Fotos hoch, auf denen Personen, Gesichter, Kennzeichen,
        Dokumente oder andere private Informationen zu sehen sind. Für die
        Rezepterkennung reicht ein Foto des Gerichts.
      </p>

      <h2>6. Anfragelimit mit Upstash</h2>
      <p>
        Damit der KI-Dienst nicht von Einzelnen oder automatisierten Programmen
        aufgebraucht wird, zählt EasyRecipe die Analysen pro IP-Adresse
        (höchstens fünf pro Stunde). Dafür wird deine IP-Adresse zusammen mit
        einem Zeitstempel in einer Datenbank der Upstash, Inc., USA,
        gespeichert. Die Datenbank liegt im Rechenzentrum Frankfurt am Main. Die
        Einträge werden nach spätestens etwa zwei Stunden automatisch gelöscht.
        Zusätzlich gibt es einen Tageszähler für alle Analysen zusammen, der
        keine personenbezogenen Daten enthält.
      </p>
      <p>
        Die IP-Adresse wird nur gezählt, wenn du eine eigene Analyse startest,
        nicht beim bloßen Besuch der Website. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. f DSGVO. Das berechtigte Interesse liegt darin, Missbrauch zu
        verhindern und den Dienst für alle verfügbar zu halten. Upstash
        verarbeitet die Daten als Auftragsverarbeiter auf Grundlage seines
        Auftragsverarbeitungsvertrags und ist unter dem EU-US Data Privacy
        Framework zertifiziert (Art. 45 DSGVO).
      </p>

      <h2>7. Kontakt per E-Mail</h2>
      <p>
        Wenn du mir eine E-Mail schreibst, verarbeite ich deine E-Mail-Adresse,
        deinen Namen (falls angegeben) und den Inhalt deiner Nachricht, um deine
        Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        Das berechtigte Interesse liegt in der Beantwortung deiner Anfrage.
        Deine Nachricht wird gelöscht, sobald sie erledigt ist und keine
        gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>8. Empfänger und Übermittlung in Drittländer</h2>
      <p>
        Empfänger deiner Daten sind ausschließlich die oben genannten
        Dienstleister: Vercel Inc. (Hosting), Cloudflare, Inc. (Bildanalyse, nur
        bei eigenem Upload), Google LLC (Bildanalyse, nur ersatzweise bei einer
        Störung von Cloudflare) und Upstash, Inc. (Anfragelimit, nur bei eigenem
        Upload). Alle vier haben ihren Sitz in den USA. Übermittlungen dorthin
        stützen sich auf das EU-US Data Privacy Framework, für das ein
        Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO), und
        ergänzend auf Standardvertragsklauseln (Art. 46 DSGVO). Darüber hinaus
        werden deine Daten nicht weitergegeben und nicht verkauft.
      </p>

      <h2>9. Keine automatisierte Entscheidungsfindung</h2>
      <p>
        Es findet keine automatisierte Entscheidungsfindung und kein Profiling
        im Sinne von Art. 22 DSGVO statt. Die KI erzeugt nur einen
        Rezeptvorschlag zu deinem Foto. Dieser hat keine rechtliche oder ähnlich
        erhebliche Wirkung für dich.
      </p>

      <h2>10. Datensicherheit</h2>
      <p>
        Alle Verbindungen zu EasyRecipe sind per HTTPS (TLS) verschlüsselt. Der
        Zugang zu den KI-Diensten ist nur dem Server bekannt und nie im Browser
        sichtbar.
      </p>

      <h2>11. Deine Rechte</h2>
      <p>
        Du hast nach der DSGVO jederzeit das Recht auf Auskunft über deine
        verarbeiteten Daten (Art. 15), auf Berichtigung (Art. 16), auf Löschung
        (Art. 17), auf Einschränkung der Verarbeitung (Art. 18) und auf
        Datenübertragbarkeit (Art. 20). Wende dich dazu an die oben genannte
        E-Mail-Adresse.
      </p>
      <p>
        <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Soweit die
        Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, kannst du ihr aus
        Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit
        widersprechen. Die Verarbeitung wird dann eingestellt, es sei denn, es
        liegen zwingende schutzwürdige Gründe vor oder sie dient der
        Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
      </p>
      <p>
        <strong>Beschwerderecht (Art. 77 DSGVO):</strong> Du kannst dich bei
        einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig für EasyRecipe
        ist die Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf, E-Mail:
        poststelle@ldi.nrw.de, Website:{' '}
        <a href="https://www.ldi.nrw.de" target="_blank" rel="noreferrer">
          www.ldi.nrw.de
        </a>
        . Du kannst dich auch an die Aufsichtsbehörde an deinem Wohnort wenden.
      </p>

      <h2>12. Änderungen</h2>
      <p>
        Diese Datenschutzerklärung wird angepasst, wenn sich EasyRecipe oder die
        genutzten Dienste ändern. Es gilt die jeweils hier veröffentlichte
        Fassung.
      </p>
    </LegalPage>
  )
}

export default PrivacyPage
