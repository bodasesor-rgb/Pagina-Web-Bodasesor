/**
 * Push updated redirect URLs to Google Sheet "Paginas Bodasesor"
 *
 * Requires a Google Cloud service account with Editor access to the sheet.
 * Set GOOGLE_SERVICE_ACCOUNT_JSON to the service account key JSON string.
 *
 * Usage: node scripts/push-to-google-sheet.mjs
 */
import fs from 'fs'
import path from 'path'
import { createSign } from 'crypto'

const SHEET_ID = '1IkE_zX3tjkGJuDAMzF09swEWuHSaE1wXY2SqOHNNvpk'
const SHEET_NAME = 'Paginas Bodasesor'
const CSV_PATH = path.join(import.meta.dirname, 'paginas-bodasesor-actualizado.csv')

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++ }
      else if (ch === '"') inQuotes = false
      else field += ch
      continue
    }
    if (ch === '"') inQuotes = true
    else if (ch === ',') { row.push(field); field = '' }
    else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field); rows.push(row); row = []; field = ''
      if (ch === '\r') i++
    } else if (ch !== '\r') field += ch
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows
}

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))
  const unsigned = `${header}.${payload}`
  const sign = createSign('RSA-SHA256')
  sign.update(unsigned)
  sign.end()
  const signature = sign.sign(credentials.private_key).toString('base64url')
  const jwt = `${unsigned}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) throw new Error(`Token error: ${await res.text()}`)
  const data = await res.json()
  return data.access_token
}

async function getSheetId(token) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Spreadsheet error: ${await res.text()}`)
  const data = await res.json()
  const sheet = data.sheets.find((s) => s.properties.title === SHEET_NAME)
  if (!sheet) throw new Error(`Sheet tab not found: ${SHEET_NAME}`)
  return sheet.properties.sheetId
}

async function updateSheet(token, values) {
  const range = `${SHEET_NAME}!B2:C${values.length + 1}`
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
    },
  )
  if (!res.ok) throw new Error(`Update error: ${await res.text()}`)
}

const credJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
if (!credJson) {
  console.log('GOOGLE_SERVICE_ACCOUNT_JSON not set.')
  console.log('Use scripts/google-sheets-sync.gs in the sheet menu instead,')
  console.log('or import scripts/paginas-bodasesor-actualizado.csv manually.')
  process.exit(0)
}

const rows = parseCsv(fs.readFileSync(CSV_PATH, 'utf8'))
const values = rows.slice(1).map((cells) => [cells[1] || '', cells[2] || ''])

const credentials = JSON.parse(credJson)
const token = await getAccessToken(credentials)
await getSheetId(token)
await updateSheet(token, values)

console.log(`Updated ${values.length} rows in "${SHEET_NAME}" column B/C`)
