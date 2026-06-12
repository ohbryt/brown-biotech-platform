# audio — meow context classifier (Phase 0 scaffold)

Pipeline (planned): waveform 16 kHz → meow event segmentation
(`meow_detector.py`, stub) → YAMNet embeddings + dense head (`train.py`,
stub) → calibrated 3-class probabilities → app maps low confidence to
`uncertain`.

Implemented and tested now: `features.py` (64-bin log-mel extraction). The
log-mel path exists for the energy-based meow detector and as a YAMNet-free
fallback; YAMNet computes its own internal features.

## Dataset reality check (be honest with users and ourselves)

Primary dataset: **CatMeows** (Ludovico/Ntalampiras et al., 2020; Zenodo
record 4008297 — license must be verified by a human before download,
ml/AGENTS.md rule 5).

- **440 vocalisations total. 21 cats. 2 breeds** (Maine Coon, European
  Shorthair). Recorded in controlled conditions in 3 induced contexts.
- That is a *small* dataset by any modern standard. With identity-level
  splits (mandatory — rule 7) the test set will contain only a handful of
  cats, so test metrics will have **high variance**; report confidence
  intervals, not point estimates.

## Expected real-world degradation

Lab-to-field gaps we already know about, before any training run:

- **Breed/individual coverage:** 2 breeds cannot represent cat vocal
  diversity; expect worse performance on unseen breeds and individual cats.
- **Context coverage:** real cats meow in many contexts beyond the 3 induced
  ones; out-of-set meows *must* land in `uncertain` via the confidence
  reject, which is exactly why `uncertain` is a reject decision and not a
  trained class.
- **Acoustics:** phone mics, room reverb, TV/traffic noise, distance, other
  pets — all absent from the lab recordings.
- **Segmentation errors compound:** a missed/over-merged meow event degrades
  the classifier input before classification even starts.

Published work on CatMeows reports usable separability of the 3 contexts in
lab conditions [literature — Ludovico/Ntalampiras et al. 2020 and follow-ups;
not our results]. **Assume real-world accuracy substantially below lab
numbers** and design the UX around the `uncertain` outcome being common.
No number is ours until `eval/evaluate.py` produces it from a real run.

## Files

- `config.yaml` — contexts, 64-bin log-mel params, 16 kHz, split policy.
- `features.py` — log-mel extraction. IMPLEMENTED, unit-tested (`ml/tests/`).
- `meow_detector.py` — energy/VAD event segmentation. Skeleton.
- `train.py` — YAMNet-embedding + dense head training. Skeleton.
