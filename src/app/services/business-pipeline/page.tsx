import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, CheckCircle2, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "business-pipeline",
  description: "Brown Biotech business pipeline for agentic drug discovery and biotech operations.",
  alternates: { canonical: "/services/business-pipeline" },
};

const cards = [
  {
    title: "Who it is for",
    body: "Teams that want a reusable company asset for routing, review, and brief production—not just a one-off project deliverable.",
  },
  {
    title: "What we do",
    body: "We package the workflow itself: intake, source mapping, triage, human review, and a brief that can move into the next step.",
  },
  {
    title: "What you get",
    body: "A reusable operating pipeline, a clear handoff artifact, and a structure that can support consulting or product work.",
  },
];

const steps = [
  { title: "Intake", desc: "Capture the request and define the lane." },
  { title: "Triage", desc: "Score fit, urgency, and approval risk." },
  { title: "Route", desc: "Assign one owner and one next action." },
  { title: "Review", desc: "Keep high-stakes items human-reviewed." },
  { title: "Deliver", desc: "Produce the brief, receipt, and archive." },
];

const boundaries = [
  "This lane supports the company; it does not replace judgment.",
  "No blind automation for public, legal, or high-stakes actions.",
  "Every output should be reusable in Notion and in conversation.",
];

export default function BusinessPipelinePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <GitBranch className="h-4 w-4 text-cta" />
              business-pipeline · strategic upgrade
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A company-owned pipeline for routing, review, and reusable briefs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Built for teams that want a repeatable source-to-brief workflow, clean review gates, a shareable receipt, and outputs that are useful enough to act on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              {[
                "Faster scoping",
                "Cleaner source mapping",
                "Human-reviewed delivery",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/browser-test" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Open browser demo
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
        serviceName="business-pipeline"
        title="Scope a Brown Biotech pipeline project"
        description="If you want to adapt the company pipeline, connect more sources, or turn it into a service offering, send the brief here."
        prompts={[
          "What problem should the pipeline solve?",
          "What sources or tools need to be connected?",
          "Do you want this as an internal system, a client service, or both?",
        ]}
      />
    </main>
  );
}
