"use client";

import { motion } from "framer-motion";
import { Layers, BrainCircuit, Database, FileText, ShieldCheck, Settings } from "lucide-react";

const differentiators = [
  {
    icon: Layers,
    title: "One lane at a time",
    desc: "The primary offer stays visible, so the work starts in the right place and the next step is always obvious.",
  },
  {
    icon: BrainCircuit,
    title: "AI-first, human-controlled",
    desc: "AI accelerates scope and analysis; high-stakes decisions stay with the human reviewer.",
  },
  {
    icon: Database,
    title: "One source of truth",
    desc: "Website, intake, and Notion all share the same nouns, states, and routing rules.",
  },
  {
    icon: FileText,
    title: "Decision-ready outputs",
    desc: "Every request ends in a brief, a route, or a clear handoff — never an open-ended chat.",
  },
  {
    icon: ShieldCheck,
    title: "Visible proof",
    desc: "Research notes, publications, and partner signals are surfaced, not hidden behind marketing copy.",
  },
  {
    icon: Settings,
    title: "Reusable operating system",
    desc: "The same harness supports service work, partner funnel work, and operator review without new vocabulary.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <span className="kicker">How we work</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Why teams pick Brown Biotech.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            The operating model stays narrow, visible, and reusable so the market sees one company, one workflow, and one next step. The harness improves; the vocabulary does not.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
