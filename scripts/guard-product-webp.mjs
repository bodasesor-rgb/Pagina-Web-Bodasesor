#!/usr/bin/env node
/**
 * Gate: every catalog raster in public/images must have a WebP sibling after generate:webp.
 * Fails the build if sharp did not run or coverage is too low.
 */
import { readdir, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const IMAGE_ROOT = join(ROOT, 'public', 'images')
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])
const MIN_COVERAGE = Number(process.env.MIN_WEBP_COVERAGE || 0.98)
const HERO_CHECKS = [
  { label: 'banquete-hero', raster: 'banquete-hero.png' },
  { label: 'banquete-mexicano-hero', raster: 'banquete-mexicano-hero.png' },
  { label: 'hero-bg-new', raster: 'hero-bg-new.webp' },
]

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full, files)
    } else if (RASTER_EXT.has(extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  const sources = await walk(IMAGE_ROOT)
  const missing = []
  const heavy = []

  for (const src of sources) {
    const webp = src.replace(/\.(png|jpe?g)$/i, '.webp')
    try {
      await stat(webp)
    } catch {
      missing.push(src.slice(IMAGE_ROOT.length + 1).replace(/\\/g, '/'))
      continue
    }
    const webpStat = await stat(webp)
    if (webpStat.size > 250 * 1024) {
      heavy.push({
        path: webp.slice(IMAGE_ROOT.length + 1).replace(/\\/g, '/'),
        kb: Math.round(webpStat.size / 1024),
      })
    }
  }

  const coverage = sources.length ? (sources.length - missing.length) / sources.length : 1
  const issues = []

  if (sources.length === 0) {
    issues.push('No raster images found under public/images/')
  }
  if (coverage < MIN_COVERAGE) {
    issues.push(
      `WebP coverage ${(coverage * 100).toFixed(1)}% < ${(MIN_COVERAGE * 100).toFixed(0)}% (${missing.length} missing of ${sources.length})`,
    )
    for (const m of missing.slice(0, 12)) issues.push(`  missing: ${m}`)
    if (missing.length > 12) issues.push(`  … and ${missing.length - 12} more`)
  }

  for (const hero of HERO_CHECKS) {
    const webpPath = hero.raster.replace(/\.(png|jpe?g)$/i, '.webp')
    const full = join(IMAGE_ROOT, webpPath.endsWith('.webp') ? webpPath : hero.raster)
    try {
      const s = await stat(full)
      if (s.size > 220 * 1024) {
        issues.push(`Hero WebP still heavy: ${hero.label} (${Math.round(s.size / 1024)} KiB)`)
      }
    } catch {
      issues.push(`Missing hero WebP: ${hero.label}`)
    }
  }

  if (heavy.length > 0) {
    issues.push(`${heavy.length} WebP files still > 250 KiB (re-run generate:webp)`)
    for (const h of heavy.slice(0, 5)) issues.push(`  heavy: ${h.path} (${h.kb} KiB)`)
  }

  if (issues.length) {
    console.error('❌ guard-product-webp failed:\n' + issues.join('\n'))
    process.exit(1)
  }

  console.log(
    `✓ WebP guard OK — ${sources.length} sources, ${(coverage * 100).toFixed(1)}% with siblings`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
