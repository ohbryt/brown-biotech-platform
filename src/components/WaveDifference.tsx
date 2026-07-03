"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Wrench,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

/**
 * WaveDifference — Brown Biotech's positioning response to the
 * "biology-agent wave" (Phylo / Biomni Lab, Boltz + Claude Science, et al.).
 *
 * Anchor copy: Boltz team (2026-06-30) wrote that even an Opus-class agent
 * passed 76 of 82 DrugDiscoveryBench tasks (~93%) *only when handed a
 * human-written playbook*. The other half of the work — what to hold fixed,
 * what to vary, how to trust a model on a specific instance — is biology
 * judgment. That's the slot Brown Biotech occupies.
 *
 * Added 2026-07-02 in response to the week's competitive signals.
 */

const rowStyles = {
  tool: {
    icon: Wrench,
    badge: "Tool layer",
    title: "Boltz · Biomni · Claude Science",
    body: "Specialized biology models and integrated agent environments. They run the loop. They close the execution bottleneck (in silico co-fold, design, score). What they don't ship: the scientist's procedures for this molecule, this disease, this program.",
  },
  model: {
    icon: Sparkles,
    badge: "Model layer",
    title: "Frontier LLMs",
    body: "GPT-5.5, Gemini 3.5, Opus 4.8 — DrugDiscoveryBench showed the top three within 5 points of each other. The model matters less than the procedure you give it.",
  },
  reasoning: {
    icon: BrainCircuit,
    badge: "Reasoning layer · ours",
    title: "Brown Biotech",
    body: "A continuous reasoning layer over PubMed, ClinicalTrials, ChEMBL, GEO, and your proprietary data — plus a human reviewer for every high-stakes brief. The model can change; the harness does not.",
  },
};

const pillars = [
  {
    title: "Procedural playbooks",
    body: "Scientist-authored procedures — what to hold fixed, what to vary, which tool to trust on this instance. Handed to the agent, accuracy jumps above 90%.",
  },
  {
    title: "Multi-source triangulation",
    body: "PubMed + ChEMBL + ClinicalTrials + GEO + your internal data. One owner synthesizes; no orphan claims.",
  },
  {
    title: "Decision-grade handoff",
    body: "Every brief exits with a route, an owner, and an action — never an open-ended chat. High-stakes items go through human review.",
  },
];

export default function WaveDifference() {
  return (
    <section
      id="wave-difference"
      className="relative overflow-hidden bg-dark text-white py-28"
    >
      {/* Background tone */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(217,119,6,0.16),transparent_28%),radial-gradient(circle_at_15%_85%,rgba(146,64,14,0.14),transparent_30%)]" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100">
            <BrainCircuit className="h-3.5 w-3.5" />
            Why Brown Biotech
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Agent halves the work. The other half is biology judgment.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-300">
            Tool layers run the loop. Model layers pick the token. Our layer is
            what sits between them — the procedure, the source map, and the
            human reviewer that turns an agent into a decision. That&apos;s what
            we sell.
          </p>
        </motion.div>

        {/* Boltz quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
        >
          <Quote className="h-6 w-6 text-cta" />
          <blockquote className="mt-4 text-xl font-medium leading-relaxed text-white sm:text-2xl">
            &ldquo;Handed a human-written playbook, the agent passed 76 of 82
            — over 90%. The difference is human expertise. Agents handle a
            single query or calculation fine, but they lose the thread on
            long workflows.&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-gray-400">
            — The Boltz team,{" "}
            <a
              href="https://blog.boltz.bio/"
              target="_blank"
              rel="noreferrer"
              className="text-amber-100 underline-offset-4 hover:underline"
            >
              Driving the Boltz API with agents
            </a>{" "}
            (2026-06-30), now powering Claude Science.
          </figcaption>
        </motion.figure>

        {/* Stack layers */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {Object.entries(rowStyles).map(([key, row], i) => {
            const Icon = row.icon;
            const isOurs = key === "reasoning";
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className={
                  "relative h-full rounded-2xl border p-6 backdrop-blur " +
                  (isOurs
                    ? "border-cta/40 bg-gradient-to-br from-cta/15 via-primary/10 to-transparent"
                    : "border-white/10 bg-white/[0.04]")
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest " +
                      (isOurs
                        ? "border-cta/40 bg-cta/15 text-cta"
                        : "border-white/10 bg-white/5 text-gray-300")
                    }
                  >
                    {row.badge}
                  </span>
                  <Icon
                    className={
                      "h-5 w-5 " + (isOurs ? "text-cta" : "text-amber-100")
                    }
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {row.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {row.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Pillars */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.18 + i * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <ShieldCheck className="h-5 w-5 text-cta" />
              <h4 className="mt-4 text-base font-semibold text-white">
                {p.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="/services/business-pipeline#brief"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-7 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light"
          >
            Request a Paid Brief
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/blog/research-pulse"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
          >
            See today&apos;s research pulse
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
