"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Atom, ArrowLeft, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight, FlaskConical } from "lucide-react";

interface AdmetResult {
  status: string;
  module?: string;
  summary?: {
    n_total: number;
    n_valid: number;
    n_lipinski_pass: number;
    n_veber_pass: number;
    n_egan_pass: number;
    n_bbb_likely: number;
    n_hERG_alert: number;
    n_PAIN_alert: number;
    n_high_risk: number;
    mean_MW: number;
    mean_logP: number;
  };
  results?: Array<{
    name: string;
    smiles: string;
    valid: boolean;
    error?: string;
    descriptors?: {
      mw: number;
      logp: number;
      hba: number;
      hbd: number;
      tpsa: number;
      rotb: number;
      aromatic_rings: number;
      formula: string;
    };
    rules?: {
      lipinski: { pass: boolean; violations: string[] };
      veber: { pass: boolean };
      egan: { pass: boolean };
      bbb: { likely: boolean; reason: string };
    };
    alerts?: {
      herg: { triggered: boolean; matches: string[] };
      pains: { triggered: boolean; matches: string[] };
    };
    risk_score?: "low" | "medium" | "high";
  }>;
  error?: string;
}

const EXAMPLE_DRUGS = [
  { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O", category: "NSAID" },
  { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", category: "Stimulant" },
  { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", category: "NSAID" },
  { name: "Metformin", smiles: "CN(C)C(=N)NC(=N)N", category: "Antidiabetic" },
  { name: "Imatinib", smiles: "CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=CC(=C(C=C4)OC)OC", category: "TKI · CML" },
  { name: "Atorvastatin", smiles: "CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4", category: "Statin" },
];

export default function AdmetExamplePage() {
  const [result, setResult] = useState<AdmetResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const res = await fetch("/api/multiomics/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "admet",
            smiles: EXAMPLE_DRUGS.map((d) => d.smiles),
            names: EXAMPLE_DRUGS.map((d) => d.name),
          }),
        });
        const data = await res.json();
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setResult({ status: "error", error: String(err) });
          setLoading(false);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <Link href="/multiomics" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-300 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to multiomics
          </Link>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            Example · ADMET Prediction
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">Six well-known drugs.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Predicted ADMET profile in seconds.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Aspirin, caffeine, ibuprofen, metformin, imatinib, and atorvastatin — run through our openchemlib-based ADMET pipeline. Lipinski, Veber, Egan, BBB permeability, hERG, and PAINS alerts.
          </p>
        </div>
      </section>

      {/* Pipeline explanation */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: FlaskConical, label: "1. Input", desc: "6 FDA-approved drugs (SMILES)" },
            { icon: Atom, label: "2. Compute", desc: "openchemlib descriptors + 5 rule-based filters" },
            { icon: CheckCircle2, label: "3. Score", desc: "Composite low/medium/high risk per molecule" },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20">
                    <Icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                </div>
                <p className="text-xs text-zinc-400">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Input list */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Input molecules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAMPLE_DRUGS.map((d) => (
            <div key={d.name} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-white">{d.name}</p>
                <span className="text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">{d.category}</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono break-all">{d.smiles}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl font-bold text-white mb-4">Results</h2>

        {loading && (
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8 flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
            <p className="text-purple-300">Computing ADMET properties…</p>
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

        {result && result.summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <p className="font-semibold text-purple-400">Summary</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <Stat label="Total" value={result.summary.n_total} />
              <Stat label="Lipinski pass" value={`${result.summary.n_lipinski_pass}/${result.summary.n_total}`} />
              <Stat label="BBB likely" value={`${result.summary.n_bbb_likely}/${result.summary.n_total}`} />
              <Stat label="hERG alert" value={`${result.summary.n_hERG_alert}/${result.summary.n_total}`} />
              <Stat label="High risk" value={`${result.summary.n_high_risk}/${result.summary.n_total}`} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-purple-300/80">
              <span>Mean MW: <span className="font-mono text-zinc-300">{result.summary.mean_MW}</span></span>
              <span>Mean logP: <span className="font-mono text-zinc-300">{result.summary.mean_logP}</span></span>
            </div>
          </motion.div>
        )}

        {result?.results && result.results.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="text-left px-4 py-3 text-zinc-400 font-medium">Molecule</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">MW</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">logP</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">HBA/HBD</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">TPSA</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">RotB</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">Lipinski</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">Veber</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">BBB</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">hERG</th>
                  <th className="text-left px-3 py-3 text-zinc-400 font-medium">PAINS</th>
                  <th className="text-left px-4 py-3 text-zinc-400 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {result.results.map((m, i) => (
                  <tr key={i} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-zinc-900/30" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{m.name}</p>
                      <p className="text-xs text-zinc-500 font-mono truncate max-w-[180px]" title={m.smiles}>{m.smiles}</p>
                    </td>
                    {m.valid ? (
                      <>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.mw.toFixed(1)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.logp.toFixed(2)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.hba}/{m.descriptors?.hbd}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.tpsa.toFixed(1)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.rotb}</td>
                        <td className="px-3 py-3">
                          {m.rules?.lipinski.pass ? (
                            <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300">Pass</span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-300">
                              {m.rules?.lipinski.violations.length} v
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.veber.pass ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.bbb.likely ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.alerts?.herg.triggered ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.alerts?.pains.triggered ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                            m.risk_score === "low" ? "bg-emerald-500/20 text-emerald-300" :
                            m.risk_score === "medium" ? "bg-amber-500/20 text-amber-300" :
                            "bg-red-500/20 text-red-300"
                          }`}>
                            {m.risk_score || "—"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <td colSpan={11} className="px-3 py-3 text-zinc-600 text-xs">{m.error}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Reference + CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">How this pipeline works</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Each SMILES is parsed by openchemlib; descriptors (MW, logP, HBA/HBD, TPSA, rotatable bonds) are computed. Rules applied: <strong className="text-zinc-200">Lipinski Ro5</strong> (MW ≤ 500, logP ≤ 5, HBD ≤ 5, HBA ≤ 10), <strong className="text-zinc-200">Veber</strong> (TPSA ≤ 140, RotB ≤ 10), <strong className="text-zinc-200">Egan</strong> (TPSA ≤ 131.6, logP in [−1, 6]), <strong className="text-zinc-200">BBB (Clark)</strong> (TPSA ≤ 90, MW ≤ 400, logP in [1, 4]). Structural alerts detect hERG-likely basic amines and PAINS substructures. Composite risk is a weighted score across all rules. All computation runs in &lt;100ms per molecule — pure JavaScript, no ML model, no GPU.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            href="/multiomics"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-purple-500/30 transition"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-300">Try your own</p>
              <p className="mt-2 text-lg font-bold text-white">Run on your SMILES →</p>
              <p className="mt-1 text-sm text-zinc-400">Paste any SMILES, run the full pipeline</p>
            </div>
            <ArrowRight className="h-6 w-6 text-purple-300 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/multiomics/example/gem-depmap"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-zinc-900/60 to-zinc-900/50 p-6 hover:border-cyan-500/50 transition"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Next example</p>
              <p className="mt-2 text-lg font-bold text-white">GEM × DepMap →</p>
              <p className="mt-1 text-sm text-zinc-400">Cancer metabolic vulnerabilities for A549</p>
            </div>
            <ArrowRight className="h-6 w-6 text-cyan-300 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="font-mono text-zinc-100">{value}</p>
    </div>
  );
}
