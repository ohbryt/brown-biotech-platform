import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "business-pipeline",
  description: "Brown Biotech business pipeline for agentic drug discovery and biotech operations.",
  alternates: { canonical: "/services/business-pipeline" },
};

export default function BusinessPipelinePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <GitBranch className="h-4 w-4 text-cta" />
              business-pipeline
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A company-owned pipeline for drug discovery and biotech operations.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Built for teams that want a repeatable source-to-brief workflow, clean review
              gates, and outputs that are useful enough to act on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              {[
                "Faster scoping",
                "Cleaner source mapping",
                "Human-reviewed delivery",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Start a pipeline brief <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://github.com/ohbryt/brown-biotech-business-pipeline" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                View GitHub repo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="premium-panel rounded-[1.75rem] p-8">
            <span className="kicker">Who it is for</span>
            <p className="mt-4 text-lg font-semibold text-text">Research teams, founders, and operators who need a cleaner decision path.</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">Ideal when the problem is too complex for a one-off prompt but not yet large enough for a full product build.</p>
          </article>
          <article className="premium-panel rounded-[1.75rem] p-8">
            <span className="kicker">What you get</span>
            <p className="mt-4 text-lg font-semibold text-text">A scoped brief, source map, and a human-reviewed next step.</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">Outputs are structured to be reused in Notion, internal planning, partner conversations, or proposal work.</p>
          </article>
          <article className="premium-panel rounded-[1.75rem] p-8">
            <span className="kicker">Why it matters</span>
            <p className="mt-4 text-lg font-semibold text-text">Less noise, faster scoping, and better handoff quality.</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">The pipeline is designed to reduce rework and make Brown Biotech&apos;s reasoning more visible and reusable.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="premium-panel rounded-[2rem] p-8">
            <span className="kicker">Pipeline structure</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
              From question to output, with clear review gates.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-text-muted">
              <li>• intake and scope capture</li>
              <li>• source mapping and retrieval</li>
              <li>• synthesis and ranking</li>
              <li>• human review</li>
              <li>• delivery and archive in Notion</li>
            </ul>
          </div>
          <div className="premium-panel rounded-[2rem] p-8">
            <span className="kicker">Business value</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">
              A service backbone that can support both product and consulting.
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-muted">
              Use the pipeline as a company asset, a repeatable service offering, and a
              basis for future software or agentic product development.
            </p>
          </div>
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="business-pipeline"
        title="Scope a Brown Biotech pipeline project"
        description="If you want to adapt the company pipeline, connect more sources, or turn it into a service offering, send the brief here."
        prompts={[
          "What problem should the pipeline solve?",
          "What sources or tools need to be connected?",
          "Do you want this as an internal system, a client service, or both?",
        ]}
      />
    </main>
  );
}
