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

export const ROUTING_LAYERS = [
  {
    title: "Intake",
    summary: "Capture the request, source, and outcome in one record.",
    details: "Keep the initial brief small but specific enough to score fit, urgency, and risk.",
  },
  {
    title: "Triage",
    summary: "Score fit, urgency, and approval risk with shared rules.",
    details: "Use the same logic across the website, browser demo, Telegram, and Notion.",
  },
  {
    title: "Route",
    summary: "Assign one owner, one route, and one next action.",
    details: "Every request ends with a short receipt that can be reused in Notion or chat.",
  },
  {
    title: "Human gate",
    summary: "Hold money, legal, contract, deployment, public-claim, and medical-claim items.",
    details: "High-stakes requests do not move without Dr.OCM review.",
  },
] as const;

export const ROUTE_CARDS = ROUTING_LAYERS;

export const MARKET_SIGNALS = [
  {
    source: "Roche × PathAI (2026-05-07)",
    signal: "Diagnostics value now sits in the workflow, not only the model.",
    implication: "Brown Biotech should sell decision-ready routing and review loops, not generic AI.",
  },
  {
    source: "Nemotron persona team",
    signal: "Small, specialized roles can improve throughput when the handoff is crisp.",
    implication: "The router should output route, owner, approval gate, and next action every time.",
  },
] as const;


export type EvidenceAttachment = {
  name: string;
  type: string;
  size: number;
  url: string;
  path: string;
};

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
  evidenceTypes?: string[];
  evidenceSummary?: string;
  evidenceLinks?: string;
  evidenceAttachments?: EvidenceAttachment[];
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

export type DeliveryTarget = "Notion" | "Telegram" | "Slack" | "Formspree" | "Inbox fallback";

export type IntakeApiResponse = {
  success: boolean;
  requestId: string;
  triage: TriageResult;
  notionUrl?: string;
  briefUrl?: string;
  briefDraft?: string;
  deliveryTargets: DeliveryTarget[];
  deliveryNote: string;
  message: string;
};

export function getDeliveryTargets(hasNotionUrl: boolean): DeliveryTarget[] {
  const targets: DeliveryTarget[] = [];
  if (hasNotionUrl) {
    targets.push("Notion");
  } else {
    targets.push("Inbox fallback");
  }
  if (process.env.TELEGRAM_BOT_TOKEN || process.env.BROWN_BIOTECH_TELEGRAM_BOT_TOKEN) targets.push("Telegram");
  if (process.env.SLACK_INTAKE_WEBHOOK_URL) targets.push("Slack");
  if (process.env.FORMSPREE_INQUIRY_URL) targets.push("Formspree");
  return targets;
}

export function getDeliveryNote(targets: DeliveryTarget[]): string {
  return targets.includes("Notion")
    ? "Authoritative record saved to Notion, with mirrored alerts to Telegram / Slack when configured."
    : "Authoritative record saved to the inbox fallback, with mirrored alerts to Telegram / Slack when configured.";
}

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

function formatAttachmentStack(payload: Partial<IntakeFormPayload>): string {
  const attachments = payload.evidenceAttachments || [];
  if (!attachments.length) return "None provided";
  return attachments
    .map((attachment) => {
      const sizeKb = Math.max(1, Math.round(attachment.size / 1024));
      return `${attachment.name} (${attachment.type || "file"}, ${sizeKb} KB, ${attachment.url})`;
    })
    .join(" | ");
}

function formatEvidenceStack(payload: Partial<IntakeFormPayload>): string {
  const parts: string[] = [];
  if (payload.evidenceTypes?.length) {
    parts.push(`Types: ${payload.evidenceTypes.join(", ")}`);
  }
  if (payload.evidenceSummary) {
    parts.push(`Summary: ${normalizeText(payload.evidenceSummary)}`);
  }
  if (payload.evidenceLinks) {
    parts.push(`Links: ${normalizeText(payload.evidenceLinks)}`);
  }
  if (payload.evidenceAttachments?.length) {
    parts.push(`Files: ${formatAttachmentStack(payload)}`);
  }
  return parts.length ? parts.join(" | ") : "None provided";
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
    `Evidence stack: ${formatEvidenceStack(payload)}`,
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

export function formatInquiryRecord(payload: Partial<IntakeFormPayload>, triage?: Partial<TriageResult>, requestId?: string, notionUrl?: string | null): string {
  const lane = laneLabel(payload.serviceLane || payload.serviceName || payload.projectType);
  const approval = triage?.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : "No";

  return [
    "# Brown Biotech intake record",
    "",
    `- **Request ID:** ${requestId || "Pending"}`,
    `- **Source:** ${payload.source || "website"}`,
    `- **Service lane:** ${lane}`,
    `- **Priority:** ${payload.priority || "Medium"}`,
    `- **Route:** ${triage?.route || "Triage pending"}`,
    `- **Owner:** ${triage?.owner || "Unassigned"}`,
    `- **Fit score:** ${typeof triage?.fitScore === "number" ? `${triage.fitScore}/100` : "Pending"}`,
    `- **Human approval:** ${approval}`,
    `- **Evidence stack:** ${formatEvidenceStack(payload)}`,
    payload.evidenceAttachments?.length ? `- **Files:** ${formatAttachmentStack(payload)}` : null,
    `- **Next action:** ${triage?.nextAction || "Pending"}`,
    notionUrl ? `- **Notion record:** ${notionUrl}` : `- **Notion record:** inbox fallback`,
    "",
    "## Client context",
    `- Name: ${payload.name || ""}`,
    `- Email: ${payload.email || ""}`,
    `- Company / Lab: ${payload.company || ""}`,
    `- Timeline: ${payload.timeline || ""}`,
    `- Budget range: ${payload.budgetRange || ""}`,
    "",
    "## Objective",
    payload.outcome || payload.problem || "",
    "",
    "## Constraints",
    payload.constraints || "",
    "",
    "## Message",
    payload.message || "",
  ].join("\n");
}

export function buildBriefDraft(payload: Partial<IntakeFormPayload>, triage?: Partial<TriageResult>): string {
  const lane = laneLabel(payload.serviceLane || payload.serviceName || payload.projectType);
  const approval = triage?.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : "No";
  const title = `${lane} brief draft`;

  return [
    `# ${title}`,
    "",
    "## Decision question",
    payload.outcome || payload.problem || "What decision does this brief need to support?",
    "",
    "## Client context",
    `- Name: ${payload.name || ""}`,
    `- Company / Lab: ${payload.company || ""}`,
    `- Timeline: ${payload.timeline || ""}`,
    `- Budget range: ${payload.budgetRange || ""}`,
    "",
    "## Working hypothesis",
    lane === "peptide-service"
      ? "Scope the target, assay, and quote path before any deeper engagement."
      : lane === "biostatx"
        ? "Define the smallest analysis that changes a decision."
        : lane === "genox-site"
          ? "Clarify the collaboration or discovery path before expanding scope."
          : "Map the workflow, owner, and next implementation step.",
    "",
    "## Evidence stack",
    formatEvidenceStack(payload),
    payload.evidenceAttachments?.length ? "" : "",
    payload.evidenceAttachments?.length ? "## Files" : "",
    payload.evidenceAttachments?.length ? formatAttachmentStack(payload) : "",
    "",
    "## Evidence / signals",
    payload.message || "- Intake message not provided.",
    "",
    "## Risks / constraints",
    payload.constraints || "- No explicit constraints provided.",
    "",
    "## Recommendation",
    triage?.nextAction || "Triage the request and define the next action.",
    "",
    "## Human approval",
    approval,
  ].join("\n");
}
