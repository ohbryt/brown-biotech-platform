# Brown Biotech Notion DB Schema

This is the working schema for the intake / routing system. Keep the same nouns on the website, in the API payload, and in Notion.

## Intake Requests

**Database title:** Intake Requests

### Core routing fields
- Request ID (title)
- Received At (date)
- Source (select)
- Service Lane (select)
- Priority (select)
- Route (select)
- Owner (rich text or person)
- Status (select)
- Next Action (rich text)
- Approval Required (checkbox)
- Approval Reason (select)
- Fit Score (number)
- Urgency Score (number)

### Client fields
- Name (rich text)
- Email (email)
- Company / Lab (rich text)
- Timeline (rich text)
- Budget Range (rich text)
- Target Outcome (rich text)
- Constraints (rich text)
- Message (rich text)

### Evidence fields
- Evidence Types (rich text or multi-select)
- Evidence Summary (rich text)
- Evidence Links (rich text)
- Evidence Attachments (rich text)
- Attachment URLs (rich text)

### Recommended evidence block format
Use the page body to preserve the full evidence stack:
- Types
- Summary
- Links
- Uploaded files with clickable URLs

### Upload behavior
- Uploads are stored under a request-scoped path and linked from the receipt.
- If file storage is unavailable, keep the file name and summary in the page body so triage still works.
- Keep the shareable receipt and the Notion body aligned.

## Funnel

**Database title:** Funnel

Suggested properties:
- Name (title)
- Lane (select)
- Stage (select)
- Owner (rich text or person)
- Last Touched (date)
- Next Step (rich text)
- Probability (number)
- Source (select)
- Notes (rich text)

## Weekly Reviews

**Database title:** Weekly Reviews

Suggested properties:
- Week (title)
- Wins (rich text)
- Blockers (rich text)
- Risks (rich text)
- Decisions Needed (rich text)
- Next Actions (rich text)
- Owner (rich text or person)

## Decision Log

**Database title:** Decision Log

Suggested properties:
- Decision (title)
- Date (date)
- Rationale (rich text)
- Impact (select)
- Owner (rich text or person)
- Follow-up (rich text)

## Harness Improvement Log

**Database title:** Harness Improvement Log

Suggested properties:
- Title (title)
- Date (date)
- Trigger (select)
- What changed (rich text)
- Why it changed (rich text)
- Lane affected (select)
- Owner (rich text or person)
- Status (select)
- Result (rich text)
- Follow-up (rich text)

Use this database to capture the recursive improvement loop:
- misroutes
- missing evidence
- unclear wording
- review comments
- template updates
- browser QA findings

## Canonical lane names
Keep these exact everywhere:
- peptide-service
- biostatx
- genox-site
- business-pipeline
