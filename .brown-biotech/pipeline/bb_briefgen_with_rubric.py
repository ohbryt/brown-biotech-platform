#!/usr/bin/env python3
"""
bb_briefgen_with_rubric.py — Brown Biotech briefgen wrapper with BB-rubric scoring.

Imports the active briefgen-agentic.py (the one cron 9b16a4176a10 uses) and
extends Stage 4 (Reviewer) with multi-LLM ensemble rubric scoring using
bb-rubric-scorer.py.

The active briefgen-agentic.py is untouched. This wrapper:
  1. Runs stages 1-3 of the active pipeline
  2. After stage 3 produces a brief, scores it with the multi-LLM judge ensemble
  3. Appends a "Rubric Score" section to the brief markdown
  4. Saves the enhanced brief to the same output path

Usage (from cron 9b16a4176a10 or directly):
  python3 bb_briefgen_with_rubric.py "SLC7A11 lung cancer immunotherapy"
  TRIPLE_MODE=SYNTHESIZE python3 bb_briefgen_with_rubric.py "aspirin ADMET profile"
"""
import os
import sys
import importlib.util
from pathlib import Path
from datetime import datetime

# ── Paths ────────────────────────────────────────────────────────────────
ACTIVE_BRIEFGEN = Path("/Users/ocm/.hermes/scripts/briefgen-agentic.py")
BB_PIPELINE_DIR = Path("/Users/ocm/openclaw/workspace/brown-biotech-platform/.brown-biotech")
RUBRIC_PATH = BB_PIPELINE_DIR / "templates" / "bb-rubric-v1.yaml"
SCORER_PATH = BB_PIPELINE_DIR / "snippets" / "bb-rubric-scorer.py"

# ── Load active briefgen-agentic.py as a module ─────────────────────────
def _load_briefgen_module():
    spec = importlib.util.spec_from_file_location("briefgen_agentic", str(ACTIVE_BRIEFGEN))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

# ── Load bb-rubric-scorer ────────────────────────────────────────────────
def _load_scorer_module():
    spec = importlib.util.spec_from_file_location("bb_rubric_scorer", str(SCORER_PATH))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

# ── Score-and-append wrapper for stage4 ─────────────────────────────────
def stage4_with_rubric(brief_markdown: str, task: str, scorer) -> tuple[str, dict]:
    """Score brief with BB-rubric, return (enhanced_brief, score_dict)."""
    print(f"[BB-RUBRIC] Scoring brief ({len(brief_markdown)} chars) for: {task[:60]}", file=sys.stderr)
    try:
        score = scorer.score_brief(brief=brief_markdown, task=task)
    except Exception as e:
        print(f"[BB-RUBRIC] Scoring failed: {e!r}", file=sys.stderr)
        return brief_markdown, {"error": repr(e), "consolidated_score": None, "verdict": "scoring_failed"}

    # Build Rubric Score footer
    lines = [
        "",
        "---",
        "",
        "## Rubric Score (BB-rubric v1)",
        "",
        f"**Consolidated score**: {score.get('consolidated_score', '?')}/45 — verdict: **{score.get('verdict', '?')}**",
        "",
        f"**Judge variance flag**: {score.get('variance_flag', '?')}",
        "",
        "**Multi-LLM judges**: Gemini 2.5 Pro, Claude 3.7 Sonnet, GPT-4.1, Gemini 2.0 Flash",
        "",
        "**Per-criterion (mean, 1-5)**:",
        "",
    ]
    for crit, val in (score.get("per_criterion") or {}).items():
        lines.append(f"- `{crit}`: {val if val is not None else 'n/a'}")
    lines.extend([
        "",
        "*Source: BB-rubric-v1 adapted from Yeoh et al. 2026 (bioRxiv 2026.06.03.730004). "
        "9 domain + 9 coding + 3 BB-specific criteria. Weighted consolidated score.*",
        "",
    ])
    enhanced = brief_markdown + "\n".join(lines)
    return enhanced, score

# ── Main ────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        topic = input("📝 Enter brief topic: ").strip()
        if not topic:
            print("No topic provided. Exiting.", file=sys.stderr)
            sys.exit(1)
    else:
        topic = " ".join(sys.argv[1:])

    print(f"\n🎯 BB Brief Pipeline (with rubric): {topic}", file=sys.stderr)

    # Load the active briefgen module
    bg = _load_briefgen_module()

    # Run stages 1-3
    mode = os.environ.get("TRIPLE_MODE", "SYNTHESIZE").upper()
    if mode == "PLAN":
        scope = bg.stage1_planner(topic)
        print("[PLAN] Scope complete.", file=sys.stderr)
        return 0
    elif mode == "RESEARCHER":
        scope = bg.stage1_planner(topic)
        result = bg.stage2_researcher(scope)
        print(f"[RESEARCHER] Found {len(result['papers'])} papers.", file=sys.stderr)
        return 0

    # Full pipeline
    scope = bg.stage1_planner(topic)
    research = bg.stage2_researcher(scope)
    brief = bg.stage3_synthesizer(research)

    # Original Stage 4 (keyword gate) — keep for backward compat
    review = bg.stage4_reviewer(brief)

    # NEW: BB-rubric scoring + append to brief
    scorer = _load_scorer_module()
    enhanced_brief, score = stage4_with_rubric(brief, topic, scorer)

    # Save enhanced brief
    bg.os.makedirs(bg.OUTPUT_DIR, exist_ok=True)
    date_str = datetime.now().strftime("%Y-%m-%d")
    safe_topic = bg.slugify(topic)
    output_path = os.path.join(bg.OUTPUT_DIR, f"{date_str}_{safe_topic}.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(enhanced_brief)

    # Console summary
    print(f"\n✅ Brief written to: {output_path}", file=sys.stderr)
    print(f"📋 Original review: {review['verdict']}", file=sys.stderr)
    if review['issues']:
        print(f"   Issues: {', '.join(review['issues'])}", file=sys.stderr)
    if 'consolidated_score' in score and score['consolidated_score'] is not None:
        print(f"📊 BB-rubric score: {score['consolidated_score']}/45 ({score['verdict']})", file=sys.stderr)
        print(f"   Variance flag: {score.get('variance_flag', '?')}", file=sys.stderr)
    return 0

if __name__ == "__main__":
    sys.exit(main())
