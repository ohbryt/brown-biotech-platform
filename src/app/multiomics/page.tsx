"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, BarChart3, Network, Dna, Activity, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const ANALYSIS_MODULES = [
  { id: "deg", label: "Differential Expression Analysis", icon: BarChart3, color: "from-amber-500 to-orange-600", desc: "Fold change, P-value, adjusted P-value" },
  { id: "volcano", label: "Volcano Plot", icon: Activity, color: "from-blue-500 to-indigo-600", desc: "Visual DEG with significance threshold" },
  { id: "pathway", label: "Pathway Enrichment Analysis", icon: Network, color: "from-green-500 to-emerald-600", desc: "KEGG/GO overrepresentation" },
  { id: "ppi", label: "PPI Network & Hub Genes", icon: Dna, color: "from-purple-500 to-violet-600", desc: "Protein interaction + degree centrality" },
  { id: "tf", label: "Transcription Factor Analysis", icon: Activity, color: "from-red-500 to-rose-600", desc: "TF target enrichment from ChIP-X" },
];

const OUTPUT_SECTIONS = [
  { id: "summary", label: "Analysis Summary", icon: CheckCircle2 },
  { id: "deg_table", label: "DEG Table (CSV)", icon: FileSpreadsheet },
  { id: "volcano_plot", label: "Volcano Plot (PNG)", icon: Activity },
  { id: "pathway_results", label: "Pathway Enrichment", icon: Network },
  { id: "hub_genes", label: "Hub Genes & PPI", icon: Dna },
  { id: "tf_targets", label: "TF Target List", icon: Activity },
];

type AnalysisStatus = "idle" | "uploading" | "running" | "done" | "error";

interface AnalysisResult {
  status: AnalysisStatus;
  modules: Record<string, { status: AnalysisStatus; message: string; results?: any }>;
  summary?: string;
  error?: string;
}

export default function MultiOmicsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile?.name.endsWith(".csv")) setFile(droppedFile);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.name.endsWith(".csv")) setFile(selected);
  };

  const runAnalysis = async () => {
    if (!file) return;
    setAnalysisResult({ status: "uploading", modules: {} });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/multiomics/analyze", { method: "POST", body: formData });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisResult({ status: "error", modules: {}, error: "Upload failed. Please try again." });
    }
  };

  const getStatusColor = (status: AnalysisStatus) => {
    if (status === "done") return "text-emerald-600";
    if (status === "error") return "text-red-600";
    if (status === "running") return "text-amber-600";
    return "text-gray-400";
  };

  const getStatusIcon = (status: AnalysisStatus) => {
    if (status === "done") return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
    if (status === "error") return <AlertCircle className="h-4 w-4 text-red-600" />;
    if (status === "running") return <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />;
    return null;
  };

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <BarChart3 className="h-4 w-4 text-cta" />
              Multi-Omics Analysis · Free Trial
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Upload your CSV.<br />Get decision-ready biology.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              DEG analysis, volcano plots, pathway enrichment, PPI networks, and TF analysis — fully automated from a single CSV file. No install. No code.
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Modules */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-text">What you get — automatically</h2>
          <p className="mt-2 text-text-muted">Five analysis modules run in sequence on your data.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANALYSIS_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.id} className="premium-panel rounded-2xl p-6">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-semibold text-text">{mod.label}</p>
                <p className="mt-1 text-sm text-text-muted">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upload Section */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">Try it now — upload a CSV</h2>
          <p className="mt-2 text-text-muted">Accepted format: gene expression matrix (rows = genes, columns = samples). Must include headers.</p>

          {/* Drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-200 ${dragActive ? "border-cta bg-cta/5" : "border-border hover:border-cta/50"}`}
          >
            {file ? (
              <div className="flex items-center gap-4">
                <FileSpreadsheet className="h-10 w-10 text-cta" />
                <div>
                  <p className="font-semibold text-text">{file.name}</p>
                  <p className="text-sm text-text-muted">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button onClick={() => setFile(null)} className="ml-4 rounded-lg border border-border px-3 py-1.5 text-sm text-text-muted hover:border-red-300 hover:text-red-600">Remove</button>
              </div>
            ) : (
              <>
                <Upload className={`h-12 w-12 ${dragActive ? "text-cta" : "text-gray-300"}`} />
                <p className="mt-4 text-text-muted">Drag & drop your CSV here, or</p>
                <label className="mt-3 cursor-pointer rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-2.5 font-semibold text-white hover:from-primary-light hover:to-cta-light">
                  Browse Files
                  <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                </label>
              </>
            )}
          </div>

          {file && (
            <div className="mt-6">
              <button
                onClick={runAnalysis}
                disabled={analysisResult?.status === "uploading" || analysisResult?.status === "running"}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-8 py-4 font-semibold text-white shadow-xl hover:from-primary-light hover:to-cta-light disabled:opacity-60"
              >
                {analysisResult?.status === "uploading" || analysisResult?.status === "running" ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing…</>
                ) : (
                  <><BarChart3 className="h-5 w-5" /> Run Free Analysis</>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {analysisResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <h3 className="text-lg font-semibold text-text">Analysis Results</h3>

              {/* Module statuses */}
              <div className="mt-4 space-y-3">
                {ANALYSIS_MODULES.map((mod) => {
                  const moduleResult = analysisResult.modules?.[mod.id];
                  const status = moduleResult?.status || "idle";
                  return (
                    <div key={mod.id} className="flex items-center justify-between rounded-xl border border-border bg-white px-5 py-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <span className="text-sm font-medium text-text">{mod.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                        {status === "idle" ? "Pending" : status === "uploading" ? "Uploading…" : status === "running" ? "Running…" : status === "done" ? "Done" : "Error"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              {analysisResult.summary && (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-semibold text-emerald-900">Analysis Summary</p>
                  <p className="mt-2 text-sm text-emerald-800 whitespace-pre-wrap">{analysisResult.summary}</p>
                </div>
              )}

              {/* Error */}
              {analysisResult.error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
                  <p className="text-sm font-semibold text-red-900">Error</p>
                  <p className="mt-2 text-sm text-red-800">{analysisResult.error}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-text">Need deeper analysis?</h3>
              <p className="mt-2 text-text-muted">Full multi-omics integration, custom pathways, cohort comparisons, and manuscript-ready figures — request a paid brief.</p>
            </div>
            <Link href="/services/biostatx#brief" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white hover:from-primary-light hover:to-cta-light whitespace-nowrap">
              Request a Paid Brief <CheckCircle2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}