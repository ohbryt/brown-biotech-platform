#!/usr/bin/env python3
"""Publish the weekly Brown Biotech research watcher report to Notion.

This script creates a child page under the Brown Biotech HQ page and appends
an evidence-backed summary of the latest scan output.

Environment:
- NOTION_API_KEY (required)
- BROWN_BIOTECH_NOTION_HQ_PAGE_ID (required unless --parent-page-id is passed)
- WATCHER_DISABLE_NOTION_PUBLISH=1 to skip publishing
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path
from typing import Any, Optional
from urllib.error import HTTPError
from urllib.request import Request, urlopen

NOTION_VERSION = "2025-09-03"
DEFAULT_PARENT_PAGE_ID = "356f2735-33a4-8118-b0fa-c44ec6b1cdfe"
AXIS_LABEL = "aging–fibrosis–metabolism–single-cell/spatial–clinical translation"


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def http_json(method: str, url: str, token: str, payload: Optional[dict[str, Any]] = None) -> Any:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
        },
    )
    try:
        with urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Notion request failed: {exc.code} {body}") from exc


def load_scan(path: Path) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(payload, dict) and payload.get("hits"):
        return payload
    if isinstance(payload, dict) and payload.get("title"):
        return {"mode": "scan", "hits": [payload], "queries": []}
    raise ValueError(f"Unsupported scan payload in {path}")


def page_title(scan: dict[str, Any]) -> str:
    mode = str(scan.get("mode") or "report").replace("_", " ")
    date = dt.datetime.now().strftime("%Y-%m-%d")
    return f"Brown Biotech dataset report — {mode} — {date}"


def summary_block(scan: dict[str, Any]) -> list[dict[str, Any]]:
    hits = scan.get("hits", [])
    top = sorted(hits, key=lambda item: (int(item.get("score", 0)), item.get("collected_at", "")), reverse=True)[:5]
    queries = scan.get("queries", [])[:12]

    blocks: list[dict[str, Any]] = [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {"rich_text": [{"type": "text", "text": {"content": "Weekly summary"}}]},
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": (
                                f"Axis: {AXIS_LABEL}. "
                                f"Collected {len(hits)} hits. "
                                f"Routing rule: 7+ ingest, 4–6 QC, 3 or below archive."
                            )
                        },
                    }
                ]
            },
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {"rich_text": [{"type": "text", "text": {"content": "Top hits"}}]},
        },
    ]

    if not top:
        blocks.append(
            {
                "object": "block",
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [{"type": "text", "text": {"content": "No hits collected."}}]
                },
            }
        )
    else:
        for hit in top:
            lines = [
                f"[{int(hit.get('score', 0))}/10] {hit.get('title', 'Untitled')}",
                f"Source: {hit.get('source', 'unknown')} · License: {hit.get('license', 'unknown')}",
                f"Next: {hit.get('next_action', 'Review provenance and decide.')}",
                f"URL: {hit.get('url', '')}",
            ]
            blocks.append(
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": "\n".join(lines)}}]
                    },
                }
            )

    blocks.extend(
        [
            {
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": [{"type": "text", "text": {"content": "Queries used"}}]},
            },
        ]
    )
    if queries:
        for query in queries:
            blocks.append(
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": query}}]
                    },
                }
            )
    else:
        blocks.append(
            {
                "object": "block",
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [{"type": "text", "text": {"content": "No query list found in scan payload."}}]
                },
            }
        )

    blocks.extend(
        [
            {
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": [{"type": "text", "text": {"content": "Provenance"}}]},
            },
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Every hit keeps source, license, and next-action metadata attached for review."
                            },
                        }
                    ]
                },
            },
        ]
    )
    return blocks


def create_notion_page(token: str, parent_page_id: str, scan: dict[str, Any]) -> dict[str, Any]:
    payload = {
        "parent": {"page_id": parent_page_id},
        "properties": {
            "title": {"title": [{"type": "text", "text": {"content": page_title(scan)}}]}
        },
    }
    page = http_json("POST", "https://api.notion.com/v1/pages", token, payload)
    page_id = page["id"]
    blocks = summary_block(scan)
    http_json(
        "PATCH",
        f"https://api.notion.com/v1/blocks/{page_id}/children",
        token,
        {"children": blocks},
    )
    return page


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Publish Brown Biotech weekly report to Notion.")
    parser.add_argument("--scan-file", default="research-watcher/output/latest/report.json", help="Path to the scan/report JSON.")
    parser.add_argument("--parent-page-id", default=os.getenv("BROWN_BIOTECH_NOTION_HQ_PAGE_ID", DEFAULT_PARENT_PAGE_ID), help="Notion page ID to attach the weekly report under.")
    parser.add_argument("--dry-run", action="store_true", help="Print the title and exit without creating a page.")
    return parser.parse_args(argv)


def main(argv: Optional[list[str]] = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)

    if os.getenv("WATCHER_DISABLE_NOTION_PUBLISH", "").strip().lower() in {"1", "true", "yes"}:
        print("Notion publish disabled via WATCHER_DISABLE_NOTION_PUBLISH")
        return 0

    api_key = os.getenv("NOTION_API_KEY")
    if not api_key:
        raise SystemExit("NOTION_API_KEY is required")

    scan_path = Path(args.scan_file)
    scan = load_scan(scan_path)
    if args.dry_run:
        print(page_title(scan))
        return 0

    page = create_notion_page(api_key, args.parent_page_id, scan)
    print(page.get("url") or page.get("id"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
