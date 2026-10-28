import { IconCamera, IconClock } from './icons.jsx'
import styles from './HeroPreview.module.css'

// What the AI "sees" on the Carbonara photo. flip = label left of the dot (near the right edge).
const HERO_TAGS = [
  { name: 'Spaghetti', amount: '200 g', top: '60%', left: '27%' },
  { name: 'Pecorino', amount: '50 g', top: '25%', left: '52%' },
  { name: 'Guanciale', amount: '100 g', top: '44%', left: '62%', flip: true },
]

// Decorative example on the right side of the start page (desktop only):
// shows what a result looks like. Without a photo it shows a striped placeholder.
// To use a real photo: put it into /public and pass e.g. imageSrc="/hero.jpg".
function HeroPreview({ imageSrc }) {
  return (
    <div className={styles.preview} aria-hidden="true">
      {imageSrc ? (
        <>
          <img src={imageSrc} alt="" className={styles.image} />
          {/* Ingredient tags pinned onto /hero.jpg – positions only fit that photo */}
          {HERO_TAGS.map((tag, index) => (
            <span
              key={tag.name}
              className={`${styles.tag} ${tag.flip ? styles.tagFlip : ''}`}
              style={{
                top: tag.top,
                left: tag.left,
                '--delay': `${index * 250}ms`,
              }}
            >
              <span className={styles.dot} />
              <span className={styles.tagLabel}>
                {tag.name} <span className={styles.amount}>{tag.amount}</span>
              </span>
            </span>
          ))}
        </>
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
