import { useEffect, useState } from 'react'
import styles from './LoadingState.module.css'

// Rough stages of what the AI does. They are not real progress, just a hint that work is going on.
const MESSAGES = [
  'Foto wird angeschaut …',
  'Zutaten werden erkannt …',
  'Mengen werden geschätzt …',
  'Rezept wird geschrieben …',
]
const MESSAGE_INTERVAL_MS = 2500

// Animated loading view: steaming pot, changing status text and a shimmering
// placeholder ("skeleton") in the shape of the recipe that will appear.
function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Stay on the last message instead of starting over
      setMessageIndex((index) => Math.min(index + 1, MESSAGES.length - 1))
    }, MESSAGE_INTERVAL_MS)
    // Cleanup: stop the timer when the component disappears (e.g. result arrived)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.loading} role="status">
      {/* Screen readers only hear this once, not every changing message */}
      <span className={styles.srOnly}>Gericht wird analysiert.</span>

      <div className={styles.header} aria-hidden="true">
        <CookingPot />
        <div>
          {/* A new key re-mounts the element, so the fade-in animation runs again */}
          <p key={messageIndex} className={styles.message}>
            {MESSAGES[messageIndex]}
          </p>
          <p className={styles.duration}>Das dauert ca. 10 Sekunden.</p>
        </div>
      </div>

      <div className={styles.skeleton} aria-hidden="true">
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={styles.facts}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`${styles.bone} ${styles.fact}`} />
          ))}
        </div>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`${styles.bone} ${styles.row}`} />
        ))}
      </div>
    </div>
  )
}

function CookingPot() {
  return (
    <svg className={styles.pot} viewBox="0 0 64 64" width="64" height="64">
      {/* Three steam lines, animated one after another */}
      <g className={styles.steam}>
        <path d="M22 18c-3-4 3-6 0-10" />
        <path d="M32 18c-3-4 3-6 0-10" />
        <path d="M42 18c-3-4 3-6 0-10" />
      </g>
      {/* Lid that wobbles as if the water is boiling */}
      <g className={styles.lid}>
        <rect x="14" y="24" width="36" height="5" rx="2.5" />
        <rect x="28" y="20" width="8" height="5" rx="2" />
      </g>
      {/* Pot with handles */}
      <path
        className={styles.body}
        d="M12 31h40v17a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8z"
      />
      <rect className={styles.body} x="5" y="34" width="8" height="4" rx="2" />
      <rect className={styles.body} x="51" y="34" width="8" height="4" rx="2" />
    </svg>
  )
}

export default LoadingState
