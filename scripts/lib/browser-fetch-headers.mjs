import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const DEFAULT_NEXUS = 'https://white-ferret-567834.hostingersite.com'

function loadDotEnv() {
  for (const name of ['.env.local', '.env']) {
    const file = join(ROOT, name)
    if (!existsSync(file)) continue
    for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq < 1) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (process.env[key] === undefined) process.env[key] = value
    }
  }
}

loadDotEnv()

/** Headers that pass bot-shield (Chrome + Sec-Fetch + UA Bodasesor en ALLOW). */
export const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 BodasesorSync/1.0 (+https://bodasesor.com)'

export function hasNexusAuth() {
  return Boolean(
    process.env.NEXUS_PASS ||
      process.env.NEXUS_ACCESS_KEY ||
      process.env.NEXUS_KEY ||
      (process.env.NEXUS_USER && process.env.NEXUS_PASS),
  )
}

function nexusHost() {
  try {
    return new URL((process.env.NEXUS_URL || DEFAULT_NEXUS).replace(/\/$/, '')).host
  } catch {
    return ''
  }
}

/** HTTP Basic / Bearer only for Hostinger (NEXUS_URL). Never sent to bodasesor.com. */
export function nexusAuthHeaders(targetUrl) {
  if (!targetUrl) return {}
  let host = ''
  try {
    host = new URL(targetUrl).host
  } catch {
    return {}
  }
  if (!host || host !== nexusHost()) return {}

  const user = process.env.NEXUS_USER || 'admin'
  const pass = process.env.NEXUS_PASS || ''
  const key = process.env.NEXUS_ACCESS_KEY || process.env.NEXUS_KEY || ''

  const headers = {}
  if (pass) {
    headers.authorization = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
  } else if (key.includes(':')) {
    headers.authorization = `Basic ${Buffer.from(key).toString('base64')}`
  } else if (key) {
    headers.authorization = `Basic ${Buffer.from(`${user}:${key}`).toString('base64')}`
    headers['x-nexus-key'] = key
  }
  return headers
}

export function browserNavHeaders(extra = {}) {
  return {
    'user-agent': BROWSER_UA,
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language': 'es-MX,es;q=0.9,en;q=0.8',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-dest': 'document',
    'sec-fetch-user': '?1',
    ...extra,
  }
}

export function browserAssetHeaders(extra = {}) {
  return {
    'user-agent': BROWSER_UA,
    accept: '*/*',
    'accept-language': 'es-MX,es;q=0.9,en;q=0.8',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-dest': 'empty',
    ...extra,
  }
}

export function headersFor(url, extra = {}, kind = 'nav') {
  const base = kind === 'asset' ? browserAssetHeaders(extra) : browserNavHeaders(extra)
  return { ...base, ...nexusAuthHeaders(url) }
}
