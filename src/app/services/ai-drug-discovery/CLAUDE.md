# AI Drug Discovery

## What This Does
Molecular design and discovery service using FPembed molecular fingerprint engine and PRISM optimization pipeline. Delivers decision-scored candidates ranked by synthetic accessibility, off-target liability, and ADMET prediction confidence.

## Key Files
- `page.tsx` — Full service landing page
- FPembed molecular fingerprint engine integration
- ARP v24 reasoning layer for pharmacophore hypothesis evaluation

## System of Intelligence
1. FPembed encodes each molecule in high-dimensional chemical space
2. ARP v24 reasoning layer evaluates pharmacokinetic relevance, structural novelty, target alignment
3. Decision-scored candidates ranked by:
   - Synthetic accessibility
   - Off-target liability
   - ADMET prediction confidence
   - Target alignment

## Integration Points
- Peptide Service: shared PRISM optimization pathways
- ARP v24 pipeline: backbone for molecular reasoning
- FPembed: molecular fingerprint engine

## Commands
```bash
cd src/app/services/ai-drug-discovery && npm run dev
```

## Local Conventions
- Inquiry flow → ServiceInquiryCard component
- Target hypotheses submitted for PRISM scoring
- Results returned as ranked candidate lists with confidence scores