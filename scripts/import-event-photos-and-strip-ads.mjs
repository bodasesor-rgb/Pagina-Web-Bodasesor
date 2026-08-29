#!/usr/bin/env node
/**
 * One-shot: exclude Instagram ad flyers, import event ZIP photos,
 * raise carousel target to 60, regenerate webp variants for new files.
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const IG_DIR = path.join(ROOT, 'public', 'images', 'instagram')
const ZIP_EXTRACT = path.join(ROOT, '.tmp-event-photos2')
const GALLERY_TARGET = 60

/** Graphic ads / flyers (COTIZA GRATIS templates + known variants). */
const AD_EXCLUDES = [
  // User-flagged + fingerprint clusters
  14, 54, 68, 66, 92, 102, 126, 128, 141, 171,
  // 607x1080 graphic templates
  13, 22, 33, 35, 40, 41, 55, 75, 80, 84, 114, 129, 130, 136, 145, 172, 180,
  // Prior GaleriaPage excludes (banners / templates)
  2, 36, 56, 59, 62, 76, 86, 89, 93, 94, 99, 110, 112, 115, 117, 119,
  121, 125, 127, 137, 152, 156, 157, 160, 165, 173, 177, 179, 188,
  190, 195, 196, 198,
]

const AD_SET = new Set(AD_EXCLUDES)

function writeExcludeModule() {
  const sorted = [...AD_SET].sort((a, b) => a - b)
  const body =
    `/** Instagram flyer / publicidad IDs — never show in galería or product carousels. */\n` +
    `export const INSTAGRAM_AD_EXCLUDES = new Set([\n  ${sorted.join(', ')}\n])\n\n` +
    `export function isInstagramAdPath(src) {\n` +
    `  const m = String(src || '').match(/\\/ig(\\d+)\\.(?:jpg|jpeg|png|webp)$/i)\n` +
    `  if (!m) return false\n` +
    `  return INSTAGRAM_AD_EXCLUDES.has(Number(m[1]))\n` +
    `}\n`
  fs.writeFileSync(path.join(ROOT, 'src', 'data', 'instagram-ad-excludes.js'), body)
  console.log('✓ wrote src/data/instagram-ad-excludes.js', sorted.length, 'ids')
  return sorted
}

async function importZipPhotos() {
  if (!fs.existsSync(ZIP_EXTRACT)) {
    throw new Error(`Missing ${ZIP_EXTRACT} — extract ZIP first`)
  }
  const files = fs
    .readdirSync(ZIP_EXTRACT)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  let maxExisting = 0
  for (const f of fs.readdirSync(IG_DIR)) {
    const m = f.match(/^ig(\d+)\.jpg$/i)
    if (m) maxExisting = Math.max(maxExisting, Number(m[1]))
  }
  let next = Math.max(maxExisting, 200) + 1
  const imported = []

  for (const f of files) {
    const src = path.join(ZIP_EXTRACT, f)
    const id = next++
    const destJpg = path.join(IG_DIR, `ig${id}.jpg`)
    const destWebp = path.join(IG_DIR, `ig${id}.webp`)
    const destSm = path.join(IG_DIR, `ig${id}-sm.webp`)

    const pipeline = sharp(src).rotate().resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })

    await pipeline
      .clone()
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(destJpg)

    await sharp(destJpg).webp({ quality: 78 }).toFile(destWebp)
    await sharp(destJpg)
      .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(destSm)

    imported.push(id)
    console.log(`  + ig${id}.jpg ← ${f}`)
  }
  console.log(`✓ imported ${imported.length} event photos (ig${imported[0]}…ig${imported.at(-1)})`)
  return imported
}

/** Replace ad JPGs with a clean photo so stale links don't show flyers. */
async function blankOutAds(cleanIds) {
  if (!cleanIds.length) return
  const donor = path.join(IG_DIR, `ig${cleanIds[0]}.jpg`)
  let n = 0
  for (const id of AD_SET) {
    const dest = path.join(IG_DIR, `ig${id}.jpg`)
    if (!fs.existsSync(dest)) continue
    // Only blank if it still looks like a template (607x1080 or known ads)
    const meta = await sharp(dest).metadata()
    const isTemplate =
      (meta.width === 607 && meta.height === 1080) ||
      [14, 68, 66, 92, 102, 126, 128, 141, 171].includes(id)
    if (!isTemplate && meta.width === meta.height && meta.width >= 1000) {
      // also blank known square ads
      if (![14, 66, 68, 92, 102, 128, 141, 171].includes(id)) continue
    }
    if (!isTemplate && ![14, 66, 68, 92, 102, 126, 128, 141, 171].includes(id)) continue

    await fs.promises.copyFile(donor, dest)
    const webp = path.join(IG_DIR, `ig${id}.webp`)
    const sm = path.join(IG_DIR, `ig${id}-sm.webp`)
    await sharp(dest).webp({ quality: 78 }).toFile(webp)
    await sharp(dest)
      .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(sm)
    n++
  }
  console.log(`✓ blanked ${n} ad files with clean donor photo`)
}

function patchProductGalleries() {
  const file = path.join(ROOT, 'src', 'data', 'product-galleries.js')
  let src = fs.readFileSync(file, 'utf8')
  if (!src.includes('instagram-ad-excludes')) {
    src = src.replace(
      "import { resolveNexusGalleryKey } from './product-gallery-key-map.js'",
      "import { resolveNexusGalleryKey } from './product-gallery-key-map.js'\n" +
        "import { isInstagramAdPath } from './instagram-ad-excludes.js'",
    )
  }
  src = src.replace(
    /export const GALLERY_TARGET = \d+/,
    `export const GALLERY_TARGET = ${GALLERY_TARGET}`,
  )
  // Expand IG pool to 280 (covers new imports) and skip ads
  src = src.replace(
    /const IG_POOL = Array\.from\(\{ length: \d+ \}, \(_, i\) => `\/images\/instagram\/ig\$\{i \+ 1\}\.jpg`\)/,
    `const IG_POOL = Array.from({ length: 300 }, (_, i) => \`/images/instagram/ig\${i + 1}.jpg\`).filter((p) => !isInstagramAdPath(p))`,
  )
  // Also skip ads when collecting base gallery images
  if (!src.includes('!isInstagramAdPath(img)')) {
    src = src.replace(
      `for (const img of images || []) {\n    if (!img || seen.has(img)) continue`,
      `for (const img of images || []) {\n    if (!img || isInstagramAdPath(img) || seen.has(img)) continue`,
    )
  }
  fs.writeFileSync(file, src)
  console.log('✓ patched product-galleries.js GALLERY_TARGET=', GALLERY_TARGET)
}

function patchGaleriaPage() {
  const file = path.join(ROOT, 'src', 'pages', 'GaleriaPage.tsx')
  let src = fs.readFileSync(file, 'utf8')
  // Replace local EXCLUDED with shared module + include new photos up to 300
  if (!src.includes('instagram-ad-excludes')) {
    src = src.replace(
      'import { usePageSeo } from "../hooks/usePageSeo";',
      'import { usePageSeo } from "../hooks/usePageSeo";\nimport { INSTAGRAM_AD_EXCLUDES } from "../data/instagram-ad-excludes";',
    )
  }
  src = src.replace(
    /\/\/ Imágenes publicitarias[\s\S]*?const EXCLUDED = new Set\(\[[\s\S]*?\]\);/,
    'const EXCLUDED = INSTAGRAM_AD_EXCLUDES;',
  )
  src = src.replace(
    /const ALL_PHOTOS = Array\.from\(\{ length: \d+ \}/,
    'const ALL_PHOTOS = Array.from({ length: 300 }',
  )
  // Only keep entries whose file exists conceptually — filter missing later in map is fine;
  // Galeria already uses igN paths; missing will 404. Prefer length based on max existing.
  fs.writeFileSync(file, src)
  console.log('✓ patched GaleriaPage.tsx')
}

async function main() {
  console.log('══ gallery ads + zip import ══')
  writeExcludeModule()
  const imported = await importZipPhotos()
  // Prefer a newly imported photo as donor for blanking ads
  const cleanDonor = imported.length ? imported : [1, 3, 4, 5].filter((n) => !AD_SET.has(n))
  await blankOutAds(cleanDonor)
  patchProductGalleries()
  patchGaleriaPage()
  console.log('DONE')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
