# CatMood — Product Specification (Phase 0)

Status: living document. Owned by devex-docs; user-facing wording requires welfare-science-reviewer pass.
Taxonomy and honesty rules are governed by the root `AGENTS.md` — this spec must never drift from it.

---

## 1. Product definition

CatMood is an Android app that helps cat owners **observe** their cat's likely emotional
state and the likely context of its vocalisations. It is an *observation aid*, not a
translator and not a diagnostic tool.

Two core capabilities:

1. **Photo → emotional state distribution.** A cat-face photo is classified into a
   probability distribution over five states
   (`relaxed_content | alert_aroused | fearful_anxious | irritated_aggressive | pain_discomfort`),
   plus a separate **pain/discomfort indicator** grounded in the Feline Grimace Scale
   (Evangelista et al., *Sci Rep* 2019) and a short list of visible cues
   (e.g., "ears rotated outward", "eyes partially squinted").
2. **Meow recording → context distribution.** A 5–10 second recording is classified into
   likely contexts from the CatMeows taxonomy
   (`food_request | attention_isolation | handling_contact | uncertain`), with confidence.
   `uncertain` is the model's reject option, not a class users label.

Every output is a **distribution + confidence**, presented with hedged microcopy.
When the pain/discomfort indicator is elevated, a vet-consultation note is always shown.

### 1.1 MVP scope (in)

- Photo capture or gallery pick → state distribution + pain indicator + visible cues.
- 5–10 s audio recording → meow context distribution + confidence (or explicit "uncertain").
- **Local history**: past results stored on device (Room), browsable per cat, including a
  pain-indicator trend chart.
- **Cat profiles**: name, photo, optional age/breed; results attach to a profile.
- **Fully on-device, offline by default**: all inference local (MediaPipe Tasks + LiteRT);
  no network permission needed for core flows.
- Korean and English localisation from day one.

### 1.2 Explicitly out of scope

- **Medical or veterinary diagnosis** of any kind. The pain indicator is a screening-style
  observation cue, never a diagnosis.
- **Live video analysis** (single still photos only in MVP).
- **Multi-cat tracking** in one frame (one face per analysis).
- **Cloud upload of audio or photos** — no off-device transfer exists in MVP at all;
  any future sharing is strictly opt-in (default OFF) and a separate, human-approved feature.
- Literal "cat translation" framing, in any language, anywhere.

### 1.3 Non-functional requirements

| Requirement | Target | Notes |
|---|---|---|
| Photo inference latency | < 300 ms | On a mid-range device (e.g., ~Snapdragon 7-series class), capture-to-result excluding camera UI. |
| Audio inference latency | < 500 ms | After recording stops, on the same device class. |
| App + bundled models size | < 80 MB | Total installed APK/AAB including all `.tflite` models. |
| Privacy | Data never leaves the device by default | No analytics/photo/audio egress without explicit opt-in flag. Verified in review (see honesty-and-welfare-review skill). |
| Offline | All core flows work in airplane mode | Phase 0 mock layer and Phase 1–2 real models alike. |
| minSdk | 26 | Per root AGENTS.md stack. |
| Accessibility | TalkBack + dynamic type supported on every screen | See §4. |

Latency/size numbers are *engineering targets*, not measured results; they become
acceptance gates in Phase 4 (Hardening).

---

## 2. Screen list and states

Every screen must implement **all** of these UI states where applicable:
**empty, loading, low-confidence, error, offline.** Offline is the normal state, not an
error — the offline indicator only appears for the (future, opt-in) sharing feature.

| # | Screen | Purpose | Required states & notes |
|---|---|---|---|
| 1 | **Home / Capture** | Entry point: choose cat profile, capture photo, or record audio. | Empty (no profiles yet → onboarding prompt), loading (camera init), error (camera/mic permission denied, with rationale + settings link). |
| 2 | **Photo Result** | Distribution chart over 5 states, pain indicator, visible cues, hedged headline. | Loading (inference spinner < 300 ms target), low-confidence (explicit "not sure" framing, retake prompt), error ("no cat face detected" with retake guidance), vet note when pain indicator high. |
| 3 | **Audio Record** | 5–10 s recording with level meter and countdown. | Loading, error (mic permission, too short / too quiet), retry. |
| 4 | **Audio Result** | Context distribution + confidence, or explicit "uncertain". | Loading, low-confidence/uncertain (model reject option, shown honestly: "couldn't tell this time"), error ("too noisy — try a quieter room"). |
| 5 | **History** | Per-cat timeline of results; **pain-indicator trend chart** over time. | Empty ("no observations yet"), loading, chart with accessible data table alternative; trend never phrased as health verdict. |
| 6 | **Cat Profile** | Create/edit cat; results attach here. **Few-shot calibration** (per-cat baseline) is a later-phase feature — show as "coming later", do not stub fake results. | Empty, loading, error (storage). |
| 7 | **Settings** | Language (ko/en), privacy controls (any sharing opt-in **default OFF**), disclaimers page, licenses, about. | No remote config; settings are local. |

Cross-cutting result rules (every result surface):
- Show the **full distribution**, never just the top class.
- Show **confidence** numerically and visually.
- **Low-confidence threshold behavior**: below threshold (calibrated in Phases 1–2),
  the headline switches to "not sure" framing and suggests retake/re-record.
- **Pain note rule**: whenever `pain_discomfort` probability or the FGS-based pain score
  is high, the vet-consultation note is rendered inline with the result — not behind a tap.

---

## 3. Design language

- **Warm but clinically trustworthy.** Friendly tone and warm palette, but results are
  presented like a well-designed instrument readout, not a fortune cookie.
- **Charts over verdict illustrations.** Distributions are bar charts; we do not show a
  single happy/angry cat cartoon as "the answer".
- **Colorblind-safe.** State colors chosen from a colorblind-safe palette; the pain
  indicator is **never color-only** — always color + icon + text label.
- **Accessibility:** full TalkBack support (content descriptions for charts, including a
  spoken distribution summary), dynamic type up to the largest system size without
  truncating the vet note or disclaimers.
- **Both locales are first-class.** Korean is not a translation afterthought; microcopy is
  written natively per language (see §4).

---

## 4. Microcopy principles (EN / KO)

Hard rules (from root `AGENTS.md`):
1. **Always hedged.** Probability language, never certainty verbs ("is", "definitely",
   "your cat feels…" are banned in result headlines).
2. **Never "translate" or "diagnose"** as literal claims, in either language
   (번역/진단을 단정적으로 쓰지 않는다).
3. **Confidence is part of the sentence**, not a footnote.
4. User-facing Korean uses polite **해요체**; internal docs use plain style.

Examples (canonical patterns — reuse these shapes):

| Situation | English | Korean |
|---|---|---|
| Photo result headline | Likely "alert" right now (72%) | 지금은 '경계' 상태일 가능성이 높아요 (72%) |
| Low confidence | We're not sure this time — try a clearer, front-facing photo. | 이번에는 판단이 어려워요. 정면에서 더 또렷하게 찍어 보세요. |
| Pain note | Some signs that can relate to discomfort are present. This is not a diagnosis — if you're concerned, please consult a veterinarian. | 불편함과 관련될 수 있는 신호가 보여요. 진단은 아니에요. 걱정되신다면 수의사와 상담해 보세요. |
| Audio result | This meow most resembles a "food request" pattern (64%). | 이 울음소리는 '밥 달라는 요청' 패턴과 가장 비슷해요 (64%). |
| Audio uncertain | We couldn't tell this time. A quieter room and a closer recording can help. | 이번에는 알기 어려웠어요. 조용한 곳에서 조금 더 가까이 녹음하면 도움이 돼요. |
| No cat detected | We couldn't find a cat face in this photo. | 사진에서 고양이 얼굴을 찾지 못했어요. |

Anti-patterns (never ship): "Your cat is angry." / "Translation: feed me!" /
"고양이가 화났습니다" (단정) / "통증 진단 결과" / any accuracy claim not backed by our own
published eval in `docs/model-cards/`.

---

## 5. Phase roadmap

| Phase | Name | Delivers | Gate to exit |
|---|---|---|---|
| 0 | **Foundation** | Monorepo scaffold; app runs end-to-end on MOCK analyzers behind `PhotoAnalyzer`/`AudioAnalyzer` interfaces; docs (this spec, labeling guidelines, disclaimers, model-card template, decisions-needed); honesty-and-welfare-review skill. | Build + tests pass; all Phase-0 docs merged; human decisions list filed (`docs/decisions-needed.md`). |
| 1 | Vision MVP | Real on-device photo model (state distribution + FGS-grounded pain indicator + cues); labeling per `docs/labeling-guidelines.md`; calibrated low-confidence and pain thresholds. | Model card published with our own eval + calibration numbers; dataset licenses verified (human decision); welfare-science-reviewer sign-off on all result copy. |
| 2 | Audio MVP | Real on-device meow-context model; reject option ("uncertain") behavior; recording UX hardened. | Audio model card published; honest limits stated (CatMeows is 440 clips / 21 cats / 2 breeds); reviewer sign-off. |
| 3 | UX & Insight | History pain-trend chart, cat profiles polish, few-shot per-cat calibration, richer cues. | Accessibility audit pass (TalkBack, dynamic type, colorblind-safe); microcopy review in both locales. |
| 4 | Hardening | Performance (latency/size targets in §1.3 measured on reference devices), error/edge-case coverage, crash-free target. | NFR targets measured and met; QA suite green. |
| 5 | Validation | Real-world validation study design, PIPA/legal review complete, store-listing positioning (observation aid / wellness, not medical). | Legal + positioning decisions closed in `docs/decisions-needed.md`; disclaimers finalized in both languages. |

One phase at a time; PRs stay small; every feature lands with tests (root `AGENTS.md`,
"Definition of done").
