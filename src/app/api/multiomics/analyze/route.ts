import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { spawn } from "child_process";
import path from "path";
import { runAdmetBatch, AdmetResult } from "@/lib/admet";
import { queryGemDepmap, getDatabaseInfo, listLineages } from "@/lib/gem-depmap";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/multiomics/analyze
 *
 * Unified multi-omics pipeline dispatcher.
 *
 * Modes (selected via `type` form field):
 *   - "transcriptomics" (default): existing CSV → DEG/Volcano/Pathway/PPI/TF
 *   - "admet": SMILES CSV → ADMET descriptors + Lipinski/Veber/Egan/BBB/hERG/PAINS
 *   - "gem-depmap": cell line JSON → pre-computed DepMap vulnerabilities
 *
 * Transcriptomics:
 *   - Multipart: { file: CSV }
 *
 * ADMET:
 *   - Multipart: { file: CSV with smiles column }
 *   - OR JSON: { smiles: ["CCO", ...] }
 *
 * GEM-DepMap:
 *   - JSON: { cell_line: "A549" } OR { lineage_id: "lung_nsclc" } OR { disease: "lung" }
 *   - Multipart: { type: "gem-depmap", cell_line: "A549" }
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let type = "transcriptomics";
    let cellLine: string | null = null;
    let lineageId: string | null = null;
    let disease: string | null = null;
    let topN: number | null = null;
    let smilesList: string[] | null = null;
    let names: string[] | null = null;
    let file: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      type = (formData.get("type") as string) || "transcriptomics";
      cellLine = (formData.get("cell_line") as string) || null;
      lineageId = (formData.get("lineage_id") as string) || null;
      disease = (formData.get("disease") as string) || null;
      const topNStr = formData.get("top_n") as string;
      if (topNStr) topN = parseInt(topNStr, 10);
      file = (formData.get("file") as File | null) || null;
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      type = body.type || "transcriptomics";
      cellLine = body.cell_line || null;
      lineageId = body.lineage_id || null;
      disease = body.disease || null;
      topN = body.top_n || null;
      smilesList = body.smiles || null;
      names = body.names || null;
    } else {
      // Fallback: try formData
      try {
        const formData = await req.formData();
        type = (formData.get("type") as string) || "transcriptomics";
        cellLine = (formData.get("cell_line") as string) || null;
        lineageId = (formData.get("lineage_id") as string) || null;
        file = (formData.get("file") as File | null) || null;
      } catch {
        type = "transcriptomics";
      }
    }

    // -------- Dispatch by type --------
    if (type === "admet") {
      return await handleAdmet(file, smilesList, names);
    }
    if (type === "gem-depmap") {
      const result = queryGemDepmap({
        cell_line: cellLine,
        lineage_id: lineageId,
        disease: disease,
        top_n: topN || 15,
      });
      // Provide a `matched` + `top_dependencies` legacy view for the multiomics page.
      const first = result.results?.[0];
      const legacy = first
        ? {
            matched: {
              depmap_id: first.depmap_id,
              name: first.cell_line,
              primary_disease: first.primary_disease,
              lineage_id: first.lineage,
              lineage_name: first.lineage,
            },
            top_dependencies: first.top_dependencies,
            top_pathways: first.top_pathways,
            n_druggable_top20: first.n_druggable_top20,
            data_version: "DepMap Public 26Q1 (Chronos)",
            methodology: "Pre-computed gene_effect scores intersected with KEGG metabolic pathways. Chronos < -0.5 = essential.",
            interpretation: `Top essential metabolic genes for ${first.cell_line} (${first.primary_disease}). ${first.n_druggable_top20} of top 20 are druggable. Most-impacted pathway: ${first.top_pathways?.[0]?.pathway ?? "n/a"} (${first.top_pathways?.[0]?.pct ?? 0}% essentiality).`,
          }
        : { matched: null, top_dependencies: [], interpretation: "No cell line matched." };
      return NextResponse.json({ ...result, ...legacy });
    }
    if (type === "gem-depmap-info") {
      return NextResponse.json({
        database: getDatabaseInfo(),
        lineages: listLineages(),
      });
    }
    // Default: transcriptomics
    return await handleTranscriptomics(file);
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Transcriptomics (existing pipeline — preserved as-is, pre-existing Python dep)
// ---------------------------------------------------------------------------
async function handleTranscriptomics(file: File | null) {
  if (!file || !file.name.endsWith(".csv")) {
    return NextResponse.json(
      { status: "error", error: "Please upload a valid .csv file." },
      { status: 400 }
    );
  }

  const tmpPath = path.join("/tmp", `multiomics_${Date.now()}_${file.name}`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(tmpPath, buffer);

  return new Promise<Response>((resolve) => {
    let stdout = "";
    let stderr = "";

    const child = spawn("python3", [
      path.join(process.cwd(), "scripts/multiomics_analysis.py"),
      tmpPath,
    ], { timeout: 55000 });

    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    child.on("close", async (code) => {
      try { await unlink(tmpPath); } catch {}
      if (code === 0 && stdout) {
        try {
          const parsed = JSON.parse(stdout);
          resolve(NextResponse.json({ status: "done", ...parsed }));
        } catch {
          resolve(NextResponse.json({ status: "done", summary: stdout.slice(0, 500) }));
        }
      } else {
        resolve(NextResponse.json({
          status: "error",
          error: stderr || stdout || "Analysis failed. Check your CSV format. (Note: Python runtime required.)",
        }));
      }
    });

    child.on("error", async (err) => {
      try { await unlink(tmpPath); } catch {}
      resolve(NextResponse.json({
        status: "error",
        error: `Python runtime unavailable on server: ${err.message}. The transcriptomics pipeline requires a Python backend. ADMET and GEM-DepMap are now available.`,
      }));
    });

    setTimeout(() => {
      child.kill();
      resolve(NextResponse.json({ status: "error", error: "Analysis timed out." }));
    }, 55000);
  });
}

// ---------------------------------------------------------------------------
// ADMET — TypeScript implementation, no Python required
// ---------------------------------------------------------------------------
async function handleAdmet(file: File | null, smilesList: string[] | null, names: string[] | null) {
  try {
    let smiles: string[] = [];
    let molNames: string[] = [];

    if (file) {
      if (!file.name.endsWith(".csv")) {
        return NextResponse.json(
          { status: "error", error: "ADMET input must be a .csv file with a 'smiles' column." },
          { status: 400 }
        );
      }
      const text = await file.text();
      const parsed = parseCsv(text);
      const smilesIdx = parsed.header.findIndex((h) => /^(smiles|SMILES)$/i.test(h.trim()));
      const nameIdx = parsed.header.findIndex((h) => /^(name|Name)$/i.test(h.trim()));
      if (smilesIdx === -1) {
        return NextResponse.json(
          { status: "error", error: "CSV must contain a 'smiles' column." },
          { status: 400 }
        );
      }
      smiles = parsed.rows.map((r) => r[smilesIdx] || "").filter((s) => s.trim());
      if (nameIdx !== -1) {
        molNames = parsed.rows.map((r) => r[nameIdx] || "");
      }
    } else if (smilesList && Array.isArray(smilesList) && smilesList.length > 0) {
      smiles = smilesList;
      molNames = names || [];
    } else {
      return NextResponse.json(
        { status: "error", error: "ADMET requires either a .csv file upload or a JSON body with 'smiles': [...]" },
        { status: 400 }
      );
    }

    if (smiles.length > 200) {
      return NextResponse.json(
        { status: "error", error: `ADMET batch limited to 200 molecules. Received ${smiles.length}.` },
        { status: 400 }
      );
    }

    const { results, summary } = runAdmetBatch({ smiles, names: molNames });
    // Provide a `molecules` view matching the legacy multiomics page shape.
    // New shape: rules.lipinski.pass / alerts.herg.triggered / risk_score
    // Legacy shape: rules.lipinski_pass / rules.herg_alert / admet_risk
    const molecules = results.map((r, i) => ({
      id: i,
      name: r.name,
      smiles: r.smiles,
      valid: r.valid,
      error: r.error,
      descriptors: r.descriptors,
      rules: {
        lipinski_pass: r.valid && r.rules.lipinski.pass,
        lipinski_violations: r.valid ? r.rules.lipinski.violations.length : 0,
        veber_pass: r.valid && r.rules.veber.pass,
        egan_pass: r.valid && r.rules.egan.pass,
        bbb_likely: r.valid && r.rules.bbb.likely,
        herg_alert: r.valid && r.alerts.herg.triggered,
        pains_alert: r.valid && r.alerts.pains.triggered,
      },
      admet_risk: r.risk_score === "medium" ? "moderate" : r.risk_score,
    }));
    return NextResponse.json({
      status: "done",
      module: "admet",
      summary,
      results,        // canonical new shape
      molecules,      // legacy shape for the multiomics page
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Minimal CSV parser (handles quoted fields with commas + escaped quotes)
// ---------------------------------------------------------------------------
function parseCsv(text: string): { header: string[]; rows: string[][] } {
  const lines: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (cur.length > 0) {
        lines.push(cur);
        cur = "";
      }
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else {
      cur += ch;
    }
  }
  if (cur.length > 0) lines.push(cur);
  if (lines.length === 0) return { header: [], rows: [] };

  const header = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const cells: string[] = [];
    let cell = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (q && line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          q = !q;
        }
      } else if (ch === "," && !q) {
        cells.push(cell);
        cell = "";
      } else {
        cell += ch;
      }
    }
    cells.push(cell);
    return cells;
  });
  return { header, rows };
}
