import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "genox-site",
  description: "Brown Biotech genox-site landing page for discovery and genomics-facing support.",
  alternates: { canonical: "/services/genox-site" },
};

const cards = [
  {
    title: "Who it is for",
    body: "Teams that are exploring a new research direction, partner conversation, or genomics-facing problem that needs sharper framing.",
  },
  {
    title: "What we do",
    body: "We turn a broad idea into a scoped memo, a clear direction, and a conversation path that is easier to progress.",
  },
  {
    title: "What you get",
    body: "A discovery brief, a framing note, and a next-step path that can be reused in partner or internal discussion.",
  },
];

const boundaries = [
  "We do not turn exploratory work into overpromising.",
  "We keep the scope readable before asking for a deeper commitment.",
  "Human review remains required for public or high-stakes claims.",
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
              genox-site · supporting lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Discovery and genomics-facing support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              For early conversations and partnership scoping, we help frame the problem, define the direction, and prepare a clear next step.
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
