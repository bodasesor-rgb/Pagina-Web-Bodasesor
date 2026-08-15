/**
 * Gemini client — cost-optimized (Lucy V9.32 patterns for Pagina Web).
 *
 * Models/params live in `gemini-config.mjs` (edit there).
 * Defaults: context cache OFF, history ≤6, flash-lite only, 1 call/chat turn.
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
  GEMINI_COST_CUT_VERSION,
  resolveTextModel,
  shouldPreferGeminiOverOpenAI,
  isGeminiContextCacheEnabled,
  getGeminiChatHistoryMax,
  getGeminiFewShotMax,
  isGeminiUnifiedLlmTurn,
  geminiCostControlsSummary,
  buildStaticSystemPrompt,
  buildDynamicTurnContext,
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
  GEMINI_COST_CUT_VERSION,
  shouldPreferGeminiOverOpenAI,
  isGeminiContextCacheEnabled,
  getGeminiChatHistoryMax,
  getGeminiFewShotMax,
  isGeminiUnifiedLlmTurn,
  geminiCostControlsSummary,
  buildStaticSystemPrompt,
  buildDynamicTurnContext,
} from './gemini-config.mjs'

export const GEMINI_SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/generative-language',
]

/** @type {Map<string, { name: string, expireAt: number, model: string }>} */
const cacheMemo = new Map()
/** @type {Map<string, { expireAt: number, error: string }>} */
const cacheFailMemo = new Map()

const geminiCallStats = {
  total: 0,
  byPurpose: /** @type {Record<string, number>} */ ({}),
  lastModel: /** @type {string|null} */ (null),
  lastAt: /** @type {string|null} */ (null),
  contextCacheCreates: 0,
  contextCacheHits: 0,
  contextCacheSkipped: 0,
  contextCacheDisabled: 0,
  blockedOverrides: 0,
}

export function getGeminiCallStats() {
  return {
    total: geminiCallStats.total,
    byPurpose: { ...geminiCallStats.byPurpose },
    lastModel: geminiCallStats.lastModel,
    lastAt: geminiCallStats.lastAt,
    contextCacheCreates: geminiCallStats.contextCacheCreates,
    contextCacheHits: geminiCallStats.contextCacheHits,
    contextCacheSkipped: geminiCallStats.contextCacheSkipped,
    contextCacheDisabled: geminiCallStats.contextCacheDisabled,
    blockedOverrides: geminiCallStats.blockedOverrides,
    cost_controls: geminiCostControlsSummary(),
  }
}

export function resetGeminiCallStatsForTests() {
  geminiCallStats.total = 0
  geminiCallStats.byPurpose = {}
  geminiCallStats.lastModel = null
  geminiCallStats.lastAt = null
  geminiCallStats.contextCacheCreates = 0
  geminiCallStats.contextCacheHits = 0
  geminiCallStats.contextCacheSkipped = 0
  geminiCallStats.contextCacheDisabled = 0
  geminiCallStats.blockedOverrides = 0
  cacheMemo.clear()
  cacheFailMemo.clear()
}

function noteCall(purpose, model) {
  geminiCallStats.total += 1
  const p = purpose || 'other'
  geminiCallStats.byPurpose[p] = (geminiCallStats.byPurpose[p] || 0) + 1
  geminiCallStats.lastModel = model
  geminiCallStats.lastAt = new Date().toISOString()
}

export async function getGeminiAuth() {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GEMINI_IA ||
    process.env.gimini_IA ||
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

function systemLooksDynamic(text) {
  return /CONTEXTO DEL TURNO|ESTADO ACTUAL|CAT[AÁ]LOGO|BRIEFING INTERNO|CRM:/i.test(
    String(text || ''),
  )
}

/**
 * Create or reuse explicit context cache — ONLY when GEMINI_CONTEXT_CACHE=1
 * and system is static (no catalog/CRM/turn context).
 */
export async function getOrCreateSystemCache(opts = {}) {
  const model = resolveTextModel(opts.model || GEMINI_TEXT_MODEL)
  const systemText = opts.systemInstruction || BODASESOR_SYSTEM_INSTRUCTION

  if (!isGeminiContextCacheEnabled()) {
    geminiCallStats.contextCacheDisabled += 1
    return {
      name: null,
      cached: false,
      cacheReused: false,
      cacheFallback: true,
      model,
      error: 'GEMINI_CONTEXT_CACHE=0 (default off)',
      corpusTokensApprox: brandCorpusTokenEstimate(),
    }
  }

  if (systemLooksDynamic(systemText) || systemLooksDynamic(opts.corpus || '')) {
    geminiCallStats.contextCacheSkipped += 1
    return {
      name: null,
      cached: false,
      cacheReused: false,
      cacheFallback: true,
      model,
      error: 'system/corpus looks dynamic — refuse cachedContents',
      corpusTokensApprox: brandCorpusTokenEstimate(),
    }
  }

  const resource = modelResource(model)
  const displayName = opts.displayName || `bodasesor-${model}`
  const ttl = `${opts.ttlSeconds || GEMINI_CACHE_TTL_SECONDS}s`
  const memoKey = `${resource}:${displayName}`
  const now = Date.now()
  const hit = cacheMemo.get(memoKey)
  if (hit && hit.expireAt > now + 30_000) {
    geminiCallStats.contextCacheHits += 1
    return { name: hit.name, cached: true, cacheReused: true, model }
  }

  const fail = cacheFailMemo.get(memoKey)
  if (fail && fail.expireAt > now) {
    geminiCallStats.contextCacheSkipped += 1
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
      parts: [{ text: systemText }],
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
    const error = `cache HTTP ${res.status}: ${raw.slice(0, 400)}`
    cacheFailMemo.set(memoKey, { expireAt: now + 10 * 60_000, error })
    geminiCallStats.contextCacheSkipped += 1
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
  const expireAt = data.expireTime
    ? Date.parse(data.expireTime)
    : now + GEMINI_CACHE_TTL_SECONDS * 1000
  cacheMemo.set(memoKey, { name, expireAt, model })
  geminiCallStats.contextCacheCreates += 1
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
 * Trimmed to getGeminiChatHistoryMax() most recent user/model turns.
 */
export function sanitizeHistoryForApi(history = [], maxMessages = getGeminiChatHistoryMax()) {
  const out = []
  for (const turn of history || []) {
    const role = turn.role === 'model' || turn.role === 'assistant' ? 'model' : 'user'
    const parts = []
    if (turn.text) parts.push({ text: String(turn.text) })
    if (Array.isArray(turn.parts)) {
      for (const p of turn.parts) {
        if (p?.text) parts.push({ text: String(p.text) })
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
  if (out.length <= maxMessages) return out
  return out.slice(-maxMessages)
}

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

export async function geminiGenerate(prompt, opts = {}) {
  const model = resolveTextModel(opts.model || GEMINI_TEXT_MODEL)
  const { headers } = await getGeminiAuth()
  noteCall(opts.purpose || 'generate', model)

  let cacheMeta = { cached: false, cacheReused: false, name: null, cacheFallback: true }
  const wantCache = opts.useCache === true && isGeminiContextCacheEnabled()
  if (wantCache) {
    cacheMeta = await getOrCreateSystemCache({
      model,
      displayName: opts.cacheName,
      systemInstruction: opts.systemInstruction || buildStaticSystemPrompt(),
      corpus: opts.corpus,
    })
  } else if (!isGeminiContextCacheEnabled()) {
    geminiCallStats.contextCacheDisabled += 1
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
    body.systemInstruction = {
      parts: [{ text: opts.shortSystem || buildStaticSystemPrompt() }],
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
        cost_cut_version: GEMINI_COST_CUT_VERSION,
      },
    }
  }
  return text
}

/**
 * Chat turn — always 1 generateContent call.
 * Dynamic turn context is a user preamble, never inside cached system.
 */
export async function geminiChat(input) {
  if (
    (process.env.GEMINI_API_KEY || process.env.GEMINI_IA || '').trim() &&
    process.env.FORCE_OPENAI === '1'
  ) {
    throw new Error('OpenAI disabled while GEMINI_API_KEY / GEMINI_IA is set')
  }

  const model = resolveTextModel(input.model || GEMINI_TEXT_MODEL)
  const { headers } = await getGeminiAuth()
  noteCall(input.purpose || 'chat', model)

  let cacheMeta = { cached: false, cacheReused: false, name: null, cacheFallback: true }
  if (isGeminiContextCacheEnabled()) {
    cacheMeta = await getOrCreateSystemCache({
      model,
      systemInstruction: buildStaticSystemPrompt(),
    })
  } else {
    geminiCallStats.contextCacheDisabled += 1
  }

  const contents = sanitizeHistoryForApi(input.history || [])
  /** @type {any[]} */
  const userParts = []

  const dynamic = buildDynamicTurnContext(input.turnContext || {})
  if (dynamic) userParts.push({ text: dynamic })
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
      parts: [{ text: buildStaticSystemPrompt() }],
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

  let extracted = null
  if (input.unifiedJson) {
    try {
      const parsed = parseGeminiJson(reply)
      if (parsed && typeof parsed === 'object' && (parsed.reply || parsed.extracted)) {
        extracted = parsed.extracted ?? null
        reply = String(parsed.reply || reply)
      }
    } catch {
      // Fallback: treat full text as reply
    }
  }

  const md = reply.match(/MEDIA_DESCRIPTION:\s*(.+)$/im)
  if (md) {
    mediaDescription = md[1].trim()
    reply = reply.replace(/\n?MEDIA_DESCRIPTION:\s*.+$/im, '').trim()
  } else if (imageCompressed) {
    mediaDescription = 'El usuario compartió una imagen relacionada con su evento o cotización.'
  }

  return {
    reply,
    extracted,
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
      callsThisTurn: 1,
      cost_cut_version: GEMINI_COST_CUT_VERSION,
      historyTrimmedTo: getGeminiChatHistoryMax(),
    },
  }
}

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

/** Image generation blocked by default (cost cut). */
export async function geminiGenerateImage(prompt, opts = {}) {
  if (process.env.GEMINI_ALLOW_IMAGE_GEN !== '1') {
    throw new Error(
      'Gemini image generation blocked (cost cut). Set GEMINI_ALLOW_IMAGE_GEN=1 only for offline jobs.',
    )
  }
  const model = opts.model || GEMINI_IMAGE_MODEL
  const { headers } = await getGeminiAuth()
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
