"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle2, Sparkles, Mail } from "lucide-react";

export default function InventaPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      data.set("source", "inventa-waitlist");
      data.set("serviceName", "Inventa");
      data.set("serviceLane", "inventa-waitlist");
      data.set("priority", "Medium");
      data.set("problem", "Inventa waitlist signup");
      data.set("outcome", "Join the waitlist for AI research agent tournament access");

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Unable to submit. Please try again.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%),radial-gradient(circle_at_50%_85%,rgba(180,83,9,0.12),transparent_28%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-100/10 px-4 py-2 text-sm text-amber-300 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Coming soon
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Inventa
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              AI research agent tournament for biotech hypothesis generation. Compete, rank, and advance the frontier of structured AI-driven scientific discovery.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Format", "Tournament"],
                ["Output", "Hypothesis brief + evidence map + ranking"],
                ["Stage", "Launching soon"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/12 px-4 py-3 backdrop-blur">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-100/80">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Waitlist</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Join the waitlist
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">
            Be first to know when Inventa opens. Enter your email and we will reach out with early access details.
          </p>

          {submitted ? (
            <div className="mt-8 max-w-xl rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
              <div className="flex items-center gap-3 text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold">You are on the list</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                Thanks — we have recorded your interest and will follow up with early access details as soon as Inventa is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-text">
                  <Mail className="h-4 w-4 text-cta" /> Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text placeholder:text-text-muted outline-none transition focus:border-cta/70 focus:ring-2 focus:ring-cta/25"
                />
              </label>

              {error && (
                <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-white shadow-xl shadow-black/20 hover:from-amber-300 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    Join Waitlist <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-sm text-text-muted">
                Submissions are routed into the Brown Biotech intake hub.
              </p>
            </form>
          )}

          <div className="mt-10">
            <Link href="/services" className="btn text-sm font-semibold text-text-muted hover:text-text">
              ← Back to service hub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}