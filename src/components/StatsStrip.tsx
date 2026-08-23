"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

const stats: Stat[] = [
  { value: 13, label: "Service lanes", detail: "Paid brief → retainer" },
  { value: 24, suffix: "h", label: "Response target", detail: "Inbound triage SLA" },
  { value: 4, label: "Evidence stacks", detail: "PubMed · ChEMBL · CT.gov · GEO" },
  { value: 100, suffix: "%", label: "Human approval", detail: "On high-stakes routes" },
];

function Counter({ target, suffix }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section
      aria-label="Operating metrics"
      className="relative border-y border-white/10 bg-dark text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.10),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-white/5 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="group relative flex flex-col gap-1 bg-dark p-6 transition-colors duration-200 hover:bg-dark-light sm:p-8"
          >
            <p className="font-mono text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <Counter target={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm font-semibold text-amber-100">{s.label}</p>
            <p className="text-xs leading-relaxed text-gray-400">{s.detail}</p>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cta/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
