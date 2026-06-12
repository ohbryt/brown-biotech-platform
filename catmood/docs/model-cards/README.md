# CatMood — Model Cards

Status: Phase 0 (Foundation). **No model cards exist yet because no models are trained.**

The app currently runs on **mock analyzers** (`MockPhotoAnalyzer`, `MockAudioAnalyzer`) behind
the `PhotoAnalyzer` / `AudioAnalyzer` interfaces. Mock outputs are placeholder values and are
**not** a model — they get no card. Real on-device models (MediaPipe Tasks + LiteRT) and their
cards land in Phase 1 (vision) and Phase 2 (audio).

Each real model ships with a model card in this directory before it is bound in the app:
- `photo-emotion-card.md` — Phase 1
- `audio-context-card.md` — Phase 2

A model card is a **gate**: a real model may not replace its mock binding until its card is
published and the welfare-science-reviewer has signed off (see `docs/product-spec.md` roadmap).

---

## Model card template

Copy this template for each trained model. Fill every section; if a section is unknown, write
"unknown" and why — do not delete it. Numbers must come from **our own evaluations**, never
from dataset papers (see honesty rules in root `AGENTS.md` and `docs/disclaimers.md`).

```markdown
# Model Card — <model name> (<version>)

## Intended use
- What it does, on what input, producing what output (distribution + confidence).
- Target users (cat owners) and the observation-aid framing.
- The exact taxonomy it emits (must match docs/labeling-guidelines.md and AGENTS.md).

## Out-of-scope use
- Not for medical/veterinary diagnosis or analgesia decisions.
- No live video; one cat face per photo; no off-device transfer.
- Any use the model was not evaluated for.

## Training data
- Dataset(s), source, version, size (cats / clips / images / breeds).
- License and commercial-use status (verification tracked in docs/decisions-needed.md).
- Preprocessing, augmentation, and known sampling biases (breed, lighting, geography).

## Eval data
- Held-out eval set: source, size, how it was split (subject-disjoint?).
- How it differs from training; known distribution gaps.

## Metrics + calibration
- Our own measured metrics (per-class precision/recall, confusion, macro-F1, etc.).
- Calibration: reliability/ECE; the low-confidence reject threshold and how it was set.
- For the photo model: how FGS AU scores map to the shipped pain indicator and how the
  "elevated" threshold was calibrated (Phase 1) — with our numbers, clearly ours.

## Limitations
- Breed/anatomy confounds, pose/lighting sensitivity, small-dataset limits
  (e.g., CatMeows: 440 clips / 21 cats / 2 breeds), real-world vs lab gap.

## Ethical considerations
- Welfare framing: probabilistic, hedged, never a verdict.
- Risk of over-reliance instead of seeing a vet; mitigations (vet note on elevated pain).
- Privacy: on-device, offline by default, opt-in required for any sharing.
- Failure modes and who they could affect.
```

---

## Honesty rules for every card
- Publish only metrics from our own held-out evaluation; label them as ours.
- Never present dataset-paper figures as CatMood performance.
- State limitations plainly; real-world performance may be lower than eval figures.
- Keep taxonomy wording identical to `docs/labeling-guidelines.md`.
