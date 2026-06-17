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
  {
    id: 16,
    date: "2026-06-16",
    title: "Non-coding GWAS loci in heart failure dissected via matched ATAC-seq + Hi-C + Perturb-seq + RNA-seq (4-accession bundle, score 9, n=18); Xenium spatial atlas of muscle-invasive bladder cancer exposes lineage-specific vulnerabilities (score 9, n=5); paired spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis (score 7/7, n=17, mouse)",
    category: "bioinformatics",
    summary: "Three fresh high-impact hits spanning bioinformatics/AI drug discovery, precision oncology, and developmental spatial biology, drawn from the research-watcher's 2026-06-15 scan (collected_at 2026-06-14T21:02 UTC; 104 hits ingested, 82 new accessions not yet digested after de-duplicating against id:10–id:15): (1) Dissecting Non-Coding GWAS Loci with High-Resolution 3D Chromatin Interactions Reveals Causal Genes with Relevance to Heart Failure delivers a matched 4-accession multi-omic bundle — ATAC-seq (GSE281462, n=4) + Hi-C (GSE281463, n=4) + Perturb-seq (GSE281464, n=7) + RNA-seq (GSE281465, n=3), pdat 2025/06/16, all score 9, clean license, raw files, perturbation signal — a score-9 multi-modal dissection of non-coding GWAS loci in heart failure that links 3D chromatin architecture to causal gene regulatory programs, directly actionable for Brown Biotech's cardiac-fibrosis pipeline and the CMap repurposing lane. (2) A Xenium Spatial Atlas of Muscle-Invasive Bladder Cancer Reveals Lineage-Specific Vulnerabilities (GSE326226, n=5, pdat 2026/05/05, single-cell + spatial, clean license, raw files, score 9) — first score-9 Xenium bladder-cancer atlas exposing lineage-specific vulnerabilities, a direct precision-oncology brief input and a clean addition to the Brown Biotech spatial-cohort pipeline (promoted from id:14 backlog). (3) Spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis — paired Visium HD (GSE303344, n=3) + scRNA-Seq (GSE303460, n=14), pdat 2026/05/20, mouse, score 7/7, single-cell + spatial — paired spatiotemporal dissection of suture stem-cell dynamics in a developmental disorder, useful for the spatial + DEG methodology lane and the craniofacial developmental-biology brief (promoted from id:14 backlog).",
    tags: ["non-coding GWAS", "heart failure", "3D chromatin", "ATAC-seq", "Hi-C", "Perturb-seq", "RNA-seq", "multi-omic bundle", "causal gene regulatory program", "cardiac fibrosis", "CMap repurposing", "Xenium", "bladder cancer", "muscle-invasive bladder cancer", "lineage-specific vulnerability", "precision oncology", "single-cell + spatial", "spatial transcriptomics", "Visium HD", "scRNA-Seq", "suture stem cell", "craniosynostosis", "spatiotemporal atlas", "developmental biology", "bioinformatics", "open science", "GEO"],
    highlights: [
      "Non-coding GWAS in heart failure — 4-accession multi-omic bundle (GSE281462 ATAC-seq n=4 + GSE281463 Hi-C n=4 + GSE281464 Perturb-seq n=7 + GSE281465 RNA-seq n=3, score 9/9/9/9, pdat 2025/06/16, all clean license + raw files + perturbation signal): score-9 multi-modal dissection of non-coding GWAS loci in heart failure linking 3D chromatin architecture to causal gene regulatory programs — direct cardiac-fibrosis pipeline input and CMap repurposing angle for Brown Biotech's AI drug discovery service",
      "Xenium Spatial Atlas of muscle-invasive bladder cancer (GSE326226, score 9, n=5, pdat 2026/05/05, single-cell + spatial, clean license, raw files, suppfile CSV/H5/PARQUET/TIFF): first score-9 Xenium bladder-cancer atlas exposing lineage-specific vulnerabilities — direct precision-oncology brief input and clean addition to the Brown Biotech spatial-cohort pipeline (promoted from id:14 backlog)",
      "Spatiotemporal suture-stem-cell atlas in craniosynostosis — paired Visium HD (GSE303344, score 7, n=3) + scRNA-Seq (GSE303460, score 7, n=14), pdat 2026/05/20, mouse, single-cell + spatial: paired spatiotemporal dissection of suture stem-cell dynamics in a developmental disorder — spatial + DEG methodology reference and craniofacial developmental-biology brief input (promoted from id:14 backlog)",
      "Combined signal: multi-omic 3D-chromatin GWAS dissection (heart failure) + Xenium precision-oncology atlas (bladder cancer) + spatiotemporal developmental single-cell + spatial (craniosynostosis) — three orthogonal modalities spanning bioinformatics/AI drug discovery, clinical/precision oncology, and developmental biology, all clean-license GEO with raw files available; the 2026-06-15 scan emitted 104 hits, of which 82 accessions are new (not yet digested in id:10–id:15)"
    ],
    actions: [
      { label: "Request AI drug discovery / cardiac fibrosis brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request spatial transcriptomics workflow brief", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 15,
    date: "2026-06-15",
    title: "PRC2 perturbation in naive-to-primed hPSC transition maps dynamic poised-enhancer connectivity and an epigenetic drug-target landscape (score 9, n=45); NRTI antiretroviral therapy drives progressive alveolar-macrophage senescence (n=74, ChIP-seq); spatial atlas of maternal-fetal cell contributions to severe preeclampsia (n=152)",
    category: "ai-drug-discovery",
    summary: "Three fresh high-impact hits spanning AI drug discovery, longevity, and clinical, with the watcher resuming its daily 06:00 KST cadence after the 2026-06-12 weekend gap (collected_at 2026-06-14T21:02 UTC = 2026-06-15 06:02 KST; 104 hits ingested in the new 2026-06-15/ output directory, 29 score-6+ fresh after de-duplicating against prior digests): (1) Dynamics of poised enhancer connectivity upon PRC2 perturbation during the naive-to-primed transition of human pluripotent stem cells (GSE309649, n=45, pdat 2026/06/10, mixed modality, score 9, clean license, raw files, perturbation signal, no risk signals) maps the 3D-chromatin rewiring caused by PRC2 inhibition in hPSC state transition — a score-9 perturbation dataset that directly extends the EZH2/tazemetostat axis surfaced in id:10 into a new naive-to-primed pluripotency context and is CMap-repurposing friendly for next-generation PRC2/EZH2 inhibitors. (2) Continuous NRTI-based antiretroviral therapy induces progressive senescence-like reprogramming of alveolar macrophages (GSE307329, n=74, pdat 2026/05/15, transcriptomics + ChIP-seq) provides a large n=74 cohort showing NRTI-driven progressive senescence-like reprogramming of alveolar macrophages — direct input for the Brown Biotech longevity/senolytic service and a clean drug-repurposing screen for HIV-PULM comorbidity biology. (3) Spatially resolved maternal and fetal cell contributions to severe Preeclampsia (GSE319236, n=152, pdat 2026/06/11, spatial, clean license, raw files, no risk signals) delivers a large n=152 spatial cohort dissecting severe preeclampsia — a fresh spatial reference for maternal-fetal medicine and a direct clinical/translational input for biomarker and trial-design discussions.",
    tags: ["PRC2", "EZH2", "poised enhancer", "3D chromatin", "hPSC", "naive-to-primed", "pluripotency", "perturbation", "CMap repurposing", "tazemetostat", "AI drug discovery", "epigenetic drug target", "NRTI", "antiretroviral", "alveolar macrophage", "senescence", "senolytic", "senomorphic", "ChIP-seq", "transcriptomics", "HIV-PULM", "comorbidity", "drug repurposing", "preeclampsia", "maternal-fetal medicine", "spatial transcriptomics", "biomarker", "clinical", "open science"],
    highlights: [
      "PRC2 perturbation hPSC poised-enhancer atlas (GSE309649, score 9, n=45, pdat 2026/06/10, mixed modality, clean license, raw files, no risk signals): score-9 perturbation atlas of poised-enhancer connectivity during the naive-to-primed hPSC transition — extends the EZH2/tazemetostat axis from id:10 into a new pluripotency context; CMap-repurposing friendly for next-generation PRC2/EZH2 inhibitors",
      "NRTI antiretroviral therapy drives alveolar-macrophage senescence (GSE307329, n=74, pdat 2026/05/15, transcriptomics + ChIP-seq): n=74 cohort shows NRTI-driven progressive senescence-like reprogramming of alveolar macrophages — direct senolytic/senomorphic input and HIV-PULM comorbidity drug-repurposing angle for the Brown Biotech longevity service",
      "Spatial atlas of severe preeclampsia (GSE319236, n=152, pdat 2026/06/11, spatial, clean license, raw files, no risk signals): large n=152 spatial cohort dissecting maternal-fetal cell contributions to severe preeclampsia — fresh spatial reference for maternal-fetal medicine and clinical/translational biomarker development",
      "Combined signal: AI drug discovery (PRC2/EZH2 perturbation) + longevity (NRTI-driven alveolar-macrophage senescence) + clinical (severe preeclampsia spatial) — three orthogonal modalities spanning ai-drug-discovery, longevity, and clinical categories, all clean-license GEO with raw files available; the watcher resumed its daily 06:00 KST cadence (collected_at 2026-06-14T21:02 UTC = 2026-06-15 06:02 KST) and emitted 104 hits, of which 29 are score-6+ fresh after de-duplicating against prior digests"
    ],
    actions: [
      { label: "Request AI drug discovery / epigenetic brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request longevity/senolytic brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request clinical/translational brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },

  {
    id: 14,
    date: "2026-06-14",
    title: "Quiet digest day: research-watcher produced no fresh hits over the weekend (Fri 2026-06-12 → Sun 2026-06-14); three uncurated backlog hits stand by — Xenium bladder cancer lineage-vulnerability atlas, craniosynostosis suture stem cell spatiotemporal atlas, FALD spatial transcriptomics of human fibrotic livers",
    category: "open-science",
    summary: "The research-watcher last completed a fresh scan on 2026-06-12 (Fri 06:11 KST) and did not emit a new scan over the weekend — hits.jsonl mtime is 2026-06-12T16:43:53 and the latest output directory is 2026-06-12/. All 104 curated hits carry collected_at=2026-06-11, so there is no new signal to surface today. Per cron policy we still publish a brief entry flagging the gap and pre-loading three high-priority uncurated hits that are queued for the next Brown Biotech intake: (1) A Xenium Spatial Atlas of Muscle-Invasive Bladder Cancer Reveals Lineage-Specific Vulnerabilities (GSE326226, n=5, pdat 2026/05/05, score 9, single-cell + spatial, clean license, raw files) — first score-9 Xenium bladder-cancer atlas exposing lineage-specific vulnerabilities, a direct precision-oncology brief input and a clean addition to the spatial-cohort pipeline. (2) Spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis (GSE303344 n=3 + GSE303460 n=14, pdat 2026/05/20, score 7/7, mouse, single-cell + spatial) — paired spatiotemporal dissection of suture stem-cell dynamics in a developmental disorder, useful for the spatial + DEG methodology lane. (3) Spatial transcriptomics of human FALD and normal livers (GSE306111, n=5, pdat 2026/03/01, score 6, human, spatial, raw files) — fresh spatial map of human fibrotic-vs-normal liver, complementary to the Brown Biotech anti-fibrotic pipeline and the CTHRC1+ lung fibrosis work already digested (id:12). These three are held in the backlog and will be promoted to the next non-quiet digest; the watcher's weekend gap (no Sat/Sun scan) will be re-verified on the 2026-06-15 run.",
    tags: ["research-watcher", "weekend gap", "no new signals", "backlog", "Xenium", "bladder cancer", "muscle-invasive bladder cancer", "lineage-specific vulnerability", "precision oncology", "single-cell + spatial", "spatial transcriptomics", "suture stem cell", "craniosynostosis", "spatiotemporal atlas", "FALD", "fibrotic liver", "liver fibrosis", "anti-fibrotic pipeline", "open science", "GEO"],
    highlights: [
      "Watch status: research-watcher last completed a fresh scan 2026-06-12 06:11 KST — hits.jsonl mtime 2026-06-12T16:43:53, all 104 hits carry collected_at=2026-06-11, no output directories exist for 2026-06-13 or 2026-06-14. Cron policy: brief \"no new signals\" entry, do not skip the push.",
      "Xenium Bladder Cancer lineage-vulnerability atlas (GSE326226, score 9, n=5, pdat 2026/05/05, single-cell + spatial, clean license, raw files): score-9 Xenium bladder-cancer atlas exposing lineage-specific vulnerabilities — direct precision-oncology brief input and clean addition to the Brown Biotech spatial-cohort pipeline; queued for the next non-quiet digest.",
      "Spatiotemporal suture-stem-cell atlas in craniosynostosis (GSE303344 n=3 + GSE303460 n=14, score 7/7, pdat 2026/05/20, mouse, single-cell + spatial): paired spatiotemporal dissection of suture stem-cell dynamics in a developmental disorder — a useful single-cell + spatial methodology reference; queued for the next non-quiet digest.",
      "Spatial transcriptomics of human FALD and normal livers (GSE306111, score 6, n=5, pdat 2026/03/01, human, spatial, raw files): fresh spatial map of fibrotic-vs-normal human liver, complementary to the Brown Biotech anti-fibrotic pipeline and the CTHRC1+ lung fibrosis hit already digested (id:12); queued for the next non-quiet digest."
    ],
    actions: [
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request spatial transcriptomics workflow brief", href: "/multiomics#brief" },
      { label: "Request anti-fibrotic pipeline brief", href: "/services/biostatx#brief" },
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