"""Meow context classifier training (YAMNet embeddings + dense head) —
Phase 0 SKELETON.

STATUS: stub. Training is off-device by a human in Phase 1+ (AGENTS.md
rule 8). Everything that needs CatMeows data or the YAMNet checkpoint
raises NotImplementedError.

DESIGN NOTE — why `uncertain` is a REJECT decision, not a trained class:
The head predicts only the 3 induced CatMeows contexts (food_request,
attention_isolation, handling_contact). `uncertain` fires when the
*calibrated* max probability falls below a threshold (config: reject.
confidence_threshold; value is human decision #6 after the first real
calibration run). We do NOT train a 4th "uncertain" class because:
  (a) there is no honest training data for it — CatMeows contains only the
      3 induced contexts; any "uncertain" examples we invented would be
      fabricated labels (rule 1 territory);
  (b) the open world of out-of-set meows is unbounded; a trained class can
      only model the rejects we happened to collect, giving false
      confidence on the rest;
  (c) a calibrated-confidence threshold composes with rule 3 (the app
      surfaces confidence) and is auditable via eval/calibration.py.
If later phases collect genuine out-of-context recordings, revisit with an
explicit OOD method — and justify the change against this comment.

Planned pipeline (Phase 1):
    1. human downloads CatMeows from Zenodo, verifies license, writes
       data/catmeows/DATASHEET.md (rule 5)
    2. identity-level splits over the 21 cats (rule 7; allocation = human
       decision #3) — expect high test variance, report intervals
    3. segment meow events (audio/meow_detector.py), resample to 16 kHz
    4. extract frozen YAMNet embeddings (TF-Hub google/yamnet/1; human
       verifies hub license/version), mean-pool per event -> 1024-d
    5. train the dense head per audio/config.yaml -> head block
    6. temperature-scale on the calibration split; verify ECE against
       eval/thresholds.yaml
    7. export via export/export_tflite.py (Keras -> TFLite path)
"""
from __future__ import annotations

import argparse
from pathlib import Path


def load_config(path: Path) -> dict:
    """Load the YAML config. IMPLEMENTED (thin wrapper)."""
    import yaml

    with open(path) as fh:
        return yaml.safe_load(fh)


def extract_embeddings(data_root: Path, cfg: dict):  # pragma: no cover - stub
    """STUB: YAMNet embedding extraction over segmented meow events.

    Raises:
        NotImplementedError: always, in Phase 0 — needs CatMeows data and
            the YAMNet checkpoint (both human-gated, AGENTS.md rule 5).
    """
    datasheet = data_root / "DATASHEET.md"
    if not datasheet.is_file():
        raise FileNotFoundError(
            f"{datasheet} not found — a human must download CatMeows from "
            "Zenodo, verify its license, and write the datasheet first "
            "(ml/AGENTS.md rule 5)."
        )
    raise NotImplementedError(
        "Phase 0: embedding extraction deferred; see module docstring step 4."
    )


def train_head(cfg: dict, data_root: Path, out_dir: Path) -> None:  # pragma: no cover - stub
    """STUB: train the dense head on frozen embeddings, then calibrate.

    Raises:
        NotImplementedError: always, in Phase 0.
    """
    extract_embeddings(data_root, cfg)  # raises until data exists
    raise NotImplementedError("Phase 0: head training deferred until data exists.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Train the CatMood meow-context head (Phase 0 stub)."
    )
    parser.add_argument(
        "--config", type=Path, default=Path(__file__).parent / "config.yaml"
    )
    parser.add_argument("--data-root", type=Path, default=Path("data/catmeows"))
    parser.add_argument("--out-dir", type=Path, default=Path("runs/audio"))
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse config and print the plan without touching data.",
    )
    args = parser.parse_args()

    cfg = load_config(args.config)
    if args.dry_run:
        print("Config OK. Trained classes:", cfg["trained_classes"])
        print("'uncertain' = reject decision via calibrated-confidence "
              "threshold (see module docstring).")
        print("Phase 0: training NOT runnable yet.")
        return

    train_head(cfg, args.data_root, args.out_dir)


if __name__ == "__main__":
    main()
