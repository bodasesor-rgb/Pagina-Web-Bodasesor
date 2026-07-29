# 🔐 Candado de Imágenes de Blog: ABIERTO

## Resumen de Cambios

El "candado" de protección de bodasesor.com ha sido **actualizado para aceptar específicamente imágenes de blog generadas por Nexus**.

**Versión anterior**: Bloqueaba `public/images/**/*.webp` completamente
**Versión actual**: Permite `public/images/blog/**/*.{webp,jpg,png}` de Nexus

---

## Cambios Realizados en bodasesor.com

### 1. `.gitignore` (Actualizado)
```diff
  public/images/**/*.webp
+ # ⚠️ EXCEPCIÓN CRÍTICA: Permitir imágenes de blog generadas por Nexus
+ !public/images/blog/**/*.webp
+ !public/images/blog/**/*.jpg
+ !public/images/blog/**/*.png
+ # Otras imágenes de producto (no-blog) se ignoran para reducir tamaño del repo
```

**Efecto**: Ahora se pueden commitear imágenes dentro de `public/images/blog/` mientras se bloquea el resto de imágenes.

---

### 2. `scripts/netlify-preserve.json` (Actualizado)
```diff
  "alwaysPreservePrefixes": [
    "css/",
    "blog/",
+   "public/images/blog/",
    "eventos/",
    ...
  ]
```

**Efecto**: Las imágenes de blog se protegen durante el merge Netlify → dist/.

---

### 3. `scripts/merge-live-into-dist.mjs` (Mejorado)
```javascript
function isPreservedPath(relPath, config) {
  const norm = relPath.replace(/\\/g, '/')
  // Siempre preservar imágenes de blog (crítico para que no aparezcan rotas)
  if (norm.startsWith('public/images/blog/')) return true
  return matchesPrefix(norm, config.alwaysPreservePrefixes || [])
}
```

**Efecto**: Las imágenes de blog se protegen incluso si la ruta no está exactamente en la config.

---

### 4. Guard Nueva Script: `scripts/guard-blog-images-dist.mjs`
Una nueva verificación que asegura que las imágenes de blog existan en `dist/` después del build.

**Uso**: `node scripts/guard-blog-images-dist.mjs`

**Salida si faltan imágenes**:
```
⚠️  Solo hay X imágenes de blog en dist/public/images/blog/

ACCIÓN REQUERIDA:
1. En Nexus, verificar que public/images/blog/ tiene imágenes
2. Hacer commit y push a bodasesor.com:
   git add public/images/blog/**/*.{webp,jpg,png}
   git commit -m "feat: include blog images in deployment"
   git push origin main
3. Luego merge-live-into-dist.mjs las traerá aquí
```

---

## ¿Qué Debe Hacer Nexus Ahora?

### Paso 1: Verificar que las imágenes existen
En el repositorio de Nexus (`seo-nexus-2.0`):
```bash
ls -la public/images/blog/
# Debería mostrar archivos .webp, .jpg, .png
```

### Paso 2: Agregar imágenes al staging
```bash
cd seo-nexus-2.0  # (o donde esté tu repo de Nexus)
git add public/images/blog/**/*.webp
git add public/images/blog/**/*.jpg
git add public/images/blog/**/*.png
```

### Paso 3: Commitear
```bash
git commit -m "feat: include blog images in deployment"
```

### Paso 4: Hacer push
```bash
git push origin main
```

---

## Pipeline Actualizado

### Antes (bloqueado)
```
Nexus genera → Intenta commitear imágenes → ❌ .gitignore bloquea
```

### Ahora (funcional)
```
Nexus genera → Commitea imágenes → Pushea a bodasesor.com
                                          ↓
                                   GitHub Actions
                                          ↓
                                   npm run build
                                          ↓
                                   sync-blogs-from-live
                                   (trae todo desde .netlify-live)
                                          ↓
                                   merge-live-into-dist
                                   (preserva blog/ + public/images/blog/)
                                          ↓
                                   guard-blogs-dist
                                   guard-blog-images-dist
                                   (verifican que nada se perdió)
                                          ↓
                                   Netlify Deploy (dist/)
                                          ↓
                                   bodasesor.com CON imágenes
```

---

## Protecciones Adicionales Ahora Activas

| Protección | Archivo | Función |
|-----------|---------|---------|
| Git tracking | `.gitignore` | Permite `public/images/blog/` |
| Merge preservation | `netlify-preserve.json` | Protege `public/images/blog/` |
| Merge logic | `merge-live-into-dist.mjs` | Siempre preserva `public/images/blog/` |
| Build verification | `guard-blog-images-dist.mjs` | Verifica que existan imágenes |

---

## Prueba Manual (Opcional)

Para verificar que el candado está abierto correctamente:

```bash
# 1. Verificar .gitignore
grep -n "public/images/blog" .gitignore

# 2. Verificar netlify-preserve.json
jq '.alwaysPreservePrefixes[] | select(contains("blog"))' scripts/netlify-preserve.json

# 3. Crear archivo de prueba
mkdir -p public/images/blog
echo "test" > public/images/blog/test-image.jpg

# 4. Verificar que Git permite
git add public/images/blog/test-image.jpg
git status  # Debería mostrar "new file: public/images/blog/test-image.jpg"

# 5. Revertir
git reset HEAD public/images/blog/test-image.jpg
rm public/images/blog/test-image.jpg
```

---

## Resumen Ejecutivo

✅ **El candado está abierto para Nexus**
✅ **Las imágenes de blog ahora se pueden commitear**
✅ **Se protegen durante todo el pipeline**
✅ **Se verifica que no se pierdan en el build**

**Próximo paso**: Nexus debe hacer push de `public/images/blog/**/*.{webp,jpg,png}` a bodasesor.com/main
