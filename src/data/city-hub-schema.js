/**
 * City hub×city content schema (SEO + SPA).
 * schemaVersion 2 — regenerate with --force after changing this contract.
 *
 * Verified by: scripts/verify-city-hub-seo.mjs
 * Written by: scripts/generate-city-hub-content.mjs
 * Consumed by: ServicePage + collect-spa-seo-entries (prerender shells)
 */

export const CITY_HUB_SCHEMA_VERSION = 2

/** Soft SEO length targets (Lighthouse + SERP). */
export const CITY_HUB_SEO_LIMITS = Object.freeze({
  seoTitleMax: 60,
  seoDescriptionMin: 120,
  seoDescriptionMax: 155,
  h1Max: 70,
  headlineMax: 140,
  descriptionParagraphs: 3,
  localBulletsMin: 3,
  localBulletsMax: 5,
  faqsExact: 3,
  zonesMin: 2,
  zonesMax: 4,
})

/**
 * Normalize / backfill a record to schema v2 (safe for v1 entries).
 * @param {object|null} raw
 * @param {{ hub?: string, city?: string, cityName?: string }} [ctx]
 */
export function normalizeCityHubContent(raw, ctx = {}) {
  if (!raw || typeof raw !== 'object') return null
  const cityName = ctx.cityName || ''
  const h1 = String(raw.h1 || '').trim()
  let sectionTitle = String(raw.sectionTitle || '').trim()
  if (!sectionTitle && h1) {
    sectionTitle = cityName
      ? `Cotiza ${h1.includes(cityName) ? h1 : `${h1} en ${cityName}`}`.slice(0, 90)
      : 'Detalle del servicio y cotización'
    // Ensure ≠ h1
    if (sectionTitle === h1) sectionTitle = `${h1}: opciones y cotización`
  }

  return {
    schemaVersion: Number(raw.schemaVersion) || 1,
    h1,
    sectionTitle,
    headline: String(raw.headline || '').trim(),
    description: Array.isArray(raw.description)
      ? raw.description.map((s) => String(s).trim()).filter(Boolean)
      : [],
    seoTitle: String(raw.seoTitle || '').trim(),
    seoDescription: String(raw.seoDescription || '').trim(),
    primaryKeyword: String(raw.primaryKeyword || '').trim(),
    zones: Array.isArray(raw.zones)
      ? raw.zones.map((s) => String(s).trim()).filter(Boolean)
      : [],
    localBullets: Array.isArray(raw.localBullets)
      ? raw.localBullets.map((s) => String(s).trim()).filter(Boolean)
      : [],
    faqs: Array.isArray(raw.faqs)
      ? raw.faqs
          .map((f) => ({
            q: String(f?.q || f?.question || '').trim(),
            a: String(f?.a || f?.answer || '').trim(),
          }))
          .filter((f) => f.q && f.a)
      : [],
    hub: raw.hub || ctx.hub || null,
    city: raw.city || ctx.city || null,
    generatedAt: raw.generatedAt || null,
    model: raw.model || null,
  }
}

export function isCityHubSchemaCurrent(raw) {
  return Number(raw?.schemaVersion) >= CITY_HUB_SCHEMA_VERSION
}
