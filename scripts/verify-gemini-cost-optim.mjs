#!/usr/bin/env node
/**
 * Verify Gemini cost optimizations (V9.32-web / Lucy parity).
 * Offline checks always run. Live chat only if GEMINI_API_KEY / GEMINI_IA is set.
 */
import sharp from 'sharp'
import {
  sanitizeHistoryForApi,
  compressImageForGemini,
  geminiChat,
  getOrCreateSystemCache,
  getGeminiAuth,
  getGeminiCallStats,
  resetGeminiCallStatsForTests,
  buildStaticSystemPrompt,
  buildDynamicTurnContext,
  isGeminiContextCacheEnabled,
  isGeminiUnifiedLlmTurn,
  getGeminiChatHistoryMax,
  getGeminiFewShotMax,
  geminiCostControlsSummary,
  GEMINI_COST_CUT_VERSION,
} from './lib/gemini.mjs'
import {
  GEMINI_TEXT_MODEL,
  GEMINI_BLOCKED_MODELS,
  assertAllowedTextModel,
} from './lib/gemini-config.mjs'
import { brandCorpusTokenEstimate } from './lib/gemini-brand-corpus.mjs'

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function offline() {
  assert(GEMINI_COST_CUT_VERSION === 'V9.32-web', 'cost cut version')
  assert(GEMINI_TEXT_MODEL === 'gemini-3.1-flash-lite', 'TEXT model must be flash-lite')
  assert(brandCorpusTokenEstimate() >= 4096, 'corpus must be ≥4096 tokens')
  assertAllowedTextModel(GEMINI_TEXT_MODEL)

  for (const b of [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
    'gemini-2.5-pro',
    'imagen-4.0-generate-001',
    'nano-banana',
  ]) {
    let threw = false
    try {
      assertAllowedTextModel(b)
    } catch {
      threw = true
    }
    assert(threw, `should block ${b}`)
  }

  // Defaults (Lucy V9.32 parity)
  const prev = {
    c: process.env.GEMINI_CONTEXT_CACHE,
    u: process.env.LUCY_UNIFIED_LLM_TURN,
    h: process.env.LUCY_CHAT_HISTORY_MAX,
    f: process.env.LUCY_FEW_SHOT_MAX,
  }
  delete process.env.GEMINI_CONTEXT_CACHE
  delete process.env.LUCY_UNIFIED_LLM_TURN
  delete process.env.LUCY_CHAT_HISTORY_MAX
  delete process.env.LUCY_FEW_SHOT_MAX
  try {
    assert(isGeminiContextCacheEnabled() === false, 'cache default OFF')
    assert(isGeminiUnifiedLlmTurn() === true, 'unified default ON')
    assert(getGeminiChatHistoryMax() === 6, 'history max default 6')
    assert(getGeminiFewShotMax() === 0, 'few-shot default 0')
    assert(geminiCostControlsSummary().context_cache_env === '0', 'summary cache env')
  } finally {
    for (const [k, v] of Object.entries(prev)) {
      const key =
        k === 'c'
          ? 'GEMINI_CONTEXT_CACHE'
          : k === 'u'
            ? 'LUCY_UNIFIED_LLM_TURN'
            : k === 'h'
              ? 'LUCY_CHAT_HISTORY_MAX'
              : 'LUCY_FEW_SHOT_MAX'
      if (v === undefined) delete process.env[key]
      else process.env[key] = v
    }
  }

  const staticSys = buildStaticSystemPrompt()
  assert(/Bodasesor/i.test(staticSys), 'static mentions Bodasesor')
  assert(!/CONTEXTO DEL TURNO/i.test(staticSys), 'static must not include turn context')
  const dyn = buildDynamicTurnContext({
    catalogSlim: 'mesas tiffany',
    crm: 'ESTADO ACTUAL: lead warm',
    briefing: 'pedir ciudad',
  })
  assert(/CONTEXTO DEL TURNO/i.test(dyn), 'dynamic must mark turn context')

  resetGeminiCallStatsForTests()
  process.env.GEMINI_CONTEXT_CACHE = '0'
  const cOff = await getOrCreateSystemCache({ model: GEMINI_TEXT_MODEL })
  assert(cOff.name === null, 'cache off → no name')
  assert(getGeminiCallStats().contextCacheDisabled >= 1, 'disabled counter')

  process.env.GEMINI_CONTEXT_CACHE = '1'
  const cDyn = await getOrCreateSystemCache({
    model: GEMINI_TEXT_MODEL,
    systemInstruction: 'CONTEXTO DEL TURNO (dinámico)\ncatálogo CRM',
  })
  assert(cDyn.name === null, 'dynamic system must not create cache')
  assert(getGeminiCallStats().contextCacheSkipped >= 1, 'skipped counter')
  process.env.GEMINI_CONTEXT_CACHE = '0'

  const dirty = [
    {
      role: 'user',
      parts: [{ text: 'mira' }, { inlineData: { mimeType: 'image/png', data: 'AAAA' } }],
      mediaDescription: 'Salón azul',
    },
    { role: 'model', text: 'ok' },
    { role: 'user', text: '2' },
    { role: 'model', text: 'a2' },
    { role: 'user', text: '3' },
    { role: 'model', text: 'a3' },
    { role: 'user', text: '4' },
    { role: 'model', text: 'a4' },
    { role: 'user', text: '5' },
    { role: 'model', text: 'a5' },
  ]
  const clean = sanitizeHistoryForApi(dirty, 4)
  assert(clean.length === 4, `trim to 4, got ${clean.length}`)
  const blob = JSON.stringify(clean)
  assert(!blob.includes('inlineData'), 'history must not re-send inlineData')

  const bigPng = await sharp({
    create: { width: 2400, height: 1800, channels: 3, background: { r: 22, g: 32, b: 64 } },
  })
    .png()
    .toBuffer()
  const compressed = await compressImageForGemini(bigPng)
  assert(compressed.stats.savedPercent >= 70, `expected ≥70% save, got ${compressed.stats.savedPercent}`)
  assert(compressed.mimeType === 'image/jpeg', 'must be jpeg')
  assert(
    compressed.stats.widthAfter <= 1024 && compressed.stats.heightAfter <= 1024,
    'must fit 1024',
  )

  return { dirty, bigPng, compressed }
}

async function live(dirty, bigPng) {
  const auth = await getGeminiAuth()
  if (auth.mode !== 'apiKey') {
    return {
      skipped: true,
      reason:
        'Set GEMINI_API_KEY or GEMINI_IA (AI Studio auth key). Service accounts are restricted for Gemini generateContent.',
    }
  }

  process.env.GEMINI_CONTEXT_CACHE = '0'
  resetGeminiCallStatsForTests()
  const chat1 = await geminiChat({ message: 'Hola Bodasesor, cotizar en León', history: [] })
  const chat2 = await geminiChat({
    message: '¿Y barra?',
    history: [
      { role: 'user', text: 'Hola Bodasesor, cotizar en León' },
      { role: 'model', text: chat1.reply },
    ],
  })
  const chatImg = await geminiChat({
    message: 'Foto del salón',
    history: sanitizeHistoryForApi(dirty),
    imageBuffer: bigPng,
  })

  assert(chat1.cost.model === GEMINI_TEXT_MODEL, 'chat model')
  assert(chat1.cost.callsThisTurn === 1, '1 call per turn')
  assert(chat1.cost.cacheFallback === true || chat1.cost.cached === false, 'cache off')
  assert(chatImg.cost.imageCompressed === true, 'imageCompressed')
  assert(chatImg.cost.imageStats.savedPercent >= 70, 'live image save')
  assert(getGeminiCallStats().total === 3, `expected 3 calls, got ${getGeminiCallStats().total}`)

  return {
    skipped: false,
    chat1: chat1.cost,
    chat2: chat2.cost,
    chatImg: chatImg.cost,
    stats: getGeminiCallStats(),
  }
}

async function main() {
  console.log('▶ Gemini cost verify (V9.32-web)')
  const { dirty, bigPng } = await offline()
  console.log('✓ offline checks OK')
  const liveResult = await live(dirty, bigPng)
  if (liveResult.skipped) {
    console.log(`⚠ live skipped: ${liveResult.reason}`)
  } else {
    console.log('✓ live chat OK', JSON.stringify(liveResult.stats, null, 2))
  }
  console.log('✓ verify:gemini-cost passed')
}

main().catch((e) => {
  console.error('✗', e.message || e)
  process.exit(1)
})
