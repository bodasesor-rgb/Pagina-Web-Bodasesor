import { useEffect } from 'react'
import CityLink from './CityLink'
import { absoluteUrl, upsertJsonLd } from '../utils/seo-head'

const JSONLD_ID = 'bodasesor-breadcrumb-jsonld'
const Link = CityLink

/**
 * @param {{ items: Array<{ name: string, href?: string }>, variant?: 'light' | 'dark' | 'muted', className?: string }} props
 * items: last item is current page (no href or inactive)
 */
export function buildBreadcrumbList(items) {
  const list = (items || []).filter((i) => i?.name)
  if (list.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((item, index) => {
      const entry = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      }
      if (item.href) entry.item = absoluteUrl(item.href)
      return entry
    }),
  }
}

export default function Breadcrumbs({ items = [], variant = 'dark', className = '' }) {
  const list = items.filter((i) => i?.name)

  useEffect(() => {
    upsertJsonLd(JSONLD_ID, buildBreadcrumbList(list))
    return () => upsertJsonLd(JSONLD_ID, null)
  }, [JSON.stringify(list)])

  if (list.length < 2) return null

  const styles = {
    dark: {
      wrap: 'text-sm text-white/60 font-serif',
      link: 'hover:text-white transition-colors',
      current: 'text-white/80',
      sep: 'text-white/40',
    },
    light: {
      wrap: 'text-sm text-gray-600 font-serif',
      link: 'hover:text-[#162040] hover:underline transition-colors',
      current: 'text-[#162040] font-bold',
      sep: 'text-gray-400',
    },
    muted: {
      wrap: 'text-xs text-[#8a9bb5] font-serif',
      link: 'hover:text-white transition-colors',
      current: 'text-white/80',
      sep: 'text-[#8a9bb5]/70',
    },
  }[variant] || {
    wrap: 'text-sm text-white/60 font-serif',
    link: 'hover:text-white transition-colors',
    current: 'text-white/80',
    sep: 'text-white/40',
  }

  return (
    <nav aria-label="Migas de pan" className={`${styles.wrap} ${className}`.trim()}>
      <ol className="flex items-center gap-2 flex-wrap list-none m-0 p-0">
        {list.map((item, index) => {
          const isLast = index === list.length - 1
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
              {!isLast && item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
