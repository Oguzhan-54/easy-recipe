import { OWNER } from '../lib/siteInfo.js'
import LegalPage from './LegalPage.jsx'

// Imprint ("Impressum") per § 5 DDG and § 18 Abs. 1 MStV – the details come from siteInfo.js.
// Researched Oct 2026; not legal advice, check again before going live.
function ImprintPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG und § 18 Abs. 1 MStV</h2>
      <p>
        {OWNER.name}
        <br />
        {OWNER.street}
        <br />
        {OWNER.city}
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
      </p>

      <h2>Hinweis zu den Rezepten</h2>
      <p>
        EasyRecipe ist ein nicht-kommerzielles Projekt. Rezepte zu hochgeladenen
        Fotos werden von einer KI erzeugt. Die Mengen und Zeiten sind
        Schätzungen und können Fehler enthalten. Prüfe Zutaten, Mengen und
        Garzeiten vor dem Kochen und achte auf Unverträglichkeiten und
        Allergien.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Wie EasyRecipe mit deinen Daten umgeht, steht in der{' '}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
    </LegalPage>
  )
}

export default ImprintPage
