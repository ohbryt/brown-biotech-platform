"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Atom, ArrowLeft, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight, FileText, FlaskConical } from "lucide-react";

interface AdmetResult {
  status: string;
  molecules?: Array<{
    id: number;
    name: string;
    smiles: string;
    valid: boolean;
    descriptors?: Record<string, number>;
    rules?: Record<string, boolean | number>;
    admet_risk?: string;
    error?: string;
  }>;
  summary?: string;
  summary_metrics?: Record<string, any>;
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
            smiles: EXAMPLE_DRUGS.map(d => d.smiles),
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
    return () => { cancelled = true; };
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
            Aspirin, caffeine, ibuprofen, metformin, imatinib, and atorvastatin — run through our RDKit-based ADMET pipeline. Lipinski, Veber, BBB permeability, hERG, and PAINS alerts.
          </p>
        </div>
      </section>

      {/* Pipeline explanation */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: FlaskConical, label: "1. Input", desc: "6 FDA-approved drugs (SMILES)", color: "purple" },
            { icon: Atom, label: "2. Compute", desc: "RDKit descriptors + 10+ rule-based filters", color: "purple" },
            { icon: CheckCircle2, label: "3. Score", desc: "Composite low/moderate/high risk per molecule", color: "purple" },
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
          {EXAMPLE_DRUGS.map((d, i) => (
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

        {result && !result.error && result.summary && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <p className="font-semibold text-purple-400">Summary</p>
            </div>
            <p className="text-sm text-purple-300/80 leading-relaxed whitespace-pre-wrap">{result.summary}</p>
          </motion.div>
        )}

        {result?.molecules && result.molecules.length > 0 && (
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
                {result.molecules.map((m, i) => (
                  <tr key={m.id} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-zinc-900/30" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{m.name}</p>
                      <p className="text-xs text-zinc-500 font-mono truncate max-w-[180px]" title={m.smiles}>{m.smiles}</p>
                    </td>
                    {m.valid ? (
                      <>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.mw?.toFixed(1)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.logp?.toFixed(2)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.hba}/{m.descriptors?.hbd}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.tpsa?.toFixed(1)}</td>
                        <td className="px-3 py-3 text-zinc-300 font-mono text-xs">{m.descriptors?.rotb}</td>
                        <td className="px-3 py-3">
                          {m.rules?.lipinski_pass ? (
                            <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300">Pass</span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-300">{m.rules?.lipinski_violations} v</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.veber_pass ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.bbb_likely ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.herg_alert ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-3 py-3">
                          {m.rules?.pains_alert ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                            m.admet_risk === "low" ? "bg-emerald-500/20 text-emerald-300" :
                            m.admet_risk === "moderate" ? "bg-amber-500/20 text-amber-300" :
                            "bg-red-500/20 text-red-300"
                          }`}>
                            {m.admet_risk || "—"}
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
            Each SMILES is parsed by RDKit; descriptors (MW, logP, HBA/HBD, TPSA, rotatable bonds) are computed. Rules applied: <strong className="text-zinc-200">Lipinski Ro5</strong> (MW ≤ 500, logP ≤ 5, HBD ≤ 5, HBA ≤ 10), <strong className="text-zinc-200">Veber</strong> (TPSA ≤ 140, RotB ≤ 10), <strong className="text-zinc-200">Egan</strong> (TPSA ≤ 131.6, logP in [−1, 5.88]), <strong className="text-zinc-200">BBB (Clark)</strong> (TPSA ≤ 90, MW ≤ 400, logP in [1, 4]). SMARTS panels detect hERG-likely basic amines, CYP3A4 liabilities, and PAINS substructures. Composite risk is a weighted score across all rules. All computation runs in &lt;1s per molecule — no ML model, no GPU.
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
