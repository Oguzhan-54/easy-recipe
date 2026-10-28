import { OWNER } from '../lib/siteInfo.js'
import styles from './Footer.module.css'

// Footer on every page: a rosemary box (counterpart to the white header box) with the logo,
// page links and legal links (must be reachable from everywhere).
// hasActionBar: the result page has a fixed button bar at the bottom on phones.
function Footer({ hasActionBar = false }) {
  return (
    <footer
      className={`${styles.footer} ${hasActionBar ? styles.withActionBar : ''}`}
    >
      <div className={styles.box}>
        <div className={styles.inner}>
          {/* A normal link to "/" reloads the app = back to the start page */}
          <a href="/" className={styles.logoLink}>
            <img
              src="/logo.svg"
              alt="EasyRecipe – zur Startseite"
              className={styles.logo}
            />
          </a>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className={styles.heading}>
              Entdecken
            </h2>
            <ul className={styles.links}>
              <li>
                <a href="/rezepte">Rezepte</a>
              </li>
              <li>
                <a href="/#so-funktionierts">So funktioniert&apos;s</a>
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

        <p className={styles.bottom}>
          © {new Date().getFullYear()} {OWNER.name}
        </p>
      </div>
    </footer>
  )
}

export default Footer
