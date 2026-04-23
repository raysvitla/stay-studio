import type { CSSProperties } from "react";
import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, BODY_STYLE, PAD, resolveCanvas } from "./slideCommon";
import IllustrationBlock from "../IllustrationBlock";

export default function StatsSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const stats = (slide.stats ?? []).slice(0, 4);
  const canvas = resolveCanvas(c, canvasMode);
  const hasIllus = Boolean(slide.illustration);

  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages}>
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "grid",
          gridTemplateColumns: hasIllus ? "1fr 1.3fr" : "1fr",
          gap: hasIllus ? 64 : 0,
          minHeight: 0,
        }}
      >
        {hasIllus ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 32, minHeight: 0 }}>
            <h1 style={{ ...TITLE_STYLE, fontSize: 88, color: canvas.fg }}>
              {slide.title || "By the numbers."}
            </h1>
            <div style={{ flex: 1, minHeight: 0 }}>
              <IllustrationBlock source={slide.illustration ?? null} radius={36} padding={48} />
            </div>
          </div>
        ) : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 32, minHeight: 0 }}>
          {!hasIllus && (
            <h1 style={{ ...TITLE_STYLE, fontSize: 104, color: canvas.fg }}>
              {slide.title || "By the numbers."}
            </h1>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: stats.length >= 3 ? "1fr 1fr" : `repeat(${Math.max(1, stats.length)}, 1fr)`,
              gridAutoRows: "1fr",
              gap: 24,
              flex: 1,
              minHeight: 0,
            }}
          >
            {stats.map((s, i) => {
              // Checkerboard: even-index cards filled with accent, odd outlined.
              const filled = i % 2 === 0;
              const cardStyle: CSSProperties = filled
                ? { background: canvas.accent, color: canvas.fg, border: `2px solid ${canvas.fg}` }
                : { background: "transparent", color: canvas.fg, border: `2px solid ${canvas.fg}` };
              return (
                <div
                  key={i}
                  style={{
                    ...cardStyle,
                    borderRadius: 28,
                    padding: "28px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 12,
                    minHeight: 180,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Mukta', sans-serif",
                      fontWeight: 400,
                      fontSize: hasIllus ? 108 : 128,
                      lineHeight: 0.9,
                      letterSpacing: "-0.045em",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ ...BODY_STYLE, fontSize: 22, opacity: 0.82 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
