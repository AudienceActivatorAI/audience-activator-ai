#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/team/james-hamilton.jpg"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

mkdir -p "$ROOT/public/team"

echo "Fetching LinkedIn profile page..."
HTML="$(mktemp)"
trap 'rm -f "$HTML"' EXIT

if ! curl -fsSL -A "$UA" "https://www.linkedin.com/in/tredfi/" -o "$HTML"; then
  echo "LinkedIn blocked the request. Save your profile photo manually to:"
  echo "  $OUT"
  exit 1
fi

OG="$(grep -oE 'property="og:image" content="[^"]+"' "$HTML" | sed 's/.*content="//;s/"$//' | head -1)"
if [ -z "$OG" ]; then
  echo "Could not find og:image on LinkedIn page."
  echo "Right-click your profile photo on LinkedIn and save it to:"
  echo "  $OUT"
  exit 1
fi

echo "Downloading $OG"
curl -fsSL -A "$UA" "$OG" -o "$OUT"
file "$OUT"
ls -la "$OUT"
