import { NextResponse } from "next/server";

type InquiryPayload = {
  source?: string;
  serviceName?: string;
  projectType?: string;
  name?: string;
  email?: string;
  company?: string;
  timeline?: string;
  message?: string;
  subject?: string;
};

const NOTION_INBOX_PAGE_ID = "356f2735-33a4-8147-b448-e5ef03f9157c";

function formatMessage(payload: InquiryPayload) {
  return [
    `Source: ${payload.source || "website"}`,
    `Service: ${payload.serviceName || payload.projectType || "general"}`,
    `Name: ${payload.name || ""}`,
    `Email: ${payload.email || ""}`,
    `Company / Lab: ${payload.company || ""}`,
    `Timeline: ${payload.timeline || ""}`,
    "",
    payload.message || "",
  ].join("\n");
}

async function maybeSendToSlack(payload: InquiryPayload) {
  const webhook = process.env.SLACK_INTAKE_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        `*Brown Biotech inquiry*`,
        `Service: ${payload.serviceName || payload.projectType || "general"}`,
        `Name: ${payload.name || ""}`,
        `Email: ${payload.email || ""}`,
        `Company: ${payload.company || ""}`,
        `Timeline: ${payload.timeline || ""}`,
        payload.message || "",
      ].join("\n"),
    }),
  });
}

async function maybeSendToNotion(payload: InquiryPayload) {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return;

  const blocks = [
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [
          {
            type: "text",
            text: { content: payload.subject || `Brown Biotech inquiry: ${payload.serviceName || payload.projectType || "general"}` },
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
            text: { content: formatMessage(payload) },
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
}

async function maybeSendToFormspree(payload: InquiryPayload) {
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
      message: formatMessage(payload),
      _subject: payload.subject || `Brown Biotech inquiry: ${payload.serviceName || payload.projectType || payload.source || "general"}`,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Formspree request failed: ${response.status} ${text}`.trim());
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const payload: InquiryPayload = contentType.includes("application/json")
      ? await request.json()
      : (Object.fromEntries(await request.formData()) as InquiryPayload);

    await Promise.allSettled([
      maybeSendToNotion(payload),
      maybeSendToSlack(payload),
      maybeSendToFormspree(payload),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
