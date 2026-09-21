import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Playfair after first paint — avoids render-blocking + CLS on cold Lighthouse.
if (import.meta.env.PROD) {
  const loadPlayfair = () =>
    Promise.all([
      import('@fontsource/playfair-display/latin-400.css'),
      import('@fontsource/playfair-display/latin-700.css'),
    ])
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { loadPlayfair() }, { timeout: 5000 })
  } else {
    window.addEventListener('load', () => { setTimeout(loadPlayfair, 2000) }, { once: true })
  }
} else {
  // Dev: load immediately so local design matches prod fonts
  import('@fontsource/playfair-display/latin-400.css')
  import('@fontsource/playfair-display/latin-700.css')
}

const tree = import.meta.env.PROD ? <App /> : (
  <StrictMode>
    <App />
  </StrictMode>
)

createRoot(document.getElementById('root')).render(tree)
