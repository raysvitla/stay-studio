import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, LABEL_STYLE, PAD } from "./slideCommon";

export default function ThreeColSlide({ c, slide }: SlideRenderProps) {
  const cols = (slide.columns ?? []).slice(0, 3);
  return (
    <SlideFrame c={c}>
      <div style={{ flex: 1, padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`, display: "flex", flexDirection: "column", gap: 56 }}>
        <h1 style={{ ...TITLE_STYLE, fontSize: 112, color: c.text, maxWidth: 1500 }}>
          {slide.title || "Our services"}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.max(1, cols.length)}, 1fr)`,
            gap: 56,
            marginTop: "auto",
            alignItems: "start",
          }}
        >
          {cols.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 20, borderTop: `3px solid ${c.text}`, paddingTop: 24 }}>
              <div style={{ ...LABEL_STYLE, fontSize: 22, color: c.text, opacity: 0.55 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2
                style={{
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 500,
                  fontSize: 44,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: c.text,
                }}
              >
                {col.title}
              </h2>
              <p style={{ ...BODY_STYLE, fontSize: 22, marginTop: 8, color: c.text, opacity: 0.82 }}>{col.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
