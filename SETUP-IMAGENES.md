# Instalación rápida - Sistema de Imágenes Automático

## 🚀 Setup (Solo una vez)

Ya está casi todo listo. Solo necesitas activar el git hook:

```bash
# Activar el hook de pre-commit
npx husky install

# ¡Listo! Ya está funcionando
```

## ✅ Cómo Funciona Ahora

### Opción 1: Automático con Git (Recomendado)

```bash
# 1. Agregar una imagen nueva
cp tu-foto.jpg public/images/galeria/

# 2. Git commit normal
git add public/images/galeria/tu-foto.jpg
git commit -m "feat: nueva foto evento"

# 🎉 Automáticamente se crean:
#    - tu-foto.webp (desktop)
#    - tu-foto-sm.webp (mobile)
#    Y se agregan al commit
```

### Opción 2: Watch Mode en Desarrollo

```bash
# En una terminal aparte mientras trabajas
npm run watch:images

# Cada vez que copies/agregues una imagen:
# 📸 Se detecta automáticamente
# ⏱️ Espera 2 segundos (por si agregas más)
# ✅ Convierte todo a WebP
```

### Opción 3: Manual (Si lo Prefieres)

```bash
# Convertir todas las imágenes manualmente
npm run generate:webp
```

## 📊 Qué se Genera

Para cada imagen `foto.jpg` o `foto.png`:

```
public/images/galeria/
├── foto.jpg          ← Original (fallback)
├── foto.webp         ← Desktop (1200px max, 68% calidad)
└── foto-sm.webp      ← Mobile (480px max, 64% calidad)
```

## 💡 Tips Rápidos

- **Fotos grandes del celular** → Se redimensionan automáticamente
- **Ya tiene WebP** → Se regenera solo si está muy pesado
- **Build production** → Siempre genera WebP actualizado
- **No toques los .webp** → Se regeneran solos

## 🧪 Probarlo

```bash
# 1. Copia una foto de prueba
cp alguna-foto.jpg public/images/test.jpg

# 2. Haz commit
git add public/images/test.jpg
git commit -m "test: verificar auto webp"

# 3. Verifica que se crearon:
ls public/images/test*.webp

# Deberías ver:
# test.webp
# test-sm.webp
```

## 📖 Documentación Completa

Ver `docs/AUTO-WEBP.md` para:
- Configuración avanzada
- Troubleshooting
- Especificaciones técnicas
- Ejemplos de impacto en performance
