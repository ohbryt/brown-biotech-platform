# catmood/models — shipped model artifacts

**Phase 0 status: NO model binaries exist.** This directory is intentionally
empty (except this README and `.gitkeep`). Nothing is trained yet; do not
believe any file claiming otherwise.

## What lands here (Phases 1+)

Exported, quantized **LiteRT models** plus their **metadata JSON sidecars**,
produced only by `../ml/export/`:

- `<name>.tflite` — the model the Android app loads.
- `<name>.json` — machine-readable model card written by
  `../ml/export/metadata.py`: taxonomy version, training-data summary
  (datasets, licenses, identity counts, limitations), real eval numbers
  with their run id, calibration (ECE + fitted temperature), quantization
  and size.

Per `../ml/AGENTS.md`:
- A `.tflite` **never** lands here without its `.json` sidecar and a
  calibration report (rules 2-3).
- Confidence must be temperature-scaled before export (rule 3).
- Total size of all `.tflite` files here is **< 80 MB**, asserted by
  `../ml/export/export_tflite.py` (rule 4).
- Every metric in a sidecar traces to a real eval run id (rule 1).

## Naming convention

`<lane>_<task>_v<N>.tflite` + `<lane>_<task>_v<N>.json`, e.g.:

- `vision_emotion_v1.tflite` + `vision_emotion_v1.json`
- `vision_facedetect_v1.tflite` + `vision_facedetect_v1.json`
- `audio_context_v1.tflite` + `audio_context_v1.json`

`v<N>` bumps on any change to weights, preprocessing contract, or taxonomy
(taxonomy changes also require the doc/enum updates in AGENTS.md rule 6).
Old versions are removed when the app drops support for them; the sidecar
travels with its model always.
