import { parseCityFromPath } from './city-url'

/** True when URL should show the home hero ( / or /{city} landing ) */
export function isHomePath(pathname) {
  const { basePath } = parseCityFromPath(pathname.replace(/\/+$/, '') || '/')
  return basePath === '/'
}

export function hideStaticLcpShell() {
  for (const id of ['static-hero-copy', 'lcp-hero-wrap', 'static-nav-shell']) {
    document.getElementById(id)?.style.setProperty('display', 'none')
  }
}
