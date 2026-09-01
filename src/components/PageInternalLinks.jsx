import CityLink from './CityLink'
import { NEXUS_PRIORITY_LINKS } from '../data/nexus-priority-links'

const Link = CityLink

/** Core SPA hubs for cross-page internal linking (SEO backlinks). */
export const SITE_HUB_LINKS = [
  { href: '/banquetes-catering', name: 'Banquetes y catering' },
  { href: '/mesas-sillas', name: 'Mobiliario' },
  { href: '/mesas-personalizadas', name: 'Mesas personalizadas' },
  { href: '/combinaciones-mesas-sillas', name: 'Combinaciones mesas y sillas' },
  { href: '/vajillas', name: 'Vajillas' },
  { href: '/colgantes', name: 'Colgantes' },
  { href: '/entelados', name: 'Entelados' },
  { href: '/barras-de-bebidas', name: 'Barras de bebidas' },
  { href: '/pistas-tarimas', name: 'Pistas y tarimas' },
  { href: '/salas-periqueras', name: 'Salas y periqueras' },
  { href: '/floreria', name: 'Florería' },
  { href: '/carpas', name: 'Carpas' },
  { href: '/audio-iluminacion-video', name: 'Audio e iluminación' },
  { href: '/musica', name: 'Música' },
  { href: '/fotografia', name: 'Fotografía' },
  { href: '/shows', name: 'Shows' },
  { href: '/reposteria', name: 'Repostería' },
  { href: '/wedding-planner', name: 'Wedding planner' },
  { href: '/alimentos-empresas', name: 'Catering empresarial' },
  { href: '/espacios-eventos', name: 'Espacios para eventos' },
  { href: '/bodas', name: 'Bodas' },
  { href: '/xv-anos', name: 'XV años' },
  { href: '/corporativos', name: 'Eventos corporativos' },
  { href: '/graduaciones', name: 'Graduaciones' },
  { href: '/galeria', name: 'Galería' },
  { href: '/blog', name: 'Blog' },
  { href: '/catalogos', name: 'Catálogos' },
]

/**
 * Visible related-links block for hub/detail pages that lack product.related.
 * Keeps crawl paths between SPA pages + a few Nexus landings.
 */
export default function PageInternalLinks({
  title = 'También te puede interesar',
  excludeHref,
  max = 12,
  includeNexus = true,
}) {
  const hubs = SITE_HUB_LINKS.filter((l) => l.href !== excludeHref).slice(0, max)
  const nexus = includeNexus ? NEXUS_PRIORITY_LINKS.slice(0, 4) : []

  return (
    <section
      className="py-10 bg-[#f5efe8] border-t border-[#162040]/10"
      aria-labelledby="internal-links-heading"
      data-testid="section-internal-links"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="internal-links-heading"
          className="text-xl md:text-2xl font-serif font-bold text-[#162040] mb-5 text-center"
        >
          {title}
        </h2>
        <nav aria-label="Enlaces relacionados">
          <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
            {hubs.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block px-3 py-1.5 rounded-full bg-white border border-[#162040]/15 text-sm font-serif text-[#162040] hover:bg-[#162040] hover:text-white transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
            {nexus.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-block px-3 py-1.5 rounded-full bg-white border border-[#162040]/15 text-sm font-serif text-[#162040] hover:bg-[#162040] hover:text-white transition-colors"
                >
                  {l.shortLabel || l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
