# Brown Biotech Design.md

> Working design system for **브라운 바이오텍 주식회사 (Brown Biotech Inc.)**.
> 
> Purpose: help AI coding agents build a credible, premium, research-ready biotech website and service hub.

## Brand summary

Brown Biotech is a biotech services and operating company with an **AI-first, human-controlled** model.
The website should feel:

- credible, not hype-driven
- premium, not flashy
- structured, not cluttered
- research-ready, not consumer-gimmicky
- decision-ready, not exploratory-only

### What the site should communicate

1. We understand biotech workflows.
2. We organize service lanes clearly.
3. We respond like a real operating company.
4. We use AI to accelerate work, but humans approve high-stakes actions.
5. We make it easy to request a brief, a scoped response, or a next-step conversation.

## Design references

Use these influences together:

- **Apple** — premium white space, disciplined hierarchy, cinematic restraint
- **Stripe** — strong CTA structure, B2B clarity, polished section rhythm
- **Notion** — warm minimalism, information density, operating-hub feel
- **Vercel** — black/white precision, developer confidence, sharp composition
- **Framer** — bold hero contrast, motion cues, modern landing-page energy

### Reference priority

- **Base tone:** Vercel + Notion
- **Premium polish:** Apple
- **Conversion structure:** Stripe
- **Hero energy:** Framer

## Core principles

### 1. Credible over clever
Avoid playful copy that could weaken trust.
Prefer concise, grounded, specific language.

### 2. One page, one job
Each page should have a clear primary action.

Examples:
- Home: understand the company + visit services
- Services page: choose a service lane
- Service detail page: submit a brief

### 3. Structured clarity
Use visible hierarchy:
- heading
- supporting paragraph
- bullets or cards
- CTA

### 4. Research-ready
Make the site feel like a real operating system for projects.
Show process, scope, deliverables, and inquiry path.

### 5. AI-first, human-controlled
This must be explicit in the brand tone.
The site may mention AI acceleration, but should clearly preserve human approval for:
- spend
- legal/contract
- deployments
- clinical or medical claims
- public announcements

## Visual direction

### Mood
- premium
- calm
- high-trust
- modern biotech consultancy
- subtle technical sophistication

### Do
- use strong spacing
- use restrained gradients or soft glow only as accents
- keep surfaces clean and slightly elevated
- use consistent borders and shadows
- keep copy short and decisive

### Don’t
- don’t use neon-heavy sci-fi visuals
- don’t use overly bright AI marketing copy
- don’t use stock imagery that looks generic
- don’t crowd the hero with too many claims
- don’t make the site feel like a consumer startup playground

## Typography

### Recommended stack
- **Sans:** Inter
- **Mono:** IBM Plex Mono

### Type rules
- large hero headline with tight but readable line breaks
- body copy at comfortable size and line height
- monospace only for labels, metadata, process markers, IDs, and operational details
- avoid too many font weights; keep it disciplined

### Headline style
- short
- confident
- not exaggerated
- should read like a company statement, not an ad

Example:
- `Biotech services, organized for decisive work.`
- `Research-ready support for peptide, statistics, and discovery work.`

## Color system

### Base palette
- background: near-black / deep slate or warm off-white depending on page section
- foreground: off-white / near-black for contrast
- borders: low-contrast gray
- accent: muted gold, restrained blue, or soft violet in very small amounts

### Suggested usage
- **primary text:** high contrast
- **secondary text:** muted slate/gray
- **borders:** thin, subtle
- **accent:** CTA only
- **surface:** soft elevated panels with low shadow

### Important
Use accent color sparingly.
The brand should feel premium because of restraint, not saturation.

## Layout system

### Grid
- desktop-first with strong responsive behavior
- max width around 1120–1200px for content sections
- generous side padding
- section spacing should be consistent and substantial

### Sections
Typical section pattern:
1. eyebrow / section label
2. heading
3. supporting paragraph
4. cards / bullets / action area

### Spacing
- use large gaps between sections
- use moderate internal card padding
- keep CTA spacing generous

## Surface language

Use a small set of surface types:

1. **Default page background**
2. **Primary elevated card**
3. **Subtle bordered panel**
4. **Accent CTA panel**

### Card style
- rounded but not overly soft
- thin border
- subtle shadow or blur only if it improves polish
- avoid heavy glassmorphism

## Buttons and CTAs

### Button hierarchy
- **Primary:** filled, high-contrast, strongest action
- **Secondary:** outline or subtle neutral fill
- **Tertiary:** text link with arrow

### CTA principles
- one primary CTA per section
- every important page should have a clear next step
- CTA text should be specific

Good examples:
- `View Services`
- `Request a Brief`
- `Talk to Us`
- `Start an Inquiry`

Avoid vague examples like:
- `Learn More`
- `Click Here`
- `Explore` alone

## Content tone

### Tone rules
- confident, but not aggressive
- practical, not visionary fluff
- specific, not generic
- research language, not marketing jargon overload

### Preferred language patterns
- `focused support`
- `scoped response`
- `research-ready`
- `decision-ready`
- `clear service lanes`
- `human-reviewed where it matters`
- `operating hub`

### Words to avoid
- revolutionary
- world-changing
- magic
- autonomous everything
- clinical-grade unless formally validated
- miracle
- guaranteed

## Page blueprint

### Home page
Goal: establish trust and direct people into services.

Recommended sections:
1. Hero
2. Service lanes
3. Operating principles
4. Process / how it works
5. Contact / inquiry

Hero should answer:
- who we are
- what we do
- where to go next

### Services hub
Goal: present service lanes as distinct entry points.

Recommended sections:
1. overview
2. service cards
3. how to choose a lane
4. FAQ
5. contact CTA

Each card should show:
- service name
- one-line summary
- best for
- expected output
- CTA

### Service detail page
Goal: convert interest into a scoped inquiry.

Recommended sections:
1. hero summary
2. who it is for
3. deliverables
4. process
5. specific CTA
6. inquiry form
7. next step

Each detail page should clearly answer:
- what this service is
- what the client gets
- what input is needed
- what happens after submission

## Service lanes

### 1. peptide-service
Positioning:
- focused entry point for peptide projects
- concise, scoped support
- good for peptide development and related service requests

The page should emphasize:
- clear intake
- practical deliverables
- fast triage
- research-friendly communication

### 2. biostatx
Positioning:
- biostatistics support for clearer decisions
- analysis, interpretation, and decision support

The page should emphasize:
- study design clarity
- analysis support
- result interpretation
- decision-ready outputs

### 3. genox-site
Positioning:
- discovery and genomics-facing support
- useful for exploratory and analysis-driven work

The page should emphasize:
- discovery support
- analysis framing
- structured handoff
- operational clarity

## Inquiry form rules

The inquiry form should collect only what is needed for triage.
Do not make the form feel heavy.

Recommended fields:
- name
- organization
- email
- project type
- brief summary
- timeline
- budget range optional
- file upload optional only if supported

### Form behavior
- short, simple, confident
- tell the user where the submission goes
- show a useful success state
- avoid long legal copy unless required

### Submission routing
The primary intake destination should be the **Brown Biotech Notion intake hub**.
If other destinations are used later, keep them invisible to the user and consistent operationally.

## Motion

Motion should be subtle and purposeful.

Use motion for:
- hero entrance
- card hover elevation
- section reveal
- button state transitions

Avoid:
- constant motion
- distracting parallax
- excessive animated gradients
- gimmicky scroll effects

## Accessibility

Always preserve:
- readable contrast
- focus states
- keyboard navigation
- semantic headings
- clear link text

Avoid relying on color alone for meaning.

## SEO and trust signals

Every page should include:
- clear title
- clear description
- stable URL
- meaningful headings
- service-specific language

Trust signals to include where appropriate:
- operating model
- research readiness
- human-controlled approval
- explicit service lanes
- clear inquiry path

## Implementation notes for AI coding agents

When building UI for Brown Biotech:

1. Prefer simple, composable sections.
2. Reuse cards, spacing, and button patterns.
3. Keep service detail pages visually aligned.
4. Make the inquiry path obvious.
5. Keep the copy grounded and concise.
6. Use premium restraint instead of decorative noise.
7. If a design decision increases ambiguity, choose the clearer option.

## Short brand statement

**Brown Biotech Inc. builds research-ready biotech services through an AI-first, human-controlled operating model.**

## One-line UI prompt for agents

Build a premium, credible biotech site with Apple/Stripe/Notion/Vercel restraint: strong hierarchy, generous spacing, clear service lanes, specific CTAs, and a research-ready inquiry flow.
