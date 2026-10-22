import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Decorative here – the name is already in the header logo */}
        <img src="/logo.svg" alt="" className={styles.logo} />
        <p className={styles.text}>
          EasyRecipe ist ein Portfolio-Projekt. Die Rezepte sind KI-generiert,
          prüfe Mengen und Garzeiten also vor dem Kochen.
        </p>
      </div>
    </footer>
  )
}

export default Footer
