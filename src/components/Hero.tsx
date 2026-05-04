"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-dark molecular-bg overflow-hidden"
    >
      {/* Animated grid dots */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Decorative SVG molecules */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15%" cy="30%" r="80" stroke="#D97706" strokeWidth="1" fill="none" />
        <circle cx="15%" cy="30%" r="8" fill="#D97706" />
        <line x1="15%" y1="30%" x2="30%" y2="18%" stroke="#D97706" strokeWidth="1" />
        <circle cx="30%" cy="18%" r="6" fill="#D97706" />
        <line x1="30%" y1="18%" x2="40%" y2="25%" stroke="#D97706" strokeWidth="0.5" />
        <circle cx="40%" cy="25%" r="4" fill="#D97706" />
        <circle cx="78%" cy="65%" r="60" stroke="#B45309" strokeWidth="1" fill="none" />
        <circle cx="78%" cy="65%" r="6" fill="#B45309" />
        <line x1="78%" y1="65%" x2="88%" y2="48%" stroke="#B45309" strokeWidth="1" />
        <circle cx="88%" cy="48%" r="5" fill="#B45309" />
        <circle cx="55%" cy="82%" r="45" stroke="#D97706" strokeWidth="0.8" fill="none" />
        <circle cx="55%" cy="82%" r="5" fill="#D97706" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 bg-primary/15 text-primary-light text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-primary/25">
            <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
            Faster biotech decisions, without the overhead
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight"
        >
          AI-Powered{" "}
          <span className="gradient-text">Decision Support</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We help biotech teams turn complex targets into clear decisions with
          AI-assisted screening, prioritization, and reporting. If you need a
          sharper pilot, cleaner evidence, or a faster next step, we can help.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 text-base shadow-lg shadow-primary/25 cursor-pointer"
          >
            Book a Pilot Call
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#platform"
            className="border border-gray-600 hover:border-primary-light text-gray-300 hover:text-primary-light font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base cursor-pointer"
          >
            See the Workflow
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4 text-gray-500"
        >
          <div className="rounded-full border border-gray-700/60 bg-white/5 px-4 py-2 text-sm">
            Research-use only
          </div>
          <div className="rounded-full border border-gray-700/60 bg-white/5 px-4 py-2 text-sm">
            Transparent methods
          </div>
          <div className="rounded-full border border-gray-700/60 bg-white/5 px-4 py-2 text-sm">
            Decision-ready reporting
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down" className="cursor-pointer">
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </a>
      </motion.div>
    </section>
  );
}
