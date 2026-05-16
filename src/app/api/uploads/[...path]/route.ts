import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";

const UPLOAD_ROOT = process.env.BROWN_BIOTECH_UPLOAD_DIR || path.join(process.cwd(), ".brown-biotech-uploads");

function sanitizeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".pdf":
      return "application/pdf";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".csv":
      return "text/csv; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".mp3":
      return "audio/mpeg";
    case ".wav":
      return "audio/wav";
    default:
      return "application/octet-stream";
  }
}

export const runtime = "nodejs";

export async function GET(_request: Request, context: any) {
  const segments = context.params?.path || [];
  if (segments.length < 2) {
    return NextResponse.json({ ok: false, error: "Invalid attachment path." }, { status: 404 });
  }

  const safeSegments = segments.map((segment: string) => sanitizeSegment(segment));
  const filePath = path.resolve(UPLOAD_ROOT, safeSegments[0], ...safeSegments.slice(1));
  const rootPath = path.resolve(UPLOAD_ROOT);
  if (!filePath.startsWith(rootPath)) {
    return NextResponse.json({ ok: false, error: "Invalid attachment path." }, { status: 403 });
  }

  try {
    const file = await fs.readFile(filePath);
    const stats = await fs.stat(filePath);
    const fileName = path.basename(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": getContentType(filePath),
        "Content-Length": String(stats.size),
        "Content-Disposition": `inline; filename="${fileName.replace(/"/g, "")}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Attachment not found." }, { status: 404 });
  }
}
