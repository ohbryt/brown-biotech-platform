# Brown Biotech ↔ SuperClaude Command Map

Reference: `SuperClaude_Framework` (`/sc:*` commands, modes, agents, MCP, memory, PM meta-layer).

## Why this matters
SuperClaude is a useful reference for turning Claude Code into a structured operating system. For Brown Biotech, the transferable idea is **not** the full framework; it is the **command taxonomy + memory loop + agent routing + evidence-first workflow**.

## Core mapping

| SuperClaude pattern | Brown Biotech equivalent | Purpose |
|---|---|---|
| `/sc:brainstorm` | `/intake` | Convert a vague ask into a scoped brief |
| `/sc:research` | `/signal` | Collect market / paper / competitor signals |
| `/sc:design` | `/route` | Decide lane, owner, approval gate, next action |
| `/sc:implement` | `/execute` | Perform the actual work |
| `/sc:test` | `/verify` | Browser QA, smoke checks, receipt validation |
| `/sc:reflect` | `/review` | Evaluate outcome, update rules, capture lessons |
| `/sc:save` | `/brief-save` | Persist the brief, receipt, and decision trail in Notion |
| `/sc:load` | `/hq-load` | Restore current HQ context and open work |
| `/sc:pm` | `/hq` | Human-readable operating snapshot |
| `/sc:troubleshoot` | `/triage` | Diagnose issues, blockers, or route ambiguity |
| `/sc:help` | `/map` | Show the current command map and lane guide |

## Brown Biotech command set v0
Keep the command surface small.

### Intake / routing
- `/intake` — capture request, source, goal, constraints
- `/triage` — score fit, urgency, and approval risk
- `/route` — assign lane, owner, next action
- `/approve` — human gate for money, legal, deployment, public claims, medical claims

### Execution / evidence
- `/execute` — do the scoped work
- `/verify` — browser QA, smoke test, checklist pass
- `/proof` — produce receipt, screenshots, notes, or brief output
- `/publish` — move approved outputs to site / Notion / public surface

### Knowledge / operations
- `/signal` — collect market, research, or publication signals
- `/review` — weekly review and lane cleanup
- `/hq` — show the operating snapshot
- `/map` — show the command map

## Operating modes to borrow
SuperClaude modes translate well into Brown Biotech roles:

- **Brainstorming** → use for unclear inbound briefs
- **Deep Research** → use for market / literature / competitor work
- **Task Management** → use for multi-step ops or multi-page work
- **Orchestration** → use when several tools or agents can run in parallel
- **Token Efficiency** → use for short, symbolic handoff formats
- **Introspection / reflection** → use after errors, failed QA, or ambiguity

## Agent roles to borrow
Use fewer roles than SuperClaude, but keep the same structure:

- **Intake agent** — normalize asks into brief records
- **Triage agent** — score fit and risk
- **Route agent** — choose owner and next action
- **Research agent** — summarize signals with evidence
- **QA agent** — verify the UI / workflow in browser
- **PM agent** — append checkpoints and keep the loop moving

## Memory / persistence pattern
SuperClaude’s persistent memory maps cleanly to Brown Biotech’s Notion HQ:

- **Request ID** → one unique brief / intake record
- **Receipt** → short, reusable summary of what happened
- **HQ snapshot** → current lanes, priorities, blockers, approvals
- **Weekly review** → simplify lanes, merge duplicates, retire weak offers
- **Decision trail** → keep rationale with the output, not in a separate hidden place

## Connector map
Borrow the connector mindset, not the exact stack.

- **Notion** → source of truth / HQ
- **Telegram** → human approval and fast inbound
- **GitHub** → implementation and versioning
- **Browser demo** → inspectable live workflow
- **Vercel** → public deployment surface
- **Research watcher** → market / paper / competitor signals

## What to borrow
- Clear command verbs
- One entrypoint, many specialist lanes
- Session start + checkpoint + save pattern
- Evidence-first outputs
- Post-task reflection and memory capture
- Human gate for high-stakes actions

## What not to copy
- 30+ command sprawl
- Overlapping agent roles
- Heavy MCP dependence where a simple local workflow is enough
- Auto-routing for high-stakes decisions without review
- Framework branding language that is too generic or too verbose

## Bottom line
For Brown Biotech, SuperClaude is a **pattern library for operational clarity**:
**brief → route → execute → verify → proof → review**.
The right move is to keep the command surface small, preserve inspectability, and keep human approval in the loop.
