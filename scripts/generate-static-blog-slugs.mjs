#!/usr/bin/env node
/**
 * Regenerate src/data/static-blog-slugs.js from durable blog inventory.
 * Sources: seo-seed/blog-slugs.txt + public/blog/{slug}/index.html
 *
 * Run before vite build so SPA never paints stubs over Nexus HTML.
 * Usage: node scripts/generate-static-blog-slugs.mjs
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'src', 'data', 'static-blog-slugs.js')
const SLUG_LIST = join(ROOT, 'seo-seed', 'blog-slugs.txt')
const PUBLIC_BLOG = join(ROOT, 'public', 'blog')
const LISTING = join(ROOT, 'src', 'data', 'blog-listing.json')

function loadTxtSlugs() {
  if (!existsSync(SLUG_LIST)) return []
  return readFileSync(SLUG_LIST, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function loadPublicSlugs() {
  if (!existsSync(PUBLIC_BLOG)) return []
  return readdirSync(PUBLIC_BLOG, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(PUBLIC_BLOG, e.name, 'index.html')))
    .map((e) => e.name)
}

function loadListingSlugs() {
  if (!existsSync(LISTING)) return []
  try {
    const data = JSON.parse(readFileSync(LISTING, 'utf8'))
    return (data.posts || []).map((p) => p.slug).filter(Boolean)
  } catch {
    return []
  }
}

const slugs = [...new Set([...loadTxtSlugs(), ...loadPublicSlugs(), ...loadListingSlugs()])].sort()

const body = `/** Auto-generated — do not edit by hand. Run: node scripts/generate-static-blog-slugs.mjs */
export const STATIC_BLOG_SLUGS = new Set([
${slugs.map((s) => `  '${s.replace(/'/g, "\\'")}',`).join('\n')}
])

export function hasStaticBlogHtml(slug) {
  if (!slug) return false
  return STATIC_BLOG_SLUGS.has(String(slug).replace(/^\\/+|\\/+$/g, ''))
}
`

writeFileSync(OUT, body, 'utf8')
console.log(`✓ static-blog-slugs.js (${slugs.length} slugs)`)
