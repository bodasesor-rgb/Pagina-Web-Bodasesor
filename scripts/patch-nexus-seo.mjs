#!/usr/bin/env node
/**
 * Patch Nexus/SEO static HTML in dist/ after merge:
 * - Force /css/seo-landing.css to load render-blocking (kills ~1s FOUC)
 * - Shorten <title> and og:title to ≤60 chars
 * - Add loading="lazy" to non-hero <img> missing it
 * - Add width/height to <img> when src maps to known hero dimensions
 * - Prefer .webp on <img src> when a sibling .webp exists in dist/
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import {
  SITE_AUTHOR,
  SITE_PUBLISHER,
  buildPageKeywords,
  buildImageAlt,
  imageStemFromPath,
  labelFromSlug,
} from '../src/utils/seo-page-meta.js'
import { absoluteUrl } from './lib/seo-canonical.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const MAX_TITLE = 60
const GA_ID = 'G-6VGGKNB77P'
const GA_SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
`

function stripBrand(text) {
  return String(text ?? '')
    .replace(/\s*—\s*Cotización Gratis\s*/gi, ' ')
    .replace(/\s*\|\s*Bodasesor(\s+Eventos)?\s*$/i, '')
    .replace(/\s+a Domicilio/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function buildTitle(core) {
  const brand = ' | Bodasesor'
  let title = `${core}${brand}`
  if (title.length <= MAX_TITLE) return title
  return `${core.slice(0, MAX_TITLE - brand.length).trim()}${brand}`
}

function shortenTitle(raw) {
  return buildTitle(stripBrand(raw))
}

async function walkHtml(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue
      await walkHtml(full, files)
    } else if (entry.name === 'index.html') {
      files.push(full)
    }
  }
  return files
}

function stripGtagSnippets(html) {
  let out = html
  out = out.replace(/<!--\s*Google tag \(gtag\.js\)\s*-->\s*/gi, '')
  out = out.replace(
    /<script[^>]*\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'][^>]*>\s*<\/script>\s*/gi,
    '',
  )
  // Inline bootstrap that defines gtag + config (Nexus / prior patches)
  out = out.replace(
    /<script>\s*(?:window\.)?dataLayer\s*=\s*(?:window\.)?dataLayer\s*\|\|\s*\[\];[\s\S]*?function\s+gtag\s*\([\s\S]*?gtag\(\s*['"]config['"]\s*,\s*['"]G-[A-Z0-9]+['"]\s*(?:,\s*\{[\s\S]*?\})?\s*\);?\s*<\/script>\s*/gi,
    '',
  )
  // Deferred Nexus loadGa() injectors (often duplicated; cause triple page_view)
  out = out.replace(
    /<script>\s*\(function\s*\(\)\s*\{\s*function\s+loadGa\s*\(\)\s*\{[\s\S]*?googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]+[\s\S]*?\}\)\s*\(\)\s*;?\s*<\/script>\s*/gi,
    '',
  )
  return out
}

/** Ensure exactly one GA4 gtag snippet (dedupe doubles that inflate pageviews). */
function ensureGtag(html) {
  const headScriptCount = (
    html.match(/<head[\s\S]*?<\/head>/i)?.[0]?.match(/googletagmanager\.com\/gtag\/js\?id=/g) || []
  ).length
  const deferredCount = (html.match(/function\s+loadGa\s*\(/g) || []).length
  const hasId = html.includes(GA_ID)
  if (headScriptCount === 1 && deferredCount === 0 && hasId) {
    return { html, changed: false }
  }
  if (!/<head[^>]*>/i.test(html)) return { html, changed: false }

  let out = stripGtagSnippets(html)
  out = out.replace(/<head([^>]*)>/i, `<head$1>\n${GA_SNIPPET}`)
  return { html: out, changed: out !== html }
}

/**
 * Async CSS (loadCSS + preload onload) leaves FAQ/trust/spec unstyled for ~1s.
 * Replace with a single render-blocking stylesheet link.
 */
function forceBlockingSeoCss(html) {
  if (!html.includes('seo-landing.css')) return { html, changed: false }

  let out = html
  let changed = false

  const beforeLoadCss = out
  out = out.replace(
    /<script>\s*!function\(e\)\{"use strict";[\s\S]*?loadCSS[\s\S]*?<\/script>\s*/gi,
    '',
  )
  if (out !== beforeLoadCss) changed = true

  const beforeLinks = out
  out = out.replace(/<noscript>\s*<link\b[^>]*seo-landing\.css[^>]*>\s*<\/noscript>\s*/gi, '')
  out = out.replace(/<link\b[^>]*seo-landing\.css[^>]*>\s*/gi, '')
  if (out !== beforeLinks) changed = true

  const blocking = '<link rel="stylesheet" href="/css/seo-landing.css">'
  if (!out.includes(blocking)) {
    if (/<\/style>/i.test(out)) {
      out = out.replace(/<\/style>/i, `</style>\n  ${blocking}`)
      changed = true
    } else if (/<\/head>/i.test(out)) {
      out = out.replace(/<\/head>/i, `  ${blocking}\n</head>`)
      changed = true
    }
  }

  return { html: out, changed }
}

/** Rewrite local png/jpg src to webp only when the sibling file exists in dist/. */
function preferWebpSrc(html) {
  let changed = false
  const out = html.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+\.(?:png|jpe?g))(["'][^>]*>)/gi,
    (match, pre, src, post) => {
      let pathname = src
      try {
        if (src.startsWith('http')) pathname = new URL(src).pathname
      } catch {
        return match
      }
      if (!pathname.startsWith('/')) return match
      const webpPath = pathname.replace(/\.(png|jpe?g)$/i, '.webp')
      if (!existsSync(join(DIST, webpPath.replace(/^\//, '')))) return match
      changed = true
      const nextSrc = src.replace(/\.(png|jpe?g)$/i, '.webp')
      return `${pre}${nextSrc}${post}`
    },
  )
  return { html: out, changed }
}

/**
 * If landing hero points at /{slug}/{slug}.webp and the file is missing in dist/,
 * swap to a real product fallback so browsers don't get SPA HTML soft-404 images.
 */
function fixMissingLocalHeroes(html, filePath) {
  const pagePath = pathFromFile(filePath)
  const slug = pagePath.replace(/^\//, '').split('/')[0] || ''
  let fallback = '/images/banquete-hero.png'
  if (/kosher/i.test(slug)) fallback = '/images/banquete-kosher-hero.png'
  else if (/mexicano/i.test(slug)) fallback = '/images/banquete-mexicano-hero.png'
  else if (/navide/i.test(slug)) fallback = '/images/banquete-navideno-hero.png'
  else if (/mesa-dulces|dulces/i.test(slug)) fallback = '/images/productos/mesa-dulces.png'
  else if (/mesa-postres|postres/i.test(slug)) fallback = '/images/productos/mesa-postres.png'
  else if (/mesa-quesos|quesos/i.test(slug)) fallback = '/images/productos/mesa-quesos.png'
  else if (/salon|fiestas|eventos/i.test(slug)) fallback = '/images/banquete-hero.png'

  let changed = false
  let out = html.replace(
    /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
    (match, pre, src, post) => {
      let pathname = src
      try {
        if (src.startsWith('http')) {
          const u = new URL(src)
          if (!u.hostname.includes('bodasesor.com')) return match
          pathname = u.pathname
        }
      } catch {
        return match
      }
      if (!pathname.startsWith('/')) return match
      // Only local landing/product images — not logo/sello/css assets
      if (
        pathname.startsWith('/images/logo') ||
        pathname.startsWith('/images/sello') ||
        pathname.startsWith('/css/') ||
        pathname.startsWith('/assets/')
      ) {
        return match
      }
      if (!/\.(webp|png|jpe?g)$/i.test(pathname)) return match
      const abs = join(DIST, pathname.replace(/^\//, ''))
      if (existsSync(abs)) return match
      changed = true
      return `${pre}${fallback}${post}`
    },
  )

  // og:image pointing at missing local hero → same fallback (absolute URL)
  out = out.replace(
    /(<meta\s+property="og:image"\s+content=["'])([^"']+)(["']\s*\/?>)/gi,
    (match, pre, src, post) => {
      let pathname = src
      try {
        if (src.startsWith('http')) {
          const u = new URL(src)
          if (!u.hostname.includes('bodasesor.com')) return match
          pathname = u.pathname
        }
      } catch {
        return match
      }
      if (!pathname.startsWith('/') || !/\.(webp|png|jpe?g)$/i.test(pathname)) return match
      if (pathname.startsWith('/images/logo') || pathname.startsWith('/images/sello')) return match
      const abs = join(DIST, pathname.replace(/^\//, ''))
      if (existsSync(abs)) return match
      changed = true
      return `${pre}https://bodasesor.com${fallback}${post}`
    },
  )
  return { html: out, changed }
}

/** Make meta description include the page label when it is generic/duplicated. */
function uniquifyMetaDescription(html, filePath) {
  const path = pathFromFile(filePath)
  const label = labelFromSlug(path.replace(/^\//, '').split('/').filter(Boolean).pop() || path)
  const re = /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i
  const m = html.match(re)
  if (!m) return { html, changed: false }
  let desc = m[1].trim()
  const generic =
    /Banquetes premium y catering gourmet\.?\s*Cotiza gratis/i.test(desc) ||
    /Salones para bodas y eventos\.?\s*Cotiza gratis/i.test(desc) ||
    desc.length < 80
  if (!generic) return { html, changed: false }
  if (desc.toLowerCase().includes(label.toLowerCase().slice(0, Math.min(12, label.length)))) {
    return { html, changed: false }
  }
  const stripped = desc.replace(
    new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[.\s—-]*`, 'i'),
    '',
  )
  let next = `${label}. ${stripped || 'Cotiza banquetes, catering y eventos con Bodasesor en México. Respuesta por WhatsApp.'}`
  if (next.length > 155) next = `${next.slice(0, 152).trim()}…`
  if (next === desc) return { html, changed: false }
  return {
    html: html.replace(re, `<meta name="description" content="${escapeAttr(next)}">`),
    changed: true,
  }
}

function escapeAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function pathFromFile(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/')
  if (rel === 'index.html') return '/'
  return `/${rel.replace(/\/index\.html$/i, '')}`
}

function ensureNamedMeta(html, name, content) {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
  const tag = `<meta name="${name}" content="${escapeAttr(content)}">`
  if (re.test(html)) return { html: html.replace(re, tag), changed: true }
  if (/<meta\s+name="description"/i.test(html)) {
    return {
      html: html.replace(
        /(<meta\s+name="description"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n  ${tag}`,
      ),
      changed: true,
    }
  }
  if (/<\/title>/i.test(html)) {
    return {
      html: html.replace(/<\/title>/i, `</title>\n  ${tag}`),
      changed: true,
    }
  }
  return { html, changed: false }
}

function ensureLinkRel(html, rel, href) {
  const re = new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*\\/?>`, 'i')
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}">`
  if (re.test(html)) {
    const prev = (html.match(re) || [])[0] || ''
    if (prev.includes(href)) return { html, changed: false }
    return { html: html.replace(re, tag), changed: true }
  }
  if (/<meta\s+name="description"/i.test(html)) {
    return {
      html: html.replace(
        /(<meta\s+name="description"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n  ${tag}`,
      ),
      changed: true,
    }
  }
  if (/<\/title>/i.test(html)) {
    return {
      html: html.replace(/<\/title>/i, `</title>\n  ${tag}`),
      changed: true,
    }
  }
  return { html, changed: false }
}

function ensurePropMeta(html, property, content) {
  const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
  const tag = `<meta property="${property}" content="${escapeAttr(content)}">`
  if (re.test(html)) {
    const prev = (html.match(re) || [])[0] || ''
    if (prev.includes(content)) return { html, changed: false }
    return { html: html.replace(re, tag), changed: true }
  }
  const canonRe = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i
  if (canonRe.test(html)) {
    return {
      html: html.replace(canonRe, (m) => `${m}\n  ${tag}`),
      changed: true,
    }
  }
  if (/<\/title>/i.test(html)) {
    return {
      html: html.replace(/<\/title>/i, `</title>\n  ${tag}`),
      changed: true,
    }
  }
  return { html, changed: false }
}

/** Force apex bodasesor.com + trailing slash canonical on every Nexus/SEO HTML shell. */
function patchCanonicalUrls(html, filePath) {
  const path = pathFromFile(filePath)
  const isNexus = html.includes('seo-service-hero') || html.includes('seo-section')
  const isBlog =
    html.includes('seo-blog-') ||
    html.includes('seo-blog-conversion') ||
    html.includes('Bodasesor Eventos Blog')
  if (!isNexus && !isBlog) return { html, changed: false }

  const canonical = absoluteUrl(path)
  let out = html
  let changed = false

  // Strip Hostinger / www mistakes from existing tags before rewrite
  out = out.replace(
    /https?:\/\/(?:www\.)?(?:white-ferret[^"'\s>]*hostingersite\.com|www\.bodasesor\.com)[^"'\s>]*/gi,
    canonical,
  )

  for (const fn of [
    () => ensureLinkRel(out, 'canonical', canonical),
    () => ensurePropMeta(out, 'og:url', canonical),
  ]) {
    const r = fn()
    out = r.html
    if (r.changed) changed = true
  }

  if (isNexus || isBlog) {
    const robots = ensureNamedMeta(out, 'robots', 'index, follow')
    out = robots.html
    if (robots.changed) changed = true
  }

  return { html: out, changed }
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return m ? m[1].trim() : ''
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (!m) return ''
  return m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Inject author/publisher/keywords unique per page path. */
function patchIdentityMetas(html, filePath) {
  let out = html
  let changed = false
  const path = pathFromFile(filePath)
  const title = extractTitle(out)
  const h1 = extractH1(out)
  const keywords = buildPageKeywords({ path, title, h1 })

  for (const [name, content] of [
    ['author', SITE_AUTHOR],
    ['publisher', SITE_PUBLISHER],
    ['keywords', keywords],
  ]) {
    const r = ensureNamedMeta(out, name, content)
    out = r.html
    if (r.changed) changed = true
  }

  // Align JSON-LD author/publisher name → bodasesor.com when present
  const beforeLd = out
  out = out.replace(
    /("author"\s*:\s*\{[^}]*?"name"\s*:\s*")([^"]+)(")/gi,
    `$1${SITE_AUTHOR}$3`,
  )
  out = out.replace(
    /("publisher"\s*:\s*\{[^}]*?"name"\s*:\s*")([^"]+)(")/gi,
    `$1${SITE_PUBLISHER}$3`,
  )
  if (out !== beforeLd) changed = true

  return { html: out, changed, keywords, path, title, h1 }
}

/**
 * Optimize img alt/title from page URL + service keywords.
 * Hero image (seo-hero-image) ALWAYS uses the page keyword (1 image = 1 keyword).
 * Logo/sello keep brand alts. Other weak/empty alts get upgraded.
 */
function patchImageAlts(html, { path, title, h1 }) {
  let changed = false
  let imgIndex = 0
  const stem = imageStemFromPath(path)
  const core = h1 || title || labelFromSlug(stem)
  const heroAlt = `${core} | Bodasesor Eventos`.slice(0, 125)
  const out = html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    imgIndex++
    let next = attrs
    const src = ((next.match(/\bsrc\s*=\s*["']([^"']*)["']/i) || [])[1] || '').toLowerCase()
    const isLogoOrSello =
      src.includes('/images/logo') ||
      src.includes('/images/sello') ||
      src.includes('logo-white') ||
      src.includes('sello-garantia')
    if (isLogoOrSello) return match

    const isHero = /seo-hero-image/i.test(next) || imgIndex === 1
    const alt = isHero
      ? heroAlt
      : buildImageAlt({
          path,
          title,
          h1,
          index: imgIndex - 1,
          role: 'detalle',
        })

    if (/\balt\s*=\s*["'][^"']*["']/i.test(next)) {
      const prev = (next.match(/\balt\s*=\s*["']([^"']*)["']/i) || [])[1] || ''
      const shouldUpgrade =
        isHero ||
        !prev.trim() ||
        /^evento real/i.test(prev) ||
        /^image$/i.test(prev) ||
        prev.length < 8 ||
        /^(foto|imagen)\s*\d*$/i.test(prev)
      if (shouldUpgrade && prev !== alt) {
        next = next.replace(/\balt\s*=\s*["'][^"']*["']/i, `alt="${escapeAttr(alt)}"`)
        changed = true
      }
    } else {
      next = ` alt="${escapeAttr(alt)}"${next}`
      changed = true
    }

    if (isHero) {
      if (/\btitle\s*=\s*["'][^"']*["']/i.test(next)) {
        const prevTitle = (next.match(/\btitle\s*=\s*["']([^"']*)["']/i) || [])[1] || ''
        if (prevTitle !== core) {
          next = next.replace(/\btitle\s*=\s*["'][^"']*["']/i, `title="${escapeAttr(core)}"`)
          changed = true
        }
      } else {
        next = ` title="${escapeAttr(core)}"${next}`
        changed = true
      }
      // Prioritize LCP hero for CrUX mobile (origin LCP ~4.8s).
      if (!/\bfetchpriority\s*=/i.test(next)) {
        next = ` fetchpriority="high"${next}`
        changed = true
      }
      if (!/\bdecoding\s*=/i.test(next)) {
        next = ` decoding="async"${next}`
        changed = true
      }
      if (!/\bwidth\s*=/i.test(next)) {
        next = ` width="1200"${next}`
        changed = true
      }
      if (!/\bheight\s*=/i.test(next)) {
        next = ` height="675"${next}`
        changed = true
      }
      // Never lazy-load the LCP image
      if (/\bloading\s*=\s*["']lazy["']/i.test(next)) {
        next = next.replace(/\bloading\s*=\s*["']lazy["']/i, 'loading="eager"')
        changed = true
      }
    } else if (!/\btitle\s*=/i.test(next)) {
      next = ` title="${escapeAttr(core)}"${next}`
      changed = true
    }

    if (!/\bdata-seo-stem\s*=/i.test(next) && isHero) {
      next = ` data-seo-stem="${escapeAttr(stem)}"${next}`
      changed = true
    }

    if (next === attrs) return match
    return `<img${next}>`
  })

  // Align social image alts to the same page keyword
  let html2 = out
  const ogAltRe = /(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/i
  if (ogAltRe.test(html2)) {
    const nextOg = html2.replace(ogAltRe, `$1${escapeAttr(heroAlt)}$2`)
    if (nextOg !== html2) {
      html2 = nextOg
      changed = true
    }
  }
  const twAltRe = /(<meta\s+name="twitter:image:alt"\s+content=")[^"]*(")/i
  if (twAltRe.test(html2)) {
    const nextTw = html2.replace(twAltRe, `$1${escapeAttr(heroAlt)}$2`)
    if (nextTw !== html2) {
      html2 = nextTw
      changed = true
    }
  } else if (/<meta\s+name="twitter:image"/i.test(html2)) {
    html2 = html2.replace(
      /(<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>)/i,
      `$1\n  <meta name="twitter:image:alt" content="${escapeAttr(heroAlt)}">`,
    )
    changed = true
  }

  // Soften weak generic H2s that hurt service intent
  const beforeH2 = html2
  html2 = html2.replace(
    /(<h2[^>]*>)\s*Galería(?:\s+de\s+eventos)?\s*(<\/h2>)/gi,
    `$1Fotos del servicio y montaje$2`,
  )
  html2 = html2.replace(
    /(<h2[^>]*>)\s*Nuestros servicios\s*(<\/h2>)/gi,
    `$1Servicios de banquete, catering y eventos$2`,
  )
  if (html2 !== beforeH2) changed = true

  return { html: html2, changed }
}

/**
 * Preload the first seo-hero / LCP image so mobile CrUX starts fetch earlier.
 */
function ensureHeroImagePreload(html) {
  const isNexus = html.includes('seo-service-hero') || html.includes('seo-hero-image')
  if (!isNexus || !/<\/head>/i.test(html)) return { html, changed: false }

  const heroMatch =
    html.match(/<img\b[^>]*class=["'][^"']*seo-hero-image[^"']*["'][^>]*>/i) ||
    html.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i)
  if (!heroMatch) return { html, changed: false }

  const src = (heroMatch[0].match(/\bsrc=["']([^"']+)["']/i) || [])[1] || ''
  if (!src || !/\.(webp|jpe?g|png)(\?|$)/i.test(src)) return { html, changed: false }
  if (html.includes(src) && /rel=["']preload["'][^>]*as=["']image["']/i.test(html) && html.includes(src)) {
    // Already has a preload pointing at this src (rough check)
    const preloadForSrc = new RegExp(
      `rel=["']preload["'][^>]*href=["']${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
      'i',
    )
    const preloadForSrcAlt = new RegExp(
      `href=["']${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*rel=["']preload["']`,
      'i',
    )
    if (preloadForSrc.test(html) || preloadForSrcAlt.test(html)) {
      return { html, changed: false }
    }
  }

  const type = /\.webp(\?|$)/i.test(src)
    ? ' type="image/webp"'
    : /\.png(\?|$)/i.test(src)
      ? ' type="image/png"'
      : ' type="image/jpeg"'
  const tag = `  <link rel="preload" as="image" href="${src}"${type} fetchpriority="high" />\n`
  return { html: html.replace(/<\/head>/i, `${tag}</head>`), changed: true }
}

function patchHtml(html, filePath) {
  let changed = false
  let out = html

  const css = forceBlockingSeoCss(out)
  out = css.html
  if (css.changed) changed = true

  const ga = ensureGtag(out)
  out = ga.html
  if (ga.changed) changed = true

  const webp = preferWebpSrc(out)
  out = webp.html
  if (webp.changed) changed = true

  const heroes = fixMissingLocalHeroes(out, filePath)
  out = heroes.html
  if (heroes.changed) changed = true

  const identity = patchIdentityMetas(out, filePath)
  out = identity.html
  if (identity.changed) changed = true

  const canon = patchCanonicalUrls(out, filePath)
  out = canon.html
  if (canon.changed) changed = true

  const uniqDesc = uniquifyMetaDescription(out, filePath)
  out = uniqDesc.html
  if (uniqDesc.changed) changed = true

  const imgs = patchImageAlts(out, identity)
  out = imgs.html
  if (imgs.changed) changed = true

  const heroPreload = ensureHeroImagePreload(out)
  out = heroPreload.html
  if (heroPreload.changed) changed = true

  out = out.replace(/<title>([^<]*)<\/title>/i, (match, inner) => {
    const next = shortenTitle(inner)
    if (next === inner) return match
    changed = true
    return `<title>${next}</title>`
  })

  out = out.replace(
    /<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?>/gi,
    (match, inner) => {
      const next = shortenTitle(inner)
      if (next === inner) return match
      changed = true
      return `<meta property="og:title" content="${next}">`
    },
  )

  // Lazy-load below-fold images missing loading attr (skip first img — likely hero)
  let imgIndex = 0
  out = out.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    imgIndex++
    if (imgIndex === 1) {
      if (!/\bdecoding\s*=/.test(attrs)) {
        changed = true
        return `<img decoding="async"${attrs}>`
      }
      return match
    }
    let next = attrs
    if (!/\bloading\s*=/.test(next)) {
      next = ` loading="lazy"${next}`
      changed = true
    }
    if (!/\bdecoding\s*=/.test(next)) {
      next = ` decoding="async"${next}`
      changed = true
    }
    if (next === attrs) return match
    return `<img${next}>`
  })

  // Add dimensions when missing on images that already declare one dimension
  out = out.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    if (/\bwidth\s*=/.test(attrs) && /\bheight\s*=/.test(attrs)) return match
    if (/\bwidth\s*=/.test(attrs) && !/\bheight\s*=/.test(attrs)) {
      changed = true
      return `<img${attrs} height="420">`
    }
    if (!/\bwidth\s*=/.test(attrs) && /\bheight\s*=/.test(attrs)) {
      changed = true
      return `<img width="640"${attrs}>`
    }
    return match
  })

  return { html: out, changed }
}

async function main() {
  if (!existsSync(DIST)) {
    console.warn('patch-nexus-seo: dist/ missing — skip')
    return
  }

  const files = await walkHtml(DIST)
  let patched = 0
  let titles = 0
  let gaFixed = 0

  for (const file of files) {
    const rel = relative(DIST, file).replace(/\\/g, '/')
    if (rel === 'index.html') continue

    const html = await readFile(file, 'utf8')
    if (!html.includes('<title>')) continue

    const beforeScripts = (html.match(/googletagmanager\.com\/gtag\/js\?id=/g) || []).length
    const { html: next, changed } = patchHtml(html, file)
    const isNexus =
      html.includes('seo-service-hero') || html.includes('seo-section')
    const expectedCanon = absoluteUrl(pathFromFile(file))
    const hasCanon =
      /<link\s+rel=["']canonical["']\s+href=["']https:\/\/bodasesor\.com/i.test(next) &&
      next.includes(expectedCanon)
    if (!changed && isNexus && !hasCanon) {
      const forced = patchCanonicalUrls(html, file)
      if (forced.changed) {
        await writeFile(file, forced.html)
        patched++
      }
      continue
    }
    if (!changed) continue

    await writeFile(file, next)
    patched++
    const afterScripts = (next.match(/googletagmanager\.com\/gtag\/js\?id=/g) || []).length
    if (beforeScripts !== 1 || afterScripts !== 1 || !next.includes(GA_ID)) {
      if (afterScripts === 1 && next.includes(GA_ID) && beforeScripts !== 1) gaFixed++
    } else if (beforeScripts > 1) {
      gaFixed++
    }
    const titleMatch = next.match(/<title>([^<]*)<\/title>/i)
    if (titleMatch && titleMatch[1].length <= MAX_TITLE) titles++
  }

  console.log(
    `patch-nexus-seo: ${patched} HTML files updated (${files.length} scanned, ga_normalized=${gaFixed})`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
