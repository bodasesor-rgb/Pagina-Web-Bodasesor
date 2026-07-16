import { useEffect, useRef } from 'react'
import { useLocation } from 'wouter'

const GA_ID = 'G-6VGGKNB77P'

/**
 * Sends a GA4 page_view on every SPA route change.
 * Initial page_view comes from the gtag config in index.html.
 */
export default function GoogleAnalytics() {
  const [location] = useLocation()
  const prevPath = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    const path = location || '/'
    // Skip duplicate of the first config page_view for the landing URL
    if (prevPath.current === null) {
      prevPath.current = path
      return
    }
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
