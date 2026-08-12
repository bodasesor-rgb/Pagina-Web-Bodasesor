# Acceso persistente a Google Search Console (para agentes / CI)

Para que Cursor (y los scripts del repo) puedan auditar indexación **en cualquier sesión**,
hay que dejar una **Service Account** con permiso en la propiedad GSC y el JSON en un secret.

## 1) Google Cloud (una sola vez)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Elige o crea un proyecto (ej. `bodasesor-seo`)
3. **APIs y servicios → Biblioteca** → activa:
   - **Google Search Console API**
4. **APIs y servicios → Credenciales → Crear credenciales → Cuenta de servicio**
   - Nombre: `bodasesor-gsc-audit`
   - Rol: ninguno especial en GCP (el permiso real se da en Search Console)
5. Abre la cuenta de servicio → **Claves → Agregar clave → JSON** → descarga el archivo
6. Copia el email (`…@….iam.gserviceaccount.com`)

## 2) Search Console (una sola vez)

1. [Search Console](https://search.google.com/search-console) → propiedad **`https://bodasesor.com/`**  
   (o dominio `bodasesor.com` si usas Domain property)
2. **Configuración → Usuarios y permisos → Añadir usuario**
3. Pega el email de la service account
4. Permiso: **Completo** (recomendado) o **Restringido** (solo lectura)

Sin este paso el script falla con “property not found / permission”.

## 3) Secret para Cursor Cloud Agent (persistente)

En el **Dashboard del entorno Cloud Agent** de Cursor (o secrets del team/repo vinculados al agente):

| Secret | Valor |
|--------|--------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Contenido **completo** del JSON de la clave (una sola línea o multilinea) |
| `GSC_SITE_URL` (opcional) | `https://bodasesor.com/` |

Alternativa: `GOOGLE_APPLICATION_CREDENTIALS` = ruta a un archivo de clave montado (menos cómodo en cloud).

**No subas el JSON al git.** Ya está ignorado el patrón típico; igual no lo commits.

## 4) Secret opcional en GitHub Actions

Si quieres auditoría en CI:

- Repo → **Settings → Secrets and variables → Actions**
- Añade el mismo `GOOGLE_SERVICE_ACCOUNT_JSON`

## 5) Probar

```bash
npm run gsc:audit
# o
node scripts/gsc-audit.mjs
node scripts/gsc-audit.mjs --inspect=/banquete-de-lujo-estado-de-mexico/
```

Salida:
- Lista de sitemaps en GSC
- Páginas con datos de Search Analytics
- Comparación vs `sitemap.xml` (candidatas sin impresiones)
- Informe en `.gsc-audit/` (gitignored)

## Límites de la API (importante)

La UI de GSC (**Páginas → No indexadas** con motivos exactos) **no se replica 1:1** por API.

Lo que sí podemos hacer siempre con acceso:

| Capacidad | API |
|-----------|-----|
| Confirmar acceso a la propiedad | Sites |
| Sitemaps enviados / errores | Sitemaps |
| Páginas con clics/impresiones | Search Analytics |
| Estado de indexación de una URL | URL Inspection (`--inspect=`) |
| Cruzar sitemap vs “con datos” | Script local |

Para el desglose completo de motivos (“Rastreada, no indexada”, etc.), el export CSV de GSC sigue siendo el complemento; con el secret ya puedo inspeccionar URLs y priorizar fixes.

## Checklist rápido

- [ ] Search Console API activada en GCP
- [ ] Service account creada + JSON descargado
- [ ] Email SA añadido como usuario en GSC `bodasesor.com`
- [ ] Secret `GOOGLE_SERVICE_ACCOUNT_JSON` en Cursor Cloud
- [ ] `npm run gsc:audit` imprime properties y sitemaps (no error de permiso)

Cuando el secret esté puesto, escribe en el chat: **“GSC secret listo”** y corro la auditoría.
