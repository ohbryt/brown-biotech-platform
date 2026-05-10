export const SERVICE_LANES = [
  "peptide-service",
  "biostatx",
  "genox-site",
  "business-pipeline",
] as const;

export type ServiceLane = (typeof SERVICE_LANES)[number];

export const PRIORITIES = ["High", "Medium", "Low"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const ROUTES = [
  "Fit",
  "Needs Scope",
  "Needs Human Approval",
  "Escalate",
  "Not a Fit",
] as const;
export type Route = (typeof ROUTES)[number];

export const APPROVAL_REASONS = [
  "money",
  "legal",
  "contract",
  "deployment",
  "medical-claims",
  "public-announcement",
  "other",
] as const;
export type ApprovalReason = (typeof APPROVAL_REASONS)[number];

export const STATUS_FLOW = [
  "Received",
  "Saved",
  "Triage",
  "Owner Assigned",
  "Next Action Defined",
  "In Progress",
  "Delivered",
] as const;

export type IntakeSource = "website" | "telegram" | "email" | "referral" | "manual" | "service-page" | "main-contact";

export type IntakeFormPayload = {
  name: string;
  email: string;
  company: string;
  serviceLane?: ServiceLane | "general";
  serviceName?: string;
  projectType?: string;
  priority?: Priority;
  problem?: string;
  outcome?: string;
  timeline?: string;
  budgetRange?: string;
  humanApprovalRequired?: boolean;
  approvalReason?: ApprovalReason | "";
  constraints?: string;
  message: string;
  source: IntakeSource;
  subject?: string;
};

export type TriageResult = {
  fitScore: number;
  urgencyScore: number;
  approvalRequired: boolean;
  approvalReason: ApprovalReason | null;
  route: Route;
  owner: string;
  nextAction: string;
  statusFlow: readonly string[];
};

export type IntakeApiResponse = {
  success: boolean;
  requestId: string;
  triage: TriageResult;
  notionUrl?: string;
  briefUrl?: string;
  message: string;
};

const SERVICE_KEYWORDS: Record<ServiceLane, string[]> = {
  "peptide-service": ["peptide", "peptides", "sequence", "assay", "synthesis", "quote", "consult"],
  biostatx: ["statistics", "statistical", "analysis", "dataset", "report", "biostat", "power", "cvr", "cvr"],
  "genox-site": ["genomics", "discovery", "collaboration", "partner", "screening", "omics", "sequence data"],
  "business-pipeline": ["automation", "workflow", "ops", "operations", "system", "intake", "routing", "notion"],
};

const APPROVAL_KEYWORDS = [
  "money",
  "spend",
  "budget",
  "legal",
  "contract",
  "deployment",
  "launch",
  "medical",
  "clinical",
  "claims",
  "public announcement",
  "public-announcement",
  "human approval",
  "승인",
  "계약",
  "배포",
  "출시",
  "의료",
  "임상",
  "주장",
  "발표",
  "예산",
  "비용",
];

function normalizeText(value?: string | null): string {
  return String(value || "").trim();
}

export function normalizeServiceLane(value?: string | null): ServiceLane | "general" {
  const text = normalizeText(value).toLowerCase();
  if (!text) return "general";
  if ((SERVICE_LANES as readonly string[]).includes(text)) return text as ServiceLane;
  if (["general", "other", "general inquiry", "general / ops", "general ops", "ops"].includes(text)) {
    return "business-pipeline";
  }
  return "general";
}

export function getCanonicalServiceLane(value?: string | null): ServiceLane | "general" {
  return normalizeServiceLane(value);
}

export function laneLabel(lane?: string | null): string {
  const normalized = normalizeServiceLane(lane);
  return normalized === "general" ? "business-pipeline" : normalized;
}

export function inferApproval(payload: Partial<IntakeFormPayload>): { required: boolean; reason: ApprovalReason | null } {
  const approvalFlag = payload.humanApprovalRequired === true;
  const approvalReason = typeof payload.approvalReason === "string" && payload.approvalReason ? payload.approvalReason : null;
  const haystack = [
    payload.subject,
    payload.serviceLane,
    payload.serviceName,
    payload.projectType,
    payload.problem,
    payload.outcome,
    payload.timeline,
    payload.budgetRange,
    payload.constraints,
    payload.message,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const keywordHit = APPROVAL_KEYWORDS.some((keyword) => haystack.includes(keyword));
  if (approvalFlag || keywordHit) {
    return { required: true, reason: approvalReason || (keywordHit ? "other" : null) };
  }
  return { required: false, reason: approvalReason };
}

function scoreFit(lane: ServiceLane | "general", payload: Partial<IntakeFormPayload>): number {
  const text = [payload.problem, payload.outcome, payload.message, payload.constraints].filter(Boolean).join(" ").toLowerCase();
  if (lane === "general") return 48;
  const keywords = SERVICE_KEYWORDS[lane];
  const keywordMatches = keywords.reduce((count, keyword) => count + (text.includes(keyword) ? 1 : 0), 0);
  const base = lane === "business-pipeline" ? 78 : lane === "peptide-service" ? 88 : 82;
  return Math.max(30, Math.min(100, base + keywordMatches * 4));
}

function scoreUrgency(priority?: Priority, timeline?: string): number {
  const normalized = normalizeText(timeline).toLowerCase();
  if (priority === "High") return normalized.includes("asap") ? 95 : 85;
  if (priority === "Low") return 35;
  if (normalized.includes("asap") || normalized.includes("urgent")) return 80;
  if (normalized.includes("this month") || normalized.includes("week")) return 60;
  return 50;
}

function getOwner(lane: ServiceLane | "general", route: Route): string {
  if (route === "Needs Human Approval") return "Dr.OCM";
  switch (lane) {
    case "peptide-service":
      return "peptide-service owner";
    case "biostatx":
      return "biostatx owner";
    case "genox-site":
      return "genox-site owner";
    case "business-pipeline":
    default:
      return "operations owner";
  }
}

function getNextAction(lane: ServiceLane | "general", route: Route, approvalRequired: boolean): string {
  if (approvalRequired || route === "Needs Human Approval") {
    return "Hold for human review before any client-facing response.";
  }

  switch (lane) {
    case "peptide-service":
      return "Confirm target, scope, and quote path for the peptide brief.";
    case "biostatx":
      return "Request the dataset and define the decision this analysis must support.";
    case "genox-site":
      return "Clarify the research direction and collaboration goal.";
    case "business-pipeline":
    default:
      return "Map the workflow, owner, and next implementation step.";
  }
}

function getRoute(fitScore: number, approvalRequired: boolean): Route {
  if (approvalRequired) return "Needs Human Approval";
  if (fitScore >= 75) return "Fit";
  if (fitScore >= 50) return "Needs Scope";
  if (fitScore >= 35) return "Escalate";
  return "Not a Fit";
}

export function triageIntake(payload: Partial<IntakeFormPayload>): TriageResult {
  const lane = normalizeServiceLane(payload.serviceLane || payload.serviceName || payload.projectType);
  const approval = inferApproval(payload);
  const fitScore = scoreFit(lane, payload);
  const urgencyScore = scoreUrgency(payload.priority, payload.timeline);
  const route = getRoute(fitScore, approval.required);
  const owner = getOwner(lane, route);
  const nextAction = getNextAction(lane, route, approval.required);

  return {
    fitScore,
    urgencyScore,
    approvalRequired: approval.required,
    approvalReason: approval.reason,
    route,
    owner,
    nextAction,
    statusFlow: STATUS_FLOW,
  };
}

export function buildInquirySubject(payload: Partial<IntakeFormPayload>): string {
  const lane = laneLabel(payload.serviceLane || payload.serviceName || payload.projectType);
  return payload.subject || `Brown Biotech paid brief: ${lane}`;
}

export function formatInquiryMessage(payload: Partial<IntakeFormPayload>, triage?: Partial<TriageResult>): string {
  const lane = laneLabel(payload.serviceLane || payload.serviceName || payload.projectType);
  const fitScore = typeof triage?.fitScore === "number" ? triage.fitScore : "";
  const route = triage?.route || "";
  const owner = triage?.owner || "";
  const approval = triage?.approvalRequired ? `Yes (${triage.approvalReason || "other"})` : "No";

  return [
    `Source: ${payload.source || "website"}`,
    `Service: ${lane}`,
    `Priority: ${payload.priority || "Medium"}`,
    `Fit score: ${fitScore}`,
    `Route: ${route}`,
    `Owner: ${owner}`,
    `Human approval required: ${approval}`,
    `Name: ${payload.name || ""}`,
    `Email: ${payload.email || ""}`,
    `Company / Lab: ${payload.company || ""}`,
    `Timeline: ${payload.timeline || ""}`,
    `Budget range: ${payload.budgetRange || ""}`,
    `Target outcome: ${payload.outcome || payload.problem || ""}`,
    `Constraints: ${payload.constraints || ""}`,
    "",
    payload.message || "",
  ].join("\n");
}
