"""Confidence calibration: ECE and reliability diagrams.

STATUS: IMPLEMENTED and unit-tested (ml/tests/test_calibration.py). These
are pure functions over (confidences, correctness) arrays — no model or
dataset needed, which is why they can honestly exist in Phase 0.

Why this matters (ml/AGENTS.md rule 3): the app shows confidence to users.
Raw softmax is not calibrated confidence; after temperature scaling on the
calibration split, ECE computed here must pass eval/thresholds.yaml or the
model is a release blocker. Every shipped model's calibration report comes
from these functions.

Conventions:
    confidences: float array in [0, 1], the model's top-class probability.
    correct:     bool/0-1 array, whether the top-class prediction was right.
ECE here is the standard equal-width-binned Expected Calibration Error
(Guo et al., 2017): sum over bins of (bin_count/N) * |accuracy - confidence|.
"""
from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class ReliabilityBins:
    """Per-bin reliability statistics (inputs to a reliability diagram)."""

    bin_edges: np.ndarray      # shape (n_bins + 1,)
    bin_confidence: np.ndarray  # mean confidence per bin; NaN if empty
    bin_accuracy: np.ndarray    # mean correctness per bin; NaN if empty
    bin_count: np.ndarray       # samples per bin


def _validate(confidences: np.ndarray, correct: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    confidences = np.asarray(confidences, dtype=np.float64).ravel()
    correct = np.asarray(correct, dtype=np.float64).ravel()
    if confidences.shape != correct.shape:
        raise ValueError(
            f"shape mismatch: confidences {confidences.shape} vs correct {correct.shape}"
        )
    if confidences.size == 0:
        raise ValueError("empty input")
    if np.any((confidences < 0.0) | (confidences > 1.0)):
        raise ValueError("confidences must lie in [0, 1]")
    if np.any((correct != 0.0) & (correct != 1.0)):
        raise ValueError("correct must be boolean / 0-1 valued")
    return confidences, correct


def reliability_bins(
    confidences: np.ndarray,
    correct: np.ndarray,
    n_bins: int = 15,
) -> ReliabilityBins:
    """Bin predictions by confidence for a reliability diagram. IMPLEMENTED.

    Uses equal-width bins over [0, 1]; the right edge of the last bin is
    inclusive. Empty bins get NaN confidence/accuracy and count 0.
    """
    if n_bins < 1:
        raise ValueError("n_bins must be >= 1")
    confidences, correct = _validate(confidences, correct)

    edges = np.linspace(0.0, 1.0, n_bins + 1)
    # bin index in [0, n_bins-1]; values == 1.0 fall into the last bin
    idx = np.minimum((confidences * n_bins).astype(int), n_bins - 1)

    bin_conf = np.full(n_bins, np.nan)
    bin_acc = np.full(n_bins, np.nan)
    bin_count = np.zeros(n_bins, dtype=int)
    for b in range(n_bins):
        mask = idx == b
        bin_count[b] = int(mask.sum())
        if bin_count[b] > 0:
            bin_conf[b] = float(confidences[mask].mean())
            bin_acc[b] = float(correct[mask].mean())
    return ReliabilityBins(edges, bin_conf, bin_acc, bin_count)


def expected_calibration_error(
    confidences: np.ndarray,
    correct: np.ndarray,
    n_bins: int = 15,
) -> float:
    """Equal-width-binned ECE (Guo et al., 2017). IMPLEMENTED.

    Returns:
        ECE in [0, 1]; 0.0 means perfectly calibrated under this binning.
    """
    bins = reliability_bins(confidences, correct, n_bins)
    n = int(bins.bin_count.sum())
    ece = 0.0
    for b in range(len(bins.bin_count)):
        if bins.bin_count[b] > 0:
            ece += (bins.bin_count[b] / n) * abs(
                bins.bin_accuracy[b] - bins.bin_confidence[b]
            )
    return float(ece)


def plot_reliability_diagram(
    bins: ReliabilityBins,
    out_path: "str | None" = None,
    title: str = "Reliability diagram",
):
    """Render a reliability diagram with matplotlib. IMPLEMENTED (thin).

    Pure plotting over precomputed bins; imports matplotlib lazily so the
    metric functions stay dependency-light for tests.

    Returns:
        The matplotlib Figure (also saved to ``out_path`` if given).
    """
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    centers = (bins.bin_edges[:-1] + bins.bin_edges[1:]) / 2
    width = bins.bin_edges[1] - bins.bin_edges[0]

    fig, ax = plt.subplots(figsize=(5, 5))
    ax.plot([0, 1], [0, 1], "k--", linewidth=1, label="perfect calibration")
    ax.bar(
        centers,
        np.nan_to_num(bins.bin_accuracy),
        width=width * 0.95,
        edgecolor="black",
        alpha=0.7,
        label="accuracy",
    )
    ax.set_xlabel("confidence")
    ax.set_ylabel("accuracy")
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_title(title)
    ax.legend(loc="upper left")
    if out_path is not None:
        fig.savefig(out_path, dpi=150, bbox_inches="tight")
    return fig


def fit_temperature(logits: np.ndarray, labels: np.ndarray) -> float:  # pragma: no cover - stub
    """STUB: fit a temperature-scaling parameter on the calibration split.

    Phase 1 TODO: minimize NLL of softmax(logits / T) over T > 0 (scipy
    scalar minimize or a few Newton steps). Needs real logits from a real
    model — anything else would be theater.

    Raises:
        NotImplementedError: always, in Phase 0.
    """
    raise NotImplementedError(
        "Phase 0: temperature scaling needs real model logits on a real "
        "calibration split; implement with the first training run."
    )
