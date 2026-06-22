import { whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

const MOBILIARIO_CATS = [
  {
    label: 'Sillas',
    icon: '🪑',
    items: [
      { name: 'Silla Tiffany', desc: 'La silla más elegante para bodas. Blanco, dorado, plata, transparente.' },
      { name: 'Silla Crossback', desc: 'Estilo rústico-chic en madera maciza. Perfecta para exteriores.' },
      { name: 'Silla Louis XV', desc: 'Elegancia clásica francesa para bodas de gran escala.' },
      { name: 'Silla Ghost', desc: 'Diseño transparente y moderno para eventos contemporáneos.' },
      { name: 'Silla Tolix', desc: 'Silla industrial vintage. Ideal para eventos con carácter.' },
      { name: 'Silla Avant Garde', desc: 'Diseño ejecutivo y sofisticado para bodas y corporativos.' },
      { name: 'Silla Gamma', desc: 'Ergonómica y elegante para conferencias y eventos largos.' },
    ],
  },
  {
    label: 'Mesas',
    icon: '🪴',
    items: [
      { name: 'Mesa Redonda', desc: 'La clásica mesa para banquetes. Diámetros de 1.20m, 1.50m y 1.80m.' },
      { name: 'Mesa Mármol Blanca', desc: 'Diseño contemporáneo con acabado mármol para eventos de lujo.' },
      { name: 'Mesa Mármol Negra', desc: 'Elegancia oscura para eventos modernos.' },
      { name: 'Mesa Tablón', desc: 'Mesas rectangulares para banquetes y comedores.' },
      { name: 'Mesa Cuadrada', desc: 'Versátil para diferentes configuraciones de salón.' },
    ],
  },
  {
    label: 'Salas Lounge',
    icon: '🛋️',
    items: [
      { name: 'Sala Lounge Blanca', desc: 'Juego de sofás blancos iluminados para lounges y cócteles.' },
      { name: 'Sala Lounge Negra', desc: 'Juego de sofás negros para eventos modernos.' },
      { name: 'Sala Periqueras', desc: 'Periqueras y taburetes para áreas de bar.' },
    ],
  },
  {
    label: 'Carpas',
    icon: '⛺',
    items: [
      { name: 'Carpa Blanca', desc: 'Carpa de lona blanca para eventos al aire libre.' },
      { name: 'Carpa Negra', desc: 'Carpa negra para ambientes sofisticados y eventos nocturnos.' },
      { name: 'Carpa Árabe', desc: 'Carpa de estilo árabe para eventos temáticos.' },
    ],
  },
]

export default function SalasPeriqueras() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Renta de mobiliario</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Mobiliario Premium</h1>
          <p className="text-gray-300 text-lg mb-8">
            Sillas, mesas, salas lounge, periqueras y carpas de la más alta calidad para que tu evento luzca impecable.
          </p>
          <a href={whatsappLink('Hola, me interesa cotizar mobiliario para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar mobiliario
          </a>
        </div>
      </section>

      {MOBILIARIO_CATS.map(cat => (
        <section key={cat.label} className="py-16 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="font-serif text-3xl text-gray-900">{cat.label}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {cat.items.map(item => (
                <div key={item.name}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-amber-200 transition-all">
                  <h3 className="font-serif text-lg text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  <a href={whatsappLink(`Hola, me interesa cotizar: ${item.name}`)}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-block text-amber-600 text-sm font-semibold hover:underline">
                    Cotizar →
                  </a>
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
