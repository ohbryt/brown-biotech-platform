"""Tests for audio/features.py (one of the two implemented Phase 0 modules).

Uses synthetic sine waves only — no datasets exist in Phase 0, and none may
be fabricated (ml/AGENTS.md rule 1).
"""
from __future__ import annotations

import numpy as np
import pytest

from audio.features import LogMelConfig, expected_num_frames, log_mel_spectrogram


def sine(freq_hz: float, duration_s: float, sr: int = 16_000) -> np.ndarray:
    t = np.arange(int(duration_s * sr)) / sr
    return np.sin(2 * np.pi * freq_hz * t).astype(np.float32)


def test_log_mel_shape_on_one_second_sine() -> None:
    cfg = LogMelConfig()
    wave = sine(440.0, 1.0, cfg.sample_rate)  # 16000 samples
    mel = log_mel_spectrogram(wave, cfg)
    assert mel.shape == (cfg.n_mels, expected_num_frames(len(wave), cfg))
    assert mel.shape == (64, 101)  # 1 + 16000 // 160
    assert np.all(np.isfinite(mel))


@pytest.mark.parametrize("duration_s", [0.25, 0.5, 2.0])
def test_frame_count_matches_helper_across_durations(duration_s: float) -> None:
    cfg = LogMelConfig()
    wave = sine(700.0, duration_s, cfg.sample_rate)
    mel = log_mel_spectrogram(wave, cfg)
    assert mel.shape == (cfg.n_mels, expected_num_frames(len(wave), cfg))


def test_energy_concentrates_near_tone_frequency() -> None:
    """A 1 kHz tone should put its peak energy in a mel bin centered well
    above a 100 Hz tone's peak bin — sanity check on the mel mapping."""
    cfg = LogMelConfig()
    low = log_mel_spectrogram(sine(100.0, 1.0, cfg.sample_rate), cfg).mean(axis=1)
    high = log_mel_spectrogram(sine(1000.0, 1.0, cfg.sample_rate), cfg).mean(axis=1)
    assert int(np.argmax(high)) > int(np.argmax(low))


def test_silence_gives_log_offset_floor() -> None:
    cfg = LogMelConfig()
    mel = log_mel_spectrogram(np.zeros(cfg.sample_rate, dtype=np.float32), cfg)
    assert np.allclose(mel, np.log(cfg.log_offset))


def test_rejects_bad_input() -> None:
    with pytest.raises(ValueError):
        log_mel_spectrogram(np.zeros((2, 100), dtype=np.float32))  # stereo
    with pytest.raises(ValueError):
        log_mel_spectrogram(np.array([], dtype=np.float32))  # empty
