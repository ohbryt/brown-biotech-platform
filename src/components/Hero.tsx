"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, ShieldCheck, Gauge } from "lucide-react";

const highlights = [
  "Inspectable workflow",
  "Human review required",
  "Decision-grade handoff",
];

const laneCards = [
  {
    title: "peptide-service",
    desc: "From target to supplier shortlist — scoped, cited, and routed in one brief.",
    outcome: "Clear scope → supplier shortlist",
  },
  {
    title: "biostatx",
    desc: "Analysis plan, statistical review, and decision-ready report for your dataset.",
    outcome: "Dataset → decision path",
  },
  {
    title: "genox-site",
    desc: "Discovery framing, partner scoping, and evidence-backed brief for genomics projects.",
    outcome: "Discovery → partner-ready brief",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-dark text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.20),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(180,83,9,0.18),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(146,64,14,0.14),transparent_30%)]" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-4 py-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm font-medium text-gray-100 shadow-lg shadow-black/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
              Brown Biotech · System of Intelligence — biotech reasoning layer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-7 text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            One brief, one owner, one next action.
            <span className="mt-3 block text-transparent bg-gradient-to-r from-white via-amber-100 to-cta bg-clip-text">
              inspect, route, review, deliver.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-7 max-w-2xl text-lg leading-8 text-gray-300"
          >
            Start with a paid brief — powered by a live reasoning layer over PubMed, ClinicalTrials, ChEMBL, and GEO. Every brief is decision-ready. Every handoff is visible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.26, ease: "easeOut" }}
            className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {[
              "One request ID",
              "One owner",
              "One next action",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                {item}
              </div>
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
              href="/browser-test"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
            >
              Try browser demo
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
            >
              View Services
            </a>
            <a
              href="/operator"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
            >
              Open Visual HQ
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-3"
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cta/20 via-transparent to-primary/15 blur-2xl" />
          <div className="relative premium-panel rounded-[2rem] border border-white/15 bg-black/30 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-100/90">
                  Service snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Inspectable workflow. One clear route.</h2>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-cta shadow-lg shadow-black/10">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {laneCards.map((lane, index) => (
                <div
                  key={lane.title}
                  className="rounded-2xl border border-white/15 bg-black/20 p-4 transition hover:bg-black/25"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/90">
                        <span className="h-2 w-2 rounded-full bg-cta" />
                        0{index + 1}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">{lane.title}</h3>
                      <p className="mt-1 text-sm font-medium leading-6 text-gray-100">{lane.desc}</p>
                      <p className="mt-2 text-xs font-medium text-amber-400/80">{lane.outcome}</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/10 p-2 text-white">
                      <Gauge className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["Response", "24h"],
                ["Focus", "Scope"],
                ["Output", "Handoff"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-400">{label}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/15 bg-black/25 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-cta" />
                <p className="text-sm leading-6 text-gray-100">
                  Research support only. High-stakes decisions still get human review.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down" className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 text-gray-300 backdrop-blur transition hover:bg-white/10">
          <ChevronDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
