# Deploy rules — Bodasesor SPA + Nexus SEO

## Phase 1
- Canonical inventory: **1402** landings (`scripts/seo-landing-slugs.json`).
- ~13k Hostinger scale = **Phase 2** (pending Nexus confirmation).
- Default `MIN_NEXUS_LANDINGS=1200` (env override).

## Never wipe Nexus / never SPA-only

```bash
npm run build:nexus          # sync + SPA + merge + Gate A
npm run verify:dist-bundle   # Gate A explicit
```

Preview (PR) must include SEO the same as prod. Workflow:
`.github/workflows/netlify-deploy-preview.yml` (draft/alias — **not** `--prod`).

Gate B against a preview URL:

```bash
PREVIEW_URL=https://….netlify.app node scripts/verify-preview-spa-and-nexus.mjs
```

Do **not** merge to `main` / deploy `--prod` until Gates A+B pass.
