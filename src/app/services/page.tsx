import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone, Sparkles, FlaskConical, BarChart3, GitBranch, Sigma, BrainCircuit, TrendingUp, Tag, Network, Utensils, Hammer } from "lucide-react";
import { MARKET_SIGNALS } from "@/lib/intake";

const siteName = "Brown Biotech Inc.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const primaryLanes = [
  {
    name: "peptide-service",
    href: "/services/peptide-service",
    icon: FlaskConical,
    summary: "Paid brief first for peptide projects.",
    forWhom: "Teams that need a clean peptide entry point.",
    deliverables: ["Scope call", "Quote", "Next step"],
    cta: "Request a Paid Brief",
    accent: "from-primary to-primary-dark",
    badge: "Primary",
  },
  {
    name: "biostatx",
    href: "/services/biostatx",
    icon: BarChart3,
    summary: "Biostatistics for decision-ready outputs.",
    forWhom: "Teams that need clearer evidence, faster.",
    deliverables: ["Dataset review", "Analysis plan", "Report"],
    cta: "Send a dataset",
    accent: "from-cta to-primary",
    badge: "Primary",
  },
  {
    name: "genox-site",
    href: "/services/genox-site",
    icon: Sparkles,
    summary: "Discovery support for scope and partnership talks.",
    forWhom: "Partners exploring a new research direction.",
    deliverables: ["Scope memo", "Direction", "Partner path"],
    cta: "Discuss a project",
    accent: "from-primary-light to-cta",
    badge: "Primary",
  },
];

const specialtyLanes = [
  {
    name: "ai-drug-discovery",
    href: "/services/ai-drug-discovery",
    icon: BrainCircuit,
    summary: "Molecular reasoning layer — FPembed fingerprinting + ARP v24 decision-scored candidates.",
    forWhom: "Teams that need decision-scored molecules, not a similarity list.",
    deliverables: ["FPembed encoding", "ARP v24 scoring", "Ranked candidate report"],
    cta: "Request a Discovery Brief",
    accent: "from-primary-dark to-primary",
    badge: "Specialty",
  },
  {
    name: "research-intelligence",
    href: "/services/research-intelligence",
    icon: TrendingUp,
    summary: "TrueSkill-ranked preprint tournament. PRISMA-RAISE compliant briefs — qualitative reasoning layer on top of automated extraction.",
    forWhom: "Longevity / omics / fibrosis teams that want ranked candidates, not a reading list.",
    deliverables: ["AI Impact Assessment", "TrueSkill ranking", "PRISMA-RAISE compliant brief"],
    cta: "Request an Intelligence Brief",
    accent: "from-cta to-primary-light",
    badge: "Specialty",
  },
  {
    name: "strict-omics",
    href: "/services/strict-omics",
    icon: Sigma,
    summary: "Audit-grade transcriptomics pipelines with RO-Crate provenance and LLM-validated gates.",
    forWhom: "Teams that need a defensible, reproducible multi-platform omics workflow.",
    deliverables: ["Run manifest", "RO-Crate provenance", "Decision-ready brief"],
    cta: "Request a Pipeline Brief",
    accent: "from-amber-500 to-primary-dark",
    badge: "Project",
  },
];

const flagshipLanes = [
  {
    name: "arp-engine",
    href: "/services/arp-engine",
    icon: Network,
    summary: "The System of Intelligence behind every Brown Biotech lane. Continuous reasoning layer over public life-science data, with human approval gates.",
    forWhom: "Teams that want to understand — or build on — the reasoning engine.",
    deliverables: ["Engine overview", "Lane map", "Access paths"],
    cta: "See the engine",
    accent: "from-primary-dark to-cta",
    badge: "Flagship",
  },
  {
    name: "site-forge",
    href: "/services/site-forge",
    icon: Hammer,
    summary: "Single-file biotech landing pages — generated, downloadable, ready to email. Outreach, conference booths, sample-brief previews.",
    forWhom: "BB operators and partners who need a one-pager artifact in under a minute.",
    deliverables: ["Self-contained HTML", "5 themes × 2 heading styles", "Accessibility built in"],
    cta: "Open the generator",
    accent: "from-primary-light to-cta",
    badge: "Flagship",
  },
];

const strategicLanes = [
  {
    name: "business-pipeline",
    href: "/services/business-pipeline",
    icon: GitBranch,
    summary: "A company-owned pipeline for biotech ops and decision-ready briefs.",
    forWhom: "Teams that want a reusable workflow with review.",
    deliverables: ["Blueprint", "Source map", "Delivery flow"],
    cta: "Open the pipeline",
    accent: "from-primary to-cta",
    badge: "Strategic upgrade",
  },
];

const comingSoonLanes = [
  {
    name: "Inventa",
    href: "/services/inventa",
    icon: Sparkles,
    summary: "AI research agent tournament for biotech hypothesis generation.",
    forWhom: "Teams that want structured competitive AI research with ranking.",
    deliverables: ["Hypothesis brief", "Evidence map", "Ranking score"],
    cta: "Join Waitlist",
    accent: "from-amber-400 to-orange-500",
    badge: "Coming soon",
  },
  {
    name: "ondining",
    href: "/services/ondining",
    icon: Utensils,
    summary: "Social dining for adults 40–60. Curated tables of 5–6 guests, trained hosts, designed with a medical advisor.",
    forWhom: "Adults who want a real evening conversation, and municipal / insurer / corporate wellness partners.",
    deliverables: ["Pilot table", "Trained host", "Post-dinner check-in"],
    cta: "Join the Gwangju pilot",
    accent: "from-orange-500 to-rose-700",
    badge: "Coming soon",
  },
];

const steps = [
  { title: "Scope", desc: "Define the problem and the outcome." },
  { title: "Route", desc: "Assign the lane and first milestone." },
  { title: "Deliver", desc: "Send one clear next step." },
];

const offerLadder = [
  { name: "Sample Brief", price: "₩0.3M ~ ₩1M", note: "Preview / scope check" },
  { name: "Paid Brief", price: "₩2M ~ ₩8M", note: "Decision-ready, PRISMA-RAISE compliant" },
  { name: "Project", price: "₩8M ~ ₩30M+", note: "Scoped analysis + execution" },
  { name: "Retainer", price: "₩3M ~ ₩15M+/mo", note: "Monthly research / ops support" },
];

const proofBlocks = [
  {
    icon: CheckCircle2,
    title: "Research proof",
    desc: "Turn the work into decision-ready evidence: scoped memo, citations, and a reusable summary.",
  },
  {
    icon: BarChart3,
    title: "Publications",
    desc: "Keep selected outputs public so the market can see what Brown Biotech actually ships.",
  },
  {
    icon: Sparkles,
    title: "Community",
    desc: "Use talks, reading notes, and partner updates to keep the ecosystem warm and visible.",
  },
  {
    icon: GitBranch,
    title: "Partner funnel",
    desc: "Route serious inbound interest into a brief, owner, and next action instead of a loose chat.",
  },
];

const evidenceBlocks = [
  { title: "Briefs", desc: "Decision-ready summaries and scoped requests." },
  { title: "Visual evidence", desc: "Screenshots, figures, slides, and chart captures." },
  { title: "Audio notes", desc: "Meeting clips and spoken context tied back to the brief." },
  { title: "Approved snippets", desc: "Reusable language only after human review." },
];

const faqs = [
  {
    q: "What should I send first?",
    a: "A short problem statement and the outcome you want.",
  },
  {
    q: "How fast do you respond?",
    a: "We aim to respond within 24 hours.",
  },
  {
    q: "Can you tailor the scope?",
    a: "Yes. We adapt to scope and budget.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Service Hub",
  description: "Brown Biotech service hub — 3 primary lanes (peptide-service, biostatx, genox-site), 3 specialty services (ai-drug-discovery, research-intelligence, strict-omics), 2 flagship capabilities (arp-engine, site-forge), strategic pipeline (business-pipeline), and the Inventa + ondining waitlists.",
  alternates: { canonical: "/services" },
};

function LaneCard({ lane, large = false }: { lane: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; summary: string; forWhom: string; deliverables: string[]; cta: string; accent: string; badge?: string }; large?: boolean }) {
  const Icon = lane.icon;
  return (
    <article className={`premium-panel group flex h-full flex-col rounded-[1.75rem] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${large ? "lg:p-10" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${lane.accent} shadow-lg shadow-primary/10`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {lane.badge && (
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
            lane.badge === "Coming soon"
              ? "border border-amber-200/20 bg-amber-100/10 text-amber-700"
              : lane.badge === "Strategic upgrade"
                ? "border border-primary/15 bg-primary/5 text-primary"
                : "border border-cta/20 bg-cta/10 text-cta"
          }`}>
            {lane.badge}
          </span>
        )}
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-text font-mono">{lane.name}</h3>
      <p className="mt-3 text-text-muted leading-7">{lane.summary}</p>
      <div className="mt-5 rounded-2xl bg-white/70 p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Best for</p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{lane.forWhom}</p>
      </div>
      <div className="mt-5">
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
      <Link href={lane.href} className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light">
        {lane.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

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
              Service hub · 10 active lanes
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              One place for paid briefs, routing, and decision-ready service requests.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Three primary lanes. Three specialty services. One flagship engine. One strategic pipeline. Two lanes in the waitlist queue. Every request returns a route preview, an owner, and a clear next step. If the fit is weak, we say so quickly and keep the handoff clean.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Privacy", "Private"],
                ["Response", "24h"],
                ["Lanes", "10 active"],
                ["Output", "Route preview"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/12 px-4 py-3 backdrop-blur">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-100/80">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-100">
              {[
                "Human review on high-stakes",
                "Notion receipt",
                "Private by default",
                "Decision-grade handoff",
              ].map((pill) => (
                <span key={pill} className="inline-flex items-center rounded-full border border-white/10 bg-white/12 px-4 py-2 backdrop-blur">
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#offer-ladder" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                View offer ladder <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="primary-lanes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Primary lanes</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Three primary lanes.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            The default entry points. Each is a clean route from inquiry to a decision-ready handoff.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {primaryLanes.map((lane) => (
            <LaneCard key={lane.name} lane={lane} />
          ))}
        </div>
      </section>

      <section id="specialty-lanes" className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">Specialty services</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Deeper lanes for specific questions.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Use these when the request is more technical or the deliverable needs a defensible methodology.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {specialtyLanes.map((lane) => (
              <LaneCard key={lane.name} lane={lane} />
            ))}
          </div>
        </div>
      </section>

      <section id="offer-ladder" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Offer ladder</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            A clearer path from sample brief to retainer.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Keep the entry point small, then expand only when the scope, owner, and next action are clear.
          </p>
          <Link
            href="/services/pricing"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-cta transition-colors"
          >
            <Tag className="h-3.5 w-3.5" />
            See the full pricing breakdown
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {offerLadder.map((item) => (
            <article key={item.name} className="premium-panel rounded-[1.5rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{item.name}</p>
              <p className="mt-3 text-2xl font-semibold text-text">{item.price}</p>
              <p className="mt-2 text-sm text-text-muted">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="flagship" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Flagship engine</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The System of Intelligence.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Brown Biotech&apos;s flagship engine. Continuous reasoning over public life-science data, with human approval gates. Every other lane runs on top of it.
          </p>
        </div>

        <div className="grid gap-6">
          {flagshipLanes.map((lane) => (
            <LaneCard key={lane.name} lane={lane} large />
          ))}
        </div>
      </section>

      <section id="strategic" className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">Strategic pipeline</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              The company pipeline, packaged as a premium service layer.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Brown Biotech can package the business pipeline itself as a higher-tier offering for teams that want a reusable workflow with review.
            </p>
          </div>

          <div className="grid gap-6">
            {strategicLanes.map((lane) => (
              <LaneCard key={lane.name} lane={lane} large />
            ))}
          </div>
        </div>
      </section>

      <section id="coming-soon" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Coming soon</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Lane queue.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Two lanes in the queue — including ondining&apos;s Gwangju social-dining pilot. Join the waitlist to be first when they ship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {comingSoonLanes.map((lane) => (
            <LaneCard key={lane.name} lane={lane} />
          ))}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">How we work</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              A simple process.
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
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Proof and partner motion</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Research proof, public signals, and a cleaner partner funnel.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Keep the proof visible, keep the outputs reusable, and route serious interest into a clear next step.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {proofBlocks.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="premium-panel rounded-[1.5rem] p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-muted">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Evidence stack</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Keep the brief tied to the evidence.
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Brown Biotech should be able to retrieve not just text, but PDFs, screenshots, figures, slides, and audio notes so the brief stays decision-ready.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {evidenceBlocks.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.5rem] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="kicker">Market signals</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                The routing layer is what the market is buying.
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Roche&apos;s PathAI deal is a good reminder that diagnostics value comes from workflow integration, not just model quality.
              </p>
            </div>
            <div className="space-y-4">
              {MARKET_SIGNALS.map((signal) => (
                <article key={signal.source} className="premium-panel rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">{signal.source}</p>
                  <p className="mt-3 text-lg font-semibold text-text">{signal.signal}</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">{signal.implication}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <span className="kicker">FAQ</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
              What people ask first.
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
          <div className="premium-panel rounded-[2rem] p-8 text-white bg-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_40%)]" />
            <div className="relative">
              <span className="kicker text-amber-100/80">Concierge</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Ready to route a project?</h2>
              <p className="mt-4 text-gray-300 leading-7">Send a short note and we&apos;ll route it.</p>
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
                <Link href="/services/business-pipeline#brief" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-gray-200 transition hover:bg-white/5">
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
