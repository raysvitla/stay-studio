import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD } from "./slideCommon";

export default function Compare2Slide({ c, slide }: SlideRenderProps) {
  const left = slide.left ?? { title: "", body: "" };
  const right = slide.right ?? { title: "", body: "" };
  return (
    <SlideFrame c={c}>
      <div style={{ flex: 1, padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`, display: "flex", flexDirection: "column", gap: 56 }}>
        <h1 style={{ ...TITLE_STYLE, fontSize: 112, color: c.text, maxWidth: 1500 }}>
          {slide.title || "The dual system"}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 48, marginTop: "auto", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `3px solid ${c.text}`, paddingTop: 24 }}>
            <h2
              style={{
                fontFamily: "'Mukta', sans-serif",
                fontWeight: 500,
                fontSize: 56,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: 0,
                color: c.text,
              }}
            >
              {left.title}
            </h2>
            <p style={{ ...BODY_STYLE, fontSize: 24, color: c.text, opacity: 0.82 }}>{left.body}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 400,
              fontSize: 160,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: c.text,
              opacity: 0.85,
              padding: "0 24px",
            }}
          >
            vs
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `3px solid ${c.text}`, paddingTop: 24 }}>
            <h2
              style={{
                fontFamily: "'Mukta', sans-serif",
                fontWeight: 500,
                fontSize: 56,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: 0,
                color: c.text,
              }}
            >
              {right.title}
            </h2>
            <p style={{ ...BODY_STYLE, fontSize: 24, color: c.text, opacity: 0.82 }}>{right.body}</p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
