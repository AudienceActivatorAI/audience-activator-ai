#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
RSVG="${RSVG_CONVERT:-rsvg-convert}"

if ! command -v "$RSVG" >/dev/null 2>&1; then
  echo "rsvg-convert not found. Install librsvg or set RSVG_CONVERT."
  exit 1
fi

export_png() {
  local svg="$1"
  local width="$2"
  local out="$3"
  "$RSVG" -w "$width" "$svg" -o "$out"
  echo "Wrote $out"
}

for width in 400 800 1600; do
  export_png "$BRAND/audience-activator-wordmark.svg" "$width" "$BRAND/audience-activator-wordmark-${width}w.png"
  export_png "$BRAND/audience-activator-lockup.svg" "$width" "$BRAND/audience-activator-lockup-${width}w.png"
done

for size in 180 512; do
  export_png "$BRAND/audience-activator-mark.svg" "$size" "$BRAND/audience-activator-mark-${size}.png"
done

cp "$BRAND/audience-activator-mark.svg" "$BRAND/audience-activator-favicon.svg"
for size in 16 32 48 180 512; do
  export_png "$BRAND/audience-activator-mark.svg" "$size" "$BRAND/audience-activator-favicon-${size}.png"
done
