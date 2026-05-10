"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Mail, MessageSquareText, UserRound, Building2, Clock3, CheckCircle2, Loader2 } from "lucide-react";

type ServiceInquiryCardProps = {
  serviceName: string;
  title: string;
  description: string;
  prompts: string[];
};

export default function ServiceInquiryCard({
  serviceName,
  title,
  description,
  prompts,
}: ServiceInquiryCardProps) {
  const subject = useMemo(() => `Brown Biotech paid brief: ${serviceName}`, [serviceName]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      source: "service-page",
      serviceName,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      timeline: String(data.get("timeline") || ""),
      message: String(data.get("message") || ""),
      subject,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Unable to submit inquiry.");
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
    <section id="brief" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Specific CTA</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">Request a Paid Brief</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">{description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {prompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-border bg-white/70 px-4 py-4 text-sm text-text-muted shadow-sm">
                {prompt}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2">
              <Clock3 className="h-4 w-4 text-cta" />
              24h response target
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2">
              <MessageSquareText className="h-4 w-4 text-cta" />
              Short intake, clear next step
            </span>
          </div>
          <p className="mt-4 text-sm text-text-muted">Submissions are routed into the Brown Biotech Notion intake hub.</p>
        </div>
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10 bg-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_40%)]" />
          <div className="relative">
            <span className="kicker text-amber-100/80">Inquiry form</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Send a concise project brief</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Share just enough context to route the request well. We&apos;ll reply with a clean next step.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                <div className="flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold">Brief received</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-gray-200">
                  Thanks — we&apos;ll review this and reply with the next step.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-200">
                    <UserRound className="h-4 w-4 text-cta" /> Name
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cta/60 focus:ring-2 focus:ring-cta/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-200">
                    <Mail className="h-4 w-4 text-cta" /> Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cta/60 focus:ring-2 focus:ring-cta/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-200">
                    <Building2 className="h-4 w-4 text-cta" /> Company / Lab
                  </span>
                  <input
                    name="company"
                    placeholder="Organization or lab name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cta/60 focus:ring-2 focus:ring-cta/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-200">
                    <MessageSquareText className="h-4 w-4 text-cta" /> Timeline
                  </span>
                  <input
                    name="timeline"
                    placeholder="e.g. this week / this month / exploratory"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cta/60 focus:ring-2 focus:ring-cta/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-200">
                    <MessageSquareText className="h-4 w-4 text-cta" /> What do you need?
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Briefly describe the objective, constraint, and desired output."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cta/60 focus:ring-2 focus:ring-cta/20"
                  />
                </label>

                {error && (
                  <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Request a Paid Brief <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
