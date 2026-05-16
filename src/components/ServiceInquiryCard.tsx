"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Mail, MessageSquareText, UserRound, Building2, Clock3, CheckCircle2, Loader2, Route, UserCog, ShieldCheck, Copy, Download } from "lucide-react";
import { type IntakeApiResponse, type IntakeFormPayload, triageIntake, buildBriefDraft } from "@/lib/intake";

type ServiceInquiryCardProps = {
  serviceName: string;
  title: string;
  description: string;
  prompts: string[];
};

export default function ServiceInquiryCard({
  serviceName,
  title,
  description,
  prompts,
}: ServiceInquiryCardProps) {
  const subject = useMemo(() => `Brown Biotech paid brief: ${serviceName}`, [serviceName]);

  const buildReceiptMarkdown = (
    requestIdValue: string,
    triageValue: IntakeApiResponse["triage"],
    notionUrlValue: string | null,
    evidenceStackValue: string,
    briefDraftValue?: string,
    deliveryTargetsValue?: string[],
    deliveryNoteValue?: string,
    attachmentsValue?: Array<{ name: string; type: string; size: number; url: string }>,
  ) => {
    const lines = [
      `# Brown Biotech brief receipt`,
      ``,
      `- **Request ID:** ${requestIdValue}`,
      `- **Service lane:** ${serviceName}`,
      `- **Route:** ${triageValue.route}`,
      `- **Owner:** ${triageValue.owner}`,
      `- **Fit score:** ${triageValue.fitScore}/100`,
      `- **Human approval:** ${triageValue.approvalRequired ? `Yes${triageValue.approvalReason ? ` · ${triageValue.approvalReason}` : ""}` : "No"}`,
      `- **Evidence stack:** ${evidenceStackValue}`,
      attachmentsValue?.length ? `- **Files:** ${attachmentsValue.map((attachment) => `${attachment.name} (${attachment.type || "file"}, ${Math.max(1, Math.round(attachment.size / 1024))} KB, ${attachment.url})`).join(" | ")}` : null,
      `- **Next action:** ${triageValue.nextAction}`,
      deliveryTargetsValue?.length ? `- **Delivery targets:** ${deliveryTargetsValue.join(", ")}` : null,
      deliveryNoteValue ? `- **Delivery note:** ${deliveryNoteValue}` : null,
      `- **Delivery path:** ${triageValue.approvalRequired ? "Human gate first" : "Auto-route to Notion + message mirrors"}`,
      notionUrlValue ? `- **Notion record:** ${notionUrlValue}` : `- **Notion record:** saved to intake inbox`,
      ``,
      `## What this brief can be used for`,
      `- internal alignment`,
      `- scope confirmation`,
      `- paid brief scoping`,
      `- owner assignment`,
    ];
    if (briefDraftValue) {
      lines.push("", "## Auto brief draft", briefDraftValue);
    }
    return lines.join("\n");
  };

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [triage, setTriage] = useState<IntakeApiResponse["triage"] | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [notionUrl, setNotionUrl] = useState<string | null>(null);
  const [receiptMarkdown, setReceiptMarkdown] = useState<string | null>(null);

  const copyReceipt = async () => {
    if (!receiptMarkdown || typeof navigator === "undefined") return;
    await navigator.clipboard.writeText(receiptMarkdown);
  };

  const downloadReceipt = () => {
    if (!receiptMarkdown || typeof document === "undefined") return;
    const blob = new Blob([receiptMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${requestId || serviceName}-brief-receipt.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRequestId(null);
    setNotionUrl(null);
    setReceiptMarkdown(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const evidenceTypes = Array.from(data.getAll("evidenceTypes")).map((value) => String(value).trim()).filter(Boolean);
    const evidenceSummary = String(data.get("evidenceSummary") || "").trim();
    const evidenceLinks = String(data.get("evidenceLinks") || "").trim();
    const evidenceFiles = Array.from(data.getAll("evidenceFiles")).filter((value): value is File => typeof File !== "undefined" && value instanceof File && value.size > 0);
    const evidenceStack = [
      evidenceTypes.length ? `types: ${evidenceTypes.join(", ")}` : null,
      evidenceSummary ? `summary: ${evidenceSummary}` : null,
      evidenceLinks ? `links: ${evidenceLinks}` : null,
      evidenceFiles.length ? `files: ${evidenceFiles.map((file) => file.name).join(", ")}` : null,
    ].filter(Boolean).join(" | ") || "none provided";

    const payload: IntakeFormPayload = {
      source: "service-page",
      serviceName,
      serviceLane: serviceName as IntakeFormPayload["serviceLane"],
      priority: "Medium",
      problem: title,
      outcome: description,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      timeline: String(data.get("timeline") || ""),
      constraints: String(data.get("constraints") || ""),
      evidenceTypes,
      evidenceSummary,
      evidenceLinks,
      message: String(data.get("message") || ""),
      subject,
    };

    try {
      data.set("source", payload.source);
      data.set("serviceName", payload.serviceName || "");
      data.set("serviceLane", payload.serviceLane || "");
      data.set("priority", payload.priority || "Medium");
      data.set("problem", payload.problem || "");
      data.set("outcome", payload.outcome || "");
      data.set("name", payload.name);
      data.set("email", payload.email);
      data.set("company", payload.company);
      data.set("timeline", payload.timeline || "");
      data.set("constraints", payload.constraints || "");
      data.set("evidenceSummary", evidenceSummary);
      data.set("evidenceLinks", evidenceLinks);
      data.set("message", payload.message);
      data.set("subject", subject);
      evidenceTypes.forEach((item) => data.append("evidenceTypes", item));

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: data,
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseBody?.error || "Unable to submit inquiry.");
      }

      setTriage(responseBody?.triage ?? null);
      setRequestId(responseBody?.requestId ?? null);
      setNotionUrl(responseBody?.notionUrl ?? null);
      setReceiptMarkdown(
        buildReceiptMarkdown(
          responseBody?.requestId ?? "Pending save",
          responseBody?.triage ?? triageIntake(payload),
          responseBody?.notionUrl ?? null,
          evidenceStack,
          responseBody?.briefDraft ?? buildBriefDraft(payload, responseBody?.triage ?? triageIntake(payload)),
          responseBody?.deliveryTargets,
          responseBody?.deliveryNote,
          responseBody?.attachments,
        ),
      );
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="brief" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10">
          <span className="kicker">Route preview</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">Request a Paid Brief</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">{description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {prompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-border bg-white/70 px-4 py-4 text-sm text-text-muted shadow-sm">
                {prompt}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2">
              <Clock3 className="h-4 w-4 text-cta" />
              24h response target
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2">
              <MessageSquareText className="h-4 w-4 text-cta" />
              Short intake, clear next step
            </span>
          </div>
          <p className="mt-4 text-sm text-text-muted">Submissions are routed into the Brown Biotech Notion intake hub.</p>
        </div>
        <div className="premium-panel rounded-[2rem] p-8 lg:p-10 bg-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_40%)]" />
          <div className="relative">
            <span className="kicker text-amber-100/80">Triage preview</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Send a concise project brief</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              Share just enough context to route the request well. You&apos;ll see the route, owner, approval gate, and next action after submit.
            </p>

            {submitted ? (
              <div className="mt-8 space-y-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                <div className="flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-semibold">Brief received</p>
                </div>
                <p className="text-sm leading-7 text-gray-200">
                  Thanks — we&apos;ve routed this and will reply with the next step. If it needs human approval, we&apos;ll surface that before anything proceeds.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Request ID</p>
                    <p className="mt-1 font-semibold text-white">{requestId || "Pending save"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Notion record</p>
                    {notionUrl ? (
                      <a href={notionUrl} target="_blank" rel="noreferrer" className="mt-1 block font-semibold text-white underline decoration-emerald-300 decoration-2 underline-offset-4">
                        Open saved record
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-white">Saved to inbox fallback or pending</p>
                    )}
                  </div>
                </div>
                {triage && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Route</p>
                        <p className="mt-1 font-semibold text-white">{triage.route}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Owner</p>
                        <p className="mt-1 font-semibold text-white">{triage.owner}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Fit score</p>
                        <p className="mt-1 font-semibold text-white">{triage.fitScore}/100</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Human approval</p>
                        <p className="mt-1 font-semibold text-white">
                          {triage.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Next action</p>
                      <p className="mt-2 leading-7 text-gray-100">{triage.nextAction}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-400">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <Route className="h-3 w-3" /> Triage
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <UserCog className="h-3 w-3" /> Owner assigned
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <ShieldCheck className="h-3 w-3" /> Human gate respected
                      </span>
                    </div>
                  </div>
                )}
                {receiptMarkdown && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Shareable brief receipt</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={copyReceipt}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                        >
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </button>
                        <button
                          type="button"
                          onClick={downloadReceipt}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </button>
                      </div>
                    </div>
                    <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-gray-100">
{receiptMarkdown}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <UserRound className="h-4 w-4 text-cta" /> Name
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <Mail className="h-4 w-4 text-cta" /> Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <Building2 className="h-4 w-4 text-cta" /> Company / Lab
                  </span>
                  <input
                    name="company"
                    placeholder="Organization or lab name"
                    className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                  />
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">Evidence stack</p>
                  <p className="mt-1 text-sm text-gray-300">Upload or describe the artifact(s) that support the brief.</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {[
                      ["pdf", "PDF / report"],
                      ["image", "Screenshot / image"],
                      ["slide", "Slide / deck"],
                      ["audio", "Audio note"],
                      ["link", "Link / reference"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100">
                        <input type="checkbox" name="evidenceTypes" value={value} className="h-4 w-4 rounded border-white/20 bg-transparent text-cta focus:ring-cta/25" />
                        {label}
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-white">Evidence summary</span>
                    <textarea
                      name="evidenceSummary"
                      rows={3}
                      placeholder="What does the file or artifact show?"
                      className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-white">Evidence links</span>
                    <input
                      name="evidenceLinks"
                      placeholder="Shared drive, Notion, paper, or dataset link"
                      className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-white">Attach files</span>
                    <input
                      type="file"
                      name="evidenceFiles"
                      multiple
                      className="w-full rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-3 text-sm text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white file:font-semibold hover:border-white/30"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.csv,.tsv,.json,.mp3,.wav,.ppt,.pptx,.doc,.docx"
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Files are saved to a shareable Brown Biotech upload path and linked in the receipt and Notion record.
                    </p>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <MessageSquareText className="h-4 w-4 text-cta" /> Timeline
                  </span>
                  <input
                    name="timeline"
                    placeholder="e.g. this week / this month / exploratory"
                    className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <MessageSquareText className="h-4 w-4 text-cta" /> What do you need?
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Briefly describe the objective, constraint, and desired output."
                    className="w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white placeholder:text-gray-300 outline-none transition focus:border-cta/70 focus:bg-black/30 focus:ring-2 focus:ring-cta/25"
                  />
                </label>

                {error && (
                  <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Request a Paid Brief <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
