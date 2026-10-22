import { IconCamera, IconClock } from './icons.jsx'
import styles from './HeroPreview.module.css'

// Decorative example on the right side of the start page (desktop only):
// shows what a result looks like. Without a photo it shows a striped placeholder.
// To use a real photo: put it into /public and pass e.g. imageSrc="/hero.jpg".
function HeroPreview({ imageSrc }) {
  return (
    <div className={styles.preview} aria-hidden="true">
      {imageSrc ? (
        <img src={imageSrc} alt="" className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          <IconCamera size={36} strokeWidth={1.5} />
        </div>
      )}

      <div className={styles.card}>
        <div>
          <p className={styles.label}>Erkanntes Gericht</p>
          <p className={styles.dish}>Spaghetti Carbonara</p>
        </div>
        <span className={styles.chip}>
          <IconClock size={14} />
          25 Min.
        </span>
      </div>
    </div>
  )
}

export default HeroPreview
