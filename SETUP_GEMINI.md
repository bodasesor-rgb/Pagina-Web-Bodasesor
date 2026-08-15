# Conectar Gemini (contenido + chat, costo mínimo)

## Dónde guardar los modelos / parámetros

**Archivo canónico:** `scripts/lib/gemini-config.mjs`

Ahí viven:
- `GEMINI_TEXT_MODEL` = `gemini-3.1-flash-lite` (texto / chat / copy)
- `GEMINI_IMAGE_MODEL` = `imagen-4.0-fast-generate-001` (solo si hay que generar imagen)
- TTL de caché, tamaño JPEG, modelos bloqueados (`2.5-flash` / `2.0-flash`)

No hardcodees modelos en otros archivos: importa desde ese config.

Overrides opcionales por env (secrets del Cloud Agent / Netlify):

| Secret | Uso |
|--------|-----|
| `GEMINI_API_KEY` o `GEMINI_IA` | **Obligatorio para chat/generate** — auth key de [AI Studio](https://aistudio.google.com/apikey) (las service accounts están restringidas en Gemini API) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Solo GSC / otros Google APIs — **no** alcanza para generateContent |
| `GEMINI_MODEL` | Override texto (default flash-lite) |
| `GEMINI_IMAGE_MODEL` | Override imagen |
| `GEMINI_CACHE_TTL` | Segundos (default 3600) |
| `GEMINI_CONTEXT_CACHE` | `0` default — no `cachedContents` |
| `LUCY_UNIFIED_LLM_TURN` | `1` default — 1 call/turn |
| `LUCY_CHAT_HISTORY_MAX` | `6` default |
| `LUCY_FEW_SHOT_MAX` | `0` default |

Si hay `GEMINI_API_KEY` / `GEMINI_IA`, **no** uses OpenAI.

## Optimizaciones de costo (V9.32-web / Lucy parity)

1. **Explicit context caching OFF por defecto** — `GEMINI_CONTEXT_CACHE=0`  
   `getOrCreateSystemCache()` solo crea `cachedContents` si `=1` **y** el system es estático  
   (`buildStaticSystemPrompt()`). Catálogo/CRM/“CONTEXTO DEL TURNO” → nunca cachear.
2. **1 llamada por turno de chat** — `geminiChat()` = un solo `generateContent`.  
   Contador `cost.callsThisTurn: 1`.
3. **Historial limpio + trim** — `sanitizeHistoryForApi()` + `LUCY_CHAT_HISTORY_MAX=6`  
   Solo texto + `mediaDescription`; nunca reenviar `inlineData` viejo.
4. **Imágenes** — `compressImageForGemini()` max 1024² JPEG q80; gen de imagen bloqueada  
   salvo `GEMINI_ALLOW_IMAGE_GEN=1`.
5. **Modelo** — solo `gemini-3.1-flash-lite`. Pro / Imagen / Nano Banana bloqueados.

Health: `GET /.netlify/functions/gemini-health`  
(`unified_llm_turn`, `chat_history_max`, `few_shot_max`, `context_cache_env`, `gemini_call_stats`).

## Chat endpoint

`POST /.netlify/functions/gemini-chat`

Body: `{ message, history, imageBase64? }`  
Respuesta: `{ reply, mediaDescription, cost: { cached, cacheReused, imageCompressed, imageStats, model } }`

Cliente: `src/lib/gemini-chat-client.js` (`sendGeminiChat`) — persiste `mediaDescription`.

## Generar copy hub×ciudad

```bash
npm run generate:city-content -- --hub=banquetes
npm run verify:gemini-cost
```

## Estructura de contenido hub×ciudad (schema v2)

Archivo: `src/data/city-hub-schema.js` + `src/data/city-hub-content.json`

Campos: `h1`, `sectionTitle` (≠ h1), `headline`, `description[3]`, `seoTitle`≤60,
`seoDescription` 120–155, `primaryKeyword`, `zones[]`, `localBullets[]`, `faqs[3]`.

### Dónde se verifica
```bash
npm run verify:city-hub-seo           # longitudes + unicidad + FAQs
npm run verify:city-hub-seo -- --require-v2   # exige schemaVersion ≥ 2
```

Lighthouse SEO 100 (técnico) ya lo dan title/meta/canonical/robots/H1 en prerender.
Este schema suma **contenido único + FAQ/Service JSON-LD** (ranking), no solo el score Lighthouse.

### Sobrescribir todo tras mejorar estructura
```bash
npm run generate:city-content -- --hub=banquetes --force
# o varios hubs
npm run generate:city-content -- --hub=banquetes,barras-de-bebidas,mesas-sillas --force
npm run verify:city-hub-seo -- --require-v2
```

Entradas v1 se regeneran automáticamente (schemaVersion < 2) sin `--force`.
`--force` regenera aunque ya estén en v2.
