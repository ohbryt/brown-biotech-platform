"""Model metadata JSON sidecars — Phase 0: SCHEMA ONLY.

STATUS: the schema definition and the writer/validator are implemented (pure
functions); no sidecar can honestly be produced yet because no model exists.
Every shipped ``<name>.tflite`` in catmood/models/ MUST have a matching
``<name>.json`` produced here (ml/AGENTS.md rule 2). The sidecar is the
machine-readable model card; the app and CI both read it.

Honesty contract: every field under ``eval`` must come from a real run of
eval/evaluate.py + eval/calibration.py. Writing a sidecar with invented
numbers violates rule 1 and blocks release.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

SCHEMA_VERSION = "0.1.0"

# Schema (informal JSON-Schema style). Phase 0 defines the contract;
# values are filled by real runs in later phases.
SIDECAR_SCHEMA: dict[str, Any] = {
    "schema_version": "str — version of this sidecar schema",
    "model_name": "str — e.g. vision_emotion_v1 (matches the .tflite stem)",
    "lane": "str — vision | audio | detector",
    "taxonomy_version": "str — must be 'v1' (frozen, AGENTS.md rule 6)",
    "classes": "list[str] — trained output classes, index-aligned to logits",
    "reject_decision": {
        "enabled": "bool — audio: true ('uncertain' via threshold)",
        "confidence_threshold": "float|null — calibrated max-prob cutoff",
    },
    "input": "dict — shape, dtype, preprocessing (resize/normalize or mel params)",
    "training_data": {
        "datasets": "list[dict] — name, source URL, license, datasheet path",
        "num_examples": "int — per split",
        "num_identities": "int — distinct cats (splits are identity-level)",
        "split_seed": "int",
        "limitations": "str — honest free text (e.g. '21 cats, 2 breeds')",
    },
    "training_run": "dict — run id, date, git commit, config hash",
    "eval": {
        "run_id": "str — eval harness run that produced these numbers",
        "per_class": "dict — precision/recall/F1 per class [ours — from run]",
        "confusion_matrix": "list[list[int]]",
        "ece": "float — expected calibration error AFTER temperature scaling",
        "temperature": "float — fitted temperature-scaling parameter",
        "thresholds_file": "str — eval/thresholds.yaml version checked against",
    },
    "export": {
        "quantization": "str — dynamic | int8 | float16",
        "size_bytes": "int",
        "converter": "str — tool + pinned version used",
    },
}

REQUIRED_TOP_LEVEL_KEYS: tuple[str, ...] = tuple(SIDECAR_SCHEMA.keys())


def validate_sidecar(sidecar: dict[str, Any]) -> list[str]:
    """Return a list of problems (empty == valid). IMPLEMENTED (shallow).

    Phase 0 checks presence of required top-level keys and taxonomy pin;
    deep per-field validation lands with the first real export.
    """
    problems = [
        f"missing required key: {key}"
        for key in REQUIRED_TOP_LEVEL_KEYS
        if key not in sidecar
    ]
    if sidecar.get("taxonomy_version") not in (None, "v1"):
        problems.append(
            f"taxonomy_version must be 'v1' (frozen), got {sidecar['taxonomy_version']!r}"
        )
    return problems


def write_sidecar(sidecar: dict[str, Any], out_path: Path) -> None:
    """Validate and write a sidecar JSON next to its .tflite. IMPLEMENTED.

    Raises:
        ValueError: if validation fails (never write an invalid/partial card).
    """
    problems = validate_sidecar(sidecar)
    if problems:
        raise ValueError("invalid sidecar: " + "; ".join(problems))
    out_path.write_text(json.dumps(sidecar, indent=2, sort_keys=True) + "\n")


def build_sidecar_from_run(run_dir: Path) -> dict[str, Any]:  # pragma: no cover - stub
    """STUB: assemble a sidecar from a real training+eval run directory.

    Raises:
        NotImplementedError: always, in Phase 0 — no runs exist, and a
            sidecar without real eval numbers would violate rule 1.
    """
    raise NotImplementedError(
        "Phase 0: no training/eval runs exist to build a sidecar from. "
        "Implement after the first real run; fields per SIDECAR_SCHEMA."
    )


if __name__ == "__main__":
    print(json.dumps({"schema_version": SCHEMA_VERSION, "schema": SIDECAR_SCHEMA}, indent=2))
