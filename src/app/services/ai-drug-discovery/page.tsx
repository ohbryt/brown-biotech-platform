import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, Sparkles, BrainCircuit } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Drug Discovery",
  description: "Brown Biotech AI drug discovery — molecular fingerprint embedding, reasoning layer, and decision-scored candidates for peptide and small-molecule projects.",
  alternates: { canonical: "/services/ai-drug-discovery" },
};

const capabilities = [
  {
    title: "FPembed Molecular Fingerprint Engine",
    desc: "ECFP4/FCFP4 variants, 2048-dim vectors — pharmacokinetic relevance, structural novelty, and target alignment encoded simultaneously.",
  },
  {
    title: "Reasoning Layer over ARP v24",
    desc: "High-throughput virtual screening powered by the same PRISM optimization pathways that drive our peptide synthesis services.",
  },
  {
    title: "Decision-Scored Candidates",
    desc: "Ranked by synthetic accessibility, off-target liability, and ADMET prediction confidence — not just similarity scores.",
  },
];

const workflow = [
  { step: "01", title: "Submit lead compound or pharmacophore hypothesis", desc: "Via the inquiry form or paid brief." },
  { step: "02", title: "FPembed fingerprint encoding", desc: "SMILES → 2048-dim fingerprint → embedding space." },
  { step: "03", title: "Reasoning layer scoring", desc: "ADMET, synthetic accessibility, off-target liability." },
  { step: "04", title: "Decision-ready candidate report", desc: "Ranked candidates with confidence scores and next action." },
];

export default function AIDrugDiscoveryPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <BrainCircuit className="h-4 w-4 text-cta" />
              AI Drug Discovery · reasoning layer
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              We don&apos;t sell database access. We sell the reasoning layer on top of it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Brown Biotech&apos;s AI drug discovery pipeline begins where standard virtual screening ends. Submit a lead compound or pharmacophore hypothesis — get decision-scored candidates, not a molecule list.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Discovery Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Back to service hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Core capabilities</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The reasoning layer behind every candidate.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Three integrated components that transform raw molecular data into decision-ready output.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.5rem] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">How it works</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              From hypothesis to decision-scored candidate in four steps.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <article key={item.step} className="premium-panel rounded-[1.5rem] p-6">
                <div className="text-5xl font-semibold text-primary/20">{item.step}</div>
                <h3 className="mt-4 text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Infrastructure</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Built on ARP v24 + PRISM.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            The same infrastructure that powers Brown Biotech&apos;s peptide synthesis services — extended for computational drug discovery.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["ARP v24", "Compute + storage layer for fingerprint DB and high-throughput model inference."],
            ["PRISM", "Optimization feedback loop — synthetic feasibility feeds back into candidate scoring."],
            ["FPembed", "Molecular encoding: raw SMILES → 2048-dim fingerprint → embedding space."],
            ["Peptide Synthesis", "Wet-lab validation of computational hits; CRO cross-sell for non-peptide scaffolds."],
          ].map(([title, desc]) => (
            <article key={title} className="premium-panel rounded-[1.5rem] p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">{title}</h3>
              <p className="mt-2 text-sm text-text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900/60 p-8 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.12),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Sparkles className="h-3 w-3" />
              Combined with peptide services
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              From virtual screening to wet-lab validation — one team.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
              AI drug discovery at Brown Biotech isn&apos;t a standalone tool — it&apos;s integrated with our peptide synthesis and assay support services. Computational hits can be routed directly into the peptide-service pipeline for validation, all under one owner and one brief.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/peptide-service"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light"
              >
                View Peptide Service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="ai-drug-discovery"
        title="Submit a discovery brief"
        description="If you have a lead compound, pharmacophore hypothesis, or virtual screening goal, send the essentials here and we&apos;ll route it to the right reasoning lane."
        prompts={[
          "What is the target or hypothesis you&apos;re working on?",
          "Do you have a compound set, SMILES list, or pharmacophore model?",
          "What outcome would make this useful — candidates, scoring, or a full report?",
        ]}
      />
    </main>
  );
}