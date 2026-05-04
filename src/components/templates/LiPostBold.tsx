// Stay Studio — LinkedIn Post — Bold layout
// Single panel, large headline centred vertically.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, headlineScale, logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function LiPostBold({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const bs = bodyScale(content.bodySize);
  const hs = headlineScale(content.headlineSize);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "52px 80px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {!content.hideLogo ? (
        <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 30, objectFit: "contain", alignSelf: "flex-start" }} />
      ) : (
        <span />
      )}
      <div>
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 88 * hs,
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: c.text,
            maxWidth: 900,
            whiteSpace: "pre-wrap",
          }}
        >
          <RichText text={content.headline || "We make German insurance simple."} />
        </div>
        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 26 * bs,
              color: c.text,
              opacity: 0.6,
              marginTop: 20,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {content.cta && !content.hideCta && (
          <div
            style={{
              background: c.text,
              color: c.bg,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              borderRadius: 9,
              padding: "11px 26px",
            }}
          >
            <RichText text={content.cta} />
          </div>
        )}
        {!content.hideUrl && (
          <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 16, color: c.text, opacity: 0.4, marginLeft: "auto" }}>
            {content.url || "stayinsured.de"}
          </div>
        )}
      </div>
    </div>
  );
}
