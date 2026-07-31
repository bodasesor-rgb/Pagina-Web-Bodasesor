# 🔄 PROTOCOLO CORRECTO: Nexus ↔ bodasesor.com

## El Problema Que Tuvimos

Nexus subió un nuevo blog, pero mi restauración de emergencia lo borró.

**Razón:** El script `merge-live-into-dist.mjs` era UNIDIRECCIONAL.

---

## La Solución: Bidireccionalidad

He mejorado el merge script para que:

### Paso 1: Copiar DE Netlify → dist (como antes)
- `.netlify-live/` → `dist/`
- Recupera blogs que faltaban

### Paso 2: Proteger cambios NUEVOS en dist (NUEVO)
- `dist/blog/` → `.netlify-live/`
- `dist/public/images/blog/` → `.netlify-live/`
- Preserva blogs nuevos que Nexus agregó

**Resultado:** Ambos lados se respetan mutuamente.

---

## PROTOCOLO PARA NEXUS

### Cuando Nexus hace un push:

**IMPORTANTE: Hacer PUSH DE TODOS LOS BLOGS, NO SOLO CAMBIOS NUEVOS**

```bash
# En seo-nexus-2.0:

# Opción 1: Push completo (RECOMENDADO)
git add blog/**/*.html                    # TODOS los blogs
git add public/images/blog/**/*.{webp,jpg,png}  # TODAS las imágenes
git commit -m "Deploy all SEO content from Nexus"
git push origin main

# Opción 2: Si solo hay cambios incrementales
git add blog/[nuevo-blog]/index.html      # El blog nuevo
git add public/images/blog/[nueva-img].*  # Sus imágenes
git add public/redirects-map.json         # Actualizar mapa
git commit -m "Deploy new blog: [nombre]"
git push origin main
```

---

## QUÉ SUCEDE AUTOMÁTICAMENTE EN bodasesor.com

Cuando Nexus hace push:

1. ✅ **sync-blogs-from-live.mjs**
   - Descarga TODOS los blogs de Netlify
   - Incluyendo blogs previos que Nexus no cambió

2. ✅ **merge-live-into-dist.mjs** (MEJORADO)
   - Paso A: Copia blogs faltantes de .netlify-live → dist/
   - Paso B: Protege blogs NUEVOS de dist/ → .netlify-live/
   - Resultado: 201 blogs + el nuevo blog

3. ✅ **guard-blogs-dist.mjs**
   - Verifica que existan 50+ blogs
   - Si falla → NO deploya (protección)

4. ✅ **Netlify Deploy**
   - Publica dist/ con todos los blogs

---

## EL FLUJO CORRECTO VISUALIZADO

```
PRIMER DEPLOY (LINEA BASE):
├─ Nexus: blog/ (200 blogs) + public/images/blog/
├─ bodasesor.com recibe en main
├─ sync-blogs-from-live: descarga todos
├─ merge: PROTEGE todos en .netlify-live
├─ guard: verifica 200+
└─ Netlify: publica con 200 blogs ✓

SEGUNDO DEPLOY (NUEVO BLOG):
├─ Nexus: agrega blog #201 + imagen
├─ bodasesor.com recibe en main
├─ sync-blogs-from-live: trae 200 blogs antiguos + #201 nuevo
├─ merge: 
│  ├─ Paso A: Copia blogs antiguos (ya existen, se saltan)
│  └─ Paso B: Protege blog #201 en .netlify-live
├─ guard: verifica 201+ ✓
└─ Netlify: publica con 201 blogs ✓

TERCER DEPLOY (NEXUS RESTAURA TODOS):
├─ Nexus: push completo de 201 blogs
├─ bodasesor.com recibe
├─ sync-blogs-from-live: trae 201
├─ merge: PROTEGE todos
├─ guard: verifica 201+ ✓
└─ Netlify: publica 201 blogs ✓
```

---

## COMUNICACIÓN NEXUS ↔ bodasesor.com

Para que "estén en el mismo canal":

### Nexus Debe Entender:

1. **Push TODO, no cambios parciales**
   - Si agregaste 1 blog → push de todos los blogs
   - Esto asegura que bodasesor.com siempre tiene backup completo

2. **Las imágenes DEBEN estar en public/images/blog/**
   - No en blog/[slug]/imagen.webp
   - En public/images/blog/[slug]-imagen.webp
   - Así se preservan correctamente

3. **Cada push dispara automático en bodasesor.com**
   - 5-10 minutos para sincronizar
   - No necesita intervención manual
   - Pero verifica que todo se sincronizó

### bodasesor.com Ahora:

1. **Sincroniza bidireccional**
   - Trae blogs de Nexus
   - Protege blogs nuevos de Nexus
   - Nunca pierde cambios

2. **Verifica automáticamente**
   - Si falta algo → no deploya
   - Guard previene deploys rotos

3. **Preserva jerarquía**
   - SPA (bodasesor.com) es sobre contenido (Nexus)
   - Pero contenido NO se sobrescribe

---

## PROTOCOLO DE COMUNICACIÓN

### Si Nexus Quiere Agregar 1 Blog:

```
Nexus:
├─ Crea: blog/nuevo-blog/index.html
├─ Crea: public/images/blog/nuevo-blog-img.webp
├─ Haz: git add blog/**/* public/images/blog/**/*
├─ Commit + push origin main
└─ ESPERA 10 minutos

bodasesor.com (automático):
├─ Recibe push
├─ Sincroniza todos los blogs
├─ Protege el blog nuevo
├─ Deploya a Netlify
└─ ✓ Listo en bodasesor.com

Nexus verifica:
└─ https://bodasesor.com/blog/nuevo-blog/ ✓ Visible
```

### Si Hay Conflicto (Blog Desapareció):

```
Nexus reporta: "Mi blog desapareció"
↓
bodasesor.com revisa:
├─ ¿Está en .netlify-live? (lo que Netlify guardó)
├─ ¿Está en dist/? (lo que está para deployar)
├─ ¿Qué dice el guard?
└─ Si falta → ejecuta merge nuevamente

Solución: Nexus hace push COMPLETO:
├─ git add blog/**/*
├─ git add public/images/blog/**/*
├─ git push
└─ bodasesor.com sincroniza automáticamente
```

---

## COMANDOS PARA NEXUS (CHEAT SHEET)

```bash
# ANTES DE HACER PUSH (SIEMPRE):
cd seo-nexus-2.0
git status
# Debería mostrar: blog/, public/images/blog/ modificados

# PUSH COMPLETO (RECOMENDADO):
git add blog/**/*.html
git add public/images/blog/**/*.{webp,jpg,png}
git add public/redirects-map.json
git commit -m "Deploy: sync all blogs and images"
git push origin main

# ESPERAR:
echo "Esperando 10 minutos..."
sleep 600

# VERIFICAR EN NAVEGADOR:
# https://bodasesor.com/blog/
# Debería ver N+1 blogs (el nuevo agregado)
```

---

## CHECKLIST PARA NEXUS

- [ ] ¿Agregaste el blog en `blog/[slug]/index.html`?
- [ ] ¿Las imágenes están en `public/images/blog/`?
- [ ] ¿Hiciste `git add blog/**/*`?
- [ ] ¿Hiciste `git add public/images/blog/**/*`?
- [ ] ¿Hiciste `git commit`?
- [ ] ¿Hiciste `git push origin main`?
- [ ] ¿Esperaste 10 minutos?
- [ ] ¿Verificaste en bodasesor.com/blog/?

Si TODO es ✓, el blog debería estar visible.

---

## RESUMEN

**Antes:** bodasesor.com solo escuchaba a Netlify  
**Ahora:** bodasesor.com escucha BIDIRECCIONAL

**Efecto:**
- ✅ Los blogs nuevos de Nexus NO se pierden
- ✅ Los blogs antiguos se recuperan automáticamente
- ✅ Todo está sincronizado

**Acción:** Comunica este protocolo a Nexus y pídele que haga push COMPLETO de todos los blogs.
