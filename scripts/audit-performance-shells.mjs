#!/usr/bin/env node
/**
 * Gate: prerendered SPA shells must include static LCP hero for product/service pages.
 * Fails build if shells with hero images lack spa-lcp-prerender + preload.
 */
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectSpaSeoEntries } from './collect-spa-seo-entries.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')
const MIN_WITH_IMAGE = Number(process.env.MIN_LCP_SHELLS || 200)

async function walkIndexHtml(dir, base = dir, found = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walkIndexHtml(full, base, found)
    else if (entry.name === 'index.html') found.push(full)
  }
  return found
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('❌ dist/index.html missing')
    process.exit(1)
  }

  const entries = collectSpaSeoEntries()
  const withImage = [...entries.values()].filter((e) => e.image && e.h1)
  const indexes = await walkIndexHtml(DIST)

  let shellsOk = 0
  const missing = []

  for (const e of withImage) {
    const rel = e.path.replace(/^\//, '') + '/index.html'
    const abs = join(DIST, rel)
    if (!existsSync(abs)) continue
    const html = await readFile(abs, 'utf8')
    const hasShell = html.includes('id="spa-lcp-prerender"')
    const hasPreload = html.includes('rel="preload"') && html.includes('-sm.webp')
    if (hasShell && hasPreload) shellsOk++
    else missing.push(e.path)
  }

  const issues = []
  if (shellsOk < MIN_WITH_IMAGE) {
    issues.push(`Only ${shellsOk} LCP shells (need ≥${MIN_WITH_IMAGE})`)
    for (const p of missing.slice(0, 15)) issues.push(`  missing shell: ${p}`)
    if (missing.length > 15) issues.push(`  … and ${missing.length - 15} more`)
  }

  if (issues.length) {
    console.error('❌ audit-performance-shells failed:\n' + issues.join('\n'))
    process.exit(1)
  }

  console.log(
    `✓ Performance shells OK — ${shellsOk} pages with static LCP hero (${indexes.length} index.html in dist)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
