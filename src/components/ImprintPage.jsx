import { OWNER } from '../lib/siteInfo.js'
import LegalPage from './LegalPage.jsx'

// Imprint ("Impressum", § 5 DDG) – the details come from siteInfo.js
function ImprintPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben zum Betreiber</h2>
      <p>
        {OWNER.name}
        <br />
        {OWNER.street}
        <br />
        {OWNER.city}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
      </p>

      <h2>Hinweis</h2>
      <p>
        EasyRecipe ist ein nicht-kommerzielles Portfolio-Projekt. Die Rezepte
        werden von einer KI erzeugt und können Fehler enthalten. Prüfe Zutaten,
        Mengen und Garzeiten vor dem Kochen.
      </p>
    </LegalPage>
  )
}

export default ImprintPage
