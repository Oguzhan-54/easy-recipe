import { useState } from 'react'

// Longer than the backend needs for all Gemini attempts (50 s), so the backend can answer first
const REQUEST_TIMEOUT_MS = 60_000
// Demo mode: short fake loading time, so the loading animation is visible
const DEMO_DELAY_MS = 2000

// Sends an image to /api/analyze and keeps track of the request state.
// status: 'idle' | 'loading' | 'success' | 'error'
export function useAnalyzeImage() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function analyze({ base64, mimeType, description }) {
    setStatus('loading')
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType, description }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      // If the server sends no valid JSON (e.g. an HTML error page), data stays null
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        setError({
          message:
            data?.error?.message ??
            'Die Analyse ist fehlgeschlagen. Bitte versuche es erneut.',
          // 4xx = something was wrong with our request, retrying would not help
          retryable: response.status >= 500,
        })
        setStatus('error')
        return
      }

      setResult(data)
      setStatus('success')
    } catch (err) {
      setError({
        message:
          err.name === 'TimeoutError'
            ? 'Die Analyse hat zu lange gedauert. Bitte versuche es erneut.'
            : 'Keine Verbindung zum Server. Prüfe deine Internetverbindung.',
        retryable: true,
      })
      setStatus('error')
    }
  }

  // Demo mode: shows a stored recipe like a real result, without a request
  function showDemo(recipe) {
    setStatus('loading')
    setResult(null)
    setError(null)
    setTimeout(() => {
      setResult(recipe)
      setStatus('success')
    }, DEMO_DELAY_MS)
  }

  function reset() {
    setStatus('idle')
    setResult(null)
    setError(null)
  }

  return { status, result, error, analyze, showDemo, reset }
}
