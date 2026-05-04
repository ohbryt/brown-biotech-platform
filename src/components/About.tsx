"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Cpu, Database, FlaskConical } from "lucide-react";

function AnimatedCounter({
  target,
  label,
  icon: Icon,
  color,
}: {
  target: number;
  label: string;
  icon: React.ElementType;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-glow cursor-default"
    >
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${color}`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div className="text-5xl font-bold text-text mb-2 font-[family-name:var(--font-mono)]">
        {count}
      </div>
      <div className="text-text-muted text-sm font-medium uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const stats = [
  { target: 9, label: "Core Modules", icon: Cpu, color: "bg-primary/10 text-primary" },
  { target: 7, label: "Source Databases", icon: Database, color: "bg-cta/10 text-cta" },
  { target: 2, label: "Supported Modalities", icon: FlaskConical, color: "bg-accent/10 text-primary-light" },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-6 tracking-tight">
            Accelerating Discovery with AI
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Brown Biotech Inc. combines AI-assisted analysis with practical
            pharmaceutical expertise to support research programs from target
            triage through reporting. The platform is organized into 9 modules,
            7 source databases, and 2 supported modalities so teams can move
            from questions to clear next steps faster.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
