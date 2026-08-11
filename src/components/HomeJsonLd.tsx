import { useEffect } from 'react'

/** Keep in sync with static JSON-LD in index.html (crawler-visible without JS). */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bodasesor.com/#organization',
      name: 'Bodasesor Eventos',
      alternateName: 'bodasesor.com',
      url: 'https://bodasesor.com/',
      logo: 'https://bodasesor.com/favicon.svg',
      description:
        'Productora de eventos integrales: banquetes, catering, mobiliario y coordinación completa para bodas, quinceañeras y eventos corporativos en México.',
      telephone: '+52-55-4008-0373',
      sameAs: [
        'https://www.facebook.com/bodasesor',
        'https://www.instagram.com/bodasesor',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bodasesor.com/#website',
      url: 'https://bodasesor.com/',
      name: 'Bodasesor Eventos',
      publisher: { '@id': 'https://bodasesor.com/#organization' },
      inLanguage: 'es-MX',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://bodasesor.com/#localbusiness',
      name: 'Bodasesor Eventos',
      url: 'https://bodasesor.com/',
      telephone: '+52-55-4008-0373',
      priceRange: '$$',
      areaServed: { '@type': 'Country', name: 'México' },
      description:
        'Productora de eventos con banquetes, catering, mobiliario y producción integral para celebraciones en México.',
    },
  ],
}

export default function HomeJsonLd() {
  useEffect(() => {
    const id = 'bodasesor-jsonld'
    let el = document.getElementById(id) as HTMLScriptElement | null
    // Prefer the static <head> copy from index.html for first paint / crawlers.
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(JSON_LD)
    // Do not remove on unmount — other routes clear page schema via GlobalSEO;
    // org graph stays site-wide.
  }, [])
  return null
}
