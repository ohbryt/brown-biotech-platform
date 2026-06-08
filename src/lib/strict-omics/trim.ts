/**
 * Cutadapt-lite: 3'-end quality trim + known-adapter trim.
 *
 * Streaming: yields trimmed FastqRecord + per-stage stats. Pure TS,
 * no deps. Designed to be cheap enough to run on 100K+ reads in a few
 * seconds in the browser.
 */
import type { FastqRecord } from "./fastq-parser";

export interface TrimOptions {
  /** minimum mean quality across a window to keep (default 20). */
  minMeanQuality?: number;
  /** window size for mean quality evaluation (default 4). */
  windowSize?: number;
  /** minimum read length after trimming (default 30). */
  minLength?: number;
  /** known 3' adapters to trim (default: Illumina + Nextera). */
  adapters?: string[];
  /** cap on records (default 200_000). */
  maxRecords?: number;
}

export interface TrimReport {
  inputReads: number;
  outputReads: number;
  pctRetained: number;
  basesBefore: number;
  basesAfter: number;
  pctBasesRetained: number;
  pctReadsTrimmedQuality: number;
  pctReadsTrimmedAdapter: number;
  pctReadsDropped: number;
  durationMs: number;
}

const DEFAULT_ADAPTERS = [
  "AGATCGGAAGAGCACACGTCTGAACTCCAGTCAC", // Illumina TruSeq
  "AAGTCGGAGGCCAAGCG", // Illumina small RNA
  "CTGTCTCTTATACACATCT", // Nextera
];

function qualToInt(c: string): number {
  return c.charCodeAt(0) - 33;
}

function mean(xs: number[]): number {
  let s = 0;
  for (const x of xs) s += x;
  return xs.length ? s / xs.length : 0;
}

/**
 * Find the longest prefix of `adapter` that appears as a suffix of `seq`.
 * Returns the index in `seq` where the adapter starts, or -1.
 */
function findAdapterSuffix(seq: string, adapter: string): number {
  // try full, then truncated
  for (let len = adapter.length; len >= 8; len--) {
    const sub = adapter.slice(0, len);
    if (seq.endsWith(sub)) {
      return seq.length - len;
    }
  }
  return -1;
}

/**
 * 3'-end sliding-window quality trim.
 * Returns the index of the first base to keep. (Bases from this index onward
 * are kept; everything before is dropped from the 3' end.)
 */
function qualityTrimEnd(seq: string, qual: string, minMean: number, window: number): number {
  if (qual.length === 0) return seq.length;
  // convert all to int once
  const qs: number[] = new Array(qual.length);
  for (let i = 0; i < qual.length; i++) qs[i] = qualToInt(qual[i]);

  // slide from the right; find the first window (going left) with mean < minMean
  // we trim everything to the right of that bad window.
  for (let i = qs.length - window; i >= 0; i--) {
    const m = mean(qs.slice(i, i + window));
    if (m < minMean) {
      return i; // bases [0..i) are kept; [i..end) dropped
    }
  }
  return 0; // everything is bad, drop all
}

export async function* trimRecords(
  records: AsyncIterable<FastqRecord>,
  opts: TrimOptions = {}
): AsyncGenerator<FastqRecord> {
  const minMean = opts.minMeanQuality ?? 20;
  const window = opts.windowSize ?? 4;
  const minLen = opts.minLength ?? 30;
  const adapters = opts.adapters ?? DEFAULT_ADAPTERS;
  const maxRecords = opts.maxRecords ?? 200_000;

  let n = 0;
  for await (const rec of records) {
    n++;
    if (n > maxRecords) return;
    let seq = rec.seq;
    let qual = rec.qual;

    // 1) adapter trim
    let adapterTrimmed = false;
    for (const a of adapters) {
      const idx = findAdapterSuffix(seq, a);
      if (idx >= 0) {
        seq = seq.slice(0, idx);
        qual = qual.slice(0, idx);
        adapterTrimmed = true;
        break;
      }
    }

    // 2) quality trim
    const keep = qualityTrimEnd(seq, qual, minMean, window);
    if (keep > 0) {
      seq = seq.slice(0, keep);
      qual = qual.slice(0, keep);
    }

    if (seq.length >= minLen) {
      yield { id: rec.id, seq, qual, length: seq.length };
    }
  }
}

export async function runTrim(
  records: AsyncIterable<FastqRecord>,
  opts: TrimOptions = {}
): Promise<{ trimmed: AsyncIterable<FastqRecord>; report: Promise<TrimReport> }> {
  const start = performance.now();
  // Materialise a tee: drive the trim generator, also report counts.
  // We use a PassThrough-like wrapper: we re-iterate input twice is not
  // possible, so instead we capture stats inside a single pass and emit
  // trimmed records that the consumer re-reads.
  //
  // For v1 we accept a one-pass model: callers can either stream the
  // trimmed output OR ask for the report. The wrapper below exposes both.

  // Buffer the input into an array (with cap) so we can iterate twice.
  // For very large inputs this is heavy — but for v1 with cap 200K it
  // fits comfortably in memory.
  const arr: FastqRecord[] = [];
  for await (const r of records) {
    arr.push(r);
    if (arr.length >= (opts.maxRecords ?? 200_000)) break;
  }

  const minMean = opts.minMeanQuality ?? 20;
  const window = opts.windowSize ?? 4;
  const minLen = opts.minLength ?? 30;
  const adapters = opts.adapters ?? DEFAULT_ADAPTERS;

  const trimmed: FastqRecord[] = [];
  let basesBefore = 0;
  let basesAfter = 0;
  let readsTrimmedQuality = 0;
  let readsTrimmedAdapter = 0;
  let readsDropped = 0;

  for (const rec of arr) {
    basesBefore += rec.length;
    let seq = rec.seq;
    let qual = rec.qual;

    let adapterTrimmed = false;
    for (const a of adapters) {
      const idx = findAdapterSuffix(seq, a);
      if (idx >= 0) {
        seq = seq.slice(0, idx);
        qual = qual.slice(0, idx);
        adapterTrimmed = true;
        break;
      }
    }
    if (adapterTrimmed) readsTrimmedAdapter++;

    const keep = qualityTrimEnd(seq, qual, minMean, window);
    if (keep > 0) {
      seq = seq.slice(0, keep);
      qual = qual.slice(0, keep);
      readsTrimmedQuality++;
    }

    if (seq.length >= minLen) {
      basesAfter += seq.length;
      trimmed.push({ id: rec.id, seq, qual, length: seq.length });
    } else {
      readsDropped++;
    }
  }

  async function* trimmedIter() {
    for (const t of trimmed) yield t;
  }

  const report: TrimReport = {
    inputReads: arr.length,
    outputReads: trimmed.length,
    pctRetained: arr.length ? (trimmed.length / arr.length) * 100 : 0,
    basesBefore,
    basesAfter,
    pctBasesRetained: basesBefore ? (basesAfter / basesBefore) * 100 : 0,
    pctReadsTrimmedQuality: arr.length ? (readsTrimmedQuality / arr.length) * 100 : 0,
    pctReadsTrimmedAdapter: arr.length ? (readsTrimmedAdapter / arr.length) * 100 : 0,
    pctReadsDropped: arr.length ? (readsDropped / arr.length) * 100 : 0,
    durationMs: performance.now() - start,
  };

  return { trimmed: trimmedIter(), report: Promise.resolve(report) };
}
