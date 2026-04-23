import type { SlideRenderProps } from "@/types";
import {
  SlideFrame,
  TITLE_STYLE,
  BODY_STYLE,
  PAD,
  resolveCanvas,
} from "./slideCommon";
import IllustrationBlock from "../IllustrationBlock";
import Icon from "../Icon";

export default function SectionSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const items = (slide.items ?? []).slice(0, 3);
  const canvas = resolveCanvas(c, canvasMode);
  const hasIllus = Boolean(slide.illustration);
  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages}>
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "grid",
          gridTemplateColumns: hasIllus ? "1.1fr 1fr" : "1fr",
          gap: hasIllus ? 72 : 0,
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <div style={{ maxWidth: 1400 }}>
            <h1 style={{ ...TITLE_STYLE, fontSize: hasIllus ? 96 : 120, color: canvas.fg }}>
              {slide.title || "Section title"}
            </h1>
            {slide.body && (
              <p style={{ ...BODY_STYLE, fontSize: 28, marginTop: 20, color: canvas.fg, opacity: 0.78, maxWidth: 1100 }}>
                {slide.body}
              </p>
            )}
          </div>
          {items.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: "auto" }}>
              {items.map((it, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 24, alignItems: "center" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: canvas.fg,
                      color: canvas.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Mukta', sans-serif",
                      fontWeight: 500,
                      fontSize: 22,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {it.icon ? <Icon name={it.icon} size={24} /> : (it.label || String(i + 1).padStart(2, "0"))}
                  </div>
                  <div style={{ ...BODY_STYLE, fontSize: 26, color: canvas.fg }}>{it.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {hasIllus && (
          <div style={{ width: "100%", height: "100%", minHeight: 520, display: "flex" }}>
            <IllustrationBlock source={slide.illustration ?? null} radius={36} padding={72} />
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
