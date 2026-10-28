import { OWNER } from '../lib/siteInfo.js'
import LegalPage from './LegalPage.jsx'

// Privacy page ("Datenschutzerklärung"). Draft – to be checked for GDPR compliance.
function PrivacyPage() {
  return (
    <LegalPage title="Datenschutz">
      <h2>Verantwortlicher</h2>
      <p>
        {OWNER.name}, {OWNER.street}, {OWNER.city}
        <br />
        E-Mail: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
      </p>

      <h2>Kurz zusammengefasst</h2>
      <ul>
        <li>
          Kein Benutzerkonto, keine Cookies, kein Tracking, keine Werbung.
        </li>
        <li>Hochgeladene Fotos werden von EasyRecipe nicht gespeichert.</li>
        <li>
          Zur Analyse wird dein Foto an die Gemini API von Google übertragen.
        </li>
        <li>
          Deine IP-Adresse wird kurzzeitig für das Anfragelimit gespeichert.
        </li>
      </ul>

      <h2>Hosting</h2>
      <p>
        Die Website wird bei Vercel Inc. gehostet. Beim Aufruf verarbeitet
        Vercel technisch notwendige Daten wie IP-Adresse, Zeitpunkt und
        aufgerufene Seite, um die Website auszuliefern und abzusichern.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        am sicheren Betrieb). Die Serverfunktionen laufen in Frankfurt am Main.
      </p>

      <h2>Bildanalyse mit Google Gemini</h2>
      <p>
        Wenn du ein eigenes Foto analysieren lässt, werden das Foto und deine
        optionale Notiz an die Gemini API der Google LLC übertragen. Google kann
        Eingaben im kostenlosen Tarif zur Verbesserung seiner Dienste nutzen.
        Lade deshalb keine Fotos mit Personen oder privaten Daten hoch.
        EasyRecipe selbst speichert weder Foto noch Notiz. Die Beispielbilder
        auf der Startseite senden nichts an Google.
      </p>

      <h2>Anfragelimit mit Upstash</h2>
      <p>
        Damit der kostenlose KI-Dienst nicht von Einzelnen aufgebraucht wird,
        zählt EasyRecipe die Analysen pro IP-Adresse. Dafür wird die IP-Adresse
        bei Upstash Inc. (Rechenzentrum Frankfurt am Main) gespeichert und nach
        spätestens zwei Stunden automatisch gelöscht. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. f DSGVO (Schutz vor Missbrauch).
      </p>

      <h2>Schriften und Bilder</h2>
      <p>
        Schriftarten und Bilder werden direkt von dieser Website geladen. Es
        werden keine Daten an Google Fonts oder Unsplash übertragen.
      </p>

      <h2>Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung
        der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht
        auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Wende dich dazu
        an die oben genannte E-Mail-Adresse.
      </p>
    </LegalPage>
  )
}

export default PrivacyPage
