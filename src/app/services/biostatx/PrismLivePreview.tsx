"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, ExternalLink, FlaskConical, Loader2, Quote } from "lucide-react";

type Source = {
  pmid: string;
  title: string;
  journal: string;
  year: number;
  score: number;
};

type PrismResult = {
  answer: string;
  question: string;
  sources: Source[];
};

const SAMPLE_QUERIES = [
  "How do exercise-derived exosomes mediate bone-muscle crosstalk?",
  "What regulates mitochondrial fuel use in skeletal muscle?",
  "Therapeutic role of miRNAs in age-related sarcopenia",
];

export default function PrismLivePreview() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PrismResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(q?: string) {
    const effective = (q ?? query).trim();
    if (!effective) return;
    if (q) setQuery(q);

    setLoading(true);
    setError(null);
    setResult(null);

    const prismUrl = process.env.NEXT_PUBLIC_PRISM_URL;
    if (!prismUrl) {
      setError("Live preview is offline — NEXT_PUBLIC_PRISM_URL is not configured for this deployment.");
      setLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);
      const res = await fetch(`${prismUrl}/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: effective, top_k: 3, max_tokens: 200 }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`PRISM ${res.status}${detail ? ` — ${detail.slice(0, 160)}` : ""}`);
      }
      const body = await res.json();
      setResult({
        question: effective,
        answer: body.answer || "",
        sources: body.sources || [],
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("PRISM timed out after 45s — try a shorter question.");
      } else {
        setError(err instanceof Error ? err.message : "PRISM unreachable.");
      }
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    run();
  }

  return (
    <section id="live-preview" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span className="kicker">Live preview</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            PRISM · TurboQuant
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Ask the corpus
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
          Type a research question. PRISM retrieves from indexed PubMed (MiniLM 4-bit, 19 chunks), then MedGemma 4B drafts the answer with cited sources. Real backend — not a mock.
        </p>

        <form onSubmit={onSubmit} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How do exosomes mediate bone-muscle crosstalk?"
              className="flex-1 rounded-2xl border border-border bg-white px-5 py-4 text-base text-text shadow-sm focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-cta px-6 py-4 text-base font-semibold text-white shadow-sm transition-all hover:from-primary-light hover:to-cta-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Retrieving
                </>
              ) : (
                <>
                  Query PRISM
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Try:</span>
          {SAMPLE_QUERIES.map((sq) => (
            <button
              key={sq}
              type="button"
              onClick={() => run(sq)}
              disabled={loading}
              className="rounded-full border border-border bg-white/80 px-3 py-1.5 text-xs text-text-muted shadow-sm transition-all hover:border-cta hover:text-cta disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sq}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <p className="text-sm font-semibold text-rose-900">Preview unavailable</p>
            <p className="mt-2 text-sm text-rose-800">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Quote className="h-4 w-4 text-cta" />
                <p className="kicker">Grounded answer</p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-text">{result.answer}</p>
            </div>

            {result.sources.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="kicker">Sources ({result.sources.length})</p>
                <div className="mt-4 grid gap-3">
                  {result.sources.map((s, i) => (
                    <a
                      key={`${s.pmid}-${i}`}
                      href={`https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-white/50 p-4 transition-all hover:border-cta hover:bg-white"
                    >
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                          PMID {s.pmid} · {s.journal} ({s.year}) · score {s.score.toFixed(3)}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-text group-hover:text-cta">
                          {s.title}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-text-muted group-hover:text-cta" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-text-muted">
              Backend: PRISM FastAPI · TurboQuant (MiniLM 4-bit, 19 chunks, bit_width=4) + MedGemma 4B Q4_K_M. Inference runs on Mac mini M4 Pro.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}