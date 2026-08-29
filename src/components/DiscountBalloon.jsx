import { useEffect, useState, useCallback } from 'react'

const CODE = 'CierreRapido'
const DISCOUNT_PCT = 10
const MIN_GUESTS = 35
const DURATION_MS = 5 * 60 * 60 * 1000
const STORAGE_END = 'bs_cierre_rapido_ends_v2'
const STORAGE_DISMISS = 'bs_cierre_rapido_dismissed_v2'
const WHATSAPP_NUMBER = '5215540080373'
const PROMO_BAR_CLASS = 'has-promo-bar'

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  // Slim bar: show MM:SS when under 1h, else H:MM:SS
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`
  return `${pad(m)}:${pad(s)}`
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
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    const show = () => {
      const end = getOrCreateEnd()
      const left = end - Date.now()
      if (left <= 0) return
      setRemainingMs(left)
      setReady(true)
      setVisible(true)
    }
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: isMobile ? 14000 : 12000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(show, isMobile ? 12000 : 10000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready || !visible) {
      document.documentElement.classList.remove(PROMO_BAR_CLASS)
      return
    }
    document.documentElement.classList.add(PROMO_BAR_CLASS)
    return () => document.documentElement.classList.remove(PROMO_BAR_CLASS)
  }, [ready, visible])

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
      className="discount-promo-bar"
      role="region"
      aria-label={`Descuento ${DISCOUNT_PCT}% por tiempo limitado`}
      data-testid="discount-balloon"
    >
      <div className="discount-promo-bar-inner">
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="discount-promo-cta"
          data-testid="discount-balloon-cotizar"
        >
          Cotizar
        </a>

        <div className="discount-promo-msg">
          <p className="discount-promo-title">
            {DISCOUNT_PCT}% OFF en tu evento · mínimo {MIN_GUESTS} personas
          </p>
          <button
            type="button"
            className="discount-promo-code"
            onClick={copyCode}
            aria-label={`Copiar código ${CODE}`}
          >
            {copied ? '¡Copiado!' : `Código: ${CODE}`}
          </button>
        </div>

        <div className="discount-promo-timer" aria-live="polite" aria-atomic="true">
          <span className="discount-promo-clock" data-testid="discount-countdown">
            {clock}
          </span>
        </div>

        <button
          type="button"
          className="discount-promo-close"
          onClick={dismiss}
          aria-label="Cerrar oferta"
          data-testid="discount-balloon-close"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
