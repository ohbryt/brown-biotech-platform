"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FlaskConical, ChevronDown, BookOpen, FileText, Layers } from "lucide-react";

type NavItem =
  | { label: string; href: string; type: "link" }
  | { label: string; type: "dropdown"; items: { label: string; href: string; description?: string; icon?: React.ComponentType<{ className?: string }> }[] };

const navLinks: NavItem[] = [
  { label: "Services", href: "/services", type: "link" },
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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-primary-light px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
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
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-dark/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                        >
                          {link.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/5"
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
                  className="text-sm font-medium text-gray-400 hover:text-primary-light px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              href="/services"
              className="ml-2 border border-white/10 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Service Hub
            </Link>
            <Link
              href="/#contact"
              className="ml-2 bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 cursor-pointer"
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
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                if (link.type === "dropdown") {
                  return (
                    <div key={link.label} className="space-y-1">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                        {link.label}
                      </div>
                      {link.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-all duration-200 py-2 pl-6 pr-3 rounded-lg cursor-pointer"
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
                    className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-all duration-200 py-2.5 px-3 rounded-lg cursor-pointer"
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="block border border-white/10 text-gray-200 hover:text-white hover:bg-white/5 transition-all duration-200 py-2.5 px-3 rounded-lg cursor-pointer mt-2"
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
