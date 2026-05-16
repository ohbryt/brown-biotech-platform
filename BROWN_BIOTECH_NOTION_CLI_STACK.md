# Brown Biotech Notion CLI Stack

## Goal
Turn Brown Biotech's operating hub into a **Notion-first control plane** that supports:
- paid brief intake
- service routing
- weekly review
- dataset watcher outputs
- decision logs
- human approval gates

## Why this matters
The legal-industry Claude announcement is a good operating template:
- **connectors** bring live work into the model
- **plugins / skills** package repeatable workflows
- **scheduled tasks** automate recurring work
- **human review** protects high-stakes actions

Brown Biotech should follow the same pattern.

## Core components

### 1) Connectors
These are the systems Brown Biotech should connect into Notion / CLI workflows:
- Notion HQ
- GitHub
- PubMed / PMC
- GEO / SRA / TCGA / HF datasets
- Google Drive / PDFs
- Telegram
- Vercel / deployment logs
- research-watcher outputs
- service intake forms

### 2) Practice-area plugins
These are the operational lanes Brown Biotech should package like plugins:
- **Paid Brief Intake**
- **Dataset Watcher**
- **QC Review**
- **Peptide Service Routing**
- **Biostatistics Review**
- **Genox / discovery brief**
- **Partner / BD brief**
- **Weekly Signal Digest**
- **Decision Memo Drafting**
- **Risk / Claims Review**

### 3) Setup interview
Before any lane is used, collect the team operating style:
- playbook
- escalation chain
- risk tolerance
- house style
- approval rules
- preferred deliverable format

This ensures the system is **Brown Biotech-specific**, not generic.

## Notion HQ structure

### Root page
**Brown Biotech HQ**
- company status
- current focus
- active lanes
- approvals needed
- weekly review links

### Supporting pages
- Team Roster
- Intake Requests
- Funnel Tracker
- Decision Log
- Weekly Review
- Research Watcher
- Service Lanes
- Approved Briefs
- Archive / Retired

## Recommended databases

### Intake Requests
Fields:
- request title
- service lane
- source
- priority
- owner
- approval needed
- status
- next action
- deadline

### Funnel Tracker
Fields:
- account / lead
- stage
- owner
- source
- next step
- last touched
- close probability
- notes

### Decision Log
Fields:
- date
- decision
- rationale
- impact
- owner
- follow-up

### Weekly Review
Fields:
- wins
- blockers
- risks
- decisions needed
- next actions

## Brown Biotech operating rules

1. **One brief, one owner, one next action**
2. **Human review required for high-stakes items**
3. **No blind automation**
4. **All outputs should be decision-ready**
5. **The website and Notion must use the same lane names**
6. **Paid brief intake is the primary motion**

## Notion CLI flow

### Authenticate
```bash
ntn login
```

### Inspect workspace
```bash
ntn api v1/users
```

### Build or manage workers
```bash
ntn workers new
ntn workers deploy
ntn workers list
```

### Upload files
```bash
ntn files create < report.pdf
ntn files list
```

## Suggested automation tasks

### Daily
- collect new intake requests
- summarize active blockers
- surface urgent approvals

### Weekly
- publish dataset signal digest
- review service pipeline
- refresh decision log
- move completed items to archive

### Monthly
- review working lanes
- remove dead pages
- refine service copy
- audit human review exceptions

## First implementation order

1. Create / verify Brown Biotech HQ root page
2. Add Team Roster and Decision Log
3. Add Intake Requests and Funnel Tracker
4. Add Weekly Review page
5. Add Research Watcher page
6. Add Service Lanes page
7. Add Notion CLI worker template for recurring tasks
8. Connect outputs to Telegram / internal review

## Success criteria
- every request has an owner
- every lead has a next action
- every weekly review produces decisions
- every high-stakes action is review-gated
- the operating model is visible in Notion and mirrored on the site
