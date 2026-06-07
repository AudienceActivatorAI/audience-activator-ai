#!/usr/bin/env bash
# Parse KEY=VALUE lines from dotenv files without shell interpolation.

read_env_value() {
  local file="$1"
  local key="$2"
  local line

  if [[ ! -f "$file" ]]; then
    return 1
  fi

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" != "${key}="* ]] && continue
    printf '%s' "${line#${key}=}"
    return 0
  done <"$file"

  return 1
}
