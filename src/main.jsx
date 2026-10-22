import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled with the app instead of loaded from Google Fonts (GDPR)
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/bricolage-grotesque'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
