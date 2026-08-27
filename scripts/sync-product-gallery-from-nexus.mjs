#!/usr/bin/env node
/**
 * Sync product gallery images from Seo-Nexus (Hostinger) into this SPA.
 *
 * Nexus stores up to 3 images per PRINCIPAL service key (not per satellite).
 * Satellites inherit the same set via src/data/product-gallery-key-map.js.
 *
 * Writes:
 *   public/images/galeria-productos/{key}/{1|2|3}.webp
 *   src/data/product-gallery.json
 *
 * Source (public):
 *   {NEXUS_URL}/media/productos/manifest.json
 *   fallback: {NEXUS_URL}/api/nexus/product-gallery
 *
 * Env:
 *   NEXUS_URL=https://white-ferret-567834.hostingersite.com
 *   PRODUCT_GALLERY_SYNC_STRICT=1  — fail if manifesto unreachable
 *   ALLOW_SPA_ONLY_DEPLOY=1        — never fail (warn only)
 *
 * Usage: node scripts/sync-product-gallery-from-nexus.mjs
 */
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { headersFor } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'galeria-productos')
const OUT_JSON = join(ROOT, 'src', 'data', 'product-gallery.json')
const DEFAULT_NEXUS = 'https://white-ferret-567834.hostingersite.com'
const NEXUS = (process.env.NEXUS_URL || DEFAULT_NEXUS).replace(/\/$/, '')
const STRICT =
  process.env.PRODUCT_GALLERY_SYNC_STRICT === '1' &&
  process.env.ALLOW_SPA_ONLY_DEPLOY !== '1'
const MAX_IMAGES = 3
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 6)

function emptyDoc(extra = {}) {
  return {
    version: 1,
    updatedAt: null,
    syncedAt: new Date().toISOString(),
    source: 'seo-nexus',
    purpose: 'product-gallery-for-pagina-web',
    nexusUrl: NEXUS,
    items: [],
    byKey: {},
    ...extra,
  }
}

function loadExistingJson() {
  if (!existsSync(OUT_JSON)) return null
  try {
    return JSON.parse(readFileSync(OUT_JSON, 'utf8'))
  } catch {
    return null
  }
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: headersFor(url, { accept: 'application/json,text/plain,*/*;q=0.8' }, 'asset'),
    redirect: 'follow',
  })
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} for ${url}`)
    err.status = res.status
    throw err
  }
  return res.text()
}

async function fetchBinary(url) {
  const res = await fetch(url, {
    headers: headersFor(url, { accept: 'image/webp,image/*,*/*;q=0.8' }, 'asset'),
    redirect: 'follow',
  })
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} for ${url}`)
    err.status = res.status
    throw err
  }
  const buf = Buffer.from(await res.arrayBuffer())
  const ctype = (res.headers.get('content-type') || '').toLowerCase()
  if (ctype.includes('text/html')) {
    throw new Error(`Got HTML instead of image for ${url}`)
  }
  if (buf.length < 64) {
    throw new Error(`Image too small (${buf.length}b) for ${url}`)
  }
  return buf
}

async function loadManifest() {
  const candidates = [
    `${NEXUS}/media/productos/manifest.json`,
    `${NEXUS}/api/nexus/product-gallery`,
  ]
  let lastErr
  for (const url of candidates) {
    try {
      const text = await fetchText(url)
      const data = JSON.parse(text)
      if (!data || typeof data !== 'object') throw new Error('invalid JSON')
      const items = Array.isArray(data.items) ? data.items : []
      console.log(`  manifesto OK (${items.length} items) ← ${url}`)
      return { data, url, items }
    } catch (e) {
      lastErr = e
      console.warn(`  manifesto falló ${url}: ${e.message}`)
    }
  }
  throw lastErr || new Error('No manifesto reachable')
}

function normalizeItem(raw) {
  const key = String(raw?.key || raw?.slug || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (!key) return null
  const servicio = String(raw?.servicio || raw?.service || raw?.name || key).trim()
  const imagesRaw = Array.isArray(raw?.images) ? raw.images : []
  const images = []
  for (const img of imagesRaw) {
    if (images.length >= MAX_IMAGES) break
    const slot = Number(img?.slot) || images.length + 1
    const url = String(img?.url || '').trim()
    const path = String(img?.path || '').trim()
    const alt = String(img?.alt || `${servicio} — foto ${slot}`).trim()
    let absolute = url
    if (!absolute && path) {
      absolute = path.startsWith('http')
        ? path
        : `${NEXUS}${path.startsWith('/') ? '' : '/'}${path}`
    }
    if (!absolute) continue
    images.push({ slot, url: absolute, alt })
  }
  images.sort((a, b) => a.slot - b.slot)
  return { key, servicio, images: images.slice(0, MAX_IMAGES) }
}

async function mapPool(items, limit, fn) {
  const results = []
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  const n = Math.min(limit, Math.max(items.length, 1))
  await Promise.all(Array.from({ length: n }, () => worker()))
  return results
}

async function syncItem(item) {
  const dir = join(OUT_DIR, item.key)
  await mkdir(dir, { recursive: true })
  const localImages = []
  for (const img of item.images) {
    const slot = Math.min(MAX_IMAGES, Math.max(1, Number(img.slot) || localImages.length + 1))
    const localName = `${slot}.webp`
    const localPath = `/images/galeria-productos/${item.key}/${localName}`
    const abs = join(dir, localName)
    try {
      const buf = await fetchBinary(img.url)
      await writeFile(abs, buf)
      localImages.push({
        slot,
        localPath,
        alt: img.alt,
        sourceUrl: img.url,
        bytes: buf.length,
      })
      console.log(`    ✓ ${item.key}/${localName} (${buf.length} bytes)`)
    } catch (e) {
      console.warn(`    ✗ ${item.key} slot ${slot}: ${e.message}`)
    }
  }
  return {
    key: item.key,
    servicio: item.servicio,
    images: localImages,
  }
}

async function writeStub(extra = {}) {
  await mkdir(dirname(OUT_JSON), { recursive: true })
  await writeFile(OUT_JSON, `${JSON.stringify(emptyDoc(extra), null, 2)}\n`, 'utf8')
}

async function main() {
  console.log('══ sync-product-gallery-from-nexus ══')
  console.log(` NEXUS_URL=${NEXUS}`)
  console.log(` OUT=${OUT_DIR}`)

  let items = []
  let updatedAt = null
  let manifestUrl = null

  try {
    const loaded = await loadManifest()
    manifestUrl = loaded.url
    updatedAt = loaded.data.updatedAt || loaded.data.updated_at || null
    items = loaded.items.map(normalizeItem).filter(Boolean)
  } catch (e) {
    const existing = loadExistingJson()
    console.warn(`⚠ No se pudo leer el manifesto Nexus: ${e.message}`)
    if (existing?.items?.length) {
      console.warn('  Conservando product-gallery.json existente (fallback).')
      if (STRICT) process.exit(1)
      return
    }
    await writeStub({ warning: e.message })
    if (STRICT) {
      console.error('❌ PRODUCT_GALLERY_SYNC_STRICT=1 — abortando.')
      process.exit(1)
    }
    console.warn('  Continuando con galería vacía (SPA usa fallbacks estáticos).')
    return
  }

  for (const item of items) {
    const dir = join(OUT_DIR, item.key)
    if (existsSync(dir)) await rm(dir, { recursive: true, force: true })
  }
  await mkdir(OUT_DIR, { recursive: true })

  const synced = (await mapPool(items, CONCURRENCY, syncItem)).filter(
    (x) => x && x.images && x.images.length > 0,
  )

  const byKey = {}
  for (const row of synced) {
    byKey[row.key] = {
      servicio: row.servicio,
      images: row.images.map(({ slot, localPath, alt }) => ({ slot, localPath, alt })),
    }
  }

  const doc = {
    version: 1,
    updatedAt,
    syncedAt: new Date().toISOString(),
    source: 'seo-nexus',
    purpose: 'product-gallery-for-pagina-web',
    nexusUrl: NEXUS,
    manifestUrl,
    items: synced.map((row) => ({
      key: row.key,
      servicio: row.servicio,
      images: row.images.map(({ slot, localPath, alt }) => ({ slot, localPath, alt })),
    })),
    byKey,
  }

  await writeFile(OUT_JSON, `${JSON.stringify(doc, null, 2)}\n`, 'utf8')
  console.log(`✓ Galería Nexus: ${synced.length} keys con imágenes → src/data/product-gallery.json`)
}

main().catch((e) => {
  console.error('sync-product-gallery-from-nexus failed:', e)
  if (STRICT) process.exit(1)
  console.warn('Continuando sin galería Nexus (fallback SPA).')
  process.exit(0)
})
