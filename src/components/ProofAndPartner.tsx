"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Users, ArrowRight, Sparkles } from "lucide-react";

const proofCards = [
  {
    icon: CheckCircle2,
    title: "Research proof",
    desc: "Scoped memos, citations, and decision-ready summaries that make the work easier to trust.",
  },
  {
    icon: BookOpen,
    title: "Publications",
    desc: "Selected outputs stay public so partners can see the reasoning, not just the branding.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Useful updates, discussions, and reading notes keep the ecosystem warm without noise.",
  },
  {
    icon: Sparkles,
    title: "Partner funnel",
    desc: "Serious inbound interest gets routed into a brief, an owner, and a next action.",
  },
];

const publicationItems = [
  {
    title: "Research brief",
    desc: "Scoped summary with citations and a recommendation.",
  },
  {
    title: "Case note",
    desc: "A compact proof note with outcome and lesson learned.",
  },
  {
    title: "Methods note",
    desc: "Reusable workflow or analysis note for repeat work.",
  },
  {
    title: "Partner update",
    desc: "A public signal that opens the next serious conversation.",
  },
];

export default function ProofAndPartner() {
  return (
    <section id="proof" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Proof and partner motion
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Make the proof visible. Keep the partner path clean.
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Brown Biotech should show enough research proof to build trust, enough public signal to stay visible, and a clear route for serious partner interest. If someone wants to collaborate, the first move is a brief.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {proofCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="bg-surface rounded-2xl p-7 border border-gray-100 card-glow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{card.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-cta/5 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Selected publications</p>
            <h3 className="mt-3 text-2xl font-bold text-text">Short outputs that prove the work.</h3>
            <p className="mt-4 text-text-muted leading-relaxed">
              Publish just enough to show the reasoning, the evidence, and the decision path. Each item should support a paid brief or a partner conversation.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {publicationItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/70 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted leading-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Partner funnel</p>
            <h3 className="mt-3 text-2xl font-bold text-text">Partner-ready, not open-ended.</h3>
            <p className="mt-4 text-text-muted leading-relaxed">
              If someone wants to collaborate, advise, or buy, the first move should be a brief. That keeps the conversation clear and the work easier to deliver.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text-muted">
              <li>• qualify the signal</li>
              <li>• route into the right lane</li>
              <li>• assign one owner</li>
              <li>• keep human approval where needed</li>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="/services/business-pipeline#brief" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cta hover:bg-cta-light text-white font-semibold px-6 py-3 transition-colors">
                Request a Paid Brief
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white hover:border-primary/30 text-text font-semibold px-6 py-3 transition-colors">
                View service hub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
