"""Model export to TFLite (LiteRT) — Phase 0 SKELETON.

STATUS: stub, except the size-budget check (`check_size_budget`), which is
implemented and pure. No trained models exist, so there is nothing to
convert yet.

Export paths (the human running export picks per model):
  - Vision (PyTorch backbone):
        torch -> ONNX (torch.onnx.export, opset >= 17)
             -> TF SavedModel (onnx2tf OR onnx-tf; pick + pin ONE at export
                time — both churn quickly, see requirements.txt comment)
             -> TFLite (tf.lite.TFLiteConverter.from_saved_model)
  - Audio head (Keras on YAMNet embeddings):
        Keras -> TFLite directly (TFLiteConverter.from_keras_model)
  - Detector (Ultralytics): use YOLO(...).export(format="tflite", int8=True),
    then run the budget/op checks here.

Post-training quantization options (human decision #8 after measuring the
accuracy drop on real eval data):
  - dynamic range: converter.optimizations = [tf.lite.Optimize.DEFAULT]
  - full int8: same + converter.representative_dataset = <calibration split
    samples>; converter.target_spec.supported_ops = [TFLITE_BUILTINS_INT8]
  - float16 fallback if int8 accuracy drop is unacceptable

Hard constraints (ml/AGENTS.md rule 4):
  - LiteRT-builtin ops only (verify converted model loads in the TFLite
    interpreter and op set contains no Flex/custom ops)
  - TOTAL size of all models in catmood/models/ < 80 MB
  - a .tflite never lands in catmood/models/ without its JSON sidecar
    (export/metadata.py) and a calibration report (rules 2-3)
"""
from __future__ import annotations

import argparse
from pathlib import Path

TOTAL_BUDGET_BYTES: int = 80 * 1024 * 1024  # < 80 MB across ALL shipped models


def check_size_budget(
    new_model_bytes: int,
    models_dir: Path,
    budget_bytes: int = TOTAL_BUDGET_BYTES,
) -> None:
    """Assert the total .tflite payload stays under budget. IMPLEMENTED.

    Sums existing ``*.tflite`` files in ``models_dir`` plus the candidate
    model's size and raises if the budget is exceeded.

    Raises:
        ValueError: if adding the new model would exceed ``budget_bytes``.
    """
    existing = sum(
        p.stat().st_size for p in models_dir.glob("*.tflite") if p.is_file()
    )
    total = existing + new_model_bytes
    if total >= budget_bytes:
        raise ValueError(
            f"model size budget exceeded: existing {existing} B + new "
            f"{new_model_bytes} B = {total} B >= {budget_bytes} B. "
            "Quantize harder or shrink the backbone (ml/AGENTS.md rule 4)."
        )


def export_vision(checkpoint: Path, out_path: Path, quant: str) -> None:  # pragma: no cover - stub
    """STUB: PyTorch -> ONNX -> TF -> TFLite for the vision classifier.

    Raises:
        NotImplementedError: always, in Phase 0 — no trained checkpoint exists.
    """
    raise NotImplementedError(
        "Phase 0: nothing to export — no trained vision checkpoint. "
        "Implement the path in the module docstring after the first real run."
    )


def export_audio_head(saved_model: Path, out_path: Path, quant: str) -> None:  # pragma: no cover - stub
    """STUB: Keras -> TFLite for the meow-context head.

    Raises:
        NotImplementedError: always, in Phase 0.
    """
    raise NotImplementedError(
        "Phase 0: nothing to export — no trained audio head exists."
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Export a trained model to TFLite (Phase 0 stub)."
    )
    parser.add_argument("--lane", choices=["vision", "audio", "detector"], required=True)
    parser.add_argument("--checkpoint", type=Path, required=True)
    parser.add_argument(
        "--quant", choices=["dynamic", "int8", "float16"], default="int8"
    )
    parser.add_argument(
        "--models-dir",
        type=Path,
        default=Path(__file__).resolve().parents[2] / "models",
        help="Destination dir whose total .tflite size is budget-checked.",
    )
    args = parser.parse_args()

    if args.lane == "vision":
        export_vision(args.checkpoint, args.models_dir, args.quant)
    elif args.lane == "audio":
        export_audio_head(args.checkpoint, args.models_dir, args.quant)
    else:
        raise NotImplementedError(
            "Phase 0: detector export goes through Ultralytics' exporter; "
            "wire the budget check here in Phase 1."
        )


if __name__ == "__main__":
    main()
