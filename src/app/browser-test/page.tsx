import type { Metadata } from "next";
import Link from "next/link";
import BrowserTestLab from "@/components/BrowserTestLab";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Browser Test Lab",
  description: "Test a brief in the browser and preview route, owner, and next action instantly.",
  alternates: { canonical: "/browser-test" },
};

export default function BrowserTestPage() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="border-b border-border bg-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="kicker text-amber-100/80">Interactive demo</span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Test a brief in the browser before you send it.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              This page shows a live preview of route, owner, fit score, approval gate, and next action using the same shared triage logic as the intake flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-gray-100 transition hover:bg-white/10">
                Back to services
              </Link>
              <Link href="#demo" className="inline-flex items-center rounded-xl bg-gradient-to-r from-primary to-cta px-5 py-3 font-semibold text-white transition hover:from-primary-light hover:to-cta-light">
                Open demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="demo">
        <BrowserTestLab />
      </div>
    </main>
  );
}
