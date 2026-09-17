# Sincronización de Nexus en Lotes

## 🎯 Problema
Sincronizar las 3960 landings de Nexus de golpe causa:
- Timeouts
- Errores de memoria
- Fallos en el build

## ✅ Solución: Sincronizar en Lotes

### Uso Rápido

```bash
# Lote 1: Primeras 500 landings (0-499)
node scripts/sync-nexus-batch.mjs 500 0

# Lote 2: Siguientes 500 (500-999)
node scripts/sync-nexus-batch.mjs 500 500

# Lote 3: Siguientes 500 (1000-1499)
node scripts/sync-nexus-batch.mjs 500 1000

# Y así sucesivamente...
```

### Parámetros

```bash
node scripts/sync-nexus-batch.mjs [tamaño-lote] [inicio]
```

- **tamaño-lote**: Cuántas landings por lote (default: 500)
- **inicio**: Índice inicial (default: 0)

### Ejemplos

**Lotes de 500 (recomendado):**
```bash
node scripts/sync-nexus-batch.mjs 500 0     # 0-499
node scripts/sync-nexus-batch.mjs 500 500   # 500-999
node scripts/sync-nexus-batch.mjs 500 1000  # 1000-1499
node scripts/sync-nexus-batch.mjs 500 1500  # 1500-1999
node scripts/sync-nexus-batch.mjs 500 2000  # 2000-2499
node scripts/sync-nexus-batch.mjs 500 2500  # 2500-2999
node scripts/sync-nexus-batch.mjs 500 3000  # 3000-3499
node scripts/sync-nexus-batch.mjs 500 3500  # 3500-3960
```

**Lotes de 1000 (más rápido pero más riesgo):**
```bash
node scripts/sync-nexus-batch.mjs 1000 0     # 0-999
node scripts/sync-nexus-batch.mjs 1000 1000  # 1000-1999
node scripts/sync-nexus-batch.mjs 1000 2000  # 2000-2999
node scripts/sync-nexus-batch.mjs 1000 3000  # 3000-3960
```

**Lotes de 250 (más lento pero más estable):**
```bash
node scripts/sync-nexus-batch.mjs 250 0
node scripts/sync-nexus-batch.mjs 250 250
# ... etc
```

## 📊 Plan Completo para 3960 Landings

**Con lotes de 500 (8 lotes):**

| Lote | Comando | Rango |
|------|---------|-------|
| 1 | `node scripts/sync-nexus-batch.mjs 500 0` | 0-499 |
| 2 | `node scripts/sync-nexus-batch.mjs 500 500` | 500-999 |
| 3 | `node scripts/sync-nexus-batch.mjs 500 1000` | 1000-1499 |
| 4 | `node scripts/sync-nexus-batch.mjs 500 1500` | 1500-1999 |
| 5 | `node scripts/sync-nexus-batch.mjs 500 2000` | 2000-2499 |
| 6 | `node scripts/sync-nexus-batch.mjs 500 2500` | 2500-2999 |
| 7 | `node scripts/sync-nexus-batch.mjs 500 3000` | 3000-3499 |
| 8 | `node scripts/sync-nexus-batch.mjs 500 3500` | 3500-3960 |

**Tiempo estimado:** ~10 min por lote = ~80 min total

## 🚀 Script Automático

Para sincronizar todo automáticamente:

```bash
# Windows PowerShell
for ($i = 0; $i -lt 4000; $i += 500) {
  node scripts/sync-nexus-batch.mjs 500 $i
  if ($LASTEXITCODE -ne 0) { break }
}

# Unix/Mac/Git Bash
for i in {0..3500..500}; do
  node scripts/sync-nexus-batch.mjs 500 $i || break
done
```

## 🔍 Verificación

Después de cada lote, verifica:

```bash
# Cuántas landings hay en .netlify-live
Get-ChildItem -Recurse .netlify-live -Filter "index.html" | Measure-Object | Select-Object Count
```

## 💡 Tips

1. **Empieza con lotes pequeños** (250-500) para probar
2. **Verifica cada lote** antes de continuar
3. **Si falla un lote**, reintenta solo ese lote
4. **No sincronices más de lo necesario** - solo las 1402 canónicas primero

## ⚠️ Nota Importante

Este script **modifica** el comportamiento de `build:nexus` con variables de entorno:
- `NEXUS_BATCH_SIZE`: Límite de landings por ejecución
- `NEXUS_BATCH_START`: Índice inicial
- `SEO_SYNC_FORCE=0`: No forzar full sync

**Pendiente:** Modificar `scripts/netlify-build-nexus.mjs` y `scripts/lib/sync-seo-from-live.mjs` para soportar estas variables.

## 🎯 Plan Recomendado

1. **Deploy inmediato:** SPA con optimizaciones de performance (sin landings)
2. **Después:** Sincronizar landings en lotes de 500
3. **Re-deploy:** Con las landings incluidas

De esta forma el sitio mejora el performance AHORA, y luego agregamos las landings gradualmente.
