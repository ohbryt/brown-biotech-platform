import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
            ⚗
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              Brown Biotech Inc.
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}>
              AI-assisted research support
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.02, fontWeight: 800, letterSpacing: -2 }}>
            Faster biotech decisions.
            <br />
            Clearer pilots. Better next steps.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.82)", maxWidth: 820 }}>
            Structured analysis, transparent methods, and decision-ready reports for small molecules and peptides.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            "Pilot-friendly",
            "Research-use only",
            "Transparent methods",
            "Decision-ready reporting",
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
