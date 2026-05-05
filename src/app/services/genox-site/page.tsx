import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "genox-site",
  description: "Brown Biotech genox-site landing page for discovery and genomics-facing support.",
  alternates: { canonical: "/services/genox-site" },
};

const deliverables = [
  "Scope memo for discovery projects",
  "Research direction and framing",
  "Partnering path for next conversations",
];

export default function GenoxSitePage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-cta" />
              genox-site
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Discovery and genomics-facing support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              For early conversations and partnership scoping, we help frame the
              problem, define the direction, and prepare a clear next step.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Discuss a project <ArrowRight className="h-4 w-4" />
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
                Useful for turning a broad idea into a concrete conversation.
              </p>
            </article>
          ))}
        </div>
      </section>

      <ServiceInquiryCard
        serviceName="genox-site"
        title="Send a discovery brief"
        description="If you&apos;re exploring a new research direction or partnership conversation, send a concise brief and we&apos;ll map the path."
        prompts={[
          "What problem or research opportunity are you trying to frame?",
          "Is this exploratory, partnership-related, or decision-driven?",
          "What would make the next conversation useful?",
        ]}
      />
    </main>
  );
}
