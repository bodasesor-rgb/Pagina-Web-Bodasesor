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

Si hay `GEMINI_API_KEY` / `GEMINI_IA`, **no** uses OpenAI.

## Optimizaciones de costo (obligatorias)

1. **Explicit context caching** — `getOrCreateSystemCache()` en `scripts/lib/gemini.mjs`  
   Corpus: `scripts/lib/gemini-brand-corpus.mjs` (≥ ~4096 tokens).  
   Mismo modelo que `generateContent` (`gemini-3.1-flash-lite`).  
   Fallback: `systemInstruction` **corto** (no se reenvía el corpus).  
   **Nota:** en free tier a veces `TotalCachedContentStorageTokensPerModelFreeTier limit=0`.  
   Activa facturación en el proyecto GCP / usa key con cuota de cache para ver `cached:true` / `cacheReused:true`.
2. **Historial limpio** — `sanitizeHistoryForApi()` + `src/lib/gemini-chat-client.js`  
   Solo texto + `mediaDescription`; nunca reenviar `inlineData` viejo.
3. **Imágenes** — `compressImageForGemini()` max 1024² JPEG q80 antes del HTTP.

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
