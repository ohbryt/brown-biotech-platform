# Research Intelligence

## What This Does
AI-powered research intelligence for longevity science. Applies TrueSkill-ranked pairwise tournament to arXiv preprints — delivers decision-ready shortlists, not reading lists.

## Key Concepts (from Kurate.org pattern)
- **TrueSkill Ranking:** Bayesian skill estimation (mu - 3σ) mapped to Elo-style scale centered at 1200
- **Pairwise Tournament:** Head-to-head comparison across novelty, rigor, applications, breadth, timeliness
- **Positional Bias Correction:** 50% random flip of paper order before LLM evaluation
- **Quality-Based Matchmaking:** TrueSkill match quality for opponent selection (new papers face wider range)
- **Multi-Model Consensus:** Round-robin rotation across multiple models for ranking

## Key Files
- `page.tsx` — Service landing page
- ServiceInquiryCard integration for brief intake

## Categories Covered
Longevity / aging science scoped:
- Biomolecules, Cell Behavior, Genomics, Molecular Networks
- Neurons and Cognition, Populations and Evolution
- Quantitative Methods, Subcellular Processes, Tissues and Organs
- Computers and Society, Cryptography and Security, Information Theory

## Local Commands
```bash
cd src/app/services/research-intelligence && npm run dev
```

## Relationship to Other Services
- **Inventa:** AI research agent tournament for hypothesis generation (similar tournament pattern, different scope)
- **AI Drug Discovery:** Molecular-level candidate ranking (PRISM pipeline)
- **Research Intelligence:** Preprint/arxiv-level ranking (broader science scope)

## Delivery Model
Paid intelligence brief — not self-serve SaaS. Analyst team delivers ranked report with TrueSkill scores + AI Impact Assessments.