# Brown Biotech Intake Form

## Goal
Turn a request into a structured intake, a lane, an owner, and a next action.

## Required fields
- Name
- Company / lab / project
- Email or contact
- Service lane
- What problem are you solving?
- What outcome do you need?
- Timeline
- Budget range or brief scope
- Is this a brief, a partnership, or a referral?
- Does this require human approval?

## Optional fields
- Relevant links
- Dataset / assets / docs
- PDFs / reports
- Screenshots / figures
- Audio notes
- Background context
- Any constraints
- Preferred communication channel

## Routing logic
### peptide-service
Use when the request is about peptide work, consultation, quote, or scoped decision support.

### biostatx
Use when the request needs analysis planning, reporting, or data interpretation.

### genox-site
Use when the request is about discovery framing or partner scoping.

### business-pipeline
Use when the request is about intake routing, systems, or automation.

## Response schema
- Request ID
- Service lane
- Triage
- Route
- Owner
- Next action
- Approval needed
- Notes

## Triage options
- Hot
- Warm
- Cold

## Route options
- Book call
- Follow up
- Nurture
- Escalate
- Disqualify

## Guardrails
- If the fit is weak, say so early.
- If the request is high-stakes, require human approval.
- If the evidence stack is incomplete, ask for the missing artifact before routing.
- If the request should become a paid brief, keep the scope tight.
- Do not let the form drift into free consulting.
