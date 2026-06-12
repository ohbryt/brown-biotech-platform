# CatMood — Decisions Needed (Human-Only)

Status: living checklist. Owned by devex-docs; **only a human** can close these items. PRs that
touch the affected areas must reference the relevant item. None of these may be decided by an
agent. Internal document — plain style.

Legend: `[ ]` open · `[~]` in progress · `[x]` closed (record who/when in the notes).

---

## 1. Dataset licensing for commercial use
A lawyer / authorised human must verify each dataset's license permits CatMood's intended
(potentially commercial) use **before** any model trained on it ships.

- [ ] **CatMeows** (Ludovico/Ntalampiras et al. 2020, Zenodo) — confirm license terms and
      whether commercial use is permitted; record license name + version + URL.
- [ ] **CatFLW** (48 facial landmarks) — confirm research-use conditions; many landmark/face
      datasets are **research-use only**. Verify before any commercial dependency.
- [ ] **Cat-emotion dataset(s)** behind the published CNN taxonomy — identify exact dataset,
      verify license and provenance/consent of imagery.
- [ ] Document the verified license + scope for each in the relevant model card before that
      model is bound in the app.

## 2. Final taxonomy wording (both languages)
The internal enum values are fixed in `AGENTS.md`; the **user-facing display names** are not.
- [ ] Confirm EN display labels for the 5 emotion states and 4 meow contexts.
- [ ] Confirm KO display labels (해요체-friendly, natural, not literal translations).
- [ ] Sign off that no display label implies certainty, diagnosis, or "translation".
- [ ] Decide whether/when to promote FUTURE v2 audio labels (purr, hiss/growl, trill/chirp,
      yowl) — currently out of scope per `docs/labeling-guidelines.md` §6.3.

## 3. Legal review — disclaimers + privacy policy (PIPA)
- [ ] Legal review of full disclaimer text (EN/KO) in `docs/disclaimers.md`.
- [ ] Privacy policy drafted and reviewed for **Korea PIPA** compliance.
- [ ] Consent flow and lawful basis confirmed for any data processing.
- [ ] Confirm "not a medical device" framing meets KR/other-market regulatory expectations.

## 4. App-store positioning
- [ ] Confirm store category and copy **avoid medical/health framing**; position as an
      **observation aid / wellness** tool (not medical, not diagnostic).
- [ ] Review store screenshots/copy for overclaiming or "translation" language.
- [ ] Confirm age rating and content declarations.

## 5. Data-collection consent flow (future opt-in)
Only relevant if/when an opt-in sharing or improvement feature is built (default OFF today).
- [ ] Design and legally review an explicit opt-in consent flow (purpose, scope, withdrawal).
- [ ] Confirm what (if anything) could ever be uploaded, with data minimisation.
- [ ] Confirm storage/retention/deletion policy and user controls.
- [ ] Confirm this never weakens the on-device/offline-by-default default.

---

## Notes / decision log
_(Record decisions here: item, who decided, date, outcome, link.)_
