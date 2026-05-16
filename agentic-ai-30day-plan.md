# Brown Biotech Agentic AI 30-Day Launch Plan

## Goal
Launch a narrow, revenue-first agentic AI offer for Brown Biotech within 30 days.

## Positioning
**AI-first, human-controlled biotech operations partner**

The company should sell productized services first, not a general-purpose platform.

---

## 30-Day Plan

### Week 1 — Pick the wedge and validate pain
**Outcome:** one clear offer, one buyer, one price hypothesis.

- define target customer segment
- identify the most expensive recurring pain
- run discovery calls or outreach
- choose one narrow pilot offer
- draft landing page / one-pager
- set pilot pricing

**KPIs**
- 10+ qualified conversations started
- 3+ strong pain confirmations
- 1 dominant use case selected
- 1 pilot candidate identified

### Week 2 — Build the MVP and operating system
**Outcome:** a working demo and a human-reviewed delivery flow.

- build intake flow
- define agent workflow
- connect Notion as operating hub
- add human approval checkpoints
- create output/report template
- test one end-to-end case

**KPIs**
- one workflow completes end-to-end
- human review before every external output
- demo ready
- internal SOP drafted

### Week 3 — Launch outreach and close pilots
**Outcome:** live pipeline and first paid pilot.

- send outbound messages
- book calls
- send proposals
- handle objections
- follow up aggressively
- close a pilot if possible

**KPIs**
- 50–100 targeted touches
- 5–10 replies
- 3–5 booked calls
- 1–2 proposals sent
- 1 paid pilot closed or near close

### Week 4 — Deliver, measure, systemize
**Outcome:** first real client result and repeatable process.

- onboard client
- deliver output
- measure turnaround time
- capture feedback
- refine SOPs
- create case study
- plan next 60 days

**KPIs**
- 1 completed engagement
- client approval
- turnaround benchmark established
- pipeline for next 3 prospects

---

## 3 Best Brown Biotech Business Ideas

### 1) Biotech Competitive Intelligence + Literature Radar
**Why this is #1:** fastest to pilot, uses public data, immediate buyer value.

- **Customer:** biotech founders, BD teams, research leads, boutique funds
- **Pain point:** fragmented paper/patent/clinical updates
- **Workflow:** monitor sources → cluster updates → human review → weekly insight brief
- **Sellability in 30 days:** high; easy to demo with public sources
- **Risks:** generic output, alert overload, broad scope

### 2) SBIR / Grant Application Copilot
**Why this is #2:** urgent deadline-driven pain, strong trust fit.

- **Customer:** academic PIs, spinouts, pre-seed biotech founders
- **Pain point:** grant writing is slow and deadline-heavy
- **Workflow:** intake docs → outline → section drafts → human edit → final package
- **Sellability in 30 days:** high; can be sold as a sprint
- **Risks:** seasonal demand, quality expectations, no funding guarantee

### 3) Biotech Proposal / Due Diligence / Data Room Readiness Agent
**Why this is #3:** highest ticket size, but more bespoke and trust-heavy.

- **Customer:** startups raising capital, CROs, BD teams, founders in diligence
- **Pain point:** documents scattered, claims unsupported, responses slow
- **Workflow:** ingest docs → index data room → flag issues → draft Q&A → human review
- **Sellability in 30 days:** medium; best as a 48-hour sprint
- **Risks:** confidentiality, liability, deeper customization

### Recommended order
1. Competitive Intelligence + Literature Radar
2. SBIR / Grant Copilot
3. Proposal / Diligence Readiness Agent

---

## MVP Architecture for the Best Idea

### Chosen MVP: Biotech Competitive Intelligence + Literature Radar

### Product scope
A human-controlled research agent that produces weekly insight briefs and alerts for a defined biotech target space.

### Core flow
1. user defines target space in intake form / Notion
2. agent monitors public sources
3. agent clusters and summarizes relevant updates
4. human reviews the draft
5. final brief is delivered
6. output is logged back into Notion

### Agent roles
- **Intake/triage agent:** classify request and collect scope
- **Monitor agent:** gather source material from public channels
- **Synthesis agent:** cluster findings and draft insight brief
- **QA/review agent:** check for relevance, duplication, and unsupported claims
- **Delivery agent:** format final output for client and archive in Notion

### Data flow
- intake form or Notion page
- source documents / links / search results
- synthesis workspace
- human approval queue
- final brief / PDF / Notion page
- archive + reuse log

### Memory / retrieval
- store client preferences, target keywords, excluded sources, and prior briefs in Notion
- maintain a lightweight retrieval layer over:
  - prior briefs
  - source watchlists
  - customer preferences
  - approved language snippets
  - PDFs / screenshots / figures / audio notes
- keep provenance and human approval attached to reused evidence
- add a separate dataset watcher for aging / fibrosis / metabolism / spatial / protein design inputs
- implemented in `research-watcher/` with cron wrapper, ingestion template, and QC notebook skeleton

### Tool/MCP integrations
- **Notion:** operating hub, briefs, client state
- **Slack:** optional approval + alerts
- **GitHub:** version control if workflow logic is code-based
- **Drive:** source document storage
- **Web/public search:** source collection

### Human approval points
- before sending client-facing outputs
- before changing the watchlist or source scope
- before any claim that could be interpreted as scientific or commercial advice

### Observability
Track:
- requests processed
- briefs delivered
- average turnaround time
- manual intervention time
- approval rejection rate
- client satisfaction / follow-up rate
- repeat request rate

### Minimal implementation stack
- Next.js or existing Brown Biotech web app for intake
- Notion as operating system
- one orchestration script / service
- one main LLM plus fallback
- simple storage for logs and briefs
- optional Slack notifications

### Safety controls
- no autonomous sending
- no unsupported claims
- no hidden sources
- every final output human-reviewed
- every deliverable traceable to source material

---

## First 7-Day Checklist
- choose one target segment
- define one urgent pain point
- choose one offer
- set pilot price
- build 20–30 prospect list
- write outbound sequence
- create intake form
- define approval gates
- draft output template

---

## Success by Day 30
- one clear offer
- one working MVP
- one repeatable delivery process
- one paid pilot or strong pipeline
- proof of time savings or quality improvement
- base for expansion into adjacent Brown Biotech services
