/**
 * Canonical Gemini models + cost params for Bodasesor (Pagina Web).
 *
 * WHERE TO CHANGE MODELS: edit THIS file only.
 * Cost cut aligned with Lucy Bodasesor V9.32:
 * - flash-lite only (no Pro / Imagen / Nano Banana for chat)
 * - GEMINI_CONTEXT_CACHE default OFF (avoid thrashing)
 * - Chat history trim + no few-shot dump
 */

export const GEMINI_COST_CUT_VERSION = 'V9.32-web'

export const GEMINI_TEXT_MODEL = 'gemini-3.1-flash-lite'
/** Image gen model — blocked for chat; only for explicit offline image jobs. */
export const GEMINI_IMAGE_MODEL = 'imagen-4.0-fast-generate-001'

/** @deprecated use GEMINI_TEXT_MODEL — kept as alias for older imports */
export const DEFAULT_GEMINI_MODEL =
  (process.env.GEMINI_MODEL || '').trim() || GEMINI_TEXT_MODEL

export const DEFAULT_GEMINI_IMAGE_MODEL =
  (process.env.GEMINI_IMAGE_MODEL || '').trim() || GEMINI_IMAGE_MODEL

/** Explicit context cache TTL (only when GEMINI_CONTEXT_CACHE=1). */
export const GEMINI_CACHE_TTL_SECONDS = Number(process.env.GEMINI_CACHE_TTL || 3600)

/** Gemini 3.x explicit cache minimum (~4096 tokens). Corpus must clear this. */
export const GEMINI_CACHE_MIN_TOKENS = 4096

/** Rough chars/token heuristic for padding checks (conservative). */
export const GEMINI_CHARS_PER_TOKEN = 3.2

export const GEMINI_IMAGE_MAX_EDGE = 1024
export const GEMINI_IMAGE_JPEG_QUALITY = 80

/**
 * V9.32: explicit context cache OFF by default.
 * Dynamic brand+turn mixes thrash cachedContents (creates >> hits).
 */
export function isGeminiContextCacheEnabled() {
  const raw = (process.env.GEMINI_CONTEXT_CACHE ?? '0').trim().toLowerCase()
  return raw === '1' || raw === 'true' || raw === 'on'
}

/** Max user/model turns sent to the LLM. Default 6 (Lucy V9.32). */
export function getGeminiChatHistoryMax() {
  const n = Number(process.env.LUCY_CHAT_HISTORY_MAX || process.env.GEMINI_CHAT_HISTORY_MAX || 6)
  if (!Number.isFinite(n) || n < 2) return 6
  return Math.min(Math.floor(n), 40)
}

/** Few-shot examples to inject (web chat has none). Default 0. */
export function getGeminiFewShotMax() {
  const n = Number(process.env.LUCY_FEW_SHOT_MAX || process.env.GEMINI_FEW_SHOT_MAX || 0)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(Math.floor(n), 20)
}

/**
 * Unified extract+reply JSON turn (web chat is already 1 call; kept for parity / future CRM).
 * Default ON.
 */
export function isGeminiUnifiedLlmTurn() {
  const raw = (
    process.env.LUCY_UNIFIED_LLM_TURN ||
    process.env.GEMINI_UNIFIED_LLM_TURN ||
    '1'
  )
    .trim()
    .toLowerCase()
  return raw !== '0' && raw !== 'false' && raw !== 'off'
}

export function geminiCostControlsSummary() {
  return {
    cost_cut_version: GEMINI_COST_CUT_VERSION,
    unified_llm_turn: isGeminiUnifiedLlmTurn(),
    chat_history_max: getGeminiChatHistoryMax(),
    few_shot_max: getGeminiFewShotMax(),
    context_cache_env: (process.env.GEMINI_CONTEXT_CACHE ?? '0').trim() || '0',
    text_model: GEMINI_TEXT_MODEL,
  }
}

/** Models that must never be selected for chat/copy */
export const GEMINI_BLOCKED_MODELS = Object.freeze([
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'models/gemini-2.5-flash',
  'models/gemini-2.0-flash',
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-2.5-pro',
  'gemini-3-pro',
  'gemini-3.1-pro',
  'gemini-pro-vision',
  'imagen-3.0-generate-002',
  'imagen-4.0-generate-001',
  'imagen-4.0-ultra-generate-001',
  'nano-banana',
  'gemini-nanobanana',
  'models/gemini-pro',
  'models/gemini-1.5-pro',
  'models/gemini-2.5-pro',
])

export function assertAllowedTextModel(model) {
  const m = String(model || '').replace(/^models\//, '')
  if (GEMINI_BLOCKED_MODELS.some((b) => b.replace(/^models\//, '') === m)) {
    throw new Error(`Blocked Gemini model "${model}". Use ${GEMINI_TEXT_MODEL}.`)
  }
  // Block any *pro* / imagen / banana substring for chat
  if (/\bpro\b/i.test(m) || /imagen/i.test(m) || /banana/i.test(m)) {
    throw new Error(`Blocked Gemini model "${model}". Use ${GEMINI_TEXT_MODEL}.`)
  }
  return m
}

export function resolveTextModel(override) {
  return assertAllowedTextModel(override || DEFAULT_GEMINI_MODEL)
}

/** Prefer Gemini when any Gemini key is present (do not call OpenAI). */
export function shouldPreferGeminiOverOpenAI() {
  return Boolean(
    (process.env.GEMINI_API_KEY || '').trim() ||
      (process.env.GEMINI_IA || '').trim() ||
      (process.env.gimini_IA || '').trim() ||
      (process.env.GIMINI_IA || '').trim() ||
      (process.env.GOOGLE_API_KEY || '').trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
  )
}

/** Static personality only — cacheable if GEMINI_CONTEXT_CACHE=1. */
export function buildStaticSystemPrompt() {
  return (
    'Eres el asistente virtual de Bodasesor (eventos y banquetes en México). ' +
    'Responde en español de México, tono profesional cercano. No inventes precios ni venues. ' +
    'Invita a cotizar por WhatsApp +52 55 4008 0373 cuando falte detalle comercial. ' +
    'No generes imágenes. No uses modelos Pro.'
  )
}

/**
 * Turn-only context (catalog slim, CRM, flags) — NEVER put inside cached system.
 * @param {Record<string, unknown>} [ctx]
 */
export function buildDynamicTurnContext(ctx = {}) {
  const lines = ['CONTEXTO DEL TURNO (dinámico — no cachear):']
  if (ctx.catalogSlim) lines.push(`Catálogo acotado:\n${String(ctx.catalogSlim).slice(0, 2500)}`)
  if (ctx.crm) lines.push(`CRM:\n${String(ctx.crm).slice(0, 1500)}`)
  if (ctx.briefing) lines.push(`Briefing:\n${String(ctx.briefing).slice(0, 1500)}`)
  if (ctx.flags) lines.push(`Flags: ${JSON.stringify(ctx.flags)}`)
  if (lines.length === 1) return ''
  return lines.join('\n')
}

export const GEMINI_SHORT_SYSTEM_FALLBACK = buildStaticSystemPrompt()
