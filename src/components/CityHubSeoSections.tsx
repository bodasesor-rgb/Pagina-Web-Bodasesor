import type { ReactNode } from 'react'
import HighlightKeywords from '../components/HighlightKeywords'

type Faq = { q: string; a: string }

type CityHubSeoSectionsProps = {
  cityName?: string | null
  displaySectionTitle?: string | null
  keywords: string[]
  description?: string[]
  localBullets?: string[]
  faqs?: Faq[]
  /** Fallback paragraph when there is no city/national description yet */
  fallback?: ReactNode
}

/**
 * Shared SEO body + FAQ block for category hub pages (same pattern as WeddingPage).
 */
export default function CityHubSeoSections({
  cityName,
  displaySectionTitle,
  keywords,
  description,
  localBullets,
  faqs,
  fallback,
}: CityHubSeoSectionsProps) {
  const hasDesc = Array.isArray(description) && description.length > 0
  const hasBullets = Array.isArray(localBullets) && localBullets.length > 0
  const hasFaqs = Array.isArray(faqs) && faqs.length > 0

  return (
    <>
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          {hasDesc ? (
            <>
              {displaySectionTitle ? (
                <h2 className="text-xl font-serif font-bold text-[#162040]">{displaySectionTitle}</h2>
              ) : null}
              {description!.map((para) => (
                <p key={para.slice(0, 32)}>
                  <HighlightKeywords text={para} keywords={keywords} />
                </p>
              ))}
              {hasBullets ? (
                <ul className="list-disc pl-5 space-y-1">
                  {localBullets!.map((b) => (
                    <li key={b}>
                      <HighlightKeywords text={b} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <>
              {fallback}
              {hasBullets ? (
                <ul className="list-disc pl-5 space-y-1">
                  {localBullets!.map((b) => (
                    <li key={b}>
                      <HighlightKeywords text={b} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {!fallback && cityName ? (
                <p>
                  Disponible en <strong className="text-[#162040]">{cityName}</strong> y área metropolitana.
                </p>
              ) : null}
            </>
          )}
        </div>
      </section>

      {hasFaqs ? (
        <section className="py-10 px-4 bg-[#faf7f2] border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-4">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs!.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-[#162040]/10 bg-white px-5 py-4"
                >
                  <summary className="cursor-pointer font-serif font-bold text-[#162040] list-none flex items-start justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="text-[#162040]/50 group-open:rotate-45 transition-transform text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 font-serif text-sm leading-relaxed">
                    <HighlightKeywords text={f.a} keywords={keywords} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
