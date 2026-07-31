# 🔐 PROTOCOLO CRÍTICO: Workflow Automático

## ⚠️ REGLAS DE ORO - NUNCA ROMPER

### Seo-Nexus-2.0 (Repository)

**Carpeta Automatizada:** `published-seo/`

```
published-seo/
├── salon-*/ (100+ carpetas SEO)
├── banquete-*/
├── renta-*/
├── catering-*/
├── blog/ (104 blogs)
├── public/images/blog/
├── _redirects (CRÍTICO)
├── netlify.toml (CRÍTICO)
└── redirects-map.json
```

**❌ NUNCA EDITAR MANUALMENTE**
- El workflow lo genera automáticamente
- Si lo editas, luego el workflow lo sobrescribe
- Cambios manuales se pierden

**✅ CÓMO USARLO:**
```bash
# Solo hacer push de cambios que el workflow generó
git add published-seo/
git commit -m "Deploy SEO content from Nexus"
git push origin main
```

---

### Pagina-Web-Bodasesor (Repository)

**Carpeta Automatizada:** `dist/`

```
dist/
├── blog/ (protegido)
├── public/images/blog/ (protegido)
├── _redirects (CRÍTICO - NO TOCAR)
├── netlify.toml (CRÍTICO - NO TOCAR)
├── salon-*/ (CRÍTICO - NO TOCAR)
├── banquete-*/ (CRÍTICO - NO TOCAR)
├── renta-*/ (CRÍTICO - NO TOCAR)
├── catering-*/ (CRÍTICO - NO TOCAR)
└── ... (resto del SPA)
```

**❌ NUNCA EDITAR MANUALMENTE:**
- El workflow de Seo-Nexus-2.0 hace push aquí automáticamente
- Ediciones manuales se sobrescriben en próximo push
- El workflow es la fuente de verdad

**✅ QUÉ SÍ PUEDO EDITAR:**
- SPA assets (src/, components/, etc.)
- Configuraciones de bodasesor.com
- Scripts de build/deploy

**❌ QUÉ NO DEBO EDITAR:**
- dist/ (va a ser sobrescrito)
- dist/_redirects
- dist/netlify.toml
- dist/blog/
- dist/public/images/blog/
- dist/salon-*/
- dist/banquete-*/
- dist/renta-*/
- dist/catering-*/

---

## 🔄 CÓMO FUNCIONA EL WORKFLOW

### Flujo Correcto:

```
1. Seo-Nexus-2.0: Cambios en published-seo/
   └─ git push origin main
   
2. GitHub Actions dispara (automático)
   └─ Copia published-seo/ → dist/
   
3. Pagina-Web-Bodasesor: dist/ se actualiza
   └─ Cambios que NO tocaste manualmente
   
4. Netlify: Detecta cambios en dist/
   └─ Deploya automáticamente a bodasesor.com
```

### La Actualización (IMPORTANTE):

**NO BORRA TODO, ACTUALIZA INTELIGENTEMENTE:**

```
Cuando haces push en Seo-Nexus-2.0:

Archivos que NO cambiaste        → Se quedan igual ✅
Archivos que sí cambiaste         → Se actualizan ✅
Archivos nuevos                   → Se agregan ✅
Archivos que ELIMINAS deliberada- → Se borran (en dist/ también) ⚠️
mente
```

**Ejemplo:**
```
published-seo/ antes:
├── salon-cdmx/        ← Existía
├── banquete-3-tiempos/ ← Existía
└── banquete-monterrey/ ← NUEVO

Después de push:
- salon-cdmx/         sigue ahí ✅
- banquete-3-tiempos/ sigue ahí ✅
- banquete-monterrey/  se agrega ✅

NADA se borra involuntariamente.
```

---

## 📋 CHECKLIST PARA MIS PUSHES

Antes de hacer cualquier push a bodasesor.com (dist/), verificaré:

```
✅ ¿Edité archivos del SPA (src/, components/)?
✅ ¿NO edité dist/ directamente?
✅ ¿NO edité dist/_redirects?
✅ ¿NO edité dist/netlify.toml?
✅ ¿NO edité dist/blog/?
✅ ¿NO edité dist/public/images/blog/?
✅ ¿NO edité dist/salon-*/,banquete-*/,renta-*/,catering-*/?
✅ ¿El SPA build está correcto?
✅ ¿Los cambios vienen de source (src/), no de dist/?
```

Si TODOS son ✅ → Seguro hacer push
Si ALGUNO es ❌ → PARAR, revisar

---

## ⚠️ LO QUE APRENDÍ

### El Incidente de Blogs Borrados

**Por qué pasó:**
- Yo hice `cp -r /workspace/dist/blog/* /workspace/.netlify-live/blog/`
- Esto sobrescribió CORRECTAMENTE
- Pero no respetó el workflow automático
- El próximo push del workflow volvió a sobrescribir

**Lección:**
- Nunca editar directorios controlados por workflow
- El workflow es la fuente de verdad
- Si necesito cambios, debo editar el SOURCE, no el OUTPUT

### Futuros Cambios

**¿Qué pasa si necesito editar algo en dist/?**

❌ NUNCA hacer: `vim dist/blog/index.html` (se pierde en próximo push)
✅ SIEMPRE hacer: `vim src/components/Blog.tsx` (source)
                  → npm run build
                  → git push (solo src cambió)

---

## 📌 RESUMEN EJECUTIVO

| Aspecto | Seo-Nexus-2.0 | Pagina-Web-Bodasesor |
|---------|---------------|----------------------|
| **Carpeta Key** | `published-seo/` | `dist/` |
| **Control** | Workflow automático | Workflow automático |
| **¿Editar?** | ❌ NO (generado) | ❌ NO (generado) |
| **Fuente** | Nexus genera | SPA build + Nexus |
| **Actualizar** | Automático | Automático |
| **Desplegar** | → Pagina-Web-Bodasesor | → Netlify |

---

## 🔒 COMPROMISO

**Prometo:**

✅ NUNCA editar `dist/` manualmente
✅ NUNCA editar archivos controlados por workflow
✅ SIEMPRE respetar que `published-seo/` es generado
✅ SIEMPRE respetar que `dist/` es generado
✅ Si necesito cambios, editar el SOURCE (src/), no el OUTPUT (dist/)
✅ SIEMPRE verificar checklist antes de push

**Resultado:**
- ✅ Sin más pérdida de contenido
- ✅ Sin más conflictos con workflow
- ✅ Sin más sobrescrituras accidentales
- ✅ Sistema estable y predecible

---

**ESTADO: ENTENDIDO Y DOCUMENTADO**

Puedo proceder con seguridad respetando estos límites.
