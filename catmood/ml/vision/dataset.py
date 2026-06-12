"""Vision dataset loader — Phase 0 SKELETON (no data exists yet).

STATUS: stub. Everything that touches real files raises NotImplementedError.
The only working pieces are the layout documentation below and the pure
split-by-cat-identity helper, which is deterministic and testable but is a
STUB in the sense that no real cat IDs exist yet.

Expected on-disk layout (created by a HUMAN in Phase 1, never committed):

    data/vision/
      DATASHEET.md            # REQUIRED: source, license, download date,
                              # labeling protocol, inter-rater agreement.
                              # Training must refuse to run without it.
      images/
        <cat_id>/             # one directory per individual cat
          <image_id>.jpg
      labels.csv              # columns: image_path, cat_id, label
                              # label in taxonomy v1 (see vision/config.yaml)

Splits are by CAT IDENTITY (AGENTS.md rule 7): all images of one cat go to
exactly one of train/val/calibration/test. Per-image random splits leak
identity and inflate metrics — never do that.
"""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

VALID_LABELS: tuple[str, ...] = (
    "relaxed_content",
    "alert_aroused",
    "fearful_anxious",
    "irritated_aggressive",
    "pain_discomfort",
)

SPLITS: tuple[str, ...] = ("train", "val", "calibration", "test")


def assign_split_by_cat_id(
    cat_id: str,
    fractions: dict[str, float],
    seed: int = 17,
) -> str:
    """Deterministically assign a cat identity to a split.

    IMPLEMENTED (pure function), but a stub in spirit: real cat IDs and the
    final fraction allocation are a human decision (README decision #3).

    Hashes ``cat_id`` with ``seed`` so the assignment is stable across runs
    and machines, then maps the hash into [0, 1) against cumulative fractions.

    Args:
        cat_id: stable identifier of an individual cat (directory name).
        fractions: mapping of split name -> fraction; must sum to ~1.0 and
            use keys from ``SPLITS``.
        seed: changes the hash salt, i.e. the whole assignment.

    Returns:
        One of ``SPLITS``.
    """
    if abs(sum(fractions.values()) - 1.0) > 1e-6:
        raise ValueError(f"split fractions must sum to 1.0, got {fractions}")
    unknown = set(fractions) - set(SPLITS)
    if unknown:
        raise ValueError(f"unknown split names: {unknown}")

    digest = hashlib.sha256(f"{seed}:{cat_id}".encode()).hexdigest()
    u = int(digest[:12], 16) / float(16**12)  # uniform in [0, 1)
    cumulative = 0.0
    for name in SPLITS:
        cumulative += fractions.get(name, 0.0)
        if u < cumulative:
            return name
    return SPLITS[-1]  # float-rounding fallback


def check_datasheet(data_root: Path) -> None:
    """Refuse to proceed without a datasheet (AGENTS.md rule 5). IMPLEMENTED."""
    datasheet = data_root / "DATASHEET.md"
    if not datasheet.is_file():
        raise FileNotFoundError(
            f"{datasheet} not found. A human must write a datasheet (source, "
            "license verification, labeling protocol) before any data is used. "
            "See ml/README.md, human decision #1/#2."
        )


def load_labels(data_root: Path) -> "list[tuple[str, str, str]]":
    """STUB: parse labels.csv into (image_path, cat_id, label) rows.

    Raises:
        NotImplementedError: always, in Phase 0 — no data or labeling
            protocol exists yet.
    """
    check_datasheet(data_root)
    raise NotImplementedError(
        "Phase 0: no vision dataset exists. A human must source and label "
        "data first (ml/README.md, decisions #1-#3), then implement CSV "
        "parsing + label validation against VALID_LABELS here."
    )


class CatEmotionDataset:  # pragma: no cover - stub
    """STUB: torch Dataset over the documented layout.

    Phase 1 TODO:
      - subclass torch.utils.data.Dataset (import torch lazily here so the
        split helper stays importable without torch installed)
      - take (data_root, split, fractions, image_size, transforms)
      - filter rows via assign_split_by_cat_id
      - decode + face-crop images (crop comes from vision/detector/)
      - return (tensor[C,H,W], class_index)
    """

    def __init__(self, data_root: str | Path, split: str) -> None:
        raise NotImplementedError(
            "Phase 0: dataset loading requires real data; see module docstring."
        )


def main() -> None:
    """CLI stub: `--make-splits` will write a split manifest in Phase 1."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-root", type=Path, default=Path("data/vision"))
    parser.add_argument("--make-splits", action="store_true")
    args = parser.parse_args()
    if args.make_splits:
        raise NotImplementedError(
            "Phase 0: cannot make splits without data + cat identity metadata "
            "(ml/README.md, human decision #3)."
        )
    parser.print_help()


if __name__ == "__main__":
    main()
