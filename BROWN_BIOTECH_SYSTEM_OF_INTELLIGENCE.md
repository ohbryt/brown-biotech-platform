# Brown Biotech — System of Intelligence Positioning

**Source:** a16z "System of Record → System of Intelligence" (2026-05-18)
**Applied to:** Paid Briefs 카피 · Notion HQ 구조 · 투자자Deck · ARP v24 정당화

---

## Framework: SoR → SoI

| Layer | Description | Brown Biotech analogy |
|-------|-------------|----------------------|
| **System of Record (SoR)** | Database — your CRM, EHR, LIMS, GEO, PubMed | 데이터베이스 레이어 (PubMed, ClinicalTrials, ChEMBL, GEO) |
| **System of Intelligence (SoI)** | AI inference layer that reads, writes, and reasons over SoR | Hermes Agent + ARP v24 |

> "파운데이션 모델은 GTM 애플리케이션이 아니다 — Oracle의 데이터베이스 엔진이 CRM이 아닌 것과 동일."
> 같은 논리로: LLM 자체는 리서치 결과가 아니다. LLM 위에서 도메인 특화된 오케스트레이션이 리서치다.

---

## Brown Biotech Already Does This

```
PubMed / ClinicalTrials / ChEMBL / GEO  ← SoR (데이터베이스)
        ↓ 읽고 · 쓰고 · 추론하는 레이어
    Hermes Agent + ARP v24                ← SoI (오케스트레이션)
        ↓ decision-ready 출력
    Paid Briefs → Notion DB               ← 제도적 기억
```

### 매일 아침 실행되는 SoI:
- Morning triage cron → 28개 저널 스캔 → Notion DB 자동 기록
- Research watcher cron → 27개 쿼리 → 97개 히트 스코어링
- Hermes Agent → decision-ready brief 생성 → human approval

### 기존 문서와 연결:
- `BROWN_BIOTECH_HQ.md` — 운영 모드 (Brief / Discovery / Delivery / Review / Track)
- `BROWN_BIOTECH_RESEARCH_WATCHER_SPEC.md` — SoR → SoI 실행기
- `BROWN_BIOTECH_NOTION_OPERATING_HUB.md` — SoI 출력의 목적지

---

## Paid Briefs 포지셔닝 언어

### Core Statement
> Brown Biotech는 **데이터베이스가 아니라 추론을 판다.**
> PubMed·ClinicalTrials·ChEMBL·GEO 같은 SoR에서 직접 읽고,
> 특정 비즈니스 질문 위에 추론 레이어를 얹어 decision-ready brief로 배달한다.

### 사용하지 않을 것 (overused):
- "AI-powered" / "cutting-edge AI" / "state-of-the-art model"
- "맞춤형 리서치" (too generic)
- "빠른 결과" / "효율적" (price signal, not quality signal)

### 사용할 것 (differentiated):
- **"System of Intelligence" 직접 활용:**
  > "We don't sell database access. We sell the reasoning layer on top of it."
- **"Decision-ready"** — 매핑된 액션 아이템까지 포함
- **"制度적 기억"** — 매번 fresh context, 담당자 의존 없음
- **"Human in the loop"** — high-stakes는 반드시 담당자 리뷰

---

## a16z 인사이트 — Brown Biotech에 적용

### ① 전환 비용의 원천
| Old | New |
|-----|-----|
| "모든 고객 데이터가 Salesforce에 있다" | "모든 워크플로우 · 추론 · 축적된 맥락이 Brown Biotech Agent에 있다" |
| 데이터_LOCK → 전환 비용 | 추론_LOCK → 전환 비용 |

### ② 데이터 품질이 실제로 올라간 사례
> "통화를 듣고 구조화된 노트를 자동으로 기록하는 에이전트 덕분에 CRM 내 데이터가 이전보다 훨씬 풍부해졌고, 담당자들이 CRM을 다시 참고할 이유가 생김"

**Brown Biotech 버전에 해당:** morning triage가 매일 28개 저널을 자동 수집 → Notion DB가 매일 풍부해짐 → 담당자가 실제로 참고하게 됨

### ③ 전체 파이가 커지는 구조
> "뉴스피드가 소셜 미디어의 TAM을 '관심 있는 모든 것'으로 확장한 것처럼, 에이전트 혁명은 소프트웨어가 과금할 수 있는 범위를 확장"

**Brown Biotech 버전:** "관심 있는 모든 biotech 질문" = Paid Briefs TAM. 매주 새로운 논문·데이터가 나오므로brief 수요가 확장적.

### ④ 제도적 기억의 보존
> "담당자가 이직할 때 제도적 지식이 유출되지만, 시스템 오브 인텔리전스는 퇴사 시 후임에게 전체를 인계 가능"

**Brown Biotech 버전:** 매번 brief가 생성될 때마다 Notion DB에 아카이브 → 이전 brief는 언제든 검색 가능 → 프로젝트 맥락의 연속성 보장

---

## Notion HQ 구조에 적용

```
Brown Biotech HQ (Notion)
├── 🧠 System of Intelligence          ← Hermes Agent 운영 로그
│   ├── Morning triage (06:00 KST)     ← 자동 수집 결과
│   ├── Research watcher (매주 스캔)   ← 27개 쿼리 히트
│   └── Paid Briefs delivery log       ← decision-ready 아카이브
├── 📋 Operations Room
│   ├── Intake queue                   ← request → triage → routing
│   ├── Owner map                      ← 현재 owner × next action
│   └── Weekly review                  ← wins / blockers / decisions
└── 🗂️ Knowledge Base
    ├── Publications                   ← manuscript draft 아카이브
    ├── Partner funnel                 ← prospects + stage
    └── SOPs + playbooks               ← 운영 표준
```

---

## 다음 단계

- [ ] 이 문서를 Notion HQ에 SoI 프레임으로 게시
- [ ] Paid Briefs 서비스 카피에 "System of Intelligence" 언어 반영
- [ ] ARP v24 README에 SoR/SoI 구조 명시
- [ ] 투자자Deck에 "制度적 기억" → "추론_LOCK" 슬라이드 추가