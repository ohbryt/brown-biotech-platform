"use client";

import { motion } from "framer-motion";
import { Workflow, Crosshair, ShieldCheck, Users, Gift, MessageSquare, GitBranch } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "peptide-service",
    desc: "A focused path for peptide-related projects, quotes, and consults.",
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: Crosshair,
    title: "biostatx",
    desc: "Biostatistics, analysis, and reporting for teams that need decision-ready outputs.",
    gradient: "from-cta to-primary",
  },
  {
    icon: ShieldCheck,
    title: "genox-site",
    desc: "Discovery / genomics-facing support for scope, collaboration, and partner conversations.",
    gradient: "from-primary-light to-primary",
  },
  {
    icon: Users,
    title: "Service Hub",
    desc: "A simple entry point for matching the right lane to the right project.",
    gradient: "from-cta to-cta-light",
  },
  {
    icon: GitBranch,
    title: "business-pipeline",
    desc: "A company-owned pipeline for agentic drug discovery and biotech operations.",
    gradient: "from-primary-dark to-cta",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            What We Build
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Brown Biotech Service Lanes
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Clear service lanes for teams that want a cleaner scope, a clearer
            next step, and a faster path to a useful conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-surface rounded-2xl p-8 border border-gray-100 card-glow text-center cursor-default group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${svc.gradient} mb-6 shadow-lg shadow-primary/10`}>
                <svc.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-text mb-3">
                {svc.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-14 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-cta/5 p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-6 shrink-0">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cta to-cta-light shadow-lg shadow-cta/10">
                <Gift className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-text mb-2">
                  Start with a clear inquiry
                </h3>
                <p className="text-text-muted">
                  Tell us what you&apos;re trying to solve. We&apos;ll map the right lane,
                  define the scope, and decide whether a deeper engagement makes sense.
                </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 bg-cta hover:bg-cta-light text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              Open Inquiry
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
