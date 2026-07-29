# 📋 ACCIÓN REQUERIDA: Nexus - Sube tus imágenes de blog

## Status Actual en bodasesor.com

✅ El candado está ABIERTO
✅ Las imágenes de blog se pueden commitear y pushear
✅ bodasesor.com está listo para recibir tus imágenes
✅ Todas las protecciones están en lugar para que no se pierdan

---

## Lo Que Debes Hacer en Nexus

### Requisito: Tus imágenes están en `public/images/blog/`

Primero verifica que existen:

```bash
# En tu repo de Nexus (seo-nexus-2.0)
ls -la public/images/blog/

# Debería mostrar algo como:
# -rw-r--r-- ... articulo-1-destacada.webp
# -rw-r--r-- ... articulo-2-portada.jpg
# -rw-r--r-- ... etc...
```

Si NO hay imágenes aquí → Habla con el equipo que genera el contenido de Nexus.

---

### Paso 1: Agregar imágenes al staging

```bash
# Desde la raíz de tu repo de Nexus
git add public/images/blog/**/*.webp
git add public/images/blog/**/*.jpg  
git add public/images/blog/**/*.png
```

Alternativamente (más simple):
```bash
git add public/images/blog/
```

---

### Paso 2: Verificar que están staged

```bash
git status

# Debería mostrar:
# On branch main
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#         new file:   public/images/blog/imagen-1.webp
#         new file:   public/images/blog/imagen-2.jpg
#         ...
```

---

### Paso 3: Commitear con mensaje descriptivo

```bash
git commit -m "feat: include blog images in deployment

- Add webp, jpg, png images for blog articles
- Images are in public/images/blog/
- These are now tracked after opening .gitignore exception"
```

---

### Paso 4: Hacer push a main

```bash
git push origin main
```

---

## Qué Pasará Después (Automático)

Una vez hagas push, el pipeline automático se activa:

```
GitHub Push (main)
    ↓
bodasesor.com GitHub Actions dispara
    ↓
1. npm run build
   └─ Compila SPA
    ↓
2. npm run sync:netlify
   └─ Descarga lo que está en Netlify (blogs de Nexus)
    ↓
3. node scripts/merge-live-into-dist.mjs
   ├─ Trae tus imágenes desde .netlify-live/
   ├─ public/images/blog/ se PRESERVA (protección activa)
   └─ Los blogs + imágenes quedan en dist/
    ↓
4. node scripts/guard-blog-images-dist.mjs
   └─ Verifica que tus imágenes llegaron ✓
    ↓
5. Netlify Deploy (dist/)
   └─ Publica en bodasesor.com
    ↓
6. bodasesor.com en vivo
   └─ Blogs CON imágenes ✓
```

---

## Verificación: ¿Funcionó?

### Opción 1: Ver en GitHub

```
https://github.com/bodasesor-rgb/Pagina-Web-Bodasesor/tree/main/public/images/blog
```

Si ves tus imágenes aquí → ✅ Funcionó

---

### Opción 2: Ver en bodasesor.com

En tu navegador:
```
https://bodasesor.com/blog/[nombre-articulo]/
```

Revisa que las imágenes se carguen (no estén rotas).

---

### Opción 3: Revisar GitHub Actions

```
https://github.com/bodasesor-rgb/Pagina-Web-Bodasesor/actions
```

Busca el workflow que se dispara después de tu push:
- ✅ **SUCCESS** → Todo está bien
- ❌ **FAILED** → Algo salió mal (revisar logs)

---

## Si Algo Sale Mal

### Error: "Changes not allowed in this repository"

**Causa**: No tienes permisos de push a bodasesor.com

**Solución**: 
- Este es un problema de permisos de GitHub
- Contacta a alguien con acceso para hacer el push

---

### Error: ".gitignore blocks images"

**Causa**: bodasesor.com aún tiene la versión vieja del .gitignore

**Solución**:
- Espera a que bodasesor.com haga pull/sync del .gitignore actualizado
- Debería hacerse automáticamente en el siguiente build

---

### Error: Guard "guard-blog-images-dist" falló

**Causa**: Las imágenes no llegaron a dist/

**Solución**:
1. Verifica que tus imágenes están en `public/images/blog/` en Nexus
2. Asegúrate de hacer `git add public/images/blog/**/*`
3. Verifica el push fue exitoso: `git log --oneline -5`
4. Revisa el log de GitHub Actions para más detalles

---

## Resumen en 30 Segundos

1. **Verifica**: `ls public/images/blog/` (deben existir imágenes)
2. **Agrega**: `git add public/images/blog/**/*`
3. **Commitea**: `git commit -m "feat: blog images"`
4. **Pushea**: `git push origin main`
5. **Espera**: ~2 minutos para que GitHub Actions termine
6. **Verifica**: Abre bodasesor.com/blog/[articulo] en navegador

---

## Questions?

Si tienes dudas sobre este proceso, revisa:
- `CANDADO_BLOG_IMAGES_ABIERTO.md` - Explicación técnica completa
- `LOCK_DIAGRAM.md` - Diagrama visual del flujo
- `scripts/guard-blog-images-dist.mjs` - Script que verifica imágenes

El candado está abierto. ¡Es hora de que Nexus suba sus imágenes!
