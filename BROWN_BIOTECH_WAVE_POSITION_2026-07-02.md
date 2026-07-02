# Brown Biotech — Position in the 2026 Biology-Agent Wave

_Compiled 2026-07-02 in response to Phylo/Biomni Lab (2026-06-29) and Boltz × Anthropic Claude Science (2026-06-30)._

## Triangle (the three layers in this week's news)

| Layer | Vendor | Thesis | What we take from them | Where Brown Biotech sits |
|---|---|---|---|---|
| **Tool layer** | **Boltz (Boltz-2)** + **Phylo Biomni** + Anthropic Claude Science | Specialized biology models (cofold, design, score) drive the in-silico execution. Top three LLMs within 5 points of each other on DrugDiscoveryBench (76→90%+ with human playbook). | Use Boltz-2 design + cofold inside ARP v27's pipeline (already wired as `boltz_design_proteins` / `boltz_fold_complex` / `boltz_predict_affinity` backends). Adopt biomni open-source components where they beat our own. | **NOT** here. We don't ship cofold models. |
| **Model layer** | Frontier LLMs (GPT-5.5 / Gemini 3.5 / Opus 4.8) | Token-pickers. DrugDiscoveryBench showed model choice matters less than procedure. | Multi-LLM routing (already in ARP v27). Skill `brown-biotech-bb-rubric-scorer` provides ensemble judge. | Pluggable: any frontier LLM can be the router. |
| **Reasoning layer** | **Brown Biotech** | A continuous reasoning layer over public + proprietary data + a human reviewer for every high-stakes brief. The harness does not change; the model does. | - | **HERE.** Our slot is the procedure (what to hold fixed, what to vary, which tool to trust on this instance), the source map, and the human reviewer that turns an agent into a decision. |

## Anchor quote (verbatim, Boltz team 2026-06-30)

> "Handed a human-written playbook, the agent passed 76 of 82 — over 90%. The difference is human expertise. Agents handle a single query or calculation fine, but they lose the thread on long workflows."
>
> — _The Boltz team, "Driving the Boltz API with agents and integration with Claude Science" (2026-06-30)_

This is Brown Biotech's value proposition in **one sentence** taken from the competition's own blog.

## What shipped today (2026-07-02)

| Component | Path | Commit / Vercel URL |
|---|---|---|
| `WaveDifference.tsx` (homepage new section: 3-layer triangle + Boltz quote + 3 reasoning pillars + dual CTA) | `~/apps/brown-biotech-platform/src/components/WaveDifference.tsx` | Pending commit → https://brownbio.tech/#wave-difference |
| Hero.tsx tagline (refreshed with Boltz article language) | `~/apps/brown-biotech-platform/src/components/Hero.tsx` | Pending commit |
| `business-pipeline/page.tsx` 4th card ("Reasoning layer, not just tools") | `~/apps/brown-biotech-platform/src/app/services/business-pipeline/page.tsx` | Pending commit |
| `boltz_client.py` (API wrapper for design_proteins / fold_complex / predict_affinity) | `~/openclaw/workspace/arp-v27/integration/boltz_client.py` | ARP v27 repo |
| `TOOL_REGISTRY` + `BACKEND_REGISTRY` extended with 3 Boltz tools | `harness/tools.py` + `harness/backends.py` | ARP v27 repo |
| `bb_intel_watch.py` (Phylo / Boltz / Anthropic / SNAP — arxiv + HuggingFace) | `~/apps/brown-biotech-platform/research-watcher/bb_intel_watch.py` | BB platform repo |

## Why now (timing argument)

- A16Z + Menlo co-led **Phylo's seed** ~ 06-29 → 12-18 months to Series A
- **Claude Science** (Anthropic's first explicit bio workbench) ~ 06-30 → likely re-priced comp set
- BB positioning window: **the next 90 days** will determine whether we are remembered as the reasoning layer or absorbed into "yet another tool"

## Watchlist

- **Trend**: 2 major player launches in 7 days. Expect 3-6 more entries in 3-6 months (Anthropic bio team expansion; Big-Pharma-internal-lab tools; possibly a Stanford/MIT spin-out).
- **Risk**: BB dissolves into a tool layer if positioning copy doesn't crystallize this quarter.
- **Defense**: Boltz integration already in place. Reasoning-layer messaging already on homepage. Watcher now monitoring 4 vendors daily.

