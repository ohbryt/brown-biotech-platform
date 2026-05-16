import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, MonitorSmartphone, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import { MARKET_SIGNALS, ROUTE_CARDS } from "@/lib/intake";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const stack = [
  "Notion = source of truth",
  "Brown Biotech site = intake + proof",
  "Open Design = local operator console",
  "Claude Code = deep repo work",
  "Codex = scoped fast work",
  "Telegram = human approval",
];

const steps = [
  { title: "1. Intake", desc: "Request enters from site or Telegram and gets a request ID." },
  { title: "2. Triage", desc: "Fit, urgency, and approval risk decide the route." },
  { title: "3. Execute", desc: "Open Design launches the right local agent for the task." },
  { title: "4. Publish", desc: "Receipt, proof, and HQ updates are written back." },
];

const visualBlocks = [
  {
    title: "Intake flow",
    items: ["Signal", "Qualify", "Brief", "Route", "Review", "Deliver"],
  },
  {
    title: "Active lanes",
    items: ["peptide-service", "biostatx", "genox-site", "business-pipeline"],
  },
  {
    title: "Proof layer",
    items: ["Research proof", "Publications", "Case notes", "Partner updates"],
  },
  {
    title: "Approval gate",
    items: ["Money", "Contracts", "Deployment", "Public claims", "Medical claims"],
  },
];

const diagram = String.raw`flowchart LR
  A[Inbound request] --> B[Intake]
  B --> C[Triage]
  C --> D{Approve?}
  D -->|Yes| E[Route]
  D -->|No| F[Nurture]
  E --> G[Execute]
  G --> H[Proof]
  H --> I[Weekly review]
  I --> J[HQ update]
  J --> K[Visual HQ]
  K --> A`;

const operatorCards = [
  {
    title: "Request state",
    value: "Intake → triage → route",
    note: "One request ID, one owner, one next action.",
  },
  {
    title: "Approval rail",
    value: "Human gate",
    note: "Money, contracts, deployment, public claims, medical claims.",
  },
  {
    title: "Delivery proof",
    value: "Receipt + update",
    note: "Every output leaves a reusable record in Notion.",
  },
  {
    title: "Harness loop",
    value: "Improve the workflow",
    note: "Weekly review feeds routing, wording, and templates back into the system.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Visual HQ & Operator Stack",
  description: "Brown Biotech control room for intake, routing, local tools, proof, and review.",
  alternates: { canonical: "/operator" },
};

export default function OperatorPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%),radial-gradient(circle_at_50%_85%,rgba(180,83,9,0.12),transparent_28%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
              Internal control room
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Visual HQ + Local Operator Stack
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              This page shows how Brown Biotech turns a request into a brief, a route, a local action, and a reusable proof asset — with Notion as the source of truth, Telegram as the approval rail, and the harness improving from every review.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services/business-pipeline#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white transition hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/browser-test" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Open browser demo
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="premium-panel rounded-[1.75rem] border border-primary/10 bg-gradient-to-br from-white via-white to-cta/5 p-8 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-cta" />
              <h2 className="text-2xl font-semibold text-text">Integrated operating loop</h2>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-2xl border border-border bg-dark/95 p-5 text-xs leading-6 text-gray-200">
              <code>{diagram}</code>
            </pre>
            <p className="mt-5 text-sm leading-7 text-text-muted">
              The graph is intentionally narrow: intake, route, execute, proof, review, then update the HQ.
            </p>
          </article>

          <article className="premium-panel rounded-[1.75rem] border border-primary/10 bg-gradient-to-br from-white via-white to-cta/5 p-8 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-3">
              <MonitorSmartphone className="h-5 w-5 text-cta" />
              <h2 className="text-2xl font-semibold text-text">One-screen visual HQ</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {visualBlocks.map((block) => (
                <div key={block.title} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{block.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-text-muted">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-cta" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {operatorCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{card.title}</p>
                  <p className="mt-2 text-sm font-semibold text-text">{card.value}</p>
                  <p className="mt-1 text-sm leading-6 text-text-muted">{card.note}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="kicker">Local operator stack</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              The tools are chosen by task, but the truth lives in Notion.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {stack.map((item) => (
                <div key={item} className="premium-panel rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-cta" />
                    <p className="text-sm font-semibold text-text">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="premium-panel rounded-[1.75rem] p-8">
              <div className="flex items-center gap-3">
                <PlayCircle className="h-5 w-5 text-cta" />
                <h3 className="text-2xl font-semibold text-text">How it runs</h3>
              </div>
              <div className="mt-6 space-y-4">
                {steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-sm font-semibold text-primary">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-text-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Notion receipt",
                  "Operator console",
                  "Route preview",
                  "Proof archive",
                ].map((tag) => (
                  <span key={tag} className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-text">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-cta/15 bg-cta/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">Evidence stack</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Briefs", "Decision-ready summaries and scoped requests."],
                    ["Visual evidence", "Screenshots, figures, slides, and chart captures."],
                    ["Audio notes", "Meeting clips and spoken context tied back to the brief."],
                    ["Approved snippets", "Reusable language only after human review."],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-xl border border-amber-200 bg-white p-4">
                      <p className="text-sm font-semibold text-text">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>Human approval stays on money, contracts, deployment, public claims, and medical claims.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="kicker">Routing layer v0</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              The router should always return the same four outputs.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Brown Biotech&apos;s intake flow becomes legible when every request produces route, owner, approval gate, and next action in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ROUTE_CARDS.map((card) => (
              <article key={card.title} className="premium-panel rounded-[1.5rem] p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{card.title}</p>
                <p className="mt-3 text-lg font-semibold text-text">{card.summary}</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">{card.details}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {MARKET_SIGNALS.map((signal) => (
              <article key={signal.source} className="premium-panel rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">{signal.source}</p>
                <p className="mt-3 text-lg font-semibold text-text">{signal.signal}</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">{signal.implication}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
