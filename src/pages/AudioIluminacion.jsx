import { whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

const CATEGORIES = [
  {
    label: 'Audio Profesional',
    icon: '🎵',
    items: [
      { name: 'Audio Básico', img: '/images/audio/audio-basico.png', desc: 'Sistema de sonido profesional para eventos medianos' },
      { name: 'Line Array', img: '/images/audio/audio-line-array.png', desc: 'Torres de sonido de alta potencia para grandes eventos' },
      { name: 'Transmisión en Vivo', img: '/images/audio/transmision-vivo.png', desc: 'Streaming y transmisión en vivo de tu evento' },
    ],
  },
  {
    label: 'Iluminación',
    icon: '💡',
    items: [
      { name: 'Par LED', img: '/images/audio/par-led.png', desc: 'Iluminación LED ambiental y de colores' },
      { name: 'Cabezas Móviles', img: '/images/audio/cabezas-moviles.png', desc: 'Spots robotizados para espectáculo visual' },
      { name: 'Blinders & Strobes', img: '/images/audio/blinders-strobes.png', desc: 'Efectos de luz para shows en vivo' },
      { name: 'Guirnaldas de Luces', img: '/images/audio/guirnaldas-luces.png', desc: 'Decoración con luces para ambientación romántica' },
      { name: 'Truss DMX', img: '/images/audio/truss-dmx.png', desc: 'Estructura de aluminio con control DMX' },
      { name: 'Uplighting', img: '/images/audio/uplighting.png', desc: 'Iluminación perimetral de pared y columnas' },
      { name: 'Pixel Bars', img: '/images/audio/pixel-bars.png', desc: 'Barras LED pixeladas de alto impacto visual' },
    ],
  },
  {
    label: 'Efectos Especiales',
    icon: '✨',
    items: [
      { name: 'Laser', img: '/images/audio/laser.png', desc: 'Espectáculo de luces láser profesional' },
      { name: 'Efectos LED', img: '/images/audio/efectos-led.png', desc: 'Efectos especiales LED personalizados' },
      { name: 'Máquinas de Humo', img: '/images/audio/maquinas-humo.png', desc: 'Máquinas de humo y cañones de espuma' },
      { name: 'Gobos', img: '/images/audio/gobos.png', desc: 'Proyección de imágenes y logos en paredes' },
      { name: 'Pantalla LED', img: '/images/audio/pantalla-led.png', desc: 'Pantalla LED de alta resolución' },
    ],
  },
]

export default function AudioIluminacion() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Tecnología para eventos</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Audio, Iluminación & Video</h1>
          <p className="text-gray-300 text-lg mb-8">
            Sonido profesional, iluminación espectacular y producción de video para que tu evento sea una experiencia audiovisual completa.
          </p>
          <a href={whatsappLink('Hola, me interesa cotizar audio e iluminación para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar audio e iluminación
          </a>
        </div>
      </section>

      {CATEGORIES.map(cat => (
        <section key={cat.label} className="py-16 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="font-serif text-3xl text-gray-900">{cat.label}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {cat.items.map(item => (
                <div key={item.name} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-amber-200 transition-all bg-white">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img src={item.img} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={e => { e.target.parentElement.className = 'aspect-square bg-amber-50 flex items-center justify-center'; e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SectionCTA />
    </>
  )
}
