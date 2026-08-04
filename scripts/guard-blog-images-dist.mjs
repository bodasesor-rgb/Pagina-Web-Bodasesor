#!/usr/bin/env node
/**
 * Verificar que las imágenes de artículos de blog estén en dist/ tras el merge.
 *
 * Los posts estáticos referencian archivos hermanos:
 *   /blog/{slug}/{slug}.webp  (y a veces -inline-*.webp)
 * Algunos posts nuevos usan /images/blog/*.webp
 *
 * Sin estos archivos Netlify sirve el SPA (text/html) en la URL de la imagen.
 *
 * Usage: node scripts/guard-blog-images-dist.mjs
 * Env: MIN_BLOG_IMAGES=50
 *      ALLOW_SPA_ONLY_DEPLOY=1 — warn instead of fail
 */
import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST_ENV = process.env.DIST_DIR || 'dist'
const DIST = DIST_ENV.startsWith('/') ? DIST_ENV : join(ROOT, DIST_ENV)
const MIN_IMAGES = Number(process.env.MIN_BLOG_IMAGES || 50)
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'

async function walkImages(dir, found = []) {
  if (!existsSync(dir)) return found
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) {
        await walkImages(full, found)
      } else if (/\.(webp|jpg|jpeg|png|avif)$/i.test(e.name)) {
        try {
          const st = await stat(full)
          if (st.size > 200) found.push(full)
        } catch {
          /* skip */
        }
      }
    }
  } catch {
    /* skip directory */
  }
  return found
}

async function main() {
  const underBlog = await walkImages(join(DIST, 'blog'))
  const underImagesBlog = await walkImages(join(DIST, 'images', 'blog'))
  const underPublicImagesBlog = await walkImages(join(DIST, 'public', 'images', 'blog'))
  const images = [...underBlog, ...underImagesBlog, ...underPublicImagesBlog]

  console.log(
    `guard-blog-images-dist: ${images.length} imágenes reales ` +
      `(blog/=${underBlog.length}, images/blog/=${underImagesBlog.length}, ` +
      `public/images/blog/=${underPublicImagesBlog.length}; mín ${MIN_IMAGES})`,
  )

  if (images.length > 0) {
    console.log('  Ejemplos:')
    images.slice(0, 3).forEach((img) => {
      console.log(`    ✓ ${img.replace(ROOT, '.')}`)
    })
  }

  if (images.length < MIN_IMAGES) {
    const msg =
      `\n❌ Solo hay ${images.length} imágenes de blog en dist/ (esperado ≥${MIN_IMAGES}).\n` +
      `   Restaurar desde Nexus: node scripts/sync-blog-images-from-nexus.mjs\n` +
      `   Origen: NEXUS_URL (Hostinger) → public/blog/{slug}/*.webp\n`
    if (allowSpaOnly) {
      console.warn(`⚠ ALLOW_SPA_ONLY_DEPLOY=1 — ${msg}`)
    } else {
      console.error(msg)
      process.exit(1)
    }
  } else {
    console.log('✓ Imágenes de blog presentes en dist/')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
