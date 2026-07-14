# Deploy rules — Bodasesor SPA + Nexus SEO

## Never wipe Nexus SEO landings

Production publish **must** use:

```bash
npm run build:nexus
# then
npx netlify-cli deploy --prod --dir=dist --no-build
```

Do **not** publish with bare `npm run build` / `vite build`.

Canonical script: `scripts/netlify-build-nexus.mjs`  
GitHub Actions workflow: `.github/workflows/deploy-netlify.yml`  
Netlify auto-builds are skipped (`ignore = "exit 0"` in `netlify.toml`) so only Actions publishes.

After deploy: `npm run verify:nexus`
