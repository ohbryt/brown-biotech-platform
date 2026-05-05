import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "biostatx",
  description: "Brown Biotech biostatx landing page for biostatistics, analysis, and reporting.",
  alternates: { canonical: "/services/biostatx" },
};

const deliverables = [
  "Dataset review and quality check",
  "Analysis plan and method selection",
  "Reporting package for decision-ready outputs",
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
              biostatx
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Biostatistics support for clearer decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              When you need cleaner evidence, we help define the analysis path,
              structure the work, and prepare a report that is easier to use.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Send a dataset <ArrowRight className="h-4 w-4" />
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
          {deliverables.map((item) => (
            <article key={item} className="premium-panel rounded-[1.75rem] p-8">
              <CheckCircle2 className="h-6 w-6 text-cta" />
              <p className="mt-4 text-lg font-semibold text-text">{item}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                Structured to support the next decision with less friction.
              </p>
            </article>
          ))}
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
