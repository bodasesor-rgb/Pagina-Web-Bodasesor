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
import { join, dirname } from 'node:path'
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

function escapeAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function pathFromFile(file) {
  const rel = file.replace(`${DIST}/`, '').replace(/\\/g, '/')
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
 * Prefer slug-aligned naming in alt text (filenames on Nexus already match URL).
 */
function patchImageAlts(html, { path, title, h1 }) {
  let changed = false
  let imgIndex = 0
  const stem = imageStemFromPath(path)
  const core = h1 || title || labelFromSlug(stem)
  const out = html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    imgIndex++
    let next = attrs
    const alt = buildImageAlt({
      path,
      title,
      h1,
      index: imgIndex - 1,
      role: imgIndex === 1 ? 'imagen principal' : 'detalle',
    })

    if (/\balt\s*=\s*["'][^"']*["']/i.test(next)) {
      const prev = (next.match(/\balt\s*=\s*["']([^"']*)["']/i) || [])[1] || ''
      // Upgrade weak/generic alts
      if (
        !prev.trim() ||
        /^evento real/i.test(prev) ||
        /^image$/i.test(prev) ||
        prev.length < 8 ||
        /^(foto|imagen)\s*\d*$/i.test(prev)
      ) {
        next = next.replace(/\balt\s*=\s*["'][^"']*["']/i, `alt="${escapeAttr(alt)}"`)
        changed = true
      }
    } else {
      next = ` alt="${escapeAttr(alt)}"${next}`
      changed = true
    }

    if (!/\btitle\s*=/i.test(next)) {
      next = ` title="${escapeAttr(core)}"${next}`
      changed = true
    }

    // Annotate data-seo-stem for debugging / future renames (harmless)
    if (!/\bdata-seo-stem\s*=/i.test(next) && imgIndex === 1) {
      next = ` data-seo-stem="${escapeAttr(stem)}"${next}`
      changed = true
    }

    if (next === attrs) return match
    return `<img${next}>`
  })

  // Soften weak generic H2s that hurt service intent
  let html2 = out
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

  const identity = patchIdentityMetas(out, filePath)
  out = identity.html
  if (identity.changed) changed = true

  const imgs = patchImageAlts(out, identity)
  out = imgs.html
  if (imgs.changed) changed = true

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
    const rel = file.replace(`${DIST}/`, '')
    if (rel === 'index.html') continue

    const html = await readFile(file, 'utf8')
    if (!html.includes('<title>')) continue

    const beforeScripts = (html.match(/googletagmanager\.com\/gtag\/js\?id=/g) || []).length
    const { html: next, changed } = patchHtml(html, file)
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
