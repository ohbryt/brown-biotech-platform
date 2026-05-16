# Brown Biotech Poetiq-Style Harness Architecture

## Purpose
Translate the Poetiq idea into Brown Biotech terms: the product is not a single model, but a *model-agnostic harness* that turns messy requests into decision-ready handoffs.

## Core thesis
- Better prompts alone are not enough.
- Better models alone are not enough.
- Brown Biotech wins by combining:
  1. **Inspectable intake**
  2. **Deterministic routing**
  3. **Human review gates**
  4. **Reusable delivery receipts**
  5. **A feedback loop that improves the workflow itself**

That is the Brown Biotech harness.

## What is model-agnostic?
The same operating logic should work across Claude, Gemini, GPT, or open-weight models.

The model can change.
The workflow should stay stable.

## Harness layers
### 1) Intake layer
Capture:
- objective
- constraints
- evidence stack
- deadline
- approval risk
- intended lane

### 2) Router layer
Decide:
- route
- owner
- approval gate
- next action

### 3) Task assembly layer
Turn the request into the smallest useful work unit:
- paid brief
- analysis plan
- partner memo
- service quote
- publication draft

### 4) Review layer
Stop risky items before they ship:
- money
- contracts
- deployment
- public claims
- medical / clinical claims

### 5) Receipt layer
Return a reusable record:
- request ID
- route
- owner
- approval status
- evidence stack
- next action
- delivery artifact

### 6) Improvement layer
Feed outcomes back into the system:
- what was misrouted?
- what evidence was missing?
- what copy caused confusion?
- what should become a template?

## Brown Biotech implementation map
### Website
- intake form
- visible route
- owner and approval status
- receipt after submission
- browser-demo path for testing

### Notion HQ
- source of truth
- decision log
- weekly review
- reusable templates
- improvement notes

### Operator stack
- local tools for execution
- browser QA for visible verification
- human approval rails
- proof archive

### Skill pack
Reusable SOPs:
- intake
- triage
- review
- brief drafting
- receipt generation

## Operating rule
**One brief, one owner, one next action.**

If any of those three are missing, the harness is not finished.

## Success metrics
Measure the harness by decision quality, not model hype:
- route accuracy
- approval accuracy
- brief clarity
- evidence completeness
- receipt reuse rate
- reduced rework

## Bottom line
Brown Biotech should sell a trustworthy operating harness for biotech work, not a generic chatbot. The harness can improve over time, but it must stay inspectable, reviewable, and reusable.
