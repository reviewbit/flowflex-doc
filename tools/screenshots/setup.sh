#!/usr/bin/env bash
# One-time setup of a headless browser for docs screenshots, without sudo.
# Installs Playwright here and unpacks Chromium's system libraries into ~/.cache/docs-shots.
set -euo pipefail
cd "$(dirname "$0")"
CACHE="${DOCS_SHOTS_CACHE:-$HOME/.cache/docs-shots}"
mkdir -p "$CACHE/debs" "$CACHE/root"
npm install --no-audit --no-fund playwright@1.56 >/dev/null
PLAYWRIGHT_BROWSERS_PATH="$CACHE/browsers" npx playwright install chromium-headless-shell >/dev/null 2>&1 || true
cd "$CACHE/debs"
apt-get download libnspr4 libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 libatspi2.0-0t64 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libxkbcommon0 libasound2t64 \
  libcups2t64 libdbus-1-3 libxext6 libx11-6 libxcb1 libxau6 libxdmcp6 libdrm2 \
  libwayland-server0 libexpat1 libpango-1.0-0 libcairo2 libavahi-common3 libavahi-client3 \
  libgnutls30t64 libxi6 libxrender1 libxtst6 libxshmfence1 libfontconfig1 libfreetype6 \
  libpng16-16t64 libbrotli1 libharfbuzz0b libglib2.0-0t64 libpcre2-8-0 libffi8 \
  libgraphite2-3 fontconfig-config fonts-dejavu-core fonts-noto-core fonts-inter >/dev/null 2>&1 || true
for d in *.deb; do dpkg-deb -x "$d" "$CACHE/root"; done
cat > "$CACHE/fonts.conf" <<CONF
<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig><dir>$CACHE/root/usr/share/fonts</dir><cachedir>$CACHE/fccache</cachedir></fontconfig>
CONF
echo "Ready. Browser and libraries are in $CACHE"
