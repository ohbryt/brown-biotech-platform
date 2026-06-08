"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, BarChart3, Network, Dna, Activity, CheckCircle2, AlertCircle, Loader2, X, ChevronRight, DnaIcon, FlaskConical, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { isFastqFile, stashFile } from "@/lib/handoff-db";

const ANALYSIS_MODULES = [
  { id: "deg", label: "DEG Analysis", short: "Differential Expression", icon: BarChart3, color: "#F59E0B", glow: "rgba(245,158,11,0.3)", desc: "Fold change, t-test, BH correction", step: 1 },
  { id: "volcano", label: "Volcano Plot", short: "Visualization", icon: Activity, color: "#3B82F6", glow: "rgba(59,130,246,0.3)", desc: "Significance threshold plot", step: 2 },
  { id: "pathway", label: "Pathway Enrichment", short: "KEGG / GO", icon: Network, color: "#10B981", glow: "rgba(16,185,129,0.3)", desc: "Overrepresentation analysis", step: 3 },
  { id: "ppi", label: "PPI Network", short: "Hub Genes", icon: Dna, color: "#8B5CF6", glow: "rgba(139,92,246,0.3)", desc: "Degree centrality ranking", step: 4 },
  { id: "tf", label: "TF Analysis", short: "Transcription Factors", icon: DnaIcon, color: "#EF4444", glow: "rgba(239,68,68,0.3)", desc: "ChIP-X target enrichment", step: 5 },
];

type AnalysisStatus = "idle" | "uploading" | "running" | "done" | "error";

interface ModuleState {
  status: AnalysisStatus;
  progress: number;
  message: string;
}

interface AnalysisResult {
  status: AnalysisStatus;
  modules: Record<string, ModuleState>;
  summary?: string;
  error?: string;
}

const PIPELINE_STEPS = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "parse", label: "Parse", icon: FileSpreadsheet },
  { id: "deg", label: "DEG", icon: BarChart3 },
  { id: "volcano", label: "Volcano", icon: Activity },
  { id: "pathway", label: "Pathway", icon: Network },
  { id: "ppi", label: "PPI", icon: Dna },
  { id: "tf", label: "TF", icon: DnaIcon },
  { id: "report", label: "Report", icon: CheckCircle2 },
];

export default function MultiOmicsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(-1);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Strict-mode handoff state. When `strictMode` is on, the dropzone also
  // accepts FASTQ files; a FASTQ drop is staged into `fastqFile` and the
  // user gets a single "Open in strict-omics workbench" button that
  // stashes the file into IndexedDB and navigates to the workbench.
  const [strictMode, setStrictMode] = useState(false);
  const [fastqFile, setFastqFile] = useState<File | null>(null);
  const [handoffPending, setHandoffPending] = useState(false);

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
    if (!droppedFile) return;
    if (strictMode && isFastqFile(droppedFile.name)) {
      setFastqFile(droppedFile);
      setFile(null);
      return;
    }
    if (droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
      setFastqFile(null);
    }
  }, [strictMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (strictMode && isFastqFile(selected.name)) {
      setFastqFile(selected);
      setFile(null);
      return;
    }
    if (selected.name.endsWith(".csv")) {
      setFile(selected);
      setFastqFile(null);
    }
  };

  // Toggling strict mode clears any staged FASTQ (the user's intent is
  // likely different now), but does NOT touch an active analysis run.
  const toggleStrictMode = useCallback(() => {
    setStrictMode((prev) => {
      const next = !prev;
      if (!next) {
        setFastqFile(null);
      }
      return next;
    });
  }, []);

  const openInStrictOmics = useCallback(async () => {
    if (!fastqFile || handoffPending) return;
    setHandoffPending(true);
    try {
      const uuid = await stashFile(fastqFile);
      // navigate with autoRun=1 so the workbench runs the pipeline as soon
      // as the file is loaded
      window.location.assign(
        `/services/strict-omics?preload=${encodeURIComponent(uuid)}&autoRun=1`
      );
    } catch (err) {
      setHandoffPending(false);
      setAnalysisResult({
        status: "error",
        modules: {},
        error: `Failed to prepare handoff: ${String(err)}. The strict-omics workbench needs IndexedDB access; check that your browser is not in private mode.`,
      });
    }
  }, [fastqFile, handoffPending]);

  const runAnalysis = async () => {
    if (!file) return;
    
    // Initialize all modules as idle
    const initialModules: Record<string, ModuleState> = {};
    ANALYSIS_MODULES.forEach(m => {
      initialModules[m.id] = { status: "idle", progress: 0, message: "Waiting…" };
    });
    setAnalysisResult({ status: "uploading", modules: initialModules, summary: undefined });
    setActiveStep(0);
    setCurrentModuleIndex(-1);
    setUploadProgress(0);

    // Animate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(p => Math.min(p + 15, 85));
    }, 200);
    setTimeout(() => clearInterval(uploadInterval), 1500);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/multiomics/analyze", { method: "POST", body: formData });
      const data = await res.json();
      
      setUploadProgress(100);
      setActiveStep(7);
      
      // Animate through steps
      for (let i = 0; i < ANALYSIS_MODULES.length; i++) {
        setCurrentModuleIndex(i);
        setActiveStep(i + 2);
        setAnalysisResult(prev => prev ? {
          ...prev,
          modules: {
            ...prev.modules,
            [ANALYSIS_MODULES[i].id]: { status: "running", progress: 100, message: "Complete" }
          }
        } : null);
        await new Promise(r => setTimeout(r, 600));
      }
      
      setCurrentModuleIndex(-1);
      setActiveStep(8);
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisResult({
        status: "error",
        modules: initialModules,
        error: "Upload failed. Please try again."
      });
    }
  };

  const getStepStatus = (stepIdx: number) => {
    if (activeStep > stepIdx) return "done";
    if (activeStep === stepIdx) return "active";
    return "idle";
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Free Trial · No install · No code
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Upload your CSV.</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Get biology answers.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              DEG · Volcano · Pathway · PPI/Hub Gene · TF — fully automated. Pipeline runs in seconds.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
              Have raw FASTQ instead? Flip on <button type="button" onClick={toggleStrictMode} className="text-amber-300 underline decoration-dotted underline-offset-4 hover:text-amber-200">Strict mode</button> and we&apos;ll route it to the audit-grade workbench (browser-side QC, species gate, trim).
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline Progress Bar */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {PIPELINE_STEPS.map((step, i) => {
              const Icon = step.icon;
              const status = getStepStatus(i);
              return (
                <div key={step.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    status === "done" ? "border-amber-400 bg-amber-400/20 text-amber-400" :
                    status === "active" ? "border-amber-400 bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/20" :
                    "border-zinc-700 bg-zinc-800 text-zinc-500"
                  }`}>
                    {status === "done" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : status === "active" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    {status === "active" && (
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-30" />
                    )}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${
                    status === "done" ? "text-amber-400" : status === "active" ? "text-amber-400 font-semibold" : "text-zinc-500"
                  }`}>{step.label}</span>
                </div>
              );
            })}
          </div>
          {/* Progress line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-zinc-800 -z-10" />
          <div 
            className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700 -z-10"
            style={{ width: `${(activeStep / (PIPELINE_STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </section>

      {/* Analysis Modules — Horizontal pipeline view */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ANALYSIS_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const moduleState = analysisResult?.modules?.[mod.id];
            const status = moduleState?.status || "idle";
            const isActive = currentModuleIndex === idx;
            
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative rounded-2xl border p-5 transition-all duration-500 ${
                  isActive
                    ? "border-amber-400/50 bg-gradient-to-b from-amber-500/10 to-transparent shadow-lg shadow-amber-500/10"
                    : status === "done"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
                style={isActive ? { boxShadow: `0 0 30px ${mod.glow}` } : {}}
              >
                {/* Step number */}
                <div className="absolute -top-3 left-4 rounded-full border bg-[#09090b] px-2 py-0.5 text-xs font-bold" style={{ borderColor: mod.color, color: mod.color }}>
                  {mod.step}
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${mod.color}20` }}>
                      <Icon className="h-4 w-4" style={{ color: mod.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{mod.label}</p>
                      <p className="text-xs text-zinc-500">{mod.short}</p>
                    </div>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${
                    status === "done" ? "bg-emerald-400" :
                    status === "running" ? "bg-amber-400 animate-pulse" :
                    status === "error" ? "bg-red-400" :
                    "bg-zinc-600"
                  }`} />
                </div>
                
                <p className="text-xs text-zinc-500 mb-3">{mod.desc}</p>
                
                {/* Progress bar */}
                <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: status === "done" ? "#34D399" : mod.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: status === "done" ? "100%" : isActive ? "60%" : "0%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                
                {/* Status text */}
                <div className="mt-2 flex items-center gap-1">
                  {status === "done" && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  {status === "running" && <Loader2 className="h-3 w-3 text-amber-400 animate-spin" />}
                  <span className={`text-xs ${
                    status === "done" ? "text-emerald-400" :
                    status === "running" ? "text-amber-400" :
                    status === "error" ? "text-red-400" :
                    "text-zinc-600"
                  }`}>
                    {status === "done" ? "Complete" : status === "running" ? "Running…" : status === "error" ? "Error" : "Pending"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Upload Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Try it now</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {strictMode
                    ? "Strict mode on · accepts .fastq / .fq / .fastq.gz (routed to the audit-grade workbench) and .csv (runs locally)"
                    : "Gene expression matrix · rows = genes, columns = samples · CSV format"}
                </p>
              </div>
              {/* Strict-mode toggle */}
              <button
                type="button"
                onClick={toggleStrictMode}
                aria-pressed={strictMode}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  strictMode
                    ? "border-amber-500/50 bg-amber-500/15 text-amber-200 shadow-lg shadow-amber-500/10"
                    : "border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Strict mode
                <span
                  className={`relative ml-1 inline-block h-4 w-7 rounded-full transition ${
                    strictMode ? "bg-amber-500" : "bg-zinc-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition ${
                      strictMode ? "left-3.5" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Drop zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-300 cursor-pointer ${
                dragActive
                  ? "border-amber-400 bg-amber-400/5"
                  : fastqFile
                  ? "border-amber-500/50 bg-amber-500/5"
                  : file
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/30"
              }`}
            >
              <AnimatePresence mode="wait">
                {fastqFile ? (
                  <motion.div
                    key="fastq"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30">
                      <FlaskConical className="h-8 w-8 text-amber-400" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-white text-lg">{fastqFile.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {(fastqFile.size / 1024 / 1024).toFixed(2)} MB · ready for strict-omics workbench
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFastqFile(null); }}
                        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-red-500/50 hover:text-red-400 transition"
                      >
                        <X className="h-4 w-4" /> Remove
                      </button>
                      <label className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition cursor-pointer">
                        <Upload className="h-4 w-4" /> Change
                        <input
                          type="file"
                          accept={strictMode ? ".csv,.fastq,.fq,.fastq.gz,.fq.gz,text/plain,application/gzip" : ".csv"}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openInStrictOmics(); }}
                        disabled={handoffPending}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 font-semibold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 disabled:opacity-60 transition"
                      >
                        {handoffPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Preparing handoff…
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4" /> Open in strict-omics workbench
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 max-w-md text-center">
                      Your file stays on this device — we stash it in browser storage and hand the workbench a reference. The pipeline runs locally; nothing is uploaded.
                    </p>
                  </motion.div>
                ) : file ? (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                      <FileSpreadsheet className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-white text-lg">{file.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-red-500/50 hover:text-red-400 transition"
                      >
                        <X className="h-4 w-4" /> Remove
                      </button>
                      <label className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition cursor-pointer">
                        <Upload className="h-4 w-4" /> Change
                        <input
                          type="file"
                          accept={strictMode ? ".csv,.fastq,.fq,.fastq.gz,.fq.gz,text/plain,application/gzip" : ".csv"}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${dragActive ? "border-amber-400 bg-amber-400/10" : "border-dashed border-zinc-600 bg-zinc-800"}`}>
                      <Upload className={`h-8 w-8 transition-colors ${dragActive ? "text-amber-400" : "text-zinc-500"}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-300 font-medium">
                        {strictMode ? "Drop a FASTQ or CSV file here" : "Drop your CSV file here"}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">or</p>
                    </div>
                    <label className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition cursor-pointer">
                      <FileSpreadsheet className="h-4 w-4" />
                      Browse Files
                      <input
                        type="file"
                        accept={strictMode ? ".csv,.fastq,.fq,.fastq.gz,.fq.gz,text/plain,application/gzip" : ".csv"}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-zinc-600 mt-2">
                      {strictMode
                        ? "Supports: .csv · .fastq · .fq · .fastq.gz · Max 10MB CSV, up to 200K reads for FASTQ (browser-side only)"
                        : "Supports: .csv · Max 10MB"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {file && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <button
                  onClick={runAnalysis}
                  disabled={analysisResult?.status === "uploading" || analysisResult?.status === "running"}
                  className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 transition-all duration-200 w-full justify-center"
                >
                  {analysisResult?.status === "uploading" || analysisResult?.status === "running" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Running analysis…</span>
                      <div className="ml-auto flex gap-1">
                        {[0,1,2].map(i => (
                          <motion.div
                            key={i}
                            className="h-2 w-2 rounded-full bg-white/60"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-5 w-5" />
                      <span>Run Free Analysis</span>
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Results */}
            {analysisResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                {analysisResult.summary && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <p className="font-semibold text-emerald-400">Analysis Complete</p>
                    </div>
                    <p className="text-sm text-emerald-300/80 leading-relaxed whitespace-pre-wrap">{analysisResult.summary}</p>
                  </div>
                )}
                {analysisResult.error && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="font-semibold text-red-400">Analysis Failed</p>
                    </div>
                    <p className="text-sm text-red-300/80">{analysisResult.error}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">Need more than a self-service run?</h3>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            The CSV tool is for fast exploration. For a defensible, reproducible multi-platform omics workflow, choose a lane.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(245,158,11,0.08),transparent)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Supporting lane</p>
              <h4 className="mt-3 text-xl font-bold text-white">Deeper biostatistics</h4>
              <p className="mt-3 text-sm text-zinc-400 max-w-md">
                Custom pathways, cohort comparisons, integrated multi-omics, and manuscript-ready figures.
              </p>
              <Link
                href="/services/biostatx#brief"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-bold text-white shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition"
              >
                Request a Paid Brief <CheckCircle2 className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-900/50 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(245,158,11,0.14),transparent)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Project lane</p>
              <h4 className="mt-3 text-xl font-bold text-white">Strict, audit-grade pipeline</h4>
              <p className="mt-3 text-sm text-zinc-300 max-w-md">
                LLM proposes, deterministic gates decide. Container-pinned runs, RO-Crate provenance, technology-specific branches. Project-tier.
              </p>
              <Link
                href="/services/strict-omics#brief"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-6 py-3 font-bold text-amber-200 hover:bg-amber-500/20 transition"
              >
                Scope a pipeline <CheckCircle2 className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes ping-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
}