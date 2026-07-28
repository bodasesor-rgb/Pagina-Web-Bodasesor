import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const tree = import.meta.env.PROD ? <App /> : (
  <StrictMode>
    <App />
  </StrictMode>
)

createRoot(document.getElementById('root')).render(tree)
