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
import { clampMetaDescription } from '../src/utils/seo-meta.js'
import {
  SITE_AUTHOR,
  SITE_PUBLISHER,
  buildPageKeywords,
  organizationRef,
} from '../src/utils/seo-page-meta.js'
import { absoluteOgImage, DEFAULT_OG_IMAGE_ALT } from '../src/utils/seo-social.js'

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

/** Rich static blog HTML (Shopify/legacy) — must not be replaced by thin SPA shells */
async function isPreservedBlogHtml(absPath) {
  try {
    await access(absPath)
    const html = await readFile(absPath, 'utf8')
    if (html.includes('id="root"') && /\/assets\/index-[^"]+\.js/.test(html)) return false
    if (html.includes('Bodasesor Eventos Blog')) return true
    if (html.length >= 20_000 && !html.includes('seo-service-hero')) return true
    return false
  } catch {
    return false
  }
}

/** Any existing non-SPA blog HTML must never be overwritten by prerender. */
async function mustNotOverwriteBlog(absPath, entryPath) {
  if (!String(entryPath || '').startsWith('/blog/')) return false
  try {
    await access(absPath)
    const html = await readFile(absPath, 'utf8')
    const isSpa = html.includes('id="root"') && /\/assets\/index-[^"]+\.js/.test(html)
    // Existing rich or non-SPA blog stays forever
    if (!isSpa) return true
    if (html.includes('Bodasesor Eventos Blog')) return true
    if (html.length >= 20_000) return true
    return false
  } catch {
    return false
  }
}

async function shouldSkipExistingLanding(absPath) {
  if (await isNexusLanding(absPath)) return true
  if (await isPreservedBlogHtml(absPath)) return true
  return false
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

  const description = clampMetaDescription(entry.description)
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  )

  const keywords =
    entry.keywords ||
    buildPageKeywords({
      path: entry.path,
      title: entry.title,
      h1: entry.h1,
    })

  // Author / publisher / keywords (replace if present, else inject after description)
  const ensureMeta = (name, content) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
    const tag = `<meta name="${name}" content="${escapeAttr(content)}" />`
    if (re.test(out)) out = out.replace(re, tag)
    else {
      out = out.replace(
        /(<meta\s+name="description"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n    ${tag}`,
      )
    }
  }
  ensureMeta('author', SITE_AUTHOR)
  ensureMeta('publisher', SITE_PUBLISHER)
  ensureMeta('keywords', keywords)
  ensureMeta('robots', entry.noindex ? 'noindex, follow' : 'index, follow')

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
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  )

  // Single H1 for crawlers: demote static LCP hero title (hidden on non-home shells)
  out = out.replace(
    /(<div id="static-hero-copy">\s*)<h1>([\s\S]*?)<\/h1>/i,
    '$1<p class="hero-title">$2</p>',
  )
  // Keep visual weight if CSS targeted h1 — mirror styles for .hero-title
  if (!out.includes('#static-hero-copy .hero-title')) {
    out = out.replace(
      /#static-hero-copy h1\{/i,
      '#static-hero-copy .hero-title,#static-hero-copy h1{',
    )
  }

  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(entry.canonical)}" />`,
  )

  const ogImage = absoluteOgImage(entry.image)
  const ogType = entry.path.startsWith('/blog/') ? 'article' : 'website'
  const ensureProp = (property, content) => {
    const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
    const tag = `<meta property="${property}" content="${escapeAttr(content)}" />`
    if (re.test(out)) out = out.replace(re, tag)
    else {
      out = out.replace(
        /(<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n    ${tag}`,
      )
    }
  }
  const ensureName = (name, content) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
    const tag = `<meta name="${name}" content="${escapeAttr(content)}" />`
    if (re.test(out)) out = out.replace(re, tag)
    else {
      out = out.replace(
        /(<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n    ${tag}`,
      )
    }
  }
  ensureProp('og:type', ogType)
  ensureProp('og:site_name', 'Bodasesor Eventos')
  ensureProp('og:locale', 'es_MX')
  ensureProp('og:image', ogImage)
  ensureProp('og:image:alt', entry.h1 || entry.title || DEFAULT_OG_IMAGE_ALT)
  ensureName('twitter:card', 'summary_large_image')
  ensureName('twitter:title', entry.title)
  ensureName('twitter:description', description)
  ensureName('twitter:image', ogImage)

  // Crawler-visible JSON-LD (Service/Article + BreadcrumbList) — no fake prices
  const isBlog = entry.path.startsWith('/blog/')
  const segs = entry.path.split('/').filter(Boolean)
  const crumbItems = [{ name: 'Inicio', href: 'https://bodasesor.com/' }]
  if (isBlog) {
    crumbItems.push({ name: 'Blog', href: 'https://bodasesor.com/blog' })
    crumbItems.push({ name: entry.h1 || entry.title })
  } else if (segs.length >= 2) {
    const hub = segs[0]
    const hubLabel = hub
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    crumbItems.push({ name: hubLabel, href: `https://bodasesor.com/${hub}` })
    crumbItems.push({ name: entry.h1 || entry.title })
  } else {
    crumbItems.push({ name: entry.h1 || entry.title })
  }

  const breadcrumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: crumbItems.map((item, index) => {
      const row = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      }
      if (item.href) row.item = item.href
      return row
    }),
  }

  const primaryLd = isBlog
    ? {
        '@type': 'Article',
        headline: entry.h1 || entry.title,
        description,
        url: entry.canonical,
        keywords,
        image: ogImage,
        author: organizationRef(),
        publisher: {
          ...organizationRef(),
          logo: {
            '@type': 'ImageObject',
            url: 'https://bodasesor.com/favicon.svg',
          },
        },
        inLanguage: 'es-MX',
      }
    : {
        '@type': 'Service',
        name: entry.h1 || entry.title,
        description,
        url: entry.canonical,
        keywords,
        image: ogImage,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Bodasesor Eventos',
          url: 'https://bodasesor.com/',
          telephone: '+52-55-4008-0373',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ciudad de México',
            addressRegion: 'CDMX',
            addressCountry: 'MX',
          },
          areaServed: { '@type': 'Country', name: 'México' },
        },
      }

  const jsonLd = { '@context': 'https://schema.org', '@graph': [primaryLd, breadcrumbLd] }
  const jsonLdTag = `<script type="application/ld+json" id="bodasesor-prerender-jsonld">${JSON.stringify(jsonLd)}</script>`
  if (/<\/head>/i.test(out)) {
    out = out.replace(/<\/head>/i, `  ${jsonLdTag}\n  </head>`)
  }

  // Visible breadcrumb for noscript / static crawlers
  const crumbHtml = crumbItems
    .map((item, i) => {
      const sep = i === 0 ? '' : ' / '
      if (item.href && i < crumbItems.length - 1) {
        return `${sep}<a href="${escapeAttr(item.href)}">${escapeHtml(item.name)}</a>`
      }
      return `${sep}<span>${escapeHtml(item.name)}</span>`
    })
    .join('')

  // Crawler-visible content (home hero is hidden via no-lcp-hero)
  const noscript = `<noscript><main style="padding:2rem;font-family:Georgia,serif;color:#162040"><nav aria-label="Migas de pan" style="margin-bottom:1rem;font-size:0.9rem">${crumbHtml}</nav><h1>${escapeHtml(entry.h1)}</h1><p>${escapeHtml(description)}</p></main></noscript>`
  if (out.includes('</body>')) {
    out = out.replace('</body>', `${noscript}\n  </body>`)
  }

  // Also rewrite static hero copy so any crawler that ignores noscript still sees product text
  out = out.replace(
    /(<div id="static-hero-copy">\s*<p class="hero-title">)[^<]*(<\/p>\s*<p class="hero-sub">)[^<]*(<\/p>)/i,
    `$1${escapeHtml(entry.h1)}$2${escapeHtml(description)}$3`,
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
  let skippedBlog = 0
  let skippedSame = 0

  for (const entry of entries.values()) {
    const relDir = entry.path.replace(/^\//, '')
    const outPath = join(DIST, relDir, 'index.html')

    if (await isNexusLanding(outPath)) {
      skippedNexus++
      continue
    }
    if (await isPreservedBlogHtml(outPath) || (await mustNotOverwriteBlog(outPath, entry.path))) {
      skippedBlog++
      continue
    }

    const html = applySeo(template, entry)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
    written++
  }

  console.log(
    `prerender-spa-seo-shells: wrote ${written} shells (skipped Nexus=${skippedNexus}, skipped blogs=${skippedBlog}, inventory=${entries.size}, unused=${skippedSame})`,
  )

  // Smoke: /buscar must be noindex (never indexable soft-home)
  const buscar = join(DIST, 'buscar/index.html')
  if (!existsSync(buscar)) {
    console.error('prerender-spa-seo-shells: missing /buscar shell')
    process.exit(1)
  }
  const buscarHtml = await readFile(buscar, 'utf8')
  if (!/name="robots"\s+content="noindex/i.test(buscarHtml)) {
    console.error('prerender-spa-seo-shells: /buscar must have robots noindex')
    process.exit(1)
  }
  if (buscarHtml.includes('rel="canonical" href="https://bodasesor.com/"')) {
    console.error('prerender-spa-seo-shells: /buscar must not use home canonical')
    process.exit(1)
  }
  if (!/property="og:image"\s+content="https:\/\/bodasesor\.com\//i.test(buscarHtml)) {
    console.error('prerender-spa-seo-shells: /buscar must include absolute og:image')
    process.exit(1)
  }
  if (!/name="twitter:card"\s+content="summary_large_image"/i.test(buscarHtml)) {
    console.error('prerender-spa-seo-shells: /buscar must include twitter:card')
    process.exit(1)
  }

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

  // Smoke: city service URLs must not soft-404 to home (GA / Search Console killers)
  const citySmokes = [
    'ciudad-de-mexico',
    'cuernavaca',
    'banquetes/ciudad-de-mexico',
    'banquetes/cuernavaca',
    'banquetes/3-tiempos/ciudad-de-mexico',
    'desayunos/puerto-vallarta',
    'cupcakes-gourmet/ciudad-de-mexico',
    'bodas/ciudad-de-mexico',
    'cenas/ciudad-de-mexico',
    'mesas/redonda/puerto-vallarta',
    // Hubs previously forced to /index.html 200! (home soft-404)
    'banquete-kosher',
    'banquete-mexicano',
    'mesa-dulces',
    'mesa-postres',
    'mesa-quesos',
  ]
  for (const rel of citySmokes) {
    const abs = join(DIST, rel, 'index.html')
    if (!existsSync(abs)) {
      console.error(`prerender-spa-seo-shells: missing city shell ${rel}`)
      process.exit(1)
    }
    const html = await readFile(abs, 'utf8')
    if (html.includes('rel="canonical" href="https://bodasesor.com/"')) {
      console.error(`prerender-spa-seo-shells: ${rel} still has home canonical (soft-404)`)
      process.exit(1)
    }
    const expectedCanon = `rel="canonical" href="https://bodasesor.com/${rel}"`
    if (!html.includes(expectedCanon)) {
      console.error(`prerender-spa-seo-shells: ${rel} missing canonical ${expectedCanon}`)
      process.exit(1)
    }
  }

  // Hub × city stays indexable (including banquet menu-by-course hubs + product hubs in SPA_SEO_HUBS)
  const hubCityRels = [
    'banquetes/ciudad-de-mexico',
    'banquetes/3-tiempos/ciudad-de-mexico',
    'cupcakes-gourmet/ciudad-de-mexico',
    'desayunos/puerto-vallarta',
    'bodas/ciudad-de-mexico',
    'cenas/ciudad-de-mexico',
  ]
  for (const rel of hubCityRels) {
    const html = await readFile(join(DIST, rel, 'index.html'), 'utf8')
    if (/name="robots"\s+content="noindex/i.test(html)) {
      console.error(`prerender-spa-seo-shells: hub×city ${rel} must stay indexable`)
      process.exit(1)
    }
  }
  // Thin product×city shells (NOT in SPA_SEO_HUBS) must stay noindex
  const thinCityRels = [
    'mesas/redonda/puerto-vallarta',
  ]
  for (const rel of thinCityRels) {
    const html = await readFile(join(DIST, rel, 'index.html'), 'utf8')
    if (!/name="robots"\s+content="noindex/i.test(html)) {
      console.error(`prerender-spa-seo-shells: thin city shell ${rel} must be noindex`)
      process.exit(1)
    }
  }

  // Must NOT prerender spam: blog×city or blog-slug product×city
  const banned = [
    'blog/ciudad-de-mexico',
    'como-organizar-boda-perfecta-mexico/ciudad-de-mexico',
  ]
  for (const rel of banned) {
    if (existsSync(join(DIST, rel, 'index.html'))) {
      console.error(`prerender-spa-seo-shells: unexpected spam shell ${rel}`)
      process.exit(1)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
