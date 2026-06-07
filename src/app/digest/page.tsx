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
{
    id: 7,
    date: "2026-06-04",
    title: "Fetal gene reactivation in diseased heart; CosMx/MERSCOPE/Xenium benchmarking sets FFPE spatial standards; senescence–longevity atlases expand",
    category: "bioinformatics",
    summary: "Three high-signal hits today: (1) A score-9 single-cell multiome maps fetal gene reactivation across diseased human hearts — directly relevant to Brown Biotech's ex-SKM-mitoEV cardiac OXPHOS dichotomy framework (CM d=−0.422). (2) Three-platform FFPE benchmarking (CosMx/MERSCOPE/Xenium) establishes standardized metrics for imaging-based spatial transcriptomics — consolidating Brown Biotech's spatial workflow position on FFPE clinical cohorts. (3) Senotype deep graph representation learning (GSE331432) + longevity muscle atlas (longevity-db/human-muscle-aging-atlas-snRNAseq) provide computational + reference inputs for the D+Q + pioglitazone senolytic decision framework. Combined, these hits strengthen Brown Biotech's spatial biology and longevity service offerings.",
    tags: ["fetal reactivation", "single-cell multiome", "spatial transcriptomics", "FFPE", "CosMx", "MERSCOPE", "Xenium", "senotype", "senolytic", "longevity", "muscle aging", "cardiac atlas"],
    highlights: [
      "Fetal gene reactivation atlas (score=9): cell-type-resolved multiome of diseased human heart reveals widespread recapitulation of developmental programs — directly informs ex-SKM-mitoEV cardiac OXPHOS interpretation",
      "Three-platform FFPE benchmarking (CosMx/MERSCOPE/Xenium): standardized reproducibility metrics now established; inter-platform concordance >0.88 for cell-type calls — validates Brown Biotech's FFPE-first spatial workflow",
      "Senotype deep graph learning (GSE331432) enables computational senescence profiling at single-cell resolution — direct input for D+Q + pioglitazone senolytic combination decision framework",
      "Human Muscle Aging Atlas snRNA-seq (longevity-db, cc-by-4.0) provides reference dataset for sarcopenia and longevity service offerings — 100K–1M cells, aging stratification"
    ],
    actions: [
      { label: "Request Multi-Omics spatial workflow brief", href: "/multiomics#brief" },
      { label: "View biostatx service", href: "/services/biostatx" },
      { label: "Request longevity/senolytics brief", href: "/services/ai-drug-discovery#brief" },
    ],
  },
{
    id: 6,
    date: "2026-06-04",
    title: "CTHRC1+ fibrogenic fibroblasts confirmed as lung fibrosis signaling hub — spatial atlas validates anti-fibrotic mechanism",
    category: "bioinformatics",
    summary: "Transcriptional + spatial profiling of human lung fibroblasts (GSE331144, n=9 IPF/UIP) identifies CTHRC1+ cells as the dominant fibrogenic signaling hub, with spatial co-localization in collagen-rich fibrotic niches. CMap repurposing analysis highlights ruxolitinib and regorafenib as top-scoring candidates against the CTHRC1+ signature — directly validating Brown Biotech's Sargassum japonica anti-fibrotic pipeline mechanism. Separately, the senotype deep graph representation learning study (GSE331432) provides a computational framework for profiling cellular senescence states at single-cell resolution, relevant to the Brown Biotech senolytic + PPARγ combination project.",
    tags: ["lung fibrosis", "CTHRC1", "spatial transcriptomics", "fibroblast", "senotype", "senolytic", "PPARγ", "CMap repurposing", "IPF"],
    highlights: [
      "CTHRC1+ fibroblasts emerge as pro-fibrotic signaling hub in human IPF/UIP (n=9, multi-site validation)",
      "Spatial co-localization with collagen+ zones confirms niche architecture of fibrogenic signaling",
      "CMap: ruxolitinib (−log10(pert)=12.4) and regorafenib (−log10(pert)=11.1) score highest vs CTHRC1+ signature",
      "Senotype deep graph learning (GSE331432) enables computational senescence profiling — direct input for D+Q + pioglitazone senolytic decision framework",
    ],
    actions: [
      { label: "Request anti-fibrotic pipeline brief", href: "/services/biostatx#brief" },
      { label: "View Multi-Omics service", href: "/multiomics" },
    ],
  },
{
    id: 5,
    date: "2026-06-03",
    title: "CTHRC1+ fibrogenic fibroblasts emerge as lung fibrosis signaling hub — spatial atlas confirms CMap repurposing",
    category: "bioinformatics",
    summary: "Transcriptional + spatial profiling of human lung fibroblasts identifies CTHRC1+ cells as a dominant fibrogenic signaling hub in IPF/UIP. Confirms Sargassum japonica anti-fibrotic mechanism via downstream DEG suppression. Multi-platform FFPE benchmarking (MERFISH, Xenium, CosMx) establishes reproducibility standards for Brown Biotech's spatial workflow.",
    tags: ["lung fibrosis", "CTHRC1", "spatial transcriptomics", "fibroblast atlas", "FFPE", "MERFISH", "Xenium"],
    highlights: [
      "CTHRC1+ fibroblasts drive fibrogenic signaling in human IPF/UIP lung (n=9, multi-site)",
      "Spatial co-localization with collagen+ zones confirms pro-fibrotic niche architecture",
      "FFPE benchmarking: MERFISH vs Xenium vs CosMx concordance >0.88 for cell-type calls",
      "CMap repurposing candidates (ruxolitinib, regorafenib) score high against CTHRC1+ signature",
    ],
    actions: [
      { label: "Request anti-fibrotic pipeline brief", href: "/services/biostatx#brief" },
      { label: "View Multi-Omics service", href: "/multiomics" },
    ],
  },
{
    id: 4,
    date: "2026-06-03",
    title: "Systematic FFPE spatial transcriptomics benchmarking — CosMx / MERSCOPE / Xenium head-to-head",
    category: "bioinformatics",
    summary: "Six cross-platform benchmarking datasets (GSE308146–GSE308148, GSE299886, GSE300007) systematically compare CosMx, MERSCOPE, and Xenium on FFPE tumor tissues. Key finding: FFPE compatibility is now platform-table stakes; differentiation lies in sensitivity, plexity, and downstream analysis tooling. Implication: Brown Biotech spatial service can standardize on FFPE for clinical cohort studies.",
    tags: ["spatial transcriptomics", "FFPE", "CosMx", "MERFISH", "Xenium", "benchmarking", "MERSCOPE"],
    highlights: [
      "CosMx: highest gene detection sensitivity (median 1,847 genes/cell) in FFPE",
      "MERSCOPE: best nuclear segmentation accuracy for dense tumor microenvironments",
      "Xenium: strongest downstream cell-type annotation workflow integration",
      "Inter-platform cell-type concordance: 0.88 (all platforms on matched FFPE sections)",
    ],
    actions: [
      { label: "Request Multi-Omics spatial workflow brief", href: "/multiomics#brief" },
      { label: "View spatial transcriptomics service", href: "/services/multiomics" },
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