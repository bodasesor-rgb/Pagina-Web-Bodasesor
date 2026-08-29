#!/usr/bin/env node
/**
 * Build src/data/blog-listing.json from Nexus /blog/articulos/ cards.
 * Powers the SPA /blog hub so new Hostinger blogs appear in the main Blog area
 * (not only under /blog/articulos/).
 *
 * Usage: node scripts/generate-blog-listing-from-nexus.mjs
 * Env: NEXUS_URL, SITE_BASE
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { headersFor } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'src', 'data', 'blog-listing.json')
const NEXUS = (process.env.NEXUS_URL || 'https://white-ferret-567834.hostingersite.com').replace(
  /\/$/,
  '',
)
const PROD = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const ORIGINS = [...new Set([NEXUS, PROD])]

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: headersFor(url), redirect: 'follow' })
    if (!res.ok) return null
    const text = await res.text()
    if (text.includes('id="root"') && /\/assets\/index-/.test(text)) return null
    if (text.includes('Access denied')) return null
    return text
  } catch {
    return null
  }
}

function parseSpanishDate(raw) {
  if (!raw) return ''
  const m = String(raw)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/i)
  if (!m) return ''
  const months = {
    enero: '01',
    febrero: '02',
    marzo: '03',
    abril: '04',
    mayo: '05',
    junio: '06',
    julio: '07',
    agosto: '08',
    septiembre: '09',
    octubre: '10',
    noviembre: '11',
    diciembre: '12',
  }
  const mm = months[m[2].toLowerCase()]
  if (!mm) return ''
  return `${m[3]}-${mm}-${m[1].padStart(2, '0')}`
}

function parseCards(html) {
  const posts = []
  const seen = new Set()
  const re =
    /<a[^>]+href="(?:https?:\/\/[^"]+)?\/blog\/([a-z0-9-]+)\/?"[^>]*class="[^"]*seo-blog-index-card-link[^"]*"[^>]*>([\s\S]*?)<\/a>/gi
  let match
  while ((match = re.exec(html))) {
    const slug = match[1].toLowerCase()
    if (slug === 'articulos' || seen.has(slug)) continue
    const block = match[2]
    const title =
      ((block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim() || slug
    const excerpt =
      ((block.match(/seo-blog-index-excerpt"[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    const category =
      ((block.match(/seo-blog-category"[^>]*>([\s\S]*?)<\/span>/i) || [])[1] || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim() || 'Blog'
    const meta =
      ((block.match(/seo-blog-index-meta"[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    const readTime = ((meta.match(/(\d+)\s*min/i) || [])[1] || '5') + ' min'
    const date = parseSpanishDate(meta) || new Date().toISOString().slice(0, 10)
    const img =
      ((block.match(/<img[^>]+src="([^"]+)"/i) || [])[1] || '').trim() ||
      `/blog/${slug}/${slug}.webp`
    const image = img.startsWith('http')
      ? img.replace(/^https?:\/\/[^/]+/, '')
      : img
    seen.add(slug)
    posts.push({
      slug,
      title,
      date,
      category,
      image,
      excerpt: excerpt || title,
      readTime,
      staticHtml: true,
      body: [
        `Lee el artículo completo en esta URL (HTML Nexus).`,
      ],
    })
  }
  return posts
}

async function main() {
  let html = null
  let source = ''
  for (const origin of ORIGINS) {
    html =
      (await fetchText(`${origin}/blog/articulos/`)) ||
      (await fetchText(`${origin}/blog/articulos`))
    if (html && html.includes('seo-blog-index-card')) {
      source = origin
      break
    }
  }
  if (!html) {
    console.error('❌ No se pudo leer /blog/articulos/ desde Nexus ni producción')
    process.exit(1)
  }

  const posts = parseCards(html)
  if (posts.length < 10) {
    console.error(`❌ Solo ${posts.length} cards parseadas (esperado ≥10)`)
    process.exit(1)
  }

  // Newest first
  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.slug.localeCompare(b.slug))

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(
    OUT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source,
        count: posts.length,
        posts,
      },
      null,
      2,
    ) + '\n',
  )
  console.log(`✓ blog-listing.json: ${posts.length} posts from ${source}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
