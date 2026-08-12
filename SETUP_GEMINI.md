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

## Verificar

```bash
node scripts/verify-gemini-cost-optim.mjs
```

Esperado: turno1 `cached:true`; turno2 `cacheReused:true`; con imagen `imageCompressed:true` y ≥70% menos bytes.
