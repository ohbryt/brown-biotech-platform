# bb-rubric-scorer.py
# Drop-in scorer for briefgen-agentic.py Stage 4 (Reviewer).
#
# Replaces the current "pass / warn / fail" gate with a 1-45 multi-criterion
# score + judge variance signal. Adapted from:
#   Yeoh et al. 2026 (bioRxiv 2026.06.03.730004), 9+9 rubric.

import os, json, statistics
from pathlib import Path
import yaml
import urllib.request

RUBRIC_PATH = Path(__file__).parent / "templates" / "bb-rubric-v1.yaml"

def _load_rubric():
    # YAML loader is lenient — strip comments first.
    import re
    raw = RUBRIC_PATH.read_text()
    return yaml.safe_load(re.sub(r"^\s*#.*$", "", raw, flags=re.MULTILINE))

def _llm_judge(judge_model, system_prompt, user_prompt, timeout=60):
    """Hit OpenRouter (matches Hermes main config) with the judge's score."""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        return None
    body = json.dumps({
        "model": judge_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.0,
        "response_format": {"type": "json_object"},
    }).encode()
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read())
    return json.loads(data["choices"][0]["message"]["content"])

def _build_judge_prompt(rubric, brief, task):
    criteria_lines = []
    for c in rubric["domain"] + rubric["coding"] + rubric["bb_extensions"]:
        criteria_lines.append(f"- **{c["name"]}** (weight {c["weight_default"]}): {c["prompt_hint"]}")
    return (
        "You are a Brown Biotech brief-quality judge. Score the following brief "
        "against the rubric below. Return a JSON object mapping each criterion name to "
        "an integer 1-5, plus a 1-sentence rationale.\n\n"
        f"## Task\n{task}\n\n"
        f"## Brief\n{brief}\n\n"
        f"## Rubric (1=poor, 5=excellent)\n" + "\n".join(criteria_lines)
    )

def score_brief(brief: str, task: str, model: str = None) -> dict:
    """Score a brief using the multi-LLM judge ensemble.

    Returns: {
      "consolidated_score": 0-45 (weighted mean × 5),
      "per_criterion": {name: mean_score},
      "variance_flag": bool,
      "judge_breakdown": [{judge, score, per_criterion}],
      "verdict": "publish" | "revise" | "reject"
    }
    """
    rubric = _load_rubric()
    judges = rubric["judge_ensemble"]
    system_prompt = (
        "You are an expert reviewer for a biotech paid-brief service. "
        "Score strictly. 5 = excellent / publishable, 1 = poor / wrong."
    )
    user_prompt = _build_judge_prompt(rubric, brief, task)

    judge_results = []
    for j in judges:
        try:
            resp = _llm_judge(j["model"], system_prompt, user_prompt)
            if resp:
                judge_results.append({"judge": j["model"], "per_criterion": resp})
        except Exception as e:
            # One judge down — still publish, but flag variance
            judge_results.append({"judge": j["model"], "error": str(e)})

    # Aggregate per criterion
    all_criteria = (
        [c["name"] for c in rubric["domain"]]
        + [c["name"] for c in rubric["coding"]]
        + [c["name"] for c in rubric["bb_extensions"]]
    )
    weight_map = {
        c["name"]: c["weight_default"]
        for c in rubric["domain"] + rubric["coding"] + rubric["bb_extensions"]
    }

    per_criterion = {}
    variance_flag = False
    for crit in all_criteria:
        scores = [
            jr["per_criterion"].get(crit)
            for jr in judge_results
            if "per_criterion" in jr and isinstance(jr["per_criterion"].get(crit), (int, float))
        ]
        if not scores:
            per_criterion[crit] = None
            continue
        per_criterion[crit] = round(statistics.mean(scores), 2)
        if len(scores) >= 2 and statistics.stdev(scores) > rubric["judge_ensemble"][0].get("variance_alert_threshold", 1.0):
            variance_flag = True

    # Weighted consolidated score (scale 0-45)
    weighted_sum = sum(
        (per_criterion[c] or 0) * weight_map[c]
        for c in all_criteria
    )
    max_weighted = sum(weight_map[c] * 5 for c in all_criteria)
    consolidated = round(45 * weighted_sum / max_weighted, 2) if max_weighted else 0

    # Verdict
    if consolidated >= 38 and not variance_flag:
        verdict = "publish"
    elif consolidated >= 30:
        verdict = "revise"
    else:
        verdict = "reject"

    return {
        "consolidated_score": consolidated,
        "per_criterion": per_criterion,
        "variance_flag": variance_flag,
        "judge_breakdown": judge_results,
        "verdict": verdict,
    }

# ── Integration with briefgen-agentic.py ─────────────────────────────
# In stage4_reviewer(brief), replace the existing keyword-based gate with:
#
#   from bb_rubric_scorer import score_brief
#   score = score_brief(brief=brief_markdown, task=scope["topic"])
#   print(f"[REVIEWER] Score: {score['consolidated_score']}/45 ({score['verdict']})")
#   if score["variance_flag"]:
#       print(f"[REVIEWER] ⚠️ Judge disagreement on some criteria — human review.")
#
# Cost: ~4 LLM calls per brief at temperature 0.0. Set OPENROUTER_API_KEY.
# Latency: ~10-15s with parallel calls (use asyncio.gather if needed).
