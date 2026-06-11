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
  {
    id: 11,
    date: "2026-06-10",
    title: "Pancreatic cancer transcriptional-addiction ChIPmentation + scATAC organoid atlas defines druggable epigenetic dependencies; cross-species single-cell multiomics of EMT tumor states (mouse + human); sexually-dimorphic human/mouse adrenal gland tissue-turnover atlas reframes hormone aging",
    category: "ai-drug-discovery",
    summary: "Three fresh high-impact hits spanning AI drug discovery, bioinformatics, and longevity: (1) Targeting transcriptional addiction to pro-proliferative programs in pancreatic cancer delivers a matched ChIPmentation organoid (GSE296816, n=3) + scATAC organoid (GSE296818, n=8) + ChIPmentation (GSE296819, n=2) dataset, pdat 2026/06/04, score 6/6/3 — directly maps druggable epigenetic dependencies in PDAC organoids and is an immediate CMap-friendly input for Brown Biotech precision-oncology target prioritization. (2) Single cell multiomics unravel the transcription networks controlling the different EMT tumor states (GSE288137, mouse + human, n=16, pdat 2026/06/07, score 6) provides a cross-species single-cell multiomics dissection of the EMT transcription-factor programs that drive metastasis — a fresh mechanistic anchor for Brown Biotech spatial + DEG + TF-motif pipeline work on solid tumor progression. (3) Human and mouse adrenal glands are characterized by species-specific and sexually-dimorphic heterogeneity and tissue turnover (GSE253852 mouse + human mixed n=31 + GSE293042 VisiumHD mouse n=2, pdat 2026/05/11, score 9/6) introduces a score-9 cross-species adrenal atlas with VisiumHD spatial support — reframes adrenal aging, stress-axis biology, and sexually-dimorphic hormone turnover with direct relevance to Brown Biotech's longevity/senolytic service and to stress-mediated immunosenescence discussions.",
    tags: ["pancreatic cancer", "transcriptional addiction", "ChIPmentation", "scATAC", "organoid", "epigenetic drug target", "CMap", "precision oncology", "EMT", "single-cell multiomics", "transcription network", "metastasis", "TF motif", "DEG", "mouse human cross-species", "adrenal gland", "Visium HD", "sexually dimorphic", "tissue turnover", "hormone aging", "stress axis", "senolytic", "longevity", "open science reference atlas"],
    highlights: [
      "Pancreatic cancer transcriptional-addiction multi-modality atlas (GSE296816 ChIPmentation organoid n=3 + GSE296818 scATAC organoid n=8 + GSE296819 ChIPmentation n=2, score 6+6+3, pdat 2026/06/04): matched ChIPmentation + scATAC in PDAC organoids pin druggable epigenetic dependencies for pro-proliferative transcriptional programs — direct CMap repurposing input for Brown Biotech precision-oncology brief",
      "EMT single-cell multiomics across species (GSE288137, mouse + human, n=16, score 6, pdat 2026/06/07): cross-species single-cell multiomics dissects the transcription-factor networks controlling distinct EMT tumor states — a fresh mechanistic anchor for Brown Biotech DEG + TF-motif + spatial pipeline on solid-tumor progression and metastasis",
      "Cross-species adrenal gland tissue-turnover atlas (GSE253852 mixed human+mouse n=31 + GSE293042 VisiumHD mouse n=2, score 9+6, pdat 2026/05/11): introduces species-specific and sexually-dimorphic heterogeneity + tissue-turnover atlas with VisiumHD spatial support — reframes adrenal aging, stress-axis biology, and hormone-mediated immunosenescence relevant to Brown Biotech longevity/senolytic service",
      "Combined signal: epigenetic drug target (PDAC) + cross-species single-cell multiomics (EMT) + sexually-dimorphic hormone atlas (adrenal) — three orthogonal modalities spanning AI drug discovery, bioinformatics, and longevity, all clean-license GEO with raw files available"
    ],
    actions: [
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View Multi-Omics service", href: "/multiomics#brief" },
      { label: "Request longevity/senolytic brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 10,
    date: "2026-06-09",
    title: "Heart Failure GWAS 3D Chromatin causal-gene atlas; EZH2→ferroptosis axis in HCC + pan-cancer exhausted-macrophage atlas; FAP-directed atherosclerosis immunotherapy multi-modal atlas (CITEseq + Visium + Xenium)",
    category: "bioinformatics",
    summary: "Three high-impact fresh hits today spanning regulatory genomics, ferroptosis therapeutics, and cardiovascular immunotherapy: (1) Dissecting Non-Coding GWAS Loci with High-Resolution 3D Chromatin Interactions Reveals Causal Genes with Relevance to Heart Failure (GSE281462 ATAC-seq n=4 + GSE281463 Hi-C n=4 + GSE281464 Perturb-seq n=7 + GSE281465 RNA-seq n=3, score 9) integrates GWAS with 3D chromatin architecture + Perturb-seq to pinpoint causal heart-failure genes — a four-modality dataset and a direct upgrade for Brown Biotech's regulatory-element interpretation + target-prioritization pipeline. (2) Inhibition of EZH2 restores normal expression of genes associated with cysteine metabolism and ferroptosis in HCC (GSE237951 RNA-seq n=8 + GSE268195 CUT&Tag n=12, score 6) combined with a Single-Cell Atlas of Pan-Cancer Immunotherapy Reveals the Role of Ferroptosis in Exhausted Macrophages (GSE302068, n=9, score 6) — together these define a druggable EZH2→ferroptosis axis that bridges longevity (ferroptosis is a regulated cell-death mode) and AI drug discovery (tazemetostat-class EZH2 inhibitors with ferroptosis-inducing combinations). (3) Targeting Modulated Vascular Smooth Muscle Cells in Atherosclerosis via FAP-Directed Immunotherapy (GSE314596 Human_CITEseq n=58 + GSE314851 Visium n=16 + GSE315246 Xenium n=17 + GSE314598 Mouse_Aorta_BiTE, score 6/3) delivers a four-modality atlas supporting FAP-BiTE atherosclerosis immunotherapy — strong clinical/precision-oncology handoff with raw files across CITEseq, Visium, and Xenium.",
    tags: ["heart failure", "GWAS", "3D chromatin", "ATAC-seq", "Hi-C", "Perturb-seq", "causal gene", "regulatory element", "EZH2", "ferroptosis", "HCC", "CUT&Tag", "pan-cancer", "exhausted macrophages", "immunotherapy", "FAP", "atherosclerosis", "BiTE", "CITEseq", "Visium", "Xenium", "vascular smooth muscle", "precision oncology", "longevity", "regulated cell death"],
    highlights: [
      "Heart Failure 3D Chromatin causal-gene atlas (GSE281462-465, score 9, 4 modalities, n=4+4+7+3): GWAS + ATAC-seq + Hi-C + Perturb-seq + RNA-seq identifies causal heart-failure genes via high-resolution 3D chromatin interactions — direct input for Brown Biotech regulatory-element interpretation and target prioritization",
      "EZH2→ferroptosis axis in HCC (GSE237951 + GSE268195, score 6+6, RNA-seq n=8 + CUT&Tag n=12): EZH2 inhibition restores cysteine metabolism and ferroptosis in hepatocellular carcinoma — actionable therapeutic angle for tazemetostat-class EZH2 inhibitors combined with ferroptosis inducers (CMap-repurposing friendly)",
      "Pan-Cancer ferroptosis in exhausted macrophages (GSE302068, score 6, single-cell n=9): single-cell atlas of pan-cancer immunotherapy linking ferroptosis to exhausted-macrophage states — bridges longevity (regulated cell death) and AI drug discovery (next-generation IO combinations)",
      "FAP-directed atherosclerosis immunotherapy multi-modal atlas (GSE314596 + GSE314851 + GSE315246 + GSE314598, score 6+3, 4 modalities, n=58+16+17+6): CITEseq + Visium + Xenium + mouse-aorta BiTE supports FAP-BiTE atherosclerosis immunotherapy — three-modality spatial + clinical evidence for Brown Biotech cardiovascular precision-oncology handoff"
    ],
    actions: [
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View Multi-Omics service", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
      { label: "Request longevity/senolytic brief", href: "/services/ai-drug-discovery#brief" },
    ],
  },
  {
    id: 9,
    date: "2026-06-08",
    title: "NRTI antiretroviral therapy drives alveolar macrophage senescence (longevity link); Visium HD spatial ecotypes redefine TME architecture; OXPHOS subtype-specific drug vulnerabilities in Head & Neck Cancer enable precision therapeutics",
    category: "longevity",
    summary: "Three high-impact hits spanning longevity, spatial bioinformatics, and AI drug discovery: (1) Continuous NRTI-based antiretroviral therapy induces progressive senescence-like reprogramming of alveolar macrophages (GSE307329, ChIP-seq, n=74) — directly links a widely-deployed chronic HIV drug class to accelerated lung aging via macrophage senescence, with strong senolytic + PPARγ co-treatment implications for the Brown Biotech longevity pipeline. (2) High-resolution Visium spatial ecotype profiling of the tumor microenvironment (GSE320041, n=17) introduces a non-invasive ecotype framework that decouples TME architecture from histology — a direct upgrade path for Brown Biotech's spatial service offering on FFPE clinical cohorts. (3) Subtype-Specific Dependencies and Drug Vulnerabilities (GSE311507, RNA-seq, n=16) pin OXPHOS subtype-specific metabolic vulnerabilities to actionable drug sensitivities in Head & Neck Cancer — fuels Brown Biotech's precision oncology brief and aligns with the CMap repurposing workflow.",
    tags: ["NRTI", "antiretroviral", "senescence", "alveolar macrophage", "longevity", "senolytic", "Visium HD", "spatial ecotype", "tumor microenvironment", "OXPHOS", "head and neck cancer", "drug vulnerability", "precision oncology", "CMap"],
    highlights: [
      "NRTI-induced alveolar macrophage senescence (GSE307329, score=6, ChIP-seq, n=74): chronic NRTI exposure drives progressive senescence-like reprogramming — actionable longevity target for senolytic + PPARγ co-treatment intervention in HIV+ patient aging",
      "Visium HD spatial ecotype atlas (GSE320041, score=9, n=17): introduces non-invasive ecotype framework decoupling TME architecture from histology — upgrades Brown Biotech FFPE spatial workflow for clinical cohort studies without bespoke pathology inputs",
      "H&N Cancer OXPHOS drug vulnerabilities (GSE311507, score=9, RNA-seq, n=16): subtype-specific metabolic dependencies map to actionable drug sensitivities — direct CMap repurposing input for Brown Biotech precision oncology brief",
      "Combined signal: longevity + spatial + AI drug discovery tri-covering — connects chronic-drug-induced senescence to therapeutic intervention with spatial + metabolic mechanistic grounding"
    ],
    actions: [
      { label: "Request longevity/senolytic brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View spatial transcriptomics workflow", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
    ],
  },
  {
    id: 8,
    date: "2026-06-06",
    title: "Spatial mapping of metastatic pancreatic cancer lineage plasticity (CosMx); Head & Neck Cancer CRISPR dependencies reveal precision therapeutic subtypes; Bladder Cancer Xenium atlas exposes lineage-specific vulnerabilities",
    category: "bioinformatics",
    summary: "Three high-impact hits today: (1) Spatial transcriptomics of metastatic pancreatic cancer (GSE277782, CosMx, n=7) maps transcriptomic and lineage plasticity at single-cell spatial resolution — tumor cell identity is a defining factor of the TME composition, with direct implications for Brown Biotech's anti-fibrotic pipeline mechanism via ECM remodeling signals. (2) Head and Neck Cancer CRISPR screen (GSE311507, n=16) links metabolic subtype-specific dependencies to drug vulnerabilities — OXA + Glasgow metabolic program predicts greater sensitivity; actionable for precision therapeutics. (3) Muscle-Invasive Bladder Cancer Xenium spatial atlas (GSE326226, n=5) reveals Nectin family lineage-specific vulnerabilities with spatial context — directly applicable to Brown Biotech's spatial service offering for FFPE clinical cohorts.",
    tags: ["pancreatic cancer", "metastatic", "lineage plasticity", "CosMx", "spatial transcriptomics", "head and neck cancer", "CRISPR", "drug vulnerability", "bladder cancer", "Xenium", "Nectin", "fibrosis", "ECM", "FFPE"],
    highlights: [
      "Metastatic pancreatic cancer spatial mapping (GSE277782): tumor cell identity is the primary determinant of TME composition — lineage plasticity drives metastatic potential and ECM remodeling signals relevant to Brown Biotech anti-fibrotic pipeline",
      "Head & Neck Cancer CRISPR dependencies (GSE311507): metabolic subtype-specific drug vulnerabilities identified; OXA + Glasgow program predicts therapeutic sensitivity — actionable for precision oncology service",
      "Bladder Cancer Xenium spatial atlas (GSE326226): Nectin family lineage-specific vulnerabilities with spatial architecture context — validates Brown Biotech's FFPE spatial workflow on clinical urothelial carcinoma cohorts",
      "All three datasets: raw files available, NCBI public repository license, single-cell + spatial pairing — maximum Brown Biotech intake score (9/9)"
    ],
    actions: [
      { label: "Request spatial transcriptomics workflow brief", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
      { label: "Request precision oncology brief", href: "/services/ai-drug-discovery#brief" },
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