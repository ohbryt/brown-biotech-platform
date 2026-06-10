# bb-rubric-scorer.py
# Drop-in scorer for briefgen-agentic.py Stage 4 (Reviewer).
#
# Replaces the current "pass / warn / fail" gate with a 1-45 multi-criterion
# score + judge variance signal. Adapted from:
#   Yeoh et al. 2026 (bioRxiv 2026.06.03.730004), 9+9 rubric.

import os
import re
import json
import statistics
import urllib.request
import yaml
from pathlib import Path

RUBRIC_PATH = Path(__file__).parent.parent / "templates" / "bb-rubric-v1.yaml"


def _load_rubric():
    """Load the rubric YAML, stripping comment lines."""
    raw = RUBRIC_PATH.read_text()
    return yaml.safe_load(re.sub(r"^\s*#.*$", "", raw, flags=re.MULTILINE))


def _extract_json(text: str):
    """Best-effort JSON extraction from a model's text response.
    Handles: pure JSON, JSON wrapped in markdown code blocks, JSON after
    chain-of-thought <think>...</think> blocks."""
    # 1. Try direct parse
    try:
        return json.loads(text)
    except Exception:
        pass
    # 2. Strip <think>...</think> and try again
    stripped = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()
    try:
        return json.loads(stripped)
    except Exception:
        pass
    # 3. Extract from ```json ... ``` markdown block
    m = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if m:
        try:
            return json.loads(m.group(1))
        except Exception:
            pass
    # 4. Find the first balanced { ... } in the text
    depth = 0
    start = None
    for i, ch in enumerate(text):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and start is not None:
                try:
                    return json.loads(text[start:i+1])
                except Exception:
                    pass
                start = None
    raise ValueError(f"Could not extract JSON from response ({len(text)} chars).")


def _llm_judge(judge_model, system_prompt, user_prompt, timeout=120,
               provider="openrouter", base_url=None, api_key_env="OPENROUTER_API_KEY"):
    """Hit the configured LLM provider. Defaults to OpenRouter for back-compat.
    Supports `minimax` (BB primary) and `openrouter` (when credits available).
    Returns parsed JSON dict (extracted from the model's text response, robust to
    chain-of-thought blocks like <think>...</think>)."""
    api_key = os.environ.get(api_key_env, "")
    if not api_key:
        return None
    if not base_url:
        base_url = "https://openrouter.ai/api/v1"
    body = json.dumps({
        "model": judge_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.0,
        "max_tokens": 4000,  # leave headroom for chain-of-thought models
    }).encode()
    req = urllib.request.Request(
        f"{base_url.rstrip('/')}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read())
    content = data["choices"][0]["message"]["content"]
    return _extract_json(content)


def _build_judge_prompt(rubric, brief, task):
    criteria_lines = []
    for c in rubric["domain"] + rubric["coding"] + rubric["bb_extensions"]:
        name = c["name"]
        weight = c["weight_default"]
        hint = c["prompt_hint"]
        criteria_lines.append(f"- **{name}** (weight {weight}): {hint}")
    joined = "\n".join(criteria_lines)
    return (
        "You are a Brown Biotech brief-quality judge. Score the following brief "
        "against the rubric below. Return a JSON object mapping each criterion name to "
        "an integer 1-5, plus a 1-sentence rationale.\n\n"
        f"## Task\n{task}\n\n"
        f"## Brief\n{brief}\n\n"
        f"## Rubric (1=poor, 5=excellent)\n{joined}\n\n"
        "Output: a single JSON object with keys = each criterion name, values = 1-5 integers. "
        "No prose outside the JSON."
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
    judges = rubric.get("judge_ensemble_models") or rubric.get("judge_ensemble") or []
    if judges and isinstance(judges[0], str):
        judges = [{"model": m, "role": "judge"} for m in judges]
    system_prompt = (
        "You are an expert reviewer for a biotech paid-brief service. "
        "Score strictly. 5 = excellent / publishable, 1 = poor / wrong."
    )
    user_prompt = _build_judge_prompt(rubric, brief, task)

    judge_results = []
    for j in judges:
        try:
            resp = _llm_judge(
                judge_model=j["model"],
                system_prompt=system_prompt,
                user_prompt=user_prompt,
                provider=j.get("provider", "openrouter"),
                base_url=j.get("base_url"),
                api_key_env=j.get("api_key_env", "OPENROUTER_API_KEY"),
            )
            if resp:
                judge_results.append({"judge": j["model"], "per_criterion": resp})
        except Exception as e:
            # One judge down - still publish, but flag variance
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
    var_threshold = rubric.get("variance_alert_threshold", 1.0)
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
        if len(scores) >= 2 and statistics.stdev(scores) > var_threshold:
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


if __name__ == "__main__":
    # Quick smoke test
    sample_brief = """
# Sample Brief: Aspirin ADMET

## Executive Summary
Aspirin (acetylsalicylic acid) is a well-characterized NSAID with MW=180,
logP=1.13, TPSA=63.6. Lipinski-pass, BBB-likely. Used for cardiovascular
prophylaxis at low doses.

## Mechanism
Irreversibly acetylates COX-1 (Ser530) and COX-2 (Ser516), inhibiting
prostaglandin synthesis. The irreversible platelet inhibition gives the
long-lasting antiplatelet effect (~7-10 days).

## Safety
GI bleeding risk at high doses. Reye's syndrome in children with viral
infection. Tinnitus at toxic doses.

## References
PMID: 12345678 — Smith et al. 2024.
"""
    result = score_brief(sample_brief, "aspirin ADMET")
    print(json.dumps(result, indent=2, ensure_ascii=False))
