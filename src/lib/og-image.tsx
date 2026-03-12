import { ImageResponse } from "next/og";

type OgCategory = "coffee" | "cocktails" | "site";

const themes: Record<OgCategory, { start: string; mid: string; end: string; accent: string; badge: string }> = {
  coffee: { start: "#2f1d13", mid: "#704c2d", end: "#e1ba85", accent: "#fff0d8", badge: "Coffee guide" },
  cocktails: { start: "#06292c", mid: "#0d5c63", end: "#f2b868", accent: "#fff1d8", badge: "Original cocktail" },
  site: { start: "#1e1712", mid: "#5b5046", end: "#d6c19a", accent: "#fff1d8", badge: "Grounded & Stirred" },
};

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

export function buildOgImage({
  category,
  title,
  description,
}: {
  category: OgCategory;
  title: string;
  description: string;
}) {
  const theme = themes[category];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${theme.start} 0%, ${theme.mid} 56%, ${theme.end} 100%)`,
          color: "white",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", left: 64, top: 68, width: 200, height: 200, borderRadius: 999, background: "rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", right: 64, top: 48, width: 180, height: 180, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", right: 120, bottom: 42, width: 240, height: 240, borderRadius: 999, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 92, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.18)", transform: "rotate(-8deg) translateX(-60px)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 128, height: 18, borderRadius: 999, background: theme.accent, opacity: 0.72, transform: "rotate(-8deg) translateX(-30px)" }} />

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "stretch", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "72%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>{theme.badge}</div>
              <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.02, maxWidth: 760 }}>{title}</div>
              <div style={{ fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.82)", maxWidth: 760 }}>{description}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: theme.accent }} />
              <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>Grounded & Stirred</div>
            </div>
          </div>
          <div
            style={{
              width: 250,
              borderRadius: 40,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ height: 88, borderRadius: 28, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ height: 88, borderRadius: 28, background: "rgba(0,0,0,0.16)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 18, textTransform: "uppercase", letterSpacing: 3, color: "rgba(255,255,255,0.68)" }}>Visual share card</div>
              <div style={{ fontSize: 20, lineHeight: 1.35, color: "rgba(255,255,255,0.85)" }}>Structured for editorial trust, strong taxonomy, and real enthusiast guidance.</div>
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
