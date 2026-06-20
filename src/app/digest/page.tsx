import type { Metadata } from "next";
import { Globe, BookOpen, Microscope, BrainCircuit, TrendingUp, FlaskConical, Activity, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brown Biotech Daily Tech Digest",
  description: "Daily research digest — bioinformatics, AI drug discovery, multi-omics, longevity, and biotech infrastructure.",
  alternates: { canonical: "/digest" },
};

const digestCategories = [
  { id: "bioinformatics", label: "Bioinformatics & Multi-Omics", icon: Microscope, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", desc: "DEG, pathway, PPI, single-cell, spatial" },
  { id: "ai-drug-discovery", label: "AI Drug Discovery", icon: BrainCircuit, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", desc: "Foundation models, virtual screening, ARP updates" },
  { id: "longevity", label: "Longevity & Senolytics", icon: Activity, color: "#10B981", bg: "rgba(16,185,129,0.1)", desc: "Senolytic targets, CR mimetics, epi-clocks" },
  { id: "infrastructure", label: "Biotech Infrastructure", icon: TrendingUp, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", desc: "LLMOps, MLOps, data platforms, automation" },
  { id: "clinical", label: "Clinical & Regulatory", icon: Globe, color: "#EF4444", bg: "rgba(239,68,68,0.1)", desc: "FDA updates, trial design, biomarker strategy" },
  { id: "open-science", label: "Open Science & Preprints", icon: BookOpen, color: "#06B6D4", bg: "rgba(6,182,212,0.1)", desc: "bioRxiv, medRxiv, preprint highlights, datasets" },
];

const sampleDigests = [
  {
    id: 21,
    date: "2026-06-21",
    title: "PRC2 perturbation enhancer-connectivity atlas in naive-to-primed hPSC transition (GSE309649, score 9, n=45, mixed, Homo sapiens, pdat 2026/06/10); NRTI-induced progressive senescence-like reprogramming of alveolar macrophages (GSE307329, n=74, ChIP-seq, Homo sapiens, pdat 2026/05/15); anti-Claudin-1 humanized monoclonal antibody for cholangiocarcinoma (GSE262166, n=77, mixed, Homo sapiens, pdat 2026/06/08)",
    category: "bioinformatics",
    summary: "Three fresh hits spanning bioinformatics/multi-omics + AI drug discovery (PRC2 enhancer-connectivity atlas, score 9, n=45), longevity/senolytics + clinical (NRTI-induced senescence-like reprogramming of alveolar macrophages, n=74 ChIP-seq), and AI drug discovery + clinical/regulatory (anti-Claudin-1 humanized mAb for cholangiocarcinoma, n=77 mixed-modality), drawn from the research-watcher's 2026-06-21 scan (today's watch run completed; latest hits.jsonl = 2026-06-20 07:32 KST archive from the 06-20 scan, 105 hits ingested; 72 unique non-digested accessions after de-duplicating against id:16–id:20): (1) Dynamics of poised enhancer connectivity upon PRC2 perturbation during the naive-to-primed transition of human pluripotent stem cells (GSE309649, n=45, pdat 2026/06/10, mixed modality — TXT suppfile, score 9, Homo sapiens, clean license, raw files, no risk signals) — a freshly deposited (pdat = 11 days ago) score-9 chromatin-state atlas dissecting how poised-enhancer 3D connectivity rewires during the naive-to-primed hPSC transition under PRC2 perturbation; this is the cleanest possible epigenetic perturbation design for AI drug discovery (PRC2 / EZH2 / EZH1 inhibitors are a top-3 hot oncology target class — tazemetostat, valemetostat, and the EZH1/2 dual portfolio) and for the multi-omics bioinformatics lane (epigenomic + transcriptomic integration, 3D-chromatin methods). (2) Continuous NRTI-based antiretroviral therapy induces progressive senescence-like reprogramming of alveolar macrophages [ChIP-seq] (GSE307329, n=74, pdat 2026/05/15, transcriptomics / ChIP-seq, score 6, Homo sapiens, clean license, raw files, suppfile BW) — a large n=74 ChIP-seq dissection of how long-term nucleoside reverse-transcriptase inhibitor (NRTI) antiretroviral therapy drives progressive senescence-like reprogramming of alveolar macrophages; this is a direct longevity/senolytics input that connects HIV/antiretroviral-therapy → macrophage senescence → lung aging, and is a clean candidate for the senolytic + immunometabolism brief pipeline (complements the EZH2-cysteine-ferroptosis axis from id:20 and the CMap-repurposing friendly n=93 delayed-aging muscle cohort GSE330697 from id:20). (3) Treatment of cholangiocarcinoma using humanized monoclonal antibodies targeting Claudin-1 (GSE262166, n=77, pdat 2026/06/08, mixed modality — RNA-seq + Other, score 6, Homo sapiens, clean license, raw files, suppfile CSV/TAR) — a large n=77 transcriptomic + antibody-discovery dataset for humanized anti-Claudin-1 (CLDN1) monoclonal-antibody therapy of cholangiocarcinoma (CCA), the biliary-tract cancer with dismal prognosis and rising global incidence; this is a direct AI drug discovery input (antibody-design + biomarker-discovery) and a clean clinical/regulatory brief input for Brown Biotech (companion-diagnostic-friendly surface marker, mature mAb manufacturing paradigm). The HF channel also surfaced a low-but-active cluster of protein-design benchmarks — OATML-Markslab/ProteinGym_v1 (1574 downloads, 8 likes) and genbio-ai/ProteinGYM-DMS (3252 downloads, 1 like) — confirming continued community consolidation around the ProteinGym DMS benchmark suite for AI protein-fitness prediction (relevant to the Brown Biotech AI drug discovery / virtual-screening infrastructure lane).",
    tags: ["PRC2", "EZH2", "EZH1", "PRC2 inhibitor", "tazemetostat", "valemetostat", "poised enhancer", "enhancer connectivity", "3D chromatin", "Hi-C", "ATAC-seq", "ChIP-seq", "naive-to-primed transition", "human pluripotent stem cell", "hPSC", "epigenetic perturbation", "chromatin state", "epigenomic atlas", "bioinformatics", "multi-omics", "open science", "GEO", "AI drug discovery", "NRTI", "nucleoside reverse-transcriptase inhibitor", "antiretroviral therapy", "ART", "alveolar macrophage", "senescence-like reprogramming", "senolytic", "senomorphic", "immunometabolism", "lung aging", "longevity", "biomarker", "CMap repurposing", "Claudin-1", "CLDN1", "cholangiocarcinoma", "CCA", "biliary tract cancer", "humanized monoclonal antibody", "mAb", "antibody therapy", "antibody design", "companion diagnostic", "clinical", "translational", "precision oncology", "FDA", "regulatory", "ProteinGym", "DMS benchmark", "protein fitness", "virtual screening", "biotech infrastructure", "OpenFold"],
    highlights: [
      "PRC2 perturbation enhancer-connectivity atlas in naive-to-primed hPSC (GSE309649, score 9, n=45, pdat 2026/06/10, mixed, Homo sapiens, clean license, raw files, no risk signals, suppfile TXT): freshly deposited (pdat = 2026-06-10) score-9 chromatin-state atlas dissecting how poised-enhancer 3D connectivity rewires during the naive-to-primed hPSC transition under PRC2 perturbation — cleanest possible epigenetic perturbation design for AI drug discovery (PRC2 / EZH2 / EZH1 inhibitors are a top-3 hot oncology target class — tazemetostat, valemetostat, and the EZH1/2 dual portfolio) and direct multi-omics bioinformatics input (epigenomic + transcriptomic + 3D-chromatin integration)",
      "NRTI-induced progressive senescence-like reprogramming of alveolar macrophages (GSE307329, score 6, n=74, pdat 2026/05/15, ChIP-seq, Homo sapiens, clean license, raw files, suppfile BW): large n=74 ChIP-seq dissection of how long-term nucleoside reverse-transcriptase inhibitor (NRTI) antiretroviral therapy drives progressive senescence-like reprogramming of alveolar macrophages — direct longevity/senolytics input that connects HIV/antiretroviral-therapy → macrophage senescence → lung aging; clean candidate for the senolytic + immunometabolism brief pipeline and complements the EZH2-cysteine-ferroptosis axis from id:20",
      "Anti-Claudin-1 humanized mAb for cholangiocarcinoma (GSE262166, score 6, n=77, pdat 2026/06/08, mixed, Homo sapiens, clean license, raw files, suppfile CSV/TAR): large n=77 transcriptomic + antibody-discovery dataset for humanized anti-CLDN1 monoclonal-antibody therapy of cholangiocarcinoma (the biliary-tract cancer with dismal prognosis and rising global incidence) — direct AI drug discovery input (antibody-design + biomarker discovery) and clean clinical/regulatory brief input for Brown Biotech (companion-diagnostic-friendly surface marker, mature mAb manufacturing paradigm)",
      "Combined signal: bioinformatics / multi-omics + AI drug discovery (PRC2 enhancer-connectivity atlas, score 9) + longevity / senolytics + clinical (NRTI-induced alveolar-macrophage senescence-like reprogramming, n=74 ChIP-seq) + AI drug discovery + clinical / regulatory (anti-CLDN1 humanized mAb for cholangiocarcinoma, n=77 mixed) — three orthogonal modalities spanning 5 of 6 Brown Biotech coverage categories (bioinformatics, AI drug discovery, longevity, clinical, open science), all clean-license GEO with raw files available; the watcher's 2026-06-21 run completed today and emitted 105 hits (latest hits.jsonl archived at 2026-06-20 07:32 KST from the prior 06-20 scan); HF channel also confirmed community consolidation around the ProteinGym DMS benchmark suite for AI protein-fitness prediction (OATML-Markslab/ProteinGym_v1, 1574 downloads / 8 likes; genbio-ai/ProteinGYM-DMS, 3252 downloads / 1 like), reinforcing the biotech-infrastructure / virtual-screening lane"
    ],
    actions: [
      { label: "Request bioinformatics / PRC2-enhancer brief", href: "/multiomics#brief" },
      { label: "Request AI drug discovery / CLDN1 antibody brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request longevity / NRTI-senescence brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 20,
    date: "2026-06-20",
    title: "Cross-model spatial + single-cell atlas of osteopontin in polycystic kidney disease (GSE298379, score 7, n=5, mouse, pdat 2026/06/15); Single-Cell Atlas of Pan-Cancer Immunotherapy Reveals the Role of Ferroptosis in Exhausted Macrophages and Immune Therapy Resistance (GSE302068, score 6, n=9, pdat 2025/07/15); Rapamycin Fly Cell Atlas Reveals Sex-Specific Pro-longevity Impacts at cellular resolution (GSE322571, score 4, n=28, Drosophila, pdat 2026/06/02) paired with n=93 exercise-trained human-muscle delayed-aging cohort (GSE330697, score 6, pdat 2026/06/16)",
    category: "bioinformatics",
    summary: "Three fresh score-7/score-6 high-impact hits spanning bioinformatics/multi-omics, clinical/immuno-oncology, and longevity/senolytics, drawn from the research-watcher's 2026-06-20 scan (collected_at 2026-06-19T21:02 UTC = 2026-06-20 06:02 KST; 105 hits ingested in the new 2026-06-20/ output directory; 84 unique non-digested accessions after de-duplicating against id:15–id:19): (1) A cross model spatial and single-cell atlas reveals the conserved involvement of osteopontin in polycystic kidney disease (GSE298379, n=5, pdat 2026/06/15, single-cell + spatial, score 7, Mus musculus, clean license, raw files, suppfile MTX/TSV) — a freshly deposited (pdat = 5 days ago) cross-model single-cell + spatial atlas dissecting the conserved role of osteopontin (SPP1) across mouse models of polycystic kidney disease (PKD); directly relevant to Brown Biotech's renal-fibrosis / nephrology brief pipeline and conceptually pairs with the CTHRC1+ lung-fibrosis hit (GSE331144, id:19) on shared mesenchymal-niche biology. (2) Single-Cell Atlas of Pan-Cancer Immunotherapy Reveals the Role of Ferroptosis in Exhausted Macrophages and Immune Therapy Resistance (GSE302068, n=9, pdat 2025/07/15, single-cell, score 6, Homo sapiens, clean license, raw files, suppfile TXT) — a pan-cancer single-cell immunotherapy atlas dissecting ferroptosis-driven exhaustion in tumor-associated macrophages as a mechanistic driver of immune-therapy resistance; a direct input for Brown Biotech's immuno-oncology / IO-resistance workstream and CMap-repurposing friendly for next-generation ferroptosis-modulating adjuvants (complements the EZH2-cysteine-ferroptosis axis, GSE237951 / GSE268195). (3) Rapamycin Fly Cell Atlas Reveals Sex-Specific Pro-longevity Impacts at cellular resolution (GSE322571, n=28, pdat 2026/06/02, single-cell, score 4, Drosophila melanogaster, clean license, raw files, suppfile H5AD/TAR) — a sex-stratified single-cell atlas of rapamycin's pro-longevity impact in Drosophila at cellular resolution, directly addressing the sex-difference gap in mTOR-inhibitor longevity biology; clean addition to the Brown Biotech longevity/senolytic service and a paired companion to GSE330697 (Delayed molecular aging, preservation of energy metabolism and enhanced exercise response in exercise-trained human muscle, n=93, pdat 2026/06/16, score 6, suppfile TSV) — a large n=93 human-muscle delayed-molecular-aging cohort showing preserved energy metabolism and enhanced exercise response, the strongest human-muscle longevity cohort surfaced this scan.",
    tags: ["osteopontin", "SPP1", "polycystic kidney disease", "PKD", "cross-model atlas", "single-cell + spatial", "spatial transcriptomics", "scRNA-seq", "mouse model", "renal fibrosis", "nephrology", "mesenchymal niche", "bioinformatics", "open science", "GEO", "ferroptosis", "exhausted macrophages", "tumor-associated macrophages", "TAM", "pan-cancer", "cancer immunotherapy", "immune therapy resistance", "IO resistance", "single-cell atlas", "immuno-oncology", "EZH2", "cysteine metabolism", "CMap repurposing", "ferroptosis modulator", "clinical", "rapamycin", "mTOR", "mTOR inhibitor", "pro-longevity", "sex-specific longevity", "sex differences", "Drosophila", "fly cell atlas", "single-cell", "longevity", "senolytic", "senomorphic", "exercise response", "energy metabolism", "delayed molecular aging", "human muscle", "epigenetic clock", "transcriptomic age", "biomarker", "open science"],
    highlights: [
      "Cross-model spatial + single-cell atlas of osteopontin in PKD (GSE298379, score 7, n=5, pdat 2026/06/15, single-cell + spatial, Mus musculus, clean license, raw files, suppfile MTX/TSV): freshly deposited (pdat = 2026-06-15) cross-model single-cell + spatial atlas dissecting the conserved role of osteopontin (SPP1) across mouse models of polycystic kidney disease — direct input for Brown Biotech's renal-fibrosis / nephrology brief pipeline and conceptually pairs with the CTHRC1+ lung-fibrosis hit (GSE331144, id:19) on shared mesenchymal-niche biology",
      "Single-Cell Atlas of Pan-Cancer Immunotherapy Reveals the Role of Ferroptosis in Exhausted Macrophages and Immune Therapy Resistance (GSE302068, score 6, n=9, pdat 2025/07/15, single-cell, Homo sapiens, clean license, raw files, suppfile TXT): pan-cancer single-cell immunotherapy atlas dissecting ferroptosis-driven exhaustion in tumor-associated macrophages as a mechanistic driver of immune-therapy resistance — direct immuno-oncology / IO-resistance workstream input for Brown Biotech and CMap-repurposing friendly for next-generation ferroptosis-modulating adjuvants; complements the EZH2-cysteine-ferroptosis axis (GSE237951 / GSE268195)",
      "Rapamycin Fly Cell Atlas — sex-specific pro-longevity impacts (GSE322571, score 4, n=28, pdat 2026/06/02, single-cell, Drosophila melanogaster, clean license, raw files, suppfile H5AD/TAR): sex-stratified single-cell atlas of rapamycin's pro-longevity impact in Drosophila at cellular resolution — directly addresses the sex-difference gap in mTOR-inhibitor longevity biology; clean addition to the Brown Biotech longevity/senolytic service and companion to the n=93 human-muscle delayed-aging cohort (GSE330697)",
      "Combined signal: bioinformatics / multi-omics (cross-model osteopontin PKD atlas) + clinical immuno-oncology (pan-cancer ferroptosis / TAM-exhaustion atlas) + longevity / senolytics (rapamycin sex-specific fly cell atlas + n=93 exercise-trained human-muscle delayed-aging cohort) — three orthogonal modalities spanning bioinformatics, clinical, and longevity categories, all clean-license GEO with raw files available; the watcher's 2026-06-20 scan (collected_at 2026-06-19T21:02 UTC = 2026-06-20 06:02 KST) ran on its normal 06:00 KST cadence and emitted 105 hits (84 unique non-digested accessions after de-duplicating against id:15–id:19)"
    ],
    actions: [
      { label: "Request bioinformatics / PKD brief", href: "/multiomics#brief" },
      { label: "Request IO-resistance / ferroptosis brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request longevity / mTOR-sex-difference brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 19,
    date: "2026-06-19",
    title: "RNA sequencing of vtRNA-knockout HEK293T cell lines (n=36, score 9, perturbation); single-cell + spatial immune atlas of chronic antibody-mediated rejection reveals a CXCL12-CXCR4 fibroblast-immune niche (score 9, pdat 2026/06/10); transcriptional and spatial profiling of human lung fibroblasts highlights CTHRC1+ cells as fibrogenic signaling hubs (n=9, score 9, pdat 2026/05/29)",
    category: "bioinformatics",
    summary: "Three fresh score-9 high-impact hits spanning AI drug discovery (vtRNA perturbation), clinical/transplantation bioinformatics (chronic antibody-mediated rejection single-cell + spatial atlas), and pulmonary-fibrosis/longevity (CTHRC1+ lung-fibroblast fibrogenic hubs), drawn from the research-watcher's 2026-06-19 scan (collected_at 2026-06-18T21:02:39 UTC = 2026-06-19 06:02 KST; 103 hits ingested in the new 2026-06-19/ output directory; 76 unique non-digested accessions after de-duplicating against id:14–id:18): (1) RNA sequencing of vtRNA-knockout HEK293T cell lines (GSE335700, n=36, pdat 2026/06/17, mixed modality — RNA-seq + Other, score 9, clean license, raw files, perturbation signal, no risk signals, suppfile TXT) — a freshly deposited (pdat = 2 days ago) score-9 KO transcriptomic profiling of vault RNA (vtRNA) in HEK293T, the cleanest possible perturbation design for a still-under-explored non-coding-RNA class (vtRNAs are the RNA component of the vault particle and have rising interest in drug-efflux regulation, apoptosis, and innate immunity); direct AI drug discovery input for the Brown Biotech vtRNA / vault-particle drug-target lane and CMap-repurposing friendly for next-generation non-coding-RNA therapeutics. (2) A single-cell and spatial immune atlas of chronic antibody-mediated rejection reveals autoimmune-shared immune states and a CXCL12-CXCR4 fibroblast-immune niche (GSE328870, pdat 2026/06/10, single-cell + spatial, score 9, clean license, raw files, no risk signals, suppfile RDS/TXT/XLSX) — a score-9 transplantation-immunology atlas dissecting chronic antibody-mediated rejection (cABMR, the leading cause of long-term solid-organ allograft loss) and surfacing a CXCL12-CXCR4 fibroblast-immune niche that mirrors autoimmune-shared immune states; direct input for Brown Biotech's clinical/translational service and a clean reference for the transplant-immunology brief, conceptually paired with the GSE331144 CTHRC1+ fibroblast-fibrosis hit (shared fibroblast-niche angle). (3) Transcriptional and spatial profiling of fibroblasts from human lungs highlights CTHRC1+ cells as fibrogenic signaling hubs in fibrosis (GSE331144, n=9, pdat 2026/05/29, single-cell + spatial, score 9, clean license, raw files, no risk signals, suppfile TXT) — a score-9 single-cell + spatial dissection of CTHRC1+ fibroblasts as fibrogenic signaling hubs in human lung fibrosis, a direct input for the Brown Biotech anti-fibrotic / pulmonary-fibrosis pipeline and a clean CMap-repurposing input for next-generation CTHRC1 / TGF-β-axis inhibitors; complements the CTHRC1+ lung-fibrosis biology already touched in id:12 and the FALD spatial transcriptomics of human fibrotic livers (GSE306111, id:14).",
    tags: ["vtRNA", "vault RNA", "vault particle", "non-coding RNA", "HEK293T", "knockout", "perturbation", "RNA-seq", "CMap repurposing", "AI drug discovery", "chronic antibody-mediated rejection", "cABMR", "transplantation immunology", "solid-organ allograft", "autoimmune-shared immune states", "CXCL12", "CXCR4", "fibroblast-immune niche", "single-cell + spatial", "spatial transcriptomics", "RDS", "open science", "GEO", "CTHRC1", "CTHRC1+ fibroblasts", "fibrogenic signaling hub", "lung fibrosis", "pulmonary fibrosis", "fibroblast", "TGF-β", "anti-fibrotic pipeline", "longevity", "biomarker", "clinical", "translational"],
    highlights: [
      "vtRNA-knockout HEK293T RNA-seq (GSE335700, score 9, n=36, pdat 2026/06/17, mixed, clean license, raw files, perturbation signal, suppfile TXT): freshly deposited (pdat = 2026-06-17) score-9 KO transcriptomic profiling of vault RNA (vtRNA) in HEK293T — clean perturbation design for an under-explored non-coding-RNA class with rising interest in drug-efflux regulation, apoptosis, and innate immunity; direct AI drug discovery input for the Brown Biotech vtRNA / vault-particle drug-target lane and CMap-repurposing friendly for next-generation non-coding-RNA therapeutics",
      "Single-cell + spatial immune atlas of chronic antibody-mediated rejection (GSE328870, score 9, pdat 2026/06/10, single-cell + spatial, clean license, raw files, suppfile RDS/TXT/XLSX): score-9 transplantation-immunology atlas dissecting cABMR (the leading cause of long-term solid-organ allograft loss) and surfacing a CXCL12-CXCR4 fibroblast-immune niche that mirrors autoimmune-shared immune states — direct input for Brown Biotech's clinical/translational service and clean reference for the transplant-immunology brief; conceptually paired with the GSE331144 CTHRC1+ fibroblast-fibrosis hit (shared fibroblast-niche angle)",
      "CTHRC1+ fibroblasts as fibrogenic signaling hubs in human lung fibrosis (GSE331144, score 9, n=9, pdat 2026/05/29, single-cell + spatial, clean license, raw files, suppfile TXT): score-9 single-cell + spatial dissection of CTHRC1+ fibroblasts as fibrogenic signaling hubs in human lung fibrosis — direct input for the Brown Biotech anti-fibrotic / pulmonary-fibrosis pipeline and clean CMap-repurposing input for next-generation CTHRC1 / TGF-β-axis inhibitors; complements the CTHRC1+ lung-fibrosis biology touched in id:12 and the FALD spatial transcriptomics of human fibrotic livers (GSE306111, id:14)",
      "Combined signal: AI drug discovery non-coding-RNA perturbation (vtRNA) + clinical/transplantation bioinformatics single-cell + spatial atlas (cABMR CXCL12-CXCR4 niche) + pulmonary-fibrosis/longevity single-cell + spatial (CTHRC1+ fibroblast hubs) — three orthogonal modalities spanning AI drug discovery, clinical, and longevity categories, all clean-license GEO with raw files available; the watcher's 2026-06-19 scan (collected_at 2026-06-18T21:02:39 UTC = 2026-06-19 06:02 KST) ran on its normal 06:00 KST cadence and emitted 103 hits (76 unique non-digested accessions after de-duplicating against id:14–id:18)"
    ],
    actions: [
      { label: "Request AI drug discovery / vtRNA brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request transplant immunology / cABMR brief", href: "/services/biostatx#brief" },
      { label: "Request anti-fibrotic / lung fibrosis brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 18,
    date: "2026-06-18",
    title: "Single-cell + spatial atlas of CD8+ exhausted T cells in pancreatic ductal adenocarcinoma (n=15, score 9, pdat 2026/06/16); subtype-specific dependencies and drug vulnerabilities enable precision therapeutics in head-and-neck cancer (n=16, score 9, metabolism + perturbation); standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets (n=38, score 9, methodology)",
    category: "bioinformatics",
    summary: "Three fresh score-9 high-impact hits spanning bioinformatics/multi-omics, clinical precision-oncology, and biotech-infrastructure methodology, drawn from the research-watcher's 2026-06-18 scan (collected_at 2026-06-17T21:02 UTC = 2026-06-18 06:02 KST; 103 hits ingested in the new 2026-06-18/ output directory): (1) Single-cell RNA-seq and spatial transcriptomics characterize CD8+ exhausted T cells in pancreatic ductal adenocarcinoma (GSE335452, n=15, pdat 2026/06/16, single-cell + spatial, score 9, clean license, raw files, no risk signals, suppfile MTX/TSV) — a freshly deposited (pdat = 2 days ago) score-9 single-cell + spatial atlas of CD8+ T cell exhaustion in pancreatic ductal adenocarcinoma (PDAC), the canonical immune-excluded / immune-exhausted tumor where checkpoint-inhibitor response rates remain stubbornly low; a direct input for Brown Biotech's IO-exhaustion / IO-toxicity workstream (spatially pairs with the GSE322277/GSE322681 ICI-neuroinflammation bundle digested in id:13) and a clean CMap-repurposing input for next-generation T-cell-engager and exhaustion-reversing targets across the LAG-3 / TIM-3 / TIGIT / CD39 / TOX / NR4A axis. (2) Subtype-Specific Dependencies and Drug Vulnerabilities Enable Precision Therapeutics in Head and Neck Cancer (GSE311507, n=16, pdat 2026/06/01, RNA-seq, score 9, clean license, raw files, metabolism + perturbation signal, no risk signals, suppfile CSV) — a score-9 subtype-specific dependency and drug-vulnerability dataset in head-and-neck squamous cell carcinoma (HNSCC) that maps precision-therapeutic entry points via perturbation profiling, a direct input for Brown Biotech's precision-oncology service and a clean addition to the HNSCC CMap-repurposing brief pipeline. (3) Standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets (GSE277080, n=38, pdat 2025/07/28, single-cell + spatial, score 9, clean license, raw files, no risk signals, suppfile CSV/TAR) — a large n=38 methodology / infrastructure dataset that proposes standardized reproducibility metrics for imaging-based spatial transcriptomics (Xenium / MERFISH / CosMx); directly relevant to the Brown Biotech spatial-cohort QC pipeline and the broader biotech-infrastructure / data-platform lane, and conceptually paired with the FFPE MERFISH (GSE299886) + Xenium (GSE300007) and FFPE CosMx (GSE308146) + MERSCOPE (GSE308147) + Xenium (GSE308148) benchmark bundles also surfaced in this scan.",
    tags: ["CD8+ exhausted T cells", "T cell exhaustion", "pancreatic ductal adenocarcinoma", "PDAC", "pancreatic cancer", "immune checkpoint inhibitor", "ICI", "single-cell + spatial", "spatial transcriptomics", "scRNA-seq", "TOX", "NR4A", "LAG-3", "TIM-3", "TIGIT", "CD39", "T cell engager", "CMap repurposing", "IO toxicity", "IO exhaustion", "AI drug discovery", "subtype-specific dependencies", "drug vulnerabilities", "head and neck cancer", "HNSCC", "precision oncology", "perturbation", "metabolism", "OXPHOS", "precision therapeutics", "clinical", "standardized metrics", "imaging spatial transcriptomics", "Xenium", "MERFISH", "CosMx", "MERSCOPE", "reproducibility", "QC pipeline", "methodology", "biotech infrastructure", "data platform", "open science", "GEO"],
    highlights: [
      "CD8+ exhausted T cells in PDAC single-cell + spatial atlas (GSE335452, score 9, n=15, pdat 2026/06/16, single-cell + spatial, clean license, raw files, no risk signals, suppfile MTX/TSV): freshly deposited (pdat = 2026-06-16) score-9 single-cell + spatial atlas of CD8+ T cell exhaustion in pancreatic ductal adenocarcinoma — direct IO-exhaustion input for Brown Biotech's AI drug discovery workstream and CMap-repurposing friendly for next-generation exhaustion-reversing targets (LAG-3 / TIM-3 / TIGIT / CD39 / TOX / NR4A axis); spatially pairs with the GSE322277/GSE322681 ICI-neuroinflammation MERFISH+RNA-Seq bundle digested in id:13",
      "Subtype-Specific Dependencies and Drug Vulnerabilities in HNSCC (GSE311507, score 9, n=16, pdat 2026/06/01, RNA-seq, clean license, raw files, metabolism + perturbation signal, no risk signals, suppfile CSV): score-9 subtype-specific dependency / drug-vulnerability dataset in head-and-neck squamous cell carcinoma that maps precision-therapeutic entry points via perturbation profiling — direct input for Brown Biotech's precision-oncology service and clean HNSCC CMap-repurposing brief input",
      "Standardized metrics for imaging-based spatial transcriptomics (GSE277080, score 9, n=38, pdat 2025/07/28, single-cell + spatial, clean license, raw files, no risk signals, suppfile CSV/TAR): large n=38 methodology / infrastructure dataset proposing standardized reproducibility metrics for imaging-based spatial transcriptomics (Xenium / MERFISH / CosMx) — directly relevant to the Brown Biotech spatial-cohort QC pipeline and the broader biotech-infrastructure / data-platform lane; conceptually paired with the FFPE MERFISH (GSE299886, n=3) + Xenium (GSE300007, n=6) and FFPE CosMx (GSE308146, n=4) + MERSCOPE (GSE308147, n=6) + Xenium (GSE308148, n=8) benchmark bundles also surfaced in this scan",
      "Combined signal: bioinformatics / multi-omics (CD8+ T cell exhaustion in PDAC) + clinical precision-oncology (HNSCC subtype-specific dependencies) + biotech infrastructure (standardized spatial QC metrics) — three orthogonal modalities spanning bioinformatics, clinical, and infrastructure categories, all clean-license GEO with raw files available; the watcher's 2026-06-18 scan (collected_at 2026-06-17T21:02 UTC = 2026-06-18 06:02 KST) ran on its normal 06:00 KST cadence and emitted 103 hits"
    ],
    actions: [
      { label: "Request IO-exhaustion / pancreatic cancer brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request precision oncology / HNSCC brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request spatial transcriptomics QC brief", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 17,
    date: "2026-06-17",
    title: "Cross-species adrenal gland sexual-dimorphism atlas (n=31, score 9, mixed-modality + single-cell/spatial); PRMT2 wild-type vs knockout in KG-1a AML cells (n=9, score 9, perturbation); HCFC2 knockdown in human colorectal cancer cell lines (n=18, score 9, metabolism)",
    category: "bioinformatics",
    summary: "Three fresh score-9 high-impact hits spanning bioinformatics/multi-omics, AI drug discovery/perturbation, and clinical precision-oncology metabolism, drawn from the research-watcher's 2026-06-17 scan (collected_at 2026-06-16T21:02:32 UTC = 2026-06-17 06:02 KST; 104 hits ingested in the new 2026-06-17/ output directory): (1) Human and mouse adrenal glands are characterized by species-specific and sexually-dimorphic heterogeneity and tissue turnover (GSE253852, n=31, pdat 2026/05/11, mixed modality — RNA-seq + Other — including H5/H5AD/PARQUET/JSON/PNG/TIFF suppfiles, score 9, clean license, raw files, single-cell + spatial pairing) — a large n=31 cross-species adrenal atlas dissecting sexually-dimorphic heterogeneity and tissue turnover in Homo sapiens + Mus musculus, a fresh open-science reference atlas for adrenal endocrinology, sex-difference biology, and aging-tissue-turnover work, with direct applicability to Brown Biotech's longevity service (adrenal-pause / HPA-axis aging) and to AI drug discovery for stress-hormone axis modulators. (2) Transcriptomic profiling of PRMT2 wild-type and PRMT2 knockout KG-1a acute myeloid leukemia cells (GSE334988, n=9, pdat 2026/06/15, mixed modality, score 9, clean license, raw files, perturbation signal) — clean WT-vs-KO transcriptomic dissection of PRMT2 in KG-1a AML, a strong fit for Brown Biotech's AI drug discovery lane (PRMT2 is a Type I protein arginine methyltransferase with rising cancer-drug-discovery interest) and CMap-repurposing friendly for next-generation PRMT inhibitors; the WT-vs-KO perturbation design is the cleanest possible input for differential-expression + pathway-enrichment methodology. (3) HCFC2 knockdown in human colorectal cancer cell lines (GSE335441, n=18, pdat 2026/06/15, RNA-seq, score 9, clean license, raw files, metabolism + perturbation signal) — knockdown transcriptomic profiling of HCFC2 (Host Cell Factor C2) in CRC cell lines, n=18 cohort, a direct CMap-repurposing input for HCFC2-class chromatin regulators in colorectal cancer and a precision-oncology brief input for the Brown Biotech clinical/translational service.",
    tags: ["adrenal gland", "sexual dimorphism", "species-specific heterogeneity", "tissue turnover", "cross-species atlas", "Homo sapiens", "Mus musculus", "single-cell + spatial", "mixed modality", "open science", "reference atlas", "HPA axis", "adrenal-pause", "longevity", "stress-hormone", "PRMT2", "PRMT", "protein arginine methyltransferase", "KG-1a", "acute myeloid leukemia", "AML", "knockout", "transcriptomic profiling", "perturbation", "WT vs KO", "differential expression", "pathway enrichment", "CMap repurposing", "AI drug discovery", "HCFC2", "Host Cell Factor C2", "colorectal cancer", "CRC", "knockdown", "metabolism", "chromatin regulator", "precision oncology", "GEO"],
    highlights: [
      "Cross-species adrenal sexual-dimorphism atlas (GSE253852, score 9, n=31, pdat 2026/05/11, mixed modality, clean license, raw files, single-cell + spatial pairing, suppfile CSV/H5/H5AD/JPG/JSON/PARQUET/PNG/TIFF/TXT): large n=31 cross-species (Homo sapiens + Mus musculus) adrenal atlas dissecting sexually-dimorphic heterogeneity and tissue turnover — fresh open-science reference atlas for adrenal endocrinology, sex-difference biology, and aging-tissue-turnover; direct longevity-service input (HPA-axis / adrenal-pause) and AI drug discovery angle for stress-hormone axis modulators",
      "PRMT2 wild-type vs knockout in KG-1a AML (GSE334988, score 9, n=9, pdat 2026/06/15, mixed modality, clean license, raw files, perturbation signal, suppfile TAB/TSV): clean WT-vs-KO transcriptomic dissection of PRMT2 in KG-1a acute myeloid leukemia — direct AI drug discovery input for next-generation PRMT inhibitors; cleanest possible perturbation design for DEG + pathway-enrichment methodology and CMap-repurposing analysis (Type I PRMT axis)",
      "HCFC2 knockdown in human colorectal cancer cell lines (GSE335441, score 9, n=18, pdat 2026/06/15, RNA-seq, clean license, raw files, metabolism + perturbation signal, suppfile CSV): n=18 knockdown transcriptomic profiling of HCFC2 (Host Cell Factor C2) in CRC — direct CMap-repurposing input for HCFC2-class chromatin regulators in colorectal cancer and precision-oncology brief input for the Brown Biotech clinical/translational service",
      "Combined signal: open-science cross-species reference atlas (adrenal) + AI drug discovery perturbation (PRMT2 in AML) + clinical precision-oncology metabolism (HCFC2 in CRC) — three orthogonal modalities spanning bioinformatics, AI drug discovery, and clinical categories, all clean-license GEO with raw files available; the watcher's 2026-06-17 scan (collected_at 2026-06-16T21:02:32 UTC) ran on its normal 06:00 KST cadence and emitted 104 hits"
    ],
    actions: [
      { label: "Request bioinformatics / multi-omics brief", href: "/multiomics#brief" },
      { label: "Request AI drug discovery / PRMT inhibitor brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  ];

export default function DigestPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Updated daily · 06:00 KST
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Decision-ready signal,</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                every morning.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Bioinformatics · AI Drug Discovery · Longevity · Infrastructure · Clinical · Open Science — curated from PubMed, bioRxiv, Nature, and industry sources.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Coverage areas</h2>
          <span className="text-sm text-zinc-500">6 research domains</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {digestCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${cat.bg}, transparent)` }}
                />
                <div className="relative">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: cat.color }} />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{cat.label}</p>
                  <p className="text-xs text-zinc-500">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Digests */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Recent digests</h2>
          <p className="mt-1 text-sm text-zinc-500">Latest research highlights with Brown Biotech commentary</p>
        </div>
        <div className="space-y-4">
          {sampleDigests.map((digest, idx) => (
            <article
              key={digest.id}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-all duration-300"
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl bg-gradient-to-b from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 font-mono">
                      {digest.date}
                    </span>
                    <span 
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ 
                        backgroundColor: digestCategories.find(c => c.id === digest.category)?.bg,
                        color: digestCategories.find(c => c.id === digest.category)?.color
                      }}
                    >
                      {digest.category.replace("-", " ")}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{digest.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{digest.summary}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {digest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-500 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-2.5 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Key highlights</p>
                    <ul className="space-y-2">
                      {digest.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/60 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                {digest.actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200"
                  >
                    {action.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}