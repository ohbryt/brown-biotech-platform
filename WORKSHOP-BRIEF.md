# Workshop Service Lane — "Beyond Step 18"

## Positioning

시장에 Claude/ChatGPT "how to use" 콘텐츠가 폭증 중 (Ruben Hassid 10 steps, Anatoli Kopadze 18 steps 등). 이 콘텐츠들이 커버하는 범위:

```
Level 0: 채팅 열기
Level 1: Projects + Custom Instructions (Steps 1-3)
Level 2: Style cloning, sparring, extended thinking (Steps 6-8)
Level 3: Meta-prompting, skill system (Step 9)
────────────── 시장의 천장 ──────────────
Level 4: Memory architecture, multi-agent orchestration
Level 5: Automated pipelines (cron, eval, grader)
Level 6: Production AI ops (MCP, tool integration, observability)
```

**Brown Biotech workshop = Level 4-6**. 아무도 안 가르침. 우리가 매일 운영하는 것.

## Target Audience

| Segment | Pain | Budget |
|---------|------|--------|
| Biotech R&D team (5-20명) | AI tool 도입했지만 ChatGPT 수준에 머무름 | ₩3M-8M |
| Pharma data science | 파이프라인 자동화 니즈, 내부 역량 부족 | ₩5M-15M |
| CRO/CDMO ops | 반복 업무 자동화, 보고서 생성 | ₩2M-5M |
| Academic lab PI + postdoc | 문헌 리뷰, 데이터 분석 가속 | ₩1M-3M |

## Workshop Formats

### Format A: Half-Day Intensive (4h)
- **"AI Workflow Architecture for Biotech Teams"**
- ₩3M-5M (on-site) / ₩2M-3M (remote)
- 이론 2h + 실습 2h
- Output: 참가자별 AI workflow blueprint 1개

### Format B: 2-Day Sprint (16h)
- **"From Prompt to Production: Building Your Biotech AI Stack"**
- ₩8M-12M (on-site) / ₩5M-8M (remote)
- Day 1: Architecture + design
- Day 2: Build + deploy (실제 동작하는 파이프라인 1개)
- Output: 팀 전용 AI automation pipeline (동작 상태)

### Format C: Fractional Chief of AI (ongoing)
- **Monthly retainer: ₩5M-15M/mo**
- 주 1회 on-site/remote session (2h)
- 파이프라인 설계 + 구축 + 운영 지원
- Quarterly review + roadmap update
- 이미 TASK-QUEUE에 P3으로 있음 → P1 격상 검토

## Curriculum Modules

### Module 1: Context Engineering (2h)
> "프롬프트는 시작일 뿐이다"

- System prompt architecture (CLAUDE.md, project instructions)
- Memory hierarchy: session → project → persistent (hipocampus 패턴)
- Structured output specification (format, length, constraints)
- 실습: 팀 전용 CLAUDE.md 작성

### Module 2: Multi-Agent Orchestration (2h)
> "하나의 AI가 아니라 팀을 운영하라"

- Subagent delegation pattern (research / execution / verification)
- Model routing (haiku → sonnet → opus)
- Isolation patterns (worktree, background tasks)
- 실습: 3-agent workflow 설계 (researcher → writer → reviewer)

### Module 3: Automated Pipelines (2h)
> "매일 아침 AI가 일을 시작하고 있어야 한다"

- Cron-driven automation (morning triage, daily report 패턴)
- MCP tool integration (PubMed, Notion, Slack)
- Error handling + retry logic
- 실습: 일일 문헌 감시 파이프라인 구축

### Module 4: Eval & Observability (2h)
> "더 나아졌는지 어제보다 나빠졌는지 알아야 한다"

- LLM-as-judge pattern (grader-subagent)
- Rubric design (pass/fail criteria)
- Tracing (Langfuse/observability)
- 실습: 팀 output에 대한 grader 설계

### Module 5: Production Operations (2h)
> "PoC에서 운영으로"

- Unit economics ($0.50/run → $50K/month at 100x)
- Security (API key management, .env isolation)
- Tool-side leverage (error message 개선 → retry 40% 감소)
- Compounding vs non-compounding decisions
- 실습: 비용 시뮬레이션 + 보안 체크리스트

## Case Studies (실제 Brown Biotech 운영 사례)

1. **Morning Triage System** — PubMed 28 journals + bioRxiv/medRxiv → Notion DB, 06:00 KST 자동 실행, 월 800+ papers 처리
2. **Daily X-Thread Pipeline** — 매일 bioresearch AI 뉴스 → 8-post 스레드 자동 생성, 19회 연속 PASS (grader 검증)
3. **ARP Drug Discovery** — 3-engine pipeline, 5 diseases, 33 targets, real API integration
4. **Hipocampus Memory System** — 3-tier persistent memory, compaction chain, vector + BM25 search

## Differentiation

| 경쟁 | 우리 |
|------|------|
| 프롬프트 팁 10-18개 | Production workflow architecture |
| "이렇게 해보세요" | "우리가 매일 이렇게 운영합니다" (live case) |
| Consumer-level | Biotech-specific (PubMed, ClinicalTrials, ChEMBL) |
| 1회성 | Retainer로 전환 가능 (fractional Chief of AI) |
| Generic AI | Domain-expert AI (drug discovery, bioinformatics, regulatory) |

## Revenue Funnel

```
Workshop (₩3-12M one-time)
  → Follow-up Project (₩8-30M)
    → Retainer (₩5-15M/mo)
```

Workshop은 **lead gen + trust building** 역할. 실제 수익은 retainer에서.

## Service Portfolio Integration

현재 lanes:
1. peptide-service
2. biostatx
3. genox-site
4. business-pipeline

추가:
5. **ai-workshop** — "AI Workflow Architecture for Biotech"

Offer ladder 확장:
- Workshop Half-Day: ₩2M-5M (= Paid Brief 수준)
- Workshop Sprint: ₩5M-12M (= Project 수준)
- Fractional Chief of AI: ₩5M-15M/mo (= Retainer 수준)

## Next Actions

- [ ] services/ai-workshop 페이지 생성 (Next.js)
- [ ] Case study 1개 상세 작성 (Morning Triage 추천 — 가장 demo하기 좋음)
- [ ] Workshop 랜딩 페이지 CTA: "Request a Workshop Brief"
- [ ] SERVICE-PORTFOLIO.md에 ai-workshop lane 추가
- [ ] Fractional Chief of AI를 TASK-QUEUE P3 → P1 격상
