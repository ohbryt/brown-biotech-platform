"use client";

import { motion } from "framer-motion";
import { Workflow, Crosshair, ShieldCheck, Users, Gift, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Pilot-to-Report Delivery",
    desc: "A focused engagement that turns a target question into a structured report with the next decision path.",
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: Crosshair,
    title: "Target Triage",
    desc: "Prioritize the strongest targets, identify risks early, and avoid spending time on weak hypotheses.",
    gradient: "from-cta to-primary",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Developability Screening",
    desc: "Flag pharmacokinetic and toxicity concerns before they become expensive surprises downstream.",
    gradient: "from-primary-light to-primary",
  },
  {
    icon: Users,
    title: "Custom Advisory",
    desc: "A flexible engagement for founders, researchers, and BD teams who need faster answers and cleaner decisions.",
    gradient: "from-cta to-cta-light",
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
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Flexible engagement models for teams that want faster decisions,
            fewer dead ends, and cleaner pilot outputs.
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
                  Start with a short pilot
                </h3>
                <p className="text-text-muted">
                  The first 3 sessions are <span className="font-semibold text-cta">free of charge</span>.
                  We&apos;ll define the scope together and confirm whether a deeper engagement makes sense.
                </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 bg-cta hover:bg-cta-light text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
