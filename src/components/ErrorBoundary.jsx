import { Component } from 'react'
import { WHATSAPP } from '../data/site'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Page error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[#f5efe8]">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">🔧</div>
            <h1 className="font-serif text-2xl font-bold text-[#162040] mb-3">
              Esta página está en preparación
            </h1>
            <p className="text-gray-500 font-serif mb-8">
              Estamos trabajando en este contenido. Por ahora puedes cotizar directamente por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=Hola%2C%20me%20interesa%20cotizar%20un%20servicio`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold font-serif px-6 py-3 rounded-xl hover:bg-green-500 transition-colors"
              >
                Cotizar por WhatsApp
              </a>
              <a
                href="/"
                className="flex items-center justify-center border border-[#162040]/20 text-[#162040] font-serif font-semibold px-6 py-3 rounded-xl hover:bg-[#162040]/5 transition-colors"
                onClick={() => this.setState({ hasError: false })}
              >
                ← Volver al inicio
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
