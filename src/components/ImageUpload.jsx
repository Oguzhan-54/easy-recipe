import { useState } from 'react'
import { ALLOWED_TYPES } from '../lib/resizeImage.js'
import styles from './ImageUpload.module.css'

// Upload area: click to choose a file (on phones also the camera) or drag & drop a photo.
// After selecting, it shows a preview instead.
function ImageUpload({
  previewUrl,
  onFileSelect,
  onClear,
  disabled,
  isScanning,
}) {
  const [isDragging, setIsDragging] = useState(false)

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
    // A <label> around the input: clicking anywhere in the area opens the file dialog
    <label
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        className={styles.input}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={styles.icon} aria-hidden="true">
        📷
      </span>
      <span className={styles.title}>Foto hierher ziehen</span>
      <span className={styles.hint}>oder klicken, um ein Foto auszuwählen</span>
      <span className={styles.formats}>JPG, PNG oder WebP</span>
    </label>
  )
}

export default ImageUpload
