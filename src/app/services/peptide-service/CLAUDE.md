# Peptide Service

## What This Does
Custom peptide synthesis service with sequence analysis, pricing, and order management. Integrates with PRISM pipeline for optimization.

## Key Files
- `page.tsx` — Main service landing page
- Service inquiry form, pricing card components
- FPembed molecular fingerprint engine integration
- ARP v24 / PRISM pipeline integration for sequence optimization

## Local Conventions
- `BACKEND_URL` env var required for API calls
- Service inquiry → `ServiceInquiryCard` component
- Pricing calculations handled client-side

## Commands
```bash
cd src/app/services/peptide-service && npm run dev
```