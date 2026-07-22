const SITE_BASE = 'https://bodasesor.com'

/** Normalize pathname for canonical URLs (no trailing slash except home). */
export function canonicalPath(pathname) {
  const raw = String(pathname || '/').split(/[?#]/)[0] || '/'
  const clean = raw.replace(/\/+$/, '') || '/'
  return clean
}

export function absoluteUrl(pathname) {
  const path = canonicalPath(pathname)
  return path === '/' ? `${SITE_BASE}/` : `${SITE_BASE}${path}`
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
  el.setAttribute('content', content)
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
