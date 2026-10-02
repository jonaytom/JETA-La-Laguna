#!/usr/bin/env bash
# Equivalente a publicar.ps1 para Linux / macOS (cron: */10 * * * * /ruta/al/repo/scripts/publicar.sh)
set -e
cd "$(dirname "$0")/.."
[ -d .git ] || { echo "No hay repositorio git"; exit 1; }
[ -f scripts/PUBLICAR.txt ] || [ "$1" = "--force" ] || exit 0
rm -f scripts/PUBLICAR.txt
[ -n "$(git status --porcelain)" ] || exit 0
VER=$(tr -d ' \n\r' < VERSION); TITLE=$(grep -m1 '^## ' CHANGELOG.md | sed 's/^## *//')
git add -A && git commit -q -m "v$VER - $TITLE" && (git tag "v$VER" 2>/dev/null || true) && git push -q origin HEAD --tags
echo "Publicada v$VER"
