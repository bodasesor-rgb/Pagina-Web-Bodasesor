import { parseCityFromPath } from './city-url'

/** True when URL should show the home hero ( / or /{city} landing ) */
export function isHomePath(pathname) {
  const { basePath } = parseCityFromPath(pathname.replace(/\/+$/, '') || '/')
  return basePath === '/'
}

const HERO_IDS = ['static-hero-copy', 'lcp-hero-wrap']
const SHELL_IDS = [...HERO_IDS, 'static-nav-shell']

function hideElements(ids) {
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) {
      el.style.setProperty('display', 'none', 'important')
      el.style.setProperty('visibility', 'hidden', 'important')
    }
  }
}

/** Hide hero only — keep static nav visible until React Navbar mounts (inner pages). */
export function hideStaticHeroOnly() {
  document.documentElement.classList.add('no-lcp-hero')
  hideElements(HERO_IDS)
}

export function hideStaticLcpShell() {
  document.documentElement.classList.add('no-lcp-shell')
  hideElements(SHELL_IDS)
}

/**
 * Home: keep preloaded hero IMAGE + static H1 copy as the LCP layer.
 * Removing the static H1 forced Lighthouse to wait on React + Playfair (~2s+).
 */
export function enableHomeStaticHero() {
  document.documentElement.classList.add('home-lcp-live')
  document.documentElement.classList.remove('no-lcp-hero', 'no-lcp-shell', 'home-lcp-pending')
  document.getElementById('static-nav-shell')?.remove()

  const wrap = document.getElementById('lcp-hero-wrap')
  if (wrap) wrap.classList.add('lcp-hero-live')

  const copy = document.getElementById('static-hero-copy')
  if (copy) {
    copy.classList.add('lcp-copy-live')
    copy.style.pointerEvents = 'auto'
    copy.style.zIndex = '5'
  }
}

/** Update the static LCP H1/subcopy when the city context changes (no React remount). */
export function syncStaticHeroCopy(city) {
  const root = document.getElementById('static-hero-copy')
  if (!root) return
  const h1 = root.querySelector('h1, .hero-title')
  const sub = root.querySelector('.hero-sub')
  if (h1) {
    h1.innerHTML = city?.name
      ? `Banquetes y Catering para Eventos<br>en ${city.name}`
      : 'Banquetes, Catering y Servicios<br>para Eventos en México'
  }
  if (sub) {
    sub.textContent = city?.name
      ? `Banquetes, catering gourmet y mobiliario elegante para eventos en ${city.name}. Cotiza sin compromiso.`
      : 'Banquetes premium, catering gourmet y mobiliario elegante para bodas, quinceañeras, eventos corporativos y celebraciones en todo México'
  }
}

export function disableHomeStaticHero() {
  document.documentElement.classList.remove('home-lcp-live', 'home-lcp-pending')
  document.getElementById('lcp-hero-wrap')?.remove()
  document.getElementById('static-hero-copy')?.remove()
}

/** Inline boot script source — keep in sync with index.html home/LCP path gate */
export const LCP_SHELL_BOOT_SCRIPT = `(function(){var p=location.pathname.replace(/\\/+$/,'')||'/';var cities=',ciudad-de-mexico,cdmx,estado-de-mexico,aguascalientes,acapulco,cancun,cozumel,cuernavaca,guadalajara,leon,los-cabos,merida,monterrey,morelia,oaxaca,pachuca,puebla,puerto-vallarta,vallarta,queretaro,san-luis-potosi,san-miguel-allende,tijuana,toluca,torreon,valle-de-bravo,veracruz,';var segments=p.split('/').filter(Boolean);var isHome=p==='/'||(segments.length===1&&cities.indexOf(','+segments[0]+',')>=0);window.__BS_HOME_LCP=isHome;if(!isHome)document.documentElement.classList.add('no-lcp-hero')})();`
