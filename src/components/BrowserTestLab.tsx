"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Gauge, Route, Sparkles, ShieldCheck, UserCog } from "lucide-react";
import { MARKET_SIGNALS, ROUTE_CARDS, SERVICE_LANES, triageIntake, type IntakeFormPayload, type Priority, type ServiceLane, type TriageResult } from "@/lib/intake";

const samples: Record<ServiceLane, { problem: string; outcome: string; timeline: string; constraints: string; evidenceTypes: string[]; evidenceSummary: string; evidenceLinks: string }> = {
  "peptide-service": {
    problem: "Need a peptide brief for a kinase-target program.",
    outcome: "Confirm scope, format, and quote path.",
    timeline: "This week",
    constraints: "Human review before any client-facing proposal.",
    evidenceTypes: ["pdf", "image"],
    evidenceSummary: "Include the target deck and one supporting screenshot.",
    evidenceLinks: "",
  },
  biostatx: {
    problem: "We need decision-ready biostatistics for a study dataset and a clean reporting plan.",
    outcome: "Get an analysis plan and report outline.",
    timeline: "ASAP",
    constraints: "Please keep the workflow lean and reviewable.",
    evidenceTypes: ["pdf", "link"],
    evidenceSummary: "Attach the dataset summary and protocol PDF.",
    evidenceLinks: "",
  },
  "genox-site": {
    problem: "We are exploring a genomics collaboration and need a scope memo.",
    outcome: "Define the research direction and partnering path.",
    timeline: "This month",
    constraints: "No public announcement without human approval.",
    evidenceTypes: ["slide", "link"],
    evidenceSummary: "Use the collaboration deck and reference links.",
    evidenceLinks: "",
  },
  "business-pipeline": {
    problem: "We want a reusable intake and routing workflow for our team.",
    outcome: "Map the workflow, owner, and next implementation step.",
    timeline: "This quarter",
    constraints: "Keep it privacy-aware and human-reviewed.",
    evidenceTypes: ["pdf", "image", "link"],
    evidenceSummary: "Add the current workflow doc and screenshots of the old process.",
    evidenceLinks: "",
  },
};

const priorities: Priority[] = ["High", "Medium", "Low"];

function makePayload(state: BrowserTestState): IntakeFormPayload {
  return {
    source: "website",
    serviceLane: state.serviceLane,
    serviceName: state.serviceLane,
    priority: state.priority,
    problem: state.problem,
    outcome: state.outcome,
    timeline: state.timeline,
    budgetRange: state.budgetRange,
    constraints: state.constraints,
    evidenceTypes: state.evidenceTypes,
    evidenceSummary: state.evidenceSummary,
    evidenceLinks: state.evidenceLinks,
    humanApprovalRequired: state.humanApprovalRequired,
    message: [state.problem, state.outcome, state.timeline, state.constraints].filter(Boolean).join(" • "),
    name: "Browser Demo",
    email: "demo@brownbio.tech",
    company: "Website test",
  };
}

type BrowserTestState = {
  serviceLane: ServiceLane;
  priority: Priority;
  problem: string;
  outcome: string;
  timeline: string;
  budgetRange: string;
  constraints: string;
  evidenceTypes: string[];
  evidenceSummary: string;
  evidenceLinks: string;
  humanApprovalRequired: boolean;
};

const initialState: BrowserTestState = {
  serviceLane: "peptide-service",
  priority: "Medium",
  problem: samples["peptide-service"].problem,
  outcome: samples["peptide-service"].outcome,
  timeline: samples["peptide-service"].timeline,
    budgetRange: "",
    constraints: samples["peptide-service"].constraints,
    evidenceTypes: samples["peptide-service"].evidenceTypes,
    evidenceSummary: samples["peptide-service"].evidenceSummary,
    evidenceLinks: samples["peptide-service"].evidenceLinks,
    humanApprovalRequired: false,
};

function previewRequestId(payloadJson: string): string {
  let hash = 0;
  for (let i = 0; i < payloadJson.length; i += 1) {
    hash = (hash * 31 + payloadJson.charCodeAt(i)) >>> 0;
  }
  return `BR-${hash.toString(16).toUpperCase().slice(0, 8).padEnd(8, "0")}`;
}

export default function BrowserTestLab() {
  const [state, setState] = useState<BrowserTestState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const payload = useMemo(() => makePayload(state), [state]);
  const payloadJson = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
  const previewId = useMemo(() => previewRequestId(payloadJson), [payloadJson]);
  const triage = useMemo<TriageResult>(() => triageIntake(payload), [payload]);

  const loadSample = (lane: ServiceLane) => {
    const sample = samples[lane];
    setState((prev) => ({
      ...prev,
      serviceLane: lane,
      problem: sample.problem,
      outcome: sample.outcome,
      timeline: sample.timeline,
      constraints: sample.constraints,
      evidenceTypes: sample.evidenceTypes,
      evidenceSummary: sample.evidenceSummary,
      evidenceLinks: sample.evidenceLinks,
      humanApprovalRequired: lane === "genox-site" ? true : prev.humanApprovalRequired,
    }));
    setSubmitted(false);
  };

  const update = <K extends keyof BrowserTestState>(key: K, value: BrowserTestState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  };

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="kicker">Browser demo</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Test a brief in the browser and see the route instantly.
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            This demo lets visitors type a short brief, preview the triage result, and understand the next step before sending anything. It mirrors the live intake language for text, files, and signals.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap gap-3">
              {SERVICE_LANES.map((lane) => (
                <button
                  key={lane}
                  type="button"
                  onClick={() => loadSample(lane)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    state.serviceLane === lane
                      ? "border-cta bg-cta/10 text-cta"
                      : "border-border bg-white text-text hover:border-primary/30"
                  }`}
                >
                  {lane}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-text">
                <span>Priority</span>
                <select
                  value={state.priority}
                  onChange={(e) => update("priority", e.target.value as Priority)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-text">
                <span>Timeline</span>
                <input
                  value={state.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="This week / ASAP / this quarter"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Problem</span>
                <textarea
                  rows={5}
                  value={state.problem}
                  onChange={(e) => update("problem", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What do you want to test?"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Outcome</span>
                <textarea
                  rows={3}
                  value={state.outcome}
                  onChange={(e) => update("outcome", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What result do you want?"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Constraints</span>
                <textarea
                  rows={5}
                  value={state.constraints}
                  onChange={(e) => update("constraints", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Privacy, approval, budget, or deployment notes"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Evidence summary</span>
                <textarea
                  rows={3}
                  value={state.evidenceSummary}
                  onChange={(e) => update("evidenceSummary", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What does the artifact show?"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Evidence links</span>
                <input
                  value={state.evidenceLinks}
                  onChange={(e) => update("evidenceLinks", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Shared drive / paper / dataset / screenshot link"
                />
              </label>

              <div className="rounded-2xl border border-border bg-white p-4 sm:col-span-2">
                <p className="text-sm font-semibold text-text">Evidence types</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    ["pdf", "PDF"],
                    ["image", "Image"],
                    ["slide", "Slide"],
                    ["audio", "Audio"],
                    ["link", "Link"],
                  ].map(([type, label]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setState((prev) => {
                          const hasType = prev.evidenceTypes.includes(type);
                          return {
                            ...prev,
                            evidenceTypes: hasType ? prev.evidenceTypes.filter((item) => item !== type) : [...prev.evidenceTypes, type],
                          };
                        });
                        setSubmitted(false);
                      }}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        state.evidenceTypes.includes(type)
                          ? "border-cta bg-cta/10 text-cta"
                          : "border-border bg-surface text-text hover:border-primary/30"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold text-text sm:col-span-2">
                <input
                  type="checkbox"
                  checked={state.humanApprovalRequired}
                  onChange={(e) => update("humanApprovalRequired", e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                Human approval required
              </label>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/15 transition hover:from-primary-light hover:to-cta-light"
              >
                Run browser test
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setState(initialState)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 font-semibold text-text transition hover:border-primary/30"
              >
                Reset demo
              </button>
            </div>

            <p className="mt-4 text-sm text-text-muted">
              The preview below updates from the same shared triage logic used by the site intake flow.
            </p>
          </div>

          <div className="space-y-6">
            <div className="premium-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Live result</p>
                  <h2 className="mt-2 text-2xl font-semibold text-text">Route preview</h2>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-3 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Metric label="Route" value={triage.route} />
                <Metric label="Owner" value={triage.owner} />
                <Metric label="Fit score" value={`${triage.fitScore}/100`} />
                <Metric label="Approval" value={triage.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : "No"} />
              </div>

              <div className="mt-6 rounded-2xl bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Next action</p>
                <p className="mt-2 text-sm leading-7 text-text">{triage.nextAction}</p>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Evidence stack</p>
                <p className="mt-2 text-sm leading-7 text-text-muted">
                  {payload.evidenceTypes?.length ? payload.evidenceTypes.join(", ") : "No evidence types selected"}
                </p>
                <p className="mt-3 text-sm leading-7 text-text-muted">{payload.evidenceSummary || "No summary provided"}</p>
                {payload.evidenceLinks && <p className="mt-3 text-sm leading-7 text-text-muted">{payload.evidenceLinks}</p>}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
                <Badge icon={<Route className="h-3 w-3" />} label="Triage" />
                <Badge icon={<UserCog className="h-3 w-3" />} label="Owner" />
                <Badge icon={<ShieldCheck className="h-3 w-3" />} label="Human gate" />
              </div>
            </div>

            <div className="premium-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Status flow</p>
                  <h2 className="mt-2 text-2xl font-semibold text-text">What happens after submit</h2>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-3 text-primary">
                  <Gauge className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {triage.statusFlow.map((step, index) => (
                  <span key={step} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-text">
                    <span className="text-xs font-semibold text-primary">0{index + 1}</span>
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Payload JSON</p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-dark px-4 py-3 text-xs leading-6 text-white"><code>{payloadJson}</code></pre>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Authoritative record preview</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">This is the record that would be saved to the Notion intake hub.</p>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Request ID</p>
                      <p className="mt-1 font-semibold text-text">{previewId}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Primary sink</p>
                      <p className="mt-1 font-semibold text-text">Notion database → inbox fallback</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Visible after submit</p>
                      <p className="mt-1 font-semibold text-text">requestId · triage · notionUrl</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Live route preview</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">The browser demo shows the same triage model used by the site, including the status flow and next action.</p>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Route</p>
                      <p className="mt-1 font-semibold text-text">{triage.route}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Owner</p>
                      <p className="mt-1 font-semibold text-text">{triage.owner}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cta/20 bg-cta/5 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-cta" />
                  <p className="text-sm leading-7 text-text-muted">
                    Visitors can use this page to test a brief before sending it. The browser shows route, owner, and next action without leaving the page.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {ROUTE_CARDS.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-border bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{card.title}</p>
                    <p className="mt-2 text-sm font-semibold text-text">{card.summary}</p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{card.details}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cta/20 bg-cta/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">Evidence stack</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Briefs", "Decision-ready summaries and scoped requests."],
                    ["Visual evidence", "Screenshots, figures, slides, and chart captures."],
                    ["Audio notes", "Meeting clips and spoken context tied back to the brief."],
                    ["Approved snippets", "Reusable language only after human review."],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-xl border border-amber-200 bg-white p-4">
                      <p className="text-sm font-semibold text-text">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cta/20 bg-cta/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900">Market signal</p>
                <div className="mt-3 space-y-4">
                  {MARKET_SIGNALS.map((signal) => (
                    <div key={signal.source} className="rounded-xl border border-amber-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">{signal.source}</p>
                      <p className="mt-2 text-sm font-semibold text-text">{signal.signal}</p>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{signal.implication}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold text-text">{value}</p>
    </div>
  );
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5">
      {icon}
      {label}
    </span>
  );
}
