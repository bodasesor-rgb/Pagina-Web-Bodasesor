#!/usr/bin/env node
/**
 * Fail build if static blogs were wiped from dist/ (same idea as guard-nexus-dist).
 * Usage: node scripts/guard-blogs-dist.mjs
 */
import { readdir, readFile, access } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')
const MIN_BLOGS = Number(process.env.MIN_BLOG_PAGES || 50)

function isSpaShell(html) {
  return html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)
}

function isRichBlog(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  return html.length >= 20_000
}

async function walkBlogIndexes(dir, found = []) {
  if (!existsSync(dir)) return found
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await walkBlogIndexes(full, found)
    else if (e.name === 'index.html') found.push(full)
  }
  return found
}

async function main() {
  const files = await walkBlogIndexes(join(DIST, 'blog'))
  let rich = 0
  for (const f of files) {
    try {
      await access(f)
      const html = await readFile(f, 'utf8')
      if (isRichBlog(html)) rich++
    } catch {
      /* skip */
    }
  }

  console.log(`guard-blogs-dist: rich_static_blogs=${rich} (min ${MIN_BLOGS}), total_blog_indexes=${files.length}`)
  if (rich < MIN_BLOGS) {
    console.error(
      `❌ dist/blog/ solo tiene ${rich} artículos estáticos ricos — el deploy SPA los habría borrado.\n` +
        '   Corre: node scripts/sync-blogs-from-live.mjs && npm run build:nexus',
    )
    process.exit(1)
  }
  console.log('✓ Blogs estáticos preservados en dist/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
