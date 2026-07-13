#!/usr/bin/env node
/**
 * Descarga el deploy publicado actual de Netlify a .netlify-live/
 * Requiere: NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID (env o .env.local)
 *
 * Uso: node scripts/pull-netlify-live.mjs
 * Opcional: NETLIFY_RESTORE_DEPLOY_ID=<id> para forzar un deploy con Nexus
 */
import { mkdir, writeFile, rm, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const ZIP_PATH = join(ROOT, '.netlify-live.zip')
const MIN_NEXUS_FILES = 50

async function loadEnvFile() {
  for (const name of ['.env.local', '.env']) {
    const path = join(ROOT, name)
    if (!existsSync(path)) continue
    const text = await readFile(path, 'utf8')
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!m || process.env[m[1]]) continue
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  }
}

async function netlifyFetch(path, { allow404 = false } = {}) {
  const token = process.env.NETLIFY_AUTH_TOKEN
  if (!token) {
    throw new Error(
      'Falta NETLIFY_AUTH_TOKEN. Créalo en https://app.netlify.com/user/applications#personal-access-tokens',
    )
  }
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 404 && allow404) return null
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Netlify API ${path} → ${res.status}: ${body}`)
  }
  return res
}

function resolveSiteId() {
  const id = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  if (!id) {
    throw new Error(
      'Falta NETLIFY_SITE_ID o SITE_ID. Netlify → Site configuration → General → API ID',
    )
  }
  return id
}

function isNexusLandingPath(p) {
  const path = p.replace(/^\//, '')
  return (
    path.startsWith('eventos/') ||
    path.startsWith('nexus-output-pages/') ||
    path.startsWith('private/nexus-output-pages/') ||
    /-a-domicilio-[a-z0-9-]+\/index\.html$/i.test(path)
  )
}

async function countNexusFiles(deployId) {
  const res = await netlifyFetch(`/deploys/${deployId}/files?per_page=1000`)
  if (!res) return 0
  const files = await res.json()
  const list = Array.isArray(files) ? files : files?.files ?? []
  return list.filter((f) => isNexusLandingPath(f.path || f.name || '')).length
}

async function tryDownloadZip(deployId) {
  const res = await netlifyFetch(`/deploys/${deployId}/zip`, { allow404: true })
  if (!res) return false
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length < 1000) return false
  await writeFile(ZIP_PATH, buffer)
  return true
}

async function pickDeployWithNexus(siteId) {
  const forcedId = process.env.NETLIFY_RESTORE_DEPLOY_ID
  if (forcedId) {
    const count = await countNexusFiles(forcedId)
    if (count < MIN_NEXUS_FILES) {
      throw new Error(
        `NETLIFY_RESTORE_DEPLOY_ID=${forcedId} solo tiene ${count} landings Nexus (need ≥${MIN_NEXUS_FILES})`,
      )
    }
    return { id: forcedId, title: 'forced restore', published_at: null }
  }

  const deploysRes = await netlifyFetch(`/sites/${siteId}/deploys?per_page=100`)
  const deploys = await deploysRes.json()
  if (!deploys?.length) {
    throw new Error('No hay deploys en este sitio.')
  }

  for (const deploy of deploys) {
    if (deploy.state !== 'ready') continue
    try {
      const count = await countNexusFiles(deploy.id)
      if (count < MIN_NEXUS_FILES) {
        console.log(`  skip ${deploy.id.slice(0, 8)}… — ${count} Nexus files`)
        continue
      }
      console.log(`  candidate ${deploy.id.slice(0, 8)}… — ${count} Nexus files`)
      if (await tryDownloadZip(deploy.id)) {
        return deploy
      }
      console.log(`  zip unavailable for ${deploy.id.slice(0, 8)}…, trying older deploy`)
    } catch (err) {
      console.warn(`  error checking ${deploy.id?.slice(0, 8)}…: ${err.message}`)
    }
  }

  throw new Error(
    `No se encontró deploy descargable con ≥${MIN_NEXUS_FILES} páginas Nexus. ` +
      'En Netlify → Deploys, publica manualmente un deploy anterior al 12 jul 2026 ~20:19 UTC, ' +
      'copia su Deploy ID y configura NETLIFY_RESTORE_DEPLOY_ID en GitHub Secrets.',
  )
}

async function main() {
  await loadEnvFile()
  const siteId = resolveSiteId()
  const hasToken = Boolean(process.env.NETLIFY_AUTH_TOKEN)
  console.log(`Site ID: ${siteId.slice(0, 8)}… (token: ${hasToken ? 'sí' : 'no'})`)

  console.log('Buscando deploy con páginas Nexus/SEO…')
  const deploy = await pickDeployWithNexus(siteId)
  if (!deploy?.id) {
    throw new Error('No hay deploy publicado en este sitio.')
  }

  console.log(`Deploy: ${deploy.id} (${deploy.title || deploy.context || 'production'})`)
  console.log(`Fecha: ${deploy.published_at || deploy.created_at}`)

  if (!existsSync(ZIP_PATH)) {
    console.log('Descargando ZIP del deploy…')
    const ok = await tryDownloadZip(deploy.id)
    if (!ok) throw new Error(`No se pudo descargar ZIP del deploy ${deploy.id}`)
  } else {
    console.log('Usando ZIP ya descargado')
  }

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  execSync(`unzip -q -o "${ZIP_PATH}" -d "${OUT_DIR}"`, { stdio: 'inherit' })
  await rm(ZIP_PATH, { force: true })

  const manifest = {
    pulledAt: new Date().toISOString(),
    deployId: deploy.id,
    deployUrl: deploy.deploy_ssl_url || deploy.ssl_url || deploy.url,
    siteId,
    commitRef: deploy.commit_ref || null,
    commitMessage: deploy.title || null,
  }
  await writeFile(join(OUT_DIR, '.manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\nListo → ${OUT_DIR}`)
  console.log('Revisa .netlify-live/ antes de cambiar y publicar.')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
