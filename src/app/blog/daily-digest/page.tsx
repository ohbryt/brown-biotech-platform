import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, Calendar, Brain, Zap, FlaskConical } from "lucide-react";

export const dynamic = "force-dynamic";

const CONTENT_DIR = path.join(process.cwd(), "..", "..", "content", "daily-digest");

export const metadata: Metadata = {
  title: "Daily Digest | Brown Biotech",
  description:
    "Daily AI/tech/biotech signal briefs from Brown Biotech — decision-ready insights on deal flow, regulatory shifts, and research tooling.",
};

interface DigestEntry {
  filename: string;
  date: string;
  title: string;
  preview: string;
  signals: string[];
}

async function getDigests(): Promise<DigestEntry[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const mdFiles = files.filter((f) => f.endsWith(".md")).sort().reverse();

  const digests: DigestEntry[] = [];
  for (const file of mdFiles) {
    try {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const dateMatch = raw.match(/##?\s*Brown Biotech Daily Tech Digest — (\d{4}-\d{2}-\d{2})/i);
      const date = dateMatch ? dateMatch[1] : file.replace(".md", "");
      const preview = raw
        .replace(/#.*\n/, "")
        .replace(/\n+/, " ")
        .trim()
        .slice(0, 160);

      const signalBlocks = raw.match(/\d+\.\s+\*\*[^*]+\*\*/g) || [];
      const signals = signalBlocks.slice(0, 3).map((s) =>
        s.replace(/\d+\.\s+\*\*([^*]+)\*\*/g, "$1")
      );

      digests.push({
        filename: file,
        date,
        title: `Daily Tech Digest — ${date}`,
        preview: preview.slice(0, 140) + "...",
        signals,
      });
    } catch {
      // skip unreadable files
    }
  }
  return digests;
}

export default async function DailyDigestPage() {
  const digests = await getDigests();
  const latest = digests[0];
  const archives = digests.slice(1);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-[#111109]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-900/40 border border-amber-700/30 flex items-center justify-center">
              <Brain className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Brown Biotech</p>
              <p className="text-sm font-medium text-white">Daily Tech Digest</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← brownbio.tech
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Tagline */}
        <section className="border-b border-zinc-800 pb-8">
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
            Brown Biotech의 daily signal brief. AI/tech/biotech 헤드라인을{' '}
            <span className="text-amber-400">decision-ready</span> 형태로 정리합니다.
            매일 6시 KST 자동 생성.
          </p>
        </section>

        {/* Latest */}
        {latest ? (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Latest — {latest.date}
              </h2>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-[#151310] overflow-hidden">
              <div className="bg-gradient-to-r from-amber-900/20 to-transparent px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{latest.date}</span>
                </div>
                <h3 className="text-white font-medium">{latest.title}</h3>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="space-y-3">
                  {latest.signals.map((signal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-900/30 border border-amber-700/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-amber-400 font-medium">{i + 1}</span>
                      </span>
                      <p className="text-sm text-zinc-300 leading-relaxed">{signal}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-zinc-600 italic">{latest.preview}</p>
              </div>

              <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-600">
                  Source: Hacker News, GeekNews, Reddit ML, Isomorphic Labs
                </span>
                <Link
                  href={`/blog/daily-digest/${latest.date}`}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  Full brief <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <p className="text-zinc-500 text-sm">아직 게시된 digest가 없습니다.</p>
        )}

        {/* Archive */}
        {archives.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4 text-zinc-600" />
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Archive
              </h2>
            </div>
            <div className="space-y-2">
              {archives.map((d) => (
                <Link
                  key={d.filename}
                  href={`/blog/daily-digest/${d.date}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800/60 bg-[#111109] hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-sm text-zinc-300">{d.date}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="rounded-xl border border-zinc-800 bg-[#111109] p-6 text-center">
          <p className="text-sm text-zinc-400 mb-3">
            더 많은 evidence-based insight가 필요하면
          </p>
          <Link
            href="/services/business-pipeline#brief"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-700/80 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
          >
            Request a Paid Brief <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
