"""Grad-CAM interpretability for the vision classifier — Phase 0 SKELETON.

STATUS: stub. No trained model exists, so there is nothing to explain yet.

Why this exists: the app explains predictions via facial cues, and review
requires evidence that the classifier attends to face regions consistent
with the Feline Grimace Scale (ears, orbital region, muzzle, whiskers, head
position) rather than background shortcuts. Grad-CAM maps are a Phase 1+
review artifact attached to each training run — they are NOT shipped in the
app and are NOT a substitute for the calibration report.

Planned implementation (Phase 1):
    1. hook the last conv block of the backbone (mobilenetv3 / efficientnet-lite)
    2. forward an image, backprop the target class logit
    3. weight activations by pooled gradients, ReLU, upsample to input size
    4. overlay heatmap on the (face-cropped) input; save a grid per class
       to runs/<run_id>/gradcam/
Consider the `pytorch-grad-cam` package vs ~40 lines of manual hooks; the
human running training decides (avoids an extra pinned dependency).
"""
from __future__ import annotations

from pathlib import Path


def generate_gradcam_grid(
    checkpoint: Path,
    images_dir: Path,
    out_dir: Path,
    target_layer: str | None = None,
) -> None:  # pragma: no cover - stub
    """STUB: render a per-class Grad-CAM grid for a trained checkpoint.

    Args:
        checkpoint: trained .pt checkpoint from vision/train.py.
        images_dir: sample face-cropped images, a few per class.
        out_dir: where PNG grids are written.
        target_layer: backbone layer name; default = last conv block.

    Raises:
        NotImplementedError: always, in Phase 0 — no trained model exists.
    """
    raise NotImplementedError(
        "Phase 0: Grad-CAM needs a trained checkpoint; none exists. "
        "Implement after the first real training run (see module docstring)."
    )


if __name__ == "__main__":
    raise SystemExit(
        "Phase 0 stub — no trained model to explain. See module docstring."
    )
