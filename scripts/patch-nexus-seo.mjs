#!/usr/bin/env node
/**
 * Patch Nexus/SEO static HTML in dist/ after merge:
 * - Shorten <title> and og:title to ≤60 chars
 * - Add loading="lazy" to non-hero <img> missing it
 * - Add width/height to <img> when src maps to known hero dimensions
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

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

function ensureGtag(html) {
  if (html.includes(GA_ID) || html.includes('googletagmanager.com/gtag/js')) {
    return { html, changed: false }
  }
  if (!/<head[^>]*>/i.test(html)) return { html, changed: false }
  return {
    html: html.replace(/<head([^>]*)>/i, `<head$1>\n${GA_SNIPPET}`),
    changed: true,
  }
}

function patchHtml(html) {
  let changed = false
  let out = html

  const ga = ensureGtag(out)
  out = ga.html
  if (ga.changed) changed = true

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
    if (imgIndex === 1) return match
    if (/\bloading\s*=/.test(attrs)) return match
    changed = true
    return `<img loading="lazy"${attrs}>`
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

  for (const file of files) {
    const rel = file.replace(`${DIST}/`, '')
    if (rel === 'index.html') continue

    const html = await readFile(file, 'utf8')
    if (!html.includes('<title>')) continue

    const { html: next, changed } = patchHtml(html)
    if (!changed) continue

    await writeFile(file, next)
    patched++
    const titleMatch = next.match(/<title>([^<]*)<\/title>/i)
    if (titleMatch && titleMatch[1].length <= MAX_TITLE) titles++
  }

  console.log(`patch-nexus-seo: ${patched} HTML files updated (${files.length} scanned)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
