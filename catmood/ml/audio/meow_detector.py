"""Meow event segmentation (energy/VAD-based) — Phase 0 SKELETON.

STATUS: stub. The interface and the algorithm sketch are real; the
implementation is deferred until real recordings exist to tune thresholds
against (silence floors, typical meow durations, hysteresis values are
meaningless without data).

Why a simple energy/VAD approach first: meows are loud, harmonic events of
roughly 0.3-2.0 s; a frame-energy gate with hysteresis plus duration
filtering is a strong, fully on-device-portable baseline. Speech-tuned VADs
(e.g. WebRTC VAD) are NOT trained on cat vocalisations — if one is used as a
pre-gate, validate against labeled meow onsets first (Phase 1, human-checked).

Planned algorithm (Phase 1):
    1. log-mel frames via audio/features.py (10 ms hop)
    2. per-frame energy = mean over mel bins (band-limited to ~fmin-4 kHz
       where meow energy concentrates)
    3. adaptive noise floor (rolling median); onset when energy > floor +
       enter_db, offset when < floor + exit_db (enter_db > exit_db hysteresis)
    4. merge gaps < min_gap_s; drop events outside [min_dur_s, max_dur_s]
    5. return sample-domain (start, end) spans for embedding extraction
"""
from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class MeowEvent:
    """A detected meow span, in samples at the feature sample rate."""

    start_sample: int
    end_sample: int

    @property
    def num_samples(self) -> int:
        return self.end_sample - self.start_sample


@dataclass(frozen=True)
class DetectorConfig:
    """Segmentation parameters. PLACEHOLDER values — tune on real data."""

    enter_db: float = 12.0      # dB above noise floor to open an event
    exit_db: float = 6.0        # dB above noise floor to close an event
    min_dur_s: float = 0.2      # drop shorter events
    max_dur_s: float = 3.0      # drop longer events (likely not a single meow)
    min_gap_s: float = 0.15     # merge events separated by less than this


def detect_meow_events(
    waveform: np.ndarray,
    sample_rate: int = 16_000,
    cfg: DetectorConfig = DetectorConfig(),
) -> list[MeowEvent]:
    """STUB: segment a waveform into candidate meow events.

    Raises:
        NotImplementedError: always, in Phase 0 — thresholds cannot be set
            honestly without real recordings (ml/AGENTS.md rule 8).
    """
    raise NotImplementedError(
        "Phase 0: meow segmentation is a skeleton. Implement the energy/"
        "hysteresis algorithm in the module docstring once real recordings "
        "exist to tune DetectorConfig against."
    )
