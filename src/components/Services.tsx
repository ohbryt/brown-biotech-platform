"use client";

import { motion } from "framer-motion";
import { Workflow, Crosshair, ShieldCheck, Users, Gift, MessageSquare, GitBranch, Sparkles, Sigma } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "peptide-service",
    desc: "The default entry point for peptide work: brief first, quote second, execution after scope is clear.",
    badge: "Primary lane",
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: Crosshair,
    title: "biostatx",
    desc: "Biostatistics and reporting support for teams that need a cleaner decision path.",
    badge: "Supporting lane",
    gradient: "from-cta to-primary",
  },
  {
    icon: ShieldCheck,
    title: "genox-site",
    desc: "Discovery and genomics-facing support for scoping, framing, and partner conversations.",
    badge: "Supporting lane",
    gradient: "from-primary-light to-primary",
  },
  {
    icon: Users,
    title: "Service Hub",
    desc: "A simple intake surface that routes the right request to the right lane with a clear owner.",
    badge: "Route preview",
    gradient: "from-cta to-cta-light",
  },
  {
    icon: Sigma,
    title: "strict-omics",
    desc: "Audit-grade transcriptomics pipelines. LLM proposes, deterministic gates decide. Project-tier engagements.",
    badge: "Project lane",
    gradient: "from-amber-500 to-primary-dark",
  },
  {
    icon: GitBranch,
    title: "business-pipeline",
    desc: "A company-owned pipeline for routing, review, and decision-ready briefs that can scale across the business.",
    badge: "Strategic upgrade",
    gradient: "from-primary-dark to-cta",
  },
];

const offerLadder = [
  { name: "Sample Brief", note: "Preview / scope check", price: "₩0.3M ~ ₩1M" },
  { name: "Paid Brief", note: "Decision-ready research doc", price: "₩2M ~ ₩8M" },
  { name: "Project", note: "Scoped analysis + execution", price: "₩8M ~ ₩30M+" },
  { name: "Retainer", note: "Monthly research / ops support", price: "₩3M ~ ₩15M+/mo" },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Service lanes
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            One brief, one owner, one next action.
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Inspectable service lanes for teams that want a visible route, a clear owner, and a faster path to a useful handoff. Text, files, and signals all enter the same brief. The harness stays the same even when the model changes. Paid brief is the default entry point.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-surface rounded-2xl p-8 border border-gray-100 card-glow text-center cursor-default group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${svc.gradient} mb-6 shadow-lg shadow-primary/10`}>
                <svc.icon className="h-7 w-7 text-white" />
              </div>
              <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {svc.badge}
              </div>
              <h3 className="text-lg font-bold text-text mb-3">
                {svc.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-14 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-cta/5 p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-6 shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cta to-cta-light shadow-lg shadow-cta/10">
                <Gift className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
                <p className="text-xl font-bold text-text mb-2">
                  Start with the paid-brief motion
                </p>
                <p className="text-text-muted">
                  Tell us what you&apos;re trying to solve. We&apos;ll map the right lane, define the scope, and decide whether a deeper engagement makes sense.
                </p>
            </div>
            <a
              href="/services/business-pipeline#brief"
              className="shrink-0 inline-flex items-center gap-2 bg-cta hover:bg-cta-light text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              Request a Paid Brief
            </a>
            <a
              href="/browser-test"
              className="shrink-0 inline-flex items-center gap-2 border border-primary/20 bg-white hover:border-primary/30 text-text font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Try browser demo
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-10 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-white to-cta/5 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Offer ladder</p>
              <h3 className="mt-2 text-2xl font-bold text-text">A clearer path from sample brief to retainer.</h3>
              <p className="mt-3 text-text-muted">
                Keep the entry point small, then expand only when the brief, the owner, and the next action are clear.
              </p>
            </div>
            <a
              href="/services/business-pipeline#brief"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3 font-semibold text-white shadow-lg shadow-primary/10 transition hover:from-primary-light hover:to-cta-light"
            >
              Start with a brief
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {offerLadder.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.name}</p>
                <p className="mt-2 text-lg font-bold text-text">{item.price}</p>
                <p className="mt-2 text-sm text-text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
