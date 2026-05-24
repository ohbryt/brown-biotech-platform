# Dataset Watch CI Pipeline

自动检测 → 验证 → 通知 for Brown Biotech research data sources.

## Architecture

```
arXiv / Zenodo / GitHub
        │
        ▼
┌─────────────────────────────┐
│  dataset-watch.yml        │
│  (GitHub Actions CI)       │
│                            │
│  ① sha256 diff check      │
│  ② checksum validation    │
│  ③ DOI DataCite check      │
│  ④ change classification  │
│  ⑤ Slack alert (meaningful)│
│  ⑥ state persist          │
└─────────────────────────────┘
        │
        ▼
  PRISM Pipeline Trigger
  (arp-v24 self-evolution)
```

## Files

```
.github/
├── workflows/
│   └── dataset-watch.yml    # Main CI pipeline (GitHub Actions)
├── scripts/
│   ├── arxiv-dataset-watch.py  # arXiv → dispatch bridge
│   └── zenodo-dataset-watch.py # Zenodo → dispatch bridge
└── state/
    └── state.json          # Committed state (git-tracked)

manifests/
└── biomed/
    └── manifest.json       # Dataset manifest (jq -S . | sha256)
```

## Quick Start

### 1. Enable repository dispatch (external triggers)

```bash
# Generate a personal access token with repo:public_repo scope
# Add it as GITHUB_TOKEN secret in repo settings

# To trigger manually:
curl -X POST https://api.github.com/repos/ohbryt/brown-biotech-platform/dispatches \
  -H "Authorization: token ghp_XXXXXXXXXXXX" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  --payload '{"event_type": "dataset-updated", "client_payload": {"source": "manual"}}'
```

### 2. Configure monitored sources

Go to repo Settings → Variables:
- `MANIFEST_URL` — remote manifest URL (optional, for external datasets)
- Or commit manifests directly to `manifests/biomed/manifest.json`

Add secrets:
- `SLACK_WEBHOOK` — Slack incoming webhook for alerts
- `ZENODO_TOKEN` — Zenodo API token (for sandbox testing)
- `GITHUB_TOKEN` — auto-provided by GitHub Actions

### 3. arXiv monitoring (standalone)

```bash
python3 .github/scripts/arxiv-dataset-watch.py --days 1
```

### 4. Zenodo monitoring (standalone)

```bash
python3 .github/scripts/zenodo-dataset-watch.py --dry-run
```

## Meaningful Change Criteria

Only these trigger alerts:

| Category | Trigger |
|----------|---------|
| `new_doi` | New DOI in manifest |
| `schema_version` | Schema version bump |
| `new_modality` | e.g., new 3D imaging, spatial transcriptomics |
| `added_batches` | New sample batch added |

Repackaging, file reordering, or timestamp-only changes are ignored.

## State Persistence

State is committed back to the repo:

```json
{
  "last_manifest_sha256": "a3f5c...abc1",
  "last_checked_timestamp": "2026-05-25T07:00:00Z",
  "last_seen_DOI": "10.1038/s41586-025-99999-0"
}
```

This means each CI run is idempotent and re-triggerable without duplicate notifications.

## Artifacts

Each run uploads:
- `manifest.json` — raw manifest
- `manifest.sorted.json` — jq -S normalized
- `manifest.sha256` — computed hash
- `datacite_*.json` — DOI validation responses
- `change_categories.txt` — comma-separated categories

## Connecting to PRISM

The `repository_dispatch` event type `dataset-updated` flows into:

```
GitHub webhook
    → arp-v24 pipeline
    → MEMO-style Memory Model update
    → new reflection QA pair generation
    → self-evolution trial log
```

See `arp-v24/docs/PRISM_COORDINATOR_CONTRACT_v2.md` for the coordinator protocol.