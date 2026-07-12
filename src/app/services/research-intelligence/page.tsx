import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, TrendingUp, Users, Sparkles, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Research Tournament Intelligence",
  description:
    "AI-powered research intelligence for longevity science. TrueSkill-ranked preprint analysis, pairwise tournament evaluation, and decision-ready scientific briefs.",
  alternates: { canonical: "/services/research-intelligence" },
  openGraph: { url: "/services/research-intelligence" },
  twitter: { card: "summary_large_image" },
};

const capabilities = [
  {
    title: "TrueSkill Ranking",
    desc: "Bayesian skill estimation — same algorithm used by Kurate.org. Papers ranked by TrueSkill (mu - 3σ) mapped to Elo-style scale centered at 1200.",
    icon: TrendingUp,
  },
  {
    title: "Pairwise Tournament",
    desc: "Multi-model round-robin evaluation across novelty, methodological rigor, real-world applications, breadth of impact, and timeliness.",
    icon: Users,
  },
  {
    title: "Positional Bias Correction",
    desc: "50% random pair-order flip before LLM evaluation. Eliminates first-presented-paper preference bias.",
    icon: ShieldCheck,
  },
  {
    title: "Decision-Ready Briefs",
    desc: "Not a ranking list — a ranked candidate report with AI Impact Assessment, confidence intervals, and ranked papers with next-action guidance.",
    icon: BrainCircuit,
  },
  {
    title: "PRISMA 2020 + RAISE Compliance",
    desc: "Every brief follows PRISMA 2020 reporting standards and RAISE responsible-AI guidelines — same frameworks used by Cochrane and HTA agencies.",
    icon: ShieldCheck,
  },
];

const workflow = [
  {
    step: "01",
    title: "Submit preprint or research question",
    desc: "Via inquiry form or paid brief. Single paper or topic-scoped search.",
  },
  {
    step: "02",
    title: "AI Impact Assessment",
    desc: "Claude Opus 4.6 Impact Assessment generated from full PDF — novelty, methodology, potential impact, limitations.",
  },
  {
    step: "03",
    title: "Pairwise tournament",
    desc: "Head-to-head comparison within category. Three-model rotation (GPT-5.2, Claude Opus 4.6, Gemini 3.1 Pro).",
  },
  {
    step: "04",
    title: "TrueSkill-ranked report",
    desc: "Decision-ready output: ranked candidates, AI ratings, confidence intervals, next-action guidance.",
  },
];

export default function ResearchIntelligencePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-cta" />
              Research Intelligence · beta
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Don&apos;t read every preprint. Read the ones that win.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Brown Biotech Research Intelligence applies multi-model pairwise tournament ranking to longevity science preprints — so you get decision-ready candidates, not a reading list.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
              PRISMA 2020 + RAISE compliant. Qualitative reasoning layer on top of automated extraction — same evidence standards as Cochrane, designed for biotech and longevity decision-makers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#brief"
                className="btn rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 text-white shadow-xl shadow-black/20 hover:from-primary-light hover:to-cta-light"
              >
                Request Intelligence Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="btn rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-gray-200 backdrop-blur hover:bg-white/10"
              >
                Back to service hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">How it works</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Four steps from preprint stack to ranked shortlist.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item, i) => (
            <article key={item.step} className="premium-panel rounded-[1.5rem] p-6">
              <div className="text-5xl font-semibold text-primary/20">{item.step}</div>
              <h3 className="mt-4 text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Core capabilities</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            The infrastructure behind every ranking.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((item, i) => (
            <article key={item.title} style={{ "--i": i } as React.CSSProperties} className="premium-panel card-hover rounded-[1.5rem] p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-divider bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="kicker">Coverage</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Focused on longevity science. Not the entire arXiv dump.
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              While Kurate covers 32 general science categories, Brown Biotech Research Intelligence is scoped to the categories that matter for longevity and aging research:
            </p>
          </div>
          <div className="stagger grid gap-4 md:grid-cols-3">
            {[
              "Biomolecules",
              "Cell Behavior",
              "Genomics",
              "Molecular Networks",
              "Neurons and Cognition",
              "Populations and Evolution",
              "Quantitative Methods",
              "Subcellular Processes",
              "Tissues and Organs",
              "Computers and Society",
              "Cryptography and Security",
              "Information Theory",
            ].map((cat) => (
              <span key={cat} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900/60 p-8 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.12),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Sparkles className="h-3 w-3" />
              Integrated with paid briefs
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Research Tournament Intelligence is a Brown Biotech paid brief.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
              This is not a self-serve SaaS. It&apos;s a paid intelligence service — you submit the question, we deliver the ranked shortlist with AI Impact Assessments and TrueSkill confidence intervals. Same brief intake as peptide-service and AI drug discovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="btn rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 text-white hover:from-primary-light hover:to-cta-light"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="research-intelligence"
        title="Request Research Intelligence Brief"
        description="Tell us your research question, target category, or preprint set. We'll deliver a PRISMA-RAISE compliant, TrueSkill-ranked shortlist with AI Impact Assessments and decision-ready recommendations."
        prompts={[
          "What is your research question or hypothesis?",
          "Which category or topic area should we focus on?",
          "Do you have a specific preprint set, or should we search arXiv?",
          "What outcome would make this useful — top-10 ranked list, full tournament report, or something else?",
        ]}
      />
    </main>
  );
}