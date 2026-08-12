/**
 * Browser/client helper for Gemini chat.
 * Persists mediaDescription; NEVER re-sends past image/audio bytes.
 *
 * Models are server-side (`scripts/lib/gemini-config.mjs`).
 */

/**
 * @typedef {{ role: 'user'|'model', text: string, mediaDescription?: string }} ChatTurn
 */

/**
 * Build API history from local turns (text + mediaDescription only).
 * @param {ChatTurn[]} turns
 */
export function toApiHistory(turns) {
  return (turns || []).map((t) => ({
    role: t.role === 'model' ? 'model' : 'user',
    text: t.text || '',
    ...(t.mediaDescription ? { mediaDescription: t.mediaDescription } : {}),
  }))
}

/**
 * Append a completed turn. If the server returned mediaDescription, store it
 * on the user turn that carried the image — never keep base64 in state.
 */
export function appendTurn(turns, { role, text, mediaDescription }) {
  const next = [...(turns || [])]
  next.push({
    role,
    text: text || '',
    ...(mediaDescription ? { mediaDescription } : {}),
  })
  return next
}

/**
 * @param {{
 *   message: string,
 *   turns: ChatTurn[],
 *   imageFile?: File|Blob|null,
 *   endpoint?: string,
 * }} opts
 */
export async function sendGeminiChat({
  message,
  turns,
  imageFile = null,
  endpoint = '/.netlify/functions/gemini-chat',
}) {
  /** @type {Record<string, any>} */
  const body = {
    message,
    history: toApiHistory(turns),
  }

  if (imageFile) {
    const buf = await imageFile.arrayBuffer()
    // Send bytes ONLY for this turn; server compresses. Do not keep in turns.
    const bytes = new Uint8Array(buf)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    body.imageBase64 = btoa(binary)
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `chat HTTP ${res.status}`)

  let next = appendTurn(turns, {
    role: 'user',
    text: message,
    mediaDescription: data.mediaDescription || undefined,
  })
  next = appendTurn(next, { role: 'model', text: data.reply })

  return {
    reply: data.reply,
    mediaDescription: data.mediaDescription || null,
    cost: data.cost,
    turns: next,
  }
}
