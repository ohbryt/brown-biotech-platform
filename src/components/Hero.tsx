"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, FlaskConical, BarChart3, Sparkles, ShieldCheck } from "lucide-react";

const highlights = [
  "Inspectable workflow",
  "Human review required",
  "Decision-grade handoff",
];

const primaryLane = {
  icon: FlaskConical,
  name: "peptide-service",
  note: "Brief → quote → execution",
};

const secondaryLanes = [
  { icon: BarChart3, name: "biostatx", note: "Statistics for evidence" },
  { icon: Sparkles, name: "genox-site", note: "Discovery & partner path" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-dark text-white"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(180,83,9,0.14),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(146,64,14,0.10),transparent_32%)]" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:py-24">
        {/* LEFT — text-first */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm font-medium text-gray-100 shadow-lg shadow-black/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
              Brown Biotech · System of Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            One brief,
            <span className="block mt-2 text-transparent bg-gradient-to-r from-white via-amber-100 to-cta bg-clip-text">
              one owner, one next action.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-7 text-gray-300"
          >
            Start with a paid brief — a continuous reasoning layer over
            PubMed, ClinicalTrials, ChEMBL, and GEO. Agent halves the
            work; the other half is biology judgment. One owner closes it.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: "easeOut" }}
            className="mt-3 max-w-xl text-sm leading-6 text-gray-400"
          >
            Now wired to Boltz-2 (protein design + cofold) and benchmarked
            against Phylo&apos;s DrugDiscoveryBench — see{" "}
            <a
              href="#wave-difference"
              className="text-amber-100 underline-offset-4 hover:underline"
            >
              why teams pick us
            </a>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.26, ease: "easeOut" }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm text-gray-100 backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-cta" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/services/business-pipeline#brief"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-7 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light"
            >
              Request a Paid Brief
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
            >
              View Services
            </a>
          </motion.div>
        </div>

        {/* RIGHT — text-first service snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.06] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cta" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/90">
                  Paid brief · routing preview
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-300">
                Live
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
              One paid brief. Three lanes.
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Every request enters the same harness and exits with a route, an owner, and a handoff.
            </p>

            {/* Primary lane */}
            <div className="mt-6 rounded-2xl border border-cta/30 bg-gradient-to-br from-cta/15 via-primary/10 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cta shadow-lg shadow-primary/30">
                    <primaryLane.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-semibold text-white">
                        {primaryLane.name}
                      </p>
                      <span className="rounded-full border border-cta/30 bg-cta/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cta">
                        Primary
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {primaryLane.note}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-cta" />
              </div>
            </div>

            {/* Secondary lanes */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {secondaryLanes.map((lane) => {
                const Icon = lane.icon;
                return (
                  <div
                    key={lane.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-4 w-4 text-amber-100" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-semibold text-white">
                          {lane.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {lane.note}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Proof row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                PubMed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ClinicalTrials
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                ChEMBL
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                GEO
              </span>
            </div>

            {/* Human-review disclaimer */}
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11px] leading-relaxed text-gray-400">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cta" />
              <span>
                High-stakes decisions route through human review. The harness can change; the owner does not.
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#services" aria-label="Scroll down" className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 text-gray-300 backdrop-blur transition hover:bg-white/10">
          <ChevronDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
