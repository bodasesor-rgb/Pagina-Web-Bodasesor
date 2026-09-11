#!/usr/bin/env node
/**
 * Finalize sitemap.xml AFTER Nexus merge so Google sees:
 * - SPA routes
 * - All Nexus landings actually present in dist/ (including NEW ones not yet in
 *   scripts/seo-landing-slugs.json)
 * - Static blog article URLs
 * - Image extensions (xmlns:image) for Google Image Search discovery
 *
 * Writes dist/sitemap.xml (and public/sitemap.xml for local inspection).
 *
 * Usage: node scripts/finalize-sitemap.mjs
 * Env: SITE_BASE=https://bodasesor.com  DIST_DIR=dist
 */
import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectSpaSeoEntries } from './collect-spa-seo-entries.mjs'
import { isNexusLandingHtml, isSpaShellHtml } from './lib/nexus-html.mjs'
import { INSTAGRAM_AD_EXCLUDES } from '../src/data/instagram-ad-excludes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const DIST_ENV = process.env.DIST_DIR || 'dist'
const DIST = DIST_ENV.startsWith('/') ? DIST_ENV : join(ROOT, DIST_ENV)

const MAX_IMAGES_PER_URL = 40
const HOME_HERO = '/images/hero-bg-new.webp'
const HOME_HERO_TITLE = 'Banquetes, Catering y Servicios para Eventos en México | Bodasesor'
const GALLERY_ALT_POOL = [
  'Banquete para boda Bodasesor',
  'Decoración floral para eventos',
  'XV años con catering gourmet',
  'Catering servido en sitio',
  'Mobiliario premium para bodas',
  'Montaje de mesas para eventos',
  'Banquete formal México',
  'Recepción con open bar',
  'Celebración con wedding planner',
  'Coffee break empresarial',
  'Salón decorado para boda',
  'Buffet y estaciones de comida',
]

const PRIORITY_KEY = [
  ['/', '1.0'],
  ['/banquetes-catering', '0.9'],
  ['/bodas', '0.9'],
  ['/xv-anos', '0.9'],
  ['/wedding-planner', '0.85'],
  ['/blog', '0.8'],
]

function priorityFor(path) {
  for (const [prefix, p] of PRIORITY_KEY) {
    if (path === prefix) return p
  }
  if (path.startsWith('/blog/')) return '0.65'
  if (path.split('/').filter(Boolean).length >= 2) return '0.7'
  return '0.65'
}

function escapeXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isSpaShell(html) {
  return isSpaShellHtml(html)
}

function isNexusLanding(html) {
  return isNexusLandingHtml(html)
}

function isRichBlog(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  return html.length >= 20_000
}

async function walkIndexHtml(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'assets' || e.name === 'node_modules') continue
      await walkIndexHtml(full, base, out)
    } else if (e.name === 'index.html') {
      out.push(relative(base, full).replace(/\\/g, '/'))
    }
  }
  return out
}

function pathFromIndexRel(rel) {
  if (rel === 'index.html') return '/'
  const dir = rel.replace(/\/index\.html$/, '')
  return `/${dir}`
}

function loadJsonSlugs() {
  const p = join(ROOT, 'scripts', 'seo-landing-slugs.json')
  if (!existsSync(p)) return []
  try {
    const payload = JSON.parse(readFileSync(p, 'utf8'))
    return (Array.isArray(payload?.slugs) ? payload.slugs : [])
      .filter((s) => typeof s === 'string' && s.trim())
      .map((s) => s.trim().replace(/^\/+|\/+$/g, ''))
  } catch {
    return []
  }
}

function loadBlogSlugs() {
  const p = join(ROOT, 'seo-seed', 'blog-slugs.txt')
  if (!existsSync(p)) return []
  return readFileSync(p, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && s !== 'articulos')
}

function normalizeImagePath(src) {
  if (!src || typeof src !== 'string') return null
  let s = src.trim()
  if (!s || s.startsWith('data:')) return null

  // Absolute URL — keep only our domain (skip Unsplash etc.)
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s)
      if (!u.hostname.endsWith('bodasesor.com')) return null
      s = u.pathname
    } catch {
      return null
    }
  }

  if (!s.startsWith('/')) s = `/${s}`
  // Drop query/hash
  s = s.split('?')[0].split('#')[0]
  if (!/\.(webp|png|jpe?g|gif|svg)$/i.test(s)) return null
  return s
}

async function fileExists(abs) {
  try {
    await access(abs)
    return true
  } catch {
    return false
  }
}

/** Prefer WebP in dist/public when sibling exists. */
async function resolvePublicImagePath(relPath) {
  const path = normalizeImagePath(relPath)
  if (!path) return null

  const candidates = []
  if (/\.(png|jpe?g)$/i.test(path)) {
    candidates.push(path.replace(/\.(png|jpe?g)$/i, '.webp'))
  }
  candidates.push(path)

  for (const candidate of candidates) {
    const inDist = join(DIST, candidate.replace(/^\//, ''))
    const inPublic = join(ROOT, 'public', candidate.replace(/^\//, ''))
    if ((await fileExists(inDist)) || (await fileExists(inPublic))) {
      return candidate
    }
  }
  // Still emit known CDN paths even if local file missing (deploy may have them)
  return path
}

function absoluteImageUrl(relPath) {
  const path = normalizeImagePath(relPath)
  if (!path) return null
  return `${SITE_BASE}${path}`
}

function extractOgImage(html) {
  if (!html) return null
  const m =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
  return m?.[1] || null
}

function extractHeroImg(html) {
  if (!html) return null
  const m =
    html.match(/<img[^>]+class=["'][^"']*seo-hero-image[^"']*["'][^>]*\bsrc=["']([^"']+)["']/i) ||
    html.match(/<img[^>]+id=["']lcp-hero["'][^>]*\bsrc=["']([^"']+)["']/i) ||
    html.match(/<img[^>]+\bsrc=["']([^"']+)["'][^>]*class=["'][^"']*seo-hero-image[^"']*["']/i)
  return m?.[1] || null
}

function extractImgTitle(html, srcHint) {
  if (!html || !srcHint) return null
  const escaped = srcHint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(
    `<img[^>]+src=["'][^"']*${escaped}[^"']*["'][^>]*(?:alt|title)=["']([^"']+)["']`,
    'i',
  )
  const m = html.match(re)
  return m?.[1] || null
}

function homeGalleryImages() {
  const ids = Array.from({ length: 281 }, (_, i) => i + 1)
    .filter((n) => !INSTAGRAM_AD_EXCLUDES.has(n))
    .slice(0, 60)
  return ids.map((n, i) => ({
    src: `/images/instagram/ig${n}.jpg`,
    title: `${GALLERY_ALT_POOL[i % GALLERY_ALT_POOL.length]} | Bodasesor`,
  }))
}

/**
 * @returns {Map<string, Array<{src:string,title?:string,caption?:string}>>}
 */
function buildSpaImageMap() {
  const map = new Map()

  const add = (path, img) => {
    if (!path || !img?.src) return
    const list = map.get(path) || []
    if (list.some((x) => x.src === img.src)) return
    list.push(img)
    map.set(path, list)
  }

  // Home + galería
  add('/', { src: HOME_HERO, title: HOME_HERO_TITLE })
  for (const g of homeGalleryImages()) add('/', g)
  add('/galeria', { src: HOME_HERO, title: 'Galería de bodas y banquetes Bodasesor' })
  for (const g of homeGalleryImages()) add('/galeria', g)

  // SPA SEO inventory (heroes already assigned in collect)
  for (const [path, entry] of collectSpaSeoEntries({ includeAllCityProductVariants: false })) {
    if (entry.noindex) continue
    if (!entry.image) continue
    const title =
      entry.h1 ||
      entry.title ||
      'Servicios para eventos Bodasesor'
    add(path, {
      src: entry.image,
      title: `${title} | Bodasesor`,
      caption: entry.description || undefined,
    })
  }

  return map
}

async function collectPaths(imageMap) {
  const paths = new Set(['/'])
  const nexusFromDist = new Set()

  for (const [p, entry] of collectSpaSeoEntries({ includeAllCityProductVariants: false })) {
    if (entry.noindex) continue
    if (p === '/buscar' || p.startsWith('/buscar') || p.includes('?')) continue
    paths.add(p)
  }

  for (const slug of loadJsonSlugs()) {
    if (slug.includes('?') || slug.startsWith('blog/')) continue
    paths.add(`/${slug}`)
  }

  paths.add('/blog')
  paths.add('/blog/articulos')
  for (const slug of loadBlogSlugs()) {
    paths.add(`/blog/${slug}`)
  }

  if (existsSync(DIST)) {
    const indexes = await walkIndexHtml(DIST)
    for (const rel of indexes) {
      const urlPath = pathFromIndexRel(rel)
      if (urlPath === '/buscar' || urlPath.startsWith('/buscar') || urlPath.startsWith('/assets')) {
        continue
      }

      try {
        const html = await readFile(join(DIST, rel), 'utf8')
        if (urlPath.startsWith('/blog/')) {
          if (urlPath === '/blog/articulos' || isRichBlog(html) || !isSpaShell(html)) {
            const clean = urlPath.replace(/\/$/, '') || '/'
            paths.add(clean)
            const og = extractOgImage(html) || extractHeroImg(html)
            if (og) {
              const list = imageMap.get(clean) || []
              const src = normalizeImagePath(og)
              if (src && !list.some((x) => x.src === src)) {
                list.push({
                  src,
                  title: extractImgTitle(html, src) || 'Artículo del blog Bodasesor',
                })
                imageMap.set(clean, list)
              }
            }
          }
          continue
        }
        if (urlPath === '/') {
          paths.add('/')
          continue
        }
        if (isNexusLanding(html)) {
          if (/name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
            continue
          }
          const clean = (urlPath.replace(/\/$/, '') || '/').replace(/^\//, '')
          const pathKey = `/${clean}`
          paths.add(pathKey)
          nexusFromDist.add(clean)

          const og = extractOgImage(html) || extractHeroImg(html)
          if (og) {
            const list = imageMap.get(pathKey) || []
            const src = normalizeImagePath(og)
            if (src && !list.some((x) => x.src === src)) {
              list.push({
                src,
                title: extractImgTitle(html, src) || `Landing SEO Bodasesor — ${clean}`,
              })
              imageMap.set(pathKey, list)
            }
          }
        }
      } catch {
        /* skip */
      }
    }
  }

  return {
    paths: [...paths]
      .filter((p) => p && !p.includes('?') && p !== '/buscar' && !p.startsWith('/buscar'))
      .sort(),
    nexusFromDist: [...nexusFromDist].sort(),
  }
}

async function maybeRefreshSlugInventory(nexusFromDist) {
  const inventoryPath = join(ROOT, 'scripts', 'seo-landing-slugs.json')
  if (!existsSync(inventoryPath) || nexusFromDist.length === 0) return

  const existing = new Set(loadJsonSlugs())
  let added = 0
  for (const slug of nexusFromDist) {
    if (!existing.has(slug)) {
      existing.add(slug)
      added++
    }
  }
  if (added === 0) return

  const slugs = [...existing].sort()
  let prev = {}
  try {
    prev = JSON.parse(readFileSync(inventoryPath, 'utf8'))
  } catch {
    prev = {}
  }
  const next = {
    ...prev,
    generatedAt: new Date().toISOString(),
    count: slugs.length,
    slugs,
    note:
      prev.note ||
      'Canonical Nexus landing inventory for Gate A / sitemap. Extended at build from dist merge.',
  }
  await writeFile(inventoryPath, JSON.stringify(next, null, 2) + '\n')
  console.log(`  refreshed seo-landing-slugs.json (+${added} → ${slugs.length} total)`)
}

async function renderImageBlocks(images) {
  if (!images?.length) return ''
  const blocks = []
  for (const img of images.slice(0, MAX_IMAGES_PER_URL)) {
    const resolved = await resolvePublicImagePath(img.src)
    const loc = absoluteImageUrl(resolved)
    if (!loc) continue
    const title = img.title ? `\n      <image:title>${escapeXml(img.title)}</image:title>` : ''
    const caption = img.caption
      ? `\n      <image:caption>${escapeXml(img.caption.slice(0, 220))}</image:caption>`
      : ''
    blocks.push(`    <image:image>
      <image:loc>${escapeXml(loc)}</image:loc>${title}${caption}
    </image:image>`)
  }
  return blocks.length ? `\n${blocks.join('\n')}` : ''
}

async function main() {
  if (!existsSync(DIST)) {
    console.error(`❌ finalize-sitemap: missing ${DIST}`)
    process.exit(1)
  }

  const imageMap = buildSpaImageMap()
  const { paths, nexusFromDist } = await collectPaths(imageMap)
  const today = new Date().toISOString().slice(0, 10)
  const blogCount = paths.filter((p) => p.startsWith('/blog/')).length

  let urlsWithImages = 0
  let imageEntries = 0

  const urlBlocks = []
  for (const p of paths) {
    const loc = p === '/' ? `${SITE_BASE}/` : `${SITE_BASE}${p}/`
    const imgs = imageMap.get(p) || []
    const imageXml = await renderImageBlocks(imgs)
    if (imageXml) {
      urlsWithImages++
      imageEntries += Math.min(imgs.length, MAX_IMAGES_PER_URL)
    }
    urlBlocks.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priorityFor(p)}</priority>${imageXml}
  </url>`)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks.join('\n')}
</urlset>
`

  await writeFile(join(DIST, 'sitemap.xml'), xml)
  await mkdir(join(ROOT, 'public'), { recursive: true })
  await writeFile(join(ROOT, 'public', 'sitemap.xml'), xml)
  await maybeRefreshSlugInventory(nexusFromDist)

  console.log(
    `✓ finalize-sitemap: ${paths.length} URLs → ${join(DIST, 'sitemap.xml')} ` +
      `(blogs=${blogCount}, nexusFromDist=${nexusFromDist.length}, ` +
      `urlsWithImages=${urlsWithImages}, imageEntries≈${imageEntries})`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
