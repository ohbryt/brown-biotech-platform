"use client";

import { motion } from "framer-motion";
import { SearchCheck, Rocket, ClipboardList } from "lucide-react";

const steps = [
  {
    icon: SearchCheck,
    title: "Discover",
    desc: "We clarify the target, therapeutic hypothesis, constraints, and success criteria before any work begins.",
  },
  {
    icon: Rocket,
    title: "Pilot",
    desc: "We run a focused pilot, surface decision-ready outputs, and show exactly what the platform can and cannot do.",
  },
  {
    icon: ClipboardList,
    title: "Deliver",
    desc: "We hand over a structured report, prioritized recommendations, and a practical next-step plan.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Engagement Model
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            How We Work
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A simple process designed for fast pilots, transparent expectations, and usable outputs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-gray-100 bg-surface p-8 card-glow"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cta shadow-lg shadow-primary/10">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary font-[family-name:var(--font-mono)]">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
