# 🚀 Plan de Deploy Final - Arreglo Performance

## 📊 Situación Actual

**PageSpeed en producción (bodasesor.com):**
- LCP: 5.0s 🔴
- TBT: 1110ms 🔴
- Performance: 53 🟠

**Diagnóstico:** El código optimizado existe pero **NO está en producción**.

## ✅ Lo que YA está arreglado en el código

### 1. Hero LCP Optimizado
```html
<!-- index.html línea 76-86 -->
<link rel="preload" as="image" type="image/webp" 
      href="/images/hero-bg-new-mobile.webp" 
      media="(max-width: 768px)" 
      fetchpriority="high" />

<!-- línea 172 -->
<img fetchpriority="high" decoding="async" 
     src="/images/hero-bg-new.webp" />
```

### 2. Analytics Diferido
```javascript
// index.html línea 17-30
s.async = true; // Carga asíncrona
// Se activa después de interacción o idle
requestIdleCallback(inject, { timeout: 8000 });
```

### 3. Imágenes WebP
- ✅ 74 imágenes optimizadas
- ✅ Desktop: 1200px @ 68% calidad
- ✅ Mobile: 480px @ 64% calidad (-sm.webp)

### 4. Shells LCP
- ✅ 7973 páginas con hero estático
- ✅ Preload correcto en cada página
- ✅ `fetchpriority="high"` en todas

### 5. DiscountBalloon Retrasado
```javascript
// src/App.jsx línea 223
const promoTimer = setTimeout(() => setShowPromo(true), 
  isMobile ? 10000 : 8000) // 10s móvil, 8s desktop
```

## 🔄 Proceso de Build Actual

### Etapa 1: Sync Nexus (EN PROGRESO - ~15 min)
```bash
npm run build:nexus
```
- Descargando 3960 landings SEO de Hostinger
- Sincronizando CSS y assets globales
- Progreso actual: ~200/3960 landings

### Etapa 2: Build SPA (Después del sync)
- Vite build de React app
- Minificación JS/CSS
- Generación de assets optimizados

### Etapa 3: Prerender (Después del build)
- 8727 shells SEO con LCP prerender
- Merge con Nexus landings
- Verificación de integridad

### Etapa 4: Deploy a Netlify
```bash
# Opción A: Deploy directo
netlify deploy --prod --dir=dist

# Opción B: Push (activa GitHub Action)
git push
```

## 📈 Resultados Esperados POST-DEPLOY

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **LCP** | 5.0s 🔴 | ~2.2s 🟢 | **-56%** |
| **FCP** | 2.0s 🟠 | ~1.2s 🟢 | **-40%** |
| **TBT** | 1110ms 🔴 | ~200ms 🟢 | **-82%** |
| **CLS** | 1.0 🔴 | ~0.1 🟢 | **-90%** |
| **Performance** | 53 🟠 | **85-95 🟢** | **+60%** |

### Por qué estas mejoras:

**LCP (5.0s → 2.2s):**
- Hero WebP optimizado (vs PNG pesado)
- Preload con fetchpriority="high"
- Versiones móviles específicas (-sm.webp)

**TBT (1110ms → 200ms):**
- Analytics diferido (no bloquea)
- Promo balloon retrasado 10s
- React chunks optimizados

**CLS (1.0 → 0.1):**
- Nav espaciador reserva altura
- Promo balloon no aparece durante LCP
- Dimensiones explícitas en imágenes

## ⏱️ Timeline Esperado

```
T+0min   ✅ Build iniciado (ahora)
T+15min  ⏳ Sync Nexus completo
T+18min  ⏳ Vite build completo
T+25min  ⏳ Prerender shells completo
T+27min  ⏳ Verificaciones pasadas
T+30min  ✅ Build completo → listo para deploy

T+35min  🚀 Deploy a Netlify
T+37min  🌐 Propagación CDN
T+40min  📊 PageSpeed re-test → VERDE
```

## 🎯 Checklist Post-Deploy

### Verificación Inmediata:
```bash
# 1. Verificar que el deploy se completó
curl -I https://bodasesor.com/barras-de-bebidas/

# 2. Verificar preload del hero
curl https://bodasesor.com/ | grep "preload.*hero-bg-new"

# 3. Verificar shell LCP
curl https://bodasesor.com/barras-de-bebidas/ | grep "spa-lcp-prerender"
```

### Pruebas de Performance:
1. **PageSpeed Mobile:** https://pagespeed.web.dev/?url=https://bodasesor.com/
2. **Test específico:** https://pagespeed.web.dev/?url=https://bodasesor.com/barras-de-bebidas/
3. **WebPageTest:** https://www.webpagetest.org/ (Moto G4, 3G rápido)

### Páginas Críticas a Verificar:
- ✅ `/` (home)
- ✅ `/barras-de-bebidas` (hub con shell)
- ✅ `/carrito-snacks` (producto típico)
- ✅ `/banquetes/formal-3-tiempos` (menú banquete)
- ✅ `/ciudad-de-mexico` (city landing)

## 🐛 Si Algo Sale Mal

### Problema: Build falla
```bash
# Limpiar y reintentar
rm -rf dist .netlify-live
npm run build:nexus
```

### Problema: Deploy pero performance sigue baja
1. Verificar que se deploye `dist/`, no `public/`
2. Verificar que Netlify use Brotli compression
3. Verificar que CDN tenga cache fresco (purge)

### Problema: Imágenes no cargan
```bash
# Verificar que existan en dist
ls dist/images/hero-bg-new*.webp
ls dist/images/productos/barra-bebidas*.webp
```

## 📝 Notas Importantes

1. **NO hacer `npm run build` solo** → usa `npm run build:nexus`
2. **Esperar 2-3 minutos** después del deploy para propagación CDN
3. **Purgar cache de PageSpeed** si es necesario (puede cachear resultados viejos)
4. **Test en incógnito** para evitar cache del navegador
5. **El primer test post-deploy** puede ser lento (cold cache)

## 🎉 Cuando Todo Funcione

Verás en PageSpeed:
```
✅ Performance: 90-95 (VERDE)
✅ Accessibility: 97 (VERDE)
✅ Best Practices: 100 (VERDE)
✅ SEO: 100 (VERDE)

✅ LCP: 2.0-2.5s (VERDE)
✅ TBT: 150-250ms (VERDE)
✅ CLS: 0.05-0.15 (VERDE)
```

---

**Estado actual del build:** Sincronizando 3960 landings SEO (~15 min restantes)
**Próximo paso:** Deploy a Netlify con `netlify deploy --prod`
**Tiempo total estimado:** ~40 minutos desde inicio
