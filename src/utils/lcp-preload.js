import { stripCityFromPath } from './city-url'
import { HERO_IMAGES } from '../data/product-galleries'

/** Known LCP candidates for catalog and event pages (path without city suffix). */
const LCP_BY_PATH = {
  // /banquetes-catering: mobile LCP is the H1 (hero collage is lg-only) — do not preload image.
  '/barras-de-bebidas': '/images/productos/barra-bebidas.png',
  '/mesas-personalizadas': '/images/productos/mesa-dulces.png',
  '/salas-periqueras': '/images/salas/sala-vintage-capitoneada-rosa.jpg',
  '/pistas-tarimas': '/images/pistas/pista-charol-logo.jpg',
  '/vajillas': '/images/vajillas/vaj-02-crown-baccara-evento.jpg',
  '/colgantes': '/images/colgantes/col-01-lamparas-algodon-wisterias.jpg',
  '/floreria': '/images/floreria/centros-de-mesa.png',
  '/shows': '/images/shows/alas-de-isis.png',
  '/musica': '/images/musica/dj.png',
  '/fotografia': '/images/fotografia/cabina-fotos.png',
  '/reposteria': '/images/reposteria/cupcakes.png',
  '/wedding-planner': '/images/wedding/asesoria-personalizada.png',
  '/espacios-eventos': '/images/espacios/jardines.png',
  '/carpas': '/images/carpas/blanca.png',
  '/audio-iluminacion-video': '/images/audio/audio-basico.png',
  '/galeria': '/images/galeria/g1.jpg',
  '/bodas': '/images/instagram/ig10.jpg',
  '/xv-anos': '/images/instagram/ig50.jpg',
  '/corporativos': '/images/instagram/ig90.jpg',
  '/graduaciones': '/images/instagram/ig20.jpg',
  '/baby-shower': '/images/instagram/ig130.jpg',
  '/cumpleanos': '/images/instagram/ig170.jpg',
  '/primera-comunion': '/images/instagram/ig70.jpg',
  '/blog': '/images/galeria/g1.jpg',
}

const PRELOAD_ID = 'lcp-route-preload'

export function getLcpImageForPath(pathname) {
  const base = stripCityFromPath(pathname.replace(/\/+$/, '') || '/')
  if (base === '/') return null
  if (LCP_BY_PATH[base]) return LCP_BY_PATH[base]

  const parts = base.split('/').filter(Boolean)
  if (parts.length === 1 && HERO_IMAGES[parts[0]]) return HERO_IMAGES[parts[0]]

  // Banquet menu detail: /banquetes/formal-3-tiempos, /banquete-kosher/...
  if (parts.length === 2 && parts[0].startsWith('banquete')) {
    const parentKey = parts[0] === 'banquetes' ? 'banquetes' : parts[0]
    return HERO_IMAGES[parentKey] || '/images/banquete-hero.png'
  }

  return null
}

export function syncLcpPreload(pathname) {
  const href = getLcpImageForPath(pathname)
  let link = document.getElementById(PRELOAD_ID)
  if (!href) {
    link?.remove()
    return
  }
  if (!link) {
    link = document.createElement('link')
    link.id = PRELOAD_ID
    link.rel = 'preload'
    link.as = 'image'
    link.fetchPriority = 'high'
    document.head.appendChild(link)
  }
  const webpHref = href.replace(/\.(png|jpe?g)$/i, '.webp')
  const mobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const preloadHref =
    mobile && webpHref.endsWith('.webp')
      ? webpHref.replace(/\.webp$/i, '-sm.webp')
      : webpHref !== href
        ? webpHref
        : href
  if (link.getAttribute('href') !== preloadHref) {
    link.setAttribute('href', preloadHref)
    if (preloadHref.endsWith('.webp')) {
      link.setAttribute('type', 'image/webp')
    } else {
      link.removeAttribute('type')
    }
  }
}
