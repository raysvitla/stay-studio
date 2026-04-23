import type { SlideRenderProps } from "@/types";
import {
  SlideFrame,
  TITLE_STYLE,
  BODY_STYLE,
  NUM_STYLE,
  PAD,
} from "./slideCommon";

export default function SectionSlide({ c, slide }: SlideRenderProps) {
  const items = (slide.items ?? []).slice(0, 3);
  return (
    <SlideFrame c={c}>
      <div style={{ flex: 1, padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`, display: "flex", flexDirection: "column", gap: 48 }}>
        <div style={{ maxWidth: 1400 }}>
          <h1 style={{ ...TITLE_STYLE, fontSize: 120, color: c.text }}>
            {slide.title || "Section title"}
          </h1>
          {slide.body && (
            <p style={{ ...BODY_STYLE, fontSize: 30, marginTop: 24, color: c.text, opacity: 0.8, maxWidth: 1200 }}>
              {slide.body}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 40, marginTop: "auto" }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `3px solid ${c.text}`, paddingTop: 20 }}>
                <div style={{ ...NUM_STYLE, color: c.text, opacity: 0.9 }}>{it.label || String(i + 1).padStart(2, "0")}</div>
                <div style={{ ...BODY_STYLE, fontSize: 22, color: c.text }}>{it.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
