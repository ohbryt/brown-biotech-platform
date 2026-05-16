#!/usr/bin/env python3
"""Brown Biotech weekly refinement context generator.

Reads the saved daily signal briefs and summarizes what is working,
what is noisy, and what should change next.
"""
from __future__ import annotations

import datetime as dt
import re
from collections import Counter
from pathlib import Path

REPO_ROOT = Path("/Users/ocm/apps/brown-biotech-platform")
DAILY_DIR = REPO_ROOT / "Daily-Briefs"
MAX_FILES = 7


def now_kst() -> dt.datetime:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=9)))


def latest_daily_files() -> list[Path]:
    files = sorted(DAILY_DIR.glob("*-brown-biotech-daily-signal-brief.md"), key=lambda p: p.stat().st_mtime, reverse=True)
    return files[:MAX_FILES]


def parse_file(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="ignore")
    sources = re.findall(r"^\d+\. \*\*\[(.*?)\]\((.*?)\)\*\* — ([^(\n]+)", text, flags=re.M)
    access = re.findall(r"^- (.*?: inaccessible .*?)$", text, flags=re.M)
    classes = re.findall(r"→ \*\*(Act|Refine|Archive)\*\*", text)
    titles = [s[0] for s in sources]
    source_names = [s[2].strip() for s in sources]
    return {
        "path": path,
        "text": text,
        "titles": titles,
        "sources": source_names,
        "access": access,
        "classes": classes,
    }


def render() -> str:
    files = latest_daily_files()
    today = now_kst().strftime("%Y-%m-%d %H:%M KST")
    if not files:
        return "\n".join([
            "# Brown Biotech weekly refinement context",
            f"Date: {today}",
            "",
            "## Source files",
            "- No saved daily briefs found",
        ])

    parsed = [parse_file(p) for p in files]
    source_counter = Counter()
    class_counter = Counter()
    access_counter = Counter()
    for p in parsed:
        source_counter.update(p["sources"])
        class_counter.update(p["classes"])
        access_counter.update(p["access"])

    top_sources = ", ".join(f"{k} ({v})" for k, v in source_counter.most_common(4)) or "none"
    top_classes = ", ".join(f"{k} ({v})" for k, v in class_counter.most_common()) or "none"
    access_note = "; ".join(f"{k} ×{v}" for k, v in access_counter.items()) if access_counter else "none"

    lines = [
        "# Brown Biotech weekly refinement context",
        f"Date: {today}",
        "",
        "## Source files",
        f"- reviewed {len(parsed)} saved daily brief(s)",
        f"- top source families: {top_sources}",
        f"- output classes seen: {top_classes}",
        f"- access issues: {access_note}",
        "",
        "## Repeated signal shape",
    ]

    repeated_titles = Counter(title for p in parsed for title in p["titles"])
    for title, count in repeated_titles.most_common(5):
        if count > 1:
            lines.append(f"- repeated headline: {title} ×{count}")
    if len(lines) == 8:
        lines.append("- no repeated headlines across the current saved briefs")

    lines += [
        "",
        "## Weekly memo guidance",
        "- If live verification is inconsistent, tighten the source list or the fetch method.",
        "- If generic funding/deal items dominate, sharpen the Brown relevance score.",
        "- If the same headlines keep recurring, the workflow is monitoring, not discovering.",
        "",
        "## Decision",
        "Refine",
        "",
        "## Next week priority",
        "- Improve article-level capture and preserve only the most Brown-relevant items in the daily file.",
    ]
    return "\n".join(lines)


def main() -> int:
    rendered = render()
    print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
