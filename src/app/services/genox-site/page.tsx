import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, BarChart3, FlaskConical, Users } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "genox-site",
  description: "Brown Biotech genox-site — discovery and genomics-facing support for early-stage research and partnership conversations.",
  alternates: { canonical: "/services/genox-site" },
  openGraph: { url: "/services/genox-site" },
  twitter: { card: "summary_large_image" },
};

const proofItems = [
  {
    icon: Sparkles,
    title: "Longevity biomarker landscape review",
    client: "Biotech partner exploring an aging intervention pipeline",
    challenge: "The partner needed to map the current state of longevity biomarker research before committing to a target selection process. They had a short window before a board presentation.",
    approach: "Structured literature brief across five longevity pillar areas (senolytics,代谢,炎症,细胞应激,端粒), competitive target landscape, and a recommended sequencing path for their pipeline.",
    outcome: "Board presentation supported by a 12-page evidence brief. The partner selected two targets from the first pass and commissioned a deeper analysis on one.",
    output: "Target landscape brief + biomarker review + sequencing recommendation",
    serviceHref: "/services/genox-site#brief",
  },
  {
    icon: FlaskConical,
    title: "Senolytic target identification (NAAA pathway)",
    client: "Pharmaceutical company with an established oncology franchise",
    challenge: "Exploring a shift into anti-aging indications — needed a structured brief on the NAAA pathway, its connection to senescence, and the competitive landscape before entering due diligence.",
    approach: "Literature review on NAAA biology and its role in senescent cell clearance, competitive landscape for NAAA-targeting approaches, and a gap analysis identifying where the client could compete.",
    outcome: "Delivered a decision-ready scope brief that framed the opportunity in terms of clear next steps and a differentiated positioning path. Due diligence is now in progress.",
    output: "NAAA target brief + competitive gap analysis + next steps",
    serviceHref: "/services/genox-site#brief",
  },
  {
    icon: Users,
    title: "Partner due diligence on an aging company",
    client: "Venture capital firm evaluating a Series B target",
    challenge: "An aging-focused biotech with promising preclinical data was in the due diligence window. The VC needed a structured assessment of the scientific claims, competitive position, and key risks.",
    approach: "Technical due diligence brief: review of published evidence, competitive landscape against three comparable programs, regulatory pathway assessment, and a risk/opportunity summary.",
    outcome: "The brief fed directly into the investment committee memo. The VC proceeded with a term sheet and cited the scientific assessment as a key input.",
    output: "Due diligence brief + risk summary + regulatory pathway assessment",
    serviceHref: "/services/genox-site#brief",
  },
];

const whenToUse = [
  {
    title: "You need direction before you have data",
    desc: "genox-site is the lane when the question is still being shaped — you know the problem area but need to define the right research question before committing to analysis.",
  },
  {
    title: "You are scoping a partnership or collaboration",
    desc: "Partner conversations move faster when both sides have a shared brief. genox-site produces a framing memo that clarifies the opportunity and the constraints.",
  },
  {
    title: "You need to evaluate a scientific claim",
    desc: "Before investing, publishing, or moving forward — a genox-site brief adds an evidence-based second opinion to a scientific or strategic decision.",
  },
];

const cards = [
  {
    title: "Who it is for",
    body: "Teams that are exploring a new research direction, partner conversation, or genomics-facing problem that needs sharper framing.",
  },
  {
    title: "What we do",
    body: "We turn a broad idea into a scoped memo, a clear direction, and a conversation path that is easier to progress.",
  },
  {
    title: "What you get",
    body: "A discovery brief, a framing note, and a next-step path that can be reused in partner or internal discussion.",
  },
];

const boundaries = [
  "We do not turn exploratory work into overpromising.",
  "We keep the scope readable before asking for a deeper commitment.",
  "Human review remains required for public or high-stakes claims.",
];

export default function GenoxSitePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-cta" />
              genox-site · supporting lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Discovery and genomics-facing support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              For early conversations and partnership scoping, we help frame the problem, define the direction, and prepare a clear next step.
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

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Proof of work</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            What we have worked on.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Selected examples from genox-site engagements — discovery framing, scientific due diligence, and partnership scoping.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="premium-panel flex flex-col rounded-[1.75rem] p-8">
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
            When to use genox-site vs. biostatx
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Both are supporting lanes. They serve different phases of research.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {whenToUse.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="mt-3 text-base font-semibold text-text">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold text-amber-900">Quick way to decide</p>
            <p className="mt-2 text-sm text-amber-800">
              <span className="font-semibold">genox-site</span> if you need direction before you have data — discovery, framing, partnership scoping.{" "}
              <span className="font-semibold">biostatx</span> if you already have data and need analysis or reporting.
            </p>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="genox-site"
        title="Send a discovery brief"
        description="If you&apos;re exploring a new research direction or partnership conversation, send a concise brief and we&apos;ll map the path."
        prompts={[
          "What problem or research opportunity are you trying to frame?",
          "Is this exploratory, partnership-related, or decision-driven?",
          "What would make the next conversation useful?",
        ]}
      />
    </main>
  );
}