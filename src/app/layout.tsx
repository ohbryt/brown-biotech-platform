import type { Metadata } from "next";
import "./globals.css";

const siteName = "Brown Biotech Inc.";
const siteDescription =
  "Brown Biotech Inc. helps labs, founders, and collaborators turn complex biotech questions into clear next steps through focused service lanes, pilot workflows, and decision-ready reporting.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Biotech Services & Research Support`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "drug discovery",
    "AI",
    "biotech",
    "peptide design",
    "small molecule",
    "ADMET",
    "computational chemistry",
    "biotech consulting",
    "research workflows",
    "pilot studies",
    "target analysis",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: siteName,
  creator: "Brown Biotech Inc.",
  publisher: "Brown Biotech Inc.",
  category: "biotechnology",
  openGraph: {
    title: `${siteName} | Biotech Services & Research Support`,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Brown Biotech Inc. AI-assisted biotech support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Biotech Services & Research Support`,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  other: {
    "theme-color": "#1C1917",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "brownbio.ocm@gmail.com",
        telephone: "+82-62-715-5377",
      },
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-heading antialiased">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}