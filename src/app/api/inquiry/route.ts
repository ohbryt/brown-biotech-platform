import { NextResponse } from "next/server";
import {
  buildBriefDraft,
  buildInquirySubject,
  formatInquiryRecord,
  getDeliveryNote,
  getDeliveryTargets,
  normalizeServiceLane,
  triageIntake,
  type IntakeFormPayload,
} from "../../../lib/intake";
import { parseInquiryRequest } from "../../../lib/inquiry";
import { buildAttachmentLines, saveInquiryAttachments, summarizeAttachmentList, type SavedInquiryAttachment } from "../../../lib/upload-store";

const NOTION_INBOX_PAGE_ID = "356f2735-33a4-8147-b448-e5ef03f9157c";
const NOTION_INTAKE_DATABASE_ID = process.env.NOTION_INTAKE_DATABASE_ID || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BROWN_BIOTECH_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || process.env.BROWN_BIOTECH_TELEGRAM_CHAT_ID || "";
const TELEGRAM_THREAD_ID = process.env.TELEGRAM_THREAD_ID || process.env.BROWN_BIOTECH_TELEGRAM_THREAD_ID || "";

function toText(value: unknown): string {
  return String(value || "").trim();
}

function toSelect(value: string, fallback = "Other"): string {
  return toText(value) || fallback;
}

function evidenceSummaryLine(payload: IntakeFormPayload): string {
  return [
    payload.evidenceTypes?.length ? `Types: ${payload.evidenceTypes.join(", ")}` : null,
    payload.evidenceSummary ? `Summary: ${toText(payload.evidenceSummary)}` : null,
    payload.evidenceLinks ? `Links: ${toText(payload.evidenceLinks)}` : null,
    payload.evidenceAttachments?.length ? `Files: ${summarizeAttachmentList(payload.evidenceAttachments)}` : null,
  ]
    .filter(Boolean)
    .join(" | ") || "None provided";
}

function getNotionProperties(payload: IntakeFormPayload, triage: ReturnType<typeof triageIntake>) {
  const lane = normalizeServiceLane(payload.serviceLane || payload.serviceName || payload.projectType);
  const laneValue = lane === "general" ? "business-pipeline" : lane;

  return {
    "Request ID": {
      title: [{ type: "text", text: { content: `BR-${Date.now()}` } }],
    },
    "Received At": { date: { start: new Date().toISOString() } },
    Name: { rich_text: [{ type: "text", text: { content: toText(payload.name) } }] },
    Email: { email: toText(payload.email) || null },
    "Company / Lab": { rich_text: [{ type: "text", text: { content: toText(payload.company) } }] },
    "Service Lane": { select: { name: laneValue } },
    Priority: { select: { name: toSelect(payload.priority || "Medium", "Medium") } },
    "Fit Score": { number: triage.fitScore },
    "Urgency Score": { number: triage.urgencyScore },
    "Approval Required": { checkbox: triage.approvalRequired },
    "Approval Reason": { select: { name: triage.approvalReason || "other" } },
    Route: { select: { name: triage.route } },
    Owner: { rich_text: [{ type: "text", text: { content: triage.owner } }] },
    Status: { select: { name: "New" } },
    "Next Action": { rich_text: [{ type: "text", text: { content: triage.nextAction } }] },
    Timeline: { rich_text: [{ type: "text", text: { content: toText(payload.timeline) } }] },
    "Budget Range": { rich_text: [{ type: "text", text: { content: toText(payload.budgetRange) } }] },
    "Target Outcome": {
      rich_text: [{ type: "text", text: { content: toText(payload.outcome || payload.problem) } }],
    },
    Source: { select: { name: toSelect(payload.source || "website", "website") } },
    Message: { rich_text: [{ type: "text", text: { content: toText(payload.message) } }] },
  };
}

function buildEvidenceBlock(payload: IntakeFormPayload, attachments: SavedInquiryAttachment[]) {
  const blockLines = [
    "## Evidence stack",
    `- Types: ${payload.evidenceTypes?.length ? payload.evidenceTypes.join(", ") : "None provided"}`,
    payload.evidenceSummary ? `- Summary: ${payload.evidenceSummary}` : null,
    payload.evidenceLinks ? `- Links: ${payload.evidenceLinks}` : null,
    attachments.length ? `- Files: ${summarizeAttachmentList(attachments)}` : `- Files: None provided`,
  ].filter(Boolean) as string[];

  return blockLines.join("\n");
}

async function maybeSendToTelegram(payload: IntakeFormPayload, triage: ReturnType<typeof triageIntake>, notionUrl?: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const lines = [
    "Brown Biotech paid brief",
    `Route: ${triage.route}`,
    `Lane: ${normalizeServiceLane(payload.serviceLane || payload.serviceName || payload.projectType)}`,
    `Owner: ${triage.owner}`,
    `Fit: ${triage.fitScore}/100`,
    `Approval: ${triage.approvalRequired ? `Yes (${triage.approvalReason || "other"})` : "No"}`,
    `Name: ${payload.name || ""}`,
    `Email: ${payload.email || ""}`,
    `Company: ${payload.company || ""}`,
    `Timeline: ${payload.timeline || ""}`,
    `Budget: ${payload.budgetRange || ""}`,
    `Evidence: ${evidenceSummaryLine(payload)}`,
    `Next: ${triage.nextAction}`,
    notionUrl ? `Notion: ${notionUrl}` : null,
    "",
    toText(payload.message).slice(0, 900),
  ].filter(Boolean) as string[];

  const params = new URLSearchParams();
  params.set("chat_id", TELEGRAM_CHAT_ID);
  params.set("text", lines.join("\n"));
  params.set("disable_web_page_preview", "true");
  if (TELEGRAM_THREAD_ID) params.set("message_thread_id", TELEGRAM_THREAD_ID);

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
}

async function createNotionDatabasePage(
  payload: IntakeFormPayload,
  triage: ReturnType<typeof triageIntake>,
  requestId: string,
) {
  if (!NOTION_INTAKE_DATABASE_ID) return null;

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_INTAKE_DATABASE_ID },
      properties: {
        ...getNotionProperties(payload, triage),
        "Request ID": { title: [{ type: "text", text: { content: requestId } }] },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Notion database sync failed: ${res.status} ${text}`.trim());
  }

  const data = await res.json().catch(() => null);
  return {
    pageId: data?.id as string | undefined,
    url: data?.url as string | undefined,
  };
}

async function appendNotionBlocks(
  pageId: string,
  payload: IntakeFormPayload,
  triage: ReturnType<typeof triageIntake>,
  requestId: string,
  attachments: SavedInquiryAttachment[],
) {
  const blocks = [
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [
          {
            type: "text",
            text: { content: `${buildInquirySubject(payload)} (${requestId})` },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: { content: formatInquiryRecord(payload, triage, requestId, undefined) },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: { content: buildEvidenceBlock(payload, attachments) },
          },
        ],
      },
    },
  ];

  await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ children: blocks }),
  });
}

async function maybeSendToNotion(payload: IntakeFormPayload, triage: ReturnType<typeof triageIntake>, requestId: string, attachments: SavedInquiryAttachment[]) {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return { notionUrl: undefined, requestId };

  if (NOTION_INTAKE_DATABASE_ID) {
    const page = await createNotionDatabasePage(payload, triage, requestId);
    if (!page?.pageId) return { notionUrl: page?.url, requestId };
    await appendNotionBlocks(page.pageId, payload, triage, requestId, attachments);
    return { notionUrl: page.url, requestId };
  }

  const blocks = [
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [
          {
            type: "text",
            text: { content: `${buildInquirySubject(payload)} (${requestId})` },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: { content: formatInquiryRecord(payload, triage, requestId, undefined) },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: { content: buildEvidenceBlock(payload, attachments) },
          },
        ],
      },
    },
  ];

  await fetch(`https://api.notion.com/v1/blocks/${NOTION_INBOX_PAGE_ID}/children`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ children: blocks }),
  });

  return { notionUrl: undefined, requestId };
}

async function maybeSendToSlack(payload: IntakeFormPayload, triage: ReturnType<typeof triageIntake>, notionUrl?: string) {
  const webhook = process.env.SLACK_INTAKE_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        `*Brown Biotech paid brief*`,
        `Route: ${triage.route}`,
        `Lane: ${normalizeServiceLane(payload.serviceLane || payload.serviceName || payload.projectType)}`,
        `Owner: ${triage.owner}`,
        `Fit: ${triage.fitScore}/100`,
        `Approval: ${triage.approvalRequired ? `Yes (${triage.approvalReason || "other"})` : "No"}`,
        `Next: ${triage.nextAction}`,
        `Name: ${payload.name || ""}`,
        `Email: ${payload.email || ""}`,
        `Company: ${payload.company || ""}`,
        `Timeline: ${payload.timeline || ""}`,
        `Evidence: ${evidenceSummaryLine(payload)}`,
        notionUrl ? `Notion: ${notionUrl}` : null,
        payload.message || "",
      ].filter(Boolean).join("\n"),
    }),
  });
}

async function maybeSendToFormspree(payload: IntakeFormPayload, triage: ReturnType<typeof triageIntake>) {
  const endpoint = process.env.FORMSPREE_INQUIRY_URL;
  if (!endpoint) return;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      timeline: payload.timeline,
      evidenceTypes: payload.evidenceTypes?.join(", ") || "",
      evidenceSummary: payload.evidenceSummary || "",
      evidenceLinks: payload.evidenceLinks || "",
      evidenceAttachments: summarizeAttachmentList(payload.evidenceAttachments),
      message: formatInquiryRecord(payload, triage),
      _subject: buildInquirySubject(payload),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Formspree request failed: ${response.status} ${text}`.trim());
  }
}

export async function POST(request: Request) {
  try {
    const parsed = await parseInquiryRequest(request);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
    }

    const requestId = `BR-${Date.now()}`;
    const attachments = parsed.attachments?.length ? await saveInquiryAttachments(requestId, parsed.attachments) : [];
    const payload: IntakeFormPayload = {
      ...parsed.payload,
      evidenceAttachments: attachments,
    };
    const triage = triageIntake(payload);
    const notion = (await maybeSendToNotion(payload, triage, requestId, attachments)) ?? {
      notionUrl: undefined,
      requestId,
    };
    const deliveryTargets = getDeliveryTargets(Boolean(notion.notionUrl));

    await Promise.allSettled([
      maybeSendToTelegram(payload, triage, notion.notionUrl),
      maybeSendToSlack(payload, triage, notion.notionUrl),
      maybeSendToFormspree(payload, triage),
    ]);

    return NextResponse.json({
      ok: true,
      requestId: notion.requestId,
      triage,
      notionUrl: notion.notionUrl,
      briefDraft: buildBriefDraft(payload, triage),
      deliveryTargets,
      deliveryNote: getDeliveryNote(deliveryTargets),
      attachments,
      message: "Inquiry received and routed.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
