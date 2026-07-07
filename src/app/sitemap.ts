import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brownbio.tech";

const serviceRoutes: Array<{ path: string; priority?: number }> = [
  { path: "/services/peptide-service", priority: 0.8 },
  { path: "/services/biostatx", priority: 0.7 },
  { path: "/services/genox-site", priority: 0.7 },
  { path: "/services/ai-drug-discovery", priority: 0.7 },
  { path: "/services/research-intelligence", priority: 0.7 },
  { path: "/services/strict-omics", priority: 0.7 },
  { path: "/services/business-pipeline", priority: 0.7 },
  { path: "/services/arp-engine", priority: 0.8 },
  { path: "/services/site-forge", priority: 0.8 },
  { path: "/services/pricing", priority: 0.6 },
  { path: "/services/inventa", priority: 0.5 },
  { path: "/services/ondining", priority: 0.5 },
];

const siteForgeSamples = [
  "peptide-service",
  "biostatx",
  "paid-briefs",
  "ondining",
  "business-pipeline",
];

const otherRoutes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...serviceRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority ?? 0.7,
    })),
    ...otherRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    {
      url: `${siteUrl}/blog/daily-digest`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/research-pulse`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...siteForgeSamples.map((name) => ({
      url: `${siteUrl}/site-forge/samples/${name}.html`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
