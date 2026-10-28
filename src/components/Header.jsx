import Button from './Button.jsx'
import { IconUpload } from './icons.jsx'
import styles from './Header.module.css'

// Floating header box: logo on the left, "Rezepte" + "Bild hochladen" on the right.
// On the result page the button goes back to an empty start page (onNewPhoto),
// everywhere else it is a link to the upload card.
function Header({ onNewPhoto }) {
  const uploadProps = onNewPhoto
    ? { onClick: onNewPhoto }
    : { href: '/#hochladen' }

  return (
    <header className={styles.header}>
      <div className={styles.box}>
        {/* A normal link to "/" reloads the app = back to the start page */}
        <a href="/" className={styles.logoLink}>
          <img
            src="/logo.svg"
            alt="EasyRecipe – zur Startseite"
            className={styles.logo}
            width="63"
            height="53"
          />
        </a>

        <nav className={styles.nav} aria-label="Hauptnavigation">
          <a href="/rezepte" className={styles.navLink}>
            Rezepte
          </a>
          <Button size="sm" {...uploadProps}>
            <IconUpload size={16} />
            Bild hochladen
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
