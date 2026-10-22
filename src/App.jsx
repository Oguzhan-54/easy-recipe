import { useState } from 'react'
import DescriptionInput from './components/DescriptionInput.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import ImageUpload from './components/ImageUpload.jsx'
import { useAnalyzeImage } from './hooks/useAnalyzeImage.js'
import { resizeImage, validateImageFile } from './lib/resizeImage.js'
import styles from './App.module.css'

function App() {
  // The already resized image: { base64, mimeType, previewUrl }
  const [image, setImage] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [description, setDescription] = useState('')
  const { status, result, error, analyze, reset } = useAnalyzeImage()

  const isLoading = status === 'loading'

  async function handleFileSelect(file) {
    reset()
    setUploadError(null)

    // Check before resizing – a wrong file never reaches the backend
    const validationError = validateImageFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    try {
      setImage(await resizeImage(file))
    } catch {
      setUploadError(
        'Das Foto konnte nicht gelesen werden. Bitte ein anderes wählen.',
      )
    }
  }

  function handleClear() {
    setImage(null)
    reset()
  }

  function handleAnalyze() {
    analyze({
      base64: image.base64,
      mimeType: image.mimeType,
      description: description.trim(),
    })
  }

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>EasyRecipe</h1>
        <p className={styles.subtitle}>
          Lade ein Foto von einem Gericht hoch und erhalte Zutaten, Rezept und
          Anleitung.
        </p>
      </header>

      <section className={styles.form} aria-label="Foto hochladen">
        <ImageUpload
          previewUrl={image?.previewUrl}
          onFileSelect={handleFileSelect}
          onClear={handleClear}
          disabled={isLoading}
        />
        {uploadError && <ErrorMessage message={uploadError} />}

        <DescriptionInput
          value={description}
          onChange={setDescription}
          disabled={isLoading}
        />

        <button
          type="button"
          className={styles.analyzeButton}
          onClick={handleAnalyze}
          disabled={!image || isLoading}
        >
          {isLoading ? 'Wird analysiert …' : 'Rezept erkennen'}
        </button>
      </section>

      {/* aria-live: screen readers announce changes in this area */}
      <section className={styles.output} aria-live="polite">
        {isLoading && (
          <p className={styles.loading}>
            Gericht wird analysiert … das dauert ca. 10 Sekunden.
          </p>
        )}
        {status === 'error' && (
          <ErrorMessage
            message={error.message}
            onRetry={error.retryable ? handleAnalyze : undefined}
          />
        )}
        {status === 'success' && (
          // Raw output for now – the real recipe view follows in phase 4
          <pre className={styles.result}>{JSON.stringify(result, null, 2)}</pre>
        )}
      </section>
    </main>
  )
}

export default App
