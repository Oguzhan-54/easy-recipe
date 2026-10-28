import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ImprintPage from './components/ImprintPage.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'
import RecipesPage from './components/RecipesPage.jsx'
import ResultView from './components/ResultView.jsx'
import StartView from './components/StartView.jsx'
import { useAnalyzeImage } from './hooks/useAnalyzeImage.js'
import { resizeImage, validateImageFile } from './lib/resizeImage.js'

// Separate URLs for the extra pages. vercel.json sends these paths to index.html,
// so we pick the page here instead of using a router library.
const PAGES = {
  '/impressum': ImprintPage,
  '/datenschutz': PrivacyPage,
  '/rezepte': RecipesPage,
}

function App() {
  const PageView = PAGES[window.location.pathname]
  // The already resized image: { base64, mimeType, previewUrl },
  // or for a ready-made recipe: { previewUrl, isReadyMade: true }
  const [image, setImage] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [description, setDescription] = useState('')
  const { status, result, error, analyze, showDemo, reset } = useAnalyzeImage()

  const isLoading = status === 'loading'
  // Two "pages" without a router: the result page replaces the start page
  const showResult = status === 'success' && result.isFood

  // Start the result page at the top, not where the user scrolled to before
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [showResult])

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

  // Ready-made recipe: photo + stored recipe, no AI request
  function handleRecipeSelect(example) {
    setUploadError(null)
    setDescription('')
    setImage({ previewUrl: example.imageSrc, isReadyMade: true })
    showDemo(example.recipe)
  }

  function handleClearImage() {
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

  // Back to an empty start page
  function handleNewPhoto() {
    // Opened from another page (e.g. /rezepte): the upload card only exists on the start page
    if (window.location.pathname !== '/') {
      window.location.assign('/#hochladen')
      return
    }
    setImage(null)
    setDescription('')
    setUploadError(null)
    reset()
  }

  // At most one message is shown in the upload card
  let message = null
  if (uploadError) {
    message = { text: uploadError, tone: 'error' }
  } else if (status === 'error') {
    message = {
      text: error.message,
      tone: 'error',
      onRetry: error.retryable ? handleAnalyze : undefined,
    }
  } else if (status === 'success' && !result.isFood) {
    message = {
      text: 'Auf dem Foto konnte kein Essen erkannt werden. Probier es mit einem anderen Foto, auf dem das Gericht gut zu sehen ist.',
      tone: 'info',
    }
  }

  return (
    <>
      <Header onNewPhoto={showResult ? handleNewPhoto : undefined} />
      <main>
        {showResult ? (
          <ResultView
            recipe={result}
            previewUrl={image?.previewUrl}
            isReadyMade={image?.isReadyMade}
            onNewPhoto={handleNewPhoto}
          />
        ) : PageView ? (
          <PageView onSelect={handleRecipeSelect} />
        ) : (
          <StartView
            image={image}
            onFileSelect={handleFileSelect}
            onRecipeSelect={handleRecipeSelect}
            onClearImage={handleClearImage}
            description={description}
            onDescriptionChange={setDescription}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
            message={message}
          />
        )}
      </main>
      {/* On every page: the imprint must always be reachable */}
      <Footer hasActionBar={showResult} />
    </>
  )
}

export default App
