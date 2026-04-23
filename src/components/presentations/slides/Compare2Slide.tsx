import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD, resolveCanvas } from "./slideCommon";
import Pill from "../Pill";
import Icon from "../Icon";

export default function Compare2Slide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const canvas = resolveCanvas(c, canvasMode);
  const left = slide.left ?? { title: "", body: "" };
  const right = slide.right ?? { title: "", body: "" };

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
          {slide.title || "The dual system"}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 48, marginTop: "auto", alignItems: "stretch" }}>
          <Side side={left} canvas={canvas} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px" }}>
            <Pill variant="dark" accent={canvas.accent} text={canvas.fg} size="lg">
              VS
            </Pill>
          </div>
          <Side side={right} canvas={canvas} />
        </div>
      </div>
    </SlideFrame>
  );
}

function Side({
  side,
  canvas,
}: {
  side: { title: string; body: string; icon?: import("@/types").SlideIconName | null };
  canvas: ReturnType<typeof resolveCanvas>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        borderRadius: 28,
        border: `2px solid ${canvas.fg}`,
        padding: "32px 32px",
        background: "transparent",
      }}
    >
      {side.icon && (
        <div style={{ color: canvas.fg, display: "inline-flex" }}>
          <Icon name={side.icon} size={40} />
        </div>
      )}
      <h2
        style={{
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 500,
          fontSize: 52,
          lineHeight: 1,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          margin: 0,
          color: canvas.fg,
        }}
      >
        {side.title}
      </h2>
      <p style={{ ...BODY_STYLE, fontSize: 24, color: canvas.fg, opacity: 0.82 }}>{side.body}</p>
    </div>
  );
}
