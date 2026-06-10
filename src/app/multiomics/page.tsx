"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, BarChart3, Network, Dna, Activity, CheckCircle2, AlertCircle, Loader2, X, ChevronRight, DnaIcon, FlaskConical, ArrowRight, ShieldCheck, Atom, Microscope, Sparkles, FileText, ChevronDown } from "lucide-react";
import Link from "next/link";
import { isFastqFile, stashFile } from "@/lib/handoff-db";

type AnalysisType = "transcriptomics" | "admet" | "gem-depmap";

const TRANSCRIPTOMICS_MODULES = [
  { id: "deg", label: "DEG Analysis", short: "Differential Expression", icon: BarChart3, color: "#F59E0B", glow: "rgba(245,158,11,0.3)", desc: "Fold change, t-test, BH correction", step: 1 },
  { id: "volcano", label: "Volcano Plot", short: "Visualization", icon: Activity, color: "#3B82F6", glow: "rgba(59,130,246,0.3)", desc: "Significance threshold plot", step: 2 },
  { id: "pathway", label: "Pathway Enrichment", short: "KEGG / GO", icon: Network, color: "#10B981", glow: "rgba(16,185,129,0.3)", desc: "Overrepresentation analysis", step: 3 },
  { id: "ppi", label: "PPI Network", short: "Hub Genes", icon: Dna, color: "#8B5CF6", glow: "rgba(139,92,246,0.3)", desc: "Degree centrality ranking", step: 4 },
  { id: "tf", label: "TF Analysis", short: "Transcription Factors", icon: DnaIcon, color: "#EF4444", glow: "rgba(239,68,68,0.3)", desc: "ChIP-X target enrichment", step: 5 },
];

const ADMET_MODULES = [
  { id: "admet", label: "ADMET Prediction", short: "Lipinski · Veber · BBB · hERG", icon: Atom, color: "#A855F7", glow: "rgba(168,85,247,0.3)", desc: "RDKit descriptors + SMARTS rules", step: 1 },
];

const GEM_DEPMAP_MODULES = [
  { id: "gem-depmap", label: "GEM × DepMap Vulnerabilities", short: "Chronos essentiality × KEGG", icon: Microscope, color: "#06B6D4", glow: "rgba(6,182,212,0.3)", desc: "Cancer metabolic dependencies", step: 1 },
];

const TRANSCRIPTOMICS_STEPS = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "parse", label: "Parse", icon: FileSpreadsheet },
  { id: "deg", label: "DEG", icon: BarChart3 },
  { id: "volcano", label: "Volcano", icon: Activity },
  { id: "pathway", label: "Pathway", icon: Network },
  { id: "ppi", label: "PPI", icon: Dna },
  { id: "tf", label: "TF", icon: DnaIcon },
  { id: "report", label: "Report", icon: CheckCircle2 },
];

const ADMET_STEPS = [
  { id: "upload", label: "Input", icon: FileText },
  { id: "admet", label: "ADMET", icon: Atom },
  { id: "report", label: "Report", icon: CheckCircle2 },
];

const GEM_DEPMAP_STEPS = [
  { id: "select", label: "Select", icon: Microscope },
  { id: "lookup", label: "Lookup", icon: Network },
  { id: "report", label: "Report", icon: CheckCircle2 },
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
  // ADMET-specific
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
  summary_metrics?: Record<string, any>;
  // GEM-DepMap-specific
  matched?: {
    depmap_id: string;
    name: string;
    primary_disease: string;
    lineage_id: string;
    lineage_name: string;
  };
  top_dependencies?: Array<{
    gene: string;
    score: number;
    pathway: string;
    druggable: boolean;
  }>;
  top_pathways?: Array<{
    pathway: string;
    n_essential: number;
    total: number;
    pct: number;
  }>;
  n_druggable_top20?: number;
  data_version?: string;
  methodology?: string;
}

// Curated list of available GEM-DepMap cell lines (lineage_id: cell_name)
const GEM_DEPMAP_CELL_LINES = {
  cervical: ["SiHa", "C-33A", "CaSki"],
  breast: ["MCF7", "SKBR3", "T47D", "MDA-MB-231", "MDA-MB-468", "BT-549", "ZR-75-1"],
  lung_luad: ["A549"],
  lung_nsclc: ["NCI-H1299", "NCI-H1975", "HCC827"],
  leukemia_cml: ["K562"],
  leukemia_aml: ["THP-1", "U-937", "MV4-11", "NB4"],
  leukemia_tcell: ["Jurkat", "SUP-T1", "KARPAS-299"],
  lymphoma_burkitt: ["Raji", "RPMI-8226", "Namalwa"],
  colorectal: ["HCT116", "HT29", "SW620", "RKO"],
  liver_hcc: ["HepG2", "Huh7", "SNU-387"],
  pancreatic: ["PANC-1", "CFPAC-1", "AsPC-1"],
  prostate: ["PC-3", "LNCaP", "VCaP", "22Rv1"],
  melanoma: ["A375", "WM266-4"],
  osteosarcoma: ["U2OS", "SaOS-2", "MG-63"],
  ovarian: ["SKOV3", "CAOV3", "A2780"],
  glioblastoma: ["U-87 MG", "A172", "SF-539"],
};

const LINEAGE_DISPLAY_NAMES: Record<string, string> = {
  cervical: "Cervical Cancer",
  breast: "Breast Cancer",
  lung_luad: "Lung Adenocarcinoma",
  lung_nsclc: "Lung NSCLC",
  leukemia_cml: "Chronic Myeloid Leukemia",
  leukemia_aml: "Acute Myeloid Leukemia",
  leukemia_tcell: "T-cell Leukemia",
  lymphoma_burkitt: "Lymphoma (B-cell)",
  colorectal: "Colorectal Cancer",
  liver_hcc: "Liver Cancer (HCC)",
  pancreatic: "Pancreatic Cancer",
  prostate: "Prostate Cancer",
  melanoma: "Melanoma",
  osteosarcoma: "Osteosarcoma",
  ovarian: "Ovarian Cancer",
  glioblastoma: "Glioblastoma",
};

// Pre-loaded example SMILES (famous drugs)
const ADMET_EXAMPLE_SMILES = [
  { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
  { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
  { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O" },
  { name: "Metformin", smiles: "CN(C)C(=N)NC(=N)N" },
  { name: "Imatinib", smiles: "CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=CC(=C(C=C4)OC)OC" },
  { name: "Atorvastatin", smiles: "CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4" },
];

const ADMET_EXAMPLE_CSV = "smiles,name\n" +
  ADMET_EXAMPLE_SMILES.map(m => `${m.smiles},${m.name}`).join("\n");

export default function MultiOmicsPage() {
  // -------- Type + state --------
  const [analysisType, setAnalysisType] = useState<AnalysisType>("transcriptomics");
  const [file, setFile] = useState<File | null>(null);
  const [smilesInput, setSmilesInput] = useState<string>("");
  const [cellLine, setCellLine] = useState<string>("A549");
  const [cellLineDropdown, setCellLineDropdown] = useState<string>("A549");
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(-1);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Strict-mode handoff state
  const [strictMode, setStrictMode] = useState(false);
  const [fastqFile, setFastqFile] = useState<File | null>(null);
  const [handoffPending, setHandoffPending] = useState(false);

  // -------- Get active modules/steps --------
  const getActiveModules = () => {
    if (analysisType === "admet") return ADMET_MODULES;
    if (analysisType === "gem-depmap") return GEM_DEPMAP_MODULES;
    return TRANSCRIPTOMICS_MODULES;
  };
  const getActiveSteps = () => {
    if (analysisType === "admet") return ADMET_STEPS;
    if (analysisType === "gem-depmap") return GEM_DEPMAP_STEPS;
    return TRANSCRIPTOMICS_STEPS;
  };

  // -------- Handlers --------
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
    if (analysisType !== "transcriptomics") return;
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
  }, [strictMode, analysisType]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (analysisType !== "transcriptomics") return;
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

  // -------- Run analysis --------
  const runAnalysis = async () => {
    if (analysisType === "transcriptomics") {
      if (!file) return;
    } else if (analysisType === "admet") {
      const hasInput = smilesInput.trim() || file;
      if (!hasInput) return;
    } else if (analysisType === "gem-depmap") {
      if (!cellLine) return;
    }

    const activeModules = getActiveModules();
    const initialModules: Record<string, ModuleState> = {};
    activeModules.forEach(m => {
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

    try {
      if (analysisType === "transcriptomics") {
        await runTranscriptomics(initialModules, activeModules, uploadInterval);
      } else if (analysisType === "admet") {
        await runAdmet(initialModules, activeModules, uploadInterval);
      } else if (analysisType === "gem-depmap") {
        await runGemDepmap(initialModules, activeModules, uploadInterval);
      }
    } catch (err) {
      setAnalysisResult({
        status: "error",
        modules: initialModules,
        error: "Analysis failed. Please try again.",
      });
    }
  };

  const runTranscriptomics = async (
    initialModules: Record<string, ModuleState>,
    activeModules: typeof TRANSCRIPTOMICS_MODULES,
    uploadInterval: NodeJS.Timeout
  ) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "transcriptomics");

    try {
      const res = await fetch("/api/multiomics/analyze", { method: "POST", body: formData });
      const data = await res.json();

      setUploadProgress(100);
      setActiveStep(7);

      // Animate through steps
      for (let i = 0; i < activeModules.length; i++) {
        setCurrentModuleIndex(i);
        setActiveStep(i + 2);
        setAnalysisResult(prev => prev ? {
          ...prev,
          modules: {
            ...prev.modules,
            [activeModules[i].id]: { status: "running", progress: 100, message: "Complete" }
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
        error: "Upload failed. Please try again.",
      });
    }
  };

  const runAdmet = async (
    initialModules: Record<string, ModuleState>,
    activeModules: typeof ADMET_MODULES,
    uploadInterval: NodeJS.Timeout
  ) => {
    let res: Response;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "admet");
      res = await fetch("/api/multiomics/analyze", { method: "POST", body: formData });
    } else {
      const smiles = smilesInput.split(/[\s,;\n]+/).map(s => s.trim()).filter(Boolean);
      res = await fetch("/api/multiomics/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "admet", smiles }),
      });
    }
    const data = await res.json();

    setUploadProgress(100);
    setActiveStep(2);
    setCurrentModuleIndex(0);
    setAnalysisResult(prev => prev ? {
      ...prev,
      modules: {
        ...prev.modules,
        [activeModules[0].id]: { status: "running", progress: 100, message: "Complete" }
      }
    } : null);
    await new Promise(r => setTimeout(r, 600));
    setCurrentModuleIndex(-1);
    setActiveStep(3);
    setAnalysisResult(data);
  };

  const runGemDepmap = async (
    initialModules: Record<string, ModuleState>,
    activeModules: typeof GEM_DEPMAP_MODULES,
    uploadInterval: NodeJS.Timeout
  ) => {
    setActiveStep(1);
    setCurrentModuleIndex(0);
    setAnalysisResult(prev => prev ? {
      ...prev,
      modules: {
        ...prev.modules,
        [activeModules[0].id]: { status: "running", progress: 100, message: "Looking up vulnerabilities…" }
      }
    } : null);
    await new Promise(r => setTimeout(r, 300));

    const res = await fetch("/api/multiomics/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "gem-depmap", cell_line: cellLine }),
    });
    const data = await res.json();

    setUploadProgress(100);
    setActiveStep(2);
    await new Promise(r => setTimeout(r, 300));
    setActiveStep(3);
    setCurrentModuleIndex(-1);
    setAnalysisResult(data);
  };

  // -------- Helpers --------
  const getStepStatus = (stepIdx: number) => {
    const totalSteps = getActiveSteps().length;
    if (activeStep > stepIdx) return "done";
    if (activeStep === stepIdx) return "active";
    return "idle";
  };

  const canRunAnalysis = (): boolean => {
    if (analysisResult?.status === "uploading" || analysisResult?.status === "running") return false;
    if (analysisType === "transcriptomics") return !!file;
    if (analysisType === "admet") return !!(smilesInput.trim() || file);
    if (analysisType === "gem-depmap") return !!cellLine;
    return false;
  };

  const activeModules = getActiveModules();
  const activeSteps = getActiveSteps();

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
              <span className="text-white">Upload your data.</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Get biology answers.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Transcriptomics · ADMET prediction · GEM × DepMap metabolic vulnerability — all automated. Pipeline runs in seconds.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
              Have raw FASTQ instead? Flip on <button type="button" onClick={toggleStrictMode} className="text-amber-300 underline decoration-dotted underline-offset-4 hover:text-amber-200">Strict mode</button> and we&apos;ll route it to the audit-grade workbench (browser-side QC, species gate, trim).
            </p>
          </div>
        </div>
      </section>

      {/* Analysis type selector */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1.5">
          {[
            { id: "transcriptomics" as const, label: "Transcriptomics", desc: "DEG · Volcano · Pathway · PPI · TF", icon: BarChart3, color: "amber" },
            { id: "admet" as const, label: "ADMET Prediction", desc: "Lipinski · Veber · BBB · hERG · PAINS", icon: Atom, color: "purple" },
            { id: "gem-depmap" as const, label: "GEM × DepMap", desc: "Cancer metabolic vulnerabilities", icon: Microscope, color: "cyan" },
          ].map((t) => {
            const Icon = t.icon;
            const active = analysisType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setAnalysisType(t.id);
                  setAnalysisResult(null);
                  setActiveStep(0);
                  setCurrentModuleIndex(-1);
                }}
                className={`flex-1 min-w-[200px] flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                  active
                    ? t.id === "transcriptomics"
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 shadow-lg shadow-amber-500/10"
                      : t.id === "admet"
                      ? "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/40 shadow-lg shadow-purple-500/10"
                      : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                    : "border border-transparent hover:bg-zinc-800/50"
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? t.id === "transcriptomics" ? "bg-amber-500/20" : t.id === "admet" ? "bg-purple-500/20" : "bg-cyan-500/20"
                    : "bg-zinc-800"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    active
                      ? t.id === "transcriptomics" ? "text-amber-400" : t.id === "admet" ? "text-purple-400" : "text-cyan-400"
                      : "text-zinc-500"
                  }`} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${active ? "text-white" : "text-zinc-300"}`}>{t.label}</p>
                  <p className="text-xs text-zinc-500 truncate">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Pipeline Progress Bar */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {activeSteps.map((step, i) => {
              const Icon = step.icon;
              const status = getStepStatus(i);
              const accent = analysisType === "admet" ? "purple" : analysisType === "gem-depmap" ? "cyan" : "amber";
              return (
                <div key={step.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    status === "done" ? `border-${accent}-400 bg-${accent}-400/20 text-${accent}-400` :
                    status === "active" ? `border-${accent}-400 bg-${accent}-500/20 text-${accent}-400 shadow-lg shadow-${accent}-500/20` :
                    "border-zinc-700 bg-zinc-800 text-zinc-500"
                  }`}
                  style={status === "active" ? { boxShadow: `0 0 20px ${activeModules[0]?.glow || 'rgba(245,158,11,0.3)'}` } : {}}
                  >
                    {status === "done" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : status === "active" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    {status === "active" && (
                      <div className={`absolute inset-0 rounded-full border-2 border-${accent}-400 animate-ping opacity-30`} />
                    )}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${
                    status === "done" ? `text-${accent}-400` : status === "active" ? `text-${accent}-400 font-semibold` : "text-zinc-500"
                  }`}
                  style={status === "done" || status === "active" ? { color: activeModules[0]?.color } : {}}
                  >{step.label}</span>
                </div>
              );
            })}
          </div>
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-zinc-800 -z-10" />
          <div
            className="absolute top-5 left-5 h-0.5 transition-all duration-700 -z-10"
            style={{
              width: `${(activeStep / (activeSteps.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, ${activeModules[0]?.color || '#F59E0B'} 0%, ${activeModules[0]?.color || '#F59E0B'} 100%)`,
            }}
          />
        </div>
      </section>

      {/* Analysis Modules */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className={`grid gap-3 ${
          activeModules.length === 5 ? "grid-cols-1 md:grid-cols-5" :
          activeModules.length === 1 ? "grid-cols-1 max-w-2xl" :
          "grid-cols-1 md:grid-cols-3"
        }`}>
          {activeModules.map((mod, idx) => {
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
                    ? "border-opacity-50 bg-gradient-to-b from-opacity-10 to-transparent shadow-lg"
                    : status === "done"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
                style={isActive ? { boxShadow: `0 0 30px ${mod.glow}` } : {}}
              >
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

                <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: status === "done" ? "#34D399" : mod.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: status === "done" ? "100%" : isActive ? "60%" : "0%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

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

      {/* Input Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
          <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Try it now</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {analysisType === "transcriptomics" && (strictMode
                    ? "Strict mode on · accepts .fastq / .fq / .fastq.gz (routed to the audit-grade workbench) and .csv (runs locally)"
                    : "Gene expression matrix · rows = genes, columns = samples · CSV format")}
                  {analysisType === "admet" && "Paste SMILES (one per line, or comma-separated) or upload a .csv with a 'smiles' column"}
                  {analysisType === "gem-depmap" && "Select a cancer cell line · pre-computed DepMap Public 26Q1 vulnerabilities × KEGG metabolic pathways"}
                </p>
              </div>
              {analysisType === "transcriptomics" && (
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
                  <span className={`relative ml-1 inline-block h-4 w-7 rounded-full transition ${strictMode ? "bg-amber-500" : "bg-zinc-600"}`}>
                    <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition ${strictMode ? "left-3.5" : "left-0.5"}`} />
                  </span>
                </button>
              )}
            </div>

            {/* Transcriptomics input (CSV / FASTQ) */}
            {analysisType === "transcriptomics" && (
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
                    <motion.div key="fastq" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <FlaskConical className="h-8 w-8 text-amber-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-white text-lg">{fastqFile.name}</p>
                        <p className="mt-1 text-sm text-zinc-400">{(fastqFile.size / 1024 / 1024).toFixed(2)} MB · ready for strict-omics workbench</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button type="button" onClick={(e) => { e.stopPropagation(); setFastqFile(null); }} className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-red-500/50 hover:text-red-400 transition">
                          <X className="h-4 w-4" /> Remove
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); openInStrictOmics(); }} disabled={handoffPending} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 font-semibold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 disabled:opacity-60 transition">
                          {handoffPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing handoff…</> : <><ShieldCheck className="h-4 w-4" /> Open in strict-omics workbench<ArrowRight className="h-4 w-4" /></>}
                        </button>
                      </div>
                    </motion.div>
                  ) : file ? (
                    <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                        <FileSpreadsheet className="h-8 w-8 text-emerald-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-white text-lg">{file.name}</p>
                        <p className="mt-1 text-sm text-zinc-400">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-red-500/50 hover:text-red-400 transition">
                          <X className="h-4 w-4" /> Remove
                        </button>
                        <label className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition cursor-pointer">
                          <Upload className="h-4 w-4" /> Change
                          <input type="file" accept={strictMode ? ".csv,.fastq,.fq,.fastq.gz,.fq.gz,text/plain,application/gzip" : ".csv"} className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="upload" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${dragActive ? "border-amber-400 bg-amber-400/10" : "border-dashed border-zinc-600 bg-zinc-800"}`}>
                        <Upload className={`h-8 w-8 transition-colors ${dragActive ? "text-amber-400" : "text-zinc-500"}`} />
                      </div>
                      <div className="text-center">
                        <p className="text-zinc-300 font-medium">{strictMode ? "Drop a FASTQ or CSV file here" : "Drop your CSV file here"}</p>
                        <p className="mt-1 text-sm text-zinc-500">or</p>
                      </div>
                      <label className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition cursor-pointer">
                        <FileSpreadsheet className="h-4 w-4" /> Browse Files
                        <input type="file" accept={strictMode ? ".csv,.fastq,.fq,.fastq.gz,.fq.gz,text/plain,application/gzip" : ".csv"} className="hidden" onChange={handleFileChange} />
                      </label>
                      <p className="text-xs text-zinc-600 mt-2">{strictMode ? "Supports: .csv · .fastq · .fq · .fastq.gz · Max 10MB CSV, up to 200K reads for FASTQ (browser-side only)" : "Supports: .csv · Max 10MB"}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ADMET input (SMILES paste or CSV) */}
            {analysisType === "admet" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Paste SMILES</label>
                  <textarea
                    value={smilesInput}
                    onChange={(e) => setSmilesInput(e.target.value)}
                    placeholder="CCO (ethanol)&#10;CC(=O)OC1=CC=CC=C1C(=O)O (aspirin)&#10;CN1C=NC2=C1C(=O)N(C(=O)N2C)C (caffeine)&#10;..."
                    className="mt-2 w-full h-40 rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-zinc-200 font-mono placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                  <p className="mt-1 text-xs text-zinc-500">One SMILES per line · or comma/semicolon-separated · or paste with optional names in parens</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition cursor-pointer">
                    <Upload className="h-4 w-4" /> Upload .csv
                    <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setSmilesInput(ADMET_EXAMPLE_SMILES.map(m => m.smiles).join("\n"));
                    }}
                    className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-200 hover:bg-purple-500/20 transition"
                  >
                    <Sparkles className="h-4 w-4" /> Load example (6 drugs)
                  </button>
                  <Link
                    href="/multiomics/example/admet"
                    className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition"
                  >
                    <FileText className="h-4 w-4" /> See full example
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* GEM-DepMap input (cell line selector) */}
            {analysisType === "gem-depmap" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Select cancer cell line</label>
                  <div className="mt-2 relative">
                    <select
                      value={cellLine}
                      onChange={(e) => setCellLine(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 pr-10 text-sm text-zinc-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    >
                      {Object.entries(GEM_DEPMAP_CELL_LINES).map(([lineageId, lines]) => (
                        <optgroup key={lineageId} label={LINEAGE_DISPLAY_NAMES[lineageId] || lineageId}>
                          {lines.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{Object.values(GEM_DEPMAP_CELL_LINES).flat().length} cell lines across {Object.keys(GEM_DEPMAP_CELL_LINES).length} cancer types · pre-computed from DepMap Public 26Q1</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/multiomics/example/gem-depmap"
                    className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 transition"
                  >
                    <Sparkles className="h-4 w-4" /> See A549 example
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span className="text-xs text-zinc-500">
                    Source: <a href="https://depmap.org/portal/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">DepMap Public 26Q1 (Chronos)</a>
                  </span>
                </div>
              </div>
            )}

            {/* Run button */}
            {canRunAnalysis() && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <button
                  onClick={runAnalysis}
                  disabled={analysisResult?.status === "uploading" || analysisResult?.status === "running"}
                  className={`flex items-center gap-3 rounded-2xl px-8 py-4 font-bold text-white shadow-xl transition-all duration-200 w-full justify-center disabled:opacity-50 ${
                    analysisType === "admet"
                      ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-purple-500/20 hover:from-purple-400 hover:to-fuchsia-400"
                      : analysisType === "gem-depmap"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-400"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400"
                  }`}
                >
                  {analysisResult?.status === "uploading" || analysisResult?.status === "running" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Running analysis…</span>
                      <div className="ml-auto flex gap-1">
                        {[0,1,2].map(i => (
                          <motion.div key={i} className="h-2 w-2 rounded-full bg-white/60" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {analysisType === "admet" && <Atom className="h-5 w-5" />}
                      {analysisType === "gem-depmap" && <Microscope className="h-5 w-5" />}
                      {analysisType === "transcriptomics" && <BarChart3 className="h-5 w-5" />}
                      <span>
                        {analysisType === "admet" && "Run ADMET Prediction"}
                        {analysisType === "gem-depmap" && "Analyze Vulnerabilities"}
                        {analysisType === "transcriptomics" && "Run Free Analysis"}
                      </span>
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Results */}
            {analysisResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
                {analysisResult.error && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="font-semibold text-red-400">Analysis Failed</p>
                    </div>
                    <p className="text-sm text-red-300/80">{analysisResult.error}</p>
                  </div>
                )}

                {analysisResult.summary && analysisType === "transcriptomics" && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <p className="font-semibold text-emerald-400">Analysis Complete</p>
                    </div>
                    <p className="text-sm text-emerald-300/80 leading-relaxed whitespace-pre-wrap">{analysisResult.summary}</p>
                  </div>
                )}

                {/* ADMET results */}
                {analysisType === "admet" && analysisResult.molecules && (
                  <div className="space-y-3">
                    {analysisResult.summary && (
                      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                          <p className="font-semibold text-purple-400">ADMET Analysis Complete</p>
                        </div>
                        <p className="text-sm text-purple-300/80 leading-relaxed whitespace-pre-wrap">{analysisResult.summary}</p>
                      </div>
                    )}
                    <div className="overflow-hidden rounded-2xl border border-zinc-800">
                      <table className="w-full text-sm">
                        <thead className="bg-zinc-900">
                          <tr>
                            <th className="text-left px-4 py-2 text-zinc-400 font-medium">Molecule</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">MW</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">logP</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">TPSA</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">Lipinski</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">BBB</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">hERG</th>
                            <th className="text-left px-3 py-2 text-zinc-400 font-medium">PAINS</th>
                            <th className="text-left px-4 py-2 text-zinc-400 font-medium">Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analysisResult.molecules.map((m, i) => (
                            <tr key={m.id} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-zinc-900/30" : ""}`}>
                              <td className="px-4 py-2">
                                <div>
                                  <p className="font-semibold text-white">{m.name}</p>
                                  {!m.valid && <p className="text-xs text-red-400">{m.error}</p>}
                                </div>
                              </td>
                              {m.valid ? (
                                <>
                                  <td className="px-3 py-2 text-zinc-300 font-mono text-xs">{m.descriptors?.mw?.toFixed(1)}</td>
                                  <td className="px-3 py-2 text-zinc-300 font-mono text-xs">{m.descriptors?.logp?.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-zinc-300 font-mono text-xs">{m.descriptors?.tpsa?.toFixed(1)}</td>
                                  <td className="px-3 py-2">
                                    {m.rules?.lipinski_pass ? (
                                      <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300">Pass</span>
                                    ) : (
                                      <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-300">{m.rules?.lipinski_violations} v</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2">
                                    {m.rules?.bbb_likely ? <span className="text-emerald-400">✓</span> : <span className="text-zinc-600">–</span>}
                                  </td>
                                  <td className="px-3 py-2">
                                    {m.rules?.herg_alert ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                                  </td>
                                  <td className="px-3 py-2">
                                    {m.rules?.pains_alert ? <span className="text-red-400">⚠</span> : <span className="text-zinc-600">–</span>}
                                  </td>
                                  <td className="px-4 py-2">
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
                                <td colSpan={8} className="px-3 py-2 text-zinc-600 text-xs">Invalid SMILES</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* GEM-DepMap results */}
                {analysisType === "gem-depmap" && analysisResult.matched && analysisResult.top_dependencies && (
                  <div className="space-y-4">
                    {analysisResult.summary && (
                      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                          <p className="font-semibold text-cyan-400">Metabolic Vulnerabilities — {analysisResult.matched.name}</p>
                        </div>
                        <p className="text-sm text-cyan-300/80 leading-relaxed whitespace-pre-wrap">{analysisResult.summary}</p>
                      </div>
                    )}

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-zinc-300">Cell line</h3>
                        <span className="text-xs text-zinc-500 font-mono">{analysisResult.matched.depmap_id}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-zinc-500">Name</p>
                          <p className="font-semibold text-white">{analysisResult.matched.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Disease</p>
                          <p className="text-zinc-300">{analysisResult.matched.primary_disease}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Lineage</p>
                          <p className="text-zinc-300">{analysisResult.matched.lineage_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Druggable (top 20)</p>
                          <p className="font-semibold text-cyan-300">{analysisResult.n_druggable_top20}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-300 mb-2">Top essential metabolic genes</h3>
                      <div className="overflow-hidden rounded-2xl border border-zinc-800">
                        <table className="w-full text-sm">
                          <thead className="bg-zinc-900">
                            <tr>
                              <th className="text-left px-4 py-2 text-zinc-400 font-medium">Rank</th>
                              <th className="text-left px-3 py-2 text-zinc-400 font-medium">Gene</th>
                              <th className="text-left px-3 py-2 text-zinc-400 font-medium">Chronos</th>
                              <th className="text-left px-3 py-2 text-zinc-400 font-medium">Pathway</th>
                              <th className="text-left px-4 py-2 text-zinc-400 font-medium">Druggable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {analysisResult.top_dependencies.slice(0, 15).map((dep, i) => (
                              <tr key={dep.gene} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-zinc-900/30" : ""}`}>
                                <td className="px-4 py-2 text-zinc-500 font-mono text-xs">#{i + 1}</td>
                                <td className="px-3 py-2 font-mono font-semibold text-white">{dep.gene}</td>
                                <td className="px-3 py-2 font-mono text-xs" style={{ color: dep.score < -1 ? "#F87171" : dep.score < -0.5 ? "#FBBF24" : "#A3A3A3" }}>{dep.score.toFixed(2)}</td>
                                <td className="px-3 py-2 text-zinc-300 text-xs">{dep.pathway}</td>
                                <td className="px-4 py-2">
                                  {dep.druggable ? <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-cyan-500/20 text-cyan-300">✓</span> : <span className="text-zinc-600">–</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {analysisResult.top_pathways && analysisResult.top_pathways.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Most-impacted pathways</h3>
                        <div className="space-y-2">
                          {analysisResult.top_pathways.slice(0, 6).map((pw, i) => (
                            <div key={pw.pathway} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{pw.pathway}</p>
                                <p className="text-xs text-zinc-500">{pw.n_essential} of {pw.total} metabolic genes essential</p>
                              </div>
                              <div className="w-32">
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

                    {analysisResult.data_version && (
                      <p className="text-xs text-zinc-500 italic">Source: {analysisResult.data_version}</p>
                    )}
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
            The free tools are for fast exploration. For a defensible, reproducible multi-platform omics workflow, choose a lane.
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
