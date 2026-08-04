# Arquitectura A — Armonía Web ↔ Nexus (Fase 3)

## Modelo (no negociable)

```
Hostinger (NEXUS_URL)  =  fuente de verdad de landings SEO + CSS + blogs/imágenes
Pagina-Web-Bodasesor   =  único publisher a Netlify producción (build:nexus + gates)
Seo-Nexus-2.0          =  genera contenido en Hostinger; NO debe reemplazar el site entero
```

## Qué hace la web (este repo)

1. `npm run build:nexus` trae landings/CSS/blogs/imágenes desde Hostinger.
2. Fusiona con la SPA.
3. Finaliza `sitemap.xml` con SPA + landings en `dist/` + blogs (incluye landings NUEVAS).
4. Gate A (dist) y Gate B (URL publicada) exigen: SPA + ≥1200 landings + CSS + blogs + imágenes + sitemap.

## Qué debe hacer Nexus (Seo-Nexus-2.0)

### Preferido (más seguro)
- Publicar landings nuevas **solo a Hostinger**.
- No llamar `publishSeoLandingsOnly` / deploy directo a Netlify.
- La web re-builda (`build:nexus`) y publica el site completo.

### Si Nexus DEBE publicar a Netlify (excepcional)
1. Partir del **deploy de producción actual** (el que ya tiene SPA + landings + CSS).
2. Solo **añadir/actualizar** archivos de landings (incremental). Nunca deploy vacío ni “solo carpetas SEO”.
3. Incluir siempre `css/seo-landing.css` (y assets compartidos) si faltan.
4. **No tocar** `index.html`, `/assets/*`, `_redirects` de la SPA, ni borrar blogs/`public/blog`.
5. Tras publicar: Gate B equivalente — home SPA + smoke landings + CSS `text/css` + sitemap con las URLs nuevas.
6. Si el check falla → **rollback** al deploy anterior.

### Sitemap / landings nuevas
- Cada landing nueva en Hostinger debe existir como HTML rico (`seo-service-hero`).
- En el próximo `build:nexus` de la web:
  - se fusiona a `dist/`
  - `finalize-sitemap.mjs` la mete en `sitemap.xml`
  - opcionalmente amplía `scripts/seo-landing-slugs.json` (solo slugs Nexus reales)
- Nexus puede empujar un PR a este repo actualizando `seo-landing-slugs.json` + HTML seed, pero **el publish a prod sigue siendo de la web**.

### Imágenes de blog
- Preferir sibling paths: `/blog/{slug}/{slug}.webp` (y `-inline-*.webp`).
- También `public/images/blog/*` si el HTML las referencia.
- Deben vivir en Hostinger; la web las baja con `sync-blog-images-from-nexus.mjs`.

## Concurrencia
- No publicar Nexus→Netlify al mismo tiempo que `Deploy to Netlify` de este repo.
- Si hace falta publish paralelo: cola + lock, o desactivar el publish de Nexus.

## Verificación rápida (prod)

```bash
PREVIEW_URL=https://bodasesor.com node scripts/verify-preview-spa-and-nexus.mjs
curl -sI -A 'BodasesorNexusVerify/1.0' https://bodasesor.com/css/seo-landing.css | head
curl -s -A 'BodasesorNexusVerify/1.0' https://bodasesor.com/sitemap.xml | grep -c '<loc>'
```
