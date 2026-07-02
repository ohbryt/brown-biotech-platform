#!/usr/bin/env python3
"""
bb_intel_watch.py — Brown Biotech competitive-intel watcher.

Added 2026-07-02 in response to the "biology-agent wave" opening with
Phylo/Biomni Lab (2026-06-29) and Boltz + Anthropic Claude Science
(2026-06-30). Polls lightweight, no-auth endpoints for the vendors that
matter to Brown Biotech — funding, releases, models, benchmarks — and
emits JSONL into research-watcher/output/<date>/intel/scan.jsonl.

Sources tracked
---------------
1. HuggingFace Trending API (no auth) — surface newly popular models
   from watched orgs.
2. arXiv recent listings for watched authors / groups (Biomni, Boltz,
   SNAP, Anthropic bio).

Why no blog RSS
---------------
Phylo, Boltz, and Anthropic do not currently publish RSS feeds that
respond (verified 2026-07-02; see brown-biotech-cron-silent-failure
skill §21). Instead, this script consumes HuggingFace / arXiv — both
of which are public, no-auth, and where the same vendors publish their
first-party artifacts (models, papers, releases).

Output schema
-------------
Each line is one event:
    {
      "ts": "2026-07-02T06:30:00Z",
      "kind": "hf_trending" | "arxiv" | "hf_org" | "hf_tag",
      "vendor": "phylo" | "boltz" | "anthropic" | "snap-stanford" | ...,
      "title": "<human-readable>",
      "url": "<canonical>",
      "score": <int, optional — HF likes / downloads>,
      "raw": {<full upstream payload, optional>}
    }

Schedule
--------
Intended to run from cron every 6 hours. Output dir:
    ~/apps/brown-biotech-platform/research-watcher/output/<YYYY-MM-DD>/intel/scan.jsonl
Also appended to:
    ~/apps/brown-biotech-platform/research-watcher/output/latest/intel.jsonl
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import logging
import re
import sys
import time
from pathlib import Path
from typing import Any, Optional
from urllib.parse import quote_plus
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

logger = logging.getLogger(__name__)

WATCH_ROOT = Path("/Users/ocm/apps/brown-biotech-platform/research-watcher")
OUTPUT_ROOT = WATCH_ROOT / "output"

VENDORS: list[dict] = [
    {
        "vendor": "phylo",
        "label": "Phylo (Biomni Lab)",
        "arxiv_query": "Biomni OR \"Biomni Lab\"",
        "hf_org": None,
        "hf_tags": ["biomni"],
    },
    {
        "vendor": "boltz",
        "label": "Boltz",
        "arxiv_query": '"Boltz-2" OR "Boltz API" OR Boltz cofold',
        "hf_org": None,
        "hf_tags": ["boltz"],
    },
    {
        "vendor": "snap-stanford",
        "label": "Stanford SNAP (Biomni open-source)",
        "arxiv_query": "Stanford SNAP biomni",
        "hf_org": "snap-stanford",
        "hf_tags": [],
    },
    {
        "vendor": "anthropic-science",
        "label": "Anthropic Claude Science",
        "arxiv_query": "Anthropic biology agent Claude",
        "hf_org": None,
        "hf_tags": ["claude-science"],
    },
]

ARXIV_QUERY_URL = (
    "http://export.arxiv.org/api/query?search_query={q}&start=0&max_results={n}"
    "&sortBy=submittedDate&sortOrder=descending"
)
HF_MODELS_URL = "https://huggingface.co/api/models?author={author}&limit={n}"
HF_MODELS_TAG_URL = "https://huggingface.co/api/models?search={tag}&limit={n}"

DEFAULT_MAX_PER_VENDOR = 8
HTTP_TIMEOUT = 15


# ── HTTP helpers ────────────────────────────────────────────────────────────


def utcnow_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _request(url: str, timeout: int = HTTP_TIMEOUT) -> Optional[bytes]:
    req = Request(url, headers={"User-Agent": "bb-intel-watch/0.1"})
    try:
        with urlopen(req, timeout=timeout) as r:
            return r.read()
    except (HTTPError, URLError) as e:
        logger.warning("HTTP error for %s: %s", url, e)
        return None
    except Exception as e:
        logger.warning("Unexpected error for %s: %s", url, e)
        return None


def http_get_json(url: str, timeout: int = HTTP_TIMEOUT) -> Optional[Any]:
    raw = _request(url, timeout)
    if raw is None:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        logger.warning("JSON decode error for %s: %s", url, e)
        return None


def http_get_text(url: str, timeout: int = HTTP_TIMEOUT) -> Optional[str]:
    raw = _request(url, timeout)
    if raw is None:
        return None
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        return raw.decode("latin-1", errors="ignore")


# ── Source fetchers ─────────────────────────────────────────────────────────


def fetch_arxiv(vendor: dict, n: int) -> list[dict]:
    """Parse the arXiv Atom feed (no auth). Returns list of events."""
    url = ARXIV_QUERY_URL.format(q=quote_plus(vendor["arxiv_query"]), n=n)
    text = http_get_text(url)
    if not text:
        return []
    events: list[dict] = []
    # Light Atom scrape — pull <entry> blocks via simple regex. We avoid an
    # XML dependency because cron runs are stdlib-only by policy.
    for m in re.finditer(r"<entry>(.*?)</entry>", text, flags=re.DOTALL):
        block = m.group(1)
        title_m = re.search(r"<title>(.*?)</title>", block, flags=re.DOTALL)
        link_m = re.search(r'<id>(https?://arxiv\.org/abs/[^<]+)</id>', block)
        pub_m = re.search(r"<published>([^<]+)</published>", block)
        title = (title_m.group(1).strip() if title_m else "")[:200]
        link = (link_m.group(1).strip() if link_m else "").strip()
        pub = (pub_m.group(1).strip() if pub_m else "")
        if not title or not link:
            continue
        events.append({
            "kind": "arxiv",
            "vendor": vendor["vendor"],
            "title": re.sub(r"\s+", " ", title),
            "url": link,
            "score": 0,
            "ts": pub or utcnow_iso(),
        })
        if len(events) >= n:
            break
    return events


def fetch_hf_org(vendor: dict, n: int) -> list[dict]:
    """HuggingFace model listing for an org. No-auth, returns JSON list."""
    if not vendor.get("hf_org"):
        return []
    url = HF_MODELS_URL.format(author=quote_plus(vendor["hf_org"]), n=n)
    items = http_get_json(url)
    events: list[dict] = []
    if not isinstance(items, list):
        return []
    for m in items[:n]:
        mid = m.get("modelId", m.get("id", "?"))
        events.append({
            "kind": "hf_org",
            "vendor": vendor["vendor"],
            "title": f"{vendor['hf_org']} · {mid}",
            "url": f"https://huggingface.co/{mid}",
            "score": m.get("downloads", 0) or m.get("likes", 0) or 0,
            "ts": utcnow_iso(),
            "raw": {
                "downloads": m.get("downloads", 0),
                "likes": m.get("likes", 0),
                "tags": m.get("tags", []),
            },
        })
    return events


def fetch_hf_tag(vendor: dict, n: int) -> list[dict]:
    """HuggingFace tag-based search. Useful when vendor publishes under tags."""
    if not vendor.get("hf_tags"):
        return []
    events: list[dict] = []
    for tag in vendor["hf_tags"]:
        url = HF_MODELS_TAG_URL.format(tag=quote_plus(tag), n=n)
        items = http_get_json(url)
        if not isinstance(items, list):
            continue
        for m in items[:n]:
            mid = m.get("modelId", m.get("id", "?"))
            events.append({
                "kind": "hf_tag",
                "vendor": vendor["vendor"],
                "title": f"#{tag} · {mid}",
                "url": f"https://huggingface.co/{mid}",
                "score": m.get("downloads", 0) or 0,
                "ts": utcnow_iso(),
                "raw": {
                    "downloads": m.get("downloads", 0),
                    "likes": m.get("likes", 0),
                },
            })
    return events


def gather_all_vendors(per_vendor: int) -> list[dict]:
    out: list[dict] = []
    for v in VENDORS:
        try:
            out.extend(fetch_arxiv(v, per_vendor))
        except Exception as e:
            logger.warning("arxiv fetch failed for %s: %s", v["vendor"], e)
        try:
            out.extend(fetch_hf_org(v, per_vendor))
        except Exception as e:
            logger.warning("hf org fetch failed for %s: %s", v["vendor"], e)
        try:
            out.extend(fetch_hf_tag(v, per_vendor))
        except Exception as e:
            logger.warning("hf tag fetch failed for %s: %s", v["vendor"], e)
        time.sleep(0.4)  # polite
    return out


def write_outputs(events: list[dict]) -> tuple[Path, Path]:
    """Write both dated and rolling 'latest' JSONL outputs."""
    today = dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).strftime("%Y-%m-%d")
    dated_dir = OUTPUT_ROOT / today / "intel"
    dated_dir.mkdir(parents=True, exist_ok=True)
    dated_path = dated_dir / "scan.jsonl"
    with open(dated_path, "w") as f:
        for ev in events:
            f.write(json.dumps(ev, ensure_ascii=False) + "\n")
    latest_dir = OUTPUT_ROOT / "latest"
    latest_dir.mkdir(parents=True, exist_ok=True)
    latest_path = latest_dir / "intel.jsonl"
    with open(latest_path, "w") as f:
        for ev in events:
            f.write(json.dumps(ev, ensure_ascii=False) + "\n")
    # Cap latest to last 200 lines so it stays small.
    if latest_path.exists():
        with open(latest_path) as f:
            lines = f.readlines()
        if len(lines) > 200:
            with open(latest_path, "w") as f:
                f.writelines(lines[-200:])
    return dated_path, latest_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--per-vendor", type=int, default=DEFAULT_MAX_PER_VENDOR)
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s | %(message)s",
    )

    events = gather_all_vendors(args.per_vendor)
    dated, latest = write_outputs(events)
    print(
        json.dumps(
            {
                "ts": utcnow_iso(),
                "events": len(events),
                "vendors": [v["vendor"] for v in VENDORS],
                "dated": str(dated),
                "latest": str(latest),
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
