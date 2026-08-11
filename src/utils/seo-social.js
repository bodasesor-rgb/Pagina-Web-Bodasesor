/** Default social share image (home hero) — absolute URL for WhatsApp/OG. */
export const SITE_BASE = 'https://bodasesor.com'
export const DEFAULT_OG_IMAGE = `${SITE_BASE}/images/hero-bg-new.webp`
export const DEFAULT_OG_IMAGE_ALT = 'Banquetes y eventos Bodasesor en México'

/** Normalize relative or absolute image URLs for Open Graph. */
export function absoluteOgImage(src) {
  if (!src || typeof src !== 'string') return DEFAULT_OG_IMAGE
  const s = src.trim()
  if (!s) return DEFAULT_OG_IMAGE
  if (s.startsWith('https://') || s.startsWith('http://')) return s
  if (s.startsWith('//')) return `https:${s}`
  return `${SITE_BASE}${s.startsWith('/') ? s : `/${s}`}`
}
