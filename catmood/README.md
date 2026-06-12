# 🐱 CatMood — Cat Mood & Meow Context (Android)

CatMood estimates a cat's likely **emotional state** from a face photo and the likely
**context** of a recorded meow. All inference runs **on-device and offline by default** —
no photo or audio leaves the phone unless the user explicitly opts in.

> **Honest framing:** CatMood performs *probabilistic context classification*, not literal
> "translation" and not diagnosis. Every result is shown as a distribution with confidence.
> CatMood is **not a medical device**; if pain/discomfort indicators are high the app
> recommends consulting a veterinarian.

## Monorepo layout

```
catmood/
├─ AGENTS.md            # Global agent rules — single source of truth for principles & taxonomy
├─ app/                 # Android app (Kotlin, Jetpack Compose, Gradle Kotlin DSL)
│  └─ AGENTS.md         # Android-specific agent rules
├─ ml/                  # Training / eval / export pipelines (Python) — runs off-device
│  └─ AGENTS.md         # ML-specific agent rules
├─ models/              # Exported .tflite models + metadata (Phase 1+)
├─ docs/                # Product spec, labeling guidelines (FGS rubric), disclaimers, model cards
└─ .agents/skills/      # Reusable agent skills (e.g., honesty-and-welfare-review)
```

## Status: Phase 0 — Foundation

The app builds and runs end-to-end on a **mock inference layer** (`MockPhotoAnalyzer`,
`MockAudioAnalyzer`) behind clean interfaces. Real on-device models (MediaPipe Tasks +
LiteRT) land in Phases 1–2. See `docs/product-spec.md` for the full roadmap.

## Building the app

Requires Android Studio (or Android SDK + JDK 17+). From `catmood/app/`:

```bash
./gradlew assembleDebug      # build
./gradlew test               # unit tests
```

## Scientific grounding

- **Feline Grimace Scale** — Evangelista et al., *Sci Rep* 2019 (pain/discomfort indicator rubric)
- **CatMeows dataset** — Ludovico, Ntalampiras et al. 2020 (meow context taxonomy)
- **CatFLW** — 48 cat facial landmarks (interpretability, later phase)
- Published cat-emotion CNN work (emotion-state taxonomy starting point)

See `docs/labeling-guidelines.md` and `docs/model-cards/` for details, limitations, and
honest accuracy expectations. Dataset licenses must be verified before any commercial use —
tracked in `docs/decisions-needed.md`.
