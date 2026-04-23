import type { SlideRenderProps } from "@/types";
import { SlideFrame, SlideBadge, TITLE_STYLE, PAD, LABEL_STYLE } from "./slideCommon";

export default function CoverSlide({ c, slide }: SlideRenderProps) {
  const title = slide.title || "We know the rules\nso you don't have to.";
  return (
    <SlideFrame
      c={c}
      topBar={slide.accentText ? <SlideBadge c={c} text={slide.accentText} /> : null}
    >
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD}px ${PAD}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ ...TITLE_STYLE, fontSize: 168, color: c.text }}>{title}</h1>
        {slide.subtitle && (
          <div
            style={{
              marginTop: 32,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 500,
              fontSize: 36,
              color: c.text,
              opacity: 0.72,
              maxWidth: 1200,
            }}
          >
            {slide.subtitle}
          </div>
        )}
      </div>
      <div
        style={{
          padding: `0 ${PAD}px ${PAD / 2}px ${PAD}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexShrink: 0,
        }}
      >
        <div style={{ ...LABEL_STYLE, color: c.text, opacity: 0.55 }}>stayinsured.de</div>
        <div style={{ ...LABEL_STYLE, color: c.text, opacity: 0.55 }}>stay ↗</div>
      </div>
    </SlideFrame>
  );
}
