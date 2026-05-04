"use client";

import { motion } from "framer-motion";
import {
  Crosshair,
  Search,
  Sparkles,
  Box,
  BarChart3,
  Wrench,
  ShieldCheck,
  Truck,
  FileText,
} from "lucide-react";

const modules = [
  { id: "M1", name: "Target Prep", icon: Crosshair, desc: "Target identification, validation, and structural analysis" },
  { id: "M2", name: "Library Screening", icon: Search, desc: "Virtual screening across 7 global compound databases" },
  { id: "M3", name: "De Novo Design", icon: Sparkles, desc: "AI-generated novel molecules and peptide sequences" },
  { id: "M4", name: "Structure Prediction", icon: Box, desc: "3D structure prediction with ColabFold and docking" },
  { id: "M5", name: "Scoring", icon: BarChart3, desc: "Composite scoring: binding, selectivity, drug-likeness" },
  { id: "M6", name: "Modifications", icon: Wrench, desc: "Lead optimization with chemical and peptide modifications" },
  { id: "M7", name: "ADMET", icon: ShieldCheck, desc: "Absorption, distribution, metabolism, excretion, toxicity" },
  { id: "M8", name: "Delivery", icon: Truck, desc: "Formulation design and delivery system recommendations" },
  { id: "M9", name: "Reporting", icon: FileText, desc: "Automated reports with rankings and visualizations" },
];

export default function Platform() {
  return (
    <section id="platform" className="py-28 bg-surface dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Technology
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-5 tracking-tight">
            Our 9-Module Pipeline
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A fully integrated AI pipeline that takes you from target
            identification to optimized lead candidates.
          </p>
        </motion.div>

        {/* Modality badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center gap-3 mb-14"
        >
          <span className="bg-primary/10 text-primary font-semibold text-sm px-5 py-2 rounded-full border border-primary/20 font-[family-name:var(--font-mono)]">
            Small Molecules
          </span>
          <span className="bg-cta/10 text-cta font-semibold text-sm px-5 py-2 rounded-full border border-cta/20 font-[family-name:var(--font-mono)]">
            Peptides
          </span>
        </motion.div>

        {/* Pipeline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-glow cursor-default group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cta/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-cta/20 transition-all duration-200">
                  <mod.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md font-[family-name:var(--font-mono)]">
                      {mod.id}
                    </span>
                    <h3 className="font-semibold text-text">{mod.name}</h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
