# AGENTS.md — CatMood (root)

## What this project is
Android app: cat facial-expression → emotional STATE, and meow → likely CONTEXT.
On-device, offline by default. Privacy-first. NOT a medical/diagnostic device.

## Hard rules (apply to all subagents, every change)
- Outputs are probabilistic. Always expose confidence + distribution. Never a single certain verdict.
- Never use the words "diagnose"/"translate" in user-facing strings as literal claims; hedge.
- High pain/discomfort score → show "consult a veterinarian" note.
- No network calls that send photos/audio off-device unless an explicit opt-in flag is true.
- Keep PRs small, one phase at a time. Add tests with every feature.

## Scientific grounding (do not drift from these sources)
- Emotion taxonomy derives from published cat-emotion CNN work (calm/pleased/alarmed/angry 4-state, extended to 5).
- Pain/discomfort indicator derives from the Feline Grimace Scale (Evangelista et al., Sci Rep 2019):
  ear position, orbital tightening, muzzle tension, whisker change, head position.
- Meow contexts derive from the CatMeows dataset (Ludovico/Ntalampiras et al. 2020):
  food / isolation-attention / handling. 440 vocalisations, 21 cats, 2 breeds — small; be honest about limits.
- Landmark interpretability (later phase) from CatFLW (48 facial landmarks).

## Taxonomy (v1) — do not change without updating docs/labeling-guidelines.md
Emotion states: relaxed_content | alert_aroused | fearful_anxious | irritated_aggressive | pain_discomfort
Meow contexts: food_request | attention_isolation | handling_contact | uncertain

## Stack
App: Kotlin, Jetpack Compose, CameraX, AudioRecord, Room, Hilt, Coroutines/Flow,
MediaPipe Tasks + LiteRT (interfaces only in Phase 0), Gradle Kotlin DSL, minSdk 26.
ML: Python, PyTorch, librosa, TFLite/LiteRT export. Training off-device; ship .tflite only.

## Subagents and their lanes
- ml-data-engineer → /ml, /models only.
- android-core-engineer → /app (data, domain) only.
- compose-ux-engineer → /app (ui), core/designsystem only.
- qa-test-engineer → tests, eval harness, .github/workflows.
- devex-docs → /docs, AGENTS.md files, .agents/skills.
Reviewer (welfare-science-reviewer) pass required for any user-facing copy or accuracy claim.

## Shared domain contract (Kotlin, package com.catmood.app.domain.model)
All modules and agents must use exactly these types; do not invent parallel ones.
- `enum class EmotionState { RELAXED_CONTENT, ALERT_AROUSED, FEARFUL_ANXIOUS, IRRITATED_AGGRESSIVE, PAIN_DISCOMFORT }`
- `enum class MeowContext { FOOD_REQUEST, ATTENTION_ISOLATION, HANDLING_CONTACT, UNCERTAIN }`
- `PhotoAnalysis(distribution: Map<EmotionState, Float>, painScore: Float, confidence: Float, cues: List<String>)`
- `AudioAnalysis(topContexts: List<ContextScore>, confidence: Float, isUncertain: Boolean)`
- Analyzer interfaces: `PhotoAnalyzer.analyze(...)`, `AudioAnalyzer.analyze(...)` — Phase 0 binds MOCK
  implementations via Hilt; real LiteRT implementations replace the bindings in Phases 1–2.

## Definition of done
Build passes, lint clean, tests added, no overclaiming, docs updated, PR lists human decisions.

## Phase status
- Phase 0 (Foundation): this scaffold — app runs end-to-end on MOCK inference. No real models yet.
- Phases 1–5: see docs/product-spec.md roadmap.
