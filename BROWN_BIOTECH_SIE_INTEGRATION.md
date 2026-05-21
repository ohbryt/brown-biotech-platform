# SIE Integration + Brown Biotech Business Model

**Date:** 2026-05-18
**Source:** Superlinked SIE (Apache 2.0, https://sie.dev)
**Status:** Planning

---

## 1. What is SIE

Open-source inference engine serving three functions:
- `encode` — embedding generation (85+ models: dense, sparse, multi-vector, vision)
- `score` — cross-encoder reranking
- `extract` — zero-shot named entity recognition

**License:** Apache 2.0 ✅ (no commercial restrictions)
**Self-hostable:** Yes — Docker, pip, Kubernetes

---

## 2. Integration into Research Watcher Pipeline

### Current pipeline (watch_datasets.py)
```
Query families (27 queries, 5 axes)
    ↓
HF API + GEO API → raw hits
    ↓
rule-based scoring (license + modality + raw files + cohort size)
    ↓
Top 3 hits → scan.md / scan.json / hits.jsonl
```

### With SIE integrated
```
Query families (27 queries, 5 axes)
    ↓
[STEP 1] SIE encode: query embedding → semantic search over dataset corpus
[STEP 2] SIE score: cross-encoder rerank top-N results
[STEP 3] SIE extract: pull gene/protein/drug entities from descriptions
    ↓
rich hits with entity tags + semantic relevance score + rule-based score
    ↓
Top hits → scan.md / scan.json / hits.jsonl (enhanced)
```

### Specific SIE function usage

#### encode (embedding)
- **Model:** `NovaSearch/stella_en_400M_v5` (1024-dim, fast, Apache 2.0)
- **Use case:** Embed query + dataset title/description → cosine similarity for semantic search
- **Placement:** Replace keyword search in `collect_hits()` with embedding ANN search
- **Alternative (local):** `sentence-transformers/all-MiniLM-L6-v2` (384-dim, CPU-friendly)

#### score (reranking)
- **Model:** `BAAI/bge-reranker-v2-m3`
- **Use case:** Take top-50 HF/GEO hits → rerank by semantic relevance to user's actual query
- **Placement:** Post-`collect_hits()`, pre-`sort_hits()`
- **Impact:** Currently sorts by rule-based score only; reranking adds semantic layer

#### extract (NER)
- **Model:** `urchade/gliner_multi-v2.1`
- **Use case:** From dataset title + description → extract gene names (BRCA1, TP53), protein names, drug names, disease names
- **Placement:** Inside `build_hf_hit()` / `build_geo_hit()` — enrich `key_metadata` with `entities`
- **Impact:** Enables entity-filtered queries (e.g., "all datasets mentioning BRCA1 + ferroptosis")

---

## 3. Entity-Tagged Query Expansion

Once `extract` runs on existing hits, we build an entity index:

```
Entity index (Redis / Qdrant / in-memory):
  "BRCA1"     → [hit_17, hit_42, hit_88]
  "TP53"      → [hit_23, hit_71]
  "ferroptosis" → [hit_5, hit_31, hit_55]
```

This enables:
- **Entity-filtered briefs:** "Give me all datasets about ferroptosis in lung cancer"
- **Cross-dataset reasoning:** "Which datasets mention both BRCA1 and ferroptosis?"
- **Auto-tagging for Notion:** Entities written as tags alongside the score

---

## 4. Self-Hosting vs. Managed

| Option | Pros | Cons |
|--------|------|------|
| **Self-host (SIE Server)** | Apache 2.0, no per-token cost, full control | Infrastructure ops burden |
| **Superlinked Cloud** | Zero ops, managed | Cost + vendor lock-in risk |
| **Modal + SIE** | Serverless GPU, pay-per-run | Cold start latency |

**Recommendation for Brown Biotech:** Self-host on Modal or local Docker — the workload is cron-based (not real-time), so on-demand serverless fits perfectly.

```bash
# Modal deployment (conceptual)
modal run sie_serving --model "NovaSearch/stella_en_400M_v5"
```

---

## 5. Business Model: SIE-Powered Tier

### Tier 1 — Base (Current)
- Rule-based scoring + keyword search
- Free with Paid Brief

### Tier 2 — SIE-Enhanced (New Paid Tier)
- Semantic search over dataset corpus
- Entity-extracted tags (gene, protein, drug, disease)
- Reranked results (top-50 → top-3 by semantic relevance)
- **Price:** Add to Paid Brief as "deep search" option (+₩500K ~ ₩1M)

### Tier 3 — SIE API Access (Standalone)
- Self-host SIE + Brown Biotech wrapper
- Sell API access to research teams (labs, CROs)
- **Analoogy:** "We sell the reasoning layer, not the database"
- **Competitor differentiation:** Most biotech data vendors sell raw data; we sell the inference layer

### Revenue Model Comparison

| Model | TAM | Margin | Notes |
|-------|-----|--------|-------|
| Raw data resale | Low (commoditized) | ~20% | Competitors: NCBI, ExpressionAtlas |
| Paid Brief (current) | Medium | ~70% | 1:1 service |
| SIE-Powered Brief (new) | Medium+ | ~75% | Scalable, leverage SIE |
| SIE API subscription | High | ~80% | Site license for labs |

---

## 6. Implementation Roadmap

### Phase 1 — Proof of Concept (This Week)
- [ ] `pip install sie-sdk` in research-watcher venv
- [ ] Add `SIEClient` to `watch_datasets.py`
- [ ] Test `encode` on 10 dataset titles — verify embeddings + cosine similarity
- [ ] Test `score` reranking on existing 97-hit output

### Phase 2 — Integration (Week 2)
- [ ] Replace keyword search with ANN + rerank pipeline
- [ ] Add entity extraction to `DatasetHit.key_metadata`
- [ ] Add entity index to output JSON
- [ ] Update `scan.md` template with entity tags

### Phase 3 — Productization (Week 3–4)
- [ ] Dockerize SIE server + research-watcher as one compose stack
- [ ] Add `WATCHER_SIE_RERANK=1` env flag (opt-in)
- [ ] Document tier-2 brief offering
- [ ] Update `BROWN_BIOTECH_SERVICE_COPY.md` with SIE-enhanced positioning

### Phase 4 — Business Launch
- [ ] Publish "SIE-Powered Research Brief" as new service line
- [ ] Set pricing for deep-search tier
- [ ] Add to peptide-service landing page
- [ ] Notify existing leads about enhanced capability

---

## 7. Files to Modify

| File | Change |
|------|--------|
| `research-watcher/watch_datasets.py` | Add SIE encode/score/extract integration |
| `research-watcher/run.sh` | Add `--use-sie` flag |
| `BROWN_BIOTECH_SERVICE_COPY.md` | Add SIE tier copy |
| `BROWN_BIOTECH_SYSTEM_OF_INTELLIGENCE.md` | Add SIE as infrastructure layer |
| Notion HQ | Document SIE-powered service tier |

---

## 8. Open Questions

1. **GPU needed?** SIE encode on CPU is slow for large corpuses — confirm Modal GPU cost for cron workload
2. **Which embedding model?** `stella_en_400M_v5` vs `BAAI/bge-en-1.5` — test latency + quality tradeoff
3. **Entity schema** — standardize entity types: gene, protein, drug, disease, cell_type, tissue
4. **Index persistence** — rebuild index each run or incremental update? (Dataset corpus changes slowly)
5. **Pricing** — comparable services for semantic search + NER on biotech data? (benchmarks for pricing)