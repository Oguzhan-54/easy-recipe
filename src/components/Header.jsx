import Button from './Button.jsx'
import { IconArrowLeft } from './icons.jsx'
import styles from './Header.module.css'

// Top bar. On the start page it links to "So funktioniert's",
// on the result page it shows a "Neues Foto" button instead.
function Header({ onNewPhoto }) {
  const isResultPage = Boolean(onNewPhoto)

  return (
    <header className={styles.header}>
      <div
        className={`${styles.inner} ${isResultPage ? styles.resultPage : ''}`}
      >
        {/* A normal link to "/" reloads the app = back to the start page */}
        <a href="/" className={styles.logoLink}>
          {/* The logo already contains the name, so the alt text is the name */}
          <img
            src="/logo.svg"
            alt="EasyRecipe – zur Startseite"
            className={styles.logo}
            width="81"
            height="71"
          />
        </a>

        {isResultPage ? (
          <Button variant="outline" onClick={onNewPhoto}>
            <IconArrowLeft size={18} />
            Neues Foto
          </Button>
        ) : (
          <a href="/#so-funktionierts" className={styles.navLink}>
            So funktioniert&apos;s
          </a>
        )}
      </div>
    </header>
  )
}

export default Header
