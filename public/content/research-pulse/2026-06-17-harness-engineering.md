# Research Pulse — 2026-06-17 (harness-engineering)
_Brown Biotech tooling track · manual curation by Demis_

## TL;DR

[`wquguru/harness-books`](https://github.com/wquguru/harness-books) (2.5k ⭐, GitHub, 2026) — 두 권의 무료 책 *"Harness Engineering"* 가 AI 코딩 에이전트를 시스템적으로 다루는 패턴을 정리했다. 핵심: **모델이 똑똑하길 기다리지 말고, 틀렸을 때를 처리할 시스템 구조를 먼저 만든다.** 프롬프트·쿼리 루프·도구 권한·컨텍스트 거버넌스·오류 복구·다중 에이전트 검증·팀 제도 — 7개 기관의 결합. **BB의 ARP v27 + 4-agent pipeline + feature factory + bb-wiki는 이 책의 작동하는 구현 사례 (9/9 챕터 매핑).**

### 왜 지금 — 2026-06-17

- AI 코딩 에이전트 (Claude Code · Codex · Cursor · Copilot) 가 팀 단위로 도입되는 단계
- 논의 이동: "프롬프트 잘 쓰는 법" → "시스템이 안전한가"
- BB의 SoI (System of Intelligence) 포지셔닝 — *"우리는 모델을 파는 게 아니라 reasoning layer를 판다"* — 와 직접 연결

### The Pattern — 7 Organs, 10 Principles

**7 기관 (system organs):**

| 기관 | 역할 |
|---|---|
| Prompt | control plane의 일부 (장식 아님) |
| Query Loop | runtime의 heartbeat |
| Tools / Permissions | 권한·중단·로깅이 붙은 인터페이스 |
| Context / Memory | working memory 거버넌스 (compact는 예산) |
| Errors / Recovery | first-class 경로, post-incident patch 아님 |
| Multi-agent / Verification | uncertainty를 별도 컨테이너로 분리 |
| Team Institutions | layered CLAUDE.md · hooks · skills · transcripts |

**10 Principles (Book 1 Ch9):** 모델은 teammate 아닌 unstable component / Prompt는 control plane / Query loop은 heartbeat / Tools는 managed interface / Context는 거버넌스 / Error paths는 main paths / Recovery는 continuation 우선 / Multi-agent는 uncertainty 분할 / Verification은 독립 / Team institutions > personal tricks.

### Brown Biotech Coverage — 9/9 챕터 구현

| Book 1 | BB 컴포넌트 |
|---|---|
| Ch2 Prompt is control plane | `prompt_builder.py` + skin engine + command registry |
| Ch3 Query loop heartbeat | `run_agent.py` 동기 루프 + iteration_budget |
| Ch4 Tools/permissions | `tools/approval.py` + toolset 시스템 |
| Ch5 Context/memory/compact | `context_compressor.py` + `prompt_caching.py` + MEMORY + AGENTS.md |
| Ch6 Errors and recovery | `brown-biotech-cron-silent-failure-diagnostics` skill |
| Ch7 Multi-agent & verification | 4-agent pipeline + feature factory + Soft-SVeRL |
| Ch8 Team adoption | skills hub + claude-mirror command pack |
| Ch9 Ten principles | `arp-v27-harness/SKILL.md` canonical checklist |

### BB 차별화 지점 (다른 harness와 구분되는 것)

- **독립 verification (Principle 9)** — Soft-SVeRL partial-credit verdict는 Claude Code / Codex 가 제공하지 않는 **graded decision** 기능. "Verified by ARP v27" 배지 + completeness pricing → Paid Briefs moat
- **컨텍스트 거버넌스 (Principle 5)** — bb-wiki 4-섹션 판단 레이어 (Source Quotes / My Interpretation / Open Questions / Contradictions) 는 단순 compact가 아니라 **AI 요약과 사용자 voice의 강제 분리**
- **팀 제도 (Principle 10)** — skill hub + claude-mirror command pack + Notion operating hub 는 layered CLAUDE.md의 BB 구현

### ⚠️ Caveats

- **책은 Claude Code / Codex 위주** — BB처럼 도메인 특화 (drug discovery) harness 에 그대로 적용은 부분만 가능. ARP v27처럼 18 tools + Verify mode를 별도로 만들어야 하는 이유
- **10 principles는 "원리"이지 "구현"이 아님** — 각 원칙을 실제로 구현하려면 도메인별 추가 작업 필요 (예: Principle 5 컨텍스트 거버넌스 → bb-wiki 4-섹션)
- **Book 2 비교 분석은 BB에 직접 적용 어려움** — Claude Code / Codex 는 vendor 시스템, BB는 자체 harness. 비교는 아이디어 차용용

### CTA — Brown Biotech로

AI 코딩 에이전트를 팀에 도입할 때, *"모델을 고른다"* 보다 먼저 **"이 모델을 묶어둘 harness가 있는가"** 를 자문해야 합니다. Brown Biotech의 ARP v27 + 4-agent pipeline + bb-wiki는 이 책의 9/9 챕터를 **프로덕션 환경에서 구현한 사례**입니다. Paid Brief와 Verify mode의 graded verdict는 *"모델 + 시스템 = 결정 가능한 추론"* 이라는 SoI 포지셔닝의 직접적 증거입니다.

**Back-port actions executed:**
- ✅ `arp-v27-harness/SKILL.md` — "Reference theory" 섹션 + "10 Principles canonical checklist" 추가
- ✅ `bb-wiki/concepts/harness-engineering.md` — 4-섹션 판단 레이어 포함 concept 페이지 신규
- ⏸ research-pulse sidecar (이 문서) — Dr. OCM 검증 대기

**Pattern source files:**
- 📚 [wquguru/harness-books](https://github.com/wquguru/harness-books) — 2.5k ⭐, GitHub, 2026
- 📖 [Book 1 Ch9: Ten Principles](https://github.com/wquguru/harness-books/blob/main/book1-claude-code/locales/en/chapter-09-ten-principles.md)
- 🧠 BB: `bb-wiki/concepts/harness-engineering.md` — full 4-섹션 judgment layer
- 🛠 BB: `arp-v27-harness/SKILL.md` — Reference theory + 10 principles section
- 📜 Claw AI Lab brief: `bb-wiki/concepts/claw_ai_lab_brief.md`

*#ToolingTrack #HarnessEngineering #AgenticAI #MultiAgent #Verification #BrownBiotech #SoI #PaidBriefs #ARPv27 #BBWiki*
