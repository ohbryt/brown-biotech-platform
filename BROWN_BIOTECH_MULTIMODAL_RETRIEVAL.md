# Brown Biotech Multimodal Retrieval Spec

## Purpose
Build a lightweight retrieval layer for Brown Biotech that can search and rank:
- briefs
- PDFs / reports
- screenshots / figures
- charts / slides
- audio notes / meeting clips
- web captures and market signals

## Why this matters
Brown Biotech's work is not text-only. The system should be able to retrieve evidence from the full artifact stack and keep the result tied to a human-reviewed brief.

## Recommended pattern
Use a **single text-aligned embedding space** for all evidence, then query it by modality.

A practical fit is a Jina v5 omni-style stack because it supports:
- text
- image
- video
- audio
- shared vector space aligned with text-only retrieval

## Core usage rules
1. **Index once, query many ways.**
2. **Keep source provenance attached** to every retrieval hit.
3. **Store approved snippets separately** from raw evidence.
4. **Prefer text-aligned retrieval for briefs** so the system stays consistent across docs and screenshots.
5. **Use human review before anything client-facing or commercial.**

## Suggested indexing buckets
- `briefs`
- `source_watchlists`
- `evidence_pdfs`
- `screenshots`
- `figures_and_tables`
- `audio_notes`
- `approved_language`
- `rejected_language`

## Suggested metadata fields
- `artifact_id`
- `source_type`
- `project`
- `lane`
- `date`
- `license`
- `confidence`
- `human_approved`
- `provenance_url`
- `summary`

## Retrieval outputs
Every hit should return:
- relevance score
- source type
- provenance
- matched snippet
- approval status
- reuse note

## Operational fit
Best places to use this layer:
- daily signal workflow
- weekly brief generation
- partner funnel support
- browser-test receipts
- service intake triage
- research proof / publications

## Commercial safety note
If a model or collection has a restrictive license, confirm commercial usage before shipping it into production.

## Simple implementation order
1. start with text + PDF retrieval
2. add screenshots and figure extraction
3. add audio notes
4. add reusable approved-language snippets
5. add ranking and deduplication
6. connect retrieval results to brief drafting and human review

## Brown Biotech rule
Retrieval should make the brief better, not more automatic.
The goal is **decision-ready evidence**, not opaque automation.
