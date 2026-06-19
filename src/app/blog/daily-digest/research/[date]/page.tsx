import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Calendar, FlaskConical, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

// Research digests live in public/content/daily-digest/research/ — produced
// daily at 06:00 KST by brown_biotech_research_digest_publisher.py from the
// research-watcher (PubMed/GEO scan, 27 query families).
const CONTENT_DIR = path.join(process.cwd(), "public", "content", "daily-digest", "research");

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Research Digest — ${date} | Brown Biotech`,
    description: `Brown Biotech research digest for ${date} — daily PubMed/GEO scan summarized for the biotech decision-maker.`,
  };
}

export default async function ResearchDigestDetailPage({ params }: Props) {
  const { date } = await params;
  const filename = `${date}.md`;
  const filepath = path.join(CONTENT_DIR, filename);
  let content = "";

  try {
    content = await fs.readFile(filepath, "utf-8");
  } catch {
    content = `# Research digest not found\n\nNo research digest found for ${date}.`;
  }

  // Extract H1 title for the page header (don't duplicate it inside the body)
  const titleMatch = content.match(/^#\s+(.+?)$/m);
  const pageTitle = titleMatch ? titleMatch[1] : `Research Digest — ${date}`;

  // Strip the leading H1 to avoid double-titling inside the body
  const bodyContent = content.replace(/^#\s+.+?\n+/m, "");

  return (
    <div className="min-h-screen bg-[#0C0A09] text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#111109]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/blog/daily-digest"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ← All Digests
          </Link>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-700/30 bg-emerald-900/20 rounded-full px-2.5 py-0.5">
            <FlaskConical className="w-3 h-3" /> Research
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-3 text-zinc-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{date}</span>
          <span className="text-xs text-zinc-700">·</span>
          <Link
            href={`/blog/daily-digest/${date}`}
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            View signals brief →
          </Link>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-[#0F1311] overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-900/20 to-transparent px-7 py-6 border-b border-zinc-800">
            <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
            <p className="text-xs text-zinc-500 mt-1">
              PubMed/GEO scan · research-watcher · 06:00 KST
            </p>
          </div>

          <div className="px-7 py-6">
            <article className="prose prose-invert prose-zinc prose-sm max-w-none text-zinc-300">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-zinc-300">
{bodyContent}
              </pre>
            </article>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/blog/daily-digest/${date}`}
            className="text-xs text-zinc-400 hover:text-amber-400 transition-colors"
          >
            ← Today's signals brief (HN/GeekNews)
          </Link>
          <Link
            href="/services/ai-drug-discovery#brief"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Request a Paid Brief <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
