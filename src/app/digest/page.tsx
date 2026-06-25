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
    id: 24,
    date: "2026-06-26",
    title: "In vivo double knockout CAR-T screen identifies synergistic gene pairs that enhance anti-tumor immunity (GSE335215, score 9, n=12, Homo sapiens, pdat 2026/06/23); Immune-dominated cellular heterogeneity and stromal plasticity in keloid infiltrating and hypercellular zones revealed by single-cell RNA sequencing (GSE335482, score 9, n=8, Homo sapiens, pdat 2026/06/23); In Vivo CRISPR Screens Identify SLC1A5 as a Metabolic Checkpoint for Cancer Immunotherapy [ATAC] (GSE335904, score 9, n=4, Homo sapiens; Mus musculus, pdat 2026/06/23)",
    category: "bioinformatics",
    summary: "Three fresh score-9 high-impact hits spanning AI drug discovery / immuno-oncology (in vivo double knockout CAR-T synergy screen), bioinformatics / single-cell + spatial (keloid immune-stromal atlas dissecting infiltrating vs hypercellular zones), and AI drug discovery / tumor metabolism (SLC1A5 as a metabolic checkpoint for cancer immunotherapy via in vivo CRISPR + ATAC), drawn from the research-watcher's 2026-06-26 scan (collected_at 2026-06-25T21:02 UTC = 2026-06-26 06:02 KST; 105 hits ingested in the latest/ output directory; 78 unique non-digested accessions after de-duplicating against id:18–id:23): (1) In vivo double knockout CAR-T screen identifies synergistic gene pairs that enhance anti-tumor immunity (GSE335215, n=12, pdat 2026/06/23, metabolism / ATAC-seq, score 9, Homo sapiens, clean license, raw files, no risk signals, suppfile BW) — a freshly deposited (pdat = 3 days ago) score-9 in vivo double-knockout CRISPR screen of CAR-T cells identifying synergistic gene pairs that boost anti-tumor immunity; this is the cleanest possible combinatorial-perturbation design for next-generation CAR-T engineering and a direct AI drug discovery input for the immuno-oncology / cell-therapy lane (CAR-T is the most clinically validated cellular-immunotherapy modality and remains bottlenecked by resistance + durability — synergistic KO pairs are the next leverage point); pairs conceptually with the GSE309649 PRC2 enhancer-connectivity atlas (id:21) and the GSE311507 HNSCC subtype-specific dependency atlas (id:18) on a shared perturbation / dependency-mapping thread. (2) Immune-dominated cellular heterogeneity and stromal plasticity in keloid infiltrating and hypercellular zones revealed by single-cell RNA sequencing (GSE335482, n=8, pdat 2026/06/23, single-cell + spatial, score 9, Homo sapiens, clean license, raw files, no risk signals, suppfile TAR) — a freshly deposited (pdat = 3 days ago) score-9 single-cell dissection of keloid infiltrating and hypercellular zones surfacing immune-dominated cellular heterogeneity and stromal plasticity; keloids are a clinically underserved fibroproliferative scarring disorder with no FDA-approved therapy and rising global incidence — direct input for Brown Biotech's bioinformatics / multi-omics and clinical / dermatology lanes and clean CMap-repurposing input for next-generation anti-fibrotic therapies (conceptually pairs with the GSE331144 CTHRC1+ lung-fibroblast fibrogenic-hubs hit, id:19, on a shared fibroblast-niche / anti-fibrotic thread). (3) In Vivo CRISPR Screens Identify SLC1A5 as a Metabolic Checkpoint for Cancer Immunotherapy [ATAC] (GSE335904, n=4, pdat 2026/06/23, metabolism / ATAC-seq, score 9, Homo sapiens; Mus musculus, clean license, raw files, no risk signals, suppfile BW) — a freshly deposited (pdat = 3 days ago) score-9 cross-species (human + mouse) in vivo CRISPR screen with ATAC-seq readout nominating SLC1A5 (the glutamine transporter ASCT2, a long-known cancer-metabolism target) as a metabolic checkpoint for cancer immunotherapy; the human+mouse cross-species + ATAC-seq combination is the cleanest possible target-validation design and direct input for the Brown Biotech AI drug discovery / tumor-metabolism lane — and SLC1A5 / ASCT2 inhibition is a CMap-repurposing-friendly next-generation IO-adjuvant strategy (conceptually complements the GSE302068 pan-cancer ferroptosis / TAM-exhaustion atlas, id:20, on a shared tumor-microenvironment-immunometabolism thread)",
    tags: ["double knockout CAR-T", "CAR-T engineering", "synergistic gene pairs", "combinatorial CRISPR", "in vivo CRISPR screen", "anti-tumor immunity", "cell therapy", "ATAC-seq", "immuno-oncology", "IO", "AI drug discovery", "clinical", "translational", "single-cell RNA sequencing", "scRNA-seq", "keloid", "fibroproliferative scarring", "infiltrating zone", "hypercellular zone", "stromal plasticity", "immune heterogeneity", "fibroblast", "anti-fibrotic", "dermatology", "single-cell + spatial", "spatial transcriptomics", "bioinformatics", "multi-omics", "open science", "GEO", "SLC1A5", "ASCT2", "glutamine transporter", "cancer metabolism", "metabolic checkpoint", "tumor metabolism", "immunometabolism", "in vivo CRISPR", "cross-species", "human + mouse", "ATAC-seq", "IO adjuvant", "CMap repurposing", "tumor microenvironment", "TME", "Homo sapiens", "Mus musculus"],
    highlights: [
      "In vivo double knockout CAR-T synergy screen (GSE335215, score 9, n=12, pdat 2026/06/23, metabolism / ATAC-seq, Homo sapiens, clean license, raw files, no risk signals, suppfile BW): freshly deposited (pdat = 2026-06-23) score-9 in vivo double-knockout CRISPR screen of CAR-T cells identifying synergistic gene pairs that enhance anti-tumor immunity — cleanest possible combinatorial-perturbation design for next-generation CAR-T engineering and direct AI drug discovery input for the Brown Biotech immuno-oncology / cell-therapy lane (the most clinically validated cellular-immunotherapy modality, bottlenecked by resistance + durability); pairs with the GSE309649 PRC2 enhancer-connectivity atlas (id:21) and the GSE311507 HNSCC subtype-specific dependency atlas (id:18) on a shared perturbation / dependency-mapping thread",
      "Immune-dominated cellular heterogeneity and stromal plasticity in keloid infiltrating and hypercellular zones — single-cell atlas (GSE335482, score 9, n=8, pdat 2026/06/23, single-cell + spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile TAR): freshly deposited (pdat = 2026-06-23) score-9 single-cell dissection of keloid infiltrating and hypercellular zones surfacing immune-dominated cellular heterogeneity and stromal plasticity — keloids are a clinically underserved fibroproliferative scarring disorder with no FDA-approved therapy and rising global incidence; direct input for Brown Biotech's bioinformatics / multi-omics and clinical / dermatology lanes and clean CMap-repurposing input for next-generation anti-fibrotic therapies; conceptually pairs with the GSE331144 CTHRC1+ lung-fibroblast fibrogenic-hubs hit (id:19) on a shared fibroblast-niche / anti-fibrotic thread",
      "In Vivo CRISPR Screens Identify SLC1A5 as a Metabolic Checkpoint for Cancer Immunotherapy [ATAC] (GSE335904, score 9, n=4, pdat 2026/06/23, metabolism / ATAC-seq, Homo sapiens; Mus musculus, clean license, raw files, no risk signals, suppfile BW): freshly deposited (pdat = 2026-06-23) score-9 cross-species (human + mouse) in vivo CRISPR screen with ATAC-seq readout nominating SLC1A5 (glutamine transporter ASCT2, a long-known cancer-metabolism target) as a metabolic checkpoint for cancer immunotherapy — the human+mouse cross-species + ATAC-seq combination is the cleanest possible target-validation design and direct input for Brown Biotech's AI drug discovery / tumor-metabolism lane; SLC1A5 / ASCT2 inhibition is a CMap-repurposing-friendly next-generation IO-adjuvant strategy and conceptually complements the GSE302068 pan-cancer ferroptosis / TAM-exhaustion atlas (id:20) on a shared tumor-microenvironment-immunometabolism thread",
      "Combined signal: AI drug discovery / immuno-oncology (CAR-T double KO synergy screen) + bioinformatics / single-cell + spatial (keloid immune-stromal atlas) + AI drug discovery / tumor metabolism (SLC1A5 metabolic checkpoint via cross-species in vivo CRISPR + ATAC) — three orthogonal modalities spanning AI drug discovery, bioinformatics, and clinical categories, all clean-license GEO with raw files available and all freshly deposited within the last 3 days; the watcher's 2026-06-26 scan (collected_at 2026-06-25T21:02 UTC = 2026-06-26 06:02 KST) ran on its normal 06:00 KST cadence and emitted 105 hits (78 unique non-digested accessions after de-duplicating against id:18–id:23); HF channel also resurfaced the longevity-db/human-muscle-aging-atlas-snRNAseq dataset (score 4), reinforcing the longevity / snRNA-seq aging-atlas thread"
    ],
    actions: [
      { label: "Request AI drug discovery / CAR-T synergy brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request bioinformatics / keloid anti-fibrotic brief", href: "/multiomics#brief" },
      { label: "Request tumor metabolism / SLC1A5 brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 23,
    date: "2026-06-25",
    title: "Spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis (scRNA-Seq + Visium HD bundle, GSE303460/GSE303344, score 7, n=14+3, Mus musculus, pdat 2026/05/20); Targeting Modulated Vascular Smooth Muscle Cells in Atherosclerosis via FAP-Directed Immunotherapy (Xenium in situ + Visium + Human_CITEseq bundle, GSE315246/GSE314851/GSE314596, score 6, n=17+16+58, Homo sapiens, pdat 2026/02/02); Spatially resolved maternal and fetal cell contributions to severe Preeclampsia (GSE319236, score 6, n=152, Homo sapiens, pdat 2026/06/11)",
    category: "bioinformatics",
    summary: "Three fresh score-7/score-6 high-impact hits spanning bioinformatics/multi-omics (craniosynostosis suture stem cell spatiotemporal atlas), AI drug discovery (FAP-directed atherosclerosis immunotherapy bundle across Xenium/Visium/CITE-seq), and clinical/obstetrics spatial (large n=152 maternal-fetal preeclampsia spatial atlas), drawn from the research-watcher's 2026-06-25 run (watcher ran today on its normal 06:00 KST cadence; hits.jsonl re-archived at 06:01 KST; 103 hits ingested in the latest/ output directory; ~70 unique non-digested accessions after de-duplicating against id:18–id:22): (1) Spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis [scRNA-Seq] (GSE303460, score 7, n=14, pdat 2026/05/20, single-cell + spatial, Mus musculus, clean license, raw files, no risk signals) + Spatiotemporal single-cell atlas of suture stem cell dynamics in craniosynostosis [Visium HD] (GSE303344, score 7, n=3, pdat 2026/05/20, single-cell + spatial, Mus musculus, clean license, raw files, no risk signals, suppfile H5/ZIP) — a freshly indexed score-7 paired scRNA-Seq + Visium HD bundle dissecting suture-stem-cell dynamics across the developmental trajectory of craniosynostosis (the premature fusion of cranial sutures, the most common human craniofacial birth defect); the scRNA-Seq + Visium HD pairing is the gold-standard single-cell + spatial design for developmental-biology atlases and a direct input for Brown Biotech's developmental-biology / skeletal-biology bioinformatics lane; pairs conceptually with the GSE298379 cross-model osteopontin PKD atlas (id:20) on a shared mesenchymal-niche thread. (2) Targeting Modulated Vascular Smooth Muscle Cells in Atherosclerosis via FAP-Directed Immunotherapy [Xenium in situ] (GSE315246, score 6, n=17, pdat 2026/02/02, protein-design / spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile MTX/PARQUET/RDS/TIFF/TSV) + [Visium] (GSE314851, score 6, n=16, pdat 2026/02/02, protein-design / spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/JPG/JSON/MTX/PNG/RDS/TSV) + [Human_CITEseq] (GSE314596, score 6, n=58, pdat 2026/02/02, protein-design / CITE-seq, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/RDS) — a score-6 three-modality FAP-directed atherosclerosis immunotherapy bundle (Xenium in situ + Visium + CITE-seq) targeting modulated vascular smooth muscle cells (vSMCs) that drive atherosclerotic plaque instability; direct AI drug discovery input for the Brown Biotech cardiovascular / antibody-therapy lane and clean CMap-repurposing input for next-generation FAP-directed immunotherapies against atherosclerotic cardiovascular disease (CVD, the leading global cause of mortality); the FAP (fibroblast activation protein) angle pairs with the broader FAP-spatial-transcriptomics thread (an extension of the GSE331144 CTHRC1+ fibroblast-fibrosis hit, id:19); the Xenium + Visium + CITE-seq three-modality design is the modern standard for target-validation atlases and complements the GSE308146/GSE308147/GSE308148 three-platform FFPE spatial benchmark bundle (id:22). (3) Spatially resolved maternal and fetal cell contributions to severe Preeclampsia (GSE319236, score 6, n=152, pdat 2026/06/11, spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/JPG/MTX/TIFF/TSV) — a freshly deposited (pdat = 14 days ago) score-6 large n=152 spatial atlas dissecting the maternal-vs-fetal cellular contributions to severe preeclampsia (the pregnancy-specific hypertensive disorder affecting 2-8% of pregnancies globally and a leading cause of maternal/fetal morbidity and mortality); direct clinical/obstetrics input for Brown Biotech's clinical/translational service and clean reference for the reproductive-medicine brief; pairs with the broader spatial-cohort QC infrastructure thread (GSE277080 standardized-metrics spatial-transcriptomics hit, id:18) on a shared reproducibility / cross-platform-harmonization angle.",
    tags: ["craniosynostosis", "suture stem cell", "suture biology", "developmental biology", "skeletal biology", "spatiotemporal atlas", "Visium HD", "scRNA-Seq", "single-cell + spatial", "spatial transcriptomics", "Mus musculus", "mouse model", "mesenchymal niche", "bioinformatics", "multi-omics", "open science", "GEO", "FAP", "fibroblast activation protein", "vascular smooth muscle cell", "vSMC", "atherosclerosis", "atherosclerotic cardiovascular disease", "CVD", "FAP-directed immunotherapy", "antibody therapy", "Xenium in situ", "Visium", "CITE-seq", "Human_CITEseq", "three-modality", "target validation atlas", "AI drug discovery", "CMap repurposing", "cardiovascular", "preeclampsia", "severe preeclampsia", "maternal-fetal interface", "placenta", "pregnancy", "obstetrics", "spatial transcriptomics", "n=152", "large cohort", "clinical", "translational", "reproductive medicine"],
    highlights: [
      "Spatiotemporal single-cell atlas of suture stem cells in craniosynostosis — scRNA-Seq (GSE303460, score 7, n=14, pdat 2026/05/20, single-cell + spatial, Mus musculus, clean license, raw files, no risk signals) + Visium HD (GSE303344, score 7, n=3, pdat 2026/05/20, single-cell + spatial, Mus musculus, clean license, raw files, no risk signals, suppfile H5/ZIP): freshly indexed score-7 paired scRNA-Seq + Visium HD bundle dissecting suture-stem-cell dynamics across the developmental trajectory of craniosynostosis (the most common human craniofacial birth defect) — gold-standard single-cell + spatial design for developmental-biology atlases and direct input for Brown Biotech's developmental-biology / skeletal-biology bioinformatics lane; pairs with the GSE298379 cross-model osteopontin PKD atlas (id:20) on shared mesenchymal-niche biology",
      "FAP-directed atherosclerosis immunotherapy three-modality bundle — Xenium in situ (GSE315246, score 6, n=17, pdat 2026/02/02, protein-design/spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile MTX/PARQUET/RDS/TIFF/TSV) + Visium (GSE314851, score 6, n=16, pdat 2026/02/02, protein-design/spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/JPG/JSON/MTX/PNG/RDS/TSV) + Human_CITEseq (GSE314596, score 6, n=58, pdat 2026/02/02, protein-design/CITE-seq, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/RDS): score-6 three-modality (Xenium + Visium + CITE-seq) target-validation atlas for FAP-directed atherosclerosis immunotherapy — direct AI drug discovery input for the Brown Biotech cardiovascular / antibody-therapy lane and clean CMap-repurposing input for next-generation FAP-directed CVD immunotherapies (CVD = the leading global cause of mortality); the three-modality Xenium + Visium + CITE-seq design complements the GSE308146/47/48 three-platform FFPE benchmark bundle (id:22)",
      "Spatially resolved maternal-fetal preeclampsia atlas (GSE319236, score 6, n=152, pdat 2026/06/11, spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/JPG/MTX/TIFF/TSV): freshly deposited (pdat = 2026-06-11) score-6 large n=152 spatial atlas of maternal-vs-fetal cellular contributions to severe preeclampsia (the pregnancy-specific hypertensive disorder affecting 2-8% of pregnancies globally) — direct clinical/obstetrics input for Brown Biotech's clinical/translational service and clean reference for the reproductive-medicine brief; the spatial single-cell + spatial design (H5/ZIP + MTX/TSV) is the cleanest possible maternal-fetal-interface dissection; pairs with the GSE277080 standardized-metrics spatial-transcriptomics hit (id:18) on shared reproducibility / cross-platform-harmonization",
      "Combined signal: bioinformatics / multi-omics developmental biology (craniosynostosis suture stem cell atlas) + AI drug discovery cardiovascular immunotherapy (FAP-directed atherosclerosis bundle across Xenium/Visium/CITE-seq) + clinical obstetrics spatial (large n=152 maternal-fetal preeclampsia atlas) — three orthogonal modalities spanning bioinformatics, AI drug discovery, and clinical categories, all clean-license GEO with raw files available; the watcher's 2026-06-25 run completed today on its normal 06:00 KST cadence (latest hits.jsonl archived at 2026-06-25 06:01 KST); ~70 unique non-digested accessions remain in the queue after de-duplicating against id:18–id:22"
    ],
    actions: [
      { label: "Request bioinformatics / craniosynostosis brief", href: "/multiomics#brief" },
      { label: "Request AI drug discovery / FAP-CVD brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request clinical / preeclampsia brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 22,
    date: "2026-06-22",
    title: "Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues (CosMx/MERSCOPE/Xenium bundle, score 9, n=4+6+8, pdat 2025/10/03); A Xenium Spatial Atlas of Muscle-Invasive Bladder Cancer Reveals Lineage-Specific Vulnerabilities (GSE326226, score 9, n=5, pdat 2026/05/05); Dissecting Non-Coding GWAS Loci with High-Resolution 3D Chromatin Interactions Reveals Causal Genes with Relevance to Heart Failure [ATAC-seq/Hi-C/Perturb-seq/RNA-seq bundle, GSE281462–GSE281465, score 9, n=4+4+7+3, pdat 2025/06/16]",
    category: "bioinformatics",
    summary: "Three fresh score-9 high-impact hits spanning biotech infrastructure (systematic multi-platform FFPE spatial transcriptomics benchmarking), clinical/precision oncology (Xenium spatial atlas of muscle-invasive bladder cancer with lineage-specific vulnerabilities), and clinical/multi-omics non-coding-GWAS dissection (heart-failure causal genes via integrated ATAC-seq + Hi-C + Perturb-seq + RNA-seq), drawn from the research-watcher's 2026-06-22 scan (collected_at 2026-06-21T21:03–21:04 UTC = 2026-06-22 06:03–06:04 KST; 105 hits ingested in the new 2026-06-22/ output directory; ~80 unique non-digested accessions after de-duplicating against id:17–id:21): (1) Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues — CosMx Data (GSE308146, n=4, pdat 2025/10/03, single-cell + spatial, score 9, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/RDS) + MERSCOPE Data (GSE308147, n=6, pdat 2025/10/03, single-cell + spatial, score 9, Homo sapiens; synthetic construct, clean license, raw files, no risk signals, suppfile ZIP) + Xenium Data (GSE308148, n=8, pdat 2025/10/03, single-cell + spatial, score 9, Homo sapiens, clean license, raw files, no risk signals, suppfile HTML/JSON/PARQUET/TIFF) — a freshly deposited (pdat = ~8 months old but newly indexed this scan) score-9 three-platform FFPE-imaging-spatial-transcriptomics benchmark across CosMx (Nanostring) + MERSCOPE (Vizgen) + Xenium (10x), the cleanest possible head-to-head platform-comparison dataset for the biotech-infrastructure / data-platform lane; directly relevant to Brown Biotech's spatial-cohort QC pipeline, complements the GSE299886 (MERFISH, n=3) + GSE300007 (Xenium, n=6) FFPE-platform-comparison bundle also surfaced in this scan, and pairs conceptually with the GSE277080 standardized-metrics spatial-transcriptomics methodology hit (id:18) on a shared reproducibility / cross-platform-harmonization thread. (2) A Xenium Spatial Atlas of Muscle-Invasive Bladder Cancer Reveals Lineage-Specific Vulnerabilities (GSE326226, n=5, pdat 2026/05/05, single-cell + spatial, score 9, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/H5/PARQUET/TIFF) — a freshly deposited (pdat = 2026-05-05) score-9 Xenium spatial atlas of muscle-invasive bladder cancer (MIBC, the high-grade urothelial-cancer subtype with ~50% 5-year mortality and rising incidence) that surfaces lineage-specific vulnerabilities, a direct input for Brown Biotech's precision-oncology / clinical-translational service and a clean CMap-repurposing input for next-generation bladder-cancer targets; the Xenium single-cell + spatial pairing is the gold-standard modality for tumor-microenvironment dissection and pairs conceptually with the GSE311507 HNSCC subtype-specific dependency atlas (id:18) on a shared precision-oncology / perturbation thread. (3) Dissecting Non-Coding GWAS Loci with High-Resolution 3D Chromatin Interactions Reveals Causal Genes with Relevance to Heart Failure — ATAC-seq (GSE281462, n=4, pdat 2025/06/16, score 9, clean license, raw files, perturbation signal, suppfile NARROWPEAK) + Hi-C (GSE281463, n=4, pdat 2025/06/16, score 9, clean license, raw files, perturbation signal, suppfile HIC) + Perturb-seq (GSE281464, n=7, pdat 2025/06/16, score 9, clean license, raw files, perturbation signal, suppfile RDS) + RNA-seq (GSE281465, n=3, pdat 2025/06/16, score 9, clean license, raw files, perturbation signal, suppfile TXT) — a freshly deposited (pdat = 2025-06-16) score-9 four-omics bundle (ATAC-seq + Hi-C + Perturb-seq + RNA-seq) dissecting non-coding GWAS loci in heart failure, the cleanest possible causal-gene prioritization pipeline for non-coding variant → 3D-chromatin target → perturbation validation → transcriptomic confirmation; directly relevant to Brown Biotech's clinical / translational service for cardiovascular-drug discovery and a clean multi-omics bioinformatics input for the GWAS-prioritization methodology lane; pairs conceptually with the GSE309649 PRC2 perturbation enhancer-connectivity atlas (id:21) on a shared 3D-chromatin / non-coding-regulatory thread.",
    tags: ["imaging spatial transcriptomics", "FFPE", "CosMx", "MERSCOPE", "Vizgen", "Xenium", "10x Genomics", "MERFISH", "platform benchmarking", "multi-platform benchmark", "cross-platform harmonization", "single-cell + spatial", "biotech infrastructure", "data platform", "QC pipeline", "reproducibility", "methodology", "GEO", "open science", "muscle-invasive bladder cancer", "MIBC", "urothelial cancer", "bladder cancer", "Xenium atlas", "lineage-specific vulnerabilities", "precision oncology", "tumor microenvironment", "TME", "CMap repurposing", "clinical", "translational", "Homo sapiens", "non-coding GWAS", "GWAS prioritization", "non-coding variant", "causal gene", "heart failure", "cardiovascular", "ATAC-seq", "Hi-C", "3D chromatin", "Perturb-seq", "RNA-seq", "multi-omics", "bioinformatics", "perturbation", "non-coding regulatory"],
    highlights: [
      "Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues — CosMx Data (GSE308146, score 9, n=4, pdat 2025/10/03, single-cell + spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/RDS) + MERSCOPE Data (GSE308147, score 9, n=6, pdat 2025/10/03, single-cell + spatial, Homo sapiens; synthetic construct, clean license, raw files, no risk signals, suppfile ZIP) + Xenium Data (GSE308148, score 9, n=8, pdat 2025/10/03, single-cell + spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile HTML/JSON/PARQUET/TIFF): cleanest possible three-platform (CosMx + MERSCOPE + Xenium) head-to-head FFPE imaging-spatial-transcriptomics benchmark — directly relevant to Brown Biotech's spatial-cohort QC pipeline and biotech-infrastructure / data-platform lane; complements the GSE299886 (MERFISH, n=3) + GSE300007 (Xenium, n=6) FFPE-platform-comparison bundle also surfaced in this scan, and pairs with the GSE277080 standardized-metrics spatial-transcriptomics methodology hit (id:18) on a shared reproducibility / cross-platform-harmonization thread",
      "A Xenium Spatial Atlas of Muscle-Invasive Bladder Cancer Reveals Lineage-Specific Vulnerabilities (GSE326226, score 9, n=5, pdat 2026/05/05, single-cell + spatial, Homo sapiens, clean license, raw files, no risk signals, suppfile CSV/H5/PARQUET/TIFF): freshly deposited (pdat = 2026-05-05) score-9 Xenium spatial atlas of muscle-invasive bladder cancer surfacing lineage-specific vulnerabilities — direct input for Brown Biotech's precision-oncology / clinical-translational service and clean CMap-repurposing input for next-generation bladder-cancer targets; the Xenium single-cell + spatial pairing is the gold-standard modality for TME dissection and pairs with the GSE311507 HNSCC subtype-specific dependency atlas (id:18) on a shared precision-oncology / perturbation thread",
      "Dissecting Non-Coding GWAS Loci with High-Resolution 3D Chromatin Interactions Reveals Causal Genes with Relevance to Heart Failure — ATAC-seq (GSE281462, score 9, n=4, pdat 2025/06/16, clean license, raw files, perturbation signal, suppfile NARROWPEAK) + Hi-C (GSE281463, score 9, n=4, pdat 2025/06/16, clean license, raw files, perturbation signal, suppfile HIC) + Perturb-seq (GSE281464, score 9, n=7, pdat 2025/06/16, clean license, raw files, perturbation signal, suppfile RDS) + RNA-seq (GSE281465, score 9, n=3, pdat 2025/06/16, clean license, raw files, perturbation signal, suppfile TXT): freshly deposited (pdat = 2025-06-16) score-9 four-omics bundle (ATAC-seq + Hi-C + Perturb-seq + RNA-seq) dissecting non-coding GWAS loci in heart failure — cleanest possible causal-gene prioritization pipeline (non-coding variant → 3D-chromatin target → perturbation validation → transcriptomic confirmation); direct input for Brown Biotech's clinical / cardiovascular-drug-discovery service and clean multi-omics bioinformatics input for the GWAS-prioritization methodology lane; pairs with the GSE309649 PRC2 perturbation enhancer-connectivity atlas (id:21) on a shared 3D-chromatin / non-coding-regulatory thread",
      "Combined signal: biotech infrastructure (systematic multi-platform FFPE spatial benchmark) + clinical precision-oncology (Xenium MIBC atlas with lineage-specific vulnerabilities) + clinical/multi-omics non-coding-GWAS dissection (heart-failure causal genes via integrated ATAC-seq + Hi-C + Perturb-seq + RNA-seq) — three orthogonal modalities spanning biotech infrastructure, clinical, and bioinformatics categories, all clean-license GEO with raw files available; the watcher's 2026-06-22 scan (collected_at 2026-06-21T21:03–21:04 UTC = 2026-06-22 06:03–06:04 KST) ran on its normal 06:00 KST cadence and emitted 105 hits (~80 unique non-digested accessions after de-duplicating against id:17–id:21); HF channel also surfaced an FFPE-platform-comparison complement bundle (GSE299886 MERFISH n=3 + GSE300007 Xenium n=6, both score 9, pdat 2025/06/30) reinforcing the biotech-infrastructure / cross-platform-harmonization thread"
    ],
    actions: [
      { label: "Request biotech infrastructure / spatial-QC brief", href: "/multiomics#brief" },
      { label: "Request precision oncology / MIBC brief", href: "/services/ai-drug-discovery#brief" },
      { label: "Request cardiovascular / non-coding-GWAS brief", href: "/services/biostatx#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
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
  }
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