"use client";

import { motion } from "framer-motion";
import {
  Layers,
  BrainCircuit,
  Database,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";

const differentiators = [
  {
    icon: Layers,
    title: "One lane at a time",
    desc: "The primary offer stays visible, so users know exactly where the business starts and what happens next.",
  },
  {
    icon: BrainCircuit,
    title: "AI-first, human-controlled",
    desc: "AI accelerates scope and analysis, but high-stakes decisions still go through human review.",
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
    desc: "Research notes, publications, and partner signals are surfaced instead of hidden behind generic marketing copy.",
  },
  {
    icon: Settings,
    title: "Reusable operating system",
    desc: "The same structure can support service work, partner funnel work, and operator review without changing the vocabulary.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Built for trust
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Security is the foundation, not a feature.
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Brown Biotech keeps the operating model narrow, visible, and reusable so the market sees one company, one workflow, and one next step. The harness improves from review to review, while human review stays visible on high-stakes actions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-surface rounded-2xl p-7 border border-gray-100 hover:border-primary/20 card-glow transition-all duration-200 cursor-default group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-cta/20 transition-all duration-200">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-text mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
