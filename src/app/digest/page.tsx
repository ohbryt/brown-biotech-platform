import type { Metadata } from "next";
import { Globe, BookOpen, Microscope, BrainCircuit, TrendingUp, FlaskConical, Activity, ArrowRight } from "lucide-react";
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
  { id: "bioinformatics", label: "Bioinformatics & Multi-Omics", icon: Microscope, color: "from-blue-600 to-indigo-700", desc: "DEG, pathway, PPI, single-cell, spatial transcriptomics" },
  { id: "ai-drug-discovery", label: "AI Drug Discovery", icon: BrainCircuit, color: "from-amber-600 to-orange-700", desc: "Foundation models, virtual screening, ADME prediction, ARP pipeline updates" },
  { id: "longevity", label: "Longevity & Senolytics", icon: Activity, color: "from-emerald-600 to-teal-700", desc: "Senolytic targets, caloric restriction mimetics, epigenetic clocks" },
  { id: "infrastructure", label: "Biotech Infrastructure", icon: TrendingUp, color: "from-violet-600 to-purple-700", desc: "LLM ops, MLOps, data platforms, automation tools" },
  { id: "clinical", label: "Clinical & Regulatory", icon: Globe, color: "from-rose-600 to-pink-700", desc: "FDA updates, clinical trial design, biomarker strategy" },
  { id: "open-science", label: "Open Science & Preprints", icon: BookOpen, color: "from-cyan-600 to-sky-700", desc: "bioRxiv, medRxiv, preprint highlights, dataset releases" },
];

const sampleDigests = [
  {
    id: 1,
    date: "2026-06-02",
    title: "Spatial transcriptomics meets foundation models",
    category: "bioinformatics",
    summary: "New foundation model for spatial omics achieves state-of-the-art on 12 tissue types. Benchmark on melanoma and PDAC shows 23% improvement in cell-type deconvolution vs. conventional methods.",
    tags: ["spatial transcriptomics", "foundation model", "STELLAR", "benchmark"],
    highlights: [
      "STELLAR model from DeepGenomics — SOTA on Visium, CosMx, Xenium datasets",
      "Cell-type deconvolution accuracy: 0.91 F1 on melanoma (vs 0.74 baseline)",
      "Pretrained on 4.2M cells from 23 tissue types, fine-tunes with 500 cells",
      "Brown Biotech relevance: ARP pipeline integration pathway identified",
    ],
    actions: [
      { label: "Request ARP integration brief", href: "/services/ai-drug-discovery#brief" },
      { label: "View service", href: "/services/biostatx" },
    ],
  },
  {
    id: 2,
    date: "2026-06-01",
    title: "AlphaFold3 for multi-target drug design — what changed",
    category: "ai-drug-discovery",
    summary: "AlphaFold3 now supports nucleic acid complexes and covalent docking. Key updates for Brown Biotech IPF pipeline: structurable proteome coverage extended to 2.1M proteins. New covalent warhead scoring module available via API.",
    tags: ["AlphaFold3", "drug design", "covalent docking", "protein structure"],
    highlights: [
      "Nucleic acid-protein complex prediction now available (DNA, RNA, small molecules)",
      "Covalent docking accuracy improved: 0.87 success rate (vs 0.72 AF2)",
      "New: blind covalent warhead scoring — relevant for Sargassum-derived compounds",
      "API access: via Google Cloud Life Sciences and EMBL-EBI programmatically",
    ],
    actions: [
      { label: "Request NAAA covalent screen", href: "/services/peptide-service#brief" },
      { label: "View peptide service", href: "/services/peptide-service" },
    ],
  },
  {
    id: 3,
    date: "2026-05-31",
    title: "Senolytic combo D+Q shows durable benefit in NHP",
    category: "longevity",
    summary: "Nature Medicine published a 16-month NHP study: Dasatinib + Quercetin every 4 months reduced senescence burden by 67%, improved grip strength, and preserved brown adipose without detectable adverse events. 18 months follow-up ongoing.",
    tags: ["senolytic", "dasatinib", "quercetin", "NHP", "brown adipose"],
    highlights: [
      "p16INK4a+ cells reduced 67% in liver, 54% in adipose (vs placebo)",
      "Grip strength improved 31% vs baseline, maintained through month 16",
      "BAT density preserved (PET-CT), no weight change or glucose abnormality",
      "Clinical translation path: IND-enabling studies starting Q3 2026",
    ],
    actions: [
      { label: "Request senolytic combination brief", href: "/services/biostatx#brief" },
      { label: "View biostatx", href: "/services/biostatx" },
    ],
  },
];

export default function DigestPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark text-white pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <FlaskConical className="h-4 w-4 text-cta" />
              Brown Biotech Daily Tech Digest
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Decision-ready research signal,<br />every morning.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Bioinformatic pipelines, AI drug discovery, longevity science, and biotech infrastructure — curated from PubMed, bioRxiv, Nature, and industry sources, delivered in one digest.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">Coverage areas</h2>
          <span className="text-sm text-text-muted">Updated daily · 06:00 KST</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digestCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="premium-panel rounded-2xl p-5 hover:border-cta/30 transition">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-semibold text-text">{cat.label}</p>
                <p className="mt-1 text-sm text-text-muted">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Digests */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text">Recent digests</h2>
          <p className="mt-1 text-text-muted">Latest research highlights and Brown Biotech commentary</p>
        </div>
        <div className="space-y-6">
          {sampleDigests.map((digest) => (
            <article key={digest.id} className="premium-panel rounded-[1.75rem] p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full bg-white/80 border border-border px-3 py-1 text-xs font-medium text-text-muted">
                      {digest.date}
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-primary/10 to-cta/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      {digest.category.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text">{digest.title}</h3>
                  <p className="mt-3 text-text-muted leading-relaxed">{digest.summary}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {digest.tags.map((tag) => (
                      <span key={tag} className="text-xs text-text-muted bg-white/60 border border-border rounded-full px-2.5 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Highlights */}
                  <div className="mt-5 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Key highlights</p>
                    <ul className="space-y-2">
                      {digest.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cta flex-shrink-0" />
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
                  <Link key={action.href} href={action.href} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-text hover:border-cta/40 hover:text-primary transition">
                    {action.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-text">Get it in your inbox</h3>
              <p className="mt-2 text-text-muted">Daily digest delivered at 06:00 KST. One email, zero noise, decision-ready signal.</p>
            </div>
            <Link href="/services/business-pipeline#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white hover:from-primary-light hover:to-cta-light whitespace-nowrap">
              Request digest subscription <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}