import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, GitBranch, Sparkles, CheckCircle2, BarChart3, MessageSquare } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Case Studies — Brown Biotech",
  description: "Selected Brown Biotech research outputs — decision-ready briefs, evidence trails, and peer work product.",
  alternates: { canonical: "/case-studies" },
};

const studies = [
  {
    id: "arp-naaa-senolytic",
    tag: "ARP Pipeline · Senolytic",
    title: "ARP-NAAA Senolytic Target Brief",
    client: "Pharmaceutical company entering the senescence space",
    duration: "6 weeks",
    route: "peptide-service",
    icon: FlaskConical,
    gradient: "from-primary to-primary-dark",
    challenge: {
      label: "Challenge",
      body: "A pharmaceutical company with an established oncology franchise was exploring anti-aging indications and needed a structured brief on the NAAA (N-acylethanolamine acid amidase) pathway before committing to a due diligence process. The internal team had limited bandwidth and needed an external evidence review to frame the opportunity.",
    },
    approach: {
      label: "Approach",
      body: "Structured literature brief: NAAA biology and its role in senescent cell clearance, current competitive landscape for senolytic approaches, a gap analysis identifying where the client could enter without competing head-on with established senolytic programs. The brief was structured as a decision-ready document covering biology, competitive position, and a recommended next step.",
    },
    evidence: {
      label: "Evidence stack",
      items: [
        "PubMed: NAAA pathway biology and substrate selectivity (2018–2024)",
        "ClinicalTrials.gov: active senolytic programs and recruitment status",
        "ChEMBL: NAAA inhibitor structures and activity data",
        "Competitive landscape: 6 programs in senolytic development",
        "Patent landscape: key filings in NAAA-targeted approaches",
      ],
    },
    outcome: {
      label: "Outcome",
      body: "Delivered a 14-page evidence brief with a competitive gap map and three actionable next steps. The brief was used to support an internal go/no-go decision and subsequently shared with the business development team. Two of the three recommended next steps are now in active scoping.",
    },
    nextAction: {
      label: "Next action",
      body: "The client is evaluating a deeper engagement to scope a potential partnership with an academic group working on NAAA biology. A peptide-service brief for the NAAA-targeting peptide library is also being discussed.",
    },
    serviceHref: "/services/peptide-service#brief",
    serviceLabel: "peptide-service",
  },
  {
    id: "peptide-pharma-partner",
    tag: "peptide-service · Scope",
    title: "Peptide-Service Scope for a Pharma Partner",
    client: "Global pharmaceutical company evaluating peptide synthesis vendors",
    duration: "3 weeks",
    route: "peptide-service",
    icon: Sparkles,
    gradient: "from-cta to-primary",
    challenge: {
      label: "Challenge",
      body: "A global pharmaceutical company needed to evaluate a peptide synthesis partner for a critical peptide drug substance. The internal procurement team needed an independent evidence brief to support the vendor selection process — including quality assessments, regulatory compliance records, and capacity benchmarks.",
    },
    approach: {
      label: "Approach",
      body: "Defined the vendor evaluation framework, sourced evidence across three candidate vendors, compiled a regulatory compliance assessment, and produced a structured brief covering quality, capacity, and pricing benchmarks. The brief structured the evaluation as a decision-ready document rather than a generic vendor comparison.",
    },
    evidence: {
      label: "Evidence stack",
      items: [
        "Vendor capacity and capability records (public + confidential)",
        "Regulatory filing history (DMFs, CTD modules)",
        "Peer-reviewed literature citing vendor work",
        "Pricing benchmarks from comparable engagements",
        "Internal procurement constraints and decision criteria",
      ],
    },
    outcome: {
      label: "Outcome",
      body: "The brief was used as the primary decision artifact in a vendor selection meeting. The client selected the recommended vendor and cited the structured evidence trail as the key reason the decision was made without extended internal debate.",
    },
    nextAction: {
      label: "Next action",
      body: "The client is now evaluating whether to commission a second brief covering the synthesis scale-up plan for the selected peptide candidate, which would move into a project-tier engagement.",
    },
    serviceHref: "/services/peptide-service#brief",
    serviceLabel: "peptide-service",
  },
  {
    id: "fibrosis-ipf-omics",
    tag: "biostatx · Multi-omics",
    title: "Fibrosis / IPF Multi-omics Brief",
    client: "Academic respiratory research group with a translational interest",
    duration: "8 weeks",
    route: "biostatx",
    icon: BarChart3,
    gradient: "from-primary-light to-cta",
    challenge: {
      label: "Challenge",
      body: "An academic group studying idiopathic pulmonary fibrosis (IPF) had multi-omics data (transcriptomics, proteomics, and clinical chemistry) from a 60-subject cohort. They needed a structured integration analysis plan before submitting a grant renewal — and needed to demonstrate that the analytical approach was rigorous enough to support a preclinical-to-clinical translation question.",
    },
    approach: {
      label: "Approach",
      body: "Full data inventory across the three modalities, alignment strategy for batch effects and missingness, unsupervised clustering framework design, and a formal statistical analysis plan covering primary endpoint definition, power calculations, and sensitivity analysis framework. The deliverable was structured as a grant-ready methods section plus a decision tree for the analysis execution.",
    },
    evidence: {
      label: "Evidence stack",
      items: [
        "GEO: IPF transcriptomics reference datasets (GSE93606, GSE110147)",
        "Proteomics raw data from the 60-subject cohort",
        "Clinical chemistry panel: lung function indices (FVC, DLCO)",
        "Literature: IPF multi-omics integration approaches (2020–2024)",
        "Simulation study: power calculations for three endpoint scenarios",
      ],
    },
    outcome: {
      label: "Outcome",
      body: "Grant renewal submitted with the statistical analysis plan as a core appendix. The review committee cited the analytical rigor as a differentiating factor in the scoring. The group has since commissioned a follow-on biostatx engagement for the actual analysis execution.",
    },
    nextAction: {
      label: "Next action",
      body: "The group is preparing to submit a second brief for the analysis execution phase — covering the full multi-omics integration and the subsequent manuscript preparation. This would run as a project-tier engagement.",
    },
    serviceHref: "/services/biostatx#brief",
    serviceLabel: "biostatx",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <GitBranch className="h-4 w-4 text-cta" />
              Selected work
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Case studies. Decision-ready evidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Selected outputs from Brown Biotech engagements — structured as the evidence trail, the challenge, the approach, and the next action. Each one reflects the same brief-first workflow used for every client.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/services#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                View service lanes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-text">Briefs, analyses, and evidence trails.</h2>
          <p className="mt-3 text-lg text-text-muted">Three selected engagements — structured the same way every Brown Biotech brief is structured.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-1">
          {studies.map((study) => {
            const Icon = study.icon;
            return (
              <article key={study.id} className="premium-panel rounded-[2rem] overflow-hidden">
                <div className="bg-dark p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${study.gradient} p-4`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-200">
                          {study.tag}
                        </span>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{study.title}</h2>
                        <p className="mt-1 text-sm text-gray-300">{study.client} · {study.duration}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-200">
                        <MessageSquare className="h-3.5 w-3.5 text-cta" />
                        Route: {study.route}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 bg-white p-8 lg:grid-cols-2 lg:p-10">
                  <div className="space-y-6 lg:col-span-2">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-surface p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{study.challenge.label}</p>
                        <p className="mt-3 text-sm leading-relaxed text-text-muted">{study.challenge.body}</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{study.approach.label}</p>
                        <p className="mt-3 text-sm leading-relaxed text-text-muted">{study.approach.body}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{study.evidence.label}</p>
                      <ul className="mt-3 space-y-2">
                        {study.evidence.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">{study.outcome.label}</p>
                      <p className="mt-3 text-sm leading-relaxed text-amber-800">{study.outcome.body}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{study.nextAction.label}</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">{study.nextAction.body}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cta p-2">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-muted">Interested in a similar brief?</p>
                        <p className="text-sm font-semibold text-text">{study.serviceLabel} lane · {study.title.split(" ")[0]} work</p>
                      </div>
                    </div>
                    <Link
                      href={study.serviceHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-2.5 font-semibold text-white transition hover:from-primary-light hover:to-cta-light"
                    >
                      Request a Brief <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <h2 className="text-2xl font-semibold text-text">How every engagement starts.</h2>
          <p className="mt-3 text-lg text-text-muted">
            Every Brown Biotech engagement — including the work above — begins with a paid brief. The brief defines the lane, the owner, the evidence stack, and the next action before anything moves forward.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services/peptide-service#brief"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light"
            >
              Request a Paid Brief <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 font-semibold text-text transition hover:border-primary/30"
            >
              View all service lanes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}