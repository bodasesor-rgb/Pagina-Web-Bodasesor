import { clampMetaDescription } from './seo-meta'
import {
  SITE_AUTHOR,
  SITE_PUBLISHER,
  buildPageKeywords,
} from './seo-page-meta'
import { absoluteOgImage, DEFAULT_OG_IMAGE_ALT } from './seo-social'
import { buildSeoTitle, stripSeoBrand } from './seo-title'

const SITE_BASE = 'https://bodasesor.com'

const SOCIAL_DESC_KEYS = new Set([
  'og:description',
  'twitter:description',
])

/** Normalize pathname for canonical URLs.
 * Netlify Pretty URLs serves directory shells as /path/ (301 from /path).
 * Canonicals must match the 200 URL to consolidate GSC slash duplicates.
 */
export function canonicalPath(pathname) {
  const raw = String(pathname || '/').split(/[?#]/)[0] || '/'
  const clean = raw.replace(/\/+$/, '') || '/'
  if (clean === '/') return '/'
  return `${clean}/`
}

export function absoluteUrl(pathname) {
  const path = canonicalPath(pathname)
  return `${SITE_BASE}${path === '/' ? '/' : path}`
}

export function upsertLink(rel, href) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function upsertMeta(attr, key, content) {
  if (typeof document === 'undefined') return
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  const raw = String(content ?? '')
  const value =
    (attr === 'name' && key === 'description') ||
    (attr === 'property' && SOCIAL_DESC_KEYS.has(key)) ||
    (attr === 'name' && key === 'twitter:description')
      ? clampMetaDescription(raw)
      : raw
  el.setAttribute('content', value)
}

/**
 * Sync Open Graph + Twitter tags with the current page identity.
 * Always uses an absolute og:url.
 */
export function applySocialMeta({
  title,
  description,
  url,
  image,
  type = 'website',
} = {}) {
  const ogImage = absoluteOgImage(image)
  const safeTitle = String(title || 'Bodasesor').trim()
  const safeDesc = clampMetaDescription(description || safeTitle)
  const absUrl = url?.startsWith('http') ? url : absoluteUrl(url || '/')

  upsertMeta('property', 'og:title', safeTitle)
  upsertMeta('property', 'og:description', safeDesc)
  upsertMeta('property', 'og:url', absUrl)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:site_name', 'Bodasesor Eventos')
  upsertMeta('property', 'og:locale', 'es_MX')
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('property', 'og:image:alt', safeTitle || DEFAULT_OG_IMAGE_ALT)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', safeTitle)
  upsertMeta('name', 'twitter:description', safeDesc)
  upsertMeta('name', 'twitter:image', ogImage)
  upsertMeta('name', 'twitter:image:alt', safeTitle || DEFAULT_OG_IMAGE_ALT)
}

/**
 * Single entry-point for page-specific SEO: title, description, canonical, OG/Twitter.
 * Pages should call this instead of mutating document.title / meta in isolation.
 */
export function applyPageSeo({
  title,
  description,
  path,
  image,
  type = 'website',
  cityShort = null,
  h1 = '',
  cityName = '',
  extraKeywords = [],
} = {}) {
  if (typeof document === 'undefined') return null

  const abs = absoluteUrl(path || '/')
  const docTitle = buildSeoTitle(stripSeoBrand(title || h1 || 'Bodasesor'), cityShort)
  const desc = clampMetaDescription(description || title || h1)

  document.title = docTitle
  upsertMeta('name', 'description', desc)
  upsertLink('canonical', abs)
  applySocialMeta({
    title: docTitle,
    description: desc,
    url: abs,
    image,
    type,
  })
  applyPageIdentityMeta({
    path: canonicalPath(path || '/'),
    title: stripSeoBrand(title || h1 || docTitle),
    h1: h1 || stripSeoBrand(title || ''),
    cityName,
    extraKeywords,
  })

  return { title: docTitle, description: desc, url: abs }
}

export function upsertJsonLd(id, data) {
  if (typeof document === 'undefined') return
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Author/publisher (bodasesor.com) + independent keywords for the current page.
 */
export function applyPageIdentityMeta({ path, title = '', h1 = '', cityName = '', extraKeywords = [] } = {}) {
  upsertMeta('name', 'author', SITE_AUTHOR)
  upsertMeta('name', 'publisher', SITE_PUBLISHER)
  const keywords = buildPageKeywords({
    path,
    title,
    h1,
    cityName,
    extra: extraKeywords,
  })
  upsertMeta('name', 'keywords', keywords)
  return keywords
}
