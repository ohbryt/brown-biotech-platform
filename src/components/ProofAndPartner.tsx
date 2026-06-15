"use client";

import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const proofCards = [
  {
    icon: CheckCircle2,
    title: "Research proof",
    desc: "Scoped memos, citations, and decision-ready summaries that make the work easier to trust.",
    stat: "Brief first",
  },
  {
    icon: BookOpen,
    title: "Publications",
    desc: "Selected outputs stay public so partners can see the reasoning, not just the branding.",
    stat: "Evidence-led",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Useful updates, discussions, and reading notes keep the ecosystem warm without noise.",
    stat: "Signal-rich",
  },
];

const publicationItems = [
  {
    title: "Research brief",
    desc: "Scoped summary with citations, evidence map, and a recommendation you can act on.",
  },
  {
    title: "Case note",
    desc: "A compact proof note with outcome, methods used, and what made the difference.",
  },
  {
    title: "Methods note",
    desc: "Reusable analysis workflow or statistical approach you can apply to your next project.",
  },
  {
    title: "Partner update",
    desc: "A focused signal brief that opens the next serious conversation with a clear ask.",
  },
];

const funnelSteps = [
  "qualify the signal",
  "route into the right lane",
  "assign one owner",
  "keep human approval where needed",
];

export default function ProofAndPartner() {
  return (
    <section id="proof" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <span className="kicker">Proof and partner motion</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-text tracking-tight">
            Make the proof visible. Keep the partner path clean.
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed">
            Brown Biotech shows enough research proof to build trust, enough public signal to stay visible, and a clear route for serious partner interest. If someone wants to collaborate, the first move is a brief.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {proofCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-2xl border border-gray-100 bg-surface p-7 transition hover:border-primary/20 hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.desc}</p>
                <div className="mt-4 inline-flex rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                  {card.stat}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Publications box */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-cta/5 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Selected publications</p>
            <h3 className="mt-3 text-2xl font-bold text-text">Short outputs that prove the work.</h3>
            <p className="mt-3 text-text-muted leading-relaxed">
              Publish just enough to show the reasoning, the evidence, and the decision path. Each item should support a paid brief or a partner conversation.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {publicationItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/70 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted leading-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner funnel box */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Partner funnel</p>
            <h3 className="mt-3 text-2xl font-bold text-text">Partner-ready, not open-ended.</h3>
            <p className="mt-3 text-text-muted leading-relaxed">
              If someone wants to collaborate, advise, or buy, the first move should be a brief. That keeps the conversation clear and the work easier to deliver.
            </p>
            <ol className="mt-6 space-y-3 text-sm text-text-muted">
              {funnelSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 font-mono text-[10px] font-bold text-primary">
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services/business-pipeline#brief"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light"
              >
                Request a Paid Brief
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-5 py-3 font-semibold text-text transition hover:border-primary/30"
              >
                View service hub
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
