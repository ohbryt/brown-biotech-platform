"""Vision emotion-state classifier training — Phase 0 SKELETON.

STATUS: stub. The argparse interface and the training-loop shape are real;
every step that needs data or a backbone download raises NotImplementedError.
Training is performed OFF-DEVICE by a human in Phase 1+ (AGENTS.md rule 8).

Planned pipeline (Phase 1):
    1. load vision/config.yaml
    2. build identity-level splits (vision/dataset.py)
    3. build backbone (timm: mobilenetv3_large_100 or efficientnet_lite0),
       replace classifier head with 5 classes
    4. train with AdamW + cosine schedule, label smoothing per config
    5. select checkpoint on val macro-F1 (NOT accuracy — classes will be
       imbalanced; weighting is human decision #5)
    6. fit temperature scaling on the calibration split (eval/calibration.py)
    7. hand off to eval/evaluate.py and export/export_tflite.py

Honesty note: no metric printed by this script may be reported anywhere
unless it came from a real run on real data (ml/AGENTS.md rule 1).
"""
from __future__ import annotations

import argparse
from pathlib import Path


def load_config(path: Path) -> dict:
    """Load the YAML config. IMPLEMENTED (thin wrapper)."""
    import yaml

    with open(path) as fh:
        return yaml.safe_load(fh)


def build_model(cfg: dict):  # pragma: no cover - stub
    """STUB: create the backbone + 5-class head via timm.

    Phase 1 TODO:
        import timm
        model = timm.create_model(cfg["model"]["backbone"],
                                  pretrained=cfg["model"]["pretrained"],
                                  num_classes=cfg["model"]["num_classes"],
                                  drop_rate=cfg["model"]["dropout"])
    Keep the architecture TFLite-friendly: no ops outside the LiteRT builtin
    set (verify at export time, export/export_tflite.py).
    """
    raise NotImplementedError(
        "Phase 0: backbone construction deferred until a human picks the "
        "final backbone after a baseline comparison (vision/config.yaml note)."
    )


def train(cfg: dict, data_root: Path, out_dir: Path) -> None:  # pragma: no cover - stub
    """STUB: full training loop.

    Guards: refuses to run without data + datasheet. In Phase 1 this becomes
    the standard PyTorch loop (dataloaders from vision/dataset.py, AMP
    optional, checkpoint best val macro-F1 into ``out_dir``).
    """
    from dataset import check_datasheet  # local import; stays light

    check_datasheet(data_root)  # raises until a human provides data
    raise NotImplementedError(
        "Phase 0: training requires a curated, licensed, identity-split "
        "dataset (ml/README.md decisions #1-#3). Implement the loop here "
        "once data exists."
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Train the CatMood vision emotion classifier (Phase 0 stub)."
    )
    parser.add_argument(
        "--config", type=Path, default=Path(__file__).parent / "config.yaml"
    )
    parser.add_argument("--data-root", type=Path, default=Path("data/vision"))
    parser.add_argument("--out-dir", type=Path, default=Path("runs/vision"))
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse config and print the plan without touching data.",
    )
    args = parser.parse_args()

    cfg = load_config(args.config)
    if args.dry_run:
        print("Config OK. Classes:", cfg["classes"])
        print("Backbone:", cfg["model"]["backbone"])
        print("Phase 0: training NOT runnable yet — see module docstring.")
        return

    train(cfg, args.data_root, args.out_dir)


if __name__ == "__main__":
    main()
