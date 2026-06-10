"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Microscope, ArrowLeft, AlertCircle, Loader2, Sparkles, ArrowRight, Atom } from "lucide-react";

interface GemDepmapResult {
  matches: number;
  results: Array<{
    depmap_id: string;
    cell_line: string;
    primary_disease: string;
    lineage: string;
    n_druggable_top20: number;
    top_dependencies: Array<{ gene: string; score: number; pathway: string; druggable: boolean }>;
    top_pathways: Array<{ pathway: string; n_essential: number; total: number; pct: number }>;
  }>;
  summary?: { n_lineages: number; n_cell_lines: number; mean_druggable_top20: number; most_common_pathway: string };
  error?: string;
}

const EXAMPLE_CELL_LINE = "A549";

export default function GemDepmapExamplePage() {
  const [result, setResult] = useState<GemDepmapResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const res = await fetch("/api/multiomics/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "gem-depmap", cell_line: EXAMPLE_CELL_LINE, top_n: 20 }),
        });
        const data = await res.json();
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setResult({ matches: 0, results: [], error: String(err) });
          setLoading(false);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const match = result?.results?.[0];

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <Link href="/multiomics" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-300 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to multiomics
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Example · GEM × DepMap · A549 (Lung Adenocarcinoma)
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">A549 lung cancer cells.</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Top metabolic dependencies from DepMap.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            A549 (lung adenocarcinoma) CRISPR Chronos scores intersected with KEGG metabolic pathways. Pre-computed from DepMap Public 26Q1 (Broad Institute, 2026-04-01).
          </p>
        </div>
      </section>

      {/* Pipeline explanation */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { label: "1. Source", desc: "DepMap Public 26Q1 Chronos" },
            { label: "2. Filter", desc: "~103 KEGG metabolic genes" },
            { label: "3. Rank", desc: "Most-negative Chronos = most essential" },
            { label: "4. Annotate", desc: "Pathway + druggability overlay" },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-1">{step.label}</p>
              <p className="text-xs text-zinc-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        {loading && (
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-8 flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
            <p className="text-cyan-300">Querying pre-computed vulnerabilities for A549…</p>
          </div>
        )}

        {result?.error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="font-semibold text-red-400">Analysis failed</p>
            </div>
            <p className="text-sm text-red-300/80">{result.error}</p>
          </div>
        )}

        {match && !result?.error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Cell line card */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">{match.cell_line}</h2>
                <span className="text-xs text-zinc-500 font-mono">{match.depmap_id}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Disease</p>
                  <p className="font-semibold text-white">{match.primary_disease}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Lineage</p>
                  <p className="text-zinc-300">{match.lineage}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Druggable (top 20)</p>
                  <p className="font-semibold text-cyan-300">{match.n_druggable_top20}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">DB size</p>
                  <p className="text-zinc-300">
                    {result?.summary?.n_cell_lines} cells / {result?.summary?.n_lineages} lineages
                  </p>
                </div>
              </div>
            </div>

            {/* Top dependencies */}
            {match.top_dependencies && match.top_dependencies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Top essential metabolic genes</h3>
                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-900">
                      <tr>
                        <th className="text-left px-4 py-3 text-zinc-400 font-medium">Rank</th>
                        <th className="text-left px-3 py-3 text-zinc-400 font-medium">Gene</th>
                        <th className="text-left px-3 py-3 text-zinc-400 font-medium">Chronos</th>
                        <th className="text-left px-3 py-3 text-zinc-400 font-medium">Pathway</th>
                        <th className="text-left px-4 py-3 text-zinc-400 font-medium">Druggable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.top_dependencies.map((dep, i) => (
                        <tr key={dep.gene} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-zinc-900/30" : ""}`}>
                          <td className="px-4 py-3 text-zinc-500 font-mono text-xs">#{i + 1}</td>
                          <td className="px-3 py-3 font-mono font-semibold text-white">{dep.gene}</td>
                          <td className="px-3 py-3 font-mono text-xs" style={{ color: dep.score < -1 ? "#F87171" : dep.score < -0.5 ? "#FBBF24" : "#A3A3A3" }}>{dep.score.toFixed(2)}</td>
                          <td className="px-3 py-3 text-zinc-300 text-xs">{dep.pathway}</td>
                          <td className="px-4 py-3">
                            {dep.druggable ? <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-cyan-500/20 text-cyan-300">✓</span> : <span className="text-zinc-600">–</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Top pathways */}
            {match.top_pathways && match.top_pathways.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Most-impacted pathways</h3>
                <div className="space-y-2">
                  {match.top_pathways.slice(0, 8).map((pw) => (
                    <div key={pw.pathway} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{pw.pathway}</p>
                        <p className="text-xs text-zinc-500">{pw.n_essential} of {pw.total} metabolic genes essential</p>
                      </div>
                      <div className="w-32 shrink-0">
                        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${Math.min(100, pw.pct)}%` }} />
                        </div>
                        <p className="mt-1 text-right text-xs font-mono text-cyan-300">{pw.pct}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result?.summary && (
              <p className="text-xs text-zinc-500 italic">
                Source: DepMap Public 26Q1 (Chronos) · {result.summary.n_lineages} lineages / {result.summary.n_cell_lines} cell lines · {result.summary.most_common_pathway} is the most commonly essential pathway
              </p>
            )}
          </motion.div>
        )}
      </section>

      {/* Reference + CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">How this pipeline works</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            DepMap Public 26Q1 Chronos scores (Broad Institute) measure the fitness effect of CRISPR knockouts across ~1,200 cancer cell lines. <strong className="text-zinc-200">Chronos &lt; −0.5</strong> indicates an essential gene. We intersect with ~103 KEGG-curated metabolic genes (glycolysis, TCA cycle, OXPHOS, nucleotide synthesis, glutaminolysis, etc.) and rank by Chronos score. Druggability is overlaid from FDA-approved or clinical-stage metabolic enzyme inhibitors. This pre-computed dataset is rebuilt quarterly when DepMap publishes a new release.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            href="/multiomics"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-cyan-500/30 transition"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Try other cell lines</p>
              <p className="mt-2 text-lg font-bold text-white">Open multiomics →</p>
              <p className="mt-1 text-sm text-zinc-400">Pick from 50 cell lines across 16 cancer types</p>
            </div>
            <ArrowRight className="h-6 w-6 text-cyan-300 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/multiomics/example/admet"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-zinc-900/60 to-zinc-900/50 p-6 hover:border-purple-500/50 transition"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300">Other example</p>
              <p className="mt-2 text-lg font-bold text-white">ADMET prediction →</p>
              <p className="mt-1 text-sm text-zinc-400">6 FDA-approved drugs with full ADMET profile</p>
            </div>
            <ArrowRight className="h-6 w-6 text-purple-300 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </main>
  );
}
