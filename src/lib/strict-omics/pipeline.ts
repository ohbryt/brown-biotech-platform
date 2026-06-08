/**
 * Pipeline orchestrator for the strict-omics workbench.
 *
 * Drives: parse -> QC -> species gate -> trim
 * Streams progress events so the UI can update a progress bar and
 * the "Strict gates" verdict panel in real time.
 */
import { iterateFastq, type FastqRecord } from "./fastq-parser";
import { computeQc, type QcReport } from "./qc-metrics";
import { runSpeciesGate, type SpeciesGateResult, type KmerIndex } from "./kmer-gate";
import { runTrim, type TrimReport } from "./trim";

export type PipelineStage = "parse" | "qc" | "gate" | "trim" | "report";

export interface PipelineEvent {
  stage: PipelineStage;
  /** human-readable label */
  label: string;
  /** 0..1 within the stage */
  progress: number;
  /** overall 0..1 */
  overall: number;
  detail?: string;
}

export interface PipelineResult {
  qc: QcReport;
  gate: SpeciesGateResult;
  trim: TrimReport;
  totalDurationMs: number;
  file: { name: string; size: number };
}

export interface PipelineInput {
  file: File;
  index: KmerIndex;
  /** optional progress callback */
  onEvent?: (e: PipelineEvent) => void;
  /** subsample rate (every Nth read). Default 1 (all). */
  subsampleEveryN?: number;
  /** allowed species. */
  allowedSpecies?: string[];
}

const STAGE_WEIGHTS: Record<PipelineStage, number> = {
  parse: 0.1,
  qc: 0.35,
  gate: 0.3,
  trim: 0.2,
  report: 0.05,
};

function emit(
  e: PipelineEvent,
  onEvent?: (e: PipelineEvent) => void
) {
  if (onEvent) onEvent(e);
}

export async function runStrictOmicsPipeline(
  input: PipelineInput
): Promise<PipelineResult> {
  const start = performance.now();
  const { file, index, onEvent, subsampleEveryN = 1, allowedSpecies } = input;
  const subs = subsampleEveryN;

  // ---- Stage 1: parse + buffer (we need the records twice — once for
  // QC, once for gate, once for trim. Buffer the records in memory with
  // a cap so we don't OOM. v1: cap 200K. For larger inputs we'd switch
  // to disk-backed or web-worker).
  emit({ stage: "parse", label: "Reading FASTQ", progress: 0, overall: 0 }, onEvent);
  const records: FastqRecord[] = [];
  let parsed = 0;
  for await (const rec of iterateFastq(file, { subsampleEveryN: subs })) {
    records.push(rec);
    parsed++;
    if (parsed % 5000 === 0) {
      emit(
        {
          stage: "parse",
          label: "Reading FASTQ",
          progress: Math.min(1, parsed / 200_000),
          overall: STAGE_WEIGHTS.parse * Math.min(1, parsed / 200_000),
          detail: `${parsed.toLocaleString()} reads`,
        },
        onEvent
      );
    }
  }
  emit(
    {
      stage: "parse",
      label: "Read FASTQ",
      progress: 1,
      overall: STAGE_WEIGHTS.parse,
      detail: `${records.length.toLocaleString()} reads`,
    },
    onEvent
  );

  // ---- Stage 2: QC
  emit({ stage: "qc", label: "Computing QC", progress: 0, overall: STAGE_WEIGHTS.parse }, onEvent);
  const qc = await computeQc(recordsFromArray(records), {
    maxCycle: 150,
    maxReads: records.length,
  });
  emit(
    {
      stage: "qc",
      label: "QC complete",
      progress: 1,
      overall: STAGE_WEIGHTS.parse + STAGE_WEIGHTS.qc,
      detail: `${qc.totalReadsSampled.toLocaleString()} reads · ${(qc.totalBases / 1e6).toFixed(1)} Mb`,
    },
    onEvent
  );

  // ---- Stage 3: species gate
  emit(
    {
      stage: "gate",
      label: "Running species gate",
      progress: 0,
      overall: STAGE_WEIGHTS.parse + STAGE_WEIGHTS.qc,
    },
    onEvent
  );
  const gate = await runSpeciesGate(recordsFromArray(records), index, {
    allowedSpecies,
    maxReads: Math.min(records.length, 50_000),
    maxKmersPerRead: 20,
  });
  emit(
    {
      stage: "gate",
      label: "Species gate complete",
      progress: 1,
      overall: STAGE_WEIGHTS.parse + STAGE_WEIGHTS.qc + STAGE_WEIGHTS.gate,
      detail: `${gate.dominant ?? "no species"} (${(gate.dominantConfidence * 100).toFixed(1)}%)`,
    },
    onEvent
  );

  // ---- Stage 4: trim
  emit(
    {
      stage: "trim",
      label: "Trimming reads",
      progress: 0,
      overall: STAGE_WEIGHTS.parse + STAGE_WEIGHTS.qc + STAGE_WEIGHTS.gate,
    },
    onEvent
  );
  const { report: trimPromise } = await runTrim(recordsFromArray(records), {
    minMeanQuality: 20,
    minLength: 30,
  });
  const trim = await trimPromise;
  emit(
    {
      stage: "trim",
      label: "Trim complete",
      progress: 1,
      overall:
        STAGE_WEIGHTS.parse +
        STAGE_WEIGHTS.qc +
        STAGE_WEIGHTS.gate +
        STAGE_WEIGHTS.trim,
      detail: `${trim.outputReads.toLocaleString()} reads retained (${trim.pctRetained.toFixed(1)}%)`,
    },
    onEvent
  );

  emit(
    {
      stage: "report",
      label: "Building report",
      progress: 1,
      overall: 1,
    },
    onEvent
  );

  return {
    qc,
    gate,
    trim,
    totalDurationMs: performance.now() - start,
    file: { name: file.name, size: file.size },
  };
}

function recordsFromArray(arr: FastqRecord[]): AsyncIterable<FastqRecord> {
  return {
    [Symbol.asyncIterator]: async function* () {
      for (const r of arr) yield r;
    },
  };
}
