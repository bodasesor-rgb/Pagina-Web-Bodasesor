/**
 * Nexus landing HTML vs SPA shell.
 * A valid SEO landing has seo-service-hero OR seo-section and is not the React shell.
 */
export function isSpaShellHtml(html) {
  if (!html) return true
  if (html.includes('Access denied')) return true
  return html.includes('id="root"') && /\/assets\/index-/.test(html)
}

export function isNexusLandingHtml(html) {
  if (!html || isSpaShellHtml(html)) return false
  return html.includes('seo-service-hero') || html.includes('seo-section')
}
