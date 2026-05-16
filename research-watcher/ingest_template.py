#!/usr/bin/env python3
"""Brown Biotech dataset ingestion template.

Use this after a hit clears the intake threshold or after QC confirms the
package is worth curating.

The script writes a reproducible package directory containing:
- manifest.json
- notes.md
- qc-plan.md
- ingest-receipt.json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional


@dataclass
class IngestReceipt:
    title: str
    source: str
    score: int
    action: str
    output_dir: str
    created_at: str
    provenance: dict[str, Any]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(value: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-") or "dataset-package"


def load_hit(path: Path) -> dict[str, Any]:
    raw = path.read_text(encoding="utf-8")
    if path.suffix == ".jsonl":
        return json.loads(raw.splitlines()[0])

    payload = json.loads(raw)
    if isinstance(payload, dict) and payload.get("hits"):
        return payload["hits"][0]
    return payload


def choose_action(score: int) -> str:
    if score >= 7:
        return "ingest"
    if score >= 4:
        return "qc"
    return "archive"


def build_manifest(hit: dict[str, Any]) -> dict[str, Any]:
    return {
        "title": hit.get("title"),
        "source": hit.get("source"),
        "url": hit.get("url"),
        "license": hit.get("license"),
        "modality": hit.get("modality"),
        "score": hit.get("score"),
        "raw_file_availability": hit.get("raw_file_availability"),
        "key_metadata": hit.get("key_metadata", {}),
        "risk_signals": hit.get("risk_signals", []),
        "provenance": hit.get("provenance", {}),
        "created_at": now_iso(),
    }


def build_notes(hit: dict[str, Any], action: str) -> str:
    return "\n".join([
        f"# {hit.get('title', 'Dataset package')}",
        "",
        f"- Source: {hit.get('source')}",
        f"- Score: {hit.get('score', 0)}/10",
        f"- Action: {action}",
        f"- License: {hit.get('license')}",
        f"- Modality: {hit.get('modality')}",
        f"- URL: {hit.get('url')}",
        "",
        "## Why it matters",
        hit.get('why_it_matters', 'No summary provided.'),
        "",
        "## Immediate next step",
        hit.get('next_action', 'Review provenance and decide whether to ingest.'),
        "",
        "## Provenance",
        json.dumps(hit.get('provenance', {}), ensure_ascii=False, indent=2),
        "",
    ])


def build_qc_plan(hit: dict[str, Any]) -> str:
    return "\n".join([
        "# QC plan",
        "",
        "1. load",
        "2. schema check",
        "3. metadata summary",
        "4. cell / gene QC",
        "5. batch visualization",
        "6. quick UMAP",
        "7. toy DEG",
        "8. export parquet / zarr",
        "",
        f"- Hit title: {hit.get('title')}",
        f"- Source: {hit.get('source')}",
        f"- Score: {hit.get('score')}",
        "",
    ])


def write_package(hit: dict[str, Any], output_dir: Path) -> Path:
    slug = slugify(f"{hit.get('source', 'source')}-{hit.get('title', 'dataset')}")
    package_dir = output_dir / slug
    package_dir.mkdir(parents=True, exist_ok=True)

    manifest = build_manifest(hit)
    (package_dir / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    (package_dir / 'notes.md').write_text(build_notes(hit, choose_action(int(hit.get('score', 0)))), encoding='utf-8')
    (package_dir / 'qc-plan.md').write_text(build_qc_plan(hit), encoding='utf-8')

    receipt = IngestReceipt(
        title=hit.get('title', 'dataset'),
        source=hit.get('source', 'unknown'),
        score=int(hit.get('score', 0)),
        action=choose_action(int(hit.get('score', 0))),
        output_dir=str(package_dir),
        created_at=now_iso(),
        provenance=hit.get('provenance', {}),
    )
    (package_dir / 'ingest-receipt.json').write_text(json.dumps(asdict(receipt), indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    return package_dir


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Brown Biotech dataset ingestion template.')
    parser.add_argument('--input', required=True, help='Path to scan.json or a hit JSON file.')
    parser.add_argument('--output-dir', default='research-watcher/output/ingest', help='Where to write the package directory.')
    return parser.parse_args(argv)


def main(argv: Optional[list[str]] = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    hit = load_hit(Path(args.input))
    action = choose_action(int(hit.get('score', 0)))
    package_dir = write_package(hit, Path(args.output_dir))
    print(f"Built {action} package at: {package_dir}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
