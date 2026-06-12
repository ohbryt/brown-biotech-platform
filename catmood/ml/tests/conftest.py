"""Pytest path setup: make the ml/ root importable so tests can do
``from audio.features import ...`` without packaging the repo."""
from __future__ import annotations

import sys
from pathlib import Path

ML_ROOT = Path(__file__).resolve().parents[1]
if str(ML_ROOT) not in sys.path:
    sys.path.insert(0, str(ML_ROOT))
