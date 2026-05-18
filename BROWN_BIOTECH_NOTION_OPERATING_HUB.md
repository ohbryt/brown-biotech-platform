# Brown Biotech Notion Operating Hub

>This page is the working outline for the Brown Biotech operating hub.
>It should stay aligned with the website language:
>**one brief, one owner, one next action**.

## System of Intelligence — Architecture

```
PubMed / ClinicalTrials / ChEMBL / GEO    ← System of Record (SoR)
        ↓ 읽고 · 쓰고 · 추론하는 레이어
Hermes Agent + ARP v24                    ← System of Intelligence (SoI)
        ↓ decision-ready 출력
Paid Briefs → Notion DB                   ← 제도적 기억 (institutional memory)
```

### SoI 운영 로그 (automated)
| Run | Trigger | Output |
|-----|---------|--------|
| Morning triage (06:00 KST) | 28 journals, 7 topics | Notion DB entries |
| Research watcher scan | 27 queries, weekly | 97+ hits, scored |
| Paid Brief delivery | Per request | Brief archive in Notion |

### 왜 SoI인가
- **전환 비용** = 데이터 축적이 아닌 **추론 맥적** (workflow + reasoning context)
- **데이터 품질** = AI 자동 기록 → Notion DB가 매일 풍부해짐
- **制度적 기억** = 담당자 이직해도 맥락 유지
- **TAM 확대** = "관심 있는 모든 biotech 질문" = Paid Briefs 범위

## HQ
- **Primary motion:** Paid Brief → peptide-service
- **Supporting lanes:** biostatx, genox-site, business-pipeline
- **Primary CTA:** Request a Brief
- **Operating rule:** human approval for money, legal, contracts, deployment, public announcements, and medical claims

## Signals / dashboard
- Daily signal workflow
- Daily signal dashboard
- Daily signal brief
- Weekly review


## Reusable Brown Biotech skill pack
Keep the pack small, reusable, and model-agnostic. Use these ten skills everywhere:
1. Intake capture
2. Triage
3. Routing
4. Brief drafting
5. Source mapping
6. Approval gate
7. Receipt formatting
8. Launch check
9. Weekly review
10. Spec-to-task conversion

## Harness loop
The skill pack should improve from outcomes:
- misroutes become routing rules
- missing evidence becomes intake prompts
- reviewer comments become template updates
- repeated work becomes a reusable brief

## Canonical Notion docs
- BROWN_BIOTECH_NOTION_EXECUTION_PACK.md
- BROWN_BIOTECH_NOTION_HQ_PAGE_MAP.md
- BROWN_BIOTECH_NOTION_WORKER_TEMPLATE.md
- BROWN_BIOTECH_NOTION_CONNECTOR_PLUGIN_MAP.md
- BROWN_BIOTECH_SMB_OPERATING_PACK.md
- BROWN_BIOTECH_SUPERCLAUDE_COMMAND_MAP.md

## Service-specific variants
### peptide-service
- Focus: paid brief, quote path, consultation path
- Default next step: scoped brief and target clarification

### biostatx
- Focus: dataset review, analysis plan, reporting
- Default next step: smallest analysis that supports a decision

### genox-site
- Focus: discovery framing, partnership scoping, collaboration path
- Default next step: scope memo and partner route

### business-pipeline
- Focus: intake routing, ops automation, service backbone
- Default next step: map workflow, owner, and implementation step

## Operating cadence
- **Daily:** capture requests, route, define next action
- **Weekly:** review open items, blockers, approvals, and follow-ups
- **Monthly:** simplify lanes, merge duplicates, retire weak offers

## Decision rules
- **Promote** if a lane gets repeat demand or revenue
- **Merge** if it overlaps with an existing lane
- **Retire** if it adds complexity without value

## Writing rules
- Keep copy premium and concise
- Use the same lane names everywhere
- Avoid generic AI language
- Make the first paid step explicit
- Keep the internal hub readable on mobile
