// @ts-nocheck
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeInquiryInput } from "../src/lib/inquiry.ts";
import { buildBriefDraft, formatInquiryRecord, triageIntake } from "../src/lib/intake.ts";

test("normalizeInquiryInput rejects missing required contact fields", () => {
  const result = normalizeInquiryInput({ message: "Scope review" });

  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /name/i);
});

test("normalizeInquiryInput trims fields and applies safe defaults", () => {
  const result = normalizeInquiryInput({
    name: "  Dr. OCM  ",
    email: "  ocm@example.com ",
    message: "  Need a paid brief. ",
    serviceLane: " peptide-service ",
    priority: "urgent",
    source: "unknown-source",
    humanApprovalRequired: "yes",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.payload.name, "Dr. OCM");
    assert.equal(result.payload.email, "ocm@example.com");
    assert.equal(result.payload.message, "Need a paid brief.");
    assert.equal(result.payload.serviceLane, "peptide-service");
    assert.equal(result.payload.priority, "Medium");
    assert.equal(result.payload.source, "website");
    assert.equal(result.payload.humanApprovalRequired, true);
  }
});

test("normalizeInquiryInput rejects oversized message fields", () => {
  const result = normalizeInquiryInput({
    name: "Dr. OCM",
    email: "ocm@example.com",
    message: "x".repeat(10_001),
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
  assert.match(result.error, /message/i);
});

test("triageIntake routes approval-sensitive requests to human review", () => {
  const triage = triageIntake({
    serviceLane: "business-pipeline",
    message: "We need deployment and legal approval before launch.",
    humanApprovalRequired: false,
  });

  assert.equal(triage.approvalRequired, true);
  assert.equal(triage.route, "Needs Human Approval");
  assert.equal(triage.owner, "Dr.OCM");
  assert.match(triage.nextAction, /human review/i);
});

test("formatInquiryRecord emits the fixed Brown Biotech record format", () => {
  const payload = {
    source: "service-page",
    serviceLane: "peptide-service",
    priority: "Medium",
    name: "Dr. OCM",
    email: "ocm@example.com",
    company: "Brown Biotech",
    timeline: "this month",
    budgetRange: "₩2M-₩8M",
    outcome: "Scope a paid peptide brief",
    constraints: "No public claims.",
    message: "Need a scoped brief for a peptide project.",
  };
  const triage = triageIntake(payload);

  const record = formatInquiryRecord(payload, triage, "BR-123", "https://notion.so/example");

  assert.match(record, /# Brown Biotech intake record/);
  assert.match(record, /Request ID:\*\* BR-123/);
  assert.match(record, /Service lane:\*\* peptide-service/);
  assert.match(record, /Notion record:\*\* https:\/\/notion.so\/example/);
  assert.match(record, /## Client context/);
  assert.match(record, /Need a scoped brief for a peptide project\./);
});

test("buildBriefDraft emits a lane-specific decision brief", () => {
  const payload = {
    serviceLane: "biostatx",
    name: "Dr. OCM",
    company: "Brown Biotech",
    timeline: "this week",
    budgetRange: "₩2M-₩8M",
    outcome: "Decide the smallest analysis that supports the next experiment.",
    message: "Need a decision-ready statistical brief.",
    constraints: "Tight turnaround.",
  };
  const triage = triageIntake(payload);

  const brief = buildBriefDraft(payload, triage);

  assert.match(brief, /# biostatx brief draft/);
  assert.match(brief, /## Decision question/);
  assert.match(brief, /smallest analysis/i);
  assert.match(brief, /## Working hypothesis/);
  assert.match(brief, /## Human approval/);
  assert.match(brief, /No/);
});
