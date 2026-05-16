# Brown Biotech Research Watcher

This folder contains the weekly dataset watcher, a cron-friendly shell wrapper, a Python ingestion template, and a QC notebook skeleton.

## What it does

- scans **Hugging Face Datasets** and **GEO** for the Brown Biotech research axis
- scores each hit using the 10-point rubric from `BROWN_BIOTECH_RESEARCH_WATCHER_SPEC.md`
- writes a Markdown + JSON receipt for Monday / Wednesday / Friday runs
- provides a template for curating approved hits into an ingestion package
- includes a QC notebook skeleton for load → schema → metadata → QC → export

## Suggested cron schedule

```cron
# Monday 06:00 KST — scan + score + classify
0 6 * * 1 cd /Users/ocm/apps/brown-biotech-platform && bash research-watcher/run.sh scan

# Wednesday 06:00 KST — benchmark top 3
0 6 * * 3 cd /Users/ocm/apps/brown-biotech-platform && bash research-watcher/run.sh benchmark

# Friday 06:00 KST — worth-integrating report
0 6 * * 5 cd /Users/ocm/apps/brown-biotech-platform && bash research-watcher/run.sh report
```

## Files

- `run.sh` — cron-friendly wrapper with sane logging and per-mode output folders
- `watch_datasets.py` — source scraper + scorer for HF / GEO
- `ingest_template.py` — packaging template for approved dataset hits
- `publish_weekly_report.py` — Notion bridge for the Friday weekly report
- `qc_template.ipynb` — notebook skeleton for dataset QC

## Output layout

The watcher writes into:

- `research-watcher/output/<date>/<mode>/scan.json`
- `research-watcher/output/<date>/<mode>/scan.md`
- `research-watcher/output/<date>/<mode>/hits.jsonl`

The ingestion template writes curated packages into:

- `research-watcher/output/ingest/<slug>/manifest.json`
- `research-watcher/output/ingest/<slug>/notes.md`
- `research-watcher/output/ingest/<slug>/qc-plan.md`

The Notion bridge writes a weekly report page under the Brown Biotech HQ page when `NOTION_API_KEY` and `BROWN_BIOTECH_NOTION_HQ_PAGE_ID` are present.

## Routing rule

- **7+** → ingest immediately
- **4–6** → run QC first
- **3 or below** → archive only

## Notes

The scraper uses only the Python standard library so it can run in a cron job without extra dependencies.
