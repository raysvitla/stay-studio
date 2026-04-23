import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, PAD, resolveCanvas } from "./slideCommon";
import Pill from "@/components/brand/Pill";
import RichText from "@/components/brand/RichText";
import IllustrationBlock from "../IllustrationBlock";

export default function CoverSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const title = slide.title || "We know the rules\nso you don't have to.";
  const canvas = resolveCanvas(c, canvasMode);
  const hasIllus = Boolean(slide.illustration);
  return (
    <SlideFrame
      c={c}
      canvasMode={canvasMode}
      pageNumber={pageNumber}
      totalPages={totalPages}
      topBar={
        slide.accentText ? (
          <Pill variant="filled" accent={canvas.accent} text={canvas.fg} size="md">
            {slide.accentText}
          </Pill>
        ) : null
      }
    >
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "grid",
          gridTemplateColumns: hasIllus ? "1.15fr 1fr" : "1fr",
          gap: hasIllus ? 72 : 0,
          alignItems: "center",
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <RichText
            as="h1"
            text={title}
            iconScale={0.85}
            style={{ ...TITLE_STYLE, fontSize: hasIllus ? 128 : 168, color: canvas.fg }}
          />
          {slide.subtitle && (
            <div
              style={{
                marginTop: 28,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 500,
                fontSize: 34,
                color: canvas.fg,
                opacity: 0.72,
                maxWidth: 1200,
              }}
            >
              {slide.subtitle}
            </div>
          )}
        </div>
        {hasIllus && (
          <div style={{ width: "100%", height: "100%", minHeight: 520, display: "flex" }}>
            <IllustrationBlock source={slide.illustration ?? null} radius={36} padding={64} />
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
