import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sigma, CheckCircle2, ShieldCheck, GitBranch } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "strict-omics · audit-grade transcriptomics pipelines",
  description:
    "LLM proposes, deterministic gates decide. Strict, reproducible multi-platform transcriptomics pipelines with RO-Crate provenance and container-pinned runs.",
  keywords: [
    "transcriptomics",
    "RNA-seq",
    "microarray",
    "MAGE-TAB",
    "MIAME",
    "MINSEQE",
    "Nextflow",
    "Snakemake",
    "RO-Crate",
    "reproducible pipelines",
    "LLM guardrails",
    "Pydantic",
    "biotech services",
  ],
  alternates: { canonical: "/services/strict-omics" },
  openGraph: {
    title: "strict-omics · audit-grade transcriptomics pipelines",
    description:
      "LLM proposes, deterministic gates decide. Strict, reproducible multi-platform transcriptomics pipelines with RO-Crate provenance.",
    type: "website",
    url: `${siteUrl}/services/strict-omics`,
  },
  twitter: {
    card: "summary_large_image",
    title: "strict-omics · audit-grade transcriptomics pipelines",
    description:
      "LLM proposes, deterministic gates decide. Strict, reproducible multi-platform transcriptomics pipelines.",
  },
};

const cards = [
  {
    title: "Who it is for",
    body: "Research teams that need a transcriptomics pipeline they can defend: deterministic species and platform gates, audit-grade provenance, and a clean handoff to downstream analysis or manuscript figures.",
  },
  {
    title: "What we do",
    body: "We run a two-branch transcriptomics factory (microarray vs RNA-seq) behind a fail-closed ingestion gate. The LLM proposes candidate datasets and metadata; a Pydantic-validated gate decides what enters the pipeline.",
  },
  {
    title: "What you get",
    body: "A versioned run manifest, an RO-Crate provenance bundle, MultiQC-aggregated QC, a species-verified sample list, container-pinned preprocessing outputs, and a decision-ready brief you can act on.",
  },
];

const steps = [
  {
    title: "Ingestion gate",
    desc: "Repository metadata, platform/assay fields, publication cross-check. Fail-closed: conflicting evidence moves to manual review or rejection.",
  },
  {
    title: "Empirical species check",
    desc: "FastQ Screen / Kraken2 for RNA-seq; verifyBamID2 + CrosscheckFingerprints for human samples. Wrong-species or contamination is rejected before alignment.",
  },
  {
    title: "Technology-specific branch",
    desc: "Microarray (RLE, NUSE, percent present) and RNA-seq (FastQC, RNA-SeQC 2, RSeQC) are never mixed. Batch effects are detected before they are corrected.",
  },
  {
    title: "Containerised QC",
    desc: "Pinned Nextflow / Snakemake runs, MultiQC aggregation, batch-aware thresholds. ENCODE-style read depth and replicate standards where applicable.",
  },
  {
    title: "Provenance & handoff",
    desc: "DataLad-versioned data, RO-Crate workflow-run provenance, Git-versioned code, and a decision-ready brief that links every output back to a study accession.",
  },
];

const stack = [
  { name: "Nextflow", role: "Production orchestration for HPC, cloud, and workstation." },
  { name: "Snakemake", role: "Leaner alternative, especially for R-heavy custom workflows." },
  { name: "nf-core conventions", role: "Style guide and quality floor for reusable pipelines." },
  { name: "MultiQC", role: "Aggregated QC report across all modules." },
  { name: "DataLad", role: "Git-annex versioning of large raw and derived datasets." },
  { name: "Workflow Run RO-Crate", role: "Captures execution provenance with inputs and outputs." },
  { name: "Pydantic + XML prompts", role: "Local schema validation so the LLM cannot relax scientific constraints." },
  { name: "FastQ Screen / Kraken2", role: "Empirical species verification before alignment." },
  { name: "verifyBamID2", role: "Human-sample contamination and identity check." },
];

const standards = [
  {
    name: "MIAME / MINSEQE",
    note: "Minimum information standards that pin what a usable study must report.",
  },
  {
    name: "MAGE-TAB / SOFT",
    note: "Repository-native formats for ArrayExpress, BioStudies, and GEO sample and platform metadata.",
  },
  {
    name: "ENCODE bulk RNA-seq",
    note: "Read length >= 50 bp, two or more replicates, ~30M aligned reads, Spearman >= 0.9 isogenic / >= 0.8 anisogenic.",
  },
  {
    name: "Bilingual controlled vocabulary",
    note: "Canonical English ontology terms for tissue, disease, strain, and perturbation; Korean mirror for ops.",
  },
];

const boundaries = [
  "The LLM proposes candidate inclusions and never relaxes scientific constraints. Final inclusion is a deterministic validator decision.",
  "Microarray and RNA-seq never share a preprocessing branch. Different metadata, raw files, QC, and batch behaviour.",
  "Container digests, reference builds, and annotation releases are pinned in the run manifest. A clean rerun reproduces the output or the pipeline is not yet production.",
];

export default function StrictOmicsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Sigma className="h-4 w-4 text-cta" />
              strict-omics · project lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              LLM proposes. Deterministic gates decide.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Strict, reproducible multi-platform transcriptomics pipelines with RO-Crate provenance and container-pinned runs. The LLM is a candidate generator; a Pydantic-validated gate is the final decision-maker.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              {[
                "Fail-closed ingestion gate",
                "Technology-specific branches",
                "Container-pinned reproducibility",
                "RO-Crate workflow provenance",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Pipeline Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/multiomics" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Try the self-service tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.75rem] p-8">
              <CheckCircle2 className="h-6 w-6 text-cta" />
              <p className="mt-4 text-lg font-semibold text-text">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Operating steps</span>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
                <p className="mt-3 text-base font-semibold text-text">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="kicker">Stack</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                Production-grade tools, pinned by digest.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-muted">
              Every component is selected for portability, auditability, and the ability to rerun a clean pipeline and reproduce the output.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stack.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <GitBranch className="h-5 w-5 text-cta" />
                <p className="mt-3 text-base font-semibold text-text">{item.name}</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Standards we enforce</span>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">
            Repository-native metadata, minimum-information standards, and a bilingual controlled vocabulary. We use these as hard gates, not as guidelines.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {standards.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{item.name}</p>
                <p className="mt-3 text-sm leading-7 text-text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Boundaries</span>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {boundaries.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-cta" />
                <p className="mt-3 text-sm leading-7 text-text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="strict-omics"
        title="Scope a strict, audit-grade transcriptomics pipeline"
        description="Send a short note and we will return a route preview, an owner, and a fit score. Project-tier engagements start at ₩8M."
        prompts={[
          "Which organism and assay type are you working with? (Homo sapiens, Mus musculus, microarray, bulk RNA-seq, single-cell, spatial, etc.)",
          "Do you have raw data, and in what format? (FASTQ / SRA / BAM for RNA-seq, CEL / IDAT for microarray, or processed matrices only.)",
          "What decision does this pipeline need to support? (target ID, cohort selection, manuscript figure, audit-grade dataset, regulatory submission, etc.)",
        ]}
      />
    </main>
  );
}
