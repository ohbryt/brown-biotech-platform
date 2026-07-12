import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck, FlaskConical, FileText, GitBranch } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";
import PrismLivePreview from "./PrismLivePreview";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";
const prismUrl = process.env.NEXT_PUBLIC_PRISM_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "biostatx",
  description:
    "Brown Biotech biostatx — biostatistics, analysis, and reporting for teams that need a cleaner evidence path. Live PRISM RAG preview included.",
  keywords: ["biostatistics", "paid brief", "PRISM", "TurboQuant", "evidence-based", "research consulting"],
  alternates: { canonical: "/services/biostatx" },
  openGraph: {
    title: "biostatx · Brown Biotech",
    description: "Decision-ready biostatistics briefs. Live PRISM RAG preview built in.",
    type: "website",
    url: `${siteUrl}/services/biostatx`,
  },
};

const proofItems = [
  {
    icon: BarChart3,
    title: "Phase II trial dataset analysis",
    client: "Mid-size pharmaceutical company",
    challenge: "A 280-subject Phase II dataset with multiple endpoints, missing data, and three active arms — the team needed a decision-ready analysis summary before an investor update.",
    approach: "Structured data audit, predefined analysis plan, confirmatory analysis with sensitivity checks, and a one-page executive summary structured around the decision question.",
    outcome: "Delivered a decision-ready report with primary/secondary endpoint results, safety summary, and a clear next-step recommendation. The brief was ready in 5 business days.",
    output: "Analysis plan + full report + executive summary",
    serviceHref: "/services/biostatx#brief",
  },
  {
    icon: FlaskConical,
    title: "Power analysis for an IPF fibrosis study",
    client: "Academic respiratory research group",
    challenge: "Study design phase for a potential IPF trial — needed to define sample size, primary endpoint, and statistical framework before grant submission.",
    approach: "Literature review of IPF endpoint conventions, power calculation across three endpoint scenarios, simulation-based sample size estimation, and a statistical methods section draft.",
    outcome: "Grant submission supported by a formal power analysis memo. The funder's statistical review came back clean.",
    output: "Power analysis memo + statistical methods draft",
    serviceHref: "/services/biostatx#brief",
  },
  {
    icon: GitBranch,
    title: "Multi-omics integration brief",
    client: "Academic multi-omics group",
    challenge: "Transcriptomics, proteomics, and clinical chemistry data from a 60-subject cohort — the team needed a structured integration plan before committing to an analysis vendor.",
    approach: "Data inventory across three modalities, alignment strategy for batch effects and missingness, unsupervised clustering framework design, and a multi-omics brief covering the recommended integration path.",
    outcome: "The brief served as the brief for vendor selection and the basis for a subsequent analysis engagement.",
    output: "Integration strategy brief + vendor evaluation framework",
    serviceHref: "/services/biostatx#brief",
  },
];

const whenToUse = [
  {
    title: "You already have data",
    desc: "A dataset, a results table, a clinical report — biostatx is the lane when you need to make sense of what you already have, not generate new data.",
  },
  {
    title: "You need analysis, not a peptide",
    desc: "biostatx produces statistical analysis, reporting packages, and decision-ready summaries. peptide-service produces scoped briefs for synthesis, screening, and peptide-specific questions.",
  },
  {
    title: "You want a second read",
    desc: "Before committing to a publication, a regulatory submission, or an investor presentation — a biostatx review adds a structured second opinion to your existing evidence.",
  },
];

const cards = [
  {
    title: "Who it is for",
    body: "Teams that need a cleaner evidence path, a lighter interpretation burden, or help choosing the right analysis route.",
  },
  {
    title: "What we do",
    body: "We review the dataset, recommend the analysis path, and keep the output aligned to the decision the team actually needs to make.",
  },
  {
    title: "What you get",
    body: "A review note, analysis plan, reporting package, and a result that is easier to share and act on.",
  },
];

const boundaries = [
  "We do not over-engineer a simple question.",
  "We will flag data issues before analysis moves forward.",
  "Human review stays in the loop for high-stakes outputs.",
];

export default function BiostatxPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <BarChart3 className="h-4 w-4 text-cta" />
              biostatx · supporting lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Biostatistics support for clearer decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              When the evidence is messy, we help define the analysis path, structure the work, and prepare a report that people can actually use.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="btn rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 text-white shadow-xl shadow-black/20 hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-gray-200 backdrop-blur hover:bg-white/10">
                Back to service hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="stagger grid gap-6 lg:grid-cols-3">
          {cards.map((item, i) => (
            <article key={item.title} style={{ "--i": i } as React.CSSProperties} className="premium-panel card-hover rounded-[1.75rem] p-8">
              <CheckCircle2 className="h-6 w-6 text-cta" />
              <p className="mt-4 text-lg font-semibold text-text">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Boundaries</span>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {boundaries.map((item, i) => (
              <div key={item} style={{ "--i": i } as React.CSSProperties} className="card-hover rounded-2xl border border-border bg-white p-5 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-cta" />
                <p className="mt-3 text-sm leading-7 text-text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Proof of work</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            What we have worked on.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Selected examples from biostatx engagements — each structured around a specific decision question.
          </p>
        </div>
        <div className="stagger grid gap-6 lg:grid-cols-3">
          {proofItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <article key={item.title} style={{ "--i": i } as React.CSSProperties} className="premium-panel card-hover flex flex-col rounded-[1.75rem] p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-cta/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.client}</p>
                  <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Challenge</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Approach</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.approach}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Outcome</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.outcome}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-border bg-white/70 px-4 py-3">
                  <p className="text-xs font-semibold text-primary">Output</p>
                  <p className="mt-1 text-sm text-text-muted">{item.output}</p>
                </div>
                <div className="mt-auto pt-5">
                  <Link href={item.serviceHref} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cta transition">
                    Request a similar brief <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Lane guide</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            When to use biostatx vs. peptide-service
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Both are paid brief lanes. They serve different stages of the research process.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {whenToUse.map((item, i) => (
              <div key={item.title} style={{ "--i": i } as React.CSSProperties} className="card-hover rounded-2xl border border-border bg-white p-6">
                <FileText className="h-5 w-5 text-primary" />
                <p className="mt-3 text-base font-semibold text-text">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold text-amber-900">Quick way to decide</p>
            <p className="mt-2 text-sm text-amber-800">
              <span className="font-semibold">biostatx</span> if you have data and need analysis.{" "}
              <span className="font-semibold">peptide-service</span> if you have a target or a peptide question that needs synthesis, evaluation, or a quote.
            </p>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="biostatx"
        title="Send a dataset or analysis brief"
        description="If you need a dataset review, a methods recommendation, or reporting support, send the basics and we'll route it quickly."
        prompts={[
          "What dataset or result do you want reviewed?",
          "Do you already have a hypothesis or analysis goal?",
          "Do you need a one-off report or an ongoing analysis partner?",
        ]}
      />

      {prismUrl && <PrismLivePreview />}
    </main>
  );
}
