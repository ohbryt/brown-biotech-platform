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
    title: "Dual Modality",
    desc: "A single workflow for both small molecules and peptides, so teams can compare programs without switching tools.",
  },
  {
    icon: BrainCircuit,
    title: "AI-First Approach",
    desc: "AI is used to structure analysis, prioritize options, and speed up repetitive research work.",
  },
  {
    icon: Database,
    title: "Integrated Sources",
    desc: "Connects multiple public and curated sources for a broader view of the target and candidate space.",
  },
  {
    icon: FileText,
    title: "Automated Reporting",
    desc: "Produces clear summaries and handoff-ready reports for internal teams and external stakeholders.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Methods",
    desc: "Outputs are structured so users can see what was queried, scored, and filtered at each step.",
  },
  {
    icon: Settings,
    title: "Fully Configurable",
    desc: "Parameters and assumptions can be adjusted to match the project, modality, and decision context.",
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
            Our Advantage
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Built by scientists, for scientists. Here&apos;s what sets our platform apart.
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
