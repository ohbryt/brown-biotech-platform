/**
 * Demo FASTQ generator — produces a small synthetic FASTQ in the browser.
 *
 * Used by the workbench's "Try with sample data" button so a visitor can
 * see the full pipeline run without needing to upload a real file.
 *
 * The synthetic reads contain:
 *   - 60% reads with motifs from the "demo_brett" species signature
 *   - 20% reads with motifs from the "human" demo signature
 *   - 20% random reads (will classify as "unknown")
 *
 * Quality is Phred+33, lengths 50-100 bp, no Ns.
 */
export function generateDemoFastqText(opts: { n?: number; seed?: number } = {}): string {
  const n = opts.n ?? 4000;
  const seed = opts.seed ?? 42;
  // simple LCG for determinism
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };

  // Demo species signatures (must match build-kmer-index.ts)
  const SIGNATURES = {
    demo_brett: "GATCCTGCAAGCGCATCGAGCTCGAGCTCGAGCTCGAGCTCGAGCTCGAG",
    human: "GATCACAGGTCTATCACCCTATTAACCACTCACGGGAGCTCTCCATGCATTTGGTATTTTCGTCTGGGGGGTGTGCACGCGATAGCATTGCGAGACGCTGGAGCCGGAGC",
  };

  // Illumina-like qualities: Q30 at start, Q20 at end
  const qualCurve = (len: number) => {
    const chars: string[] = [];
    for (let i = 0; i < len; i++) {
      const t = i / Math.max(1, len - 1);
      const q = Math.max(15, Math.floor(35 - t * 18));
      chars.push(String.fromCharCode(q + 33));
    }
    return chars.join("");
  };

  const BASES = "ACGT";
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const r = rand();
    let seedSeq: string;
    if (r < 0.6) seedSeq = SIGNATURES.demo_brett;
    else if (r < 0.8) seedSeq = SIGNATURES.human;
    else seedSeq = "";

    const len = 50 + Math.floor(rand() * 50);
    let seq = "";
    while (seq.length < len) {
      if (seedSeq && rand() < 0.7) {
        const start = Math.floor(rand() * Math.max(1, seedSeq.length - 25));
        seq += seedSeq.slice(start, start + 25);
      } else {
        seq += BASES[Math.floor(rand() * 4)];
      }
    }
    seq = seq.slice(0, len);

    const id = `DEMO_${i.toString().padStart(6, "0")}`;
    lines.push(`@${id}`);
    lines.push(seq);
    lines.push("+");
    lines.push(qualCurve(len));
  }
  return lines.join("\n") + "\n";
}

export function demoFastqFile(): File {
  const text = generateDemoFastqText();
  return new File([text], "demo-sample.fastq", { type: "text/plain" });
}
