import { useEffect, useRef } from 'react'
import { useLocation } from 'wouter'

const GA_ID = 'G-6VGGKNB77P'

/**
 * Sends a GA4 page_view on initial load and every SPA route change.
 * index.html configures gtag with send_page_view: false so we own all hits.
 */
export default function GoogleAnalytics() {
  const [location] = useLocation()
  const prevPath = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    const path = location || '/'
    if (prevPath.current === path) return
    prevPath.current = path

    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    })
  }, [location])

  return null
}
