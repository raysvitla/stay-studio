// Stay Studio — IG Post / Square — Illustrated layout
// Headline + body + CTA pill on one side, illustration panel on the other.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, logoSrc, resolveIllustration } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgPostIllustrated({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const illus = resolveIllustration(content);
  const bs = bodyScale(content.bodySize);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        display: "flex",
        flexDirection: "column",
        padding: 80,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <img
        src={logoSrc(c.logoVariant)}
        alt="Stay"
        style={{ height: 38, width: "auto", objectFit: "contain", alignSelf: "flex-start", marginBottom: 56 }}
      />

      <div style={{ display: "flex", flex: 1, gap: 56, alignItems: "center", minHeight: 0 }}>
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 400,
              fontSize: 96,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: c.text,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.headline || "Staying shouldn't be hard."} />
          </div>
          {content.body && (
            <div
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 32 * bs,
                color: c.text,
                opacity: 0.65,
                marginTop: 28,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              <RichText text={content.body} />
            </div>
          )}
          {content.cta && (
            <div
              style={{
                marginTop: 40,
                background: c.text,
                color: c.bg,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                borderRadius: 12,
                padding: "14px 32px",
                display: "inline-block",
                alignSelf: "flex-start",
              }}
            >
              <RichText text={content.cta} />
            </div>
          )}
        </div>

        {illus && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: illus.isCustom ? "transparent" : (content.illusAccent || "#EBE1FF"),
              borderRadius: 28,
              padding: illus.isCustom ? 0 : 28,
              alignSelf: "stretch",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={illus.src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: illus.isCustom ? "cover" : "contain" }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: "'Arimo', sans-serif",
          fontSize: 22,
          color: c.text,
          opacity: 0.4,
          marginTop: 32,
          textAlign: "right",
        }}
      >
        {content.url || "stayinsured.de"}
      </div>
    </div>
  );
}
