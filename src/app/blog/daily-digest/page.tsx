import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, Calendar, Brain, Zap, FlaskConical, Microscope } from "lucide-react";

export const dynamic = "force-dynamic";

// public/ is automatically included in the Vercel deployment bundle,
// so fs.readFile from this path works at request time.
const CONTENT_DIR = path.join(process.cwd(), "public", "content", "daily-digest");
// Research digests (06:00 KST, research-watcher / PubMed-GEO) live in a subdir.
const RESEARCH_DIR = path.join(process.cwd(), "public", "content", "daily-digest", "research");

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
  kind: "signals" | "research";
}

async function getDigests(): Promise<DigestEntry[]> {
  const out: DigestEntry[] = [];

  // 1. Signals digests (07:00 KST, HN/GeekNews) — {date}.md
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort().reverse();
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

        out.push({
          filename: file,
          date,
          title: `Daily Tech Digest — ${date}`,
          preview: preview.slice(0, 140) + "...",
          signals,
          kind: "signals",
        });
      } catch {
        // skip unreadable files
      }
    }
  } catch {
    // CONTENT_DIR doesn't exist yet — first run
  }

  // 2. Research digests (06:00 KST, research-watcher / PubMed-GEO) — research/{date}.md
  try {
    const files = await fs.readdir(RESEARCH_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort().reverse();
    for (const file of mdFiles) {
      try {
        const raw = await fs.readFile(path.join(RESEARCH_DIR, file), "utf-8");
        const dateMatch = raw.match(/Brown Biotech Research Digest — (\d{4}-\d{2}-\d{2})/i);
        const date = dateMatch ? dateMatch[1] : file.replace(".md", "");

        // Find the 3 finding headers (### 1., ### 2., ### 3.) — these are the
        // "signals" for the index card preview.
        const findingBlocks = raw.match(/###\s+\d+\.\s+[^\n]+/g) || [];
        const findings = findingBlocks
          .slice(0, 3)
          .map((s) => s.replace(/###\s+\d+\.\s+/, "").trim());

        const preview = (raw
          .replace(/#.*\n/, "")
          .replace(/\n+/, " ")
          .trim()
          .slice(0, 160)) + "...";

        out.push({
          filename: `research/${file}`,
          date,
          title: `Research Digest — ${date}`,
          preview,
          signals: findings,
          kind: "research",
        });
      } catch {
        // skip unreadable files
      }
    }
  } catch {
    // RESEARCH_DIR doesn't exist yet — first run
  }

  // Sort by date desc
  out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return out;
}

export default async function DailyDigestPage() {
  const allDigests = await getDigests();
  // Two parallel tracks per day: signals (HN/GeekNews) + research (PubMed/GEO).
  // We treat them as independent series — both should surface as "Latest".
  const latestSignals = allDigests.find((d) => d.kind === "signals");
  const latestResearch = allDigests.find((d) => d.kind === "research");
  const archives = allDigests.filter((d) => d !== latestSignals && d !== latestResearch);

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
            매일 6시 KST 자동 생성. 두 개의 트랙이 매일 발행됩니다 —{' '}
            <span className="text-amber-300">Signals</span> (HN/GeekNews) +{' '}
            <span className="text-emerald-300">Research</span> (PubMed/GEO).
          </p>
        </section>

        {/* Latest — Signals (07:00 KST, HN/GeekNews) */}
        {latestSignals && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Latest Signals — {latestSignals.date}
              </h2>
              <span className="text-[10px] text-zinc-600 ml-auto">07:00 KST · HN/GeekNews</span>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-[#151310] overflow-hidden">
              <div className="bg-gradient-to-r from-amber-900/20 to-transparent px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{latestSignals.date}</span>
                </div>
                <h3 className="text-white font-medium">{latestSignals.title}</h3>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="space-y-3">
                  {latestSignals.signals.map((signal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-900/30 border border-amber-700/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-amber-400 font-medium">{i + 1}</span>
                      </span>
                      <p className="text-sm text-zinc-300 leading-relaxed">{signal}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-zinc-600 italic">{latestSignals.preview}</p>
              </div>

              <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-600">
                  Source: Hacker News, GeekNews, Reddit ML
                </span>
                <Link
                  href={`/blog/daily-digest/${latestSignals.date}`}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  Full brief <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest — Research (06:00 KST, research-watcher / PubMed-GEO) */}
        {latestResearch && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Microscope className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Latest Research — {latestResearch.date}
              </h2>
              <span className="text-[10px] text-zinc-600 ml-auto">06:00 KST · PubMed/GEO</span>
            </div>
            <div className="rounded-xl border border-emerald-900/40 bg-[#0F1311] overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-900/20 to-transparent px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{latestResearch.date}</span>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-700/30 bg-emerald-900/20 rounded-full px-2 py-0.5 ml-1">
                    Research
                  </span>
                </div>
                <h3 className="text-white font-medium">{latestResearch.title}</h3>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="space-y-3">
                  {latestResearch.signals.length > 0 ? (
                    latestResearch.signals.map((signal, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-emerald-400 font-medium">{i + 1}</span>
                        </span>
                        <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">{signal}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-400 italic">No findings preview available.</p>
                  )}
                </div>

                <p className="text-xs text-zinc-600 italic">{latestResearch.preview}</p>
              </div>

              <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-600">
                  Source: research-watcher (PubMed/GEO)
                </span>
                <Link
                  href={`/blog/daily-digest/research/${latestResearch.date}`}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  Full brief <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {!latestSignals && !latestResearch && (
          <p className="text-zinc-500 text-sm">아직 게시된 digest가 없습니다.</p>
        )}

        {/* Archive — grouped by kind */}
        {archives.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4 text-zinc-600" />
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Archive
              </h2>
            </div>
            <div className="space-y-2">
              {archives.map((d) => {
                const href =
                  d.kind === "research"
                    ? `/blog/daily-digest/research/${d.date}`
                    : `/blog/daily-digest/${d.date}`;
                const badgeColor =
                  d.kind === "research"
                    ? "text-emerald-400 border-emerald-700/30 bg-emerald-900/20"
                    : "text-amber-400 border-amber-700/30 bg-amber-900/20";
                const badgeText = d.kind === "research" ? "Research" : "Signals";
                return (
                  <Link
                    key={d.filename}
                    href={href}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800/60 bg-[#111109] hover:border-zinc-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-sm text-zinc-300">{d.date}</span>
                      <span
                        className={`text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${badgeColor}`}
                      >
                        {badgeText}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 text-zinc-600 group-hover:${
                        d.kind === "research" ? "text-emerald-400" : "text-amber-400"
                      } transition-colors`}
                    />
                  </Link>
                );
              })}
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
