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
const MAX_EDGE = 1200
const MOBILE_EDGE = 480
const WEBP_QUALITY = 68
const MOBILE_WEBP_QUALITY = 64
/** Force regenerate when existing WebP is still too heavy for cards. */
const MAX_WEBP_BYTES = 150 * 1024
const MAX_MOBILE_WEBP_BYTES = 55 * 1024
/** Smaller caps for grids / galleries that never need full resolution. */
const FOLDER_MAX_EDGE = {
  instagram: 800,
  galeria: 800,
}

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

async function needsConversion(src, dest, destSm) {
  try {
    const [srcStat, destStat, smStat] = await Promise.all([
      stat(src),
      stat(dest),
      stat(destSm),
    ])
    if (srcStat.mtimeMs > destStat.mtimeMs || srcStat.mtimeMs > smStat.mtimeMs) return true
    if (destStat.size > MAX_WEBP_BYTES && srcStat.size > destStat.size) return true
    if (smStat.size > MAX_MOBILE_WEBP_BYTES) return true
    return false
  } catch {
    return true
  }
}

function maxEdgeFor(src) {
  const rel = src.slice(IMAGE_ROOT.length + 1).replace(/\\/g, '/')
  for (const [folder, edge] of Object.entries(FOLDER_MAX_EDGE)) {
    if (rel.startsWith(`${folder}/`)) return edge
  }
  return MAX_EDGE
}

async function convertOne(src) {
  const dest = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const destSm = dest.replace(/\.webp$/i, '-sm.webp')
  if (!(await needsConversion(src, dest, destSm))) return 'skip'

  try {
    await unlink(dest)
  } catch {
    /* no prior webp */
  }
  try {
    await unlink(destSm)
  } catch {
    /* no prior sm webp */
  }

  const edge = maxEdgeFor(src)
  await sharp(src)
    .rotate()
    .resize({
      width: edge,
      height: edge,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(dest)

  await sharp(src)
    .rotate()
    .resize({
      width: MOBILE_EDGE,
      height: MOBILE_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: MOBILE_WEBP_QUALITY, effort: 4 })
    .toFile(destSm)
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
