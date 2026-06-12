# AGENTS.md — catmood/ml (ML lane rules)

Scope: this file governs everything under `catmood/ml/` and `catmood/models/`.
It extends the root `catmood/AGENTS.md`; if they conflict, the stricter rule wins.

## Hard rules

1. **Never fabricate metrics.** No accuracy numbers, confusion matrices, loss
   curves, or "results" may appear anywhere in this repo unless they were
   produced by an actual run of the eval harness on real data. Until then,
   docs may only cite *external literature*, clearly attributed as such
   (e.g. "literature reports ~72–95% for binary pain detection — not our result").
2. **Every shipped model ships with a model card and a calibration report.**
   A `.tflite` without its JSON sidecar (see `export/metadata.py`) and a
   calibration report (see `eval/calibration.py`) must never land in
   `catmood/models/`.
3. **Confidence must be calibrated.** The app surfaces confidence numbers to
   users directly. Raw softmax is not calibrated confidence. Before export,
   apply temperature scaling (or equivalent) on a held-out calibration split
   and verify ECE against `eval/thresholds.yaml`. An uncalibrated model is a
   release blocker.
4. **Export target is `.tflite` (LiteRT) with post-training quantization.**
   The app loads LiteRT models only. Total model budget across all models is
   < 80 MB (asserted in `export/export_tflite.py`).
5. **Datasets need verified licenses before use.**
   - CatMeows: Zenodo (https://zenodo.org/record/4008297) — verify the license
     on the record page before downloading; cite Ludovico/Ntalampiras et al. 2020.
   - CatFLW: distributed under research-use conditions — a human must read and
     accept the terms; do not redistribute images or landmarks in this repo.
   - Any other dataset: license verification is a human decision; record it in
     a datasheet under the dataset directory before any training run.
   No dataset files are ever committed to git.
6. **Taxonomy is frozen at v1** (see root AGENTS.md). Vision:
   `relaxed_content | alert_aroused | fearful_anxious | irritated_aggressive | pain_discomfort`.
   Audio: `food_request | attention_isolation | handling_contact | uncertain`.
   `uncertain` is a *reject decision* (confidence below threshold), not a
   trained class. Changing taxonomy requires updating `docs/labeling-guidelines.md`
   and the app's domain enums in the same PR.
7. **Splits are by cat identity, never by image/clip.** Random per-image splits
   leak the same cat into train and test and inflate metrics. CatMeows has only
   21 cats; identity-level splits are mandatory.
8. **Training is off-device, by a human, in later phases.** Phase 0 code is
   scaffolding: skeletons must raise `NotImplementedError` (with a clear
   message) wherever real data or a trained model is required, rather than
   silently producing fake output.

## Lanes (subdirectories)

- `vision/` — emotion-state classifier + cat-face detector (`vision/detector/`)
  + Grad-CAM interpretability.
- `audio/` — meow context classifier: log-mel features, meow event detection,
  YAMNet-embedding head.
- `export/` — PyTorch/Keras → TFLite conversion, quantization, metadata sidecars.
- `eval/` — confusion matrices, per-class precision/recall, calibration (ECE,
  reliability diagrams), CI eval gates.
- `tests/` — pytest tests for the pure functions (features, calibration).

## Honesty rules for docs and reports

- Mark every numeric claim as either **[ours — from run <id>]** or
  **[literature — citation]**. Anything else gets rejected in review.
- Always state dataset limitations next to any capability claim
  (e.g. CatMeows = 440 vocalisations, 21 cats, 2 breeds).
- Expected real-world performance is *worse* than lab benchmarks; say so.
