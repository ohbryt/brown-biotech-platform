import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hammer, Download, ExternalLink, Sparkles, CheckCircle2, FileCode2 } from "lucide-react";
import ServiceInquiryCard from "@/components/ServiceInquiryCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "site-forge",
  description:
    "Brown Biotech Site Forge — single-file biotech landing pages generated and shipped as ready-to-email artifacts. Outreach, conference booths, sample-brief previews.",
  alternates: { canonical: "/services/site-forge" },
  openGraph: {
    title: "Brown Biotech Site Forge — single-file biotech landing pages",
    description:
      "Generate a biotech landing page in 60 seconds. Self-contained HTML, 5 themes, accessibility built in. Free generator + 5 live samples.",
    url: "/services/site-forge",
    siteName: "Brown Biotech Inc.",
    type: "website",
    images: [
      {
        url: "/services/site-forge/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Brown Biotech Site Forge — single-file biotech landing pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brown Biotech Site Forge — single-file biotech landing pages",
    description:
      "Generate a biotech landing page in 60 seconds. Self-contained HTML, 5 themes, accessibility built in. Free generator + 5 live samples.",
    images: ["/services/site-forge/opengraph-image"],
  },
};

const samples = [
  {
    name: "peptide-service",
    label: "Peptide Service one-pager",
    description:
      "Custom synthesis + CDMO + assay-ready delivery — concise one-pager for biotech R&D teams.",
    href: "/site-forge/samples/peptide-service.html",
    theme: "cool (blue)",
    bytes: "~9 KB",
  },
  {
    name: "biostatx",
    label: "Biostatx one-pager",
    description:
      "Biostatistics + bioinformatics lane — regression, survival, dose-response, RO-Crate-reproducible figures, PRISM RAG preview.",
    href: "/site-forge/samples/biostatx.html",
    theme: "forest (green)",
    bytes: "~10 KB",
  },
  {
    name: "paid-briefs",
    label: "Paid Briefs one-pager",
    description:
      "Decision-ready research briefs — Sample / Paid / Project / Subscription tier explainer.",
    href: "/site-forge/samples/paid-briefs.html",
    theme: "cool (blue)",
    bytes: "~10 KB",
  },
  {
    name: "ondining",
    label: "On-Dining Companion one-pager",
    description:
      "Meal-sharing network pilot — verified companions, restaurant partners, Gwangju pilot context.",
    href: "/site-forge/samples/ondining.html",
    theme: "warm (orange)",
    bytes: "~9 KB",
  },
  {
    name: "business-pipeline",
    label: "Business Pipeline one-pager",
    description:
      "Company-owned operating-system lane — blueprint, source map, delivery flow, receipt template.",
    href: "/site-forge/samples/business-pipeline.html",
    theme: "mono (gray)",
    bytes: "~9 KB",
  },
];

const features = [
  {
    title: "Single self-contained HTML",
    body: "Every generated site is one file. No frameworks, no build step, no external requests. Recipient double-clicks and it opens.",
  },
  {
    title: "Korean + English content",
    body: "Body text accepts any unicode. Theme palette and section structure mirror premium biotech-consulting layouts.",
  },
  {
    title: "Accessibility built in",
    body: "Skip-link, focus-visible 3px outline, prefers-reduced-motion override, 44px touch targets, semantic landmarks.",
  },
  {
    title: "Five color themes + two heading styles",
    body: "warm / cool / forest / bold / mono palettes, sans or serif headings. Theme-tokens via CSS custom properties.",
  },
];

export default function SiteForgePage() {
  return (
    <main className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Biotech Landing Page Generation",
            name: "Brown Biotech Site Forge",
            description:
              "Single-file biotech landing pages generated and shipped as ready-to-email artifacts. Outreach, conference booths, sample-brief previews.",
            url: `${siteUrl}/services/site-forge`,
            provider: {
              "@type": "Organization",
              name: "Brown Biotech Inc.",
              url: siteUrl,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "brownbio.ocm@gmail.com",
                telephone: "+82-62-715-5377",
              },
            },
            areaServed: "Worldwide",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              description:
                "Free self-serve generator + free sample downloads. Custom one-pager engagements quoted per scope.",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Sample one-pagers",
              itemListElement: [
                "peptide-service",
                "biostatx",
                "paid-briefs",
                "ondining",
                "business-pipeline",
              ].map((name, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name,
                url: `${siteUrl}/site-forge/samples/${name}.html`,
              })),
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.16),transparent_25%),radial-gradient(circle_at_85%_30%,rgba(146,64,14,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <Hammer className="h-4 w-4 text-cta" />
              site-forge · flagship lane
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Generate a biotech landing page in under a minute.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Site Forge turns a service description into a self-contained HTML one-pager — ready to email,
              host on any static server, or attach to a Slack DM. Same single-file approach used by
              <span className="font-semibold text-cta"> peptide-service</span>,
              <span className="font-semibold text-cta"> On-Dining</span>, and
              <span className="font-semibold text-cta"> Paid Briefs</span> outreach.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/site-forge/index.html"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-cta px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 transition hover:from-primary-light hover:to-cta-light"
              >
                Open the generator <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href="#samples"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition hover:bg-white/10"
              >
                View samples <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {features.map((item) => (
            <article key={item.title} className="premium-panel rounded-[1.75rem] p-8">
              <CheckCircle2 className="h-6 w-6 text-cta" />
              <p className="mt-4 text-lg font-semibold text-text">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Live generator iframe */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-panel rounded-[2rem] p-4 lg:p-6">
          <div className="mb-4 flex items-center gap-3 px-2">
            <FileCode2 className="h-5 w-5 text-cta" />
            <span className="kicker">Live generator</span>
            <a
              href="/site-forge/index.html"
              target="_blank"
              rel="noopener"
              className="ml-auto text-xs text-cta underline-offset-4 hover:underline"
            >
              Open in new tab →
            </a>
          </div>
          <iframe
            src="/site-forge/index.html"
            title="Business Site Generator"
            className="h-[800px] w-full rounded-2xl border border-stone-200 bg-white"
            style={{ minHeight: "800px" }}
          />
          <p className="mt-3 px-2 text-xs leading-6 text-text-muted">
            Form on the left, live preview on the right. When the result looks right, click{" "}
            <strong>Download website</strong> to get a single HTML file you can email or attach.
          </p>
        </div>
      </section>

      {/* Samples */}
      <section id="samples" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <span className="kicker">Generated artifacts</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Sample one-pagers
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">
          Already-shipped examples. Each is a single self-contained HTML file — open in browser,
          attach to email, host on any static server.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s) => (
            <article
              key={s.name}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-primary/50 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cta">
                {s.label}
              </p>
              <p className="mt-3 flex-1 text-sm leading-7 text-text-muted">{s.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>theme: {s.theme}</span>
                <span>{s.bytes}</span>
              </div>
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-stone-50 px-4 py-2.5 text-sm font-semibold text-text transition hover:bg-stone-100"
              >
                <Download className="h-4 w-4" /> Open / download
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Service Inquiry */}
      <ServiceInquiryCard
        serviceName="site-forge"
        title="Request a custom one-pager"
        description="If you want a Site Forge run for a specific Brown Biotech service or a partner outreach, send the essentials here and we'll generate it."
        prompts={[
          "Which service or audience should the one-pager target?",
          "What is the goal — outreach, conference, follow-up, sample brief?",
          "Any existing copy / positioning you want incorporated?",
        ]}
      />
    </main>
  );
}