#!/usr/bin/env node
/**
 * Ensure .netlify-live/blog/ has rich static articles from the durable repo seed.
 *
 * Breaks the chicken-egg where production is already SPA-wiped and sync cannot
 * rediscover Shopify/legacy blogs (they are absent from the SPA sitemap).
 *
 * Seed: seo-seed/netlify-blog-seed.tgz  (+ seo-seed/blog-slugs.txt)
 *
 * Rules:
 * - Never delete existing rich blog HTML
 * - Never overwrite a rich file with a thinner/SPA one from the seed
 * - Extract seed when rich count < MIN_BLOG_PAGES
 *
 * Usage: node scripts/ensure-blog-seed.mjs
 * Env: MIN_BLOG_PAGES=50
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { mkdir, readFile, writeFile, readdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE = join(ROOT, '.netlify-live')
const BLOG_DIR = join(LIVE, 'blog')
const SEED_TGZ = join(ROOT, 'seo-seed', 'netlify-blog-seed.tgz')
const MIN_BLOGS = Number(process.env.MIN_BLOG_PAGES || 50)

function isSpaShell(html) {
  if (!html) return true
  if (html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)) return true
  if (html.includes('Access denied')) return true
  return false
}

function isRichBlog(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  return html.length >= 20_000
}

async function walkIndexes(dir, found = []) {
  if (!existsSync(dir)) return found
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await walkIndexes(full, found)
    else if (e.name === 'index.html') found.push(full)
  }
  return found
}

async function countRich(dir) {
  const files = await walkIndexes(dir)
  let rich = 0
  for (const f of files) {
    try {
      const html = await readFile(f, 'utf8')
      if (isRichBlog(html)) rich++
    } catch {
      /* skip */
    }
  }
  return { rich, total: files.length }
}

/**
 * Extract seed into a temp dir, then copy each rich index into LIVE without
 * clobbering richer existing files.
 */
async function mergeSeedIntoLive() {
  if (!existsSync(SEED_TGZ)) {
    throw new Error(`Falta seed de blogs: ${SEED_TGZ}`)
  }
  const tmp = join(ROOT, '.tmp-blog-seed')
  execSync(`rm -rf "${tmp}" && mkdir -p "${tmp}"`, { stdio: 'inherit' })
  execSync(`tar -xzf "${SEED_TGZ}" -C "${tmp}"`, { stdio: 'inherit' })
  const seedBlog = join(tmp, 'blog')
  if (!existsSync(seedBlog)) {
    throw new Error('Seed tarball no contiene carpeta blog/')
  }

  await mkdir(BLOG_DIR, { recursive: true })
  const seedFiles = await walkIndexes(seedBlog)
  let written = 0
  let kept = 0
  let skippedThin = 0

  for (const seedFile of seedFiles) {
    const rel = seedFile.slice(seedBlog.length + 1) // e.g. slug/index.html
    const dest = join(BLOG_DIR, rel)
    const seedHtml = await readFile(seedFile, 'utf8')
    if (!isRichBlog(seedHtml)) {
      skippedThin++
      continue
    }

    if (existsSync(dest)) {
      const existing = await readFile(dest, 'utf8')
      if (isRichBlog(existing) && existing.length >= seedHtml.length * 0.9) {
        kept++
        continue
      }
      // Existing is SPA/thin — replace with seed
    }

    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, seedHtml)
    written++
  }

  execSync(`rm -rf "${tmp}"`, { stdio: 'inherit' })
  return { written, kept, skippedThin, seedFiles: seedFiles.length }
}

async function main() {
  console.log('ensure-blog-seed: durable static blogs → .netlify-live/blog/')
  await mkdir(LIVE, { recursive: true })

  const before = await countRich(BLOG_DIR)
  console.log(`  before: rich=${before.rich} total_indexes=${before.total}`)

  if (before.rich >= MIN_BLOGS) {
    console.log(`✓ Ya hay ≥${MIN_BLOGS} blogs ricos — seed no necesario`)
    return
  }

  if (!existsSync(SEED_TGZ)) {
    console.error(`❌ Solo ${before.rich} blogs ricos y no existe ${SEED_TGZ}`)
    process.exit(1)
  }

  console.log(`  rich < ${MIN_BLOGS} → extrayendo ${SEED_TGZ}`)
  const result = await mergeSeedIntoLive()
  const after = await countRich(BLOG_DIR)
  console.log(
    `  seed merge: written=${result.written}, kept=${result.kept}, seedFiles=${result.seedFiles}`,
  )
  console.log(`  after: rich=${after.rich} total_indexes=${after.total}`)

  const manifest = {
    ensuredAt: new Date().toISOString(),
    before,
    after,
    result,
    min: MIN_BLOGS,
  }
  await writeFile(join(LIVE, '.blogs-seed-manifest.json'), JSON.stringify(manifest, null, 2))

  if (after.rich < MIN_BLOGS) {
    console.error(`❌ Tras seed solo hay ${after.rich} blogs ricos (min ${MIN_BLOGS})`)
    process.exit(1)
  }
  console.log('✓ Blog seed aplicado — artículos estáticos listos para merge')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
