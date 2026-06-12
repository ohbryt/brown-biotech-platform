# AGENTS.md — CatMood Android app (`catmood/app`)

Gradle root for the Android app. Governed by the root `catmood/AGENTS.md`
(taxonomy, hard rules, shared domain contract) — this file adds Android-specific rules.

## Modules and lanes

| Module | Package | Owner lane |
|---|---|---|
| `:app` `domain/`, `data/`, `di/` | `com.catmood.app` | android-core-engineer |
| `:app` `ui/` | `com.catmood.app.ui` | compose-ux-engineer |
| `:core:designsystem` | `com.catmood.core.designsystem` | compose-ux-engineer |

- `ui/` depends on `domain/` (use cases, models) and `:core:designsystem`. Never on `data/` directly.
- `data/` implements `domain/` interfaces; bindings live in `di/`.
- `:core:designsystem` is app-agnostic: no domain types, no string resources of its own —
  components take localized text and simple value types as parameters.
- The shared domain contract in `com.catmood.app.domain.model` is verbatim from root
  `AGENTS.md`. Do not invent parallel result types.

## Mock-behind-interface pattern (Phase 0)

- `PhotoAnalyzer` / `AudioAnalyzer` are the ONLY inference entry points.
- `data/mock/Mock*Analyzer` simulate 200–400 ms latency, normalized distributions,
  low-confidence and typed error outcomes (`AnalysisError`) so every UI state is reachable.
- `di/AnalyzerModule` binds the mocks. Phases 1–2 swap these bindings for LiteRT
  implementations; nothing else should need to change.
- No MediaPipe/LiteRT dependencies may be added in Phase 0.

## Models (later phases)

- `.tflite` models live in the repo-root `/models` directory and ship via an
  asset/OTA-update abstraction added in Phases 1–2. Do not hardcode asset paths in
  domain or ui code; loading goes behind the analyzer implementations.

## Privacy hard rules

- The manifest must NEVER declare `INTERNET` (or any network) permission. PRs adding it
  are rejected; the off-device sharing opt-in is a Phase-5 human decision.
- `CAMERA` and `RECORD_AUDIO` are declared but unused until Phases 1–2.
- The Settings sharing toggle is DEFAULT OFF and non-functional in Phase 0.

## String-resource hedging rules

- Every user-facing string lives in `res/values/strings.xml` AND `res/values-ko/strings.xml`.
  Korean is first-class copy (해요체), not a literal translation.
- Always hedged probability language: "Likely ... (NN%)" / "...일 가능성이 높아요 (NN%)".
  Banned: certainty verbs in result headlines ("your cat IS ..."), literal
  "translate"/"diagnose" claims (번역/진단 단정), any unbacked accuracy claim.
- Confidence is part of the sentence; low-confidence and uncertain states use the
  canonical "hard to say" copy already in the files.
- High pain indicator → the vet-consultation note renders inline (see PhotoResultScreen).
- Any copy change requires a welfare-science-reviewer pass before merge.
- Known Phase-0 gap: mock cue strings are English-only raw strings from the data layer;
  cue localization is a Phase 1 task (cues become structured FGS codes mapped to
  string resources).

## Accessibility

- Meaningful visuals need `contentDescription` (charts expose a spoken distribution summary).
- Touch targets >= 48dp (`CatMoodSpacing.minTouchTarget`).
- State is never conveyed by color alone: pain indicator = color + icon + text;
  chart bars carry labels + numeric percentages; colors come from the Okabe-Ito palette.

## Tests

- Plain JVM unit tests only in Phase 0 (`app/src/test`, JUnit4 + kotlinx-coroutines-test;
  no Robolectric, no instrumentation).
- Required coverage for any change touching them:
  - mock analyzers: normalized distributions (sum ≈ 1), confidence/painScore in [0,1],
    error + low-confidence/uncertain states reachable;
  - `PainLevel.fromScore` threshold mapping;
  - entity <-> domain mappers roundtrip.
- New domain logic lands with tests in the same PR (root "Definition of done").

## Build notes

- Gradle wrapper 8.9; Kotlin 2.0.x + Compose compiler via `org.jetbrains.kotlin.plugin.compose`;
  AGP 8.5.x; Hilt + Room via KSP. Versions only in `gradle/libs.versions.toml`.
- minSdk 26, compile/targetSdk 35, JVM target 17.
- Phase-0 placeholders that get replaced: low-confidence thresholds
  (`PhotoResultViewModel` / `AudioResultViewModel`), `PainLevel` thresholds, the
  simulated capture/record paths, model version string `mock-phase0`.
