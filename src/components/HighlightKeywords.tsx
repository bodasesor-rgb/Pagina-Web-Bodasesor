import { Fragment } from 'react'

/**
 * Wrap keyword occurrences in <strong> (case-insensitive, longest-first).
 * Safe for plain text (no HTML in input).
 */
export function HighlightKeywords({
  text,
  keywords = [],
  className = 'font-bold text-[#162040]',
}) {
  const source = String(text || '')
  if (!source || !keywords?.length) return <>{source}</>

  const escaped = keywords
    .filter(Boolean)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (!escaped.length) return <>{source}</>

  const re = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = source.split(re)

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        const hit = keywords.some((k) => k.toLocaleLowerCase('es-MX') === part.toLocaleLowerCase('es-MX'))
        if (hit) {
          return (
            <strong key={i} className={className}>
              {part}
            </strong>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
