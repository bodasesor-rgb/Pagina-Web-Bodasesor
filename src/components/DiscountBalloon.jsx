import { useEffect, useState, useCallback } from 'react'

const CODE = 'CierreRapido'
const DISCOUNT_PCT = 10
const MIN_GUESTS = 35
const DURATION_MS = 5 * 60 * 60 * 1000
const STORAGE_END = 'bs_cierre_rapido_ends_v2'
const STORAGE_DISMISS = 'bs_cierre_rapido_dismissed_v2'
const WHATSAPP_NUMBER = '5215540080373'

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function formatLocalDateTime(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/Mexico_City',
    }).format(date)
  } catch {
    return date.toLocaleString('es-MX')
  }
}

function getOrCreateEnd() {
  try {
    const raw = sessionStorage.getItem(STORAGE_END)
    const parsed = raw ? Number(raw) : NaN
    if (Number.isFinite(parsed) && parsed > Date.now()) return parsed
    const end = Date.now() + DURATION_MS
    sessionStorage.setItem(STORAGE_END, String(end))
    return end
  } catch {
    return Date.now() + DURATION_MS
  }
}

function wasDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_DISMISS) === '1'
  } catch {
    return false
  }
}

function buildWhatsAppUrl() {
  const when = formatLocalDateTime()
  const text = [
    `Hola, escribo por la promo de cierre rápido (${DISCOUNT_PCT}% de descuento).`,
    `Código: ${CODE}`,
    `Pedido mínimo: ${MIN_GUESTS} personas.`,
    `Horario en que envío este mensaje: ${when} (hora Ciudad de México).`,
    'Me gustaría cotizar un evento.',
  ].join('\n')
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`
}

export default function DiscountBalloon() {
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [remainingMs, setRemainingMs] = useState(DURATION_MS)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (wasDismissed()) return
    const show = () => {
      const end = getOrCreateEnd()
      const left = end - Date.now()
      if (left <= 0) return
      setRemainingMs(left)
      setReady(true)
      setVisible(true)
    }
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: 3500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(show, 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready || !visible) return
    const tick = () => {
      try {
        const end = Number(sessionStorage.getItem(STORAGE_END) || 0)
        const left = end - Date.now()
        if (left <= 0) {
          setRemainingMs(0)
          setVisible(false)
          return
        }
        setRemainingMs(left)
      } catch {
        setRemainingMs((prev) => Math.max(0, prev - 1000))
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [ready, visible])

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_DISMISS, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }, [])

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  if (!visible || remainingMs <= 0) return null

  const clock = formatRemaining(remainingMs)

  return (
    <aside
      className="discount-balloon"
      role="dialog"
      aria-label={`Descuento ${DISCOUNT_PCT}% por tiempo limitado`}
      data-testid="discount-balloon"
    >
      <button
        type="button"
        className="discount-balloon-close"
        onClick={dismiss}
        aria-label="Cerrar oferta"
        data-testid="discount-balloon-close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <p className="discount-balloon-eyebrow">Promo · cierre rápido</p>
      <p className="discount-balloon-title">
        <span className="discount-balloon-pct">{DISCOUNT_PCT}%</span> de descuento
      </p>
      <p className="discount-balloon-sub">
        Pedido mínimo {MIN_GUESTS} personas. Válido solo mientras corre el reloj.
      </p>

      <div className="discount-balloon-timer" aria-live="polite" aria-atomic="true">
        <span className="discount-balloon-timer-label">Expira en</span>
        <span className="discount-balloon-clock" data-testid="discount-countdown">
          {clock}
        </span>
      </div>

      <button
        type="button"
        className="discount-balloon-code"
        onClick={copyCode}
        aria-label={`Copiar código ${CODE}`}
      >
        <span className="discount-balloon-code-label">{copied ? '¡Copiado!' : 'Código'}</span>
        <span className="discount-balloon-code-value">{CODE}</span>
      </button>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="discount-balloon-cta"
        data-testid="discount-balloon-cotizar"
      >
        Cotizar
      </a>
    </aside>
  )
}
