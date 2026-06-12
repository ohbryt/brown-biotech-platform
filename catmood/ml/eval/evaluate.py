"""Evaluation harness: confusion matrix + per-class precision/recall —
Phase 0 SKELETON.

STATUS: stub for everything that needs a model or data. The metric helpers
delegate to scikit-learn and are thin; the honest-by-construction part is
the run manifest: every metrics artifact is stamped with a run id so docs
can cite **[ours — from run <id>]** (ml/AGENTS.md honesty rules). Numbers
not traceable to a run id do not exist.

Planned outputs per run (Phase 1), written to runs/<run_id>/eval/:
    - confusion_matrix.csv (+ .png via matplotlib)
    - per_class_metrics.json (precision/recall/F1/support per class)
    - calibration report from eval/calibration.py (ECE, reliability diagram)
    - manifest.json (run id, git commit, dataset datasheet hashes, split seed)
CI compares per_class_metrics.json + ECE against eval/thresholds.yaml and
fails the build on regression (thresholds TBD — human decision #7).
"""
from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np


def per_class_metrics(
    y_true: np.ndarray, y_pred: np.ndarray, class_names: list[str]
) -> dict:
    """Per-class precision/recall/F1 + confusion matrix. IMPLEMENTED (thin
    scikit-learn wrapper); only meaningful once real predictions exist.

    Args:
        y_true: int class indices, shape (N,).
        y_pred: int class indices, shape (N,).
        class_names: index-aligned class names.

    Returns:
        {"confusion_matrix": list[list[int]], "per_class": {name: {...}}}
    """
    from sklearn.metrics import confusion_matrix, precision_recall_fscore_support

    labels = list(range(len(class_names)))
    cm = confusion_matrix(y_true, y_pred, labels=labels)
    precision, recall, f1, support = precision_recall_fscore_support(
        y_true, y_pred, labels=labels, zero_division=0
    )
    return {
        "confusion_matrix": cm.tolist(),
        "per_class": {
            name: {
                "precision": float(precision[i]),
                "recall": float(recall[i]),
                "f1": float(f1[i]),
                "support": int(support[i]),
            }
            for i, name in enumerate(class_names)
        },
    }


def run_eval(checkpoint: Path, data_root: Path, out_dir: Path) -> None:  # pragma: no cover - stub
    """STUB: run a trained model over the identity-held-out test split.

    Raises:
        NotImplementedError: always, in Phase 0 — no model, no data.
    """
    raise NotImplementedError(
        "Phase 0: nothing to evaluate — no trained model or dataset exists. "
        "Implement inference over the test split + artifact writing here "
        "(see module docstring for required outputs)."
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Evaluate a trained CatMood model (Phase 0 stub)."
    )
    parser.add_argument("--checkpoint", type=Path, required=True)
    parser.add_argument("--data-root", type=Path, required=True)
    parser.add_argument("--out-dir", type=Path, default=Path("runs/eval"))
    args = parser.parse_args()
    run_eval(args.checkpoint, args.data_root, args.out_dir)


if __name__ == "__main__":
    main()
