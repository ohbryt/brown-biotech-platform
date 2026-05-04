# Brown Biotech GitHub Operations

This document defines the repo / CI / deployment setup for Brown Biotech.

## 1) GitHub Secrets checklist

### Main repo (`brown-biotech-website`)
Add these repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID_MAIN`
- `VERCEL_PROJECT_ID_SERVICE` *(only needed if the same repo also deploys a service branch)*

### Service repo (`brown-biotech-services`)
Add these repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID_SERVICE`

### Optional secrets / settings
- `NEXT_PUBLIC_SITE_URL` should be set in workflow env, not as a secret.
- If a repo needs GitHub API access in workflows, use `GITHUB_TOKEN` by default unless a fine-grained PAT is required.

### Secret rotation checklist
- Rotate `VERCEL_TOKEN` if it was exposed anywhere.
- Confirm the Vercel project IDs match the intended app before enabling production deploys.
- Keep main and service secrets separate when the service repo is split out.

---

## 2) Vercel project ↔ domain mapping

| Repo | Vercel Project | Canonical Domain | Aliases / Notes |
|---|---|---|---|
| `brown-biotech-website` | Main project | `https://brownbio.tech` | `https://www.brownbio.tech`, `https://brownbio.co.kr` |
| `brown-biotech-services` | Service project | `https://services.brownbio.tech` | Service-specific intake / product landing pages |

### Current recommended split
- **Main repo**: corporate site, trust pages, Korea-facing official site, company-wide content.
- **Service repo**: service landing pages, lead capture, intake forms, product/service experiments.

---

## 3) Branch protection / PR rules

### Protected branches
- `main` (current main branch)
- `service` (service deployment branch)

### Required status checks
For PRs into protected branches, require:
- `Brown Biotech CI / build`

### Recommended protections
- Require pull request before merging
- Require at least 1 approving review
- Dismiss stale approvals when new commits are pushed
- Require conversation resolution before merge
- Restrict direct pushes to protected branches
- Prefer squash merge for clean history
- Optional: require signed commits for maintainers

### PR rules
- Use conventional commits in the PR title when possible.
- Keep PRs small and scoped to one deploy target.
- Include a short test note in the PR body.
- If the PR changes deployment or domain mapping, include a verification note.
- No direct pushes to `master` or `service` except emergency fixes.

### Suggested PR template fields
- Summary
- Why this change
- Test plan
- Deployment impact
- Domain / alias changes

---

## 4) Multi-repo structure

### Recommended repo set

#### A. `brown-biotech-website`
Purpose:
- Main corporate site
- Trust / branding / company overview
- Korea-facing official page
- Main SEO and company narrative

Deploys to:
- `brownbio.tech`
- `www.brownbio.tech`
- `brownbio.co.kr`

#### B. `brown-biotech-services`
Purpose:
- Service catalog
- Lead capture
- Intake forms
- Service-specific landing pages
- Experiments that should not affect the main corporate site

Deploys to:
- `services.brownbio.tech`

### Optional future repos
- `brown-biotech-labs` — research / experiments / internal tools
- `brown-biotech-content` — long-form content and knowledge base
- `brown-biotech-infra` — shared automation, deployment scripts, and templates

### Why split repos?
- Cleaner deployment boundaries
- Safer domain changes
- Easier branch protection
- Smaller PRs and faster review
- Separate ownership for corporate vs. service assets

---

## 5) Deployment workflow summary

### Main pipeline
- Trigger: push to `main`
- Build: `npm ci && npm run build`
- Deploy: Vercel production deploy
- Alias: main domains

### Service pipeline
- Trigger: push to `service` (or use a separate service repo)
- Build: `npm ci && npm run build`
- Deploy: Vercel production deploy
- Alias: service domain

### PR validation workflow
- Trigger: pull requests to `main` and `service`
- Build only
- No production deploy

---

## 6) Operational checklist
1. Add or rotate secrets.
2. Confirm Vercel project IDs.
3. Confirm branch protection rules.
4. Create the service repo when service scope is large enough.
5. Keep main and service domains separate.
6. Require CI green before merge.
