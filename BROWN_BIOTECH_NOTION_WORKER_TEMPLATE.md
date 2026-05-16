# Brown Biotech Notion Worker Template

## Purpose
A Notion Worker is the automation layer that turns recurring Brown Biotech work into repeatable, inspectable operations.

## Recommended worker roles

### 1) Intake Triage Worker
Use for new briefs.

Responsibilities:
- read new intake items
- classify service lane
- assign owner
- mark approval needed
- prepare a receipt summary

### 2) Weekly Review Worker
Use for end-of-week control.

Responsibilities:
- collect wins, blockers, risks
- summarize active lanes
- surface decisions needed
- draft next-week actions

### 3) Dataset Signal Worker
Use for recurring research signals.

Responsibilities:
- collect watcher outputs
- summarize hits
- flag QC candidates
- push reviewed items into Research Proof

### 4) Launch Check Worker
Use for high-stakes changes.

Responsibilities:
- check claims language
- check deployment readiness
- prepare rollback notes
- stop or escalate when review is required

## Setup interview questions
Before deploying a worker, capture:
1. What is the worker for?
2. What is its owner?
3. What counts as a failure?
4. What must be escalated?
5. What output should be written back to Notion?
6. What needs human approval?

## Human review rules
A worker may prepare, route, summarize, or draft.
It must not silently approve:
- money / spend
- legal / contract
- deployment
- clinical or medical claims
- public announcements
- high-stakes partnerships

## Simple worker lifecycle
1. Listen for a scheduled run or a new item
2. Read the relevant Notion record
3. Classify and summarize
4. Write back the result
5. Escalate if approval is required
6. Archive the receipt

## Example worker output format
- request id
- lane
- owner
- next action
- approval needed
- receipt

## Suggested Notion Worker names
- intake-triage
- weekly-review
- dataset-signal
- launch-check
- partner-routing

## Operational rule
Every worker should end by producing one of these:
- routed
- approved-for-review
- blocked
- archived
