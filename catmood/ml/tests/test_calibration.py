"""Tests for eval/calibration.py (the other implemented Phase 0 module).

Toy arrays only — these are pure-function tests, not model results.
"""
from __future__ import annotations

import numpy as np
import pytest

from eval.calibration import (
    expected_calibration_error,
    fit_temperature,
    reliability_bins,
)


def test_ece_zero_for_perfectly_calibrated_bins() -> None:
    """Within each bin, accuracy == mean confidence -> ECE == 0."""
    # 0.5-confidence bin: half correct; 1.0-confidence bin: all correct.
    confidences = np.array([0.5, 0.5, 0.5, 0.5, 1.0, 1.0])
    correct = np.array([1, 0, 1, 0, 1, 1])
    assert expected_calibration_error(confidences, correct, n_bins=10) == pytest.approx(0.0)


def test_ece_maximal_for_confidently_wrong() -> None:
    """Confidence 1.0, always wrong -> ECE == 1.0."""
    confidences = np.ones(8)
    correct = np.zeros(8)
    assert expected_calibration_error(confidences, correct, n_bins=15) == pytest.approx(1.0)


def test_ece_known_value_two_bins() -> None:
    """Hand-computed: one bin, conf .8 .8 .8 .8, accuracy 0.5 -> ECE 0.3."""
    confidences = np.array([0.8, 0.8, 0.8, 0.8])
    correct = np.array([1, 0, 1, 0])
    ece = expected_calibration_error(confidences, correct, n_bins=10)
    assert ece == pytest.approx(0.3)


def test_reliability_bins_counts_and_edges() -> None:
    confidences = np.array([0.05, 0.55, 0.95, 1.0])
    correct = np.array([0, 1, 1, 1])
    bins = reliability_bins(confidences, correct, n_bins=10)
    assert bins.bin_edges.shape == (11,)
    assert int(bins.bin_count.sum()) == 4
    assert bins.bin_count[0] == 1          # 0.05
    assert bins.bin_count[5] == 1          # 0.55
    assert bins.bin_count[9] == 2          # 0.95 and 1.0 (right-inclusive)
    assert bins.bin_accuracy[9] == pytest.approx(1.0)
    assert np.isnan(bins.bin_confidence[3])  # empty bin


def test_validation_errors() -> None:
    with pytest.raises(ValueError):
        expected_calibration_error(np.array([1.2]), np.array([1]))  # conf > 1
    with pytest.raises(ValueError):
        expected_calibration_error(np.array([0.5]), np.array([2]))  # non-binary
    with pytest.raises(ValueError):
        expected_calibration_error(np.array([]), np.array([]))  # empty
    with pytest.raises(ValueError):
        reliability_bins(np.array([0.5]), np.array([1]), n_bins=0)


def test_temperature_fitting_is_phase0_stub() -> None:
    """Honesty guard: temperature scaling must NOT pretend to work yet."""
    with pytest.raises(NotImplementedError):
        fit_temperature(np.zeros((4, 3)), np.zeros(4, dtype=int))
