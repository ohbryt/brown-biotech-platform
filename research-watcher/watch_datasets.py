#!/usr/bin/env python3
"""Brown Biotech dataset watcher.

Scans Hugging Face Datasets and GEO for the research axis:
aging, fibrosis, metabolism, single-cell / spatial, and clinical translation.

The script stays stdlib-only so it can run safely under cron.
"""

from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import json
import re
import sys
import time
from pathlib import Path
from typing import Any, Iterable, Optional
from urllib.parse import quote_plus
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

AXIS_LABEL = "aging–fibrosis–metabolism–single-cell/spatial–clinical translation"
HF_SEARCH_URL = "https://huggingface.co/api/datasets?search={query}&limit={limit}"
HF_DATASET_URL = "https://huggingface.co/api/datasets/{dataset_id}"
GEO_SEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gds&term={query}&retmax={limit}&retmode=json"
GEO_SUMMARY_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id={ids}&retmode=json"

PERMISSIVE_LICENSE_MARKERS = (
    "apache",
    "bsd",
    "cc-by",
    "cc0",
    "mit",
    "mpl",
    "odc-by",
    "public",
    "open",
)

QUERY_FAMILIES = {
    "aging": [
        "sarcopenia single-cell",
        "aging muscle atlas",
        "frailty multi-omics",
        "muscle fibrosis spatial transcriptomics",
        "skeletal muscle aging Visium",
        "human aging cohort metabolomics",
    ],
    "fibrosis": [
        "fibroblast atlas",
        "FAP spatial transcriptomics",
        "MASH liver atlas",
        "lung fibrosis single-cell",
        "fibrosis perturb-seq",
        "extracellular matrix multiomics",
    ],
    "metabolism": [
        "OXPHOS dependency CRISPR",
        "mitochondrial vulnerability atlas",
        "tumor metabolism single-cell",
        "metabolic flux transcriptome",
        "ferroptosis atlas",
    ],
    "spatial": [
        "Xenium atlas",
        "CosMx dataset",
        "Visium HD",
        "multiplex imaging spatial",
        "spatial metabolomics",
    ],
    "protein_design": [
        "RFdiffusion dataset",
        "protein cofold",
        "enzyme design benchmark",
        "ProteinGym",
        "OpenFold weights",
    ],
}

HF_SUFFIXES = (".h5ad", ".zarr", ".parquet", ".csv", ".tsv", ".h5", ".npz", ".loom")
SINGLE_CELL_MARKERS = ("single-cell", "scrna", "scRNA", "cellxgene", "adata", "h5ad")
SPATIAL_MARKERS = ("spatial", "visium", "xenium", "cosmx", "merfish", "imaging")
PERTURBATION_MARKERS = ("perturb", "crispr", "pooled screen", "knockout", "knockdown")
LONGITUDINAL_MARKERS = ("longitudinal", "time course", "follow-up", "repeat", "serial")
HUMAN_MARKERS = ("human", "homo sapiens", "patient", "clinical", "cohort", "donor")


@dataclasses.dataclass
class DatasetHit:
    title: str
    source: str
    url: str
    license: str
    modality: str
    key_metadata: dict[str, Any]
    raw_file_availability: str
    score: int
    why_it_matters: str
    next_action: str
    query: str
    collected_at: str
    provenance: dict[str, Any]
    risk_signals: list[str]

    def to_dict(self) -> dict[str, Any]:
        return dataclasses.asdict(self)


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def slugify(value: str) -> str:
    text = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return text or "dataset-hit"


def http_get_json(url: str, timeout: int = 30, max_attempts: int = 3) -> Any:
    """GET a JSON URL with retry/backoff for transient upstream errors.

    NCBI E-utilities (and similar gateways) occasionally return HTTP 5xx or
    an HTML error body with status 200. We treat any non-JSON response as a
    transient failure and retry up to ``max_attempts`` times.
    """
    last_error: Optional[BaseException] = None
    for attempt in range(1, max_attempts + 1):
        try:
            request = Request(url, headers={"User-Agent": "BrownBiotechDatasetWatcher/1.0"})
            with urlopen(request, timeout=timeout) as response:
                raw = response.read().decode("utf-8")
            try:
                return json.loads(raw)
            except ValueError as exc:
                last_error = exc
        except (HTTPError, URLError, TimeoutError) as exc:
            last_error = exc
        if attempt < max_attempts:
            time.sleep(min(2 ** attempt, 8))
    if last_error is not None:
        raise last_error
    raise ValueError(f"http_get_json failed for {url}")


def normalize_text(value: Any) -> str:
    return re.sub(r"\s+", " ", str(value or "").strip())


def text_blob(*values: Any) -> str:
    return " ".join(normalize_text(value) for value in values if normalize_text(value))


def contains_any(text: str, markers: Iterable[str]) -> bool:
    lower = text.lower()
    return any(marker.lower() in lower for marker in markers)


def infer_modality(text: str) -> str:
    lower = text.lower()
    if contains_any(lower, ("protein", "enzyme", "rfdiffusion", "openfold", "pdb")):
        return "protein-design"
    if contains_any(lower, SPATIAL_MARKERS):
        if contains_any(lower, SINGLE_CELL_MARKERS):
            return "single-cell + spatial"
        return "spatial"
    if contains_any(lower, SINGLE_CELL_MARKERS):
        return "single-cell"
    if contains_any(lower, ("metabol", "flux", "oxi", "oxphos", "ferroptosis")):
        return "metabolism"
    if contains_any(lower, ("bulk", "rna-seq", "transcriptomics", "genomics")):
        return "transcriptomics"
    return "mixed"


def infer_license(source: str, tags: list[str], card_data: Optional[dict[str, Any]] = None) -> str:
    card_data = card_data or {}
    for key in ("license", "License"):
        value = normalize_text(card_data.get(key))
        if value:
            return value
    for tag in tags:
        if tag.startswith("license:"):
            return tag.split(":", 1)[1]
    if source == "GEO":
        return "NCBI public repository"
    return "unknown"


def license_is_clean(license_value: str) -> bool:
    lower = license_value.lower()
    return any(marker in lower for marker in PERMISSIVE_LICENSE_MARKERS) or license_value == "NCBI public repository"


def hf_raw_files(siblings: list[dict[str, Any]]) -> list[str]:
    files = [normalize_text(item.get("rfilename")) for item in siblings if normalize_text(item.get("rfilename"))]
    return [filename for filename in files if filename.lower().endswith(HF_SUFFIXES)]


def hf_search(query: str, limit: int) -> list[dict[str, Any]]:
    results = http_get_json(HF_SEARCH_URL.format(query=quote_plus(query), limit=limit))
    if not isinstance(results, list):
        return []
    return results[:limit]


def hf_detail(dataset_id: str) -> dict[str, Any]:
    return http_get_json(HF_DATASET_URL.format(dataset_id=quote_plus(dataset_id)))


def build_hf_hit(query: str, item: dict[str, Any]) -> Optional[DatasetHit]:
    dataset_id = normalize_text(item.get("id"))
    if not dataset_id:
        return None
    try:
        detail = hf_detail(dataset_id)
    except Exception as exc:  # pragma: no cover - best effort on live web APIs
        detail = {"_error": normalize_text(exc)}

    tags = [normalize_text(tag) for tag in (detail.get("tags") or item.get("tags") or []) if normalize_text(tag)]
    description = text_blob(item.get("description"), detail.get("description"))
    siblings = detail.get("siblings") or []
    raw_files = hf_raw_files(siblings)
    license_value = infer_license("HF", tags, detail.get("cardData") or {})
    modality = infer_modality(text_blob(dataset_id, description, " ".join(tags)))
    title = normalize_text(item.get("id") or detail.get("id"))
    metadata = {
        "id": dataset_id,
        "downloads": item.get("downloads", detail.get("downloads")),
        "likes": item.get("likes", detail.get("likes")),
        "tags": tags,
        "file_count": len(siblings),
        "raw_files": raw_files,
        "description": description[:1200],
    }
    risk_signals = []
    if not tags and not description:
        risk_signals.append("metadata missing")
    if len(raw_files) == 0:
        risk_signals.append("processed only, no obvious raw/semi-raw assets")
    if contains_any(description, ("non-commercial", "nc only", "academic use only")):
        risk_signals.append("non-commercial restriction")
    return make_hit(
        title=title,
        source="HF",
        url=f"https://huggingface.co/datasets/{dataset_id}",
        license=license_value,
        modality=modality,
        key_metadata=metadata,
        raw_file_availability="yes" if raw_files else "no",
        query=query,
        provenance={"source_id": dataset_id, "api": "huggingface.co/api/datasets"},
        risk_signals=risk_signals,
    )


def geo_search(query: str, limit: int) -> list[str]:
    data = http_get_json(GEO_SEARCH_URL.format(query=quote_plus(query), limit=limit))
    try:
        return data["esearchresult"]["idlist"][:limit]
    except Exception:
        return []


def geo_summary(ids: list[str]) -> dict[str, Any]:
    if not ids:
        return {}
    return http_get_json(GEO_SUMMARY_URL.format(ids=quote_plus(",".join(ids))))


def build_geo_hit(query: str, uid: str, summary_root: dict[str, Any]) -> Optional[DatasetHit]:
    record = (summary_root.get("result") or {}).get(uid) or {}
    if not record:
        return None
    accession = normalize_text(record.get("accession") or record.get("gse") or uid)
    title = normalize_text(record.get("title") or accession)
    summary = normalize_text(record.get("summary"))
    taxon = normalize_text(record.get("taxon"))
    gdstype = normalize_text(record.get("gdstype") or record.get("entrytype"))
    samples = record.get("samples") or []
    raw_files = "yes" if normalize_text(record.get("suppfile")) else "maybe"
    modality = infer_modality(text_blob(title, summary, gdstype, taxon))
    license_value = infer_license("GEO", [], {})
    metadata = {
        "accession": accession,
        "taxon": taxon,
        "gds_type": gdstype,
        "sample_count": len(samples),
        "suppfile": normalize_text(record.get("suppfile")),
        "pdat": normalize_text(record.get("pdat")),
    }
    risk_signals = []
    if len(samples) and len(samples) < 3:
        risk_signals.append("donor count < 3 or sample count very small")
    if not summary:
        risk_signals.append("metadata missing")
    if contains_any(summary, ("processed only", "series matrix only")):
        risk_signals.append("processed only, no raw")
    return make_hit(
        title=title,
        source="GEO",
        url=f"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc={accession}",
        license=license_value,
        modality=modality,
        key_metadata=metadata,
        raw_file_availability=raw_files,
        query=query,
        provenance={"source_id": accession, "api": "ncbi.nlm.nih.gov/entrez/eutils"},
        risk_signals=risk_signals,
    )


def score_hit(hit: dict[str, Any]) -> tuple[int, list[str]]:
    score = 0
    reasons: list[str] = []
    text = text_blob(hit.get("title"), hit.get("modality"), hit.get("query"), json.dumps(hit.get("key_metadata", {})))
    metadata = hit.get("key_metadata") or {}

    license_value = normalize_text(hit.get("license"))
    if license_is_clean(license_value):
        score += 2
        reasons.append("license clean (+2)")

    raw_availability = normalize_text(hit.get("raw_file_availability")).lower()
    if raw_availability in {"yes", "maybe"}:
        score += 2
        reasons.append("raw or semi-raw files available (+2)")

    if "single-cell + spatial" in normalize_text(hit.get("modality")) or (
        contains_any(text, SINGLE_CELL_MARKERS) and contains_any(text, SPATIAL_MARKERS)
    ):
        score += 3
        reasons.append("single-cell + spatial pairing (+3)")

    if contains_any(text, PERTURBATION_MARKERS):
        score += 3
        reasons.append("perturbation signal (+3)")

    if contains_any(text, LONGITUDINAL_MARKERS):
        score += 2
        reasons.append("longitudinal design (+2)")

    if contains_any(text, HUMAN_MARKERS):
        score += 2
        reasons.append("human cohort signal (+2)")

    sample_count = int(metadata.get("sample_count") or metadata.get("file_count") or 0)
    if sample_count and sample_count < 3:
        score -= 3
        reasons.append("very small cohort metadata (-3)")

    if contains_any(text, ("batch effect", "batch-corrected", "batch correction severe")):
        score -= 2
        reasons.append("batch effect severe (-2)")

    if not metadata or len(normalize_text(hit.get("title"))) < 8:
        score -= 3
        reasons.append("metadata poor (-3)")

    score = max(0, min(10, score))
    return score, reasons


def make_hit(
    *,
    title: str,
    source: str,
    url: str,
    license: str,
    modality: str,
    key_metadata: dict[str, Any],
    raw_file_availability: str,
    query: str,
    provenance: dict[str, Any],
    risk_signals: list[str],
) -> DatasetHit:
    payload = {
        "title": title,
        "source": source,
        "url": url,
        "license": license,
        "modality": modality,
        "key_metadata": key_metadata,
        "raw_file_availability": raw_file_availability,
        "query": query,
        "collected_at": now_iso(),
        "provenance": provenance,
        "risk_signals": risk_signals,
    }
    score, score_reasons = score_hit(payload)
    payload["score"] = score
    payload["why_it_matters"] = why_it_matters(payload, score, score_reasons)
    payload["next_action"] = next_action(score)
    return DatasetHit(**payload)


def why_it_matters(hit: dict[str, Any], score: int, score_reasons: list[str]) -> str:
    base = hit.get("modality", "mixed")
    title = hit.get("title", "dataset")
    if score >= 7:
        return f"Strong fit for immediate Brown Biotech intake: {title} is a {base} hit with {', '.join(score_reasons[:3]) or 'good metadata'}."
    if score >= 4:
        return f"Promising but needs QC: {title} shows {base} signals and should be checked before ingestion."
    return f"Archive-only signal for now: {title} does not clear the immediate intake threshold."


def next_action(score: int) -> str:
    if score >= 7:
        return "Ingest immediately and prepare a handoff brief."
    if score >= 4:
        return "Run QC notebook, then decide whether to ingest."
    return "Archive the hit and keep provenance for future search."


def collect_hits(sources: list[str], queries: list[str], limit: int) -> tuple[list[DatasetHit], list[str]]:
    hits: list[DatasetHit] = []
    seen: set[tuple[str, str]] = set()
    source_errors: list[str] = []
    for query in queries:
        if "hf" in sources:
            try:
                for item in hf_search(query, limit):
                    hit = build_hf_hit(query, item)
                    if hit and (hit.source, hit.title) not in seen:
                        seen.add((hit.source, hit.title))
                        hits.append(hit)
            except Exception as exc:  # noqa: BLE001
                msg = f"hf[{query}]: {exc!r}"
                source_errors.append(msg)
                print(f"[watcher] {msg}", file=sys.stderr)
        if "geo" in sources:
            try:
                ids = geo_search(query, limit)
            except Exception as exc:  # noqa: BLE001
                msg = f"geo[{query}]: {exc!r}"
                source_errors.append(msg)
                print(f"[watcher] {msg}", file=sys.stderr)
                continue
            if not ids:
                continue
            try:
                summary_root = geo_summary(ids)
            except Exception as exc:  # noqa: BLE001
                msg = f"geo-summary[{query}]: {exc!r}"
                source_errors.append(msg)
                print(f"[watcher] {msg}", file=sys.stderr)
                continue
            for uid in ids:
                hit = build_geo_hit(query, uid, summary_root)
                if hit and (hit.source, hit.title) not in seen:
                    seen.add((hit.source, hit.title))
                    hits.append(hit)
    if source_errors:
        print(f"[watcher] {len(source_errors)} source error(s) this run; see logs.", file=sys.stderr)
    return hits, source_errors


def pick_queries(raw: str) -> list[str]:
    if raw.strip().lower() != "all":
        return [item.strip() for item in raw.split(",") if item.strip()]
    queries: list[str] = []
    for family_queries in QUERY_FAMILIES.values():
        queries.extend(family_queries)
    return queries


def sort_hits(hits: list[DatasetHit]) -> list[DatasetHit]:
    return sorted(hits, key=lambda item: (item.score, item.collected_at), reverse=True)


def mode_label(mode: str) -> str:
    return {
        "scan": "Monday scan",
        "benchmark": "Wednesday benchmark",
        "report": "Friday worth-integrating report",
    }.get(mode, mode)


def build_markdown_report(mode: str, hits: list[DatasetHit], queries: list[str]) -> str:
    top_hits = sort_hits(hits)[:3]
    lines = [
        f"# Brown Biotech research watcher — {mode_label(mode)}",
        "",
        f"**Axis:** {AXIS_LABEL}",
        f"**Generated:** {now_iso()}",
        "",
        "## Top hits",
    ]
    if not top_hits:
        lines.append("- No hits collected.")
    for index, hit in enumerate(top_hits, start=1):
        lines.extend([
            f"### {index}. {hit.title}",
            f"- Source: {hit.source}",
            f"- License: {hit.license}",
            f"- Modality: {hit.modality}",
            f"- Score: {hit.score}/10",
            f"- Raw file availability: {hit.raw_file_availability}",
            f"- Key metadata: {json.dumps(hit.key_metadata, ensure_ascii=False)}",
            f"- Why it matters: {hit.why_it_matters}",
            f"- Next action: {hit.next_action}",
            f"- Query: {hit.query}",
            f"- URL: {hit.url}",
            "",
        ])
    lines.extend([
        "## Query families",
        "",
    ])
    for query in queries[:20]:
        lines.append(f"- {query}")
    lines.extend([
        "",
        "## Thresholds",
        "- 7+ → ingest immediately",
        "- 4–6 → QC then store",
        "- 3 or below → archive only",
        "",
    ])
    return "\n".join(lines).rstrip() + "\n"


def write_outputs(output_dir: Path, mode: str, hits: list[DatasetHit], queries: list[str], source_errors: Optional[list[str]] = None) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    sorted_hits = sort_hits(hits)
    payload = {
        "mode": mode,
        "axis": AXIS_LABEL,
        "generated_at": now_iso(),
        "hit_count": len(sorted_hits),
        "hits": [hit.to_dict() for hit in sorted_hits],
        "queries": queries,
        "source_errors": list(source_errors or []),
    }
    (output_dir / "scan.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "hits.jsonl").write_text("\n".join(json.dumps(hit.to_dict(), ensure_ascii=False) for hit in sorted_hits) + ("\n" if sorted_hits else ""), encoding="utf-8")
    (output_dir / "scan.md").write_text(build_markdown_report(mode, sorted_hits, queries), encoding="utf-8")


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Brown Biotech dataset watcher.")
    parser.add_argument("--mode", default="scan", choices=("scan", "benchmark", "report"), help="Watcher mode.")
    parser.add_argument("--output-dir", default="research-watcher/output/latest", help="Directory for generated outputs.")
    parser.add_argument("--limit", type=int, default=5, help="Limit per query per source.")
    parser.add_argument("--queries", default="all", help="Comma-separated query list or 'all'.")
    parser.add_argument("--sources", default="hf,geo", help="Comma-separated source list (hf,geo).")
    return parser.parse_args(argv)


def main(argv: Optional[list[str]] = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    sources = [item.strip().lower() for item in args.sources.split(",") if item.strip()]
    queries = pick_queries(args.queries)
    hits, source_errors = collect_hits(sources=sources, queries=queries, limit=args.limit)
    write_outputs(Path(args.output_dir), args.mode, hits, queries, source_errors=source_errors)

    sorted_hits = sort_hits(hits)
    top = sorted_hits[:3]
    print(f"Brown Biotech watcher complete: {len(sorted_hits)} hits across {len(queries)} queries.")
    for hit in top:
        print(f"- [{hit.score}/10] {hit.source}: {hit.title} → {hit.next_action}")
    print(f"Outputs written to: {Path(args.output_dir).resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
