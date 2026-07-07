import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, BarChart3, Sparkles, GitBranch, MessageSquare } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pricing — Brown Biotech",
  description: "Brown Biotech offer ladder — from sample brief to retainer. Start small, expand when the scope is clear.",
  alternates: { canonical: "/services/pricing" },
};

const tiers = [
  {
    name: "Sample Brief",
    price: "₩0.3M – ₩1M",
    note: "Preview / scope check",
    icon: FlaskConical,
    accent: "from-primary to-primary-dark",
    forWhom: "Anyone who wants a quick fit check before committing to a deeper engagement.",
    includes: [
      "Light evidence review",
      "Initial scope assessment",
      "Route + owner preview",
      "One-page summary",
      "Notion record",
    ],
    cta: "Request a Sample Brief",
    ctaHref: "/services/peptide-service#brief",
    lane: "peptide-service",
  },
  {
    name: "Paid Brief",
    price: "₩2M – ₩8M",
    note: "Decision-ready research doc",
    icon: BarChart3,
    accent: "from-cta to-primary",
    forWhom: "Teams with a scoped question, a dataset, or a partnership conversation that needs a decision-ready output.",
    includes: [
      "Structured evidence review",
      "Decision question defined",
      "Route / owner / approval gate",
      "Full brief document",
      "Shareable receipt",
      "Notion record + mirror",
    ],
    cta: "Request a Paid Brief",
    ctaHref: "/services/peptide-service#brief",
    lane: "peptide-service",
  },
  {
    name: "Project",
    price: "₩8M – ₩30M+",
    note: "Scoped analysis + execution",
    icon: Sparkles,
    accent: "from-primary-light to-primary",
    forWhom: "Clients with a clear deliverable, a defined timeline, and a need for structured analysis and execution.",
    includes: [
      "Full evidence stack review",
      "Scoped analysis plan",
      "Human review gate",
      "Progress receipts",
      "Final deliverable",
      "Optional: source mapping + delivery flow",
    ],
    cta: "Scope a Project",
    ctaHref: "/services/business-pipeline#brief",
    lane: "business-pipeline",
  },
  {
    name: "Retainer",
    price: "₩3M – ₩15M / mo",
    note: "Monthly research / ops support",
    icon: GitBranch,
    accent: "from-primary to-cta",
    forWhom: "Teams that want a consistent operating partner for research, ops, and decision-ready briefings on an ongoing basis.",
    includes: [
      "Dedicated owner",
      "Monthly brief allocation",
      "Priority routing",
      "Notion HQ integration",
      "Telegram mirror",
      "Quarterly review",
    ],
    cta: "Start a Conversation",
    ctaHref: "/services/business-pipeline#brief",
    lane: "business-pipeline",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <MessageSquare className="h-4 w-4 text-cta" />
              Offer ladder
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Start small. Expand when the scope is clear.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Brown Biotech keeps the entry point accessible, then expands only when the lane, the owner, and the next action are defined. Every tier comes with a receipt and a Notion record.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Evidence-backed", "Every brief tied to data"],
                ["Route preview", "Before you commit"],
                ["Human gate", "High-stakes held for review"],
                ["Receipt", "Shareable + reusable"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-100/70">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <article key={tier.name} className="premium-panel flex flex-col rounded-[1.75rem] overflow-hidden">
                <div className={`inline-flex h-14 w-14 items-center justify-center bg-gradient-to-br ${tier.accent} p-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{tier.name}</p>
                  <p className="mt-3 text-2xl font-semibold text-text">{tier.price}</p>
                  <p className="mt-1 text-sm text-text-muted">{tier.note}</p>
                  <p className="mt-4 text-sm text-text-muted">{tier.forWhom}</p>
                  <ul className="mt-5 space-y-2">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <Link
                    href={tier.ctaHref}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tier.accent} px-5 py-3 font-semibold text-white shadow-lg transition hover:opacity-90`}
                  >
                    {tier.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">How the ladder works</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            A clearer path from first inquiry to ongoing partnership.
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start with the sample brief</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                A lightweight first step to check fit, define scope, and see the routing logic before committing to a larger engagement.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Expand when the lane is clear</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Once the brief, the owner, and the next action are defined — a paid brief or project engagement scales naturally from the same workflow.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Retainer for ongoing work</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Monthly research and ops support for teams that want a consistent owner and a reliable brief delivery process without renegotiating each time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="business-pipeline"
        title="Discuss a custom engagement"
        description="If you have a specific scope in mind, a pipeline question, or a multi-workstream project, send the brief here and we&apos;ll define the right tier and lane together."
        prompts={[
          "What problem or outcome are you working toward?",
          "What is the approximate timeline and budget range?",
          "Do you want this as a one-off engagement, an ongoing retainer, or a pipeline integration?",
        ]}
      />
    </main>
  );
}