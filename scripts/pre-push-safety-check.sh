#!/bin/bash
# brown-biotech-platform pre-push safety check
set -euo pipefail

echo "[safety] Running Brown Biotech pre-push checks..."

check_pattern() {
  local label="$1"
  local pattern="$2"
  local hits
  hits=$(git grep -nE "$pattern" 2>/dev/null || true)
  if [[ -n "$hits" ]]; then
    echo "[BLOCKED] $label found:"
    echo "$hits"
    exit 1
  fi
  echo "[OK] $label"
}

check_pattern "API tokens" 'sk-[A-Za-z0-9_-]{20,}|gh[pous]_[A-Za-z0-9_]{20,}|AIza[A-Za-z0-9_-]{35}|ntn_[A-Za-z0-9_-]{30}'
check_pattern "Private key block" 'BEGIN\s+(RSA|OPENSSH|EC|DSA)\s+PRIVATE\s+KEY'
check_pattern "Private paths" '/Users/[a-z]+/|/Volumes/[A-Z][a-z0-9]+ |C:\\Users\\'
check_pattern "Internal hostnames" '[a-z]+\.(brownbio|bb-dev|lab)\.(tech|local)'
check_pattern "Korean resident number" '[0-9]{6}-[1-4][0-9]{6}'
check_pattern "MRN" 'mrn[:\s]*[0-9]{6,}'

echo "[safety] All checks passed."