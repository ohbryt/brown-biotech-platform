# Research Pulse — 2026-06-29 (opendraft back-port)
_Brown Biotech tooling track · manual curation by Demis_

## TL;DR
[OpenDraft](https://github.com/federicodeponte/opendraft) (Federico De Ponte, **194⭐**, MIT) is a 19-agent / 6-phase paper-drafting engine. Two patterns worth back-porting: the **5-phase pipeline vocabulary** (Research → Structure → Compose → QA → Export) and the **16-ticket QA taxonomy** (TICKET-001..016). Both ship in `ohbryt/bb` v0.2.0 today as `bb ticket` + `bb review` + `bb gate`.

### What OpenDraft is
_Brown Biotech relevance: structural pattern for paper-pipeline work; heuristic ticket taxonomy pairs with our rubric-scorer_

- [OpenDraft on GitHub](https://github.com/federicodeponte/opendraft) — Apache-style MIT, beta v1.7.2, 118 commits, 18 PRs, last commit 2026-06-25
- [README — "Don't want to manage API keys and infra? Use the hosted version → OpenPaper.dev"](https://github.com/federicodeponte/opendraft#readme) — 3 free papers/day, $2.99+ credit packs (no subscription)
- [docs/ARCHITECTURE.md](https://github.com/federicodeponte/opendraft/blob/master/docs/ARCHITECTURE.md) — phase/agent map (5 active + 6 optional manual agents)
- [docs/PIPELINE.md](https://github.com/federicodeponte/opendraft/blob/master/docs/PIPELINE.md) — operational pipeline + word-count targets
- 19 specialized agents: Scout → Scribe → Signal → Architect → Formatter → Crafter (×6-7) → Thread → Narrator → Crafter-Final, plus 6 manual agents (Skeptic, Verifier, Referee, Citation Verifier, Voice, Polish, Enhancer)
- Citation cascade: Semantic Scholar → Crossref → Serper / Gemini Grounded → LLM Fallback (managed by `CitationResearcher`)
- 6-phase pipeline: Research → Structure → Cite-Mgmt → Compose → QA → Compile/Export

### The 5-Phase Pipeline Vocabulary (TAKE)
_Source: `docs/ARCHITECTURE.md` + `docs/PIPELINE.md` — Research → Structure → Compose → QA → Export_

| Phase | Output | BB equivalent |
|---|---|---|
| Research | `citation_database.json` (`Scout` + `Scribe` + `Signal`) | `brown-biotech-sciatlas` + `brown-biotech-pubmed-multi-pmid-scraping` |
| Structure | `outline.md` + style applied (`Architect` + `Formatter`) | `brown-biotech-paper-intake-workflow` (in skill as Step 1.5 vocabulary) |
| Compose | section markdown + `{cite_XXX}` (`Crafter` ×6-7) | `brown-biotech-paid-brief-gwas-first-recipe` (5-stage content arc lives here — different layer!) |
| QA | advisory reports (`Thread` + `Narrator`) | NEW: `bb review` (advisory, exit 0) |
| Export | PDF/DOCX via Pandoc (`Compile`) | `bb gate` (blocking, exit 1) — quality gate before delivery |

**Why it's worth taking:** Brown Biotech has 4 paper/brief workflows (paid-brief GWAS-first, paper intake Track A/B/F, ARP v27 research, sciatlas retrieval). Each lived with its own ad-hoc vocabulary. OpenDraft gives us the **shared 5-phase pipeline vocabulary** they all map to. Now `bb ticket --phase <phase>` is the universal scorer across all of them.

**Where it lands:** `brown-biotech-paper-intake-workflow` v1.4.0 added the "Vocabulary: 5-Phase Paper Pipeline" section + "Pipeline Phase vs Content Stage" disambiguation (so the 5-stage arc in `paid-brief-gwas-first-recipe` doesn't get confused with the 5-phase pipeline).

### The 16-Ticket QA Taxonomy (TAKE — highest leverage)
_Source: `tests/test_ticket001..016_*.py` — MIT, atomic, named, diagnosable_

| Ticket | Phase | Severity | Concern | BB Rubric Criterion |
|---|---|---|---|---|
| `bb-ticket-001-methodology` | research | **blocking** | Methodology rigor | accuracy |
| `bb-ticket-002-analysis` | research | **blocking** | Analysis depth | critical_analysis |
| `bb-ticket-003-citation_mismatch` | compose | **blocking** | Citation fidelity (DOI/author/year) | citation_hygiene |
| `bb-ticket-005-padding` | compose | **blocking** | No padding — Quality > Quantity | conciseness |
| `bb-ticket-006-contradictions` | qa | **blocking** | Cross-section consistency | critical_analysis |
| `bb-ticket-009-precision` | compose | **blocking** | Numeric precision — no silent rounding | accuracy |
| `bb-ticket-016-title_promise` | structure | **blocking** | Title matches body | relevance |
| `bb-ticket-004-preprints` | research | advisory | Prefer peer-reviewed | citation_hygiene |
| `bb-ticket-007-overconfident` | compose | advisory | Hedge where weak | critical_analysis |
| `bb-ticket-010-repetition` | qa | advisory | Conciseness | conciseness |
| `bb-ticket-011-grammar` | export | advisory | Spelling / punctuation | clarity |
| `bb-ticket-012-table_numbering` | export | advisory | Table/figure numbering | organization |
| `bb-ticket-013-document_type` | structure | advisory | Format fits deliverable | organization |
| `bb-ticket-014-domain-terminology` | research | advisory | Domain jargon accuracy | relevance |
| `bb-ticket-015-domain-coverage` | research | advisory | Key paper-type coverage | completeness |
| `bb-ticket-008-semantic_scholar` | research | advisory | S2 integration check | infra:citation_api |

**7 blocking + 9 advisory + 5 phases = 16 tickets.** Each is bound to a phase so failures are diagnostic — "TICKET-005 padding" tells you the compose phase leaked, not "rubric:conciseness low."

**Why it pairs with the rubric-scorer:** the existing `brown-biotech-bb-rubric-scorer` skill gives opaque criteria ("conciseness: 2.0"). The diagnostic footer now becomes:

```markdown
- `conciseness` (TICKET-005 padding + TICKET-010 repetition): 2.0
```

Dr. OCM sees the rubric score + the named tickets that drove it. Same for the team when discussing quality — "fix TICKET-005 padding" is shared vocabulary.

**Where it lands:** `bb/data/bb_qa_tickets.py` (Python module — type safe, simple import). `bb/data/bb_qa_tickets.py` exports `TICKETS`, `TICKETS_BY_CODE`, `TICKETS_BY_PHASE`, `BLOCKING_TICKETS`, `ADVISORY_TICKETS`, `PIPELINE_PHASES`. Pydantic-friendly. Powers `bb ticket` + `bb review` + `bb gate` + the future rubric-scorer integration.

### What we did NOT take (5 patterns)
_Explicitly documented so future agents don't re-litigate these decisions_

| Skipped pattern | Why BB doesn't take it |
|---|---|
| **19-agent count** | BB CLI ships 5 commands today (`version/status/remember/recall/forget`). 19 is surface-area bloat. The 5-phase taxonomy gives the same conceptual structure. |
| **Word-count targets** (3k–80k) | **Direct conflict with BB paid-brief model** — ours is 1–2 page decision-ready (₩2M–8M), OpenDraft is 20k-word drafts. We sell decisions, not papers. |
| **Pandoc + LaTeX export** | BB uses `nano-pdf` (skill already exists). Pandoc infra adds cost with no business utility. |
| **LLM-fallback citation** | **Direct conflict with BB trust model** — paid briefs are human-curated. LLM generating citations from training data is the *opposite* of what we sell. |
| **`digest.md` + `tldr.md` short-form** | **Already-have** — `research-pulse` cron (07:00 KST) + `daily-digest` cron (06:00 KST) serve this role. Different surface, same idea. |

### Verification
- **License:** MIT ✓ (safe for proprietary use)
- **Repo:** live, 194⭐, 47 forks, 118 commits, 18 PRs — cloned verified
- **Last commit:** 2026-06-25 (5 days ago) — actively maintained, single maintainer (Federico De Ponte, federico@opendraft.xyz)
- **Has tests:** 40 test files (Python, pytest)
- **Has CI:** `.github/workflows/live-validation.yml` + `quality.yml`
- **No specific paper citations** in README — OpenDraft does live API lookups (CrossRef, OpenAlex, S2, arXiv) rather than embedding hardcoded papers. So no authorship verification needed.
- **MIT attribution** preserved in `bb/data/bb_qa_tickets.py` docstring + `~/.hermes/reads/opendraft/SYNTHESIS.md`.

### What landed in BB today

| File | Change | Why |
|---|---|---|
| `bb/data/bb_qa_tickets.py` (NEW) | 16-ticket taxonomy + 5-phase pipeline vocabulary | Source-of-truth, bundled with CLI |
| `bb/data/__init__.py` (NEW) | empty pkg init | Make `bb.data` importable |
| `bb/ticket.py` (NEW) | heuristic inspector (no LLM) | Powers `bb ticket/review/gate` |
| `bb/cli.py` (PATCH) | + `_find_node` helper, `bb ticket`, `bb review`, `bb gate` | New subcommands |
| `bb/__init__.py` (PATCH) | `__version__ = "0.2.0"` | Bump for new release |
| `pyproject.toml` (PATCH) | + description keywords, + packages = ["bb", "bb.data"] | Wheel builds with bb.data |
| `tests/test_ticket.py` (NEW) | 14 new test cases (taxonomy invariants + heuristics) | Heuristic regression safety |
| `tests/test_memory.py` (PATCH) | version assertion → "0.2.0" | New version |
| `README.md` (PATCH) | commands table + ticket example | Surface the new subcommands |

### What landed in skills today

| Skill | Version | Change |
|---|---|---|
| `brown-biotech-paper-intake-workflow` | 1.3.0 → 1.4.0 | + "Vocabulary: 5-Phase Paper Pipeline" + "Pipeline Phase vs Content Stage" disambiguation |
| `brown-biotech-paid-brief-gwas-first-recipe` | 1.0.0 → 1.1.0 | + "Phase vs Stage" disambiguation at top (5-stage arc is content, not pipeline) |
| `brown-biotech-bb-rubric-scorer` | 1.0.0 → 1.1.0 | + "QA Ticket integration" section — 16 tickets table + diagnostic footer format |

**Skill validator passed clean (0 errors, 0 warnings) on all 3 patched skills** after fixing the `]- ---` array-boundary bug and `description: text with : (a)` YAML pitfall.

### Slim reference for future agents
`~/.hermes/reads/opendraft/` (168 KB) — README, ARCHITECTURE, PIPELINE + scout/crafter/skeptic prompt full text. No need to re-clone 7.5 MB repo next time.

### Verification commands (so future agent can re-validate)

```bash
# BB CLI
cd ~/openclaw/workspace/bb && source .venv/bin/activate && \
  python3 -m pytest tests/ -q                    # 38/38
bb --help                                          # shows ticket/review/gate
bb ticket                                          # full 16-ticket taxonomy table
bb ticket --phase compose                          # 4 compose-phase tickets
bb gate nonexistent                                # exit 1 — node not found

# Skills
python3 ~/.hermes/scripts/bb_skill_validator.py \
  brown-biotech-paper-intake-workflow \
  brown-biotech-paid-brief-gwas-first-recipe \
  brown-biotech-bb-rubric-scorer                  # 0 errors
```

### Brown Biotech relevance today
The 16-ticket taxonomy becomes a **shared team vocabulary** for BB quality discussion. When Dr. OCM says "TICKET-005 padding" in a Friday review, the team knows:
- WHERE: compose phase
- WHAT: weak citation / generic claim / unrelated field
- SEVERITY: blocking (cannot ship without addressing)
- MAPPING: rubric criterion = conciseness

This is the longest-lasting value of the back-port. Heuristics evolve (we'll add LLM-judge enrichment via existing rubric-scorer infrastructure later), but the ticket vocabulary is stable, shareable, and machine-readable.

### Next step (deferred to next session)
- Wire `bb ticket` heuristics into the rubric-scorer's `_llm_judge` prompt (so LLM judges return ticket IDs, not just criterion scores)
- Add `bb paper` v0.3 subcommand — full 5-phase paper pipeline executor using bb-wiki concepts + PRISM/sciatlas as research phase
- Add LLM-judge enrichment for tickets 001/002/006 (high-value tickets where heuristics miss the nuance)
- Re-check OpenDraft quarterly — author Federico ships ~5 PRs/month, watch for ticket taxonomy additions

---

**Back-port actions executed** (this commit):
- `bb/data/bb_qa_tickets.py` + `bb/ticket.py` + `bb/data/__init__.py` (new, ~190 LOC)
- `bb/cli.py` patches (~210 LOC, adds ticket/review/gate + _find_node helper)
- `tests/test_ticket.py` (new, 14 cases)
- Skill patches: paper-intake-workflow v1.4.0, paid-brief v1.1.0, rubric-scorer v1.1.0

**Pattern source files (read-only):** `~/.hermes/reads/opendraft/` (168 KB slim reference — README, ARCHITECTURE, PIPELINE, scout/crafter/skeptic prompts)

**License of source:** MIT (OpenDraft) — preserved in `bb/data/bb_qa_tickets.py` docstring.
