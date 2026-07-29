# 🔑 Configurar GH_PUSH_TOKEN para Nexus

## Problema
Nexus genera imágenes correctamente, pero no puede hacer `git push` a bodasesor.com por falta de permisos (HTTP 403).

## Solución: Crear un Personal Access Token en GitHub

### Paso 1: Crear el Token

1. Abre GitHub en tu navegador
2. Haz click en tu avatar (arriba a la derecha)
3. Selecciona **Settings**
4. En el sidebar izquierdo, haz click en **Developer settings**
5. Haz click en **Personal access tokens**
6. Haz click en **Tokens (classic)** (o "Generate new token")
7. Haz click en **Generate new token (classic)**

### Paso 2: Configurar el Token

**Nombre**: `bodasesor-web-push`

**Expiration**: Elige "No expiration" (sin expiración) o 90 días

**Scopes** (permisos - IMPORTANTE):
- ✅ `repo` (Full control of private repositories)
  - Esto incluye: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`

**Haz click en "Generate token"**

### Paso 3: Copiar el Token

El token aparecerá en la pantalla. **CÓPIALO INMEDIATAMENTE** (solo aparece una vez).

Se verá algo como:
```
ghp_abcdefghijklmnopqrstuvwxyz123456789
```

---

## Paso 4: Agregar a GitHub Secrets de Seo-Nexus-2.0

1. Abre GitHub
2. Navega a tu repo: **bodasesor-rgb/seo-nexus-2.0**
3. Haz click en **Settings** (en la pestaña del repo)
4. En el sidebar, haz click en **Secrets and variables** → **Actions**
5. Haz click en **New repository secret**

**Configuración:**
- **Name**: `GH_PUSH_TOKEN`
- **Secret**: Pega el token que copiaste

6. Haz click en **Add secret**

---

## Paso 5: Verificar que el Workflow usa el Token

En seo-nexus-2.0, revisa el archivo `.github/workflows/deploy.yml` (o similar):

```yaml
- name: Push to bodasesor.com
  run: |
    git config user.email "ci@example.com"
    git config user.name "CI Bot"
    git remote set-url origin https://x-access-token:${{ secrets.GH_PUSH_TOKEN }}@github.com/bodasesor-rgb/Pagina-Web-Bodasesor.git
    git push origin main
```

Si no está así, necesita actualización.

---

## Paso 6: Probar

1. Haz un cambio pequeño en seo-nexus-2.0
2. Haz `git push origin main`
3. Espera a que GitHub Actions dispare
4. Verifica que NO hay error 403

---

## ¿Funcionó?

Si ves en bodasesor.com:
- ✅ `public/images/blog/*` con imágenes
- ✅ `blog/*` con artículos

Entonces **SÍ FUNCIONÓ**.

---

## Seguridad

El token que creaste:
- ✅ Solo puede hacer push a repos que controlas
- ✅ GitHub puede revocarlo en cualquier momento
- ✅ No aparece en logs (GitHub lo oculta)
- ⚠️ Guarda el token en un lugar seguro

Para **revocar** el token si es necesario:
- GitHub → Settings → Developer settings → Personal access tokens → Delete

---

## Resumen

```
Token creado → Agregado a seo-nexus-2.0 secrets
    ↓
Workflow de Nexus usa GH_PUSH_TOKEN
    ↓
git push a bodasesor.com funciona
    ↓
bodasesor.com recibe imágenes
    ↓
GitHub Actions de bodasesor.com dispara
    ↓
merge-live-into-dist preserva imágenes
    ↓
Netlify deploya
    ↓
bodasesor.com con imágenes ✓
```

**Una vez hecho esto, TODO FUNCIONA AUTOMÁTICAMENTE.**
