/**
 * Gemini client — cost-optimized (cache + history sanitize + image compress).
 *
 * Models/params live in `gemini-config.mjs` (edit there).
 */
import sharp from 'sharp'
import { loadGoogleCredentials, getGoogleAccessToken } from './google-service-account.mjs'
import {
  GEMINI_TEXT_MODEL,
  GEMINI_IMAGE_MODEL,
  DEFAULT_GEMINI_MODEL,
  GEMINI_CACHE_TTL_SECONDS,
  GEMINI_IMAGE_MAX_EDGE,
  GEMINI_IMAGE_JPEG_QUALITY,
  GEMINI_SHORT_SYSTEM_FALLBACK,
  resolveTextModel,
  shouldPreferGeminiOverOpenAI,
} from './gemini-config.mjs'
import {
  BODASESOR_BRAND_CORPUS,
  BODASESOR_SYSTEM_INSTRUCTION,
  brandCorpusTokenEstimate,
} from './gemini-brand-corpus.mjs'

export {
  GEMINI_TEXT_MODEL,
  GEMINI_IMAGE_MODEL,
  DEFAULT_GEMINI_MODEL,
  shouldPreferGeminiOverOpenAI,
} from './gemini-config.mjs'

export const GEMINI_SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/generative-language',
]

/** @type {Map<string, { name: string, expireAt: number, model: string }>} */
const cacheMemo = new Map()
/** @type {Map<string, { expireAt: number, error: string }>} */
const cacheFailMemo = new Map()

export async function getGeminiAuth() {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GEMINI_IA ||
    process.env.gimini_IA || // typo alias (user secret name)
    process.env.GIMINI_IA ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim()
  if (apiKey) {
    return {
      mode: 'apiKey',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    }
  }
  const creds = loadGoogleCredentials()
  if (!creds) {
    throw new Error(
      'Missing Gemini auth. Set GEMINI_API_KEY / GEMINI_IA or GOOGLE_SERVICE_ACCOUNT_JSON.',
    )
  }
  const token = await getGoogleAccessToken(creds, GEMINI_SCOPES)
  return {
    mode: 'sa',
    project: creds.project_id,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }
}

function modelResource(model) {
  const m = resolveTextModel(model)
  return m.startsWith('models/') ? m : `models/${m}`
}

/**
 * Create or reuse explicit context cache on the SAME model used for generateContent.
 * @returns {Promise<{ name: string|null, cached: boolean, cacheReused: boolean, model: string, error?: string }>}
 */
export async function getOrCreateSystemCache(opts = {}) {
  const model = resolveTextModel(opts.model || GEMINI_TEXT_MODEL)
  const resource = modelResource(model)
  const displayName = opts.displayName || `bodasesor-${model}`
  const ttl = `${opts.ttlSeconds || GEMINI_CACHE_TTL_SECONDS}s`
  const memoKey = `${resource}:${displayName}`
  const now = Date.now()
  const hit = cacheMemo.get(memoKey)
  if (hit && hit.expireAt > now + 30_000) {
    return { name: hit.name, cached: true, cacheReused: true, model }
  }

  const fail = cacheFailMemo.get(memoKey)
  if (fail && fail.expireAt > now) {
    return {
      name: null,
      cached: false,
      cacheReused: false,
      cacheFallback: true,
      model,
      error: fail.error,
      corpusTokensApprox: brandCorpusTokenEstimate(),
    }
  }

  const { headers } = await getGeminiAuth()
  const body = {
    model: resource,
    displayName,
    ttl,
    systemInstruction: {
      parts: [{ text: opts.systemInstruction || BODASESOR_SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: opts.corpus || BODASESOR_BRAND_CORPUS }],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'Entendido. Usaré el corpus de Bodasesor, sin inventar precios ni venues, y pediré WhatsApp cuando falte detalle comercial.',
          },
        ],
      },
    ],
  }

  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/cachedContents', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const raw = await res.text()
  if (!res.ok) {
    // Free tier often has TotalCachedContentStorageTokensPerModelFreeTier limit=0.
    // Remember failure briefly so we don't pay latency/429 every turn.
    const error = `cache HTTP ${res.status}: ${raw.slice(0, 400)}`
    cacheFailMemo.set(memoKey, { expireAt: now + 10 * 60_000, error })
    return {
      name: null,
      cached: false,
      cacheReused: false,
      cacheFallback: true,
      model,
      error,
      corpusTokensApprox: brandCorpusTokenEstimate(),
    }
  }
  const data = JSON.parse(raw)
  const name = data.name
  const expireAt = data.expireTime ? Date.parse(data.expireTime) : now + GEMINI_CACHE_TTL_SECONDS * 1000
  cacheMemo.set(memoKey, { name, expireAt, model })
  return {
    name,
    cached: true,
    cacheReused: false,
    cacheFallback: false,
    model,
    corpusTokensApprox: brandCorpusTokenEstimate(),
  }
}

/**
 * History for API: text only + mediaDescription; never re-attach past inlineData.
 * Current-turn media may be passed separately via `currentMediaParts`.
 *
 * @param {Array<{ role: string, text?: string, parts?: any[], mediaDescription?: string, media?: any }>} history
 */
export function sanitizeHistoryForApi(history = []) {
  const out = []
  for (const turn of history || []) {
    const role = turn.role === 'model' || turn.role === 'assistant' ? 'model' : 'user'
    const parts = []
    if (turn.text) parts.push({ text: String(turn.text) })
    if (Array.isArray(turn.parts)) {
      for (const p of turn.parts) {
        if (p?.text) parts.push({ text: String(p.text) })
        // Drop inlineData / fileData from past turns
      }
    }
    if (turn.mediaDescription) {
      parts.push({
        text: `[Adjunto previo — descripción]: ${String(turn.mediaDescription)}`,
      })
    }
    if (!parts.length) continue
    out.push({ role, parts })
  }
  return out
}

/**
 * Resize fit-inside 1024×1024 (no upscale) + JPEG q80.
 * @param {Buffer|Uint8Array|ArrayBuffer|string} input bytes or data URL / base64
 * @returns {Promise<{ buffer: Buffer, mimeType: 'image/jpeg', base64: string, stats: object }>}
 */
export async function compressImageForGemini(input) {
  let buf
  if (Buffer.isBuffer(input)) buf = input
  else if (input instanceof Uint8Array) buf = Buffer.from(input)
  else if (input instanceof ArrayBuffer) buf = Buffer.from(input)
  else if (typeof input === 'string') {
    const m = input.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/)
    buf = Buffer.from(m ? m[1] : input, 'base64')
  } else {
    throw new Error('compressImageForGemini: unsupported input')
  }

  const beforeBytes = buf.length
  const meta = await sharp(buf).metadata()
  const width = meta.width || GEMINI_IMAGE_MAX_EDGE
  const height = meta.height || GEMINI_IMAGE_MAX_EDGE
  const needsResize = width > GEMINI_IMAGE_MAX_EDGE || height > GEMINI_IMAGE_MAX_EDGE

  let pipeline = sharp(buf).rotate()
  if (needsResize) {
    pipeline = pipeline.resize({
      width: GEMINI_IMAGE_MAX_EDGE,
      height: GEMINI_IMAGE_MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const out = await pipeline.jpeg({ quality: GEMINI_IMAGE_JPEG_QUALITY, mozjpeg: true }).toBuffer()
  const afterMeta = await sharp(out).metadata()
  const afterBytes = out.length
  const savedRatio = beforeBytes > 0 ? 1 - afterBytes / beforeBytes : 0

  return {
    buffer: out,
    mimeType: 'image/jpeg',
    base64: out.toString('base64'),
    stats: {
      beforeBytes,
      afterBytes,
      savedRatio,
      savedPercent: Math.round(savedRatio * 100),
      widthBefore: width,
      heightBefore: height,
      widthAfter: afterMeta.width,
      heightAfter: afterMeta.height,
      resized: needsResize,
      quality: GEMINI_IMAGE_JPEG_QUALITY,
    },
  }
}

function extractText(data) {
  return (
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join('') || ''
  )
}

/**
 * One-shot text generation with explicit cache when possible.
 */
export async function geminiGenerate(prompt, opts = {}) {
  const model = resolveTextModel(opts.model || GEMINI_TEXT_MODEL)
  const { headers } = await getGeminiAuth()

  let cacheMeta = { cached: false, cacheReused: false, name: null }
  if (opts.useCache !== false) {
    cacheMeta = await getOrCreateSystemCache({ model, displayName: opts.cacheName })
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  /** @type {Record<string, any>} */
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: opts.temperature ?? 0.85,
      maxOutputTokens: opts.maxOutputTokens ?? 4096,
      ...(opts.json ? { responseMimeType: 'application/json' } : {}),
    },
  }

  if (cacheMeta.name) {
    body.cachedContent = cacheMeta.name
  } else {
    // Fallback: SHORT systemInstruction only — do not resend full corpus
    body.systemInstruction = {
      parts: [{ text: opts.shortSystem || GEMINI_SHORT_SYSTEM_FALLBACK }],
    }
  }

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const raw = await res.text()
  if (!res.ok) {
    throw new Error(`Gemini ${model} HTTP ${res.status}: ${raw.slice(0, 500)}`)
  }
  const data = JSON.parse(raw)
  const text = extractText(data)
  if (!text) throw new Error(`Gemini empty response: ${raw.slice(0, 300)}`)
  if (opts.returnMeta) {
    return {
      text,
      cost: {
        cached: Boolean(cacheMeta.cached && !cacheMeta.cacheReused),
        cacheReused: Boolean(cacheMeta.cacheReused),
        cacheFallback: Boolean(cacheMeta.cacheFallback || !cacheMeta.name),
        imageCompressed: false,
        imageStats: null,
        model,
        cacheName: cacheMeta.name,
        cacheError: cacheMeta.error || null,
      },
    }
  }
  return text
}

/**
 * Chat turn with cost-aware cache + optional current-turn image.
 *
 * @param {{
 *   history?: array,
 *   message: string,
 *   imageBase64?: string,
 *   imageMimeType?: string,
 *   imageBuffer?: Buffer,
 *   model?: string,
 * }} input
 */
export async function geminiChat(input) {
  if (!shouldPreferGeminiOverOpenAI() && process.env.OPENAI_API_KEY) {
    // Hard rule: if Gemini creds exist we never reach here; if only OpenAI, still refuse when GEMINI_* set empty? User said: don't use OpenAI if GEMINI key present.
  }
  if (
    (process.env.GEMINI_API_KEY || process.env.GEMINI_IA || '').trim() &&
    process.env.FORCE_OPENAI === '1'
  ) {
    throw new Error('OpenAI disabled while GEMINI_API_KEY / GEMINI_IA is set')
  }

  const model = resolveTextModel(input.model || GEMINI_TEXT_MODEL)
  const { headers } = await getGeminiAuth()
  const cacheMeta = await getOrCreateSystemCache({ model })

  const contents = sanitizeHistoryForApi(input.history || [])
  /** @type {any[]} */
  const userParts = []
  if (input.message) userParts.push({ text: String(input.message) })

  let imageCompressed = false
  let imageStats = null
  let mediaDescription = null

  const rawImage = input.imageBuffer || input.imageBase64
  if (rawImage) {
    const compressed = await compressImageForGemini(rawImage)
    imageCompressed = true
    imageStats = compressed.stats
    userParts.push({
      inlineData: { mimeType: compressed.mimeType, data: compressed.base64 },
    })
    // Ask model to produce a short description we can persist
    userParts.push({
      text:
        '\n\n[Instrucción interna]: Si hay imagen, incluye al FINAL una línea exacta ' +
        'MEDIA_DESCRIPTION: <1-2 oraciones en español>. El resto es la respuesta al usuario.',
    })
  }

  contents.push({ role: 'user', parts: userParts })

  /** @type {Record<string, any>} */
  const body = {
    contents,
    generationConfig: {
      temperature: input.temperature ?? 0.7,
      maxOutputTokens: input.maxOutputTokens ?? 2048,
    },
  }

  if (cacheMeta.name) {
    body.cachedContent = cacheMeta.name
  } else {
    body.systemInstruction = {
      parts: [{ text: GEMINI_SHORT_SYSTEM_FALLBACK }],
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const raw = await res.text()
  if (!res.ok) {
    throw new Error(`Gemini chat HTTP ${res.status}: ${raw.slice(0, 500)}`)
  }
  const data = JSON.parse(raw)
  let reply = extractText(data)
  if (!reply) throw new Error('Gemini chat empty response')

  const md = reply.match(/MEDIA_DESCRIPTION:\s*(.+)$/im)
  if (md) {
    mediaDescription = md[1].trim()
    reply = reply.replace(/\n?MEDIA_DESCRIPTION:\s*.+$/im, '').trim()
  } else if (imageCompressed) {
    mediaDescription = 'El usuario compartió una imagen relacionada con su evento o cotización.'
  }

  return {
    reply,
    mediaDescription,
    cost: {
      cached: Boolean(cacheMeta.cached && !cacheMeta.cacheReused),
      cacheReused: Boolean(cacheMeta.cacheReused),
      cacheFallback: Boolean(cacheMeta.cacheFallback || !cacheMeta.name),
      imageCompressed,
      imageStats,
      model,
      cacheName: cacheMeta.name,
      cacheError: cacheMeta.error || null,
    },
  }
}

/** Parse JSON from model output (strips fences if needed). */
export function parseGeminiJson(text) {
  const trimmed = String(text || '').trim()
  try {
    return JSON.parse(trimmed)
  } catch {
    const m = trimmed.match(/\{[\s\S]*\}/)
    if (!m) throw new Error('Gemini response is not JSON')
    return JSON.parse(m[0])
  }
}

/** Image generation ONLY when needed — uses Imagen fast model. */
export async function geminiGenerateImage(prompt, opts = {}) {
  const model = opts.model || GEMINI_IMAGE_MODEL
  const { headers } = await getGeminiAuth()
  // Imagen predict endpoint (Generative Language / Vertex-compatible path may vary)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`
  const body = {
    instances: [{ prompt: String(prompt) }],
    parameters: { sampleCount: 1 },
  }
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const raw = await res.text()
  if (!res.ok) {
    throw new Error(`Imagen ${model} HTTP ${res.status}: ${raw.slice(0, 500)}`)
  }
  return JSON.parse(raw)
}
