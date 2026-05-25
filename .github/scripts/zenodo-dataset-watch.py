#!/usr/bin/env python3
"""
zenodo-dataset-watch.py
Monitors Zenodo depositions for Brown Biotech datasets.
Fetches new/updated records since last checkpoint, validates, and triggers dispatch.

Usage:
    python3 zenodo-dataset-watch.py [--sandbox] [--dry-run]
"""

import subprocess
import sys
import json
import hashlib
import os
from datetime import datetime
from pathlib import Path
import urllib.request
import urllib.error

ZENODO_API = "https://sandbox.zenodo.org/api" if "--sandbox" in sys.argv else "https://zenodo.org/api"
STATE_FILE = Path(".github/state/zenodo-state.json")
GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "ohbryt/brown-biotech-platform")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
ZENODO_TOKEN = os.environ.get("ZENODO_TOKEN", "")

# Brown Biotech relevant communities / keywords
BB_KEYWORDS = ["peptide", "protein", "longevity", "senolytic", "cancer",
               "biomarker", "fibrosis", "anti-aging", "geroscience", " senescence"]


def fetch_depositions(since_date: str = None) -> list[dict]:
    """Fetch all depositions modified since since_date (ISO format)."""
    records = []
    page = 1
    per_page = 100

    while True:
        url = f"{ZENODO_API}/records"
        params = f"?page={page}&size={per_page}&sort=best&keywords={','.join(BB_KEYWORDS)}"
        if since_date:
            params += f"&updated={since_date}"

        try:
            req = urllib.request.Request(url + params, headers={"User-Agent": "BrownBiotech-PRISM/1.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            print(f"WARN: {url} returned {e.code}", file=sys.stderr)
            break

        items = data.get("hits", {}).get("hits", [])
        if not items:
            break

        for r in items:
            records.append({
                "id": r["id"],
                "title": r["metadata"].get("title", "N/A"),
                "doi": r["metadata"].get("doi", ""),
                "resource_type": r["metadata"].get("resource_type", {}).get("id", ""),
                "modified_date": r["updated"][:10],
                "files": [
                    {"filename": f["filename"], "size": f.get("size", 0)}
                    for f in r.get("files", [])
                ],
                "keywords": r["metadata"].get("keywords", [])
            })

        if len(items) < per_page:
            break
        page += 1

    return records


def validate_doi(doi: str) -> bool:
    """Check DOI resolves via DataCite."""
    if not doi:
        return False
    url = f"https://api.datacite.org/dois/{doi}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "BrownBiotech-PRISM/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except urllib.error.HTTPError:
        return False


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_seen_ids": [], "last_checked": ""}


def save_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2))


def trigger_dispatch(event_type: str, payload: dict):
    if not GITHUB_TOKEN:
        print("WARN: GITHUB_TOKEN not set — skipping dispatch", file=sys.stderr)
        return
    url = f"https://api.github.com/repos/{GITHUB_REPO}/dispatches"
    data = json.dumps({"event_type": event_type, "client_payload": payload}).encode()
    req = urllib.request.Request(url, data=data, method="POST", headers={
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "BrownBiotech-PRISM/1.0"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"Dispatch: {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"ERROR: {e.code} {e.read().decode()}", file=sys.stderr)


def main():
    args = sys.argv[1:]
    sandbox = "--sandbox" in args
    dry_run = "--dry-run" in args

    state = load_state()
    print(f"Fetching Zenodo depositions...")
    records = fetch_depositions()
    print(f"Total fetched: {len(records)}")

    new_records = [r for r in records if r["id"] not in state.get("last_seen_ids", [])]
    print(f"New records: {len(new_records)}")

    if not new_records:
        print("No new records — exiting.")
        return

    validated = []
    for r in new_records:
        doi_ok = validate_doi(r["doi"])
        r["doi_validated"] = doi_ok
        validated.append(r)
        print(f"  [{r['id']}] {'✓' if doi_ok else '?'} {r['title'][:60]}")

    payload = {
        "count": len(validated),
        "sandbox": sandbox,
        "sample": [
            {"id": r["id"], "title": r["title"][:80], "doi": r["doi"], "validated": r["doi_validated"]}
            for r in validated[:5]
        ]
    }

    if not dry_run:
        trigger_dispatch("zenodo-updated", payload)

    save_state({
        "last_seen_ids": [r["id"] for r in records[:500]],
        "last_checked": datetime.now().isoformat()
    })

    print("Done.")


if __name__ == "__main__":
    main()