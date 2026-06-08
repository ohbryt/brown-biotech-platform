"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  FileText,
  PlayCircle,
  Sparkles,
  Database,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Download,
} from "lucide-react";
import Link from "next/link";
import { demoFastqFile } from "@/lib/strict-omics/demo-data";
import {
  runStrictOmicsPipeline,
  type PipelineEvent,
  type PipelineResult,
} from "@/lib/strict-omics/pipeline";
import { loadKmerIndex, type KmerIndex } from "@/lib/strict-omics/kmer-gate";
import { consumeStash as defaultConsumeStash } from "@/lib/handoff-db";

type Verdict = "PASS" | "FAIL" | "UNKNOWN" | null;

const ALLOWED = ["human", "mouse"];

const STAGES = [
  { id: "parse", label: "Read FASTQ" },
  { id: "qc", label: "QC metrics" },
  { id: "gate", label: "Species gate" },
  { id: "trim", label: "Trim reads" },
  { id: "report", label: "Report" },
] as const;

export interface StrictOmicsWorkbenchProps {
  /** When set, the workbench will fetch a stashed file from this source
   *  (typically a UUID-keyed IndexedDB record from /multiomics handoff). */
  preloadUuid?: string | null;
  /** If true, the workbench will auto-run the pipeline once the stashed
   *  file is loaded. Ignored when preloadUuid is null. */
  autoRun?: boolean;
  /** Function used to consume the stashed file. The default uses our
   *  IndexedDB handoff store. */
  onPreloadConsumed?: (uuid: string) => Promise<File | null>;
}

export default function StrictOmicsWorkbench({
  preloadUuid = null,
  autoRun = false,
  onPreloadConsumed,
}: StrictOmicsWorkbenchProps = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<PipelineEvent | null>(null);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [index, setIndex] = useState<KmerIndex | null>(null);
  const [interpretText, setInterpretText] = useState<string | null>(null);
  const [interpretLoading, setInterpretLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadKmerIndex().then(
      (i) => {
        if (!cancelled) setIndex(i);
      },
      (e) => {
        if (!cancelled) setError(`Failed to load species index: ${String(e)}`);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFiles = useCallback((fl: FileList | File[] | null) => {
    if (!fl) return;
    const arr = Array.from(fl as ArrayLike<File>);
    const f = arr.find((x) => /\.f(ast)?q(\.gz)?$/i.test(x.name)) ?? arr[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setInterpretText(null);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  }, []);

  const runWithFile = useCallback(
    async (target: File) => {
      if (!index) {
        setError("Species index is still loading.");
        return;
      }
      setRunning(true);
      setResult(null);
      setInterpretText(null);
      setError(null);
      setProgress({
        stage: "parse",
        label: "Starting",
        progress: 0,
        overall: 0,
      });
      try {
        const r = await runStrictOmicsPipeline({
          file: target,
          index,
          allowedSpecies: ALLOWED,
          subsampleEveryN: 1,
          onEvent: (e) => setProgress(e),
        });
        setResult(r);
        // Fire-and-forget LLM interpretation
        setInterpretLoading(true);
        try {
          const res = await fetch("/api/interpret", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              qc: r.qc,
              gate: r.gate,
              trim: r.trim,
              file: r.file,
            }),
          });
          const j = await res.json();
          if (j?.summary) setInterpretText(j.summary);
          else setInterpretText(j?.error ?? "No interpretation available.");
        } catch (ie) {
          setInterpretText(`Interpretation service unavailable: ${String(ie)}`);
        } finally {
          setInterpretLoading(false);
        }
      } catch (e) {
        setError(`Pipeline failed: ${String(e)}`);
      } finally {
        setRunning(false);
        setProgress(null);
      }
    },
    [index]
  );

  const useDemo = useCallback(() => {
    const f = demoFastqFile();
    setFile(f);
    setResult(null);
    setInterpretText(null);
    setError(null);
    runWithFile(f);
  }, [runWithFile]);

  const run = useCallback(() => {
    if (file) runWithFile(file);
  }, [file, runWithFile]);

  // Cross-page file handoff: when preloadUuid is set, fetch the stashed
  // file from IndexedDB and (optionally) auto-run the pipeline.
  // We use a ref to ensure we only consume each UUID once.
  const consumedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!preloadUuid) return;
    if (!index) return; // wait for the k-mer index
    if (consumedRef.current === preloadUuid) return;
    consumedRef.current = preloadUuid;
    const consumer = onPreloadConsumed ?? defaultConsumeStash;
    let cancelled = false;
    setError(null);
    consumer(preloadUuid)
      .then((f) => {
        if (cancelled) return;
        if (!f) {
          setError(
            "Handoff file not found. It may have been consumed already or expired. Drop a FASTQ to start a new run."
          );
          return;
        }
        setFile(f);
        setResult(null);
        setInterpretText(null);
        if (autoRun) {
          // small delay so the UI shows the file before running
          setTimeout(() => {
            if (!cancelled) runWithFile(f);
          }, 50);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Failed to load handoff file: ${String(e)}`);
      });
    return () => {
      cancelled = true;
    };
  }, [preloadUuid, index, autoRun, onPreloadConsumed, runWithFile]);

  const stageIndex = useMemo(() => {
    if (!progress) return -1;
    return STAGES.findIndex((s) => s.id === progress.stage);
  }, [progress]);

  const verdict = result?.gate.verdict ?? null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.10),transparent_30%),radial-gradient(circle_at_85%_60%,rgba(146,64,14,0.10),transparent_28%)] pointer-events-none" />
      <div className="relative p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              Live workbench · browser-side pipeline
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Strict-Omics QC & species gate
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Drop a FASTQ (.fastq or .fastq.gz) — the workbench parses it, runs FastQC-equivalent QC, classifies species
              against a pre-built k-mer index, and quality-trims reads. All in your browser. No upload to a backend.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Up to 200K reads
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              .fastq · .fastq.gz
            </span>
            {index && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                <Database className="mr-1 inline h-3 w-3" />
                {Object.keys(index.species).length} species
              </span>
            )}
          </div>
        </div>

        {/* Dropzone + actions */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div
            onDrop={handleDrop}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition lg:col-span-2 ${
              dragActive
                ? "border-amber-400 bg-amber-500/10"
                : "border-white/15 bg-white/5 hover:border-amber-500/50 hover:bg-amber-500/5"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".fastq,.fq,.fastq.gz,.fq.gz"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="h-7 w-7 text-amber-400" />
              <p className="mt-3 text-base font-semibold text-white">
                {file ? file.name : "Drop FASTQ here, or click to browse"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {file
                  ? `${(file.size / 1e6).toFixed(2)} MB · read limit applied for browser demo`
                  : "Uncompressed or gzipped. Processed locally — never uploaded."}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500">
                <span>No upload</span>
                <span>·</span>
                <span>No server</span>
                <span>·</span>
                <span>No LLM call for the pipeline</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={run}
              disabled={!file || running || !index}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3.5 font-semibold text-white shadow-xl shadow-amber-500/20 transition hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {running ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Running…
                </>
              ) : (
                <>
                  <PlayCircle className="h-5 w-5" /> Run strict pipeline
                </>
              )}
            </button>
            <button
              onClick={useDemo}
              disabled={running || !index}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 font-semibold text-gray-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles className="h-5 w-5" /> Try with sample data
            </button>
            <Link
              href="/multiomics"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
            >
              <FileText className="h-4 w-4" /> Have a CSV instead? Try /multiomics
            </Link>
          </div>
        </div>

        {/* Stage tracker */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {STAGES.map((s, i) => {
            const active = progress?.stage === s.id;
            const done = !running && result && i <= stageIndex;
            const doneAll = !running && result !== null;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                  active
                    ? "border-amber-400 bg-amber-500/15 text-amber-200"
                    : done || doneAll
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/5 text-gray-400"
                }`}
              >
                {active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : done || doneAll ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span className="inline-block h-3.5 w-3.5 rounded-full border border-current" />
                )}
                <span>
                  0{i + 1} {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {progress && (
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${Math.round(progress.overall * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              <span className="font-semibold text-amber-200">{progress.label}</span>
              {progress.detail ? ` · ${progress.detail}` : ""}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
            <XCircle className="mt-0.5 h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <ResultsPanel
            result={result}
            verdict={verdict}
            interpretText={interpretText}
            interpretLoading={interpretLoading}
          />
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

function ResultsPanel({
  result,
  verdict,
  interpretText,
  interpretLoading,
}: {
  result: PipelineResult;
  verdict: Verdict;
  interpretText: string | null;
  interpretLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-6"
    >
      {/* Verdict + Strict gates */}
      <VerdictPanel result={result} verdict={verdict} />

      {/* QC summary + per-base quality chart + GC chart */}
      <QcPanel qc={result.qc} />

      {/* Species composition + LLM interpretation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SpeciesPanel result={result} />
        <InterpretationPanel
          text={interpretText}
          loading={interpretLoading}
          verdict={verdict}
        />
      </div>

      {/* Trim stats + production CTA */}
      <div className="grid gap-6 lg:grid-cols-3">
        <TrimPanel trim={result.trim} />
        <ProductionCta />
      </div>

      {/* Index metadata */}
      <IndexMeta index={result.gate.index} />
    </motion.div>
  );
}

function VerdictPanel({
  result,
  verdict,
}: {
  result: PipelineResult;
  verdict: Verdict;
}) {
  const color =
    verdict === "PASS"
      ? "border-emerald-500/40 bg-emerald-500/10"
      : verdict === "FAIL"
        ? "border-red-500/40 bg-red-500/10"
        : "border-amber-500/40 bg-amber-500/10";
  const Icon =
    verdict === "PASS" ? CheckCircle2 : verdict === "FAIL" ? XCircle : AlertCircle;
  const label =
    verdict === "PASS" ? "PASS · strict gates green" : verdict === "FAIL" ? "FAIL · blocked" : "UNKNOWN · review";
  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-6 w-6" />
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Strict gates verdict
          </p>
          <p className="mt-1 text-2xl font-bold">{label}</p>
          <p className="mt-2 text-sm opacity-90">{result.gate.reason}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <GateStat label="Reads scanned" value={result.gate.recordsScanned.toLocaleString()} />
            <GateStat label="K-mers hit" value={result.gate.kmersMatched.toLocaleString()} />
            <GateStat label="Dominant" value={result.gate.dominant ?? "—"} />
            <GateStat
              label="Confidence"
              value={`${(result.gate.dominantConfidence * 100).toFixed(1)}%`}
            />
          </div>
          {result.gate.forbiddenHits.length > 0 && (
            <p className="mt-3 text-xs text-red-300">
              Forbidden species: {result.gate.forbiddenHits.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function GateStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function QcPanel({ qc }: { qc: import("@/lib/strict-omics/qc-metrics").QcReport }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
        QC · FastQC-equivalent
      </p>
      <h3 className="mt-1 text-lg font-semibold">
        {qc.totalReadsSampled.toLocaleString()} reads · {(qc.totalBases / 1e6).toFixed(1)} Mb ·{" "}
        {qc.readLength.mean.toFixed(0)} bp mean
      </h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs text-gray-400">Per-base mean quality (Phred+33)</p>
          <PerBaseQualityChart qc={qc} />
        </div>
        <div>
          <p className="text-xs text-gray-400">Per-base GC content (%)</p>
          <PerBaseGcChart qc={qc} />
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <SmallStat label="Reads ≥ Q30" value={`${qc.pctHighQualityReads.toFixed(1)}%`} />
        <SmallStat label="Obs. duplication" value={`${qc.observedDuplication.toFixed(1)}%`} />
        <SmallStat label="Read length" value={`${qc.readLength.min}-${qc.readLength.max} bp`} />
        <SmallStat label="QC duration" value={`${(qc.durationMs / 1000).toFixed(1)}s`} />
      </div>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function PerBaseQualityChart({
  qc,
}: {
  qc: import("@/lib/strict-omics/qc-metrics").QcReport;
}) {
  const cycles = qc.perBaseQuality.slice(0, 80); // first 80 cycles
  const w = 480;
  const h = 100;
  const pad = 20;
  const innerW = w - 2 * pad;
  const innerH = h - 2 * pad;
  const xs = cycles.map((c) => pad + (c.cycle - 1) * (innerW / Math.max(1, cycles.length - 1)));
  const yMin = 0;
  const yMax = 42;
  const yOf = (q: number) => pad + (1 - (q - yMin) / (yMax - yMin)) * innerH;
  const meanPath = cycles.map((c, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${yOf(c.mean).toFixed(1)}`).join(" ");
  const q1Path = cycles.map((c, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${yOf(c.q1).toFixed(1)}`).join(" ");
  const q3Path = cycles.map((c, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${yOf(c.q3).toFixed(1)}`).join(" ");
  // q1/q3 area
  const areaPath =
    q1Path +
    " " +
    cycles
      .map((c, i) => {
        const idx = cycles.length - 1 - i;
        return `L ${xs[idx].toFixed(1)} ${yOf(cycles[idx].q3).toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
      <rect x={0} y={0} width={w} height={h} fill="transparent" />
      {/* gridlines */}
      {[0, 10, 20, 30, 40].map((q) => (
        <g key={q}>
          <line
            x1={pad}
            x2={w - pad}
            y1={yOf(q)}
            y2={yOf(q)}
            stroke="rgba(255,255,255,0.05)"
          />
          <text x={4} y={yOf(q) + 3} fill="rgba(255,255,255,0.4)" fontSize="9">
            Q{q}
          </text>
        </g>
      ))}
      <path d={areaPath} fill="rgba(245,158,11,0.15)" stroke="none" />
      <path d={q1Path} fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth={0.5} />
      <path d={q3Path} fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth={0.5} />
      <path d={meanPath} fill="none" stroke="#F59E0B" strokeWidth={1.6} />
    </svg>
  );
}

function PerBaseGcChart({
  qc,
}: {
  qc: import("@/lib/strict-omics/qc-metrics").QcReport;
}) {
  const cycles = qc.perBaseGc.slice(0, 80);
  const w = 480;
  const h = 100;
  const pad = 20;
  const innerW = w - 2 * pad;
  const innerH = h - 2 * pad;
  const xs = cycles.map((c) => pad + (c.cycle - 1) * (innerW / Math.max(1, cycles.length - 1)));
  const yOf = (g: number) => pad + (1 - g / 100) * innerH;
  const path = cycles.map((c, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${yOf(c.pct).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
      <rect x={0} y={0} width={w} height={h} fill="transparent" />
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line
            x1={pad}
            x2={w - pad}
            y1={yOf(g)}
            y2={yOf(g)}
            stroke="rgba(255,255,255,0.05)"
          />
          <text x={4} y={yOf(g) + 3} fill="rgba(255,255,255,0.4)" fontSize="9">
            {g}%
          </text>
        </g>
      ))}
      <path d={path} fill="none" stroke="#10B981" strokeWidth={1.6} />
    </svg>
  );
}

function SpeciesPanel({ result }: { result: PipelineResult }) {
  const comp = Object.entries(result.gate.composition).sort(
    (a, b) => b[1] - a[1]
  );
  const total = comp.reduce((s, [, v]) => s + v, 0);
  const colors: Record<string, string> = {
    human: "#F59E0B",
    mouse: "#3B82F6",
    dog: "#EF4444",
    chicken: "#EAB308",
    phix: "#8B5CF6",
    ecoli_rrna: "#10B981",
    yeast: "#06B6D4",
    demo_brett: "#EC4899",
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
        Species composition
      </p>
      <h3 className="mt-1 text-lg font-semibold">
        {result.gate.dominant ?? "No species detected"} ·{" "}
        <span className="text-gray-400">
          {(result.gate.dominantConfidence * 100).toFixed(1)}% confidence
        </span>
      </h3>
      {comp.length === 0 ? (
        <p className="mt-3 text-sm text-gray-400">
          No k-mer matches against the reference panel. The sample is either unrelated to the indexed species
          or empty.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          {comp.map(([sp, frac]) => (
            <div key={sp}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-gray-300">{sp}</span>
                <span className="text-gray-400">{(frac * 100).toFixed(2)}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full"
                  style={{
                    width: `${(frac / Math.max(total, 0.001)) * 100}%`,
                    background: colors[sp] ?? "#9CA3AF",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-[11px] text-gray-500">
        k={result.gate.index.k} · {result.gate.kmersScanned.toLocaleString()} kmers scanned ·{" "}
        {result.gate.kmersMatched.toLocaleString()} matched
      </p>
    </div>
  );
}

function InterpretationPanel({
  text,
  loading,
  verdict,
}: {
  text: string | null;
  loading: boolean;
  verdict: Verdict;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
          LLM interpretation
        </p>
        {verdict && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              verdict === "PASS"
                ? "bg-emerald-500/15 text-emerald-300"
                : verdict === "FAIL"
                  ? "bg-red-500/15 text-red-300"
                  : "bg-amber-500/15 text-amber-300"
            }`}
          >
            {verdict}
          </span>
        )}
      </div>
      {loading ? (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Asking the model to interpret the run…
        </div>
      ) : text ? (
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-200">{text}</p>
      ) : (
        <p className="mt-3 text-sm text-gray-400">
          After the pipeline runs, a server-side model summarises the QC + species + trim result into a
          decision-ready paragraph.
        </p>
      )}
    </div>
  );
}

function TrimPanel({ trim }: { trim: import("@/lib/strict-omics/trim").TrimReport }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
        Trim
      </p>
      <h3 className="mt-1 text-lg font-semibold">
        {trim.outputReads.toLocaleString()} / {trim.inputReads.toLocaleString()} reads retained
      </h3>
      <div className="mt-4 space-y-3">
        <Bar label="Reads retained" value={trim.pctRetained} suffix="%" color="#F59E0B" />
        <Bar label="Bases retained" value={trim.pctBasesRetained} suffix="%" color="#10B981" />
        <Bar label="Quality trimmed" value={trim.pctReadsTrimmedQuality} suffix="%" color="#3B82F6" />
        <Bar label="Adapter trimmed" value={trim.pctReadsTrimmedAdapter} suffix="%" color="#8B5CF6" />
        <Bar label="Dropped (too short)" value={trim.pctReadsDropped} suffix="%" color="#EF4444" />
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">
          {value.toFixed(1)}
          {suffix}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function ProductionCta() {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-900/50 p-5 lg:col-span-2">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-6 w-6 text-amber-300" />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            Browser preview
          </p>
          <h3 className="mt-1 text-lg font-semibold">
            Production alignment, quantification, and RO-Crate provenance run on our Nextflow / Snakemake backend
          </h3>
          <p className="mt-2 text-sm text-gray-300">
            The browser workbench covers the first 4 ingestion gates (parse · QC · species · trim). Full
            STAR / salmon / kallisto / RMA, batch-aware correction, and audit-grade provenance are run on
            the production pipeline. Submit a brief to start.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="#brief"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400"
            >
              Request a Pipeline Brief <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#methodology"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" /> See the methodology
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndexMeta({ index }: { index: { version: number; k: number; demo: boolean; build_date: string; note: string } }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-[11px] leading-6 text-gray-400">
      <p>
        <span className="font-semibold text-gray-300">Species index:</span> v{index.version} · k={index.k} ·{" "}
        built {index.build_date} · {index.demo ? "demo" : "production"} reference set
      </p>
      <p className="mt-1">{index.note}</p>
    </div>
  );
}

// Avoid unused warnings in production builds
const _ = { Download, AnimatePresence };
void _;
