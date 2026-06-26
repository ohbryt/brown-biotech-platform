# Biostatx

## What This Does
Statistical analysis and bioinformatics service for research data.

## Key Files
- `page.tsx` — Service landing page
- `PrismLivePreview.tsx` — Client-side live RAG preview wired to PRISM FastAPI via `NEXT_PUBLIC_PRISM_URL`

## Commands
```bash
cd src/app && npm run dev   # or npm run dev from repo root
```

## Env vars
- `NEXT_PUBLIC_PRISM_URL` — PRISM FastAPI backend URL.
  - Local dev: `http://localhost:8765` (uvicorn on the PRISM repo)
  - Production: Railway/Render deployment URL (set via Vercel project env)
- If unset, the Live Preview section is hidden and `/api/inquiry` silently skips the PRISM side-effect. No errors.

## PRISM Wiring
- `ServiceInquiryCard` POSTs to `/api/inquiry` (Next.js API route).
- `src/app/api/inquiry/route.ts` POST handler, when `serviceLane === "biostatx"`, fires a non-blocking PRISM `/rag/query` via `maybeRunPrismPreview()` and returns the result as `prismPreview` in the response payload.
- `PrismLivePreview.tsx` lets visitors run live RAG queries against the same backend — no intake form required.

## Backend Stack
- Retrieval: TurboVectorStore (MiniLM-L6-v2 + TurboQuant 4-bit, 19 chunks from 15 PubMed articles)
- Generation: MedGemma 4B Q4_K_M (llama.cpp, local on Mac mini M4 Pro)
- Ingestion: `rag/reingest_turbovec_with_metadata.py` from `pubmed_articles.json`