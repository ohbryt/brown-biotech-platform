import path from "node:path";
import { promises as fs } from "node:fs";

export type SavedInquiryAttachment = {
  name: string;
  type: string;
  size: number;
  path: string;
  url: string;
};

const UPLOAD_ROOT = process.env.BROWN_BIOTECH_UPLOAD_DIR || path.join(process.cwd(), ".brown-biotech-uploads");
const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.VERCEL_URL || "http://localhost:3000";

function normalizeBaseUrl(value: string): string {
  if (!value) return "http://localhost:3000";
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, "");
  return `https://${value.replace(/\/$/, "")}`;
}

function sanitizeSegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "file";
}

export function getUploadBaseUrl(): string {
  return normalizeBaseUrl(DEFAULT_SITE_URL);
}

function attachmentUrl(requestId: string, fileName: string): string {
  return `${getUploadBaseUrl()}/api/uploads/${encodeURIComponent(requestId)}/${encodeURIComponent(fileName)}`;
}

async function ensureRequestDir(requestId: string): Promise<string> {
  const safeRequestId = sanitizeSegment(requestId || "request");
  const dir = path.join(UPLOAD_ROOT, safeRequestId);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export function summarizeAttachmentList(attachments: SavedInquiryAttachment[] | undefined | null): string {
  if (!attachments?.length) return "None provided";
  return attachments
    .map((attachment) => `${attachment.name} (${attachment.type || "file"}, ${Math.max(1, Math.round(attachment.size / 1024))} KB)`)
    .join(" | ");
}

export async function saveInquiryAttachments(requestId: string, files: File[]): Promise<SavedInquiryAttachment[]> {
  if (!files.length) return [];
  const dir = await ensureRequestDir(requestId);
  const safeRequestId = sanitizeSegment(requestId || "request");
  const saved: SavedInquiryAttachment[] = [];
  const totalSizeLimit = 12 * 1024 * 1024;
  let totalSize = 0;

  for (const [index, file] of files.slice(0, 6).entries()) {
    if (!file || file.size <= 0) continue;
    totalSize += file.size;
    if (totalSize > totalSizeLimit) break;

    const originalName = sanitizeSegment(file.name || `attachment-${index + 1}`);
    const ext = path.extname(originalName);
    const baseName = sanitizeSegment(path.basename(originalName, ext));
    const storageName = `${index + 1}-${Date.now()}-${baseName}${ext}`;
    const fullPath = path.join(dir, storageName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(fullPath, buffer);

    saved.push({
      name: file.name || storageName,
      type: file.type || "application/octet-stream",
      size: file.size,
      path: `${safeRequestId}/${storageName}`,
      url: attachmentUrl(requestId, storageName),
    });
  }

  return saved;
}

export function buildAttachmentLines(attachments: SavedInquiryAttachment[] | undefined | null): string[] {
  if (!attachments?.length) return ["- **Files:** None provided"];
  return attachments.map(
    (attachment) =>
      `- **File:** [${attachment.name}](${attachment.url}) · ${attachment.type || "file"} · ${Math.max(1, Math.round(attachment.size / 1024))} KB`,
  );
}
