#!/usr/bin/env node
/**
 * Generate WebP siblings for catalog images (PNG/JPG → .webp).
 * Skips files that already have a newer or equal WebP.
 */
import { readdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const IMAGE_ROOT = join(ROOT, 'public', 'images')
const EXT = new Set(['.png', '.jpg', '.jpeg'])
const SKIP_DIRS = new Set(['instagram'])

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      await walk(full, files)
    } else if (EXT.has(extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function needsConversion(src, dest) {
  try {
    const [srcStat, destStat] = await Promise.all([stat(src), stat(dest)])
    return srcStat.mtimeMs > destStat.mtimeMs
  } catch {
    return true
  }
}

async function convertOne(src) {
  const dest = src.replace(/\.(png|jpe?g)$/i, '.webp')
  if (!(await needsConversion(src, dest))) return 'skip'

  await sharp(src)
    .webp({ quality: 82, effort: 4 })
    .toFile(dest)
  return 'ok'
}

async function main() {
  const files = await walk(IMAGE_ROOT)
  let converted = 0
  let skipped = 0
  for (const file of files) {
    const result = await convertOne(file)
    if (result === 'ok') converted++
    else skipped++
  }
  console.log(`WebP: ${converted} generated, ${skipped} up-to-date (${files.length} sources)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
