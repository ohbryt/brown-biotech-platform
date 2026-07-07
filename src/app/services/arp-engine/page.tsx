import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Network, BrainCircuit, Sparkles, ShieldCheck, Database, GitBranch, Workflow } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ARP Engine · System of Intelligence",
  description:
    "Brown Biotech's ARP engine — the reasoning layer every paid brief runs on. Continuous intelligence over public life-science data, with human approval gates.",
  alternates: { canonical: "/services/arp-engine" },
  openGraph: { url: "/services/arp-engine" },
  twitter: { card: "summary_large_image" },
};

const capabilities = [
  {
    title: "Continuous Reasoning Layer",
    desc: "Always-on monitoring across PubMed, ClinicalTrials, ChEMBL, GEO, and OpenAlex — the engine turns new evidence into ranked signal before the next brief lands.",
    icon: Workflow,
  },
  {
    title: "Multi-LLM Routing",
    desc: "Every task is routed by an LLM-as-router across specialist lanes (peptide, omics, intelligence, discovery). Models are swappable; the harness does not change.",
    icon: BrainCircuit,
  },
  {
    title: "Owner-Backed Decisions",
    desc: "High-stakes outputs route through human approval gates. The owner is the constant; the model is the variable. Every brief ships with a route, an owner, and a fit score.",
    icon: ShieldCheck,
  },
];

const workflow = [
  {
    step: "01",
    title: "Source",
    desc: "Public life-science data streams monitored continuously — papers, trials, compounds, assays, expression atlases.",
  },
  {
    step: "02",
    title: "Reason",
    desc: "LLM-as-router scores new evidence against active briefs, ranks candidates, flags contradictions.",
  },
  {
    step: "03",
    title: "Brief",
    desc: "Scoped, citation-anchored memo drafted in the target lane format (paid brief / project / retainer).",
  },
  {
    step: "04",
    title: "Review",
    desc: "Owner approval gate. Human review on every high-stakes decision. Notion receipt + shareable markdown.",
  },
  {
    step: "05",
    title: "Compound",
    desc: "Outcomes feed back into the reasoning layer. Each shipped brief makes the next one sharper.",
  },
];

const boundaries = [
  "ARP is a reasoning engine, not a database. The value is the routing layer, not the data access.",
  "We do not replace wet-lab validation. Computational hits are routed to the peptide-service or discovery lane for experimental follow-through.",
  "Every high-stakes decision routes through a human owner. The engine proposes; the owner decides.",
];

const stackItems = [
  {
    title: "Public Data",
    desc: "PubMed, ClinicalTrials.gov, ChEMBL, GEO, OpenAlex, Europe PMC.",
    icon: Database,
  },
  {
    title: "Reasoning Layer",
    desc: "LLM-as-router across specialist models. Swappable per task; harness stays fixed.",
    icon: BrainCircuit,
  },
  {
    title: "Owner Routing",
    desc: "Brown Biotech owner assigned per brief. Notion receipt + shareable markdown.",
    icon: GitBranch,
  },
  {
    title: "Human Gates",
    desc: "Approval gate on every high-stakes output. Pre-publish review by domain owner.",
    icon: ShieldCheck,
  },
];

export default function ArpEnginePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.20),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.22),transparent_26%),radial-gradient(circle_at_50%_85%,rgba(180,83,9,0.14),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-100 backdrop-blur">
              <Network className="h-4 w-4 text-cta" />
              ARP Engine · System of Intelligence
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              The reasoning layer every paid brief runs on.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Brown Biotech&apos;s ARP engine is the System of Intelligence behind every service lane — peptide, omics, drug discovery, intelligence. Continuous reasoning over public life-science data, owner-routed decisions, human approval gates.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#brief"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light"
              >
                See the engine <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10"
              >
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
            Three things make ARP a reasoning engine, not a database.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Brown Biotech&apos;s positioning is direct: we don&apos;t sell database access. We sell the routing layer on top of it.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.5rem] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <item.icon className="h-5 w-5" />
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
              From public data to owner-routed decision in five stages.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Every Brown Biotech lane runs on the same harness. The engine doesn&apos;t change between a paid brief, a project, or a retainer.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
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
          <span className="kicker">Stack</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            What the engine is built on.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Public sources, swappable models, owner routing, and human approval gates — the same stack every Brown Biotech lane runs on.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {stackItems.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.5rem] p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Boundaries</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            What the engine is not.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {boundaries.map((text) => (
            <article key={text} className="premium-panel flex items-start gap-3 rounded-[1.5rem] p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-7 text-text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900/60 p-8 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.14),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Sparkles className="h-3 w-3" />
              Powering every Brown Biotech lane
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Same engine. Different lane. Same owner.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
              ARP runs behind peptide-service, biostatx, genox-site, ai-drug-discovery, research-intelligence, and strict-omics. The lane is the surface; the engine is the substrate. When a serious question enters the system, the engine routes it to the right lane with the right owner — without changing the harness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light"
              >
                See all lanes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/business-pipeline"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-gray-200 transition hover:bg-white/10"
              >
                Pipeline blueprint
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="arp-engine"
        title="Talk to the engine team"
        description="If you want to understand the System of Intelligence, propose a lane, or integrate with the harness — send the essentials here and we will route it."
        prompts={[
          "What are you trying to understand about the reasoning layer?",
          "Are you exploring a new lane, integrating, or auditing an existing one?",
          "What outcome would make this conversation useful — a walkthrough, a blueprint, or a custom proposal?",
        ]}
      />
    </main>
  );
}