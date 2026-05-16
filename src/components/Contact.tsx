"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Building2, Send, Route, UserCog, ShieldCheck, Copy, Download } from "lucide-react";
import { useState, FormEvent } from "react";
import { buildBriefDraft, type IntakeApiResponse, type IntakeFormPayload, triageIntake } from "@/lib/intake";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [triage, setTriage] = useState<IntakeApiResponse["triage"] | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [notionUrl, setNotionUrl] = useState<string | null>(null);
  const [receiptMarkdown, setReceiptMarkdown] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildReceipt = (
    requestIdValue: string,
    triageValue: NonNullable<IntakeApiResponse["triage"]>,
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
      `- **Service lane:** ${triageValue.route}`,
      `- **Route:** ${triageValue.route}`,
      `- **Owner:** ${triageValue.owner}`,
      `- **Fit score:** ${triageValue.fitScore}/100`,
      `- **Human approval:** ${triageValue.approvalRequired ? `Yes${triageValue.approvalReason ? ` · ${triageValue.approvalReason}` : ""}` : "No"}`,
      `- **Evidence stack:** ${evidenceStackValue}`,
      attachmentsValue?.length ? `- **Files:** ${attachmentsValue.map((attachment) => `${attachment.name} (${attachment.type || "file"}, ${Math.max(1, Math.round(attachment.size / 1024))} KB, ${attachment.url})`).join(" | ")}` : null,
      `- **Next action:** ${triageValue.nextAction}`,
      deliveryTargetsValue?.length ? `- **Delivery targets:** ${deliveryTargetsValue.join(", ")}` : null,
      deliveryNoteValue ? `- **Delivery note:** ${deliveryNoteValue}` : null,
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
    anchor.download = `${requestId || "brown-biotech"}-brief-receipt.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      source: "main-contact",
      serviceName: String(data.get("service_lane") || "business-pipeline"),
      serviceLane: String(data.get("service_lane") || "business-pipeline") as IntakeFormPayload["serviceLane"],
      priority: "Medium",
      problem: String(data.get("message") || ""),
      outcome: String(data.get("message") || ""),
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      timeline: "",
      constraints: String(data.get("constraints") || ""),
      evidenceTypes,
      evidenceSummary,
      evidenceLinks,
      message: String(data.get("message") || ""),
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
      data.set("constraints", payload.constraints || "");
      data.set("evidenceSummary", evidenceSummary);
      data.set("evidenceLinks", evidenceLinks);
      data.set("message", payload.message);
      evidenceTypes.forEach((item) => data.append("evidenceTypes", item));

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: data,
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseBody?.error || "Submission failed.");
      }

      const resolvedTriage = responseBody?.triage ?? triageIntake(payload);
      setTriage(resolvedTriage);
      setRequestId(responseBody?.requestId ?? null);
      setNotionUrl(responseBody?.notionUrl ?? null);
      setReceiptMarkdown(
        buildReceipt(
          responseBody?.requestId ?? "Pending save",
          resolvedTriage,
          responseBody?.notionUrl ?? null,
          evidenceStack,
          responseBody?.briefDraft ?? buildBriefDraft(payload, resolvedTriage),
          responseBody?.deliveryTargets,
          responseBody?.deliveryNote,
          responseBody?.attachments,
        ),
      );
      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Start with a brief
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Request a brief
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Need a paid brief, spec-driven pipeline support, or discovery scoping help? Send a note and we&apos;ll map the route, owner, and next step. If the fit is weak, we&apos;ll say so and route it cleanly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="space-y-4 bg-cta/5 border border-cta/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cta flex items-center justify-center mx-auto mb-5">
                  <Send className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">
                  Brief received
                </h3>
                <p className="text-text-muted">
                  Thank you for reaching out. We&apos;ll respond within 24 hours with a clear next step, a route, and an owner.
                </p>
                {(requestId || notionUrl || triage) && (
                  <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-5 text-left shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Request ID</p>
                        <p className="mt-1 font-semibold text-text">{requestId || "Pending save"}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Notion record</p>
                        {notionUrl ? (
                          <a href={notionUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block font-semibold text-primary underline decoration-2 underline-offset-4">
                            Open saved record
                          </a>
                        ) : (
                          <p className="mt-1 font-semibold text-text">Saved to inbox fallback or pending</p>
                        )}
                      </div>
                      {triage && (
                        <>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Route</p>
                            <p className="mt-1 font-semibold text-text">{triage.route}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Owner</p>
                            <p className="mt-1 font-semibold text-text">{triage.owner}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Fit score</p>
                            <p className="mt-1 font-semibold text-text">{triage.fitScore}/100</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Human approval</p>
                            <p className="mt-1 font-semibold text-text">
                              {triage.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : "No"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {triage && (
                      <div className="mt-4 rounded-xl bg-surface p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Next action</p>
                        <p className="mt-2 text-sm leading-7 text-text">{triage.nextAction}</p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1">
                        <Route className="h-3 w-3" /> Triage
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1">
                        <UserCog className="h-3 w-3" /> Owner assigned
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1">
                        <ShieldCheck className="h-3 w-3" /> Human gate respected
                      </span>
                    </div>
                  </div>
                )}
                {receiptMarkdown && (
                  <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-5 text-left shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Shareable brief receipt</p>
                        <p className="mt-1 text-sm text-text-muted">Copy or download the exact intake summary.</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={copyReceipt} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-text transition hover:border-primary/30">
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </button>
                        <button type="button" onClick={downloadReceipt} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-text transition hover:border-primary/30">
                          <Download className="h-3.5 w-3.5" /> Download
                        </button>
                      </div>
                    </div>
                    <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-xs leading-6 text-text">
{receiptMarkdown}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-text mb-2">
                    Company / Lab
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                    placeholder="Your organization"
                  />
                </div>

                <div className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-sm font-semibold text-text">Evidence stack</p>
                  <p className="mt-1 text-sm text-text-muted">Add the file, screenshot, report, or link that supports the request.</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {[
                      ["pdf", "PDF / report"],
                      ["image", "Screenshot / image"],
                      ["slide", "Slide / deck"],
                      ["audio", "Audio note"],
                      ["link", "Link / reference"],
                    ].map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text">
                        <input type="checkbox" name="evidenceTypes" value={value} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                        {label}
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-text">Evidence summary</span>
                    <textarea
                      name="evidenceSummary"
                      rows={3}
                      placeholder="What does the file or artifact show?"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-text">Evidence links</span>
                    <input
                      name="evidenceLinks"
                      placeholder="Shared drive, Notion, paper, or dataset link"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-semibold text-text">Attach files</span>
                    <input
                      type="file"
                      name="evidenceFiles"
                      multiple
                      className="w-full rounded-xl border border-dashed border-border bg-surface px-4 py-3.5 text-sm text-text file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-white file:font-semibold hover:border-primary/30"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.csv,.tsv,.json,.mp3,.wav,.ppt,.pptx,.doc,.docx"
                    />
                    <p className="mt-2 text-xs leading-5 text-text-muted">
                      Files are saved to a shareable Brown Biotech upload path and linked in the receipt and Notion record.
                    </p>
                  </label>
                </div>

                <div>
                  <label htmlFor="service_lane" className="block text-sm font-semibold text-text mb-2">
                    Service Lane
                  </label>
                  <select
                    id="service_lane"
                    name="service_lane"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                  >
                    <option value="peptide-service">peptide-service</option>
                    <option value="biostatx">biostatx</option>
                    <option value="genox-site">genox-site</option>
                    <option value="business-pipeline">general / ops</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 resize-none text-text"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light disabled:cursor-not-allowed disabled:opacity-70 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Request a Paid Brief"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="bg-dark rounded-2xl p-8 text-white h-full relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="relative">
                <h3 className="text-lg font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary-light" />
                    </div>
                    <div>
                      <p className="font-semibold">Brown Biotech Inc.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        AI-assisted biotech service support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary-light" />
                    </div>
                    <a
                      href="tel:+82-62-715-5377"
                      className="text-gray-300 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                    >
                      +82-62-715-5377
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary-light" />
                    </div>
                    <a
                      href="mailto:brownbio.ocm@gmail.com"
                      className="text-gray-300 hover:text-primary-light transition-colors duration-200 break-all cursor-pointer"
                    >
                      brownbio.ocm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We respond to all inquiries within 24 hours. For urgent
                    matters, please call directly. Initial messages are handled with
                    discretion.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
