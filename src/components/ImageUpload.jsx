import { useRef, useState } from 'react'
import { ALLOWED_TYPES } from '../lib/resizeImage.js'
import Button from './Button.jsx'
import { IconCamera, IconUpload } from './icons.jsx'
import styles from './ImageUpload.module.css'

const ACCEPT = ALLOWED_TYPES.join(',')

// Upload area. Desktop: drag & drop or "Foto auswählen".
// Mobile: "Foto aufnehmen" (opens the camera directly) or "Aus Galerie wählen".
// After selecting, it shows a preview instead.
function ImageUpload({
  previewUrl,
  onFileSelect,
  onClear,
  disabled,
  isScanning,
}) {
  const [isDragging, setIsDragging] = useState(false)
  // References to the hidden file inputs, so our own buttons can open them
  const galleryInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  function handleChange(event) {
    const file = event.target.files[0]
    if (file) onFileSelect(file)
    // Reset the input, so choosing the same file again still triggers onChange
    event.target.value = ''
  }

  function handleDragOver(event) {
    // Without preventDefault the browser would open the image instead of allowing a drop
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  function handleDragLeave(event) {
    // dragleave also fires when moving over child elements – only react when really leaving
    if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file && !disabled) onFileSelect(file)
  }

  if (previewUrl) {
    return (
      <div className={styles.preview}>
        <div className={styles.imageWrapper}>
          <img
            src={previewUrl}
            alt="Vorschau des ausgewählten Fotos"
            className={styles.image}
          />
          {/* While analyzing, a light line moves over the photo like a scanner */}
          {isScanning && <div className={styles.scan} aria-hidden="true" />}
        </div>
        <button
          type="button"
          className={styles.changeButton}
          onClick={onClear}
          disabled={disabled}
        >
          Anderes Foto wählen
        </button>
      </div>
    )
  }

  return (
    <div
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden inputs – they are opened by the buttons below */}
      <input
        ref={galleryInputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleChange}
        hidden
      />
      {/* capture="environment" opens the back camera on phones */}
      <input
        ref={cameraInputRef}
        type="file"
        accept={ACCEPT}
        capture="environment"
        onChange={handleChange}
        hidden
      />

      <span className={styles.icon}>
        <IconUpload size={22} />
      </span>
      <p className={styles.title}>
        <span className={styles.desktopOnly}>Zieh dein Essensfoto hierher</span>
        <span className={styles.mobileOnly}>Essensfoto hinzufügen</span>
      </p>
      <p className={styles.formats}>JPG, PNG oder WebP, bis 10 MB</p>

      <div className={styles.buttons}>
        <Button
          variant="outline"
          className={styles.mobileOnly}
          onClick={() => cameraInputRef.current.click()}
          disabled={disabled}
          fullWidth
          size="lg"
        >
          <IconCamera size={20} />
          Foto aufnehmen
        </Button>
        <Button
          variant="outline"
          className={styles.mobileOnly}
          onClick={() => galleryInputRef.current.click()}
          disabled={disabled}
          fullWidth
          size="lg"
        >
          Aus Galerie wählen
        </Button>
        <Button
          variant="outline"
          className={styles.desktopOnly}
          onClick={() => galleryInputRef.current.click()}
          disabled={disabled}
        >
          Foto auswählen
        </Button>
      </div>
    </div>
  )
}

export default ImageUpload
