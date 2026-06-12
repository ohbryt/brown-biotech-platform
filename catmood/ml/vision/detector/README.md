# vision/detector — cat-face detector (Phase 0 plan, nothing trained)

The emotion classifier consumes a **face crop**, not the whole frame. This
lane produces the detector that finds the cat face on-device.

## Plan

- **Base model:** Ultralytics **YOLO11n** (nano) — smallest variant, fits the
  < 80 MB total app model budget after int8 quantization, exports to TFLite.
- **Task:** single-class detection (`cat_face`). We do not need breed, body,
  or multi-animal classes in v1; one box, highest-confidence face wins.
- **Fine-tune data (human decisions — see ml/README.md):**
  - Candidate sources: cat detection subsets of COCO/Open Images (cat *body*,
    so faces need re-annotation), the CatFLW dataset (face bounding boxes +
    48 landmarks, **research-use conditions — a human must read and accept
    the terms before download; never redistribute**), or in-house annotation.
  - Each source needs a license-verified datasheet before use (AGENTS.md rule 5).
- **Splits:** by cat identity where identity metadata exists; where it does
  not (web-scraped images), by source/page to limit near-duplicate leakage —
  the human documents the chosen policy in the datasheet.
- **Eval:** mAP@0.5 plus a face-crop usefulness check: % of detections whose
  crop fully contains both ears and muzzle (manual spot check at first).
- **Export:** Ultralytics' built-in TFLite export with int8 quantization;
  size and op-compatibility asserted in `../../export/export_tflite.py`.

## Honest expectations

No numbers are ours yet. Literature on small YOLO variants fine-tuned for
single-class pet-face detection reports high mAP in curated photos
[literature — generic detection benchmarks]; expect degradation on phone
captures with motion blur, partial faces, and low light. The app must handle
"no face found" gracefully (that is an app-side contract, not an ML excuse).

## Files

- `detect_train.py` — fine-tune stub (raises until data exists).
