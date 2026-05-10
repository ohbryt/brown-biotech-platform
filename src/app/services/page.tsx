import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone, Sparkles, FlaskConical, BarChart3, GitBranch } from "lucide-react";

const siteName = "Brown Biotech Inc.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const lanes = [
  {
    name: "peptide-service",
    href: "/services/peptide-service",
    icon: FlaskConical,
    summary: "Paid brief first for peptide-related projects, quotes, and consults.",
    forWhom: "Labs, founders, and operators who need a structured peptide entry point.",
    deliverables: ["Scope call", "Quote / proposal", "Action plan"],
    cta: "Request a Paid Brief",
    accent: "from-primary to-primary-dark",
  },
  {
    name: "biostatx",
    href: "/services/biostatx",
    icon: BarChart3,
    summary: "Biostatistics, analysis, and reporting for decision-ready outputs.",
    forWhom: "Researchers and biotech teams that need cleaner evidence and faster decisions.",
    deliverables: ["Dataset review", "Analysis plan", "Reporting package"],
    cta: "Send a dataset",
    accent: "from-cta to-primary",
  },
  {
    name: "genox-site",
    href: "/services/genox-site",
    icon: Sparkles,
    summary: "Discovery / genomics-facing support for scope and partnership conversations.",
    forWhom: "Partners and collaborators exploring new research directions.",
    deliverables: ["Scope memo", "Research direction", "Partnering path"],
    cta: "Discuss a project",
    accent: "from-primary-light to-cta",
  },
];

const steps = [
  { title: "Scope", desc: "Define the problem, audience, constraints, and success criteria." },
  { title: "Route", desc: "Assign the request to the right lane and agree on the first milestone." },
  { title: "Deliver", desc: "Send a structured output with a clear next step." },
];

const pipeline = {
  name: "business-pipeline",
  href: "/services/business-pipeline",
  icon: GitBranch,
  summary: "A company-owned pipeline for agentic drug discovery and biotech operations.",
  forWhom: "Teams that want a reusable source-to-synthesis workflow with human review.",
  deliverables: ["Pipeline blueprint", "Source mapping", "Delivery workflow"],
  cta: "Request a Paid Brief",
  accent: "from-primary to-cta",
};

const faqs = [
  {
    q: "What should I send first?",
    a: "A short description of the problem, the audience, and what a successful outcome would look like.",
  },
  {
    q: "How fast do you respond?",
    a: "We aim to respond within 24 hours and clarify the next step quickly.",
  },
  {
    q: "Can you tailor the scope?",
    a: "Yes. We can adapt the engagement to the project size, budget, and decision context.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Service Hub",
  description: "Brown Biotech service hub for peptide-service, biostatx, genox-site, and business-pipeline.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%),radial-gradient(circle_at_50%_85%,rgba(180,83,9,0.12),transparent_28%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
              Service hub
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One place for Brown Biotech&apos;s paid brief and service requests.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Route requests into the right lane, define the scope, and move toward
              a useful next step with less noise and more confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Private inquiry",
                "24h response target",
                "Three core lanes",
                "Live route preview",
              ].map((pill) => (
                <span key={pill} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#lanes" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                View service lanes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="lanes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Three core offers</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Choose the lane that matches the project.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Each lane is designed to be easy to explain, easy to route, and easy to hand off. Brief submissions also return a route preview so you know what happens next.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {lanes.map((lane) => {
            const Icon = lane.icon;
            return (
              <article key={lane.name} className="premium-panel group flex h-full flex-col rounded-[1.75rem] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${lane.accent} shadow-lg shadow-primary/10`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-text">{lane.name}</h3>
                  <span className="rounded-full border border-cta/20 bg-cta/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cta">
                    Lane
                  </span>
                </div>
                <p className="mt-3 text-text-muted leading-7">{lane.summary}</p>
                <div className="mt-6 rounded-2xl bg-white/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Best for</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{lane.forWhom}</p>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Typical outputs</p>
                  <ul className="mt-3 space-y-2 text-sm text-text-muted">
                    {lane.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-cta" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={lane.href} className="mt-auto inline-flex items-center gap-2 rounded-xl bg-dark px-5 py-3 font-semibold text-white transition hover:bg-dark/90">
                  {lane.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Strategic pipeline</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The company pipeline, packaged as a service.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Brown Biotech can also deliver the business pipeline itself as a structured
            service layer for research and discovery programs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          {[
            pipeline,
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.name} className="premium-panel group flex h-full flex-col rounded-[1.75rem] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:flex-row lg:items-center lg:gap-8">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-lg shadow-primary/10`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-6 lg:mt-0">
                  <h3 className="text-2xl font-semibold text-text">{item.name}</h3>
                  <p className="mt-3 text-text-muted leading-7">{item.summary}</p>
                  <div className="mt-6 rounded-2xl bg-white/70 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">Best for</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.forWhom}</p>
                  </div>
                </div>
                <Link href={item.href} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-dark px-5 py-3 font-semibold text-white transition hover:bg-dark/90 lg:mt-0 lg:ml-auto">
                  {item.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">How we work</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              A simple process that feels premium, not noisy.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="premium-panel relative rounded-[1.75rem] p-8">
                <div className="absolute left-8 top-8 -z-0 text-7xl font-semibold text-primary/8">0{index + 1}</div>
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <span className="kicker">FAQ</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
              What people usually ask first.
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="premium-panel rounded-[1.5rem] p-6">
                  <h3 className="font-semibold text-text">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="contact" className="premium-panel rounded-[2rem] p-8 text-white bg-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_40%)]" />
            <div className="relative">
              <span className="kicker text-amber-100/80">Concierge</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Ready to route a project?</h2>
              <p className="mt-4 text-gray-300 leading-7">Send a short note and we&apos;ll map the right lane, scope, and next step.</p>
              <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Phone className="h-4 w-4 text-cta" />
                  <a href="tel:+82-62-715-5377">+82-62-715-5377</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Mail className="h-4 w-4 text-cta" />
                  <a href="mailto:brownbio.ocm@gmail.com">brownbio.ocm@gmail.com</a>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light">
                  Home
                </Link>
                <Link href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-gray-200 transition hover:bg-white/5">
                  Open inquiry details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
