import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, PAD } from "./slideCommon";

export default function ThanksSlide({ c, slide }: SlideRenderProps) {
  return (
    <SlideFrame c={c}>
      <div
        style={{
          flex: 1,
          padding: `${PAD}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
        }}
      >
        <h1 style={{ ...TITLE_STYLE, fontSize: 176, color: c.text, maxWidth: 1600 }}>
          {slide.title || "Thanks for choosing\nand trusting us."}
        </h1>
        {slide.subtitle && (
          <div
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 500,
              fontSize: 32,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: c.text,
              opacity: 0.6,
            }}
          >
            {slide.subtitle}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
