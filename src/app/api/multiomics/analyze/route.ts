import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { spawn } from "child_process";
import path from "path";

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
 *   - OR JSON: { smiles: ["CCO", ...] } (server writes temp CSV)
 *
 * GEM-DepMap:
 *   - JSON: { cell_line: "A549" } OR { lineage_id: "breast" }
 *   - Multipart: { type: "gem-depmap", cell_line: "A549" } (multipart form)
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let type = "transcriptomics";
    let cellLine: string | null = null;
    let lineageId: string | null = null;
    let smilesList: string[] | null = null;
    let file: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      type = (formData.get("type") as string) || "transcriptomics";
      cellLine = (formData.get("cell_line") as string) || null;
      lineageId = (formData.get("lineage_id") as string) || null;
      file = (formData.get("file") as File | null) || null;
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      type = body.type || "transcriptomics";
      cellLine = body.cell_line || null;
      lineageId = body.lineage_id || null;
      smilesList = body.smiles || null;
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
      return await handleAdmet(file, smilesList);
    }
    if (type === "gem-depmap") {
      return handleGemDepmap({ cell_line: cellLine, lineage_id: lineageId });
    }
    // Default: transcriptomics
    return await handleTranscriptomics(file);
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Transcriptomics (existing pipeline — preserved as-is)
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
    const results: Record<string, any> = {};
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
          error: stderr || "Analysis failed. Check your CSV format.",
        }));
      }
    });

    child.on("error", async (err) => {
      try { await unlink(tmpPath); } catch {}
      resolve(NextResponse.json({ status: "error", error: err.message }));
    });

    setTimeout(() => {
      child.kill();
      resolve(NextResponse.json({ status: "error", error: "Analysis timed out." }));
    }, 55000);
  });
}

// ---------------------------------------------------------------------------
// ADMET
// ---------------------------------------------------------------------------
async function handleAdmet(file: File | null, smilesList: string[] | null) {
  let tmpPath: string | null = null;

  try {
    if (file) {
      if (!file.name.endsWith(".csv")) {
        return NextResponse.json(
          { status: "error", error: "ADMET input must be a .csv file with a 'smiles' column." },
          { status: 400 }
        );
      }
      tmpPath = path.join("/tmp", `admet_${Date.now()}_${file.name}`);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(tmpPath, buffer);
    } else if (smilesList && Array.isArray(smilesList) && smilesList.length > 0) {
      // Server-side: write a temporary CSV from the JSON smiles list
      tmpPath = path.join("/tmp", `admet_${Date.now()}.csv`);
      const csvBody = "smiles,name\n" +
        smilesList.map((s, i) => `${s.replace(/[",\n\r]/g, "")},mol_${i + 1}`).join("\n") + "\n";
      await writeFile(tmpPath, csvBody);
    } else {
      return NextResponse.json(
        { status: "error", error: "ADMET requires either a .csv file upload or a JSON body with 'smiles': [...]" },
        { status: 400 }
      );
    }

    return await runPythonScript(
      path.join(process.cwd(), "scripts/admet_prediction.py"),
      tmpPath,
      "admet"
    );
  } finally {
    if (tmpPath) {
      try { await unlink(tmpPath); } catch {}
    }
  }
}

// ---------------------------------------------------------------------------
// GEM-DepMap (synchronous via stdin JSON)
// ---------------------------------------------------------------------------
function handleGemDepmap(input: { cell_line: string | null; lineage_id: string | null }) {
  return new Promise<Response>((resolve) => {
    let stdout = "";
    let stderr = "";

    const child = spawn("python3", [
      path.join(process.cwd(), "scripts/gem_depmap_vulnerability.py"),
    ], { timeout: 25000 });

    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    child.on("close", (code) => {
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
          error: stderr || "GEM-DepMap analysis failed.",
        }));
      }
    });

    child.on("error", (err) => {
      resolve(NextResponse.json({ status: "error", error: err.message }));
    });

    // Send the JSON input via stdin
    try {
      const inputStr = JSON.stringify(input);
      child.stdin.write(inputStr);
      child.stdin.end();
    } catch (e) {
      // ignore stdin errors; the child will exit with non-zero
    }

    setTimeout(() => {
      try { child.kill(); } catch {}
      resolve(NextResponse.json({ status: "error", error: "GEM-DepMap query timed out." }));
    }, 22000);
  });
}

// ---------------------------------------------------------------------------
// Helper: run a Python script with a single file argument
// ---------------------------------------------------------------------------
function runPythonScript(scriptPath: string, argPath: string, moduleName: string): Promise<Response> {
  return new Promise<Response>((resolve) => {
    let stdout = "";
    let stderr = "";

    const child = spawn("python3", [scriptPath, argPath], { timeout: 55000 });

    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    child.on("close", (code) => {
      if (code === 0 && stdout) {
        try {
          const parsed = JSON.parse(stdout);
          resolve(NextResponse.json({ status: "done", ...parsed }));
        } catch {
          resolve(NextResponse.json({
            status: "done",
            module: moduleName,
            summary: stdout.slice(0, 500),
          }));
        }
      } else {
        resolve(NextResponse.json({
          status: "error",
          error: stderr || `${moduleName} analysis failed.`,
        }));
      }
    });

    child.on("error", (err) => {
      resolve(NextResponse.json({ status: "error", error: err.message }));
    });

    setTimeout(() => {
      child.kill();
      resolve(NextResponse.json({ status: "error", error: `${moduleName} analysis timed out.` }));
    }, 55000);
  });
}
