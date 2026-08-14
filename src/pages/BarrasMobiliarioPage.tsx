import CityLink from '../components/CityLink'
import OptimizedImage from '../components/OptimizedImage'
import HighlightKeywords from '../components/HighlightKeywords'
import CityHubSeoSections from '../components/CityHubSeoSections'
import { useCityHubPage } from '../hooks/useCityHubPage'

const Link = CityLink

const WA_BASE = 'https://wa.me/5215540080373?text='
const waUrl =
  WA_BASE +
  encodeURIComponent('Hola, me interesa cotizar una barra de mobiliario para mi evento. ¿Me pueden dar información?')

const BARRAS = [
  {
    name: 'Barra Clásica Blanca',
    href: '/barras/clasica-blanca',
    img: '/images/barras/barra-clasica-blanca.jpg',
    desc: 'Acabado blanco versátil para cócteles, recepción y open bar.',
  },
  {
    name: 'Barra XL Clásica Negra',
    href: '/barras/xl-clasica-negra',
    img: '/images/barras/barra-xl-clasica-negra.jpg',
    desc: 'Formato amplio en negro para galas y eventos de alto flujo.',
  },
  {
    name: 'Barra Rústica',
    href: '/barras/rustica',
    img: '/images/barras/barra-rustica.jpg',
    desc: 'Madera natural para jardines, haciendas y bodas campestres.',
  },
  {
    name: 'Barra Industrial',
    href: '/barras/industrial',
    img: '/images/barras/barra-industrial.jpg',
    desc: 'Metal y madera para loft, after parties y ambientaciones urbanas.',
  },
]

export default function BarrasMobiliarioPage() {
  const { city, cityCopy, displayH1, displayHeadline, displaySectionTitle, keywords } =
    useCityHubPage('barras', 'Barras de Mobiliario')

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white/80">Barras</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
            {displayH1}
          </h1>
          <p className={`text-lg md:text-xl text-white/80 font-serif max-w-2xl mx-auto leading-relaxed ${cityCopy?.zones?.length ? 'mb-4' : ''}`}>
            {displayHeadline ? (
              <HighlightKeywords text={displayHeadline} keywords={keywords} className="font-bold text-white" />
            ) : (
              'Mobiliario de barra para estaciones de bebidas, recepción y open bar. Cuatro estilos listos para montar.'
            )}
          </p>
          {cityCopy?.zones?.length ? (
            <p className="text-[#8a9bb5] font-serif text-sm max-w-2xl mx-auto">
              {city ? `Cobertura en ${city.name}:` : 'Cobertura nacional:'}{' '}
              <HighlightKeywords
                text={cityCopy.zones.join(' · ')}
                keywords={keywords}
                className="font-bold text-white"
              />
            </p>
          ) : null}
        </div>
      </section>

      <CityHubSeoSections
        cityName={city?.name}
        displaySectionTitle={displaySectionTitle}
        keywords={keywords}
        description={cityCopy?.description}
        localBullets={cityCopy?.localBullets}
        faqs={cityCopy?.faqs}
        fallback={
          <p>
            Renta de <strong>barras de mobiliario</strong>
            {city ? (
              <>
                {' '}en <strong className="text-[#162040]">{city.name}</strong> y área metropolitana
              </>
            ) : (
              <> en México</>
            )}
            : estilos clásico, XL, rústico e industrial para recepción y open bar.
          </p>
        }
      />

      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARRAS.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-[#162040]/5"
              >
                <div className="aspect-[16/10] product-media bg-white overflow-hidden">
                  <OptimizedImage
                    src={b.img}
                    alt={b.name}
                    width={480}
                    height={300}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-4 py-4">
                  <h2 className="font-serif font-bold text-[#162040] text-lg mb-1">{b.name}</h2>
                  <p className="text-sm text-gray-600 font-serif leading-snug">{b.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
