import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

// public/ is automatically included in the Vercel deployment bundle,
// so fs.readFile from this path works at request time.
const CONTENT_DIR = path.join(process.cwd(), "public", "content", "daily-digest");

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Daily Tech Digest — ${date} | Brown Biotech`,
    description: `Brown Biotech daily signal brief for ${date}.`,
  };
}

export default async function DigestDetailPage({ params }: Props) {
  const { date } = await params;
  const filename = `${date}.md`;
  const filepath = path.join(CONTENT_DIR, filename);
  let content = "";

  try {
    content = await fs.readFile(filepath, "utf-8");
  } catch {
    content = `# Digest not found\n\nNo digest found for ${date}.`;
  }

  // Simple markdown strip for preview (keep bold/lists)
  const bodyHtml = content
    .replace(/\n##?\s+Top Signals.*/i, "")
    .replace(/\n###\s+Brown Biotech Insights.*/i, "")
    .replace(/\n###\s+Next Action.*/i, "")
    .replace(/<\/?.+?>/g, "")
    .trim();

  return (
    <div className="min-h-screen bg-[#0C0A09] text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#111109]">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <Link
            href="/blog/daily-digest"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ← All Digests
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-3 text-zinc-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{date}</span>
        </div>

        <div className="rounded-xl border border-zinc-700/60 bg-[#151310] overflow-hidden">
          <div className="bg-gradient-to-r from-amber-900/20 to-transparent px-7 py-6 border-b border-zinc-800">
            <h1 className="text-xl font-semibold text-white">
              Daily Tech Digest — {date}
            </h1>
          </div>

          <div className="px-7 py-6">
            <article className="prose prose-invert prose-zinc prose-sm max-w-none text-zinc-300">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-zinc-300">
{content}
              </pre>
            </article>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <Link
            href="/services/business-pipeline#brief"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-700/80 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
          >
            Request a Paid Brief <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
