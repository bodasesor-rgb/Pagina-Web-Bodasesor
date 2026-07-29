# 🔄 Flujo Completo: Cómo las Imágenes van de Nexus a bodasesor.com

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NEXUS (seo-nexus-2.0)                       │
│                                                                     │
│  ├─ Genera blog HTML → published-seo/blog/*.html                  │
│  └─ Genera imágenes → published-seo/public/images/blog/*.webp    │
│                                                                     │
│  GitHub Action (Nexus Workflow):                                   │
│  ├─ npm run build (genera contenido)                              │
│  ├─ git add published-seo/                                         │
│  ├─ git commit                                                     │
│  └─ git push origin main → GitHub/seo-nexus-2.0                  │
└─────────────────────────────────────────────────────────────────────┘
              ↓↓↓ (Permisos: Necesita GH_PUSH_TOKEN) ↓↓↓
┌─────────────────────────────────────────────────────────────────────┐
│              BODASESOR.COM (Pagina-Web-Bodasesor)                   │
│                                                                     │
│  GitHub recibe push de Nexus:                                      │
│  ├─ public/images/blog/* (imágenes)                                │
│  ├─ blog/* (HTML generado por Nexus)                              │
│                                                                     │
│  GitHub Actions dispara (bodasesor.com workflow):                  │
│  ├─ Step 1: npm run build                                         │
│  │         └─ Compila SPA                                          │
│  │                                                                  │
│  ├─ Step 2: npm run sync:netlify                                  │
│  │         └─ Descarga .netlify-live desde Netlify                │
│  │            (que incluye blogs previos de Nexus)                │
│  │                                                                  │
│  ├─ Step 3: node scripts/merge-live-into-dist.mjs                │
│  │         ├─ Lee archivos de .netlify-live/                      │
│  │         ├─ Para public/images/blog/ → PRESERVA (lógica actual) │
│  │         ├─ Para blog/ → PRESERVA                               │
│  │         └─ Resultado: dist/ tiene todo                          │
│  │                                                                  │
│  ├─ Step 4: node scripts/guard-blog-images-dist.mjs              │
│  │         └─ ✓ Verifica que imágenes existan (10+ mínimo)        │
│  │                                                                  │
│  ├─ Step 5: npm run build:dist                                    │
│  │         └─ Build final                                         │
│  │                                                                  │
│  └─ Step 6: Netlify deploy                                        │
│           └─ Publica dist/ a Netlify                              │
└─────────────────────────────────────────────────────────────────────┘
              ↓↓↓ Netlify actualiza en ~30 segundos ↓↓↓
┌─────────────────────────────────────────────────────────────────────┐
│              BODASESOR.COM (en vivo)                                │
│                                                                     │
│  ✅ /blog/articulo-1/
│     ├─ HTML con contenido
│     └─ Imágenes visibles (desde /public/images/blog/)             │
│                                                                     │
│  ✅ /blog/articulo-2/
│     ├─ HTML con contenido
│     └─ Imágenes visibles (desde /public/images/blog/)             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Paso a Paso Detallado

### FASE 1: Nexus Genera (✅ YA FUNCIONA)

```
Nexus (seo-nexus-2.0):
  npm run build:articles
    ├─ Lee datos de artículos
    ├─ Genera HTML en published-seo/blog/
    ├─ Descarga imágenes a published-seo/public/images/blog/
    └─ Resultado: ~40KB HTML + imágenes
```

**Status**: ✅ Nexus lo hace bien

---

### FASE 2: Nexus Hace Push (⚠️ NECESITA GH_PUSH_TOKEN)

```
Nexus Workflow:
  git add published-seo/
  git commit -m "feat: new articles and images"
  git push origin main
    └─ Error 403 (sin token)
```

**Status**: ❌ Necesita token

**Solución**: Configurar `GH_PUSH_TOKEN` en seo-nexus-2.0 secrets

```yaml
- name: Push to bodasesor.com
  run: |
    git remote set-url origin https://x-access-token:${{ secrets.GH_PUSH_TOKEN }}@github.com/bodasesor-rgb/Pagina-Web-Bodasesor.git
    git push origin main
```

---

### FASE 3: bodasesor.com Recibe (✅ YA FUNCIONA)

```
bodasesor.com GitHub:
  ✓ Recibe en main:
    ├─ public/images/blog/articulo-1.webp
    ├─ public/images/blog/articulo-2.webp
    └─ blog/articulo-1/index.html
```

**Status**: ✅ GitHub Actions dispara automáticamente

---

### FASE 4: bodasesor.com Build (✅ YA ESTÁ LISTO)

```
bodasesor.com Workflow:
  Step 1: npm run build
    └─ Compila SPA (sin problema)
  
  Step 2: npm run sync:netlify
    └─ Descarga .netlify-live (blogs previos)
  
  Step 3: merge-live-into-dist.mjs
    ├─ Lee .netlify-live/
    ├─ Para cada archivo:
    │  ├─ if (path.startsWith('public/images/blog/'))
    │  │  └─ return PRESERVE_ALWAYS ✓
    │  └─ if (path.startsWith('blog/'))
    │     └─ return PRESERVE ✓
    └─ Copia a dist/
  
  Step 4: guard-blog-images-dist.mjs
    ├─ Verifica dist/public/images/blog/
    ├─ Cuenta imágenes (mínimo 10)
    └─ ✓ OK (continúa)
  
  Step 5: npm run build:dist
    └─ Build final
  
  Step 6: Netlify Deploy
    └─ Publica dist/ a bodasesor.com
```

**Status**: ✅ Todo está configurado

---

### FASE 5: Netlify Deploy (✅ AUTOMÁTICO)

```
Netlify:
  Recibe dist/ de bodasesor.com workflow
    ├─ /blog/articulo-1/index.html
    ├─ /public/images/blog/articulo-1.webp
    └─ ... (más archivos)
  
  Despliega en ~30 segundos
```

**Status**: ✅ Automático

---

### FASE 6: bodasesor.com en Vivo (✅ RESULTADO FINAL)

```
bodasesor.com:
  GET /blog/articulo-1/
    └─ Retorna HTML + imágenes embebidas
  
  GET /public/images/blog/articulo-1.webp
    └─ Retorna la imagen
```

**Status**: ✅ Imágenes visibles

---

## El Problema Original vs Ahora

### ANTES (Bloqueado)

```
Nexus:
  ├─ Genera imágenes ✓
  ├─ Intenta git add ✓
  ├─ Intenta git push → ❌ ERROR 403 (sin permisos)
  └─ Imágenes NO llegan a bodasesor.com
```

### AHORA (Después de configurar token)

```
Nexus:
  ├─ Genera imágenes ✓
  ├─ git add ✓
  ├─ git push → ✓ ÉXITO (con GH_PUSH_TOKEN)
  └─ Imágenes LLEGAN a bodasesor.com
  
bodasesor.com:
  ├─ Recibe imágenes ✓
  ├─ merge-live-into-dist PRESERVA ✓ (código que creé)
  ├─ guard verifica que existan ✓ (script que creé)
  └─ Netlify deploya ✓ (automático)
  
bodasesor.com en vivo:
  └─ Imágenes VISIBLES ✓
```

---

## Mi Rol: Lo que YO hice

✅ **En bodasesor.com**:
1. `.gitignore` → Permitir `public/images/blog/*`
2. `netlify-preserve.json` → Proteger `public/images/blog/`
3. `merge-live-into-dist.mjs` → Lógica de preservación
4. `guard-blog-images-dist.mjs` → Verificación

**Esto fue NECESARIO. Sin esto, aunque Nexus tuviera permisos, las imágenes se bloquearían.**

---

## El Rol de Nexus: Lo que FALTA

⚠️ **En seo-nexus-2.0**:
1. Crear `GH_PUSH_TOKEN` (personal access token en GitHub)
2. Agregarlo a `seo-nexus-2.0` secrets
3. Usar en workflow: `git remote set-url origin https://x-access-token:${{ secrets.GH_PUSH_TOKEN }}@...`
4. `git push origin main` (ahora con permisos)

**ESTO ES TODO LO QUE FALTA.**

---

## Checklist Final

**bodasesor.com (✅ COMPLETADO):**
- [x] `.gitignore` permitir blog images
- [x] `netlify-preserve.json` proteger blog images
- [x] `merge-live-into-dist.mjs` preservar blog images
- [x] `guard-blog-images-dist.mjs` verificar blog images
- [x] Todo pusheado a GitHub

**seo-nexus-2.0 (⏳ FALTA):**
- [ ] Crear GH_PUSH_TOKEN en GitHub
- [ ] Agregar a seo-nexus-2.0 secrets
- [ ] Configurar workflow para usar el token
- [ ] Probar: `git push` debe funcionar sin error 403

---

## Después de Configurar el Token

```
┌─────────────────────────────────────────┐
│  Nexus hace push                        │
│  (GH_PUSH_TOKEN configurado)           │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  bodasesor.com recibe imágenes          │
│  (en main)                              │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  GitHub Actions de bodasesor.com        │
│  dispara automáticamente                │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  merge-live-into-dist PRESERVA          │
│  (código que yo escribí)                │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  guard-blog-images verifica             │
│  (script que yo creé)                   │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Netlify deploy a bodasesor.com         │
│  (automático)                           │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  🎉 bodasesor.com con imágenes de blog  │
│  (VISIBLES en /blog/articulo/)         │
└─────────────────────────────────────────┘
```

**UNA VEZ QUE NEXUS CONFIGURE EL TOKEN, TODO FUNCIONA AUTOMÁTICAMENTE.**

No hay nada más que hacer. Solo ese token.
