import { useEffect } from 'react'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bodasesor.com/#organization',
      name: 'Bodasesor Eventos',
      url: 'https://bodasesor.com/',
      logo: 'https://bodasesor.com/favicon.svg',
      description:
        'Banquetes, catering gourmet, mobiliario y servicios integrales para bodas, quinceañeras y eventos corporativos en México.',
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
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://bodasesor.com/buscar?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
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
        'Proveedor de banquetes, catering, mobiliario, música, fotografía y wedding planner para eventos en México.',
    },
  ],
}

export default function HomeJsonLd() {
  useEffect(() => {
    const id = 'bodasesor-jsonld'
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(JSON_LD)
    return () => el?.remove()
  }, [])
  return null
}
