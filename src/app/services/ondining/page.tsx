import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Utensils, CheckCircle2, ShieldCheck } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ondining · dinner, designed as a daily health habit",
  description: "A curated table of 5–6 guests, run by a trained host. Social dining for adults 40–60 — pilot in Gwangju, expanding nationwide.",
  keywords: [
    "social dining",
    "longevity",
    "wellness",
    "social prescribing",
    "Korean market",
    "Brown Biotech",
    "ondining",
  ],
  alternates: { canonical: "/services/ondining" },
  openGraph: {
    title: "ondining · dinner, designed as a daily health habit",
    description: "A curated table of 5–6 guests, run by a trained host. Social dining for adults 40–60 — pilot in Gwangju, expanding nationwide.",
    type: "website",
    url: `${siteUrl}/services/ondining`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ondining · dinner, designed as a daily health habit",
    description: "A curated table of 5–6 guests, run by a trained host. Social dining for adults 40–60 — pilot in Gwangju, expanding nationwide.",
  },
};

const cards = [
  {
    title: "Who it is for",
    body: "Adults 40–60 navigating solo dinners, life transitions, or simply tired of eating alone. Plus municipal, insurer, and corporate wellness partners running group programs.",
  },
  {
    title: "What we do",
    body: "We host a small, curated table of 5–6 guests every evening — matched on temperament, age band, and shared interests. A trained host runs the conversation so the silence doesn't sit on anyone.",
  },
  {
    title: "What you get",
    body: "A weekly cadence with the same host and rotating tablemates. Real-name verification, gender balance, post-dinner check-in. Framed as a daily health habit — designed with a medical advisor, not a clinical intervention.",
  },
];

const rationale = {
  kicker: "Why we built it",
  body: "Korea now has 8M+ single-person households — over a third of all homes. WHO frames social connection as a non-medical determinant of cardiovascular, metabolic, and cognitive health. We translate that evidence into a chair, a host, and a table.",
};

const steps = [
  { title: "Apply", desc: "Short form: age, neighborhood, dietary notes, what you want from a dinner." },
  { title: "Match", desc: "Hosts pair guests by temperament, age band, and shared interests." },
  { title: "Sit", desc: "A trained host leads the table; silence and one-upmanship are kept in check." },
  { title: "Reflect", desc: "A short post-dinner note captures what worked and what didn't." },
  { title: "Repeat", desc: "Weekly cadence with the same host and rotating tablemates." },
];

const boundaries = [
  "No medical claims. We say 'may help' or 'according to WHO' — never 'cures', 'prevents', or 'treats'.",
  "No 'lonely person' framing. Guests are adults choosing connection, not patients.",
  "Personal data is held to PIPA minimum-necessary standards — name + verified contact only.",
];

export default function OndiningPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* HERO */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(180,83,9,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Utensils className="h-4 w-4 text-cta" />
              ondining · pilot in gwangju
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Dinner, designed as a daily health habit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              A curated table of 5–6 guests, run by a trained host. Built for adults who want a real evening conversation — not another app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              {[
                "Real-name verified",
                "Trained hosts",
                "Medical-advisor designed",
                "PIPA minimum-necessary",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light">
                Join the Gwangju pilot <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#how" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10">
                How a table runs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-CARD SECTION: Who / What / What you get */}
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

      {/* WHY WE BUILT IT — single panel (longevity framing) */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">{rationale.kicker}</span>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-text-muted">
            {rationale.body}
          </p>
        </div>
      </section>

      {/* HOW A TABLE RUNS — 5 steps */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">How a table runs</span>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
                <p className="mt-3 text-base font-semibold text-text">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOUNDARIES */}
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

      {/* INQUIRY */}
      <ServiceInquiryCard
        serviceName="ondining"
        title="Join the Gwangju pilot"
        description="Send a short note. The host team will route you to the next available table or partnership conversation."
        prompts={[
          "Which city are you in? (We pilot in Gwangju, then expand nationwide.)",
          "What kind of evening are you looking for — solo dinner, partner dinner, or a group program?",
          "Are you joining as a guest, or as a partner (municipal, insurer, employer)?",
        ]}
      />
    </main>
  );
}