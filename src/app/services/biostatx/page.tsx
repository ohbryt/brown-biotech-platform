import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "biostatx",
  description: "Brown Biotech biostatx landing page for biostatistics, analysis, and reporting.",
  alternates: { canonical: "/services/biostatx" },
};

const cards = [
  {
    title: "Who it is for",
    body: "Teams that need a cleaner evidence path, a lighter interpretation burden, or help choosing the right analysis route.",
  },
  {
    title: "What we do",
    body: "We review the dataset, recommend the analysis path, and keep the output aligned to the decision the team actually needs to make.",
  },
  {
    title: "What you get",
    body: "A review note, analysis plan, reporting package, and a result that is easier to share and act on.",
  },
];

const boundaries = [
  "We do not over-engineer a simple question.",
  "We will flag data issues before analysis moves forward.",
  "Human review stays in the loop for high-stakes outputs.",
];

export default function BiostatxPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <BarChart3 className="h-4 w-4 text-cta" />
              biostatx · supporting lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Biostatistics support for clearer decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              When the evidence is messy, we help define the analysis path, structure the work, and prepare a report that people can actually use.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Request a Paid Brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                Back to service hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.75rem] p-8">
              <CheckCircle2 className="h-6 w-6 text-cta" />
              <p className="mt-4 text-lg font-semibold text-text">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Boundaries</span>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {boundaries.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-cta" />
                <p className="mt-3 text-sm leading-7 text-text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="biostatx"
        title="Send a dataset or analysis brief"
        description="If you need a dataset review, a methods recommendation, or reporting support, send the basics and we&apos;ll route it quickly."
        prompts={[
          "What dataset or result do you want reviewed?",
          "Do you already have a hypothesis or analysis goal?",
          "Do you need a one-off report or an ongoing analysis partner?",
        ]}
      />
    </main>
  );
}
