import { useState } from 'react'
import { INSTAGRAM_GROUPS, whatsappLink, img } from '../data/site'
import SectionCTA from '../components/SectionCTA'

const ALL_IMAGES = INSTAGRAM_GROUPS.flat()
// Add galeria images
const GALERIA_EXTRA = Array.from({ length: 15 }, (_, i) => img(`/images/galeria/g${i + 1}.jpg`))

export default function Galeria() {
  const [lightbox, setLightbox] = useState(null)
  const images = [...ALL_IMAGES, ...GALERIA_EXTRA]

  return (
    <>
      <section className="pt-32 pb-12 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">@bodasesormx</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Galería de Eventos</h1>
          <p className="text-gray-300">Más de 145 fotos reales de eventos realizados por Bodasesor en todo México.</p>
          <div className="flex justify-center gap-10 mt-8">
            {[
              { num: '145+', label: 'Fotos reales' },
              { num: '1,000+', label: 'Eventos realizados' },
              { num: '15+', label: 'Años de experiencia' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-serif text-3xl text-amber-400">{s.num}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {ALL_IMAGES.map((src, i) => (
              <div key={i} className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(src)}>
                <img src={src} alt={`Evento ${i + 1}`}
                  className="w-full hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Evento" className="max-w-full max-h-full rounded-xl object-contain" />
          <button className="absolute top-4 right-4 text-white text-3xl font-light" onClick={() => setLightbox(null)}>×</button>
        </div>
      )}

      <section className="py-16 px-4 bg-gray-50 text-center">
        <h2 className="font-serif text-3xl text-gray-900 mb-3">¿Tu evento puede estar aquí?</h2>
        <p className="text-gray-500 mb-8">Contáctanos hoy y recibe una cotización personalizada en menos de una hora.</p>
        <a href={whatsappLink('Hola, me interesa cotizar un evento con Bodasesor')}
          target="_blank" rel="noopener noreferrer"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors">
          Cotizar mi evento
        </a>
      </section>

      <SectionCTA />
    </>
  )
}
