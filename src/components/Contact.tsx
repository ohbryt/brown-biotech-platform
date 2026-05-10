"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Building2, Send, Route, UserCog, ShieldCheck } from "lucide-react";
import { useState, FormEvent } from "react";
import { type IntakeApiResponse, type IntakeFormPayload } from "@/lib/intake";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [triage, setTriage] = useState<IntakeApiResponse["triage"] | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

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
      message: String(data.get("message") || ""),
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseBody?.error || "Submission failed.");
      }

      setTriage(responseBody?.triage ?? null);
      setSubmitted(true);
      form.reset();
    } catch {
      alert("Something went wrong. Please try again.");
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
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Need a paid brief, biostatistics support, or discovery scoping help? Send a note and we&apos;ll map the route, owner, and next step.
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
                  Thank you for reaching out. We&apos;ll respond within 24 hours with a clear next step.
                </p>
                {triage && (
                  <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-5 text-left shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
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
                    </div>
                    <div className="mt-4 rounded-xl bg-surface p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Next action</p>
                      <p className="mt-2 text-sm leading-7 text-text">{triage.nextAction}</p>
                    </div>
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
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                >
                  Send Paid Brief
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
