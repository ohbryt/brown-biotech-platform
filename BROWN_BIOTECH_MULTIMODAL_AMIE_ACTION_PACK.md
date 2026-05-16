# Brown Biotech Multimodal AMIE Action Pack

## Why this exists
The Nature Medicine multimodal AMIE paper reinforces a Brown Biotech rule we already use:
**decision quality improves when the request is routed with its evidence, not just its text.**

This pack turns that into:
- site copy
- Notion HQ priorities
- Next.js implementation tickets

---

## 1) Site copy

### Hero
**Turn text, files, and signals into one decision-ready brief.**

Brown Biotech routes serious requests through a paid brief, then keeps the request tied to the evidence stack: PDFs, screenshots, figures, slides, audio notes, and links.

**Primary CTA:** Request a Brief

### Subhead
If the fit is real, we route it. If the evidence is incomplete, we ask for the missing artifact early.

### Evidence stack block
**Keep the brief tied to the evidence.**

Brown Biotech should be able to retrieve not just text, but PDFs, screenshots, figures, slides, audio notes, and other multimodal artifacts so the brief stays decision-ready.

### Trust layer
- Inspectable workflow
- Human review required for high-stakes decisions
- Provenance attached to every artifact
- Decision-ready handoff, not blind automation

### No-fit copy
Thanks — this is not the right lane for us right now. If you have a clearer brief or a stronger evidence stack later, we can revisit.

---

## 2) Notion HQ priority table

| Priority | Item | Why it matters | Owner | Next action |
|---|---|---|---|---|
| P0 | Add a multimodal evidence intake block to HQ | The new intake motion should capture files, not just text | business-pipeline | Update HQ copy and intake template |
| P0 | Add provenance / reviewer metadata fields | Brown Biotech needs an inspectable record | HQ / Notion owner | Define required fields and labels |
| P0 | Keep human approval gates explicit | High-stakes items must not auto-flow | Dr.OCM | Mirror the human gate in the HQ page |
| P1 | Add evidence-quality scoring | Poor files should trigger a repair loop, not a false answer | business-pipeline | Define quality states: good / usable / missing |
| P1 | Add multimodal retrieval references | PDFs, images, and notes should be searchable together | research / ops | Link to the multimodal retrieval spec |
| P2 | Add weekly review metrics | The system should improve over time | HQ owner | Track volume, routing accuracy, review time |

### HQ note to add above the table
**One brief, one owner, one next action — and one evidence stack.**

---

## 3) Next.js implementation tickets

### Ticket 1: Extend the intake payload for multimodal evidence
**Files:**
- Modify: `src/lib/intake.ts`
- Modify: `src/components/ServiceInquiryCard.tsx`
- Modify: `src/components/BrowserTestLab.tsx`

**Task:**
Add evidence fields to the intake payload so the form can explicitly carry file types and artifact notes.

**Acceptance criteria:**
- The payload can represent `pdf`, `image`, `slide`, `audio`, and `link`
- The receipt mentions the evidence stack
- The browser test preview shows the evidence summary

### Ticket 2: Update the shared service intake card copy
**Files:**
- Modify: `src/components/ServiceInquiryCard.tsx`

**Task:**
Add short helper text that tells users to upload the artifact that supports the request.

**Acceptance criteria:**
- Users see that text, files, and screenshots are welcome
- The card still stays short and premium
- The CTA remains singular: `Request a Brief`

### Ticket 3: Refresh the services page evidence section
**Files:**
- Modify: `src/app/services/page.tsx`

**Task:**
Tighten the evidence-stack section so it explicitly mentions multimodal intake and provenance.

**Acceptance criteria:**
- The copy says Brown Biotech uses text + files + signals
- The trust layer mentions provenance and human review
- The section still reads cleanly on mobile

### Ticket 4: Add multimodal-aware routing notes
**Files:**
- Modify: `src/lib/intake.ts`
- Modify: `src/components/Contact.tsx`

**Task:**
Make the routing receipt mention that evidence was checked and that the next action may request a missing artifact.

**Acceptance criteria:**
- The response can say whether the evidence stack is complete
- The next action can ask for a missing PDF/image/report
- High-stakes routing still preserves the human gate

### Ticket 5: Add a browser-test scenario for multimodal intake
**Files:**
- Modify: `src/components/BrowserTestLab.tsx`

**Task:**
Add a scenario that simulates a request with a PDF or screenshot attached.

**Acceptance criteria:**
- The preview reflects artifact-aware triage
- The receipt mentions the evidence stack
- The test page remains readable and testable in-browser

### Ticket 6: Update the operating docs
**Files:**
- Modify: `BROWN_BIOTECH_HQ_NOTION_DRAFT.md`
- Modify: `BROWN_BIOTECH_INTAKE_FORM.md`
- Modify: `BROWN_BIOTECH_PARTNER_FUNNEL_COPY.md`

**Task:**
Align the docs with the new multimodal evidence motion.

**Acceptance criteria:**
- The HQ draft includes the evidence-stack priority
- The intake form asks for the right artifact types
- The funnel copy says the brief is routed with evidence, not text alone

---

## 4) Recommended execution order
1. Update the docs and site copy.
2. Add payload support in `src/lib/intake.ts`.
3. Wire the evidence hints into the intake card and contact receipt.
4. Add the browser-test scenario.
5. Re-run browser QA.

## 5) Principle
**Brown Biotech should turn multimodal evidence into a decision-ready brief, not a black-box answer.**
