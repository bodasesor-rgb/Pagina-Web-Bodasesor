#!/usr/bin/env node
/**
 * Write dist/{path}/index.html SPA shells with correct SEO meta for crawlers.
 * Skips existing Nexus landings (seo-service-hero without SPA root).
 *
 * Usage: node scripts/prerender-spa-seo-shells.mjs
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectSpaSeoEntries } from './collect-spa-seo-entries.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, '&#39;')
}

async function isNexusLanding(absPath) {
  try {
    await access(absPath)
    const html = await readFile(absPath, 'utf8')
    if (!html.includes('seo-service-hero')) return false
    // SPA shells have #root + hashed assets — do not treat as Nexus
    if (html.includes('id="root"') && /\/assets\/index-[^"]+\.js/.test(html)) return false
    return true
  } catch {
    return false
  }
}

function applySeo(html, entry) {
  let out = html

  // Mark non-home shells so static home hero is hidden even before JS
  out = out.replace(/<html\b([^>]*)>/i, (m, attrs) => {
    if (/\bclass=/.test(attrs)) {
      return `<html${attrs.replace(/class="([^"]*)"/, 'class="$1 no-lcp-hero"')}>`
    }
    return `<html${attrs} class="no-lcp-hero">`
  })

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(entry.title)}</title>`)

  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(entry.description)}" />`,
  )

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(entry.canonical)}" />`,
  )

  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(entry.title)}" />`,
  )

  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(entry.description)}" />`,
  )

  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(entry.canonical)}" />`,
  )

  // Crawler-visible content (home hero is hidden via no-lcp-hero)
  const noscript = `<noscript><main style="padding:2rem;font-family:Georgia,serif;color:#162040"><h1>${escapeHtml(entry.h1)}</h1><p>${escapeHtml(entry.description)}</p></main></noscript>`
  if (out.includes('</body>')) {
    out = out.replace('</body>', `${noscript}\n  </body>`)
  }

  // Also rewrite static hero copy so any crawler that ignores noscript still sees product text
  out = out.replace(
    /(<div id="static-hero-copy">\s*<h1>)[^<]*(<\/h1>\s*<p class="hero-sub">)[^<]*(<\/p>)/i,
    `$1${escapeHtml(entry.h1)}$2${escapeHtml(entry.description)}$3`,
  )

  return out
}

async function main() {
  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    console.error('prerender-spa-seo-shells: dist/index.html missing — run vite build first')
    process.exit(1)
  }

  const template = await readFile(templatePath, 'utf8')
  const entries = collectSpaSeoEntries()

  let written = 0
  let skippedNexus = 0
  let skippedSame = 0

  for (const entry of entries.values()) {
    const relDir = entry.path.replace(/^\//, '')
    const outPath = join(DIST, relDir, 'index.html')

    if (await isNexusLanding(outPath)) {
      skippedNexus++
      continue
    }

    const html = applySeo(template, entry)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
    written++
  }

  console.log(
    `prerender-spa-seo-shells: wrote ${written} shells (skipped Nexus=${skippedNexus}, inventory=${entries.size}, unused=${skippedSame})`,
  )

  // Smoke: critical product page must not keep home canonical
  const smoke = join(DIST, 'pistas-tarimas/pista-pintada-mano/index.html')
  if (!existsSync(smoke)) {
    console.error('prerender-spa-seo-shells: missing smoke shell pistas-tarimas/pista-pintada-mano')
    process.exit(1)
  }
  const smokeHtml = await readFile(smoke, 'utf8')
  if (!smokeHtml.includes('pista-pintada-mano') || smokeHtml.includes('rel="canonical" href="https://bodasesor.com/"')) {
    console.error('prerender-spa-seo-shells: smoke shell still has home SEO meta')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
