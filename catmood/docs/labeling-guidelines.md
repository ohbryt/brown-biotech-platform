# CatMood — Labeling Guidelines (Phase 0)

Status: living document. Owned by devex-docs. Governs how human raters label training/eval
data so that labels stay consistent with the taxonomy in the root `AGENTS.md` and with
`docs/product-spec.md`. Any change to label definitions requires a corresponding update to
`AGENTS.md` (taxonomy section) and a welfare-science-reviewer pass.

Internal document — plain style.

---

## 0. How to read this document

- **[ESTABLISHED]** marks claims grounded in published literature, cited inline.
- **[WORKING CONVENTION]** marks a CatMood-internal decision we adopted for consistency. It
  is *not* validated and *not* drawn from literature. We must never present working
  conventions as scientific fact in user-facing copy or model cards.
- Thresholds, cutoffs, and any mapping from scores to a shipped indicator are **calibrated
  in Phase 1** on our own data; numbers here are illustrative scaffolding only.

### Sources
- Evangelista, M.C., Watanabe, R., Leung, V.S.Y., et al. "Facial expressions of pain in
  cats: the development and validation of a Feline Grimace Scale." *Scientific Reports* 9,
  19128 (2019). — Feline Grimace Scale (FGS), five action units, 0/1/2 scoring.
- Ludovico, L.A., Ntalampiras, S., Presti, G., et al. "CatMeows: A Publicly-Available
  Dataset of Cat Vocalizations" (2020); associated Zenodo dataset. — meow context taxonomy
  (food / isolation / brushing-handling), 440 vocalisations, 21 cats, 2 breeds.
- CatFLW — 48 cat facial landmarks (used later for cue interpretability; not a label source).
- Published cat-emotion CNN work — starting point for the multi-state emotion taxonomy
  (extended by us from a 4-state to a 5-state scheme; the extension is a [WORKING CONVENTION]).

---

## 1. Pain/discomfort: Feline Grimace Scale rubric

The `pain_discomfort` indicator is grounded in the Feline Grimace Scale (FGS)
[ESTABLISHED — Evangelista et al. 2019]. The FGS defines **five facial action units (AUs)**,
each scored **0 (absent) / 1 (moderately present) / 2 (markedly present)**.

Raters score each AU independently from the cat face image, before considering emotion-state
labels, to avoid contaminating the pain signal with state expectations.

### 1.1 Action units and per-score descriptions

| AU | 0 — absent | 1 — moderately present | 2 — markedly present |
|---|---|---|---|
| **Ear position** | Ears facing forward, upright, relaxed. | Ears slightly pulled apart and/or rotated outward. | Ears flattened and rotated outward ("airplane ears"). |
| **Orbital tightening** | Eyes fully open, relaxed. | Eyes partially closed / squinted. | Eyes strongly squeezed / narrowed, visible tightening around the orbit. |
| **Muzzle tension** | Muzzle relaxed, rounded. | Muzzle mildly tense, slightly more elliptical. | Muzzle markedly tense, clearly elliptical/flattened. |
| **Whisker position change** | Whiskers relaxed, in natural curve. | Whiskers slightly stiffened/straightened and/or pushed forward. | Whiskers markedly straightened and pushed forward away from the face. |
| **Head position** | Head held above shoulder line, normal carriage. | Head aligned with or slightly below the shoulder line. | Head held markedly low, at or below shoulder line, or tucked. |

Plain-language note for raters: score what you actually see in the still image. Do not
infer from breed expectations (e.g., flat-faced breeds may show baseline muzzle/orbital
shapes — see §3.4). When uncertain between two scores, record the lower score and flag the
image for adjudication.

### 1.2 Mapping AU scores to the pain indicator

[ESTABLISHED] The FGS literature sums AU scores into a total and uses a **total-score cutoff**
to guide analgesia decisions in clinical/veterinary settings (Evangelista et al. 2019 report
and validate such a cutoff on their study population).

[WORKING CONVENTION — NOT VALIDATED] For CatMood:
- We record the five AU scores per image and a derived total (range 0–10).
- We will **calibrate** how the total (and per-AU pattern) maps to our shipped
  `pain_discomfort` indicator and its "elevated" threshold **in Phase 1**, on our own
  labelled data and held-out eval set.
- We **do not** copy the clinical analgesia cutoff and present it as CatMood's validated
  threshold. CatMood is not a medical device and the app is an observation aid, not an
  analgesia-decision tool (see `docs/disclaimers.md`).
- Until Phase 1 calibration is published in a model card, no AU→indicator number in this
  document may be quoted as a CatMood result.

---

## 2. Emotion-state labels (5-state taxonomy)

Canonical states (do not rename without updating `AGENTS.md`):
`relaxed_content | alert_aroused | fearful_anxious | irritated_aggressive | pain_discomfort`.

[WORKING CONVENTION] The 5-state scheme extends published 4-state cat-emotion CNN work by
separating a pain/discomfort signal (grounded in FGS) from the affective states. The mapping
from a multi-class emotion model to these labels is a CatMood convention, not an established
ethogram.

Each state is labelled from the **whole-face gestalt plus listed body cues visible in frame**.
Pain AU scoring (§1) is done separately and can co-occur with any state.

### 2.1 relaxed_content
- **Include:** soft/relaxed facial muscles; ears forward-neutral; eyes soft, possibly
  half-closed in a calm (not squinting-from-tension) way; relaxed whiskers; no defensive or
  appetitive arousal cues.
- **Exclude:** slow-blink during clear social solicitation toward a person if accompanied by
  forward intent (lean toward `alert_aroused` if engaged/attentive). Sleeping cats — see §3.1.

### 2.2 alert_aroused
- **Include:** attentive, oriented expression; ears upright and forward; eyes open, pupils
  may be moderately dilated; whiskers forward; posture engaged. Covers positive/neutral
  arousal (interest, anticipation, play-orienting).
- **Exclude:** arousal with clear threat/defensive signals (→ `fearful_anxious` or
  `irritated_aggressive`); arousal with pain AUs dominating (score pain separately, and if
  the affect is ambiguous mark unlabelable, §4).

### 2.3 fearful_anxious
- **Include:** defensive arousal away from a stimulus; ears flattened/back; pupils widely
  dilated; whiskers may retract; head/posture lowered or withdrawn; avoidance.
- **Exclude:** forward-driven offensive threat (→ `irritated_aggressive`). Note ear flattening
  also appears in FGS pain AU — keep pain scoring independent (§1).

### 2.4 irritated_aggressive
- **Include:** offensive/agonistic signals oriented *toward* a stimulus; ears rotated/back
  with forward body intent; direct hard stare; tension around muzzle; may show piloerection,
  open-mouth threat.
- **Exclude:** purely defensive withdrawal (→ `fearful_anxious`). Distinguishing offensive vs
  defensive aggression from a single still is hard; when body-direction cues are absent in
  frame, prefer `fearful_anxious` only if withdrawal is evident, else mark unlabelable.

### 2.5 pain_discomfort
- **Include:** used as a state label only when the facial gestalt is dominated by FGS-type
  discomfort signals (high orbital tightening + muzzle tension + ear/whisker/head changes).
- **Primary mechanism:** the FGS AU scoring in §1 is the authoritative pain signal. This
  state label is the affect-level companion; the **indicator** comes from §1.2 calibration.
- **Exclude:** transient squinting from bright light or motion blur (→ unlabelable if it
  confounds the read).

### 2.6 Cross-state rule
A single image gets **exactly one** emotion-state label plus the **five AU scores**. If two
states are genuinely co-equal and cannot be adjudicated, the image is unlabelable (§4).

---

## 3. Edge cases

### 3.1 Sleepy vs relaxed
Half-closed eyes + relaxed muscles during rest = `relaxed_content`. If the cat is fully
asleep (eyes closed, no readable expression), the image is **unlabelable** (§4) — there is no
expression to classify.

### 3.2 Play-arousal vs fear-arousal
Both raise arousal and can dilate pupils. Decide on **valence/orientation cues**: engagement
toward a target with no defensive withdrawal → `alert_aroused`; flattened ears + withdrawal +
escape orientation → `fearful_anxious`. If orientation is unreadable from the still →
unlabelable.

### 3.3 Pain AUs overlapping affect
FGS ear flattening, orbital tightening, and whisker change overlap with fear/irritation
signals. Always score AUs (§1) independently of the chosen state. Co-occurrence is expected
and is fine: e.g., an image can be `fearful_anxious` with non-zero AU scores.

### 3.4 Breed/anatomy confounds
Brachycephalic (flat-faced) breeds may show baseline muzzle/orbital shapes that mimic AU≥1.
Score relative to the breed's neutral where possible; if neutral is unknown, flag for
adjudication and note the breed. This is a known limitation to surface in the model card.

---

## 4. Unlabelable / discard rule

Mark an image **unlabelable** (exclude from training/eval, keep with reason code) when any of:
- No cat face is present, or face is heavily occluded / out of frame.
- Severe blur, extreme angle, harsh lighting, or low resolution that prevents AU reads.
- Cat fully asleep / eyes closed with no readable expression (§3.1).
- Two emotion states are genuinely co-equal and adjudication cannot resolve them (§2.6).

Reason codes (controlled vocabulary): `no_cat`, `occluded`, `quality`, `asleep`,
`ambiguous_state`, `other`. Discarded items are never silently dropped — they are logged.

---

## 5. Inter-rater process

[WORKING CONVENTION]
- **Two independent raters** label each item (5 AU scores + 1 emotion state) blind to each
  other.
- **Adjudication:** a third rater (adjudicator) resolves any disagreement on the emotion
  state or any AU differing by ≥1, after the two raters fail to reconcile.
- **Agreement tracking:** record per-AU agreement and emotion-state agreement; report
  Cohen's/Fleiss' kappa (as appropriate) in the dataset documentation and the model card.
  Low-agreement categories are candidates for guideline refinement, not silent relabeling.
- **Provenance:** store rater IDs, timestamps, and adjudication outcome per item.
- Raters review this document and a small calibration set before labeling; re-calibrate if
  agreement drifts.

---

## 6. Audio labeling (meow context)

Canonical contexts (do not rename without updating `AGENTS.md`):
`food_request | attention_isolation | handling_contact | uncertain`.

### 6.1 v1 context labels [ESTABLISHED — CatMeows, Ludovico/Ntalampiras et al. 2020]
The three human-applied labels map to the CatMeows recording conditions:

| CatMood label | CatMeows condition | Inclusion |
|---|---|---|
| `food_request` | Waiting for food / food-anticipation context. | Vocalisation recorded in the food-anticipation setting. |
| `attention_isolation` | Isolation in an unfamiliar environment. | Vocalisation recorded during isolation / attention-seeking. |
| `handling_contact` | Brushing / handling by the owner. | Vocalisation recorded during handling/brushing contact. |

Honest limit to carry into the model card: CatMeows is **440 vocalisations from 21 cats of 2
breeds** — small and not representative of all cats; labels reflect *recording context*, not a
verified internal state.

### 6.2 `uncertain` is a reject option, not a human label
[WORKING CONVENTION] `uncertain` is **never applied by a human rater**. It is the **model's
reject option** at inference time (low confidence / out-of-distribution / too noisy). Training
labels only ever use the three v1 contexts above. Do not create an `uncertain` training class.

### 6.3 FUTURE v2 extension labels — NOT for Phase 0/1/2
[WORKING CONVENTION — FUTURE, do not collect or train on these yet]
The following call types are candidate v2 extensions and are **out of scope** until a future
phase explicitly opens them, with their own data sourcing and review:
- `purr`
- `hiss_growl`
- `trill_chirp`
- `yowl`

These are listed only so the taxonomy has a documented growth path. They must not appear in
v1 datasets, model cards, the shared domain `MeowContext` enum, or any user-facing copy until
promoted by a human decision (track in `docs/decisions-needed.md`).

---

## 7. Consistency checklist for raters
- [ ] AU scores recorded for all five units before choosing a state.
- [ ] Exactly one emotion state, or marked unlabelable with a reason code.
- [ ] No pain threshold/number quoted as a result (Phase 1 calibrates that).
- [ ] Audio labels use only the three v1 contexts; `uncertain` never hand-applied.
- [ ] Working conventions not represented as established science.
