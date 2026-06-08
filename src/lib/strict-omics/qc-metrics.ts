/**
 * FastQC-equivalent QC metrics, streaming.
 *
 * Computes per-base quality, per-base GC, length distribution, N content,
 * sequence-mean quality, and duplication estimate. Streams a sample of
 * reads and aggregates.
 */
import type { FastqRecord } from "./fastq-parser";

export interface QcReport {
  totalReadsSampled: number;
  totalBases: number;
  readLength: { min: number; max: number; mean: number; median: number };
  /** per-base mean quality (Phred + 33), one entry per cycle (up to maxCycle). */
  perBaseQuality: { cycle: number; mean: number; q1: number; q3: number }[];
  /** per-base GC content, one entry per cycle. */
  perBaseGc: { cycle: number; pct: number }[];
  /** per-base N content. */
  perBaseN: { cycle: number; pct: number }[];
  /** fraction of reads with mean quality >= 30. */
  pctHighQualityReads: number;
  /** observed duplication rate (first-N-reads heuristic). */
  observedDuplication: number;
  /** common Illumina adapter content in last 10 cycles. */
  adapterContent: { cycle: number; illuminaPct: number; nexteraPct: number }[];
  /** duration in ms. */
  durationMs: number;
}

const COMP: Record<string, number> = { A: 1, C: 1, G: 1, T: 1, N: 1 };

const ILLUMINA_ADAPTER = "AGATCGGAAGAGC";
const NEXTERA_ADAPTER = "CTGTCTCTTATACACATCT";

function qualToInt(c: string): number {
  return c.charCodeAt(0) - 33; // Phred+33
}

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function adapterPctInTail(seq: string, adapter: string, tailLen: number): number {
  const tail = seq.slice(-tailLen);
  if (tail.length < adapter.length) return 0;
  // very simple: count if the adapter's last 8 bases appear in the tail
  const sub = adapter.slice(-8);
  return tail.includes(sub) ? 1 : 0;
}

export interface QcOptions {
  /** cap on cycles to track (defaults to 150). */
  maxCycle?: number;
  /** cap on reads to sample (defaults to 200_000). */
  maxReads?: number;
}

export async function computeQc(
  records: AsyncIterable<FastqRecord>,
  opts: QcOptions = {}
): Promise<QcReport> {
  const start = performance.now();
  const maxCycle = opts.maxCycle ?? 150;
  const maxReads = opts.maxReads ?? 200_000;

  const perBaseQual: number[][] = Array.from({ length: maxCycle }, () => []);
  const perBaseGc: number[] = Array(maxCycle).fill(0);
  const perBaseN: number[] = Array(maxCycle).fill(0);
  const perBaseTot: number[] = Array(maxCycle).fill(0);
  const lengths: number[] = [];
  const meanQs: number[] = [];
  const adapterIllumina: number[] = Array(maxCycle).fill(0);
  const adapterNextera: number[] = Array(maxCycle).fill(0);
  const adapterTot: number[] = Array(maxCycle).fill(0);
  const seen = new Set<string>();
  let dups = 0;
  let totalReadsSampled = 0;
  let totalBases = 0;

  for await (const rec of records) {
    totalReadsSampled++;
    if (totalReadsSampled > maxReads) break;
    lengths.push(rec.length);
    totalBases += rec.length;

    // mean quality
    let qsum = 0;
    for (let i = 0; i < rec.qual.length && i < maxCycle; i++) {
      qsum += qualToInt(rec.qual[i]);
    }
    meanQs.push(qsum / Math.min(rec.qual.length, maxCycle));

    // duplication heuristic (first 50bp of seq, subsampled)
    if (rec.seq.length >= 50) {
      const key = rec.seq.slice(0, 50);
      if (seen.has(key)) dups++;
      else seen.add(key);
    }

    // per-cycle
    const upper = rec.seq.toUpperCase();
    for (let i = 0; i < upper.length && i < maxCycle; i++) {
      const ch = upper[i];
      perBaseTot[i]++;
      if (i < rec.qual.length) {
        perBaseQual[i].push(qualToInt(rec.qual[i]));
      }
      if (ch === "G" || ch === "C") perBaseGc[i]++;
      else if (ch === "N") perBaseN[i]++;
    }

    // adapter content — count reads that contain adapter in last 50 cycles
    // (per cycle, fraction of reads so far containing adapter at that cycle)
    const tailLen = Math.min(50, upper.length);
    for (let i = upper.length - tailLen; i < upper.length; i++) {
      if (i < 0) continue;
      const cyc = i;
      adapterTot[cyc]++;
      if (adapterPctInTail(upper.slice(i), ILLUMINA_ADAPTER, tailLen)) adapterIllumina[cyc]++;
      if (adapterPctInTail(upper.slice(i), NEXTERA_ADAPTER, tailLen)) adapterNextera[cyc]++;
    }
  }

  const sortedLens = [...lengths].sort((a, b) => a - b);

  return {
    totalReadsSampled,
    totalBases,
    readLength: {
      min: sortedLens[0] ?? 0,
      max: sortedLens[sortedLens.length - 1] ?? 0,
      mean: mean(lengths),
      median: quantile(sortedLens, 0.5),
    },
    perBaseQuality: perBaseQual.map((q, i) => {
      const sorted = [...q].sort((a, b) => a - b);
      return {
        cycle: i + 1,
        mean: mean(q),
        q1: quantile(sorted, 0.25),
        q3: quantile(sorted, 0.75),
      };
    }),
    perBaseGc: perBaseGc.map((gc, i) => ({
      cycle: i + 1,
      pct: perBaseTot[i] ? (gc / perBaseTot[i]) * 100 : 0,
    })),
    perBaseN: perBaseN.map((n, i) => ({
      cycle: i + 1,
      pct: perBaseTot[i] ? (n / perBaseTot[i]) * 100 : 0,
    })),
    pctHighQualityReads:
      meanQs.length === 0 ? 0 : (meanQs.filter((q) => q >= 30).length / meanQs.length) * 100,
    observedDuplication: totalReadsSampled === 0 ? 0 : (dups / totalReadsSampled) * 100,
    adapterContent: adapterTot.map((t, i) => ({
      cycle: i + 1,
      illuminaPct: t ? (adapterIllumina[i] / t) * 100 : 0,
      nexteraPct: t ? (adapterNextera[i] / t) * 100 : 0,
    })),
    durationMs: performance.now() - start,
  };
}
