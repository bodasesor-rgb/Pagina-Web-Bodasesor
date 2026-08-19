#!/usr/bin/env node
/**
 * Finalize sitemap.xml AFTER Nexus merge so Google sees:
 * - SPA routes
 * - All Nexus landings actually present in dist/ (including NEW ones not yet in
 *   scripts/seo-landing-slugs.json)
 * - Static blog article URLs
 *
 * Writes dist/sitemap.xml (and public/sitemap.xml for local inspection).
 *
 * Usage: node scripts/finalize-sitemap.mjs
 * Env: SITE_BASE=https://bodasesor.com  DIST_DIR=dist
 */
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectSpaSeoPathsForSitemap } from './collect-spa-seo-entries.mjs'
import { isNexusLandingHtml, isSpaShellHtml } from './lib/nexus-html.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const DIST_ENV = process.env.DIST_DIR || 'dist'
const DIST = DIST_ENV.startsWith('/') ? DIST_ENV : join(ROOT, DIST_ENV)

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
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

async function collectPaths() {
  const paths = new Set(['/'])
  const nexusFromDist = new Set()

  for (const p of collectSpaSeoPathsForSitemap()) {
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
            paths.add(urlPath.replace(/\/$/, '') || '/')
          }
          continue
        }
        if (urlPath === '/') {
          paths.add('/')
          continue
        }
        if (isNexusLanding(html)) {
          const clean = (urlPath.replace(/\/$/, '') || '/').replace(/^\//, '')
          paths.add(`/${clean}`)
          nexusFromDist.add(clean)
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

async function main() {
  if (!existsSync(DIST)) {
    console.error(`❌ finalize-sitemap: missing ${DIST}`)
    process.exit(1)
  }

  const { paths, nexusFromDist } = await collectPaths()
  const today = new Date().toISOString().slice(0, 10)
  const blogCount = paths.filter((p) => p.startsWith('/blog/')).length

  const body = paths
    .map((p) => {
      const loc = p === '/' ? `${SITE_BASE}/` : `${SITE_BASE}${p}/`
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

  await writeFile(join(DIST, 'sitemap.xml'), xml)
  await mkdir(join(ROOT, 'public'), { recursive: true })
  await writeFile(join(ROOT, 'public', 'sitemap.xml'), xml)
  await maybeRefreshSlugInventory(nexusFromDist)

  console.log(
    `✓ finalize-sitemap: ${paths.length} URLs → ${join(DIST, 'sitemap.xml')} ` +
      `(blogs=${blogCount}, nexusFromDist=${nexusFromDist.length})`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
