# 🖼️ Sistema Automático de Optimización de Imágenes

Este sistema convierte automáticamente todas las imágenes PNG/JPG a WebP optimizado cuando las agregas al proyecto.

## ✅ Dos Formas de Usar

### 1️⃣ **Automático en Git Commits** (Recomendado)

Cada vez que hagas commit de una imagen nueva, se convertirá automáticamente a WebP.

**Setup inicial** (solo una vez):

```bash
# Instalar husky para git hooks
npm install --save-dev husky
npx husky install

# Ya está configurado el hook pre-commit
# ¡Listo! Ahora es automático
```

**Uso normal:**
```bash
# 1. Agregar imagen nueva
cp mi-foto-evento.jpg public/images/galeria/

# 2. Hacer commit (conversión automática)
git add public/images/galeria/mi-foto-evento.jpg
git commit -m "feat: agregar foto de evento"

# ✅ El hook automáticamente:
#    - Detecta la imagen nueva
#    - Genera mi-foto-evento.webp y mi-foto-evento-sm.webp
#    - Las agrega al mismo commit
```

### 2️⃣ **Watcher en Desarrollo** (Opcional)

Observa cambios en tiempo real mientras trabajas.

**Uso:**
```bash
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: Image watcher
npm run watch:images

# O ambos juntos:
npm run dev:full
```

**Funciona así:**
1. Arrastras/copias una imagen a `public/images/`
2. El watcher la detecta automáticamente
3. Espera 2 segundos (por si agregas más)
4. Convierte todas a WebP
5. ¡Listo para usar!

```
👀 Watching for image changes in public/images/...
📸 Detected change: galeria/evento-nuevo.jpg
📸 Processing 1 image(s)...
  - galeria/evento-nuevo.jpg
✅ WebP generation complete
```

## 🎯 Conversión Manual (Cuando Quieras)

```bash
npm run generate:webp
```

## 📊 Especificaciones de Conversión

| Versión | Resolución | Calidad | Uso |
|---------|------------|---------|-----|
| **Desktop** | Max 1200px | 68% | Pantallas grandes |
| **Mobile** (`-sm.webp`) | Max 480px | 64% | Móviles/tarjetas |

**Carpetas especiales** (resolución reducida para galerías):
- `instagram/` → Max 800px
- `galeria/` → Max 800px

## 📁 Estructura de Archivos

```
public/images/productos/
├── barra-bebidas.png         ← Original (se mantiene como fallback)
├── barra-bebidas.webp        ← Desktop optimizado
└── barra-bebidas-sm.webp     ← Mobile optimizado
```

## 🚫 Qué NO se Convierte

- Imágenes que ya son WebP
- Archivos en `node_modules/`, `.git/`, `.tmp-*/`
- Anuncios de Instagram marcados en exclusion list

## ⚙️ Configuración Avanzada

Editar `scripts/generate-webp.mjs`:

```javascript
const MAX_EDGE = 1200              // Tamaño máximo desktop
const MOBILE_EDGE = 480            // Tamaño máximo mobile
const WEBP_QUALITY = 68            // Calidad desktop (0-100)
const MOBILE_WEBP_QUALITY = 64     // Calidad mobile (0-100)
const MAX_WEBP_BYTES = 150 * 1024  // Regenerar si > 150KB
```

## 🔍 Verificar Conversión

```bash
# Ver cuántas imágenes están optimizadas
npm run guard:webp

# Output esperado:
# ✓ WebP guard OK — 641 sources, 100.0% with siblings
```

## 💡 Tips

1. **Siempre sube fotos originales** - El script las optimiza
2. **No edites los .webp manualmente** - Se regeneran automáticamente
3. **Fotos de eventos muy grandes?** - El script las redimensiona automáticamente
4. **¿Cuándo se activa?**
   - Git commit (si usas husky)
   - Watch mode (si está corriendo)
   - Build production (`npm run build`)
   - Manual (`npm run generate:webp`)

## 🐛 Solución de Problemas

**Hook no funciona:**
```bash
npx husky install
chmod +x .husky/pre-commit  # En Mac/Linux
```

**Watcher no detecta cambios:**
```bash
# Asegúrate de que Node.js tenga permisos
# En Windows: ejecuta terminal como admin si es necesario
```

**Imágenes muy pesadas después de conversión:**
```bash
# Regenerar con configuración más agresiva
# Editar MAX_WEBP_BYTES en generate-webp.mjs
```

## 📈 Impacto en Performance

| Antes (PNG/JPG) | Después (WebP) | Ahorro |
|-----------------|----------------|--------|
| 2.5 MB | 180 KB | **93%** |
| 500 KB | 60 KB | **88%** |
| 150 KB | 25 KB | **83%** |

**Resultado:** LCP móvil de 4.7s → ~2.2s 🚀
