import { NextResponse } from "next/server";

/**
 * POST /api/interpret
 *
 * Takes a strict-omics pipeline result (QC, species gate, trim) and returns
 * a short, decision-grade natural-language summary.
 *
 * If ANTHROPIC_API_KEY is set, calls Anthropic's Messages API directly with
 * fetch (no SDK dep). Otherwise falls back to a deterministic template
 * summary built from the structured inputs.
 *
 * Body shape: { qc: QcReport, gate: SpeciesGateResult, trim: TrimReport, file: { name, size } }
 */
export const runtime = "nodejs";

interface InterpretBody {
  qc?: {
    totalReadsSampled?: number;
    totalBases?: number;
    readLength?: { min: number; max: number; mean: number; median: number };
    pctHighQualityReads?: number;
    observedDuplication?: number;
    perBaseQuality?: { cycle: number; mean: number; q1: number; q3: number }[];
  };
  gate?: {
    verdict?: "PASS" | "FAIL" | "UNKNOWN";
    reason?: string;
    dominant?: string | null;
    dominantConfidence?: number;
    composition?: Record<string, number>;
    kmersScanned?: number;
    kmersMatched?: number;
    index?: { demo?: boolean; k?: number; build_date?: string; note?: string };
  };
  trim?: {
    inputReads?: number;
    outputReads?: number;
    pctRetained?: number;
    pctBasesRetained?: number;
    pctReadsTrimmedQuality?: number;
    pctReadsTrimmedAdapter?: number;
    pctReadsDropped?: number;
  };
  file?: { name?: string; size?: number };
}

export async function POST(req: Request) {
  let body: InterpretBody = {};
  try {
    body = (await req.json()) as InterpretBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const summary = await callAnthropic(anthropicKey, body);
      return NextResponse.json({ summary, source: "anthropic" });
    } catch (e) {
      // fall through to template
      console.warn("Anthropic call failed, falling back to template:", e);
    }
  }

  const summary = templateSummary(body);
  return NextResponse.json({ summary, source: "template" });
}

// ---------------------------------------------------------------------------
// Anthropic Messages API (no SDK dep)
// ---------------------------------------------------------------------------

async function callAnthropic(apiKey: string, body: InterpretBody): Promise<string> {
  const sys = `You are a senior bioinformatics QC analyst. Given a strict-ingestion pipeline result (QC, species gate, trim), produce a 3-5 sentence decision-ready summary that a research lead can act on. Lead with the verdict. Mention the dominant species, the key QC flags (high-quality reads, duplication, per-base quality drop-off), and the trim outcome. Be specific. Do not invent metrics. Do not overclaim.`;
  const user = `Pipeline result JSON:\n${JSON.stringify(body, null, 2)}`;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 600,
      system: sys,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(`Anthropic ${r.status}: ${text.slice(0, 200)}`);
  }
  const j = (await r.json()) as { content?: { type: string; text: string }[] };
  const block = (j.content ?? []).find((b) => b.type === "text");
  if (!block) throw new Error("No text block in Anthropic response");
  return block.text;
}

// ---------------------------------------------------------------------------
// Deterministic template summary
// ---------------------------------------------------------------------------

function templateSummary(b: InterpretBody): string {
  const verdict = b.gate?.verdict ?? "UNKNOWN";
  const dominant = b.gate?.dominant ?? null;
  const conf = (b.gate?.dominantConfidence ?? 0) * 100;
  const reads = b.qc?.totalReadsSampled ?? 0;
  const pctQ30 = b.qc?.pctHighQualityReads ?? 0;
  const dup = b.qc?.observedDuplication ?? 0;
  const lenMean = b.qc?.readLength?.mean ?? 0;
  const trimRetained = b.trim?.pctRetained ?? 0;
  const trimAdapter = b.trim?.pctReadsTrimmedAdapter ?? 0;
  const trimQual = b.trim?.pctReadsTrimmedQuality ?? 0;
  const fileName = b.file?.name ?? "uploaded sample";
  const isDemo = b.gate?.index?.demo ?? true;

  // Identify lowest-quality cycle
  let weakestCycle: { cycle: number; mean: number } | null = null;
  for (const c of b.qc?.perBaseQuality ?? []) {
    if (c.mean > 0 && (!weakestCycle || c.mean < weakestCycle.mean)) {
      weakestCycle = { cycle: c.cycle, mean: c.mean };
    }
  }

  const lines: string[] = [];
  lines.push(
    `**Verdict: ${verdict}.** The pipeline ingested ${reads.toLocaleString()} reads from \`${fileName}\` (mean length ${lenMean.toFixed(0)} bp, ${pctQ30.toFixed(1)}% reads ≥ Q30, ${dup.toFixed(1)}% observed duplication).`
  );

  if (verdict === "PASS" && dominant) {
    lines.push(
      `The species gate classified the sample as ${dominant} at ${conf.toFixed(1)}% confidence; no forbidden species crossed the 5% threshold.`
    );
  } else if (verdict === "FAIL") {
    lines.push(
      `The species gate blocked this sample${dominant ? ` — dominant was ${dominant} (${conf.toFixed(1)}%)` : ""}. ${b.gate?.reason ?? "See the gate panel for the rejection reason."}`
    );
  } else {
    lines.push(
      `The species gate could not reach a confident verdict (dominant ${dominant ?? "—"} at ${conf.toFixed(1)}%). Treat as needs-review until a real Kraken2 reference pass is run.`
    );
  }

  if (trimRetained > 0) {
    lines.push(
      `Trim retained ${trimRetained.toFixed(1)}% of reads (${trimQual.toFixed(1)}% quality-trimmed, ${trimAdapter.toFixed(1)}% adapter-trimmed).`
    );
  }
  if (weakestCycle && weakestCycle.mean < 25 && weakestCycle.cycle > 30) {
    lines.push(
      `Per-base quality drops below Q${weakestCycle.mean.toFixed(0)} around cycle ${weakestCycle.cycle}; consider stricter 3' trimming in the production run.`
    );
  }
  if (isDemo) {
    lines.push(
      `Note: the species index shipped with this workbench is a small demo reference. Production runs use a full Kraken2 database via the Brown Biotech Nextflow backend.`
    );
  }
  return lines.join(" ");
}
