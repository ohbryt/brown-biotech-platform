// @ts-ignore - explicit .ts extension is needed for runtime strip-types tests
import { APPROVAL_REASONS, PRIORITIES, normalizeServiceLane, type IntakeFormPayload } from "./intake.ts";

export type InquiryValidationError = {
  ok: false;
  status: 400 | 413;
  error: string;
};

export type NormalizedInquiryPayloadResult =
  | { ok: true; payload: IntakeFormPayload; attachments: File[] }
  | InquiryValidationError;

const ALLOWED_SOURCES: readonly IntakeFormPayload["source"][] = [
  "website",
  "telegram",
  "email",
  "referral",
  "manual",
  "service-page",
  "main-contact",
];

const MAX_REQUEST_BYTES = 20_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 180;
const MAX_TINY_TEXT_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 8_000;

function toText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value).trim();
  if (value instanceof Date) return value.toISOString();
  if (typeof File !== "undefined" && value instanceof File) return value.name.trim();
  return String(value ?? "").trim();
}

function withLimit(value: unknown, maxLength: number, fieldName: string): string | InquiryValidationError {
  const text = toText(value);
  if (text.length > maxLength) {
    return {
      ok: false,
      status: 413,
      error: `${fieldName} is too long.`,
    };
  }
  return text;
}

function parseBoolean(value: unknown): boolean {
  if (value === true || value === false) return value;
  const text = toText(value).toLowerCase();
  return ["true", "yes", "1", "on"].includes(text);
}

function normalizeSource(value: unknown): IntakeFormPayload["source"] {
  const text = toText(value).toLowerCase();
  return (ALLOWED_SOURCES as readonly string[]).includes(text) ? (text as IntakeFormPayload["source"]) : "website";
}

function normalizePriority(value: unknown): IntakeFormPayload["priority"] {
  const text = toText(value);
  return (PRIORITIES as readonly string[]).includes(text) ? (text as IntakeFormPayload["priority"]) : "Medium";
}

function normalizeApprovalReason(value: unknown, approvalRequired: boolean): IntakeFormPayload["approvalReason"] {
  const text = toText(value).toLowerCase();
  if ((APPROVAL_REASONS as readonly string[]).includes(text)) return text as IntakeFormPayload["approvalReason"];
  return approvalRequired ? "other" : "";
}

function parseEvidenceTypes(value: unknown): string[] {
  const raw = Array.isArray(value) ? value : toText(value).split(/[,\n|]/g);
  return Array.from(
    new Set(
      raw
        .map((item) => toText(item).toLowerCase())
        .map((item) => item.replace(/\s+/g, " ").trim())
        .filter(Boolean),
    ),
  ).slice(0, 8);
}

function normalizeInquiryObject(raw: Record<string, unknown>): NormalizedInquiryPayloadResult {
  const nameResult = withLimit(raw.name, MAX_NAME_LENGTH, "name");
  if (typeof nameResult !== "string") return nameResult;
  if (!nameResult) return { ok: false, status: 400, error: "name is required." };

  const emailResult = withLimit(raw.email, MAX_EMAIL_LENGTH, "email");
  if (typeof emailResult !== "string") return emailResult;
  if (!emailResult) return { ok: false, status: 400, error: "email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailResult)) {
    return { ok: false, status: 400, error: "email must be a valid email address." };
  }

  const messageResult = withLimit(raw.message, MAX_MESSAGE_LENGTH, "message");
  if (typeof messageResult !== "string") return messageResult;
  if (!messageResult) return { ok: false, status: 400, error: "message is required." };

  const companyResult = withLimit(raw.company, MAX_COMPANY_LENGTH, "company");
  if (typeof companyResult !== "string") return companyResult;
  const timelineResult = withLimit(raw.timeline, MAX_TINY_TEXT_LENGTH, "timeline");
  if (typeof timelineResult !== "string") return timelineResult;
  const budgetRangeResult = withLimit(raw.budgetRange, MAX_TINY_TEXT_LENGTH, "budgetRange");
  if (typeof budgetRangeResult !== "string") return budgetRangeResult;
  const problemResult = withLimit(raw.problem, MAX_MESSAGE_LENGTH, "problem");
  if (typeof problemResult !== "string") return problemResult;
  const outcomeResult = withLimit(raw.outcome, MAX_MESSAGE_LENGTH, "outcome");
  if (typeof outcomeResult !== "string") return outcomeResult;
  const constraintsResult = withLimit(raw.constraints, MAX_MESSAGE_LENGTH, "constraints");
  if (typeof constraintsResult !== "string") return constraintsResult;
  const evidenceSummaryResult = withLimit(raw.evidenceSummary, MAX_MESSAGE_LENGTH, "evidenceSummary");
  if (typeof evidenceSummaryResult !== "string") return evidenceSummaryResult;
  const evidenceLinksResult = withLimit(raw.evidenceLinks, MAX_MESSAGE_LENGTH, "evidenceLinks");
  if (typeof evidenceLinksResult !== "string") return evidenceLinksResult;
  const subjectResult = withLimit(raw.subject, MAX_TINY_TEXT_LENGTH, "subject");
  if (typeof subjectResult !== "string") return subjectResult;
  const serviceLane = normalizeServiceLane(toText(raw.serviceLane ?? raw.serviceName ?? raw.projectType));
  const priority = normalizePriority(raw.priority);
  const humanApprovalRequired = parseBoolean(raw.humanApprovalRequired);
  const approvalReason = normalizeApprovalReason(raw.approvalReason, humanApprovalRequired);
  const source = normalizeSource(raw.source);

  const payload: IntakeFormPayload = {
    name: nameResult,
    email: emailResult,
    company: companyResult,
    serviceLane,
    serviceName: toText(raw.serviceName) || undefined,
    projectType: toText(raw.projectType) || undefined,
    priority,
    problem: problemResult || undefined,
    outcome: outcomeResult || undefined,
    timeline: timelineResult || undefined,
    budgetRange: budgetRangeResult || undefined,
    humanApprovalRequired,
    approvalReason,
    constraints: constraintsResult || undefined,
    evidenceTypes: parseEvidenceTypes(raw.evidenceTypes),
    evidenceSummary: evidenceSummaryResult || undefined,
    evidenceLinks: evidenceLinksResult || undefined,
    message: messageResult,
    source,
    subject: subjectResult || undefined,
  };

  const totalBytes = Buffer.byteLength(JSON.stringify(payload), "utf8");
  if (totalBytes > MAX_REQUEST_BYTES) {
    return {
      ok: false,
      status: 413,
      error: "inquiry payload is too large.",
    };
  }

  return { ok: true, payload, attachments: [] };
}

export function normalizeInquiryInput(raw: unknown): NormalizedInquiryPayloadResult {
  if (!raw || typeof raw !== "object") {
    return {
      ok: false,
      status: 400,
      error: "request payload must be an object.",
    };
  }

  return normalizeInquiryObject(raw as Record<string, unknown>);
}

export async function parseInquiryRequest(request: Request): Promise<NormalizedInquiryPayloadResult> {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return { ok: false, status: 413, error: "inquiry payload is too large." };
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    let rawPayload: unknown;
    const attachments: File[] = [];

    if (contentType.includes("application/json")) {
      rawPayload = await request.json();
    } else {
      const formData = await request.formData();
      const rawObject: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        if (typeof File !== "undefined" && value instanceof File) {
          if (key === "evidenceFiles") {
            attachments.push(value);
          } else if (Object.prototype.hasOwnProperty.call(rawObject, key)) {
            const current = rawObject[key];
            rawObject[key] = Array.isArray(current) ? [...current, value.name] : [current, value.name];
          } else {
            rawObject[key] = value.name;
          }
        } else if (Object.prototype.hasOwnProperty.call(rawObject, key)) {
          const current = rawObject[key];
          rawObject[key] = Array.isArray(current) ? [...current, value] : [current, value];
        } else {
          rawObject[key] = value;
        }
      }
      rawPayload = rawObject;
    }

    const normalized = normalizeInquiryInput(rawPayload);
    return normalized.ok ? { ...normalized, attachments } : normalized;
  } catch {
    return {
      ok: false,
      status: 400,
      error: "Unable to parse inquiry payload.",
    };
  }
}