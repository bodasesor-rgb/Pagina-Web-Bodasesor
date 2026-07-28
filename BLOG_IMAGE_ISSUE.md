# Blog Image Issue — Action Required from Nexus

## Problem
Blog HTML is being synced to bodasesor.com but **blog images are NOT being deployed**:
- ✅ Blog HTML exists in `dist/blog/*/index.html`
- ❌ Blog images missing from `dist/blog/*/` folders
- ❌ Blog images NOT in `.netlify-live/blog/`

## Current State
```
/dist/blog/bodasesor-ideas-de-negocios/index.html       ← EXISTS
/dist/blog/bodasesor-ideas-de-negocios/*.webp            ← MISSING
```

## Root Cause
When Nexus (at https://white-ferret-567834.hostingersite.com) generates blogs:
1. HTML is generated and synced to bodasesor.com ✅
2. Images are generated but stay on Hostinger ❌
3. HTML references images as `/blog/slug/image.webp` (relative paths)
4. These paths resolve to bodasesor.com but files don't exist

## Blog HTML References Images Like:
```html
<img src="/blog/bodasesor-ideas-de-negocios-rentables/bodasesor-ideas-de-negocios-rentables.webp">
<!-- This expects the file at bodasesor.com/blog/bodasesor-ideas-de-negocios-rentables/bodasesor-ideas-de-negocios-rentables.webp -->
```

## Solution Options (for Nexus team)

### Option 1: Copy images to bodasesor.com
- Generate images in Nexus output folder
- Include them in the blog sync/deploy to bodasesor.com
- Netlify preserves `/blog/` folder so images won't be lost

### Option 2: Use absolute URLs
- Change HTML to reference: `https://white-ferret-567834.hostingersite.com/blog/.../image.webp`
- No need to copy; serve directly from Hostinger

### Option 3: Upload to CDN
- Upload blog images to a CDN (S3, etc.)
- Reference CDN URLs in blog HTML

## Current Protections in Place
✅ `netlify-preserve.json` protects `/blog/` from being wiped by SPA
✅ `merge-live-into-dist.mjs` preserves blog files from `.netlify-live`
✅ `guard-blogs-dist.mjs` fails build if blogs are missing

**Once images are deployed by Nexus, bodasesor.com will protect them.**

## Timeline
- **2026-07-28**: Issue identified - Blog images not being synced
- **Action Required**: Nexus team must include images in blog deployment
