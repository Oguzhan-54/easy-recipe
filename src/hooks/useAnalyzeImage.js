import { useState } from 'react'

// Longer than the backend needs for Cloudflare + all Gemini attempts (25 + 30 s), plus upload
// on a slow mobile network and cold start, so the backend can answer first
const REQUEST_TIMEOUT_MS = 70_000

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

  // Ready-made recipe: shown right away like a real result, without a request
  function showDemo(recipe) {
    setError(null)
    setResult(recipe)
    setStatus('success')
  }

  function reset() {
    setStatus('idle')
    setResult(null)
    setError(null)
  }

  return { status, result, error, analyze, showDemo, reset }
}
