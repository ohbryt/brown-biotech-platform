"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Building2, Send } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/xpwdqkjl", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
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
            Need a pilot, a target review, or a faster decision path? Send a note and we&apos;ll map the next step.
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
              <div className="bg-cta/5 border border-cta/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cta flex items-center justify-center mx-auto mb-5">
                  <Send className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">
                  Message Sent!
                </h3>
                <p className="text-text-muted">
                  Thank you for reaching out. We&apos;ll respond within 24 hours with a clear next step.
                </p>
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
                  <label htmlFor="project_type" className="block text-sm font-semibold text-text mb-2">
                    Project Type
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-text"
                  >
                    <option>Target review</option>
                    <option>Pilot / consultation</option>
                    <option>Lead optimization</option>
                    <option>Other</option>
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
                  Send Message
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
                        AI-Powered Drug Discovery
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
