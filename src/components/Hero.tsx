"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const highlights = [
  "Inspectable workflow",
  "Human review required",
  "Decision-grade handoff",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-dark text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.15),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(180,83,9,0.12),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(146,64,14,0.10),transparent_30%)]" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-4 py-28 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">
        {/* LEFT — text */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm font-medium text-gray-100 shadow-lg shadow-black/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
              Brown Biotech · System of Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-7 text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            One brief, one owner,
            <span className="block mt-2 text-transparent bg-gradient-to-r from-white via-amber-100 to-cta bg-clip-text">
              one next action.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-7 text-gray-300"
          >
            Start with a paid brief — powered by a live reasoning layer over PubMed, ClinicalTrials, ChEMBL, and GEO.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.26, ease: "easeOut" }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/12 px-4 py-2 text-sm text-gray-100 backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-cta" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/services/business-pipeline#brief"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-7 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light"
            >
              Request a Paid Brief
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-gray-100 backdrop-blur transition hover:bg-white/10"
            >
              View Services
            </a>
          </motion.div>
        </div>

        {/* RIGHT — freedom illustration */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 blur-3xl" />

          <svg
            viewBox="0 0 800 500"
            className="relative w-full max-w-[600px] drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="800" height="500" fill="#0f172a" rx="24" />

            {/* Grid lines — horizontal */}
            {[100, 200, 300, 400].map((y) => (
              <line
                key={`h${y}`}
                x1="0"
                y1={y}
                x2="800"
                y2={y}
                stroke="#67e8f9"
                strokeWidth="0.3"
                opacity="0.4"
              />
            ))}
            {/* Grid lines — vertical */}
            {[133, 266, 400, 533, 666].map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="500"
                stroke="#67e8f9"
                strokeWidth="0.3"
                opacity="0.4"
              />
            ))}

            {/* Curved paths — cyan */}
            <path
              d="M 120 80 Q 200 120 340 100"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <path
              d="M 520 420 Q 580 380 740 300"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Curved paths — purple */}
            <path
              d="M 600 80 Q 650 110 750 160"
              fill="none"
              stroke="#d0bfff"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <path
              d="M 80 400 Q 120 370 200 320"
              fill="none"
              stroke="#d0bfff"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Orbit rings */}
            <ellipse
              cx="400"
              cy="250"
              rx="52"
              ry="52"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="1"
              opacity="0.25"
            />
            <ellipse
              cx="400"
              cy="250"
              rx="72"
              ry="72"
              fill="none"
              stroke="#a5d8ff"
              strokeWidth="0.7"
              opacity="0.15"
            />

            {/* Central node cluster */}
            {[
              { cx: 393, cy: 243, r: 5, color: "#a5d8ff" },
              { cx: 401, cy: 252, r: 4, color: "#67e8f9" },
              { cx: 408, cy: 247, r: 3, color: "#fcd34d" },
              { cx: 398, cy: 236, r: 3.5, color: "#67e8f9" },
              { cx: 406, cy: 256, r: 2.5, color: "#d0bfff" },
              { cx: 415, cy: 242, r: 4.5, color: "#a5d8ff" },
              { cx: 395, cy: 257, r: 2.5, color: "#fde68a" },
              { cx: 417, cy: 255, r: 3, color: "#67e8f9" },
              { cx: 403, cy: 244, r: 2, color: "#d0bfff" },
              { cx: 411, cy: 254, r: 2.5, color: "#a5d8ff" },
            ].map((n, i) => (
              <circle
                key={`n${i}`}
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill={n.color}
                opacity="0.9"
              />
            ))}

            {/* Peripheral particles */}
            {[
              { cx: 265, cy: 190, r: 2.5, color: "#a5d8ff" },
              { cx: 505, cy: 280, r: 2, color: "#67e8f9" },
              { cx: 180, cy: 155, r: 2, color: "#fcd34d" },
              { cx: 620, cy: 350, r: 2.5, color: "#a5d8ff" },
              { cx: 145, cy: 310, r: 2, color: "#67e8f9" },
              { cx: 650, cy: 150, r: 2.5, color: "#d0bfff" },
              { cx: 230, cy: 380, r: 2, color: "#fde68a" },
              { cx: 560, cy: 115, r: 2, color: "#a5d8ff" },
              { cx: 690, cy: 220, r: 2.5, color: "#67e8f9" },
              { cx: 110, cy: 250, r: 2, color: "#d0bfff" },
              { cx: 720, cy: 400, r: 2, color: "#fcd34d" },
              { cx: 300, cy: 80, r: 2.5, color: "#67e8f9" },
              { cx: 480, cy: 420, r: 2, color: "#a5d8ff" },
              { cx: 130, cy: 140, r: 2, color: "#fde68a" },
              { cx: 680, cy: 280, r: 2.5, color: "#67e8f9" },
              { cx: 350, cy: 130, r: 2, color: "#d0bfff" },
              { cx: 550, cy: 450, r: 2, color: "#a5d8ff" },
              { cx: 60, cy: 340, r: 1.5, color: "#fcd34d" },
              { cx: 740, cy: 170, r: 1.5, color: "#67e8f9" },
              { cx: 200, cy: 430, r: 1.5, color: "#d0bfff" },
            ].map((p, i) => (
              <circle
                key={`p${i}`}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill={p.color}
                opacity="0.7"
              />
            ))}

            {/* Arrows */}
            <line
              x1="320"
              y1="210"
              x2="380"
              y2="210"
              stroke="#fcd34d"
              strokeWidth="2"
              opacity="0.8"
              markerStart="url(#dot)"
              markerEnd="url(#arrow)"
            />
            <line
              x1="420"
              y1="300"
              x2="510"
              y2="250"
              stroke="#a5d8ff"
              strokeWidth="2"
              opacity="0.8"
              markerStart="url(#dot)"
              markerEnd="url(#arrow)"
            />
            <line
              x1="200"
              y1="270"
              x2="280"
              y2="300"
              stroke="#67e8f9"
              strokeWidth="1.5"
              opacity="0.7"
              markerStart="url(#dot)"
              markerEnd="url(#arrow)"
            />
            <line
              x1="480"
              y1="200"
              x2="580"
              y2="260"
              stroke="#d0bfff"
              strokeWidth="1.5"
              opacity="0.7"
              markerStart="url(#dot)"
              markerEnd="url(#arrow)"
            />

            {/* Arrowhead defs */}
            <defs>
              <marker
                id="dot"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
              >
                <circle cx="5" cy="5" r="4" fill="#fcd34d" opacity="0.8" />
              </marker>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fcd34d" opacity="0.8" />
              </marker>
            </defs>

            {/* Labels */}
            <text x="60" y="115" fontFamily="Virgil, sans-serif" fontSize="12" fill="#a5d8ff" opacity="0.7">PubMed</text>
            <text x="630" y="60" fontFamily="Virgil, sans-serif" fontSize="12" fill="#d0bfff" opacity="0.7">ClinicalTrials</text>
            <text x="650" y="430" fontFamily="Virgil, sans-serif" fontSize="12" fill="#fde68a" opacity="0.7">ChEMBL</text>
            <text x="100" y="420" fontFamily="Virgil, sans-serif" fontSize="14" fill="#fcd34d" opacity="0.6">AI</text>
            <text x="700" y="310" fontFamily="Virgil, sans-serif" fontSize="12" fill="#67e8f9" opacity="0.5">OPEN</text>
          </svg>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down" className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 text-gray-300 backdrop-blur transition hover:bg-white/10">
          <ChevronDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}