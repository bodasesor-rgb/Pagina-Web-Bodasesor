import { Link } from 'react-router-dom'
import { BANQUETES_SERVICES, whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

export default function BanquetesCatering() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Servicios de alimentos</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Banquetes y Catering</h1>
          <p className="text-gray-300 text-lg mb-8">
            Desde banquetes formales de alta cocina hasta estaciones de antojitos mexicanos — todo el servicio de alimentos para tu evento en un solo catálogo.
          </p>
          <p className="text-amber-400 text-sm mb-8">25 servicios disponibles · Banquetes formales, catering gourmet, barras de alimentos y estaciones temáticas.</p>
          <a href={whatsappLink('Hola, me interesa cotizar servicio de alimentos para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar servicio de alimentos
          </a>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span>✓ 25 servicios disponibles</span>
            <span>✓ Banquetes, catering y estaciones</span>
            <span>✓ Chefs certificados</span>
            <span>✓ Cotización personalizada</span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
          <p>Nuestro servicio de banquetes y catering en México está diseñado para todo tipo de celebración: desde una íntima boda civil hasta una convención corporativa con cientos de comensales. Contamos con chefs ejecutivos certificados, menús personalizados y logística completa de alimentos y bebidas para que tu evento sea perfecto desde el primer bocado hasta el último.</p>
          <p>Ofrecemos banquetes formales de alta cocina, catering gourmet servido en sitio, barras de alimentos temáticas y estaciones de comida mexicana. Cada propuesta incluye vajilla, meseros, chefs, montaje y desmontaje.</p>
        </div>
      </section>

      {/* Categories */}
      {BANQUETES_SERVICES.categories.map((cat) => (
        <section key={cat.label} className="py-16 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Categoría</span>
            </div>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">{cat.label}</h2>
            <p className="text-gray-500 mb-8">{cat.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.items.map((item) => (
                <Link key={item.slug} to={`/${item.slug}`}
                  className="group border border-gray-200 rounded-xl p-5 hover:border-amber-300 hover:shadow-md transition-all bg-white">
                  <h3 className="font-serif text-lg text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-4 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-gray-900 mb-3">¿Qué servicio es para tu evento?</h2>
          <p className="text-gray-500 mb-8">Cotización personalizada en menos de 24 horas. También podemos combinar varios servicios para tu evento.</p>
          <a href={whatsappLink('Hola, quiero cotizar catering para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar para mi evento
          </a>
        </div>
      </section>

      <SectionCTA />
    </>
  )
}
