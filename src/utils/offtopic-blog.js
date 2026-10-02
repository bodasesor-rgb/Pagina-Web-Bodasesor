/**
 * Blog posts unrelated to events (Nexus mass-generated: trámites, bancos, deportes,
 * apps, finanzas, crianza…). Served with noindex,follow, dropped from sitemap and
 * the /blog hub so they stop diluting site-wide quality signals in Google.
 */

const OFFTOPIC_SUFFIX = /-(blog|ciencia|belleza-moda)$/

const OFFTOPIC_PREFIX = /^(bodasesor-|para-mama-|bebe-|bebes-|correr-|casas-autosostenibles-)/

const OFFTOPIC_SLUGS = new Set([
  'blog',
  'que-significa-bait',
  'como-ganar-mis-apuestas-del-mundial',
  'como-cocinar-una-pasta-perfectamente',
  'como-participar-en-pareja-para-tener-nuestra-casa-organizada',
  'como-ayudar-a-tu-bebe-cuando-le-salen-los-dientes-para-que-le-duela-menos',
  'estrenos-en-plataformas-de-streaming-calendario-de-estrenos-en-plataformas-de-streaming-netflix-disney',
  'wellness-protocolos-de-wellness-clinicas-de-medicina-preventiva-y-retiros-de-desintoxicacion-vip',
  'bienes-raices-arquitectura-bienes-raices-arquitectura-ciudades-y-zonas-con-mayor-plusvalia-para-inversion-residencial-en-mexico',
  'inteligencia-artificial-las-mejores-aplicaciones-de-inteligencia-artificial-gratuitas-para-productividad-y-trabajo-eventos-corporativos',
])

/** Event-related posts that would otherwise match a pattern above. */
const KEEP = new Set([])

export function isOffTopicBlogSlug(slug) {
  const s = String(slug || '')
    .toLowerCase()
    .replace(/^\/?blog\//, '')
    .replace(/^\/+|\/+$/g, '')
  if (!s || s === 'articulos' || KEEP.has(s)) return false
  return OFFTOPIC_SLUGS.has(s) || OFFTOPIC_SUFFIX.test(s) || OFFTOPIC_PREFIX.test(s)
}

/** Legacy SPA posts still built from the shared filler template (pending rewrite). */
const TEMPLATE_SIGNATURE = 'pocas decisiones pesan tanto como'

export function isTemplateBlogPost(post) {
  return Array.isArray(post?.body) && post.body.some((b) => typeof b === 'string' && b.includes(TEMPLATE_SIGNATURE))
}

export function isNoindexBlogPost(post) {
  return isOffTopicBlogSlug(post?.slug) || isTemplateBlogPost(post)
}

export function isOffTopicBlogPath(path) {
  const p = String(path || '').toLowerCase()
  if (!p.startsWith('/blog/')) return false
  const parts = p.split('/').filter(Boolean)
  return parts.length === 2 && isOffTopicBlogSlug(parts[1])
}

/** Nexus QA pages ("…-prueba/", "…-prueba-nexus-…", "…-prueba-746c/") — never index. */
export function isNexusTestPath(path) {
  return /(^|-)prueba(-nexus|-[0-9a-f]{4})?(-|$)/.test(String(path || '').toLowerCase().replace(/\/+$/, '').split('/').pop())
}

export function isNoindexPath(path) {
  return isOffTopicBlogPath(path) || isNexusTestPath(path)
}
