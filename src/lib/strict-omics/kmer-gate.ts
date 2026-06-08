/**
 * Browser-side k-mer species gate.
 *
 * Loads the pre-built k-mer index from /kmer-index/v1.json, then for each
 * FASTQ read extracts canonical 25-mers and votes on species identity.
 * Returns a composition map, the dominant species, and a gate verdict
 * (PASS / FAIL / UNKNOWN) according to configurable thresholds.
 */
import type { FastqRecord } from "./fastq-parser";

export interface SpeciesInfo {
  id: string;
  common: string;
  scientific: string;
  source: string;
  marker_count: number;
}

export interface KmerIndex {
  version: number;
  k: number;
  demo: boolean;
  build_date: string;
  note: string;
  species: Record<string, SpeciesInfo>;
  markers: Record<string, string>;
}

export interface SpeciesGateResult {
  /** number of records scanned. */
  recordsScanned: number;
  /** number of 25-mers that hit the index. */
  kmersMatched: number;
  /** total 25-mers scanned (canonical, ambiguous Ns skipped). */
  kmersScanned: number;
  /** species -> fraction of votes (0..1). */
  composition: Record<string, number>;
  /** species with the most votes. */
  dominant: string | null;
  /** confidence of the dominant species (its fraction of votes). */
  dominantConfidence: number;
  /** sample of the first few unclassified reads (for the report). */
  sampleUnclassified: number;
  /** duration in ms. */
  durationMs: number;
  /** species flagged as forbidden (over `forbiddenMaxPct`). */
  forbiddenHits: string[];
  /** overall gate verdict. */
  verdict: "PASS" | "FAIL" | "UNKNOWN";
  /** reason text (shown in UI). */
  reason: string;
  /** loaded index metadata (for the report header). */
  index: { version: number; k: number; demo: boolean; build_date: string; note: string };
}

export interface GateOptions {
  /** allowed species — anything outside that is a fail (default: human + mouse). */
  allowedSpecies?: string[];
  /** max fraction (0..1) of any forbidden species before FAIL (default 0.05). */
  forbiddenMaxPct?: number;
  /** minimum dominant confidence to PASS (default 0.6). */
  minDominantConfidence?: number;
  /** cap on reads to sample for speed. */
  maxReads?: number;
  /** cap on kmers per read. */
  maxKmersPerRead?: number;
}

// 2-bit encoding (matches build script)
const COMP: Record<string, number> = { A: 0, C: 1, G: 2, T: 3 };

function rcHash(forward: number, k: number): number {
  let rc = 0;
  for (let i = 0; i < k; i++) {
    const base = (forward >> (2 * (k - 1 - i))) & 0b11;
    rc = (rc << 2) | (base ^ 0b11);
  }
  return rc;
}

function readCanonicalKmers(seq: string, k: number, maxKmers: number): number[] {
  const out: number[] = [];
  const upper = seq.toUpperCase();
  const mask = (1 << (2 * k)) - 1;
  let h: number | null = null;
  for (let i = 0; i < upper.length; i++) {
    const c = COMP[upper[i]];
    if (c === undefined) {
      h = null;
      continue;
    }
    if (h === null) {
      h = c;
      for (let j = i + 1; j < Math.min(i + k, upper.length); j++) {
        const cj = COMP[upper[j]];
        if (cj === undefined) {
          h = null;
          break;
        }
        h = ((h ?? 0) << 2) | cj;
      }
      if (h !== null && i + k <= upper.length) {
        const rc = rcHash(h, k);
        out.push(h < rc ? h : rc);
        if (out.length >= maxKmers) return out;
      }
      continue;
    }
    h = ((h << 2) | c) & mask;
    if (i >= k - 1) {
      const rc = rcHash(h, k);
      out.push(h < rc ? h : rc);
      if (out.length >= maxKmers) return out;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Index loading (cached)
// ---------------------------------------------------------------------------

let _index: KmerIndex | null = null;
let _indexUrl = "/kmer-index/v1.json";

export async function loadKmerIndex(url = _indexUrl): Promise<KmerIndex> {
  if (_index && url === _indexUrl) return _index;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load k-mer index: ${res.status} ${res.statusText}`);
  const raw = (await res.json()) as KmerIndex;
  // The JSON markers keys are decimal strings. Build a Map<number,string>
  // for fast lookup.
  const markersNum: Record<number, string> = {};
  for (const [k, v] of Object.entries(raw.markers)) {
    markersNum[Number(k)] = v;
  }
  _index = { ...raw, markers: markersNum as unknown as Record<string, string> };
  _indexUrl = url;
  return _index;
}

/** Test-only: inject an index (e.g. for the workbench's demo mode). */
export function _setIndexForTest(idx: KmerIndex) {
  _index = idx;
}

// ---------------------------------------------------------------------------
// Gate
// ---------------------------------------------------------------------------

export async function runSpeciesGate(
  records: AsyncIterable<FastqRecord>,
  index: KmerIndex,
  opts: GateOptions = {}
): Promise<SpeciesGateResult> {
  const start = performance.now();
  const allowed = new Set(opts.allowedSpecies ?? ["human", "mouse"]);
  const forbiddenMax = opts.forbiddenMaxPct ?? 0.05;
  const minConf = opts.minDominantConfidence ?? 0.6;
  const maxReads = opts.maxReads ?? 50_000;
  const maxKmers = opts.maxKmersPerRead ?? 20;

  const votes: Record<string, number> = {};
  let recordsScanned = 0;
  let kmersScanned = 0;
  let kmersMatched = 0;
  let unclassified = 0;

  for await (const rec of records) {
    recordsScanned++;
    if (recordsScanned > maxReads) break;
    const kmers = readCanonicalKmers(rec.seq, index.k, maxKmers);
    let readMatched = false;
    for (const k of kmers) {
      kmersScanned++;
      const hit = index.markers[String(k) as keyof typeof index.markers];
      if (hit) {
        votes[hit] = (votes[hit] ?? 0) + 1;
        kmersMatched++;
        readMatched = true;
      }
    }
    if (!readMatched) unclassified++;
  }

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const composition: Record<string, number> = {};
  for (const [k, v] of Object.entries(votes)) composition[k] = total ? v / total : 0;

  let dominant: string | null = null;
  let dominantCount = 0;
  for (const [k, v] of Object.entries(votes)) {
    if (v > dominantCount) {
      dominant = k;
      dominantCount = v;
    }
  }
  const dominantConfidence = total ? dominantCount / total : 0;

  // Forbidden hits
  const forbiddenHits: string[] = [];
  for (const [sp, frac] of Object.entries(composition)) {
    if (!allowed.has(sp) && frac > forbiddenMax) forbiddenHits.push(sp);
  }

  // Verdict
  let verdict: "PASS" | "FAIL" | "UNKNOWN" = "UNKNOWN";
  let reason = "";
  if (total === 0 || kmersMatched / Math.max(1, kmersScanned) < 0.001) {
    verdict = "UNKNOWN";
    reason = "No species signature matched. Sample is not in the reference panel (or is contaminated/empty).";
  } else if (dominant && !allowed.has(dominant)) {
    verdict = "FAIL";
    reason = `Dominant species "${dominant}" is not in the allow-list.`;
  } else if (forbiddenHits.length > 0) {
    verdict = "FAIL";
    reason = `Forbidden species detected above threshold: ${forbiddenHits.join(", ")}.`;
  } else if (dominant && dominantConfidence < minConf) {
    verdict = "UNKNOWN";
    reason = `Dominant species "${dominant}" confidence (${(dominantConfidence * 100).toFixed(1)}%) below threshold (${(minConf * 100).toFixed(0)}%).`;
  } else if (dominant) {
    verdict = "PASS";
    reason = `Dominant species "${dominant}" matches the allow-list with ${(dominantConfidence * 100).toFixed(1)}% confidence.`;
  }

  return {
    recordsScanned,
    kmersMatched,
    kmersScanned,
    composition,
    dominant,
    dominantConfidence,
    sampleUnclassified: unclassified,
    durationMs: performance.now() - start,
    forbiddenHits,
    verdict,
    reason,
    index: {
      version: index.version,
      k: index.k,
      demo: index.demo,
      build_date: index.build_date,
      note: index.note,
    },
  };
}
