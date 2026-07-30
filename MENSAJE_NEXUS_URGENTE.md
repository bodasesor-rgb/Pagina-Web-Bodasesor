# 🚨 Mensaje Urgente para Nexus - Acción Inmediata Requerida

---

## PROBLEMA IDENTIFICADO

Las imágenes de blog **NO se ven** en bodasesor.com.

**Razón:** Las imágenes están siendo **generadas correctamente** en Nexus, pero **NO se están pusheando** a bodasesor.com.

---

## QUÉ HACER AHORA (5 MINUTOS)

### Paso 1: Verifica que las imágenes existen en tu máquina

```bash
cd seo-nexus-2.0
ls -lh public/images/blog/ | head -10
# Debería mostrar: imagen-1.webp, imagen-2.webp, etc.
```

**Si NO ves nada:**
- Las imágenes no están siendo generadas en esa carpeta
- Necesita revisar el script de generación de Nexus

**Si VES imágenes:**
- Continúa al Paso 2

---

### Paso 2: Haz git push de las imágenes AHORA

```bash
cd seo-nexus-2.0

# Agregar las imágenes
git add public/images/blog/**/*.webp
git add public/images/blog/**/*.jpg
git add public/images/blog/**/*.png

# Verificar que están staged
git status
# Debería mostrar: public/images/blog/... (en verde)

# Commitear
git commit -m "feat: push blog images to production"

# Hacer push
git push origin main
```

**Si falla con "HTTP 403":**
- El `GH_PUSH_TOKEN` no está configurado
- Ve al Paso 3

**Si funciona:**
- Espera 2 minutos y verifica en bodasesor.com

---

### Paso 3: Si falla con HTTP 403 - Configurar Token

```bash
# 1. Ver si el token está configurado
gh secret list | grep GH_PUSH_TOKEN

# Si NO está:
# - Ve a: https://github.com/settings/tokens
# - Crea "Personal Access Token (classic)"
# - Dale scope: ✅ repo
# - Copia el token

# Luego agrega a seo-nexus-2.0 secrets:
# - Ve a: https://github.com/bodasesor-rgb/seo-nexus-2.0/settings/secrets/actions
# - New secret
# - Name: GH_PUSH_TOKEN
# - Value: (el token que copiaste)
```

---

## VERIFICACIÓN (después de hacer push)

Espera 2 minutos y luego:

```bash
# Opción 1: Revisar en GitHub
# https://github.com/bodasesor-rgb/Pagina-Web-Bodasesor/tree/main/public/images/blog

# Opción 2: Revisar en el sitio
# https://bodasesor.com/blog/5-errores-comunes-al-contratar-el-catering-de-tu-evento-corporativo-y-como-evitarlos/
# Debería ver las imágenes cargadas (no error 404)

# Opción 3: Revisar GitHub Actions
# https://github.com/bodasesor-rgb/Pagina-Web-Bodasesor/actions
# El workflow debería estar en "success"
```

---

## CHECKLIST RÁPIDO

- [ ] ¿Las imágenes existen en `public/images/blog/`?
- [ ] ¿Hiciste `git add public/images/blog/**/*`?
- [ ] ¿Hiciste `git commit`?
- [ ] ¿Hiciste `git push origin main`?
- [ ] ¿Esperas 2 minutos?
- [ ] ¿Las imágenes aparecen en bodasesor.com?

---

## SI SIGUE SIN FUNCIONAR

Envía EXACTAMENTE esto:

```bash
# Output 1
ls public/images/blog/ | wc -l

# Output 2
git log --all --oneline -- public/images/blog/ | head -5

# Output 3
git status

# Output 4
gh secret list | grep GH_PUSH_TOKEN
```

---

## RESUMEN EN UNA LÍNEA

**Haz: `git add public/images/blog/**/* && git commit && git push origin main`**

**Fin.**

---

## CONTEXTO (para que entiendas)

bodasesor.com ya tiene TODO listo para recibir tus imágenes:
- ✅ El `.gitignore` permite que se commiteen
- ✅ El merge preserva las imágenes
- ✅ El script verifica que existan

Lo único que falta es que **Nexus haga push**.

Una vez hagas el push:
1. GitHub Actions de bodasesor.com se dispara automáticamente
2. Sincroniza tus imágenes
3. Netlify las publica
4. bodasesor.com muestra imágenes

**TODO AUTOMÁTICO. Solo necesita el push inicial.**

---

**URGENCIA: HAZLO AHORA MISMO. NO ESPERES MÁS.**
