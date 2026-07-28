#!/usr/bin/env node
/**
 * Generate WebP siblings for catalog images (PNG/JPG → .webp).
 * Resizes oversized sources so product grids are not multi‑MB downloads.
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const IMAGE_ROOT = join(ROOT, 'public', 'images')
const EXT = new Set(['.png', '.jpg', '.jpeg'])
const MAX_EDGE = 1400
const WEBP_QUALITY = 72
/** Force regenerate when existing WebP is still too heavy for cards. */
const MAX_WEBP_BYTES = 180 * 1024

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
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
    if (srcStat.mtimeMs > destStat.mtimeMs) return true
    if (destStat.size > MAX_WEBP_BYTES && srcStat.size > destStat.size) return true
    return false
  } catch {
    return true
  }
}

async function convertOne(src) {
  const dest = src.replace(/\.(png|jpe?g)$/i, '.webp')
  if (!(await needsConversion(src, dest))) return 'skip'

  try {
    await unlink(dest)
  } catch {
    /* no prior webp */
  }

  await sharp(src)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
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
  console.log(
    `WebP: ${converted} generated, ${skipped} up-to-date (${files.length} sources, max ${MAX_EDGE}px q=${WEBP_QUALITY})`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
