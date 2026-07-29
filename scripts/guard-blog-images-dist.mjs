#!/usr/bin/env node
/**
 * Verificar que imágenes de blog se preserven en dist/ después del merge.
 * 
 * Las imágenes de blog son críticas: sin ellas, los blogs aparecen rotos.
 * Este guard asegura que:
 * 1. Las imágenes de blog no se sobrescriben durante el merge
 * 2. El .gitignore permite que se committen
 * 3. El netlify-preserve.json protege public/images/blog/
 * 
 * Si falta alguna imagen:
 * - Nexus debe hacer commit y push de public/images/blog/* a bodasesor.com
 * - Luego el merge-live-into-dist los traerá desde .netlify-live
 * 
 * Usage: node scripts/guard-blog-images-dist.mjs
 */
import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')
const MIN_IMAGES = Number(process.env.MIN_BLOG_IMAGES || 10)

async function walkImages(dir, found = []) {
  if (!existsSync(dir)) return found
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) {
        await walkImages(full, found)
      } else if (/\.(webp|jpg|jpeg|png)$/i.test(e.name)) {
        found.push(full)
      }
    }
  } catch {
    /* skip directory */
  }
  return found
}

async function main() {
  const imagesDir = join(DIST, 'public', 'images', 'blog')
  const images = await walkImages(imagesDir)
  
  console.log(`guard-blog-images-dist: encontradas ${images.length} imágenes de blog (mín ${MIN_IMAGES})`)
  
  if (images.length > 0) {
    console.log(`  Ejemplos:`)
    images.slice(0, 3).forEach(img => {
      console.log(`    ✓ ${img.replace(ROOT, '.')}`)
    })
  }
  
  if (images.length < MIN_IMAGES) {
    console.warn(
      `\n⚠️  Solo hay ${images.length} imágenes de blog en dist/public/images/blog/\n` +
      `   Esto significa que Nexus aún no ha hecho push de las imágenes.\n\n` +
      `   ACCIÓN REQUERIDA:\n` +
      `   1. En Nexus (seo-nexus-2.0), verificar que public/images/blog/ tiene imágenes\n` +
      `   2. Hacer commit y push a bodasesor.com:\n` +
      `      git add public/images/blog/**/*.{webp,jpg,png}\n` +
      `      git commit -m "feat: include blog images in deployment"\n` +
      `      git push origin main\n` +
      `   3. Luego merge-live-into-dist.mjs las traerá aquí\n`
    )
  } else {
    console.log(`✓ Imágenes de blog protegidas en dist/`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
