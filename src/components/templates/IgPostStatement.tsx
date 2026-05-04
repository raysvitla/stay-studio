// Stay Studio — IG Post / Square — Statement layout
// Big uppercase headline, small body + CTA, URL in corner.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, headlineScale, logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgPostStatement({ c, state }: TemplateRenderProps) {
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
        padding: 80,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      {!content.hideLogo ? (
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 42, width: "auto", objectFit: "contain", alignSelf: "flex-start", flexShrink: 0 }}
        />
      ) : (
        <span />
      )}

      {/* Headline */}
      <div
        style={{
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 400,
          fontSize: 108 * hs,
          letterSpacing: "-0.05em",
          textTransform: "uppercase",
          color: c.text,
          lineHeight: 1.08,
          flex: 1,
          paddingTop: 48,
          paddingBottom: 48,
          whiteSpace: "pre-wrap",
        }}
      >
        <RichText text={content.headline || "German bureaucracy is hard."} />
      </div>

      {/* Body + CTA + URL */}
      <div style={{ flexShrink: 0 }}>
        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 32 * bs,
              color: c.text,
              opacity: 0.65,
              lineHeight: 1.5,
              maxWidth: 680,
              marginBottom: 28,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {content.cta && !content.hideCta && (
            <div style={{ fontFamily: "'Arimo', sans-serif", fontWeight: 700, fontSize: 28, color: c.text }}>
              <RichText text={content.cta} />
            </div>
          )}
          {!content.hideUrl && (
            <div
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 22,
                color: c.text,
                opacity: 0.45,
                marginLeft: "auto",
              }}
            >
              {content.url || "stayinsured.de"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
