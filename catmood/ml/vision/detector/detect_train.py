"""Cat-face detector fine-tune (Ultralytics YOLO11n) — Phase 0 SKELETON.

STATUS: stub. No detection dataset exists; a human must source and
license-verify one first (see detector/README.md). Training is off-device.

Planned pipeline (Phase 1):
    1. human writes data/detector/DATASHEET.md + a YOLO-format data.yaml
       (single class: cat_face) with identity/source-aware splits
    2. from ultralytics import YOLO
       model = YOLO("yolo11n.pt")
       model.train(data=..., imgsz=640, epochs=..., seed=17)
    3. model.export(format="tflite", int8=True)  # then size/op check via
       ../../export/export_tflite.py budget assertion
"""
from __future__ import annotations

import argparse
from pathlib import Path


def train_detector(data_yaml: Path, out_dir: Path) -> None:  # pragma: no cover - stub
    """STUB: fine-tune YOLO11n for single-class cat-face detection.

    Raises:
        NotImplementedError: always, in Phase 0 — no licensed detection
            dataset exists yet (detector/README.md, ml/README.md decision #1/#4).
    """
    if not data_yaml.is_file():
        raise FileNotFoundError(
            f"{data_yaml} not found — a human must prepare a YOLO data.yaml "
            "and a DATASHEET.md first (detector/README.md)."
        )
    raise NotImplementedError(
        "Phase 0: detector fine-tune deferred until a licensed, datasheet-"
        "documented face-box dataset exists. See module docstring for the plan."
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fine-tune YOLO11n cat-face detector (Phase 0 stub)."
    )
    parser.add_argument("--data", type=Path, default=Path("data/detector/data.yaml"))
    parser.add_argument("--out-dir", type=Path, default=Path("runs/detector"))
    args = parser.parse_args()
    train_detector(args.data, args.out_dir)


if __name__ == "__main__":
    main()
