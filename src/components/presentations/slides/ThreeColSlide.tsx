import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD, resolveCanvas } from "./slideCommon";
import Pill from "../Pill";
import Icon from "../Icon";

export default function ThreeColSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const cols = (slide.columns ?? []).slice(0, 3);
  const canvas = resolveCanvas(c, canvasMode);

  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages}>
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "flex",
          flexDirection: "column",
          gap: 48,
          minHeight: 0,
        }}
      >
        <h1 style={{ ...TITLE_STYLE, fontSize: 104, color: canvas.fg, maxWidth: 1500 }}>
          {slide.title || "Our services"}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.max(1, cols.length)}, 1fr)`,
            gap: 40,
            marginTop: "auto",
            alignItems: "stretch",
          }}
        >
          {cols.map((col, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                borderRadius: 28,
                border: `2px solid ${canvas.fg}`,
                padding: "28px 28px",
                background: "transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <Pill variant="filled" accent={canvas.accent} text={canvas.fg} size="sm">
                  {String(i + 1).padStart(2, "0")}
                </Pill>
                {col.icon && (
                  <span style={{ color: canvas.fg, display: "inline-flex" }}>
                    <Icon name={col.icon} size={32} />
                  </span>
                )}
              </div>
              <h2
                style={{
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 500,
                  fontSize: 40,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  color: canvas.fg,
                }}
              >
                {col.title}
              </h2>
              <p style={{ ...BODY_STYLE, fontSize: 22, marginTop: 4, color: canvas.fg, opacity: 0.82 }}>{col.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
