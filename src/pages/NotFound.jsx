import { Link } from 'react-router-dom'
import { whatsappLink } from '../data/site'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl text-amber-200 mb-4">404</p>
        <h1 className="font-serif text-3xl text-gray-900 mb-3">Página no encontrada</h1>
        <p className="text-gray-500 mb-8">Esta página aún está en preparación o no existe. Puedes explorar nuestros servicios desde el inicio.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            ← Volver al inicio
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
            className="border border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-700 font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
