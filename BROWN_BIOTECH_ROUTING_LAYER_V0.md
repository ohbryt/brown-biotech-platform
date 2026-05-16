# Brown Biotech Routing Layer v0

## Purpose
Turn every inbound request into a clear route, one owner, one approval decision, and one next action.

## Core outputs
Every intake should return:
- **Route**
- **Owner**
- **Approval gate**
- **Next action**
- **Receipt**

## Routing rules
1. Capture the request in one record.
2. Score fit, urgency, and approval risk with shared logic.
3. Route to the right lane.
4. Hold any high-stakes request for human review.
5. Save a short receipt in Notion and return a shareable summary.

## High-stakes gates
Always require human approval for:
- money / spend
- legal
- contract
- deployment
- public announcement
- medical / clinical claims

## Example lanes
- **peptide-service** → peptide project scoping and quote path
- **biostatx** → decision-ready analysis and reporting
- **genox-site** → discovery framing and partner path
- **business-pipeline** → intake, routing, and ops automation

## Routing card
| Layer | What it does | Why it matters |
|---|---|---|
| Intake | Capture request, source, and outcome | Keeps the first pass short and usable |
| Triage | Score fit, urgency, and approval risk | Avoids guesswork and keeps routing consistent |
| Route | Assign owner and next action | Prevents loose chat and dropped handoffs |
| Human gate | Hold high-stakes items | Preserves control on sensitive decisions |

## Market signal from Roche × PathAI
The Roche announcement shows that diagnostics value is moving toward integrated workflow, AI-enabled pathology, and companion diagnostics. The lesson for Brown Biotech is simple:

> Sell decision-ready routing and workflow, not generic AI.

## Receipt format
- Request ID
- Route
- Owner
- Approval gate
- Next action
- Notion record link

## Suggested implementation
- `src/lib/intake.ts` holds the shared triage logic
- Browser demo previews route, owner, approval gate, and next action
- Notion receives the authoritative record
- Telegram / Slack can mirror the same receipt for human review
