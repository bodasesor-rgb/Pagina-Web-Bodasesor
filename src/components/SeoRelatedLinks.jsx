import { Link } from 'wouter'
import { useCity } from '../context/CityContext'
import { withCityPath } from '../utils/city-url'
import { CITY_MAP } from '../data/city-data'

/** Cross-links that pass internal authority between hubs and city landings. */
const RELATED_HUBS = [
  { href: '/banquetes-catering', label: 'Banquetes y Catering' },
  { href: '/mesas-sillas', label: 'Mesas y Sillas' },
  { href: '/mesas-personalizadas', label: 'Mesas Personalizadas' },
  { href: '/combinaciones-mesas-sillas', label: 'Combinaciones Mesas y Sillas' },
  { href: '/vajillas', label: 'Vajillas' },
  { href: '/colgantes', label: 'Colgantes' },
  { href: '/entelados', label: 'Entelados' },
  { href: '/barras-de-bebidas', label: 'Barras de Bebidas' },
  { href: '/floreria', label: 'Florería' },
  { href: '/carpas', label: 'Carpas' },
  { href: '/fotografia', label: 'Fotografía y Video' },
  { href: '/wedding-planner', label: 'Wedding Planner' },
  { href: '/musica', label: 'Música' },
  { href: '/pistas-tarimas', label: 'Pistas y Tarimas' },
  { href: '/salas-periqueras', label: 'Salas y Periqueras' },
  { href: '/shows', label: 'Shows' },
  { href: '/audio-iluminacion-video', label: 'Audio e Iluminación' },
  { href: '/reposteria', label: 'Repostería' },
  { href: '/alimentos-empresas', label: 'Catering Empresarial' },
  { href: '/espacios-eventos', label: 'Espacios para Eventos' },
  { href: '/bodas', label: 'Bodas' },
  { href: '/xv-anos', label: 'XV Años' },
  { href: '/corporativos', label: 'Eventos Corporativos' },
  { href: '/galeria', label: 'Galería' },
  { href: '/blog', label: 'Blog' },
  { href: '/catalogos', label: 'Catálogos' },
]

const NEARBY_CITIES = [
  'ciudad-de-mexico',
  'estado-de-mexico',
  'cuernavaca',
  'puebla',
  'queretaro',
  'toluca',
  'guadalajara',
  'monterrey',
  'cancun',
  'merida',
]

/**
 * @param {{ basePath?: string, title?: string, related?: Array<{ name: string, href: string }> }} props
 */
export default function SeoRelatedLinks({ basePath = '/banquetes-catering', title, related = [] }) {
  const { city } = useCity()
  const serviceTitle = title || 'este servicio'

  const hubLinks = RELATED_HUBS.filter((h) => h.href !== basePath)
    .slice(0, 10)
    .map((h) => ({
      href: withCityPath(h.href, city?.slug),
      label: city ? `${h.label} en ${city.short || city.name}` : h.label,
    }))

  const productLinks = (related || [])
    .filter((r) => r?.href && r.href !== basePath)
    .slice(0, 4)
    .map((r) => ({
      href: withCityPath(r.href, city?.slug),
      label: city ? `${r.name} en ${city.short || city.name}` : r.name,
    }))

  const cityLinks = NEARBY_CITIES.filter((slug) => slug !== city?.slug)
    .slice(0, 5)
    .map((slug) => {
      const c = CITY_MAP[slug]
      return {
        href: withCityPath(basePath, c.slug),
        label: `${serviceTitle} en ${c.name}`,
      }
    })

  const links = [...productLinks, ...hubLinks, ...cityLinks]
  // Dedupe by href
  const seen = new Set()
  const unique = []
  for (const link of links) {
    if (!link.href || seen.has(link.href)) continue
    seen.add(link.href)
    unique.push(link)
    if (unique.length >= 12) break
  }

  if (!unique.length) return null

  return (
    <section
      className="py-12 border-t border-[#162040]/10 bg-[#faf7f2]"
      aria-label="Servicios relacionados"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold text-[#162040] mb-2">
          Servicios Relacionados de Banquete y Eventos
        </h2>
        <p className="text-sm text-gray-600 font-serif mb-6 max-w-2xl">
          Explora servicios relacionados
          {city ? ` disponibles en ${city.name}` : ' en México'} y otras ciudades donde
          operamos.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {unique.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block font-serif text-[#162040] hover:text-[#0d6849] underline-offset-2 hover:underline text-sm leading-snug"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
