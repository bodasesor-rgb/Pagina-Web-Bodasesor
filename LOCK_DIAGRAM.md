# Diagrama: El Candado Abierto

## ANTES (Todo Bloqueado)

```
Nexus quiere hacer push
        ↓
public/images/blog/*.webp
        ↓
❌ .gitignore dice: "public/images/**/*.webp" (bloqueado)
        ↓
Las imágenes NO se commitean
```

---

## AHORA (Blog Images Permitidas)

```
┌─────────────────────────────────────────────────────────────────┐
│  BODASESOR.COM - CANDADO ACTUALIZADO                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  .gitignore:                                                    │
│  ├─ ❌ public/images/**/*.webp       (bloqueado)               │
│  └─ ✅ !public/images/blog/**/*.{webp,jpg,png}  (ABIERTO)     │
│                                                                  │
│  netlify-preserve.json:                                         │
│  ├─ "css/"                                                      │
│  ├─ "blog/"                                                     │
│  ├─ "public/images/blog/"            ← NUEVA PROTECCIÓN       │
│  └─ ... (otras rutas)                                           │
│                                                                  │
│  merge-live-into-dist.mjs:                                      │
│  └─ if (path.startsWith('public/images/blog/'))               │
│     return PRESERVE_ALWAYS            ← DOBLE PROTECCIÓN       │
│                                                                  │
│  guard-blog-images-dist.mjs:                                    │
│  └─ Verifica: ✓ Imágenes existen en dist/                     │
│              ✓ No se perdieron en el build                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
        ↓
Nexus puede hacer push
        ↓
public/images/blog/*.{webp,jpg,png}
        ↓
✅ .gitignore PERMITE (excepción)
        ↓
git add public/images/blog/**/*
        ↓
✅ GitHub tiene las imágenes
        ↓
GitHub Actions:
  - npm run build
  - sync-blogs-from-live (trae de .netlify-live)
  - merge-live-into-dist (preserva blog images)
  - guard-blog-images-dist (verifica)
        ↓
✅ Netlify Deploy (dist/ con imágenes)
        ↓
✅ bodasesor.com → Blogs con imágenes visibles
```

---

## Comparativa: Capas de Protección

| Capa | ANTES | AHORA |
|------|-------|-------|
| **Git** | ❌ Bloqueado | ✅ Permitido (`public/images/blog/**/*`) |
| **Merge Config** | - | ✅ Protegido (`netlify-preserve.json`) |
| **Merge Logic** | - | ✅ Protegido (`isPreservedPath()`) |
| **Build Guard** | - | ✅ Verificado (`guard-blog-images-dist.mjs`) |

---

## Flujo Nexus → bodasesor.com

```
1. NEXUS (seo-nexus-2.0)
   ├─ Genera blog HTML → blog/*.html
   └─ Genera imágenes → public/images/blog/*.{webp,jpg,png}
                             ↓
2. GIT COMMIT (ahora permitido)
   ├─ git add public/images/blog/**/*
   ├─ git commit -m "feat: blog images"
   └─ git push origin main
                             ↓
3. BODASESOR.COM (Pagina-Web-Bodasesor)
   ├─ GitHub Actions dispara
   ├─ npm run build
   ├─ sync-blogs-from-live
   │  └─ Trae blogs de .netlify-live (desde Netlify)
   ├─ merge-live-into-dist
   │  ├─ Copia public/images/blog/ (PRESERVADO)
   │  ├─ Copia blog/ (PRESERVADO)
   │  └─ Copia nexus-output-pages/ (PRESERVADO)
   ├─ guard-blog-images-dist (verifica imágenes)
   ├─ guard-blogs-dist (verifica blogs)
   └─ npm run build:dist → build final
                             ↓
4. NETLIFY DEPLOY
   └─ deploy dist/ → bodasesor.com
                             ↓
5. BODASESOR.COM (Producción)
   ├─ /blog/ con HTML ✓
   ├─ /public/images/blog/ con imágenes ✓
   └─ Todo visible para usuarios ✓
```

---

## ¿Qué Pasaba Antes?

```
Nexus intenta:  git add public/images/blog/*.webp
                     ↓
              .gitignore dice: ❌ NO
                     ↓
              Las imágenes nunca llegan a GitHub
                     ↓
              bodasesor.com no las obtiene
                     ↓
              Los blogs se ven sin imágenes 😞
```

---

## ¿Qué Pasa Ahora?

```
Nexus intenta:  git add public/images/blog/*.webp
                     ↓
              .gitignore dice: ✅ SÍ (excepción)
                     ↓
              Las imágenes se commiten
                     ↓
              bodasesor.com las obtiene
                     ↓
              merge-live-into-dist las protege
                     ↓
              guard-blog-images-dist verifica
                     ↓
              Los blogs se ven COMPLETOS 😊
```
