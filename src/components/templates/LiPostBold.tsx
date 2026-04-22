// Stay Studio — LinkedIn Post — Bold layout
// Single panel, large headline centred vertically.

import type { TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";

export default function LiPostBold({ c, state }: TemplateRenderProps) {
  const { content } = state;
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
      <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 30, objectFit: "contain", alignSelf: "flex-start" }} />
      <div>
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 88,
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: c.text,
            maxWidth: 900,
            whiteSpace: "pre-wrap",
          }}
        >
          {content.headline || "We make German insurance simple."}
        </div>
        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 26,
              color: c.text,
              opacity: 0.6,
              marginTop: 20,
              lineHeight: 1.5,
            }}
          >
            {content.body}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {content.cta && (
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
            {content.cta}
          </div>
        )}
        <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 16, color: c.text, opacity: 0.4, marginLeft: "auto" }}>
          {content.url || "stayinsured.de"}
        </div>
      </div>
    </div>
  );
}
