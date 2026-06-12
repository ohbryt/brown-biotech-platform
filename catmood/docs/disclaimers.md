# CatMood — Disclaimers (Phase 0)

Status: living document. Owned by devex-docs; all user-facing wording requires a
welfare-science-reviewer pass before shipping. Korean user-facing copy uses polite **해요체**.

These texts are the **canonical source** for in-app disclaimer strings, the Settings →
Disclaimers page, and store-listing safety copy. Engineering must reference these rather than
re-writing copy. Privacy/PIPA statements still require **legal review** before launch
(tracked in `docs/decisions-needed.md`) — do not treat them as legal sign-off.

---

## 1. Full disclaimer — English

**CatMood is not a medical or veterinary device.**
CatMood is an observation aid for cat owners. It does not diagnose, treat, or rule out any
medical or behavioural condition.

**Results are probabilistic estimates, not facts.**
CatMood estimates a *likely* emotional state from a photo and a *likely* context for a meow.
Every result is shown as a probability distribution with a confidence value. A result is never
a certain statement about how your cat actually feels.

**Consult a veterinarian for any health concern.**
If your cat shows signs of pain or discomfort, behaves unusually, or if CatMood's
pain/discomfort indicator is elevated, please consult a licensed veterinarian. CatMood is not
a substitute for professional veterinary care, and an elevated pain indicator is a prompt to
seek advice — not a diagnosis.

**Accuracy varies.**
Performance depends on photo and audio quality, lighting, angle, background noise, your cat's
breed, and individual differences between cats. Results may be wrong.

**Lab performance does not guarantee real-world performance.**
Any accuracy figures we publish come from specific research datasets and our own held-out
evaluations. Real-world conditions differ, so real-world accuracy may be lower than reported
figures. We only publish numbers from our own evaluations in our model cards; we never present
dataset-paper numbers as CatMood's results.

**Privacy.**
CatMood processes your photos and audio **on your device**. By default, nothing is uploaded
and no photo or audio leaves your phone. Any future sharing or cloud feature is strictly
**opt-in and OFF by default**, and would require your explicit consent. We aim to comply with
Korea's Personal Information Protection Act (PIPA); the privacy policy and consent flow are
pending legal review before launch.

---

## 2. 전체 고지문 — 한국어

**CatMood는 의료기기나 동물용 의료기기가 아니에요.**
CatMood는 반려인을 위한 관찰 보조 도구예요. 어떤 질병이나 행동 문제도 진단하거나 치료하거나
배제하지 않아요.

**결과는 확률적인 추정이며, 사실이 아니에요.**
CatMood는 사진으로 *가능성이 높은* 감정 상태를, 울음소리로 *가능성이 높은* 맥락을 추정해요.
모든 결과는 확률 분포와 신뢰도와 함께 보여드려요. 고양이의 실제 감정을 단정해서 말하지 않아요.

**건강이 걱정되면 수의사와 상담해 주세요.**
고양이가 통증이나 불편함의 신호를 보이거나, 평소와 다르게 행동하거나, CatMood의 통증·불편함
지표가 높게 나오면 수의사와 상담해 주세요. CatMood는 전문적인 진료를 대신할 수 없고, 통증 지표가
높게 나오는 것은 진단이 아니라 상담을 권하는 신호예요.

**정확도는 상황에 따라 달라져요.**
결과는 사진·소리의 품질, 조명, 각도, 주변 소음, 고양이의 품종, 그리고 개체 차이에 따라 달라지고,
틀릴 수도 있어요.

**실험실 성능이 실제 성능을 보장하지 않아요.**
저희가 공개하는 정확도 수치는 특정 연구 데이터셋과 자체 평가에서 나온 값이에요. 실제 환경은
다르기 때문에 실제 정확도는 더 낮을 수 있어요. 저희는 자체 평가에서 나온 수치만 모델 카드에
공개하고, 데이터셋 논문의 수치를 CatMood의 결과처럼 제시하지 않아요.

**개인정보.**
CatMood는 사진과 소리를 **기기 안에서** 처리해요. 기본 설정에서는 아무것도 업로드되지 않고,
사진이나 소리가 휴대폰을 벗어나지 않아요. 앞으로 공유나 클라우드 기능이 생기더라도 **기본은
꺼짐(OFF)이며, 직접 동의(opt-in)하셔야** 작동해요. 저희는 개인정보 보호법(PIPA) 준수를
목표로 하고 있으며, 개인정보 처리방침과 동의 절차는 출시 전 법률 검토를 받을 예정이에요.

---

## 3. Short in-app one-liner variants

Use these where space is tight (result footers, tooltips, onboarding). They do **not** replace
the full disclaimer, which must remain reachable from Settings.

| Context | English | Korean (해요체) |
|---|---|---|
| Result footer (general) | Estimate, not a diagnosis. | 진단이 아니라 추정이에요. |
| Pain indicator elevated | Possible discomfort signs — consult a vet if concerned. This is not a diagnosis. | 불편함의 신호일 수 있어요 — 걱정되시면 수의사와 상담해 주세요. 진단은 아니에요. |
| Privacy chip | Processed on your device. Nothing is uploaded. | 기기에서 처리돼요. 업로드되지 않아요. |
| Not-a-translator note | CatMood estimates context, it doesn't translate. | CatMood는 맥락을 추정할 뿐, 통역하지 않아요. |
| Onboarding one-liner | An observation aid — not a medical device. | 관찰을 돕는 도구예요 — 의료기기가 아니에요. |

Anti-patterns (never ship, any language): "diagnosis", "translation", "your cat is …",
certainty verbs, or any accuracy claim not backed by our own published model-card eval.
