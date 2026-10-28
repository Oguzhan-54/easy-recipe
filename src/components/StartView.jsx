import Button from './Button.jsx'
import DescriptionInput from './DescriptionInput.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import HeroPreview from './HeroPreview.jsx'
import HowItWorks from './HowItWorks.jsx'
import ImageUpload from './ImageUpload.jsx'
import LoadingState from './LoadingState.jsx'
import styles from './StartView.module.css'

// Start page: hero, upload card, then "In drei Schritten" with recipes to cook.
// It only displays things – all state lives in App.jsx and comes in as props.
function StartView({
  image,
  onFileSelect,
  onRecipeSelect,
  onClearImage,
  description,
  onDescriptionChange,
  onSubmit,
  isLoading,
  message,
}) {
  function handleSubmit(event) {
    // A form would reload the page by default – we handle it ourselves
    event.preventDefault()
    onSubmit()
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <h1 className={styles.title}>
            Foto machen. <br />
            Rezept bekommen.
          </h1>
          <p className={styles.lead}>
            Lade ein Foto von einem beliebigen Gericht hoch. EasyRecipe erkennt
            das Essen, listet die Zutaten auf und führt dich Schritt für Schritt
            durchs Kochen.
          </p>
        </div>
        <div className={styles.heroPreview}>
          <HeroPreview imageSrc="/hero.jpg" />
        </div>
      </section>

      <section className={styles.upload} aria-label="Foto hochladen">
        {/* Desktop: photo on the left, note + button (or loading view) on the right */}
        <form id="hochladen" className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.dropArea}>
            <ImageUpload
              previewUrl={image?.previewUrl}
              onFileSelect={onFileSelect}
              onClear={onClearImage}
              disabled={isLoading}
              isScanning={isLoading}
            />
          </div>

          {/* aria-live: screen readers announce the loading view and messages */}
          <div className={styles.side} aria-live="polite">
            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                <DescriptionInput
                  value={description}
                  onChange={onDescriptionChange}
                />
                {message && (
                  <ErrorMessage
                    message={message.text}
                    tone={message.tone}
                    onRetry={message.onRetry}
                  />
                )}
                <Button type="submit" size="lg" fullWidth disabled={!image}>
                  Rezept erstellen
                </Button>
                {/* GDPR: short notice before the upload, details on the /datenschutz page */}
                <p className={styles.privacy}>
                  Dein Foto wird nicht gespeichert. Bitte keine Fotos mit
                  Personen oder privaten Daten hochladen.
                </p>
              </>
            )}
          </div>
        </form>
      </section>

      <HowItWorks onRecipeSelect={onRecipeSelect} />
    </>
  )
}

export default StartView
