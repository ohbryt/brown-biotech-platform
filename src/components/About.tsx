"use client";

import { motion } from "framer-motion";
import { FlaskConical, Clock, ShieldCheck } from "lucide-react";

const stats = [
  {
    value: "5+",
    label: "Active service lanes",
    sub: "Paid brief → project → retainer",
    icon: FlaskConical,
    color: "bg-primary/10 text-primary",
  },
  {
    value: "24h",
    label: "Brief response target",
    sub: "Route + owner assigned",
    icon: Clock,
    color: "bg-cta/10 text-cta",
  },
  {
    value: "4",
    label: "Human approval gates",
    sub: "High-stakes decisions routed",
    icon: ShieldCheck,
    color: "bg-accent/10 text-primary-light",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <span className="kicker">Ready from day one</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Brief first. Proof next. Clear handoff every time.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Brown Biotech Inc. turns inquiries into a small number of decision-ready lanes. The site, the intake, and the Notion hub all use the same words so the company feels like one system instead of separate pages.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:shadow-md"
              >
                <div className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-mono text-5xl font-bold text-text leading-none">
                  {stat.value}
                </div>
                <div className="mt-3 text-sm font-semibold text-text">{stat.label}</div>
                <div className="mt-1 text-xs text-text-muted">{stat.sub}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
