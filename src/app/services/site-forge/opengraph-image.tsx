import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function SiteForgeOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(135deg, #1C1917 0%, #3F2A12 45%, #92400E 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            🔨
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              Brown Biotech · Site Forge
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}>
              Single-file biotech landing pages · flagship lane
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 60, lineHeight: 1.02, fontWeight: 800, letterSpacing: -2 }}>
            Generate a biotech
            <br />
            landing page in 60 seconds.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.35, color: "rgba(255,255,255,0.82)", maxWidth: 820 }}>
            Self-contained HTML · 5 themes × 2 heading styles · accessibility built in. Email, host, or attach — no build step.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            "Free generator",
            "5 live samples",
            "Email-ready",
            "WCAG-friendly",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 20,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}