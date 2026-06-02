import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { spawn } from "child_process";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.name.endsWith(".csv")) {
      return NextResponse.json({ status: "error", error: "Please upload a valid .csv file." }, { status: 400 });
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
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message });
  }
}