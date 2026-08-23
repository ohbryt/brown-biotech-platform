"use client";

import { motion } from "framer-motion";
import { FlaskConical, BarChart3, Sparkles, Sigma, GitBranch, BrainCircuit, TrendingUp, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const primaryLanes = [
  {
    icon: FlaskConical,
    name: "peptide-service",
    badge: "Primary",
    desc: "The default entry point for peptide work. Brief first, quote second, execution after scope is clear.",
    href: "/services/peptide-service",
  },
  {
    icon: BarChart3,
    name: "biostatx",
    badge: "Supporting",
    desc: "Biostatistics and reporting for teams that need a cleaner decision path from raw data to evidence.",
    href: "/services/biostatx",
  },
  {
    icon: Sparkles,
    name: "genox-site",
    badge: "Supporting",
    desc: "Discovery and genomics-facing support for scoping, framing, and partner conversations.",
    href: "/services/genox-site",
  },
];

const specialtyLanes = [
  {
    icon: BrainCircuit,
    name: "ai-drug-discovery",
    badge: "Specialty",
    desc: "FPembed molecular reasoning — decision-scored candidates, not similarity lists.",
    href: "/services/ai-drug-discovery",
  },
  {
    icon: TrendingUp,
    name: "research-intelligence",
    badge: "Specialty",
    desc: "TrueSkill-ranked preprint tournament. PRISMA-RAISE compliant briefs with qualitative reasoning layer.",
    href: "/services/research-intelligence",
  },
  {
    icon: Sigma,
    name: "strict-omics",
    badge: "Project lane",
    desc: "Audit-grade transcriptomics pipelines. LLM proposes, deterministic gates decide.",
    href: "/services/strict-omics",
  },
];

const strategicLanes = [
  {
    icon: Network,
    name: "arp-engine",
    badge: "Flagship",
    desc: "The reasoning layer every paid brief runs on. System of Intelligence, with human approval gates.",
    href: "/services/arp-engine",
  },
  {
    icon: GitBranch,
    name: "business-pipeline",
    badge: "Strategic upgrade",
    desc: "The company pipeline itself, packaged as a reusable workflow with review gate.",
    href: "/services/business-pipeline",
  },
];

const offerLadder = [
  {
    name: "Sample Brief",
    note: "Preview / scope check",
    price: "₩0.3M ~ ₩1M",
    bullets: ["1-page scope preview", "Lane recommendation", "Owner introduction"],
    accent: "from-stone-100 to-stone-50",
    featured: false,
  },
  {
    name: "Paid Brief",
    note: "Decision-ready research doc",
    price: "₩2M ~ ₩8M",
    bullets: [
      "PubMed + ClinicalTrials + ChEMBL + GEO scan",
      "Decision-scored candidate set",
      "Human review gate before sign-off",
      "Notion handoff with route + owner",
    ],
    accent: "from-cta/15 via-primary/10 to-cta/5",
    featured: true,
  },
  {
    name: "Project",
    note: "Scoped analysis + execution",
    price: "₩8M ~ ₩30M+",
    bullets: ["Audit-grade pipeline", "Milestone-gated execution", "Co-authored deliverable"],
    accent: "from-primary/10 to-stone-50",
    featured: false,
  },
  {
    name: "Retainer",
    note: "Monthly research / ops support",
    price: "₩3M ~ ₩15M+/mo",
    bullets: ["Standing owner assignment", "Weekly cadence", "Priority intake routing"],
    accent: "from-stone-100 to-stone-50",
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="kicker">Service lanes</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Three primary lanes. Six more when you need them.
          </h2>
          <p className="mt-5 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Each lane is a clear entry point with one owner, a fixed deliverable, and a visible next step. Paid brief is the default; project, specialty, and strategic tiers are reserved for scoped work.
          </p>
        </motion.div>

        {/* Primary lanes — 3 cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {primaryLanes.map((lane, i) => {
            const Icon = lane.icon;
            const isPrimary = lane.badge === "Primary";
            return (
              <motion.div
                key={lane.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 ${
                  isPrimary
                    ? "border-2 border-cta/30 bg-gradient-to-br from-cta/5 via-white to-primary/5 shadow-lg shadow-cta/10"
                    : "border border-gray-100 bg-surface"
                }`}
              >
                {isPrimary && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(217,119,6,0.12), transparent 60%)",
                    }}
                  />
                )}
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-lg ${
                    isPrimary
                      ? "bg-gradient-to-br from-primary to-cta shadow-primary/20"
                      : "bg-gradient-to-br from-primary/10 to-cta/10"
                  }`}>
                    <Icon className={`h-7 w-7 ${isPrimary ? "text-white" : "text-primary"}`} />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
                    isPrimary
                      ? "border border-cta/30 bg-cta/10 text-cta"
                      : "border border-primary/15 bg-primary/5 text-primary"
                  }`}>
                    {lane.badge}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-text font-mono">
                  {lane.name}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed flex-1">
                  {lane.desc}
                </p>
                <Link
                  href={lane.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-cta transition-colors"
                >
                  Open lane
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Specialty lanes — 3 cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {specialtyLanes.map((lane, i) => {
            const Icon = lane.icon;
            return (
              <motion.div
                key={lane.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-surface p-8 transition-[transform,box-shadow,border-color] duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 shadow-lg">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    {lane.badge}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-text font-mono">
                  {lane.name}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed flex-1">
                  {lane.desc}
                </p>
                <Link
                  href={lane.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-cta transition-colors"
                >
                  Open lane
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Strategic lanes — 2 compact cards (Flagship + Strategic upgrade) */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {strategicLanes.map((lane) => {
            const Icon = lane.icon;
            const isFlagship = lane.badge === "Flagship";
            return (
              <Link
                key={lane.name}
                href={lane.href}
                className={`group flex items-center gap-4 rounded-2xl p-5 transition-colors ${
                  isFlagship
                    ? "border-2 border-cta/30 bg-gradient-to-br from-cta/5 via-white to-primary/5 shadow-lg shadow-cta/10 hover:shadow-xl"
                    : "border border-gray-100 bg-white hover:border-primary/20 hover:shadow-md"
                }`}
              >
                <div className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg shadow-lg ${
                  isFlagship
                    ? "bg-gradient-to-br from-primary to-cta shadow-primary/20"
                    : "bg-gradient-to-br from-primary/10 to-cta/10"
                }`}>
                  <Icon className={`h-5 w-5 ${isFlagship ? "text-white" : "text-primary"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-semibold text-text">{lane.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                      isFlagship
                        ? "border border-cta/30 bg-cta/10 text-cta"
                        : "border border-border bg-surface text-text-muted"
                    }`}>
                      {lane.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">{lane.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-white to-cta/5 p-6 sm:flex-row sm:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Offer ladder</p>
            <h3 className="mt-2 text-2xl font-bold text-text">A clearer path from sample brief to retainer.</h3>
            <p className="mt-2 text-sm text-text-muted">
              Keep the entry point small, then expand only when the brief, the owner, and the next action are clear.
            </p>
          </div>
          <Link
            href="/services/business-pipeline#brief"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3 font-semibold text-white shadow-lg shadow-primary/10 transition hover:from-primary-light hover:to-cta-light"
          >
            Start with a brief
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Offer ladder grid — upgraded comparison (Magic UI bento) */}
        <div className="stagger mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {offerLadder.map((item, i) => (
            <article
              key={item.name}
              style={{ "--i": i } as React.CSSProperties}
              className={`card-hover relative flex flex-col rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${
                item.featured
                  ? "border-cta/40 shadow-lg shadow-cta/10"
                  : "border-border bg-white"
              } ${item.featured ? item.accent : "from-white to-white"}`}
            >
              {item.featured && (
                <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-cta px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                  ★ Most popular
                </span>
              )}
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                item.featured ? "text-cta" : "text-primary"
              }`}>{item.name}</p>
              <p className="mt-2 text-xl font-bold text-text">{item.price}</p>
              <p className="mt-1 text-sm text-text-muted">{item.note}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cta" />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
