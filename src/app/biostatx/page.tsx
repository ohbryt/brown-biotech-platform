import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart3, Brain, Zap, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function BiostatX() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-8">
            <BarChart3 className="h-4 w-4" />
            Statistical Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            biostatx
            <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-3">
              생체통계, 검색이 아닌 결론으로
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Raw data를 넣으면 decision-ready brief가 나오는 생체통계 플랫폼.
            SPSS, GraphPad Prism 대신 브라우저에서 바로 분석.
            Korean biomedical researchers를 위한 프리미엄 무기고.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://biostatx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
            >
              앱 열기
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/ohbryt/biostatx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "통계 검정", value: "10+" },
            { label: "사용자", value: "Beta" },
            { label: "월 목표 수익", value: "₩1M" },
            { label: "데이터 보안", value: "Browser-side" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflows */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Claude Code Workflows
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              통계 분석 → 리뷰 → 테스트 → 배포. 모든 단계가 자동화된 워크플로우.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "/report",
                desc: "데이터 → 통계 분석 → 차트 → Notion brief",
                detail: "Raw data 입력하면 4단계流水線が 자동으로 실행. decision-ready brief 출력.",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "/review",
                desc: "PR 리뷰 — 보안 / 로직 / 표준 감사",
                detail: "src/lib/, src/components/ 모든 변경사항 자동監査. merge 전 필수.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "/test",
                desc: "테스트 자동 생성 — 유닛 + 컴포넌트",
                detail: "새 컴포넌트 생성 시 테스트 파일 자동 생성. 커버리지 리포트 포함.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "/deploy",
                desc: "배포 전 QA — 빌드 / env / 의존성 / 링크",
                detail: "Vercel 배포 전 필수 QA 체크. 빌드 실패 시 자동 블로크.",
              },
            ].map((wf) => (
              <div
                key={wf.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-primary-light">{wf.icon}</div>
                  <h3 className="text-lg font-semibold text-white font-mono">{wf.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-2">{wf.desc}</p>
                <p className="text-gray-500 text-sm">{wf.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                plan: "Free",
                price: "₩0",
                features: ["8 tests", "RT-PCR", "BioPlot basic"],
                highlight: false,
              },
              {
                plan: "Pro",
                price: "₩12,900/mo",
                features: ["+ Survival Analysis", "+ Curve Fitting 9 models", "+ AI Figure 50/mo", "+ SVG export"],
                highlight: true,
              },
              {
                plan: "Team",
                price: "₩39,900/mo",
                features: ["+ 10 members", "+ API access", "+ SSO / HIPAA", "+ AI Figure 200/mo"],
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.plan}
                className={`p-6 rounded-2xl ${
                  p.highlight
                    ? "bg-gradient-to-b from-primary/20 to-cta/10 border-2 border-primary/40"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="text-sm font-medium text-gray-400 mb-2">{p.plan}</div>
                <div className="text-2xl font-bold text-white mb-6">{p.price}</div>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-primary-light mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
           통계 분석, 이제는 검색이 아닌 결론으로
          </h2>
          <p className="text-gray-400 mb-8">
            biostatx — Brown Biotech의 Statistical Intelligence Layer.
            <br />
            데이터만 있으면, 10분 안에 decision-ready brief.
          </p>
          <a
            href="https://biostatx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-cta hover:from-primary-light hover:to-cta-light text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
          >
            앱 시작하기
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}