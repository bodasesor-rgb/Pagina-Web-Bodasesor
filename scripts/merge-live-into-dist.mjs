#!/usr/bin/env node
/**
 * Copia a dist/ lo que existe en .netlify-live/ y NO debe perderse (Nexus/SEO).
 * El SPA (index.html, assets/) siempre gana. Lo demás se preserva si falta en dist.
 *
 * Uso: node scripts/merge-live-into-dist.mjs
 */
import { readFile, copyFile, mkdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE_DIR = join(ROOT, '.netlify-live')
const DIST_DIR = join(ROOT, 'dist')
const CONFIG_PATH = join(__dirname, 'netlify-preserve.json')

async function loadConfig() {
  const raw = await readFile(CONFIG_PATH, 'utf8')
  return JSON.parse(raw)
}

function matchesPrefix(relPath, prefixes) {
  const norm = relPath.replace(/\\/g, '/')
  return prefixes.some((p) => norm === p || norm.startsWith(p))
}

function shouldSpaWin(relPath, config) {
  const norm = relPath.replace(/\\/g, '/')
  if (config.spaWinsExact?.includes(norm)) return true
  return matchesPrefix(norm, config.spaWinsPrefixes || [])
}

function isPreservedPath(relPath, config) {
  return matchesPrefix(relPath.replace(/\\/g, '/'), config.alwaysPreservePrefixes || [])
}

async function walkFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.name === '.manifest.json') continue
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(full, base)))
    } else {
      files.push(relative(base, full))
    }
  }
  return files
}

async function copyFileEnsuringDir(src, dest) {
  await mkdir(dirname(dest), { recursive: true })
  await copyFile(src, dest)
}

async function main() {
  if (!existsSync(LIVE_DIR)) {
    throw new Error(
      'No existe .netlify-live/. Ejecuta primero: npm run sync:netlify',
    )
  }
  if (!existsSync(DIST_DIR)) {
    throw new Error('No existe dist/. Ejecuta primero: npm run build')
  }

  const config = await loadConfig()
  const liveFiles = await walkFiles(LIVE_DIR)
  let copied = 0
  let skippedSpa = 0
  let skippedExists = 0
  const log = []

  for (const rel of liveFiles) {
    const livePath = join(LIVE_DIR, rel)
    const distPath = join(DIST_DIR, rel)
    const st = await stat(livePath)
    if (!st.isFile()) continue

    const preserved = isPreservedPath(rel, config)
    const spaWins = shouldSpaWin(rel, config)
    const distHas = existsSync(distPath)

    if (spaWins && distHas) {
      skippedSpa++
      continue
    }

    if (distHas && !preserved) {
      skippedExists++
      continue
    }

    await copyFileEnsuringDir(livePath, distPath)
    copied++
    log.push(rel)
  }

  const report = {
    mergedAt: new Date().toISOString(),
    copiedCount: copied,
    skippedSpa,
    skippedExists,
    copiedPaths: log.slice(0, 200),
    truncated: log.length > 200,
  }
  await writeFile(join(DIST_DIR, '.merge-report.json'), JSON.stringify(report, null, 2))

  console.log(`Merge completado:`)
  console.log(`  Copiados desde Netlify: ${copied}`)
  console.log(`  Omitidos (SPA gana): ${skippedSpa}`)
  console.log(`  Omitidos (ya en dist): ${skippedExists}`)
  if (copied === 0) {
    console.log('\nNota: si esperabas páginas Nexus, corre npm run sync:netlify antes del build.')
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
