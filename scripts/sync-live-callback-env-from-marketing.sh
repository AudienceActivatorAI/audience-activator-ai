#!/usr/bin/env bash
# Copy live-callback env vars from Vercel project "marketing" (salesassistant.tredfi.com)
# into this project's Vercel env (audience-activator-ai / audienceactivator.ai).
#
# Prerequisites: vercel CLI logged in, same team (audience-activator-sales-pages-projects).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MARKETING_DIR="${MARKETING_DIR:-$HOME/sales assistant/apps/marketing}"
TMPFILE="$(mktemp)"
trap 'rm -f "$TMPFILE"' EXIT

LIVE_CALLBACK_VARS=(
  ELEVENLABS_API_KEY
  ELEVENLABS_AGENT_PHONE_NUMBER_ID
  ELEVENLABS_AGENT_PHONE_NUMBER_ID_SHARED
  ELEVENLABS_AGENT_ID_INBOUND_QUALIFIER
  ELEVENLABS_AGENT_ID_OUTBOUND_REACTIVATION
  ELEVENLABS_AGENT_ID_APPOINTMENT_RESCUE
  ELEVENLABS_AGENT_ID_TRADE_IN
  ELEVENLABS_AGENT_ID_FINANCE_HANDOFF
  ELEVENLABS_AGENT_ID_SHARED
  ELEVENLABS_AGENT_ID_PRIME
  ELEVENLABS_AGENT_ID_NEAR_PRIME
  ELEVENLABS_AGENT_ID_FIRST_TIME_SUBPRIME
  ELEVENLABS_VOICE_ID_MAYA
  ELEVENLABS_VOICE_ID_AVERY
  ELEVENLABS_VOICE_ID_ERIC
  ELEVENLABS_VOICE_ID_SHARED
  TWILIO_ACCOUNT_SID
  TWILIO_AUTH_TOKEN
  MARKETING_LEAD_NOTIFY_WEBHOOK_URL
  MARKETING_LEAD_NOTIFY_WEBHOOK_SECRET
)

if [[ ! -d "$MARKETING_DIR/.vercel" ]]; then
  echo "Marketing project not found at: $MARKETING_DIR" >&2
  echo "Set MARKETING_DIR to apps/marketing in the sales assistant repo." >&2
  exit 1
fi

echo "Pulling production env from marketing..."
(
  cd "$MARKETING_DIR"
  vercel env pull "$TMPFILE" --environment=production --yes
)

echo "Syncing into audience-activator-ai (production, preview, development)..."
cd "$ROOT_DIR"

synced=0
for var in "${LIVE_CALLBACK_VARS[@]}"; do
  line="$(grep -E "^${var}=" "$TMPFILE" || true)"
  if [[ -z "$line" ]]; then
    continue
  fi

  value="${line#*=}"
  value="${value%\"}"
  value="${value#\"}"
  if [[ -z "$value" ]]; then
    continue
  fi

  for env in production preview development; do
    vercel env rm "$var" "$env" --yes 2>/dev/null || true
    printf '%s' "$value" | vercel env add "$var" "$env" >/dev/null
  done

  echo "  ✓ $var"
  synced=$((synced + 1))
done

if [[ "$synced" -eq 0 ]]; then
  echo "No live-callback vars found on marketing. Check Vercel project env settings." >&2
  exit 1
fi

echo "Done — synced $synced variable(s). Redeploy audience-activator-ai for production."
