# Brown Biotech Platform

## Architecture
- Main app: Next.js App Router, TypeScript, Tailwind CSS (src/app/)
- Services: src/app/services/{service-name}/ — each self-contained
- Shared components: src/components/
- Operator portal: src/app/operator/ (internal)
- API routes: src/app/api/
- Browser tests: src/app/browser-test/ (Playwright)

## Critical Gotchas
- NEVER run build/test from repo root — cd to specific service directory
- peptide-service requires BACKEND_URL env var
- src/app/browser-test/ = Playwright QA suite

## Navigation
- Services → src/app/services/
- Shared components → src/components/
- Operator portal → src/app/operator/
- Research docs → root-level BROWN_BIOTECH_*.md files

## Commands
```bash
# Next.js dev (from src/app)
cd src/app && npm install && npm run dev

# Per-service
cd src/app/services/<service> && npm install && npm run dev

# Vercel deploy
vercel pull && vercel deploy
```

## Maintenance
- Keep root CLAUDE.md lean — pointers + gotchas only
- Full review every 3-6 months after model releases
- Update local CLAUDE.md after any service-level refactor