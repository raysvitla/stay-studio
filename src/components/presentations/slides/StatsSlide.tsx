import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD } from "./slideCommon";

export default function StatsSlide({ c, slide }: SlideRenderProps) {
  const stats = (slide.stats ?? []).slice(0, 4);
  return (
    <SlideFrame c={c}>
      <div style={{ flex: 1, padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`, display: "flex", flexDirection: "column", gap: 56 }}>
        <h1 style={{ ...TITLE_STYLE, fontSize: 104, color: c.text, maxWidth: 1500 }}>
          {slide.title || "By the numbers."}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.max(1, stats.length)}, 1fr)`,
            gap: 40,
            marginTop: "auto",
            alignItems: "end",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 20, borderTop: `3px solid ${c.text}`, paddingTop: 24 }}>
              <div
                style={{
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 400,
                  fontSize: 168,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  color: c.text,
                }}
              >
                {s.value}
              </div>
              <div style={{ ...BODY_STYLE, fontSize: 22, color: c.text, opacity: 0.78 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
