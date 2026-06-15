"use client";

import { motion } from "framer-motion";
import { Database, BrainCircuit, FileText, ShieldCheck, ArrowRight } from "lucide-react";

const stages = [
  {
    id: "01",
    icon: Database,
    title: "Source",
    body: "PubMed · ClinicalTrials · ChEMBL · GEO — 28 journals, 27 queries, 5 disease axes.",
    detail: "Continuous reasoning layer",
  },
  {
    id: "02",
    icon: BrainCircuit,
    title: "Reason",
    body: "AI-assisted analysis with LLM-as-router. Every output carries a route, an owner, and a fit score.",
    detail: "Visible harness, swappable model",
  },
  {
    id: "03",
    icon: FileText,
    title: "Brief",
    body: "A scoped, citation-anchored memo. Paid brief, project, or retainer — never an open-ended chat.",
    detail: "Decision-grade handoff",
  },
  {
    id: "04",
    icon: ShieldCheck,
    title: "Review",
    body: "High-stakes decisions route through human approval. Notion receipt + shareable markdown for partners.",
    detail: "Human gate respected",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden bg-surface py-28 dot-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="kicker">System of Intelligence</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            One harness, four stages.
          </h2>
          <p className="mt-5 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Brown Biotech runs a continuous reasoning layer over public data, then hands every output to one owner for one decision. The model can change; the harness does not.
          </p>
        </motion.div>

        {/* Pipeline flow */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[3.75rem] hidden h-px lg:block">
            <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-primary/20 hover:shadow-md">
                    {/* Number badge */}
                    <div className="absolute -top-3 left-6 inline-flex rounded-full border border-primary/15 bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                      Stage {stage.id}
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cta/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-text">{stage.title}</h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">{stage.body}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-cta">
                      {stage.detail}
                    </p>
                  </div>
                  {/* Arrow connector (desktop only) */}
                  {i < stages.length - 1 && (
                    <div className="absolute -right-3 top-[3.5rem] hidden h-6 w-6 items-center justify-center rounded-full border border-primary/15 bg-white text-primary lg:flex">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sources strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-primary/10 bg-white/60 px-6 py-5 backdrop-blur"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">Live sources</span>
          {["PubMed", "ClinicalTrials.gov", "ChEMBL", "GEO", "OpenAlex", "Europe PMC"].map((src) => (
            <span
              key={src}
              className="font-mono text-sm font-semibold text-text"
            >
              {src}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
