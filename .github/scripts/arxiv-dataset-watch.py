#!/usr/bin/env python3
"""
arxiv-dataset-watch.py
Monitors arXiv for new preprint categories relevant to Brown Biotech research.
Triggers GitHub repository_dispatch event on meaningful updates.

Usage:
    python3 arxiv-dataset-watch.py [--days 1] [--categories q-bio q-fin]

Categories:
    q-bio.BM  - Biomolecules
    q-bio.CB  - Cell Behavior
    q-bio.GN  - Genomics
    q-bio.MN  - Molecular Networks
    q-bio.NC  - Neurons and Cognition
    q-bio.OT  - Other Quantitative Biology
    q-bio.PE  - Populations and Evolution
    q-bio.QM  - Quantitative Methods
    q-bio.SC  - Subcellular Processes
    q-bio.TO  - Tissues and Organs
    q-fin.GN  - General Finance
    cs.AI     - Artificial Intelligence
    cs.LG     - Machine Learning
    q-bio     - All quantitative biology (broad sweep)
"""

import subprocess
import sys
import time
import json
import hashlib
import os
from datetime import datetime, timedelta
from pathlib import Path
import urllib.request
import urllib.error

ARXIV_API = "http://export.arxiv.org/api/query"
STATE_FILE = Path(".github/state/arxiv-state.json")
GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "ohbryt/brown-biotech-platform")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

# Categories aligned with PRISM research focus
BB_CATEGORIES = [
    "q-bio.BM", "q-bio.CB", "q-bio.GN", "q-bio.MN", "q-bio.NC",
    "q-bio.OT", "q-bio.PE", "q-bio.QM", "q-bio.SC", "q-bio.TO",
    "q-fin.GN", "cs.AI", "cs.LG"
]


def fetch_arxiv_feed(category: str, days_back: int = 1) -> list[dict]:
    """Fetch recent arXiv entries for a category via API."""
    start = 0
    max_results = 1000
    cutoff = datetime.now() - timedelta(days=days_back)
    entries = []

    search_query = f"cat:{category}"
    url = (f"{ARXIV_API}?search_query={search_query}"
           f"&start={start}&max_results={max_results}"
           f"&sortBy=submittedDate&sortOrder=descending")

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "BrownBiotech-PRISM/1.0"})
        with urllib.request.urlopen(req, timeout=30) as response:
            xml_body = response.read().decode("utf-8")
    except urllib.error.URLError as e:
        print(f"WARN: Failed to fetch {category}: {e}", file=sys.stderr)
        return []

    import xml.etree.ElementTree as ET
    root = ET.fromstring(xml_body)
    ns = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}

    for entry in root.findall("atom:entry", ns):
        try:
            published_str = entry.find("atom:published", ns).text[:10]  # YYYY-MM-DD
            published = datetime.strptime(published_str, "%Y-%m-%d")
            if published < cutoff:
                break
            title_el = entry.find("atom:title", ns)
            title = title_el.text.replace("\n", " ").strip() if title_el is not None else "N/A"
            summary_el = entry.find("atom:summary", ns)
            summary = summary_el.text.replace("\n", " ").strip() if summary_el is not None else "N/A"
            authors = [
                a.find("atom:name", ns).text
                for a in entry.findall("atom:author", ns)
                if a.find("atom:name", ns) is not None
            ]
            arxiv_id = entry.find("atom:id", ns).text.split("/")[-1]
            entries.append({
                "arxiv_id": arxiv_id,
                "title": title,
                "summary": summary[:500],
                "authors": authors[:5],
                "published": published_str,
                "category": category
            })
        except Exception as e:
            print(f"WARN: Failed to parse entry: {e}", file=sys.stderr)
            continue

    return entries


def compute_feed_hash(entries: list[dict]) -> str:
    """Stable hash of feed for change detection."""
    canonical = json.dumps(entries, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(canonical.encode()).hexdigest()[:16]


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_hash": "", "last_checked": "", "last_seen_ids": []}


def save_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2))


def trigger_dispatch(event_type: str, payload: dict):
    """Trigger GitHub repository_dispatch event."""
    if not GITHUB_TOKEN:
        print("WARN: GITHUB_TOKEN not set — skipping dispatch", file=sys.stderr)
        return

    url = f"https://api.github.com/repos/{GITHUB_REPO}/dispatches"
    data = json.dumps({
        "event_type": event_type,
        "client_payload": payload
    }).encode()

    req = urllib.request.Request(url, data=data, method="POST", headers={
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "BrownBiotech-PRISM/1.0"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"Dispatch triggered: {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"ERROR: Dispatch failed {e.code}: {e.read().decode()}", file=sys.stderr)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Brown Biotech arXiv Dataset Watch")
    parser.add_argument("--days", type=int, default=1, help="Days to look back (default: 1)")
    parser.add_argument("--categories", nargs="+", default=BB_CATEGORIES,
                        help=f"arXiv categories to monitor (default: {BB_CATEGORIES})")
    parser.add_argument("--dry-run", action="store_true", help="Don't trigger dispatches")
    args = parser.parse_args()

    state = load_state()
    all_entries = []

    print(f"Checking arXiv for {args.days} day(s) across {len(args.categories)} categories...")
    for cat in args.categories:
        entries = fetch_arxiv_feed(cat, days_back=args.days)
        print(f"  {cat}: {len(entries)} new entries")
        all_entries.extend(entries)
        time.sleep(3)  # Respect rate limits

    current_hash = compute_feed_hash(all_entries)
    print(f"\nFeed hash: {current_hash}")

    if current_hash == state.get("last_hash"):
        print("No new preprints — exiting.")
        return

    new_entries = [e for e in all_entries if e["arxiv_id"] not in state.get("last_seen_ids", [])]
    print(f"New entries: {len(new_entries)}")

    # Classify new entries by research theme
    themes = {"longevity": 0, "oncology": 0, "ai_biotech": 0, "other": 0}
    for e in new_entries:
        text = (e["title"] + " " + e["summary"]).lower()
        if any(k in text for k in ["senolytic", "senescence", "aging", "longevity", "calorie", "autophagy", "telomere"]):
            themes["longevity"] += 1
        elif any(k in text for k in ["cancer", "tumor", "carcinoma", "oncology", "melanoma", "glioma"]):
            themes["oncology"] += 1
        elif any(k in text for k in ["llm", "gpt", "protein", "drug discovery", "biomarker", "mrna", "peptide"]):
            themes["ai_biotech"] += 1
        else:
            themes["other"] += 1

    print(f"Themes: {themes}")

    payload = {
        "new_count": len(new_entries),
        "themes": themes,
        "sample_titles": [e["title"][:80] for e in new_entries[:5]],
        "feed_hash": current_hash
    }

    if not args.dry_run:
        trigger_dispatch("arxiv-updated", payload)

    save_state({
        "last_hash": current_hash,
        "last_checked": datetime.now().isoformat(),
        "last_seen_ids": [e["arxiv_id"] for e in all_entries[-500:]]  # Keep last 500
    })

    print("Done.")


if __name__ == "__main__":
    main()