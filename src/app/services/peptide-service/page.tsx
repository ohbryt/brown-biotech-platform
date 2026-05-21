import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "peptide-service",
  description: "Brown Biotech peptide-service landing page for peptide-related projects, quotes, and consults.",
  alternates: { canonical: "/services/peptide-service" },
};

const cards = [
  {
    title: "Who it is for",
    body: "Teams with a peptide question, candidate set, formulation constraint, or partner discussion that needs a clean entry point.",
  },
  {
    title: "What we do",
    body: "We clarify scope, define the right lane, and produce a brief that can move from discussion to decision without extra noise.",
  },
  {
    title: "What you get",
    body: "A scoped brief, a route preview, a reusable receipt, and a clear next action you can share internally.",
  },
];

const boundaries = [
  "We do not start execution before scope is clear.",
  "High-stakes steps remain human-reviewed.",
  "The first output is a decision-ready brief, not a vague promise.",
];

const assayTypes = ["ELISA", "qPCR", "Proteomics / MASS-spec", "Cell-based assay", "Other"];

const pricingTiers = [
  {
    tier: "Sample Brief",
    range: "₩0.3M ~ ₩1M",
    description: "Quick fit check or initial scoping conversation.",
  },
  {
    tier: "Paid Brief",
    range: "₩2M ~ ₩8M",
    description: "Focused scope document with route preview and next action.",
  },
  {
    tier: "Project",
    range: "₩8M ~ ₩30M+",
    description: "Full execution lane with deliverables and review gates.",
  },
];

export default function PeptideServicePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <FlaskConical className="h-4 w-4 text-cta" />
              peptide-service · primary lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Peptide projects start with a brief.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Bring the question, the target outcome, and the constraints.
              We&apos;ll route the request, define the scope, and shape the next step.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Back to service hub
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

      {/* Pricing Table */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Offer ladder</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">Pricing overview</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">
            Three engagement tiers — each scoped before any commitment.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {pricingTiers.map((item) => (
              <div key={item.tier} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cta">{item.tier}</p>
                  <span className="rounded-full bg-gradient-to-r from-primary/10 to-cta/10 px-3 py-1 text-xs font-semibold text-primary">
                    {item.range}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assay Type Selector */}
      <section className="mx-auto max-w-6xl px-4 pb-0 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Service specifics</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">Assay type</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">
            Tell us the primary assay or detection method for your peptide project.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {assayTypes.map((assay) => (
              <div
                key={assay}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-sm transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-cta/15">
                  <FlaskConical className="h-4 w-4 text-cta" />
                </div>
                <p className="text-sm font-semibold text-text">{assay}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="peptide-service"
        title="Send a peptide project brief"
        description="If you want a fit check, a quote path, or a clearer next step, send the essentials here and we&apos;ll route it well."
        prompts={[
          "What peptide question or project are you working on?",
          "What outcome would make this useful?",
          "Do you need a quote, consultation, or scoped action plan?",
        ]}
        peptideFields={{
          assayTypes: ["ELISA", "qPCR", "Proteomics / MASS-spec", "Cell-based assay", "Other"],
          targetOrganismLabel: "Target organism / matrix",
          hasSequenceLabel: "I have a peptide/protein sequence",
        }}
      />
    </main>
  );
}
