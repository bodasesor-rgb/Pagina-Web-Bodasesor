#!/usr/bin/env bash
# Sube la cuenta de servicio Google a Hostinger (Nexus SEO).
#
# Configura en .env.local:
#   HOSTINGER_SSH=user@123.456.789.0
#   HOSTINGER_CREDENTIALS_PATH=/home/user/nexus/private/credentials/nexus-ia-power-ef9a95a9817b.json
#
# Uso: bash scripts/upload-credentials-hostinger.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/private/credentials/nexus-ia-power-ef9a95a9817b.json"

if [[ ! -f "$SRC" ]]; then
  echo "❌ No existe $SRC"
  echo "   Coloca el JSON en private/credentials/nexus-ia-power-ef9a95a9817b.json"
  exit 1
fi

if [[ -f "$ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.local"
  set +a
fi

: "${HOSTINGER_SSH:?Define HOSTINGER_SSH en .env.local (ej: u123456789@123.45.67.89)}"
: "${HOSTINGER_CREDENTIALS_PATH:?Define HOSTINGER_CREDENTIALS_PATH en .env.local}"

REMOTE_DIR="$(dirname "$HOSTINGER_CREDENTIALS_PATH")"

echo "▶ Subiendo credenciales a Hostinger..."
echo "  Host: $HOSTINGER_SSH"
echo "  Destino: $HOSTINGER_CREDENTIALS_PATH"

ssh "$HOSTINGER_SSH" "mkdir -p '$REMOTE_DIR'"
scp "$SRC" "$HOSTINGER_SSH:$HOSTINGER_CREDENTIALS_PATH"
ssh "$HOSTINGER_SSH" "chmod 600 '$HOSTINGER_CREDENTIALS_PATH'"

echo "▶ Configurando GOOGLE_APPLICATION_CREDENTIALS en el servidor..."
ssh "$HOSTINGER_SSH" "grep -q 'GOOGLE_APPLICATION_CREDENTIALS' ~/.bashrc 2>/dev/null && sed -i 's|GOOGLE_APPLICATION_CREDENTIALS=.*|GOOGLE_APPLICATION_CREDENTIALS=$HOSTINGER_CREDENTIALS_PATH|' ~/.bashrc || echo 'export GOOGLE_APPLICATION_CREDENTIALS=$HOSTINGER_CREDENTIALS_PATH' >> ~/.bashrc"

echo "✓ Credenciales subidas. Reinicia la app Nexus en Hostinger (pm2 restart o panel)."
