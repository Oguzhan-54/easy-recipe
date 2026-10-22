import Button from './Button.jsx'
import DescriptionInput from './DescriptionInput.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import HeroPreview from './HeroPreview.jsx'
import HowItWorks from './HowItWorks.jsx'
import ImageUpload from './ImageUpload.jsx'
import LoadingState from './LoadingState.jsx'
import { IconArrowRight } from './icons.jsx'
import styles from './StartView.module.css'

// Start page: hero with upload card + "In drei Schritten" section.
// It only displays things – all state lives in App.jsx and comes in as props.
function StartView({
  image,
  onFileSelect,
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

          <form className={styles.card} onSubmit={handleSubmit}>
            <ImageUpload
              previewUrl={image?.previewUrl}
              onFileSelect={onFileSelect}
              onClear={onClearImage}
              disabled={isLoading}
              isScanning={isLoading}
            />
            <DescriptionInput
              value={description}
              onChange={onDescriptionChange}
              disabled={isLoading}
            />
            {message && (
              <ErrorMessage
                message={message.text}
                tone={message.tone}
                onRetry={message.onRetry}
              />
            )}
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={!image || isLoading}
            >
              {isLoading ? (
                'Wird analysiert …'
              ) : (
                <>
                  Rezept erstellen
                  <IconArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* aria-live: screen readers announce when the loading state appears */}
        <div className={styles.aside} aria-live="polite">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className={styles.heroPreview}>
              <HeroPreview imageSrc="/hero.jpg" />
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
    </>
  )
}

export default StartView
