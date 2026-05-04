# Brown Biotech Deployment Guide

This repository now has two GitHub Actions pipelines:

## 1) Main pipeline
- Workflow: `.github/workflows/main-pipeline.yml`
- Trigger: push to `master` or manual dispatch
- Target: the main Brown Biotech company site
- Canonical URL: `https://brownbio.tech`
- Extra aliases: `https://www.brownbio.tech`, `https://brownbio.co.kr`

## 2) Service pipeline
- Workflow: `.github/workflows/service-pipeline.yml`
- Trigger: push to `service` or manual dispatch
- Target: the service-focused site
- Canonical URL: `https://services.brownbio.tech`

## Required GitHub secrets
Create these in the repository settings:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID_MAIN`
- `VERCEL_PROJECT_ID_SERVICE`

## Notes
- The app already reads `NEXT_PUBLIC_SITE_URL`, so metadata and schema will match the deployed domain.
- Domain aliasing is handled by the workflow using the Vercel CLI.
- If you want different service domains later, update `SERVICE_DOMAIN` in the service workflow.
- If you want the Korean site to be a separate project later, split it into its own service pipeline and swap `KR_DOMAIN` to that workflow.

## Recommended setup order
1. Add the secrets above.
2. Confirm `brownbio.tech`, `www.brownbio.tech`, and `brownbio.co.kr` are added in Vercel.
3. Confirm `services.brownbio.tech` is added in Vercel.
4. Push to `main` to deploy the main site.
5. Push to `service` to deploy the service site.
