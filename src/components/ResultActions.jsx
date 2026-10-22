import { useEffect, useState } from 'react'
import { recipeToText } from '../lib/formatRecipe.js'
import Button from './Button.jsx'
import { IconCamera, IconCheck, IconCopy } from './icons.jsx'
import styles from './ResultActions.module.css'

// How long "Kopiert" is shown after copying
const COPIED_RESET_MS = 2000

// "Weiteres Gericht analysieren" + "Rezept kopieren".
// Desktop: buttons below the title. Mobile: fixed bar at the bottom of the screen.
function ResultActions({ recipe, onNewPhoto }) {
  // 'idle' | 'copied' | 'failed'
  const [copyState, setCopyState] = useState('idle')

  // After a while, switch the button text back from "Kopiert" to normal
  useEffect(() => {
    if (copyState === 'idle') return
    const timeoutId = setTimeout(() => setCopyState('idle'), COPIED_RESET_MS)
    return () => clearTimeout(timeoutId)
  }, [copyState])

  async function handleCopy() {
    try {
      // Clipboard API of the browser (only works on https or localhost)
      await navigator.clipboard.writeText(recipeToText(recipe))
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  const copyLabel = {
    idle: 'Rezept kopieren',
    copied: 'Kopiert',
    failed: 'Kopieren fehlgeschlagen',
  }[copyState]

  return (
    <div className={styles.actions}>
      <Button size="lg" onClick={onNewPhoto} className={styles.newButton}>
        <IconCamera size={20} />
        <span>
          Weiteres Gericht
          <span className={styles.desktopOnly}> analysieren</span>
        </span>
      </Button>
      {/* aria-label: on mobile only the icon is visible, screen readers still get the text */}
      <Button
        variant="outline"
        size="lg"
        onClick={handleCopy}
        aria-label={copyLabel}
        className={styles.copyButton}
      >
        {copyState === 'copied' ? (
          <IconCheck size={20} />
        ) : (
          <IconCopy size={20} />
        )}
        <span className={styles.desktopOnly}>{copyLabel}</span>
      </Button>
      {/* Announces the result of copying to screen readers */}
      <span className={styles.srOnly} role="status">
        {copyState === 'copied' && 'Rezept in die Zwischenablage kopiert'}
        {copyState === 'failed' && 'Kopieren fehlgeschlagen'}
      </span>
    </div>
  )
}

export default ResultActions
