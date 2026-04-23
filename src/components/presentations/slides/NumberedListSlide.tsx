import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD, resolveCanvas } from "./slideCommon";
import IllustrationBlock from "../IllustrationBlock";
import Icon from "@/components/brand/Icon";

export default function NumberedListSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const items = (slide.items ?? []).slice(0, 8);
  const canvas = resolveCanvas(c, canvasMode);
  const hasIllus = Boolean(slide.illustration);
  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages}>
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 80,
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "flex-start", minHeight: 0 }}>
          {hasIllus && (
            <div style={{ width: "100%", height: 300, flexShrink: 0 }}>
              <IllustrationBlock source={slide.illustration ?? null} radius={28} padding={48} />
            </div>
          )}
          <div>
            <h1 style={{ ...TITLE_STYLE, fontSize: 104, color: canvas.fg }}>
              {slide.title || "How we work."}
            </h1>
            {slide.body && (
              <p style={{ ...BODY_STYLE, fontSize: 24, marginTop: 20, opacity: 0.75, color: canvas.fg, maxWidth: 640 }}>
                {slide.body}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, minHeight: 0 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 24,
                alignItems: "center",
                paddingBottom: 16,
                borderBottom: `2px solid ${canvas.fg}1F`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: canvas.fg,
                  color: canvas.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                {it.icon ? <Icon name={it.icon} size={22} /> : (it.label || String(i + 1).padStart(2, "0"))}
              </div>
              <div style={{ ...BODY_STYLE, fontSize: 24, color: canvas.fg }}>{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
