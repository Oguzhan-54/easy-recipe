import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Decorative here – the name is already in the header logo */}
        <img src="/logo.svg" alt="" className={styles.logo} />
        <div className={styles.text}>
          <p>
            EasyRecipe ist ein Portfolio-Projekt. Die Rezepte sind KI-generiert,
            prüfe Mengen und Garzeiten also vor dem Kochen.
          </p>
          <p>
            <strong>Datenschutz:</strong> Hochgeladene Fotos werden zur Analyse
            an die Gemini API von Google übertragen und von EasyRecipe nicht
            gespeichert. Im kostenlosen Tarif kann Google Eingaben zur
            Verbesserung seiner Dienste nutzen. Für das Anfragelimit wird deine
            IP-Adresse kurzzeitig gespeichert und automatisch gelöscht.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
