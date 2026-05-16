# Brown Biotech Local Operator Stack

## Goal
Use local tools to turn a request into a brief, a route, a deliverable, and a shareable receipt.

## Stack
- **Notion** — source of truth for HQ, routing, templates, and decisions
- **Brown Biotech site** — intake, proof, partner funnel, and public-facing brief request flow
- **Open Design** — local launcher / operator console for choosing the right agent and working context
- **Claude Code** — deep implementation, refactor, and repo edits
- **Codex** — fast implementation, cleanup, and test-driven changes
- **Atlantis-style visual board** — diagrams + notes + checkpoints for live operational clarity
- **Telegram** — human approval, alerts, and escalation

## Operating principle
One request should only have one live owner, one next action, and one approval state.

## Recommended flow
1. **Intake**
   - request enters site or Telegram
   - request ID is created
   - lane is selected

2. **Triage**
   - fit
   - urgency
   - approval risk
   - route

3. **Route**
   - assign owner
   - choose execution tool
   - choose whether the task needs a visual board, a brief, or a direct implementation pass

4. **Execute**
   - use Claude Code for larger repo work
   - use Codex for faster scoped work
   - use Open Design as the local selector and session launcher

5. **Publish**
   - update Notion HQ
   - write the receipt
   - add proof or a diagram if it helps future reuse

6. **Review**
   - weekly review
   - decision log
   - reusable template extraction

## Where Open Design fits
Use Open Design when the task needs a local command center for agents and tools.

Best uses:
- choose the right local agent
- keep the workflow on the machine
- launch work from a visual control layer
- bridge between a request and a concrete local task

## Where Atlantis-style visuals fit
Use visual boards when the team needs to see:
- intake flow
- funnel state
- proof pipeline
- weekly status
- brief lifecycle

## Guardrails
- Do not let local tools become the source of truth.
- Do not let the visual board replace the real routing system.
- Do not skip human approval for money, claims, deployment, or public statements.
- Keep the primary motion explicit: `Paid Brief → peptide-service`.

## Bottom line
Use **Open Design** to run work locally, **Atlantis-style visuals** to understand it quickly, and **Notion** to record what became true.
