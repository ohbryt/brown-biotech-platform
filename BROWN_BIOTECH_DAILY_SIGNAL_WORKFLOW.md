# Brown Biotech Daily Signal Workflow

## Purpose
Turn daily biotech noise into a short, verified signal memo for Brown Biotech’s *peptide-service* lane and AI-enabled ops positioning.

## Operating rule
Do not rely on source-family inference alone. Every memo should include at least 3 live article-level items with:
- source
- headline
- date/time if visible
- URL
- why it matters for Brown Biotech

## Live source families
### 1) FDA press announcements
Entry: https://www.fda.gov/news-events/fda-newsroom/press-announcements
Use for:
- regulatory tailwinds
- inspection / oversight changes
- safety guidance
- expanded access / priority programs
- AI/data-platform modernization

### 2) Fierce Biotech
Entry: https://www.fiercebiotech.com/
Use for:
- deal flow
- fundraising
- clinical setbacks / readouts
- manufacturing / outsourcing signals
- AI-biotech partnership news

### 3) Endpoints News
Entry: https://endpoints.news/
Use for:
- financing
- supply-chain and manufacturing pressure
- FDA leadership / policy shifts
- AI and platform-company updates
- deal / M&A momentum

### 4) Major AI / peptide company newsrooms
Use current newsroom / news pages for:
- Isomorphic Labs
- other major AI-drug-design or peptide/CDMO groups when accessible

Example accessible newsroom:
- https://www.isomorphiclabs.com/news

## Relevance filters
Score each item 0–2 on each axis:
- **Peptide demand**
- **Licensing / partnership signal**
- **Regulatory / funding shift**

### Priority tiers
- **6:** immediate Brown-relevant
- **4–5:** worth tracking
- **0–3:** archive only

## Current live examples to anchor the workflow
### FDA
- FDA Finalizes Food Chemical Safety Post-Market Assessment Program, Launches Reassessment of BHT, ADA
- FDA Advances Drug Repurposing to Address Unmet Medical Needs
- FDA Grants Seventh Approval under the National Priority Voucher Pilot Program
- FDA Expands AI Capabilities and Completes Data Platform Consolidation
- FDA Issues Guidance to Improve Collection of Pregnancy Safety Data for Drugs and Biologics

### Fierce Biotech
- BMS inks $15B deal to bag Hengrui assets, tap China’s R&D speed
- Alphabet's AI biotech Isomorphic Labs bags $2.1B series B
- AstraZeneca’s $800M bet undermined by immunogenicity in phase 3
- Kyverna begins rolling FDA submission for autoimmune CAR-T in SPS

### Endpoints News
- Tessera says infusion edits 85% of blood cells, pointing to off-the-shelf sickle cell fix
- FDA Commissioner Makary resigns
- Five burning questions for Isomorphic after its mammoth $2B+ raise
- EU reaches provisional deal on Critical Medicines Act

### Isomorphic Labs newsroom
- Isomorphic Labs announces Series B investment round
- Isomorphic Labs enters into a research collaboration with Johnson & Johnson
- Isomorphic Labs to appoint Max Jaderberg as President

## Memo template
**Title:** Brown Biotech Daily Signal Brief

**Date:** YYYY-MM-DD

**Top signals**
1. [headline] — [why it matters]
2. [headline] — [why it matters]
3. [headline] — [why it matters]

**What Brown should do**
- outreach target
- proof / publication angle
- routing / ops follow-up

**Decision**
- Monitor / Refine / Act

## Output rule
The memo should end with one concrete next action, not a general summary.

## Persistence
- The daily script saves each run to `Daily-Briefs/YYYY-MM-DD-brown-biotech-daily-signal-brief.md`.
- The weekly refinement script reads the saved daily briefs to summarize repeat patterns and improve the workflow.
