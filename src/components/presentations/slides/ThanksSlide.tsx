import type { SlideRenderProps } from "@/types";
import { SlideFrame, TITLE_STYLE, PAD, resolveCanvas } from "./slideCommon";
import RichText from "../RichText";
import Pill from "../Pill";
import Icon from "../Icon";

export default function ThanksSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const canvas = resolveCanvas(c, canvasMode);
  // Thanks slide uses the accent colour as its background — it's the closer,
  // so we want it to feel warm and branded, not blank white.
  const bg = canvas.accent;
  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages} bg={bg}>
      <div style={{ position: "absolute", top: PAD / 2, right: PAD, color: canvas.fg, zIndex: 2 }}>
        <Icon name="clover" size={72} />
      </div>
      <div
        style={{
          flex: 1,
          padding: `${PAD}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
        }}
      >
        <RichText
          as="h1"
          text={slide.title || "Thanks for {icon:globe} choosing\nand {icon:handshake} trusting us."}
          iconScale={0.85}
          style={{ ...TITLE_STYLE, fontSize: 160, color: canvas.fg, maxWidth: 1600 }}
        />
        {slide.subtitle && (
          <Pill variant="dark" accent={canvas.accent} text={canvas.fg} size="md">
            {slide.subtitle} <span style={{ marginLeft: 8, display: "inline-flex", verticalAlign: "-0.1em" }}>
              <Icon name="arrow-up-right" size={18} />
            </span>
          </Pill>
        )}
      </div>
    </SlideFrame>
  );
}
