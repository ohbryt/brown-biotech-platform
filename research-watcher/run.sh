#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-scan}"
STAMP="$(date +%F)"
OUTDIR="${ROOT}/research-watcher/output/${STAMP}/${MODE}"
LATEST_DIR="${ROOT}/research-watcher/output/latest"
LOGDIR="${ROOT}/research-watcher/logs"
mkdir -p "${OUTDIR}" "${LATEST_DIR}" "${LOGDIR}"

PYTHON_BIN="${PYTHON_BIN:-python3}"
LOG_FILE="${LOGDIR}/${STAMP}-${MODE}.log"

{
  echo "[brown-biotech] watcher start"
  echo "root=${ROOT}"
  echo "mode=${MODE}"
  echo "outdir=${OUTDIR}"
  "${PYTHON_BIN}" "${ROOT}/research-watcher/watch_datasets.py" \
    --mode "${MODE}" \
    --output-dir "${OUTDIR}" \
    --limit "${WATCHER_LIMIT:-5}" \
    --sources "${WATCHER_SOURCES:-hf,geo}" \
    --queries "${WATCHER_QUERIES:-all}"

  cp "${OUTDIR}/scan.json" "${LATEST_DIR}/scan.json"
  cp "${OUTDIR}/scan.md" "${LATEST_DIR}/scan.md"
  cp "${OUTDIR}/hits.jsonl" "${LATEST_DIR}/hits.jsonl"

  if [[ "${MODE}" == "report" && "${WATCHER_DISABLE_NOTION_PUBLISH:-0}" != "1" ]]; then
    REPORT_JSON="${ROOT}/research-watcher/output/${STAMP}/${MODE}/scan.json"
    if [[ -f "${REPORT_JSON}" ]]; then
      echo "[brown-biotech] publishing Notion weekly report"
      "${PYTHON_BIN}" "${ROOT}/research-watcher/publish_weekly_report.py" \
        --scan-file "${REPORT_JSON}" \
        --parent-page-id "${BROWN_BIOTECH_NOTION_HQ_PAGE_ID:-356f2735-33a4-8118-b0fa-c44ec6b1cdfe}"
    fi
  fi

  echo "[brown-biotech] watcher done"
} | tee "${LOG_FILE}"
