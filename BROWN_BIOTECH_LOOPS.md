# Brown Biotech Loops

> Operating loops for Brown Biotech Inc., standardized in the Forward Future
> schema (Loop / Verify / stop / Attribution). Use this doc as the source of
> truth when designing a new cron or responding to "what does BB run?".
>
> Schema (per [Forward Future Loop Library](https://signals.forwardfuture.ai/loop-library/)):
> - **Loop**: title + 1-paragraph description of what runs.
> - **Verify / stop**: bold = completion criterion. Plain = how to finish.
> - **Attribution**: who is responsible.
> - **Implementation**: cron job ID, schedule, skill, output.
>
> Updated 2026-06-19 — Dr. OCM / Brown Biotech Inc.
> Originally drafted in response to Forward Future Loop Library reference.

---

## Part 1 — Brown Biotech native loops

### Loop 001 — Daily Tech Digest: Research (PubMed/GEO)
**Category:** Content
**Does:** Every morning at 06:00 KST, the research-watcher scans 27 PubMed/GEO query families aligned with Brown Biotech pipelines (sarcopenia, MASH, lung fibrosis, OXPHOS, ferroptosis, etc.). Top 3 score-7+ hits are synthesized into a long-form decision-ready blog post and prepended to the marketing-site digest page.
**Verify / stop:** A new entry exists in `src/app/digest/page.tsx` with `date: "YYYY-MM-DD"` and the corresponding markdown file is published at `/blog/daily-digest/research/{date}`. Finish with a Vercel-deploy-succeeded confirmation (curl `brownbio.tech/blog/daily-digest/research/{date}` → HTTP 200).
**Attribution:** Brown Biotech Inc. (cron `f52bc0a7f916` → publisher `brown_biotech_research_digest_publisher.py`).

### Loop 002 — Daily Tech Digest: Signals (HN/GeekNews)
**Category:** Content
**Does:** Every morning at 07:00 KST, scan Hacker News, Reddit ML, GeekNews, and Reddit bioinformatics. Top 5 relevance-scored items are synthesized into a Korean-aware English+한글 signal brief and published as a proper blog post.
**Verify / stop:** A new `{date}.md` exists in `public/content/daily-digest/` and the index page shows "Latest Signals — {date}" with 3 amber bullets. Finish with a published commit on origin/main.
**Attribution:** Brown Biotech Inc. (cron `e84e3494518b` → publisher `brown_biotech_daily_digest_publisher.py`).

### Loop 003 — Daily Briefing (Korean Morning Brief)
**Category:** Operations
**Does:** Every morning at 07:00 KST, the CEO Agent produces a concise Korean daily briefing for Dr. OCM covering: yesterday's commits, active cron status, today's schedule, and any flagged anomalies. Delivered to Telegram home channel.
**Verify / stop:** A Korean Telegram message ≥ 200 chars is delivered to `telegram:743591671` with sections for cron-status, today's agenda, and (if applicable) flagged anomalies. Finish with `last_status: ok` on cron `16d2662d0f02`.
**Attribution:** Brown Biotech Inc. (cron `16d2662d0f02`).

### Loop 004 — Daily Signal Brief (PubMed/ClinicalTrials/ChEMBL)
**Category:** Content
**Does:** Every morning at 06:00 KST, run `brown_biotech_daily_signal_feed.py` to scan FDA, Fierce Biotech, Endpoints, Isomorphic Labs, Science Immunology for high-relevance signals aligned with Brown Biotech pipelines (15 query families). Pre-loads research-pulse blog and ARP v27 internal reports.
**Verify / stop:** The signal feed output is non-empty (≥ 5 items), research-pulse blog post is published, and ARP v27 hit-family analysis report is written. Finish with the publish-and-archive Telegram summary delivered.
**Attribution:** Brown Biotech Inc. (cron `38c7a65203e1`, skill `research-scan`).

### Loop 005 — Research Watcher Weekly Cadence (Mon scan / Wed benchmark / Fri report)
**Category:** Operations
**Does:** Three-times-weekly research-watcher run with different focuses: Monday = full scan across all 27 query families (ingest to Notion), Wednesday = benchmark run (measure dataset recall/precision), Friday = worth-integrating report (top hits with Brown Biotech scoring).
**Verify / stop:** Each run produces a dated output directory under `research-watcher/output/{YYYY-MM-DD}/` and the relevant Notion database is updated. Finish with Notion row count delta ≥ previous run's hit rate.
**Attribution:** Brown Biotech Inc. (crons `283aaa373394`, `3dd0c8adf9a9`, `bb77fb6b396a`, skill `brown-biotech-research-watcher`).

### Loop 006 — Agentic Brief (Mon/Wed/Fri 07:00 KST)
**Category:** Content
**Does:** Three-times-weekly (Mon/Wed/Fri 07:00 KST), generate a premium copy-style brief using the `brown-biotech-taste` skill. Frames 20+ tech trends as "등등" (etc.), premium-length, ends with Brown Biotech service CTA. Loop has explicit `repeat: 8/10` (skip-on-skip cadence).
**Verify / stop:** A premium Korean+English brief is delivered to Telegram home channel with a clear CTA and ≤ 5 inline tag references. Finish with `last_status: ok` on cron `9b16a4176a10` and `repeat_count` advanced.
**Attribution:** Brown Biotech Inc. (cron `9b16a4176a10`, skill `brown-biotech-taste`).

### Loop 007 — Weekly Review (Friday 16:00 KST)
**Category:** Operations
**Does:** Every Friday at 16:00 KST, the research-scan analyst reviews the week's saved daily signal briefs and proposes workflow refinements — which loops to keep, kill, or modify. Outputs a Notion weekly review entry.
**Verify / stop:** A weekly review Notion page is created with sections: kept loops, killed loops, modified loops, new-loop candidates. Finish with `last_status: ok` on cron `30f3db3b713c`.
**Attribution:** Brown Biotech Inc. (cron `30f3db3b713b`, skill `research-scan`).

### Loop 008 — Weekly Review (CEO Agent, Friday 17:00 KST)
**Category:** Operations
**Does:** Every Friday at 17:00 KST, the CEO Agent produces a Korean Friday weekly review for Dr. OCM with this week's wins, blockers, and next-week priorities. Distinct from Loop 007 (research-analyst view vs. CEO view).
**Verify / stop:** A Korean Telegram message ≥ 400 chars is delivered with wins/blockers/next-week sections. Finish with `last_status: ok` on cron `ff5a0fe39674`.
**Attribution:** Brown Biotech Inc. (cron `ff5a0fe39674`).

### Loop 009 — Multiomics API Smoke Test
**Category:** Engineering
**Does:** Every morning at 06:00 KST, run the multiomics API smoke test to verify the brownbio.tech multiomics lane is healthy (auth, request/response cycle, dataset queries). Archiver-only role — be brief.
**Verify / stop:** Smoke test exits 0, all critical paths return expected status codes, summary written to cron output. Finish with `last_status: ok` on cron `2cdc1e03ac0f` (gemini-2.0-flash, 8/8/8 model for cost).
**Attribution:** Brown Biotech Inc. (cron `2cdc1e03ac0f`, skill `multiomics-smoke-test`).

### Loop 010 — Client Relationship Monitor (Monday 07:00 KST)
**Category:** Operations
**Does:** Every Monday at 07:00 KST, scan client relationships for status changes, upcoming milestones, follow-ups overdue. Updates the Client Relationships Notion DB.
**Verify / stop:** Client Relationships Notion DB has been updated with this week's status deltas (or explicit "no change"). Finish with `last_status: ok` on cron `e49bf21991f5`.
**Attribution:** Brown Biotech Inc. (cron `e49bf21991f5`, skill `brown-biotech-agent-skill-pack`).

### Loop 011 — Monthly Financial Report (1st, 08:00 KST)
**Category:** Operations
**Does:** First of every month at 08:00 KST, financial tracking agent produces a monthly report against revenue targets and budget. Updates Financial Tracking Notion DB.
**Verify / stop:** A monthly financial report entry exists in Notion with revenue, expenses, and runway metrics. Finish with `last_status: ok` on cron `32e1f80533b2`.
**Attribution:** Brown Biotech Inc. (cron `32e1f80533b2`, skill `brown-biotech-agent-skill-pack`).

### Loop 012 — Email Triage + Draft Generator (paused)
**Category:** Operations
**Does:** Every 2 hours during business hours, scan inbox, triage by urgency, draft replies for routine items, surface high-priority items to Telegram. **Currently PAUSED since 2026-06-11** — resume when Dr. OCM re-enables.
**Verify / stop:** (When active) Drafted replies queued in draft folder, high-priority items surface to Telegram. When paused, no work. Resume only after explicit go-ahead.
**Attribution:** Brown Biotech Inc. (cron `b04bed891e01`, **state: paused**).

### Loop 013 — Notion Operating Hub daily review (ad-hoc)
**Category:** Operations
**Does:** When Dr. OCM asks "check current status" or "what did I miss?", query the Notion operating hub (Decisions DB, Active Projects, Pipeline, Content Engine, Playbooks, Weekly Reviews) and surface deltas since last review.
**Verify / stop:** A status snapshot is delivered with: latest decisions (last 7 days), project status changes, open blockers, missed-cron flags. Finish with explicit "what changed since X" timestamp.
**Attribution:** Brown Biotech Inc. (manual + Hermes Agent invocation; uses `notion-operating-hub` skill).

### Loop 014 — Intake → Brief Routing (ad-hoc)
**Category:** Operations
**Does:** When Dr. OCM sends a message via Telegram containing a research/business question, route it through the `intake` skill: classify by urgency, route to research/pipeline/business lane, draft a brief response, surface back to Dr. OCM.
**Verify / stop:** A routed response is delivered with: triage category, recommended next action, drafted brief (if applicable), and CTA to Paid Brief service (if commercial intent). Finish with explicit `last_action` + `next_action` documented in the conversation.
**Attribution:** Brown Biotech Inc. (manual + Hermes Agent invocation; uses `intake`, `triage`, `service-brief` skills).

---

## Part 2 — Imported from Forward Future Loop Library

These are loops that map directly to a Brown Biotech capability gap or operational
discipline. Original credit stays with the Forward Future attribution. **BB-specific
adjustments** are noted where the loop doesn't apply as-written.

### Loop 101 — The docs sweep *(FF #001, Matthew Berman)*
**Category:** Engineering
**Does:** Each night, review the codebase in full and make sure all documentation reflects the latest changes. Update stale docs, verify changes, open a PR.
**Verify / stop:** **Documentation matches the current implementation.** Finish with a reviewable PR (or merged into a docs-only cron output for Brown Biotech).
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** Adapt for Brown Biotech wiki (`bb-wiki` repo) — every night, scan `ohbryt/bb-wiki` for pages that haven't been refreshed in 30+ days, flag in Notion, update if anything in the corresponding service lane changed. Maps to `bb-wiki` skill.

### Loop 102 — The architecture satisfaction loop *(FF #002, Peter Steinberger)*
**Category:** Engineering
**Does:** Refactor until happy with the architecture. After each significant step, live-test the system, run autoreview, and commit. Track progress in `/tmp/refactor-{projectname}.md`.
**Verify / stop:** **The architecture is satisfactory and checks pass.** Finish with live-test + autoreview + commit per step.
**Attribution:** Peter Steinberger via Forward Future Loop Library.
**BB-specific:** When Brown Biotech does a major service-lane refactor (e.g. restructuring `/services/ai-drug-discovery`), this loop applies 1:1. Track progress in `/tmp/bb-refactor-{lane}.md`.

### Loop 103 — The production error sweep *(FF #004, Matthew Berman)*  ← **WOULD HAVE CAUGHT 6/15 VERCEL FAILURE**
**Category:** Engineering
**Does:** Review production logs for errors. If an actionable issue exists, trace to root cause, fix, verify, open a PR, ping in Slack. If clean, ping "no errors" instead.
**Verify / stop:** **Actionable production errors are fixed and verified.** Finish with PR + Slack summary, OR a clean-log confirmation.
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** **This loop is critical for Brown Biotech.** The 6/15 Vercel Actions "failures" were misdiagnosed as ghost signals for 4 days — a daily production error sweep would have caught the ESLint apostrophe and `--public` flag bugs immediately. Adapt: every morning at 06:30 KST, run `gh run list --workflow=main-pipeline.yml --limit 1 --json status,conclusion`; if `conclusion == "failure"`, surface to Telegram with the failing step's log tail and the latest commit SHA. Ping Dr. OCM only on real failures.

### Loop 104 — The 100% test coverage loop *(FF #005, Matthew Berman)*
**Category:** Engineering
**Does:** Add tests until 100% test coverage is reached.
**Verify / stop:** **The full test suite passes at 100% coverage.**
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** Deferred. Brown Biotech currently runs `npm run test` via the `npm run verify` chain — `verify` enforces lint + typecheck + test + build. Adopt this loop when BB-IO Compass or any other service lane gets a proper test suite; not yet for `brown-biotech-platform`.

### Loop 105 — The nightly changelog loop *(FF #008, Matthew Berman)*
**Category:** Engineering
**Does:** Each night, review changes from the previous day and update the changelog with anything users should know.
**Verify / stop:** **Every user-relevant change from the previous day is accounted for.**
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** **Already partially implemented.** The Daily Tech Digest (Loops 001 + 002) functions as the public-facing changelog. What's missing: a private `CHANGELOG.md` aggregated across `brown-biotech-platform`, `arp-v27`, `bb-wiki`, etc. Adopt: every Monday 09:00 KST, generate the private weekly changelog and route to Notion under "Weekly Reviews" DB.

### Loop 106 — The stale-safe batch release loop *(FF #013, Matthew Berman)*
**Category:** Operations
**Does:** Review pending changes and PRs, exclude stale or unfinished work, combine the valid changes, release.
**Verify / stop:** **Only current, complete changes ship in the combined release.**
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** Maps to the "concurrent-cron branch divergence" pattern (see `brown-biotech-daily-tech-digest` skill pitfall #1). Each day before any single cron pushes, verify the local branch's divergence counter — if `git status` reports "Your branch is ahead/behind origin/main", batch the divergent work before pushing.

### Loop 107 — The production data cleanup loop *(FF #014, Matthew Berman)*
**Category:** Operations
**Does:** Review production records, remove anything that doesn't meet the allowed definition, improve the classification.
**Verify / stop:** **Every remaining record meets the allowed definition.**
**Attribution:** Matthew Berman via Forward Future Loop Library.
**BB-specific:** Maps to Notion Operating Hub hygiene. First of every month, scan each DB (Decisions, Active Projects, Pipeline, Content Engine, Playbooks, Email Intake, Client Relationships, Financial Tracking) for records older than 90 days without `last_reviewed_at`; archive or update.

### Loop 108 — The ticket-to-PR-ready loop *(FF #016, Hiten Shah)*
**Category:** Engineering
**Does:** Review pending changes and PRs, exclude stale or unfinished work, combine the valid changes, ready for merge.
**Verify / stop:** **The failure is fixed, verified, and ready for review.**
**Attribution:** Hiten Shah via Forward Future Loop Library.
**BB-specific:** Maps to `intake` skill: when Dr. OCM files an issue (via Telegram, email, or Notion), route to the appropriate Brown Biotech service lane, draft a PR-ready spec with verify criteria, surface for Dr. OCM approval before opening the PR.

### Loop 109 — The Loop Harness verification loop *(FF #020, Istasha)*
**Category:** Engineering
**Does:** Second-agent independently verifies the first-agent's output. Only independently verified output ships.
**Verify / stop:** **Only independently verified output ships.**
**Attribution:** Istasha via Forward Future Loop Library.
**BB-specific:** **Already partially implemented.** Brown Biotech content QA uses a 2-agent pattern (e.g. content-writer → devil's-advocate-reviewer) but is ad-hoc. Adopt formally: any BB content publication (daily digest, agentic brief, LinkedIn draft, paid brief) must pass through a second-agent review with explicit verify criteria. Maps to the `stop-slop` skill.

### Loop 110 — The self-improving champion loop *(FF #023, Jose C. Munoz)*
**Category:** Evaluation
**Does:** Iteratively improve a candidate solution against a quality bar until the budget is exhausted. The best verified champion is returned.
**Verify / stop:** **The budget is exhausted and the best verified champion is returned.**
**Attribution:** Jose C. Munoz via Forward Future Loop Library.
**BB-specific:** Maps to BB-IO Compass model evaluation. When evaluating foundation models for the SoI reasoning layer, run iterative evals with a token budget; return the champion that passes the BB quality bar (decision-ready, citation-backed, no hallucination).

### Loop 111 — The devil's-advocate loop *(FF #024, Anonymous contributor)*
**Category:** Evaluation
**Does:** Spawn a second agent whose only job is to attack the first agent's conclusion. Log every objection. Continue until no high-impact objection remains open.
**Verify / stop:** **No high-impact objection remains open.** Every logged objection is verified or refuted.
**Attribution:** Anonymous contributor via Forward Future Loop Library.
**BB-specific:** **Critical for Paid Briefs.** Before any paid brief is delivered, run a devil's-advocate pass that questions: every cited statistic, every claim's logical chain, every commercial implication. Refute or revise before delivery. Maps to the `stop-slop` skill + content QA loop.

---

## Part 3 — How to use this doc

### When designing a new cron
1. Pick a Loop # from Part 1 or Part 2 that fits, OR draft a new one with the same schema.
2. Write the **Verify / stop** criterion FIRST. If you can't write it crisply, the loop isn't ready.
3. Reference this doc in the cron job prompt: `See Loop NNN in BROWN_BIOTECH_LOOPS.md for canonical verify/stop criteria.`
4. After the first run, surface the verify/stop evidence to Telegram — don't bury it in cron output.

### When reviewing what runs
1. List active loops from `/Users/ocm/.hermes/cron/jobs.json` (cron list).
2. For each active cron, find its Loop # in Part 1.
3. Check `last_run_at` + `last_status` against the loop's expected cadence.

### When a loop fails its verify/stop
1. Surface the failure to Dr. OCM via Telegram (not silently into cron output).
2. Add the failure mode to the loop's "Known pitfalls" section (under the loop body).
3. If the failure is recurring (>2 days), either fix the loop OR pause it explicitly.

### When importing a new FF loop
1. Read the original at https://signals.forwardfuture.ai/loop-library/.
2. Copy the Loop / Verify / stop / Attribution verbatim.
3. Add a **BB-specific** adjustment note if the loop needs modification for Brown Biotech context.
4. Assign the next available Loop # in the 100-series (imported FF loops).

---

## Related docs

- `BROWN_BIOTECH_PLAYBOOK.md` — company operating playbook (human-facing)
- `BROWN_BIOTECH_AGENTIC_AI_IMPLEMENTATION_TODO.md` — loop build-out backlog
- `BROWN_BIOTECH_ROLE_DELIVERABLES.md` — which loop produces which deliverable
- `BROWN_BIOTECH_TEAM_OPERATING_MATRIX.md` — loop ↔ owner matrix
- `~/CLAUDE.md` — Hermes Agent operating rules
- Forward Future Loop Library: https://signals.forwardfuture.ai/loop-library/
