"use client";

import { motion } from "framer-motion";
import { SearchCheck, Route, ClipboardCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: SearchCheck,
    title: "Scope",
    desc: "Clarify the need, audience, constraints, and the outcome you want before any work begins.",
  },
  {
    icon: Route,
    title: "Route",
    desc: "Assign the lane, name the owner, and confirm the first milestone. You see the route, not just the result.",
  },
  {
    icon: ClipboardCheck,
    title: "Deliver",
    desc: "Hand over a structured output, a practical recommendation, and one clear next step.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <span className="kicker">Delegate the work</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Own the decisions, not the busy work.
          </h2>
          <p className="mt-5 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            A simple process designed for fast handoff, transparent expectations, and usable outputs. We keep the loop narrow so the team can focus on the next useful action.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-12 hidden h-px w-2/3 -translate-x-1/2 lg:block">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  className="relative rounded-2xl border border-gray-100 bg-surface p-8 transition hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cta shadow-lg shadow-primary/10">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-mono text-4xl font-bold text-primary/15">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
