---
name: honesty-and-welfare-review
description: >-
  Review user-facing copy (code strings, docs, store/UI text) for CatMood before shipping.
  Invoke before merging any PR that adds or changes user-facing output, accuracy claims, pain
  handling, taxonomy wording, or anything touching off-device data transfer. Enforces the
  honesty and welfare rules in the root AGENTS.md, docs/disclaimers.md, and
  docs/labeling-guidelines.md. Produces a blocking/non-blocking checklist with file:line refs.
---

# Honesty & Welfare Review

A reusable pre-ship review any agent runs on user-facing copy and the code that emits it.
Authoritative sources: root `AGENTS.md` (hard rules + taxonomy), `docs/disclaimers.md`
(canonical disclaimer copy), `docs/labeling-guidelines.md` (taxonomy + label definitions),
`docs/product-spec.md` (microcopy principles).

## When to run
- Any PR adding/changing user-facing strings (Compose UI, `strings.xml`, `strings-ko`, store
  copy), accuracy claims, pain handling, or off-device networking.
- Required for the welfare-science-reviewer pass referenced in `AGENTS.md`.

## How to run
1. Identify changed user-facing surfaces: string resources, Compose `Text`, docs, store copy,
   model-card claims, and any code that gates networking or builds result text.
2. Walk the checklist below against those surfaces, in **both EN and KO**.
3. Emit the output format. Any failed **blocking** check stops the merge.

## Checklist

### 1. No overclaiming — BLOCKING
- [ ] No certainty verbs in result copy ("is", "definitely", "your cat feels…", and KO
      단정 forms like "…입니다/…했습니다" used as verdicts). Results must be hedged.
- [ ] The words "translate"/"translation"/"통역"/"번역" never used as a literal claim about
      what the app does.
- [ ] The word "diagnose"/"diagnosis"/"진단" never used as a claim of the app's function.
- [ ] No accuracy/performance number appears unless it is backed by **our own** published
      eval in `docs/model-cards/`. Dataset-paper numbers presented as ours = blocking fail.

### 2. Confidence + distribution everywhere — BLOCKING
- [ ] Every user-facing result shows **confidence** (numeric + visual) and the **full
      distribution**, not just the top class. No surface shows only the winning label.

### 3. Pain → vet note — BLOCKING
- [ ] Wherever `pain_discomfort` (probability or FGS-based pain score) is high/elevated, the
      vet-consultation note is rendered **inline** with the result (not behind a tap), in the
      active language. Use the canonical pain copy from `docs/disclaimers.md`.

### 4. No off-device transfer without explicit opt-in — BLOCKING
- [ ] No code path sends photo/audio (or derived data) off-device unless an explicit opt-in
      flag is true. Default must be OFF. Flag any new network call, upload, analytics, or
      third-party SDK touching user media.

### 5. No taxonomy / wording drift — BLOCKING
- [ ] Emotion states and meow contexts match exactly the enums/labels in
      `docs/labeling-guidelines.md` and `AGENTS.md`
      (`relaxed_content | alert_aroused | fearful_anxious | irritated_aggressive |
      pain_discomfort`; `food_request | attention_isolation | handling_contact | uncertain`).
- [ ] `uncertain` is used only as the model reject option, never as a trained/human label.
- [ ] No FUTURE v2 audio labels (purr, hiss/growl, trill/chirp, yowl) leak into v1 copy,
      enums, or model cards.

### Non-blocking quality checks
- [ ] KO user-facing copy uses polite 해요체 and reads naturally (not literal translation).
- [ ] Disclaimer one-liners point to the full disclaimer reachable from Settings.
- [ ] Tone matches "warm but clinically trustworthy"; charts over verdict illustrations.
- [ ] Pain indicator conveyed by color + icon + text (not color alone); accessible.

## Output format

Return a checklist with **file:line** references. Classify each finding as **BLOCKING** or
**non-blocking**. End with a verdict.

```
## Honesty & Welfare Review — <PR / target>

### Blocking findings
- [BLOCKING] <rule #> — <description> — path/to/file.kt:123
  > offending text / code
  Fix: <what to change>

### Non-blocking findings
- [non-blocking] <rule #> — <description> — path/to/strings-ko.xml:45

### Verdict
PASS  (no blocking findings)  |  BLOCK  (N blocking findings must be fixed)
```

If there are zero findings, still emit the structure with empty sections and a PASS verdict.
