import { OWNER, REPO_URL } from '../lib/siteInfo.js'
import styles from './Footer.module.css'

// Footer on every page: short info, legal links (must be reachable from everywhere), project links.
// hasActionBar: the result page has a fixed button bar at the bottom on phones.
function Footer({ hasActionBar = false }) {
  return (
    <footer
      className={`${styles.footer} ${hasActionBar ? styles.withActionBar : ''}`}
    >
      <div className={styles.inner}>
        <div>
          {/* Decorative here – the name is already in the header logo */}
          <img src="/logo.svg" alt="" className={styles.logo} />
          <p className={styles.text}>
            Foto hochladen, Rezept bekommen. EasyRecipe ist ein
            Portfolio-Projekt. Die Rezepte sind KI-generiert, prüfe Mengen und
            Garzeiten also vor dem Kochen.
          </p>
        </div>

        <nav aria-labelledby="footer-project">
          <h2 id="footer-project" className={styles.heading}>
            Projekt
          </h2>
          <ul className={styles.links}>
            <li>
              <a href="/#so-funktionierts">So funktioniert&apos;s</a>
            </li>
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                Quellcode auf GitHub
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className={styles.heading}>
            Rechtliches
          </h2>
          <ul className={styles.links}>
            <li>
              <a href="/impressum">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz">Datenschutz</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} {OWNER.name} · Bildanalyse mit Google
          Gemini · Fotos von{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
