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
  {
    id: 13,
    date: "2026-06-13",
    title: "Chronic antibody-mediated rejection spatial immune atlas defines CXCL12-CXCR4 fibroblast-immune niche; MERFISH + RNA-Seq reveal neuroinflammatory sequelae of immune checkpoint inhibition (IO toxicity); circulating frailty miRNAs drive cellular senescence in cardiovascular aging",
    category: "bioinformatics",
    summary: "Three high-impact fresh hits spanning bioinformatics, AI drug discovery, and longevity: (1) A single-cell and spatial immune atlas of chronic antibody-mediated rejection reveals autoimmune-shared immune states and a CXCL12-CXCR4 fibroblast-immune niche (GSE328870, single-cell + spatial, pdat 2026/06/10, score 9) — delivers a score-9 transplant-immunology spatial atlas pinpointing the CXCL12-CXCR4 fibroblast-immune niche as the organizing hub in chronic antibody-mediated rejection; directly upgrades Brown Biotech's fibrosis spatial workflow and is CMap-repurposing friendly (plerixafor/mavorixafor-class CXCR4 antagonists). (2) Spatial transcriptomics reveals molecular mechanisms underlying neuroinflammatory and neurodegenerative sequelae of immune checkpoint inhibition — paired MERFISH (GSE322277, n=11) + RNA-Seq (GSE322681, n=20), pdat 2026/06/09, score 7/7 — first paired MERFISH+RNA-Seq dissection of ICI-induced neuroinflammation; actionable for IO-toxicity prediction, a critical gap in the AI drug discovery and clinical-development pipeline. (3) Circulating miRNAs Associated with Frailty in Old People with Cardiovascular Diseases Promote Cellular Senescence and Inflammation (GSE331433, n=24, pdat 2026/06/10, score 6) — circulating miRNA signature in cardiovascular-aging frailty functionally validated to drive cellular senescence and inflammation; direct input for Brown Biotech's longevity/senolytic service and biomarker discovery.",
    tags: ["chronic antibody-mediated rejection", "transplant immunology", "single-cell + spatial", "CXCL12-CXCR4", "fibroblast-immune niche", "CMap repurposing", "plerixafor", "mavorixafor", "immune checkpoint inhibitor", "neuroinflammation", "MERFISH", "RNA-Seq", "ICI toxicity", "neurodegeneration", "frailty", "cardiovascular aging", "circulating miRNA", "senescence", "inflammation", "longevity", "senolytic", "biomarker"],
    highlights: [
      "Chronic antibody-mediated rejection spatial immune atlas (GSE328870, score 9, pdat 2026/06/10, single-cell + spatial): CXCL12-CXCR4 fibroblast-immune niche identified as the organizing hub in chronic antibody-mediated rejection — CMap-repurposing friendly (plerixafor/mavorixafor-class CXCR4 antagonists); direct upgrade for Brown Biotech's fibrosis spatial workflow",
      "ICI-induced neuroinflammation paired MERFISH + RNA-Seq (GSE322277 n=11 + GSE322681 n=20, score 7/7, pdat 2026/06/09): first paired spatial atlas of immune checkpoint inhibitor neurotoxicity — critical for IO-toxicity prediction and adverse-event biomarker discovery in the clinical development pipeline",
      "Frailty miRNAs drive cardiovascular-aging senescence (GSE331433, score 6, n=24, pdat 2026/06/10): circulating miRNA signature functionally validated to promote cellular senescence + inflammation in cardiovascular aging — direct biomarker and senolytic-target input for the Brown Biotech longevity service",
      "Combined signal: spatial atlas (transplant immunology) + IO toxicity (paired MERFISH+RNA-Seq) + longevity (circulating senescence miRNAs) — three orthogonal modalities spanning bioinformatics, AI drug discovery, and longevity, all clean-license GEO with raw files available"
    ],
    actions: [
      { label: "Request spatial transcriptomics workflow brief", href: "/multiomics#brief" },
      { label: "Request AI drug discovery / IO toxicity brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request longevity/senolytic brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 12,
    date: "2026-06-12",
    title: "Cross-platform FFPE spatial transcriptomics systematic benchmarking (CosMx/MERSCOPE/MERFISH/Xenium) sets reproducibility standards; CTHRC1+ fibrogenic fibroblasts validated as lung fibrosis signaling hubs; H&N Cancer OXPHOS subtype-specific drug vulnerabilities enable precision therapeutics",
    category: "bioinformatics",
    summary: "Three high-impact hits spanning open-science reference, longevity/fibrosis, and AI drug discovery: (1) A 6-accession cross-platform FFPE spatial transcriptomics benchmarking bundle (GSE308146 CosMx n=4 + GSE308147 MERSCOPE n=6 + GSE308148 Xenium n=8, pdat 2025/10/03, score 9/9/9) paired with the MERFISH + Xenium FFPE tumor platform comparison (GSE299886 n=3 + GSE300007 n=6, pdat 2025/06/30, score 9/9) and the standardized reproducibility metrics dataset (GSE277080 n=38, pdat 2025/07/28, score 9) delivers the most comprehensive open-science spatial benchmark to date — four commercial platforms (CosMx/MERSCOPE/MERFISH/Xenium) cross-calibrated on matched FFPE tissue, directly upgrading Brown Biotech's FFPE clinical-cohort spatial workflow. (2) Transcriptional and spatial profiling of fibroblasts from human lungs highlights CTHRC1+ cells as fibrogenic signaling hubs in fibrosis (GSE331144, n=9, pdat 2026/05/29, score 9) — single-cell + spatial validation that CTHRC1+ fibroblasts are the dominant fibrogenic signaling hub in IPF/UIP with spatial co-localization in collagen-rich fibrotic niches; directly validates Brown Biotech's anti-fibrotic pipeline mechanism and feeds CMap repurposing analysis (ruxolitinib/regorafenib-class candidates). (3) Subtype-Specific Dependencies and Drug Vulnerabilities Enable Precision Therapeutics in Head and Neck Cancer (GSE311507, RNA-seq n=16, pdat 2026/06/01, score 9, metabolism + perturbation signal) — subtype-specific metabolic dependencies (OXPHOS-class) map to actionable drug sensitivities in H&N Cancer; CMap-repurposing friendly and a direct input for Brown Biotech's precision-oncology brief.",
    tags: ["FFPE", "spatial transcriptomics", "CosMx", "MERSCOPE", "MERFISH", "Xenium", "cross-platform benchmarking", "reproducibility", "standardized metrics", "open science", "reference atlas", "lung fibrosis", "CTHRC1", "fibroblast", "fibrogenic signaling hub", "IPF", "UIP", "CMap repurposing", "anti-fibrotic pipeline", "spatial co-localization", "collagen", "H&N Cancer", "OXPHOS", "subtype-specific drug vulnerability", "precision oncology", "metabolism"],
    highlights: [
      "Cross-platform FFPE spatial benchmarking bundle (GSE308146 CosMx n=4 + GSE308147 MERSCOPE n=6 + GSE308148 Xenium n=8, score 9/9/9, pdat 2025/10/03) + FFPE tumor paired comparison (GSE299886 MERFISH n=3 + GSE300007 Xenium n=6, pdat 2025/06/30, score 9/9) + standardized reproducibility metrics (GSE277080 n=38, pdat 2025/07/28, score 9): 6 accessions, all score 9, all clean-license + raw files — most comprehensive FFPE spatial cross-platform calibration to date across CosMx/MERSCOPE/MERFISH/Xenium, directly upgrade Brown Biotech's clinical-cohort spatial workflow",
      "CTHRC1+ fibrogenic fibroblasts as lung fibrosis signaling hubs (GSE331144, n=9, score 9, pdat 2026/05/29, single-cell + spatial): single-cell + spatial validation that CTHRC1+ cells dominate fibrogenic signaling in IPF/UIP with collagen-rich niche co-localization — validates Brown Biotech anti-fibrotic pipeline mechanism and enables CMap repurposing analysis (ruxolitinib/regorafenib-class candidates)",
      "H&N Cancer OXPHOS subtype-specific drug vulnerabilities (GSE311507, score 9, pdat 2026/06/01, RNA-seq n=16, metabolism + perturbation signal): subtype-specific metabolic dependencies (OXPHOS-class) map to actionable drug sensitivities — direct CMap-repurposing input for Brown Biotech precision-oncology brief",
      "Combined signal: open-science FFPE spatial reference atlas (6 accessions) + fibrosis niche mechanism (CTHRC1+) + metabolism-driven precision oncology (H&N Cancer OXPHOS) — three orthogonal modalities spanning open science, longevity/fibrosis, and AI drug discovery, all clean-license GEO with raw files available"
    ],
    actions: [
      { label: "Request spatial transcriptomics workflow brief", href: "/multiomics#brief" },
      { label: "Request anti-fibrotic pipeline brief", href: "/services/biostatx#brief" },
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