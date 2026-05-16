import Link from "next/link";
import { FlaskConical, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cta flex items-center justify-center">
                <FlaskConical className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Brown Biotech</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              AI-first, human-controlled research support and service lanes for labs, founders, and collaborators.
              Built for clearer scopes, cleaner handoffs, and better next steps.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Proof", href: "#proof" },
                { label: "Service Hub", href: "/services" },
                { label: "Operator", href: "/operator" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
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

          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <a
                  href="tel:+82-62-715-5377"
                  className="text-sm text-gray-400 hover:text-primary-light transition-colors duration-200 cursor-pointer"
                >
                  +82-62-715-5377
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
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
          <p className="text-sm text-gray-500 font-[family-name:var(--font-mono)]">
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
