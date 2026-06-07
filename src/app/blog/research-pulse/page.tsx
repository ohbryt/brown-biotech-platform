import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, Calendar, Microscope, FlaskConical, Zap, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

const CONTENT_DIR = path.join(process.cwd(), "content", "research-pulse");

export const metadata: Metadata = {
  title: "Research Pulse | Brown Biotech",
  description:
    "Daily research pulse from Brown Biotech — query-family hit analysis, cross-tissue insights, and decision-ready implications for fibrosis, senescence, OXPHOS, and aging pipelines.",
};

interface PulseEntry {
  filename: string;
  date: string;
  title: string;
  preview: string;
  families: string[];
  hits: number;
}

async function getPulses(): Promise<PulseEntry[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const mdFiles = files.filter((f) => f.endsWith(".md")).sort().reverse();

  const pulses: PulseEntry[] = [];
  for (const file of mdFiles) {
    try {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const dateMatch = raw.match(/##?\s*Research Pulse — (\d{4}-\d{2}-\d{2})/i);
      const date = dateMatch ? dateMatch[1] : file.replace(".md", "");
      const preview = raw
        .replace(/#.*\n/, "")
        .replace(/\n+/, " ")
        .trim()
        .slice(0, 160);

      // Count query families and hits
      const familyBlocks = raw.match(/###\s+[\d.]+\s+[A-Z]/g) || [];
      const families = familyBlocks.slice(0, 4).map((s) =>
        s.replace(/###\s+[\d.]+\s+/, "").trim()
      );
      const hitLines = (raw.match(/^- /gm) || []).length;

      pulses.push({
        filename: file,
        date,
        title: `Research Pulse — ${date}`,
        preview: preview.slice(0, 140) + "...",
        families,
        hits: hitLines,
      });
    } catch {
      // skip unreadable files
    }
  }
  return pulses;
}

export default async function ResearchPulsePage() {
  const pulses = await getPulses();
  const latest = pulses[0];
  const archives = pulses.slice(1);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-[#111109]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center">
              <Microscope className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Brown Biotech</p>
              <p className="text-sm font-medium text-white">Research Pulse</p>
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
            Brown Biotech의 daily research pulse. PubMed/PMC에서{' '}
            <span className="text-emerald-400">28 journals × 7 topics</span>를 매일 아침 스캔해서
            fibrosis, OXPHOS, ferroptosis, sarcopenia, senescence 등{' '}
            <span className="text-emerald-400">Brown pipeline-relevant query families</span>로 그룹핑합니다.
            매일 6시 KST 자동 생성.
          </p>
        </section>

        {/* Latest */}
        {latest ? (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Latest — {latest.date}
              </h2>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-[#151310] overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-900/20 to-transparent px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{latest.date}</span>
                </div>
                <h3 className="text-white font-medium">{latest.title}</h3>
              </div>

              <div className="px-6 py-5 space-y-4">
                {latest.families.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Query families scanned</p>
                    <div className="flex flex-wrap gap-2">
                      {latest.families.map((family, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-md bg-emerald-900/20 border border-emerald-700/30 text-emerald-300"
                        >
                          {family}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-zinc-600 italic">{latest.preview}</p>
                {latest.hits > 0 && (
                  <p className="text-xs text-zinc-500">
                    <span className="text-emerald-400 font-medium">{latest.hits}</span> candidate hits
                  </p>
                )}
              </div>

              <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-600">
                  Source: PubMed / PMC (28 journals, 7 topics)
                </span>
                <Link
                  href={`/blog/research-pulse/${latest.date}`}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  Full pulse <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <p className="text-zinc-500 text-sm">아직 게시된 research pulse가 없습니다.</p>
        )}

        {/* Archive */}
        {archives.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-zinc-600" />
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Archive
              </h2>
            </div>
            <div className="space-y-2">
              {archives.map((d) => (
                <Link
                  key={d.filename}
                  href={`/blog/research-pulse/${d.date}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800/60 bg-[#111109] hover:border-zinc-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-sm text-zinc-300">{d.date}</span>
                    {d.hits > 0 && (
                      <span className="text-xs text-zinc-500">· {d.hits} hits</span>
                    )}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="rounded-xl border border-zinc-800 bg-[#111109] p-6 text-center">
          <p className="text-sm text-zinc-400 mb-3">
            더 깊은 evidence-based 분석이 필요하면
          </p>
          <Link
            href="/services/business-pipeline#brief"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Request a Paid Brief <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
