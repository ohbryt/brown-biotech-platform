#!/usr/bin/env python3
"""Brown Biotech daily live signal collector.

Fetches current headlines from fixed source families and prints a compact
markdown context block for the daily signal brief. Also saves the rendered
output into the Brown Biotech Daily-Briefs folder for later weekly review.
"""
from __future__ import annotations

import datetime as dt
import html
import re
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
TIMEOUT = 25
MAX_ITEMS_PER_SOURCE = 4
MAX_TOTAL = 8
REPO_ROOT = Path("/Users/ocm/apps/brown-biotech-platform")
DAILY_DIR = REPO_ROOT / "Daily-Briefs"


def now_kst() -> dt.datetime:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=9)))


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="ignore")


def clean(text: str) -> str:
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = re.sub(r"\s+", " ", text)
    return text.strip(" -–—|\n\r\t")


def abs_url(base: str, href: str) -> str:
    return urllib.parse.urljoin(base, href)


def meta(html_text: str, *names: str) -> str:
    for name in names:
        pattern = rf'<meta[^>]+(?:property|name)=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']+)["\']'
        m = re.search(pattern, html_text, flags=re.I)
        if m:
            return html.unescape(m.group(1)).strip()
    return ""


def first_time(html_text: str) -> str:
    for pat in [
        r'<meta[^>]+property=["\']article:published_time["\'][^>]+content=["\']([^"\']+)["\']',
        r'<time[^>]+datetime=["\']([^"\']+)["\']',
        r'<meta[^>]+name=["\']pubdate["\'][^>]+content=["\']([^"\']+)["\']',
    ]:
        m = re.search(pat, html_text, flags=re.I)
        if m:
            return m.group(1).strip()
    return ""


def extract_candidates(html_text: str, base: str, source: str) -> list[dict]:
    candidates = []
    seen = set()

    for m in re.finditer(r'<h([123])[^>]*>(.*?)</h\1>', html_text, flags=re.I | re.S):
        block = m.group(2)
        href_m = re.search(r'href=["\']([^"\']+)["\']', block, flags=re.I)
        if not href_m:
            continue
        href = abs_url(base, html.unescape(href_m.group(1)))
        text = clean(block)
        if len(text) < 18:
            continue
        if not allowed(source, href):
            continue
        key = (href, text)
        if key in seen:
            continue
        seen.add(key)
        candidates.append({"source": source, "title": text, "url": href})

    for m in re.finditer(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html_text, flags=re.I | re.S):
        href = abs_url(base, html.unescape(m.group(1)))
        text = clean(m.group(2))
        if len(text) < 24:
            continue
        if not allowed(source, href):
            continue
        if text.lower() in {"home", "about", "read more", "see more stories", "view all", "log in", "sign up", "search", "skip to main content"}:
            continue
        key = (href, text)
        if key in seen:
            continue
        seen.add(key)
        candidates.append({"source": source, "title": text, "url": href})

    return candidates[: MAX_ITEMS_PER_SOURCE * 3]


def allowed(source: str, href: str) -> bool:
    href_l = href.lower()
    if source == "FDA":
        return "/news-events/press-announcements/" in href_l and not href_l.endswith("press-announcements")
    if source == "Fierce Biotech":
        return bool(re.search(r"/(biotech|pharma)/", href_l))
    if source == "Endpoints News":
        return "endpoints.news/" in href_l and "/channel/" not in href_l and "/tag/" not in href_l
    if source == "Isomorphic Labs":
        return "/articles/" in href_l
    return True


def article_details(url: str) -> dict:
    try:
        html_text = fetch(url)
    except Exception:
        return {"published": "", "summary": ""}
    published = first_time(html_text)
    summary = meta(html_text, "description", "og:description")
    if not summary:
        m = re.search(r'<p[^>]*>(.{80,300}?)</p>', html_text, flags=re.I | re.S)
        if m:
            summary = clean(m.group(1))
    return {"published": published, "summary": clean(summary)}


def score_item(title: str, summary: str) -> dict:
    text = f"{title} {summary}".lower()
    peptide = 0
    partnership = 0
    regulatory = 0

    if any(k in text for k in ["peptide", "cdmo", "synthesis", "custom peptide", "assay-support", "assay support", "oligo", "manufacturing"]):
        peptide = 2
    elif any(k in text for k in ["protein", "biologics", "supply chain", "outsourcing"]):
        peptide = 1

    if any(k in text for k in ["collaboration", "partnership", "license", "licensing", "deal", "m&a", "acquisition", "series b", "series a"]):
        partnership = 2
    elif any(k in text for k in ["investment", "funding", "raise", "supporting guidance", "strategic"]):
        partnership = 1

    if any(k in text for k in ["fda", "approval", "guidance", "regulatory", "voucher", "inspection", "expanded access", "commissioner", "policy"]):
        regulatory = 2
    elif any(k in text for k in ["financing", "funding", "raise", "ipo", "manufacturing", "compliance"]):
        regulatory = 1

    total = peptide + partnership + regulatory
    if total >= 4:
        cls = "Act"
    elif total >= 2:
        cls = "Refine"
    else:
        cls = "Archive"

    if peptide >= partnership and peptide >= regulatory and peptide > 0:
        why = "Near-term peptide-service / CMC / outsourcing demand signal."
    elif partnership >= regulatory and partnership > 0:
        why = "Possible partner, licensing, or platform-trade signal."
    elif regulatory > 0:
        why = "Regulatory / policy shift that could change buyer behavior or compliance demand."
    else:
        why = "Useful biotech news but not strongly Brown-specific."

    return {
        "peptide": peptide,
        "partnership": partnership,
        "regulatory": regulatory,
        "total": total,
        "class": cls,
        "why": why,
    }


@dataclass
class Item:
    source: str
    title: str
    url: str
    published: str
    summary: str
    peptide: int
    partnership: int
    regulatory: int
    total: int
    cls: str
    why: str


def collect() -> tuple[list[Item], list[str]]:
    sources = [
        ("FDA", "https://www.fda.gov/news-events/fda-newsroom/press-announcements"),
        ("Fierce Biotech", "https://www.fiercebiotech.com/"),
        ("Endpoints News", "https://endpoints.news/"),
        ("Isomorphic Labs", "https://www.isomorphiclabs.com/news"),
    ]
    items: list[Item] = []
    warnings: list[str] = []

    for source, url in sources:
        try:
            html_text = fetch(url)
        except urllib.error.HTTPError as e:
            warnings.append(f"{source}: inaccessible ({e.code})")
            continue
        except Exception as e:
            warnings.append(f"{source}: inaccessible ({type(e).__name__})")
            continue
        for cand in extract_candidates(html_text, url, source):
            details = article_details(cand["url"])
            scored = score_item(cand["title"], details["summary"])
            items.append(Item(
                source=source,
                title=cand["title"],
                url=cand["url"],
                published=details["published"],
                summary=details["summary"],
                peptide=scored["peptide"],
                partnership=scored["partnership"],
                regulatory=scored["regulatory"],
                total=scored["total"],
                cls=scored["class"],
                why=scored["why"],
            ))

    items.sort(key=lambda x: (x.total, x.peptide, x.partnership, x.regulatory), reverse=True)
    deduped = []
    seen = set()
    for item in items:
        key = item.url
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)
        if len(deduped) >= MAX_TOTAL:
            break
    return deduped, warnings


def render(items: list[Item], warnings: list[str]) -> str:
    today = now_kst().strftime("%Y-%m-%d %H:%M KST")
    lines = [
        f"# Brown Biotech live signal context",
        f"Date: {today}",
        "",
        "## Source access",
    ]
    if warnings:
        for w in warnings:
            lines.append(f"- {w}")
    else:
        lines.append("- All fixed source families reachable")
    lines += ["", "## Top live items"]
    if not items:
        lines.append("- No live items could be verified")
    for i, item in enumerate(items, 1):
        pub = f" ({item.published})" if item.published else ""
        lines += [
            f"{i}. **[{item.title}]({item.url})** — {item.source}{pub}",
            f"   - score: peptide={item.peptide}, partnership={item.partnership}, regulatory={item.regulatory} → **{item.cls}**",
            f"   - why: {item.why}",
        ]
        if item.summary:
            lines.append(f"   - summary: {item.summary}")
    return "\n".join(lines)


def save_rendered(rendered: str) -> str | None:
    try:
        DAILY_DIR.mkdir(parents=True, exist_ok=True)
        date = now_kst().date().isoformat()
        path = DAILY_DIR / f"{date}-brown-biotech-daily-signal-brief.md"
        path.write_text(rendered + "\n", encoding="utf-8")
        return str(path)
    except Exception:
        return None


def main() -> int:
    items, warnings = collect()
    rendered = render(items, warnings)
    saved = save_rendered(rendered)
    if saved:
        rendered += f"\n\nSaved to: {saved}"
    print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
