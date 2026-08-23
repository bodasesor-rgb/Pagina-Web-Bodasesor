import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Bold Playfair loads after first paint — cuts render-blocking font bytes.
if (import.meta.env.PROD) {
  const loadBoldSerif = () => import('@fontsource/playfair-display/latin-700.css')
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { loadBoldSerif() }, { timeout: 4000 })
  } else {
    window.addEventListener('load', () => { setTimeout(loadBoldSerif, 1500) }, { once: true })
  }
}

const tree = import.meta.env.PROD ? <App /> : (
  <StrictMode>
    <App />
  </StrictMode>
)

createRoot(document.getElementById('root')).render(tree)
