"""Log-mel spectrogram extraction for the audio lane.

STATUS: IMPLEMENTED and unit-tested (ml/tests/test_features.py). This is one
of the two pieces of real code in the Phase 0 scaffold; everything else in
audio/ is a skeleton.

Parameters default to audio/config.yaml's ``features`` block: 16 kHz, 64
mel bins, 25 ms window (n_fft=400), 10 ms hop (hop_length=160).
"""
from __future__ import annotations

from dataclasses import dataclass

import librosa
import numpy as np


@dataclass(frozen=True)
class LogMelConfig:
    """Feature parameters; mirrors audio/config.yaml -> features."""

    sample_rate: int = 16_000
    n_mels: int = 64
    n_fft: int = 400
    hop_length: int = 160
    fmin: float = 50.0
    fmax: float = 8_000.0
    log_offset: float = 1e-6


def expected_num_frames(num_samples: int, cfg: LogMelConfig = LogMelConfig()) -> int:
    """Number of STFT frames librosa produces with center=True padding."""
    return 1 + num_samples // cfg.hop_length


def log_mel_spectrogram(
    waveform: np.ndarray,
    cfg: LogMelConfig = LogMelConfig(),
) -> np.ndarray:
    """Compute a log-mel spectrogram. IMPLEMENTED.

    Args:
        waveform: 1-D float array of audio samples, already at
            ``cfg.sample_rate``. Resampling is the caller's job (the
            recording pipeline / dataset loader resamples once on ingest).
        cfg: feature parameters; defaults match audio/config.yaml.

    Returns:
        Array of shape ``(n_mels, n_frames)`` with natural-log power values,
        where ``n_frames == expected_num_frames(len(waveform), cfg)``.

    Raises:
        ValueError: if the input is not a non-empty 1-D array.
    """
    waveform = np.asarray(waveform, dtype=np.float32)
    if waveform.ndim != 1:
        raise ValueError(f"expected mono 1-D waveform, got shape {waveform.shape}")
    if waveform.size == 0:
        raise ValueError("expected non-empty waveform")

    mel = librosa.feature.melspectrogram(
        y=waveform,
        sr=cfg.sample_rate,
        n_fft=cfg.n_fft,
        hop_length=cfg.hop_length,
        n_mels=cfg.n_mels,
        fmin=cfg.fmin,
        fmax=cfg.fmax,
        power=2.0,
        center=True,
    )
    return np.log(mel + cfg.log_offset)
