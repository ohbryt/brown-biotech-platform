"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-dark rounded-2xl border border-white/10 shadow-lg shadow-dark/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center">
              <FlaskConical className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Brown Biotech
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-primary-light px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Book a Pilot Call
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 hover:text-white cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-primary-light hover:bg-white/5 transition-all duration-200 py-2.5 px-3 rounded-lg cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block bg-gradient-to-r from-primary to-cta text-white text-center font-semibold px-5 py-2.5 rounded-xl mt-3 cursor-pointer"
              >
                Book a Pilot Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
