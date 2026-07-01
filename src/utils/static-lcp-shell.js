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

/** Inline boot script source — keep in sync with index.html */
export const LCP_SHELL_BOOT_SCRIPT = `(function(){var p=location.pathname.replace(/\\/+$/,'')||'/';if(p==='/')return;var s=p.split('/').filter(Boolean);if(s.length===1){var c=',ciudad-de-mexico,cdmx,estado-de-mexico,aguascalientes,acapulco,cancun,cozumel,cuernavaca,guadalajara,leon,los-cabos,merida,monterrey,morelia,oaxaca,pachuca,puebla,puerto-vallarta,vallarta,queretaro,san-luis-potosi,san-miguel-allende,tijuana,toluca,torreon,valle-de-bravo,veracruz,';if(c.indexOf(','+s[0]+',')>=0)return}document.documentElement.classList.add('no-lcp-hero')})();`
