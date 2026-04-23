// Stay Studio — Quote card
// Oversized quote with attribution pill below. Good for testimonials and
// positioning statements. Reuses `headline` as the quote body and `body`
// as the attribution line.

import type { TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgQuote({ c, state }: TemplateRenderProps) {
  const { content } = state;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        padding: 80,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 40, objectFit: "contain" }} />

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -20,
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 500,
            fontSize: 280,
            lineHeight: 0.8,
            color: c.accent,
            pointerEvents: "none",
          }}
        >
          &ldquo;
        </div>

        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 80,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: c.text,
            position: "relative",
            zIndex: 1,
          }}
        >
          <RichText text={content.headline || "Stay actually made German insurance feel easy."} />
        </div>

        {content.body && (
          <div
            style={{
              marginTop: 36,
              display: "inline-block",
              background: c.accent,
              color: c.text,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        {content.cta ? (
          <div
            style={{
              background: c.text,
              color: c.bg,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 26,
              borderRadius: 12,
              padding: "12px 26px",
            }}
          >
            <RichText text={content.cta} />
          </div>
        ) : (
          <span />
        )}
        <div
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontSize: 20,
            color: c.text,
            opacity: 0.4,
            marginLeft: "auto",
          }}
        >
          {content.url || "stayinsured.de"}
        </div>
      </div>
    </div>
  );
}
