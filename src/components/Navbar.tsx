"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FlaskConical,
  ChevronDown,
  BookOpen,
  FileText,
  Layers,
  BarChart3,
  Sparkles,
  BrainCircuit,
  TrendingUp,
  Sigma,
  Network,
  GitBranch,
  Wand2,
  Hammer,
  Calculator,
  Globe,
  Workflow,
} from "lucide-react";

type DropdownItem = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type DropdownGroup = {
  heading: string;
  items: DropdownItem[];
};

type NavItem =
  | { label: string; href: string; type: "link" }
  | {
      label: string;
      type: "dropdown";
      items: DropdownItem[];
    }
  | {
      label: string;
      type: "dropdown";
      groups: DropdownGroup[];
      featured?: { label: string; href: string; tagline: string };
    };

const serviceGroups: DropdownGroup[] = [
  {
    heading: "Paid briefs (default)",
    items: [
      {
        label: "peptide-service",
        href: "/services/peptide-service",
        description: "Default entry. Brief → quote → execution.",
        icon: FlaskConical,
      },
      {
        label: "biostatx",
        href: "/services/biostatx",
        description: "Statistics for raw data → evidence.",
        icon: BarChart3,
      },
      {
        label: "genox-site",
        href: "/services/genox-site",
        description: "Discovery + partner path framing.",
        icon: Sparkles,
      },
      {
        label: "paper-utilization-brief",
        href: "/services/paper-utilization-brief",
        description: "Single-paper utilization brief format.",
        icon: BookOpen,
      },
    ],
  },
  {
    heading: "Specialty & project lanes",
    items: [
      {
        label: "ai-drug-discovery",
        href: "/services/ai-drug-discovery",
        description: "FPembed molecular reasoning, decision-scored.",
        icon: BrainCircuit,
      },
      {
        label: "research-intelligence",
        href: "/services/research-intelligence",
        description: "TrueSkill-ranked preprint tournament.",
        icon: TrendingUp,
      },
      {
        label: "strict-omics",
        href: "/services/strict-omics",
        description: "Audit-grade transcriptomics pipelines.",
        icon: Sigma,
      },
      {
        label: "business-pipeline",
        href: "/services/business-pipeline",
        description: "Reusable workflow + review gate.",
        icon: GitBranch,
      },
    ],
  },
  {
    heading: "Flagship engine",
    items: [
      {
        label: "arp-engine",
        href: "/services/arp-engine",
        description: "The reasoning layer every brief runs on.",
        icon: Network,
      },
      {
        label: "site-forge",
        href: "/services/site-forge",
        description: "Generate a biotech one-pager in minutes.",
        icon: Hammer,
      },
      {
        label: "ondining",
        href: "/services/ondining",
        description: "Longevity social table program.",
        icon: Workflow,
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        label: "Pricing",
        href: "/services/pricing",
        description: "Sample / paid / project / retainer ladder.",
        icon: Calculator,
      },
      {
        label: "Inventa (waitlist)",
        href: "/services/inventa",
        description: "Coming soon — partner pilot.",
        icon: Wand2,
      },
    ],
  },
];

const navLinks: NavItem[] = [
  {
    label: "Services",
    type: "dropdown",
    groups: serviceGroups,
    featured: {
      label: "View all 13 lanes",
      href: "/services",
      tagline: "Open the service hub",
    },
  },
  { label: "Process", href: "/#process", type: "link" },
  {
    label: "Insights",
    type: "dropdown",
    items: [
      { label: "Daily Tech Digest", href: "/blog/daily-digest", description: "AI tooling signals every weekday", icon: BookOpen },
      { label: "Research Pulse", href: "/blog/research-pulse", description: "Longevity / fibrosis / omics scans", icon: FileText },
      { label: "Case Studies", href: "/case-studies", description: "Selected proof points", icon: Layers },
    ],
  },
  { label: "Operator", href: "/operator", type: "link" },
  { label: "Contact", href: "/#contact", type: "link" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover-with-debounce: open on enter, close after 150ms on leave
  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-dark rounded-2xl border border-white/10 shadow-lg shadow-dark/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Brown Biotech
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            {navLinks.map((link) => {
              if (link.type === "dropdown") {
                const isOpen = openDropdown === link.label;
                const isMega = "groups" in link;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleEnter(link.label)}
                    onMouseLeave={handleLeave}
                  >
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-primary-light px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className={`absolute right-0 mt-2 ${
                            isMega ? "w-[720px]" : "w-72"
                          } rounded-2xl border border-white/10 bg-dark/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl`}
                        >
                          {isMega ? (
                            // MEGA MENU for Services
                            <div className="grid grid-cols-2 gap-3">
                              {link.groups.map((group) => (
                                <div key={group.heading}>
                                  <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                    {group.heading}
                                  </p>
                                  <div className="space-y-1">
                                    {group.items.map((item) => {
                                      const Icon = item.icon;
                                      return (
                                        <Link
                                          key={item.label}
                                          href={item.href}
                                          onClick={() => setOpenDropdown(null)}
                                          className="flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors duration-150 hover:bg-white/5"
                                        >
                                          {Icon && (
                                            <div className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-cta/20 text-amber-100">
                                              <Icon className="h-3.5 w-3.5" />
                                            </div>
                                          )}
                                          <div className="min-w-0">
                                            <div className="font-mono text-sm font-semibold text-white">
                                              {item.label}
                                            </div>
                                            {item.description && (
                                              <div className="mt-0.5 text-[11px] text-gray-400 leading-relaxed">
                                                {item.description}
                                              </div>
                                            )}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                              {link.featured && (
                                <Link
                                  href={link.featured.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="col-span-2 mt-1 flex items-center justify-between rounded-xl border border-cta/30 bg-gradient-to-r from-cta/15 via-primary/10 to-transparent px-4 py-3 transition-colors duration-200 hover:border-cta/50"
                                >
                                  <div>
                                    <p className="font-semibold text-white">{link.featured.label}</p>
                                    <p className="text-xs text-gray-400">{link.featured.tagline}</p>
                                  </div>
                                  <ChevronDown className="h-4 w-4 -rotate-90 text-cta" />
                                </Link>
                              )}
                            </div>
                          ) : (
                            // Single dropdown for Insights
                            <div className="space-y-1">
                              {(link as any).items.map((item: DropdownItem) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5"
                                  >
                                    {Icon && (
                                      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-cta/20 text-amber-100">
                                        <Icon className="h-4 w-4" />
                                      </div>
                                    )}
                                    <div className="min-w-0">
                                      <div className="font-semibold text-white">{item.label}</div>
                                      {item.description && (
                                        <div className="mt-0.5 text-xs text-gray-400 leading-relaxed">
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-primary-light px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              href="/services"
              className="ml-2 border border-white/10 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Service Hub
            </Link>
            <Link
              href="/#contact"
              className="btn ml-2 bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white text-sm font-semibold px-5 py-2 rounded-xl cursor-pointer"
            >
              Talk to Us
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-white cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => {
                if (link.type === "dropdown" && "groups" in link) {
                  return (
                    <div key={link.label} className="space-y-2">
                      <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                        {link.label}
                      </div>
                      {link.groups.map((group) => (
                        <div key={group.heading} className="space-y-1">
                          <div className="px-3 pt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-600">
                            {group.heading}
                          </div>
                          {group.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-colors duration-200 py-2 pl-6 pr-3 rounded-lg cursor-pointer text-sm"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                }
                if (link.type === "dropdown" && "items" in link) {
                  return (
                    <div key={link.label} className="space-y-1">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                        {link.label}
                      </div>
                      {link.items.map((item: DropdownItem) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-colors duration-200 py-2 pl-6 pr-3 rounded-lg cursor-pointer"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-colors duration-200 py-2.5 px-3 rounded-lg cursor-pointer"
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="block border border-white/10 text-gray-200 hover:text-white hover:bg-white/5 transition-colors duration-200 py-2.5 px-3 rounded-lg cursor-pointer mt-2"
              >
                Service Hub
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block bg-gradient-to-r from-primary to-cta text-white text-center font-semibold px-5 py-2.5 rounded-xl mt-3 cursor-pointer"
              >
                Talk to Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
