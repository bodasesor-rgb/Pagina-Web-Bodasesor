import { parseCityFromPath } from './city-url'

/** True when URL should show the home hero ( / or /{city} landing ) */
export function isHomePath(pathname) {
  const { basePath } = parseCityFromPath(pathname.replace(/\/+$/, '') || '/')
  return basePath === '/'
}

const HERO_IDS = ['static-hero-copy', 'lcp-hero-wrap']
const SHELL_IDS = [...HERO_IDS, 'static-nav-shell']

const HERO_PICTURE_HTML =
  '<source media="(max-width: 768px)" srcset="/images/hero-bg-new-mobile.webp" type="image/webp" />' +
  '<source srcset="/images/hero-bg-new.webp" type="image/webp" />' +
  '<img id="lcp-hero" src="/images/hero-bg-new.webp" alt="" width="1408" height="768" fetchpriority="high" decoding="async" />'

const HERO_COPY_HTML =
  '<h1>Banquetes, Catering y Servicios para Eventos en México</h1>' +
  '<p class="hero-sub">Banquetes premium, catering gourmet y mobiliario elegante para bodas, quinceañeras, eventos corporativos y celebraciones en todo México</p>' +
  '<div class="hero-btns">' +
  '<a class="btn-wa" href="https://api.whatsapp.com/send/?phone=5215540080373&amp;text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento">Cotiza por WhatsApp</a>' +
  '<a class="btn-svc" href="#servicios">Ver Servicios</a>' +
  '</div>'

function hideElements(ids) {
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) {
      el.style.setProperty('display', 'none', 'important')
      el.style.setProperty('visibility', 'hidden', 'important')
    }
  }
}

/** Recreate home LCP nodes if a React remount cleanup wiped them. */
export function ensureHomeStaticHeroNodes() {
  let wrap = document.getElementById('lcp-hero-wrap')
  if (!wrap) {
    wrap = document.createElement('picture')
    wrap.id = 'lcp-hero-wrap'
    wrap.setAttribute('aria-hidden', 'true')
    document.body.appendChild(wrap)
  }
  if (!wrap.querySelector('img')) {
    wrap.innerHTML = HERO_PICTURE_HTML
  }

  let copy = document.getElementById('static-hero-copy')
  if (!copy) {
    copy = document.createElement('div')
    copy.id = 'static-hero-copy'
    document.body.appendChild(copy)
  }
  if (!copy.querySelector('h1')) {
    copy.hidden = false
    copy.removeAttribute('hidden')
    copy.innerHTML = HERO_COPY_HTML
  }
  return { wrap, copy }
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
  const { wrap, copy } = ensureHomeStaticHeroNodes()
  document.documentElement.classList.add('home-lcp-live')
  document.documentElement.classList.remove('no-lcp-hero', 'no-lcp-shell', 'home-lcp-pending')
  document.getElementById('static-nav-shell')?.remove()

  // Anchor LCP nodes inside the React hero so they scroll with the portada
  // (fixed → stuck title over the whole page while scrolling).
  const hero = document.querySelector('[data-testid="section-hero"]')
  if (hero) {
    if (wrap.parentElement !== hero) hero.insertBefore(wrap, hero.firstChild)
    if (copy.parentElement !== hero) hero.appendChild(copy)
  }

  wrap.classList.add('lcp-hero-live')
  // Clear any hide() inline styles from a prior route.
  wrap.style.removeProperty('display')
  wrap.style.removeProperty('visibility')

  copy.classList.add('lcp-copy-live')
  copy.style.pointerEvents = 'auto'
  copy.style.zIndex = '5'
  copy.style.removeProperty('display')
  copy.style.removeProperty('visibility')
  copy.hidden = false
  copy.removeAttribute('hidden')
}

/** Update the static LCP H1/subcopy when the city context changes (no React remount). */
export function syncStaticHeroCopy(city) {
  ensureHomeStaticHeroNodes()
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

/**
 * Soft disable for React effect cleanup — never destroy DOM here.
 * Destroying #lcp-hero-wrap on remount left the home cover blank.
 * StaticLcpCleanup removes nodes when navigating away from home.
 */
export function disableHomeStaticHero() {
  document.documentElement.classList.remove('home-lcp-live', 'home-lcp-pending')
}

/** Hard remove — only when leaving home for an inner SPA route. */
export function removeHomeStaticHero() {
  document.documentElement.classList.remove('home-lcp-live', 'home-lcp-pending')
  document.getElementById('lcp-hero-wrap')?.remove()
  document.getElementById('static-hero-copy')?.remove()
}

/** Inline boot script source — keep in sync with index.html home/LCP path gate */
export const LCP_SHELL_BOOT_SCRIPT = `(function(){var p=location.pathname.replace(/\\/+$/,'')||'/';var cities=',ciudad-de-mexico,cdmx,estado-de-mexico,aguascalientes,acapulco,cancun,cozumel,cuernavaca,guadalajara,leon,los-cabos,merida,monterrey,morelia,oaxaca,pachuca,puebla,puerto-vallarta,vallarta,queretaro,san-luis-potosi,san-miguel-allende,tijuana,toluca,torreon,valle-de-bravo,veracruz,';var segments=p.split('/').filter(Boolean);var isHome=p==='/'||(segments.length===1&&cities.indexOf(','+segments[0]+',')>=0);window.__BS_HOME_LCP=isHome;if(!isHome)document.documentElement.classList.add('no-lcp-hero')})();`
