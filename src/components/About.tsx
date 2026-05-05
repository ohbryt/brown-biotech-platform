"use client";

import { motion } from "framer-motion";
import { Cpu, Database, FlaskConical } from "lucide-react";

const stats = [
  { value: "03", label: "Service Lanes", icon: Cpu, color: "bg-primary/10 text-primary" },
  { value: "05", label: "Portfolio Sites", icon: Database, color: "bg-cta/10 text-cta" },
  { value: "04", label: "Decision Steps", icon: FlaskConical, color: "bg-accent/10 text-primary-light" },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-6 tracking-tight">
            Turning Questions into Service Lanes
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Brown Biotech Inc. helps move projects from first inquiry to a clear
            engagement path. We use AI-assisted analysis, practical research
            judgment, and a focused portfolio of service lanes to help teams get
            to a useful next decision faster.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-glow cursor-default">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${stat.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-5xl font-bold text-text mb-2 font-[family-name:var(--font-mono)]">{stat.value}</div>
                <div className="text-text-muted text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
