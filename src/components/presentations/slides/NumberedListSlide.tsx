import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, NUM_STYLE, PAD } from "./slideCommon";

export default function NumberedListSlide({ c, slide }: SlideRenderProps) {
  const items = (slide.items ?? []).slice(0, 8);
  return (
    <SlideFrame c={c}>
      <div style={{ flex: 1, padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h1 style={{ ...TITLE_STYLE, fontSize: 112, color: c.text }}>
            {slide.title || "How we work."}
          </h1>
          {slide.body && (
            <p style={{ ...BODY_STYLE, fontSize: 24, marginTop: 24, opacity: 0.75, color: c.text, maxWidth: 640 }}>
              {slide.body}
            </p>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "96px 1fr",
                gap: 24,
                alignItems: "baseline",
                paddingBottom: 20,
                borderBottom: `2px solid ${c.text}22`,
              }}
            >
              <div style={{ ...NUM_STYLE, fontSize: 44, color: c.text }}>{it.label || String(i + 1).padStart(2, "0")}</div>
              <div style={{ ...BODY_STYLE, fontSize: 26, color: c.text }}>{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
