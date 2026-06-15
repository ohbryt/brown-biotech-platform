import Link from "next/link";
import { FlaskConical, Mail, Phone, ArrowUpRight } from "lucide-react";

const productLinks = [
  { label: "peptide-service", href: "/services/peptide-service" },
  { label: "biostatx", href: "/services/biostatx" },
  { label: "genox-site", href: "/services/genox-site" },
  { label: "ai-drug-discovery", href: "/services/ai-drug-discovery" },
  { label: "research-intelligence", href: "/services/research-intelligence" },
  { label: "strict-omics", href: "/services/strict-omics" },
];

const companyLinks = [
  { label: "Service Hub", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Operator", href: "/operator" },
  { label: "Pricing", href: "/services/pricing" },
  { label: "Contact", href: "/#contact" },
];

const insightLinks = [
  { label: "Daily Tech Digest", href: "/blog/daily-digest" },
  { label: "Research Pulse", href: "/blog/research-pulse" },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center">
                <FlaskConical className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Brown Biotech</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              AI-first, human-controlled research support and service lanes for labs, founders, and collaborators.
            </p>
          </div>

          {/* Service lanes */}
          <div>
            <h4 className="text-xs font-bold text-white mb-5 uppercase tracking-[0.22em]">
              Service lanes
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 font-mono cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white mb-5 uppercase tracking-[0.22em]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights + Contact */}
          <div>
            <h4 className="text-xs font-bold text-white mb-5 uppercase tracking-[0.22em]">
              Insights
            </h4>
            <ul className="space-y-2.5 mb-6">
              {insightLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-[0.22em]">
              Contact
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-gray-500" />
                <a
                  href="tel:+82-62-715-5377"
                  className="text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                >
                  +82-62-715-5377
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-gray-500" />
                <a
                  href="mailto:brownbio.ocm@gmail.com"
                  className="text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                >
                  brownbio.ocm@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center space-y-2">
          <p className="text-sm text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Brown Biotech Inc. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Research support only. Not intended as medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
