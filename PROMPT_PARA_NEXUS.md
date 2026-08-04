# Prompt para Seo-Nexus-2.0 (copiar/pegar)

```
Contexto — Arquitectura A (ya en producción en Pagina-Web-Bodasesor):

La web es el ÚNICO publisher a Netlify producción vía `npm run build:nexus`
(trae landings/CSS/blogs/imágenes desde Hostinger NEXUS_URL, fusiona con la SPA,
finaliza sitemap, y solo publica si Gate A/B pasan: SPA + ≥1200 landings +
seo-landing.css + blogs + imágenes de blog + sitemap).

Hostinger (https://white-ferret-567834.hostingersite.com) es la fuente de verdad
de landings SEO. Este repo (Seo-Nexus-2.0) genera ahí. La web lee de ahí.

Problema a resolver (Fase 3 — armonía, sin rearquitecturar):

1) Publish paralelo: si existe `publishSeoLandingsOnly` (u otro deploy Nexus→Netlify),
   debe convivir SIN borrar la SPA ni landings previas ni CSS.
2) Sitemap: las landings Nexus (y las NUEVAS) deben aparecer en
   https://bodasesor.com/sitemap.xml. La web ya finaliza el sitemap desde dist/
   tras el merge; Nexus debe asegurar que cada landing nueva exista en Hostinger
   como HTML rico (seo-service-hero) y, si aplica, actualizar el inventario.

SIN cambiar nada todavía, responde con diagnóstico concreto del código actual:

A) Cuando Nexus publica landings nuevas hoy, ¿parte del deploy de producción
   ACTUAL (con SPA) y solo añade/actualiza, o puede dejar el site sin SPA / sin
   landings previas / sin css/seo-landing.css?

B) ¿Qué pasa si Nexus publica JUSTO cuando la web acaba de hacer build:nexus?
   ¿Se pueden pisar? ¿Hay lock/cola?

C) ¿El publish de Nexus incluye css/seo-landing.css + assets, o asume que ya
   están por el build de la web?

D) Lista el ajuste mínimo para garantizar SIEMPRE: SPA + todas las landings +
   CSS + blogs/imágenes. Preferencia de la web:
   - Ideal: Nexus DEJA de publicar a Netlify; solo publica a Hostinger; la web
     re-builda y publica.
   - Alternativa: publish incremental desde el deploy prod actual + post-check
     Gate B + rollback si falla. Nunca deploy parcial/vacío.

Además, para sitemap y landings nuevas (acción cuando implementes):

E) Confirma el path en Hostinger de cada landing nueva (HTML con seo-service-hero).
F) Si mantenéis inventario en Pagina-Web-Bodasesor
   (`scripts/seo-landing-slugs.json`), propon cómo empujar slugs nuevos (PR a ese
   repo) SIN hacer deploy SPA-only ni tocar dist/ a mano.
G) Imágenes de blog: deben vivir en Hostinger en
   `/blog/{slug}/{slug}.webp` (y las inline que referencie el HTML). La web las
   sincroniza a public/blog/ en build:nexus.

No cambies código aún en este diagnóstico. Primero el informe A–G con archivos
y funciones reales. Después propone el PR mínimo de cambios.
```
