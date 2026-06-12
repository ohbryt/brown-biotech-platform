# catmood/ml — training, evaluation, and export repo

Phase 0 (Foundation) scaffold. **Nothing here is trained.** Every script that
needs real data raises `NotImplementedError` with a message saying what a
human must provide first. The only fully implemented, tested code is:

- `audio/features.py` — log-mel spectrogram extraction (pure function, unit-tested).
- `eval/calibration.py` — ECE / reliability-diagram computation (pure functions, unit-tested).

Read `AGENTS.md` in this directory before changing anything. Hard rules:
no fabricated metrics, calibrated confidence, model card + calibration report
per shipped model, identity-level data splits, verified dataset licenses.

## Layout

```
ml/
  AGENTS.md          ML-lane rules (honesty, calibration, licensing, splits)
  README.md          this file
  requirements.txt   loosely pinned Python deps
  vision/            emotion-state classifier
    config.yaml      taxonomy v1, image size, backbone choice
    dataset.py       loader skeleton + split-by-cat-identity stub
    train.py         PyTorch training loop skeleton
    gradcam.py       Grad-CAM interpretability skeleton
    detector/        cat-face detector (YOLO11n fine-tune plan + stub)
  audio/             meow context classifier
    config.yaml      contexts, 64-bin log-mel params, 16 kHz
    features.py      log-mel extraction (IMPLEMENTED, tested)
    meow_detector.py energy/VAD meow segmentation skeleton
    train.py         YAMNet-embedding + dense head skeleton
    README.md        dataset limits & expected real-world degradation
  export/
    export_tflite.py PyTorch→ONNX→TF→TFLite / Keras→TFLite skeleton + size budget
    metadata.py      JSON sidecar schema (model card data)
  eval/
    evaluate.py      confusion matrix + per-class precision/recall skeleton
    calibration.py   ECE + reliability diagram (IMPLEMENTED, tested)
    thresholds.yaml  CI eval-gate thresholds (placeholders, values TBD)
  tests/             pytest tests for the pure functions
```

Exported artifacts (`.tflite` + JSON sidecar) land in `../models/` — see
`../models/README.md` for the naming convention. No binaries exist in Phase 0.

## How a human will run training (later phases)

1. **Fetch data** (never committed to git):
   - CatMeows: download from Zenodo (https://zenodo.org/record/4008297) after
     verifying the license on the record page. Place under
     `ml/data/catmeows/` (gitignored) with a `DATASHEET.md` recording source,
     license, download date, and checksums.
   - Vision images: source TBD by a human (see decision list below). Same
     datasheet requirement. CatFLW landmarks are research-use only — accept
     terms first, never redistribute.
2. **Install deps**: `cd catmood/ml && python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt`
3. **Build identity-level splits**: `python3 vision/dataset.py --make-splits ...`
   / the split logic in `audio/train.py`. Splits are by *cat identity*, never
   per-image/per-clip (see AGENTS.md rule 7).
4. **Train**: `python3 vision/train.py --config vision/config.yaml`,
   `python3 audio/train.py --config audio/config.yaml`. Both currently raise
   `NotImplementedError` until data + label datasheets exist.
5. **Evaluate + calibrate**: `python3 eval/evaluate.py`, then temperature-scale
   on the held-out calibration split and verify ECE against `eval/thresholds.yaml`.
6. **Export**: `python3 export/export_tflite.py` (post-training quantization,
   asserts < 80 MB total) and `python3 export/metadata.py` to write the sidecar.
7. **Ship**: copy `.tflite` + `.json` pair into `catmood/models/`.

## What a human must curate / decide (not automatable)

These are explicit open decisions. The code stubs reference this list.

1. **Vision dataset sourcing & licensing.** No public dataset directly labels
   the v1 five-state taxonomy. A human must choose sources (e.g. published
   cat-emotion image sets, FGS-scored pain images, in-house collection),
   verify each license, and write a datasheet per source.
2. **Labeling protocol.** Who labels, with what guidelines
   (`docs/labeling-guidelines.md`), inter-rater agreement target, and how
   Feline Grimace Scale action units map to the `pain_discomfort` label.
3. **Split assignment by cat identity.** A human must verify cat identity
   metadata exists (or create it) so train/val/test/calibration splits never
   share a cat. CatMeows has only 21 cats — the human decides the exact
   per-identity allocation and accepts the resulting variance.
4. **CatFLW research-use terms.** Read and accept the conditions before any
   landmark work; decide whether landmark-based interpretability is in scope.
5. **Class imbalance & weighting strategy** once real label counts are known.
6. **Confidence reject threshold** for the audio `uncertain` decision and the
   vision low-confidence path — set after the first real calibration run.
7. **Eval-gate threshold values** in `eval/thresholds.yaml` — placeholders now;
   a human sets them after the first honest baseline.
8. **Quantization scheme** (dynamic-range vs full-int8 with representative
   dataset) after measuring accuracy drop on real eval data.

## Honest expectations (external literature, NOT our results)

- Binary cat-pain detection from images: literature reports roughly **72–95%**
  accuracy in controlled lab settings (e.g. Feline Grimace Scale automation
  work). Our 5-class problem is strictly harder; **multiclass accuracy will be
  lower**, and real-world (varied lighting, phone cameras, occluded faces)
  lower still.
- Meow context classification on CatMeows: published work reports usable
  separability on the 3 contexts, but the dataset is **440 vocalisations from
  21 cats of 2 breeds**. Expect substantial degradation on other breeds,
  ambient noise, and free-living recording conditions. See `audio/README.md`.

No number in this repo is "ours" until the eval harness produces it from a
real run. See AGENTS.md honesty rules.
