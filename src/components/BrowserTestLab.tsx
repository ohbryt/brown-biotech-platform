"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Gauge, Route, Sparkles, ShieldCheck, UserCog } from "lucide-react";
import { SERVICE_LANES, triageIntake, type IntakeFormPayload, type Priority, type ServiceLane, type TriageResult } from "@/lib/intake";

const samples: Record<ServiceLane, { problem: string; outcome: string; timeline: string; constraints: string }> = {
  "peptide-service": {
    problem: "We need a peptide brief for a kinase-target program and want a fast scope review.",
    outcome: "Confirm scope, target format, and quote path.",
    timeline: "This week",
    constraints: "Human review before any client-facing proposal.",
  },
  biostatx: {
    problem: "We need decision-ready biostatistics for a study dataset and a clean reporting plan.",
    outcome: "Get an analysis plan and report outline.",
    timeline: "ASAP",
    constraints: "Please keep the workflow lean and reviewable.",
  },
  "genox-site": {
    problem: "We are exploring a genomics collaboration and need a scope memo.",
    outcome: "Define the research direction and partnering path.",
    timeline: "This month",
    constraints: "No public announcement without human approval.",
  },
  "business-pipeline": {
    problem: "We want a reusable intake and routing workflow for our team.",
    outcome: "Map the workflow, owner, and next implementation step.",
    timeline: "This quarter",
    constraints: "Keep it privacy-aware and human-reviewed.",
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
  humanApprovalRequired: false,
};

export default function BrowserTestLab() {
  const [state, setState] = useState<BrowserTestState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const payload = useMemo(() => makePayload(state), [state]);
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
            This demo lets visitors type a short brief, preview the triage result, and understand the next step before sending anything.
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
                  rows={4}
                  value={state.problem}
                  onChange={(e) => update("problem", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What do you want to test?"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Outcome</span>
                <input
                  value={state.outcome}
                  onChange={(e) => update("outcome", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="What result do you want?"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-text sm:col-span-2">
                <span>Constraints</span>
                <input
                  value={state.constraints}
                  onChange={(e) => update("constraints", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 font-normal outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Privacy, approval, budget, or deployment notes"
                />
              </label>

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
                <Metric label="Route" value={submitted ? triage.route : "Preview"} />
                <Metric label="Owner" value={submitted ? triage.owner : "Assigned on test"} />
                <Metric label="Fit score" value={submitted ? `${triage.fitScore}/100` : "Live"} />
                <Metric label="Approval" value={submitted && triage.approvalRequired ? `Yes${triage.approvalReason ? ` · ${triage.approvalReason}` : ""}` : submitted ? "No" : "Auto"} />
              </div>

              <div className="mt-6 rounded-2xl bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Next action</p>
                <p className="mt-2 text-sm leading-7 text-text">{submitted ? triage.nextAction : "Click Run browser test to see the next step."}</p>
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

              <div className="mt-6 rounded-2xl border border-cta/20 bg-cta/5 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-cta" />
                  <p className="text-sm leading-7 text-text-muted">
                    Visitors can use this page to test a brief before sending it. The browser shows route, owner, and next action without leaving the page.
                  </p>
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
