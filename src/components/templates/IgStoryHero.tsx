// Stay Studio — IG Story — Hero layout (1080 × 1920)
// Illustration panel + massive headline + CTA pill. Body is optional.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, headlineScale, logoSrc, resolveIllustration } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgStoryHero({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const illus = resolveIllustration(content);
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
        padding: "100px 80px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {!content.hideLogo && (
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 48, objectFit: "contain", alignSelf: "flex-start" }}
        />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {illus && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 60,
              background: illus.isCustom ? "transparent" : (content.illusAccent || "transparent"),
              borderRadius: illus.isCustom ? 24 : (content.illusAccent ? 32 : 0),
              padding: illus.isCustom ? 0 : (content.illusAccent ? 32 : 0),
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={illus.src}
              alt=""
              style={{
                height: 380,
                width: illus.isCustom ? "100%" : "auto",
                objectFit: illus.isCustom ? "cover" : "contain",
              }}
            />
          </div>
        )}

        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 128 * hs,
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: c.text,
            whiteSpace: "pre-wrap",
          }}
        >
          <RichText text={content.headline || "Don't stress. Just Stay."} />
        </div>
        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 42 * bs,
              color: c.text,
              opacity: 0.65,
              marginTop: 40,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
      </div>

      <div>
        {content.cta && !content.hideCta && (
          <div
            style={{
              background: c.text,
              color: c.bg,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 40,
              borderRadius: 16,
              padding: "22px 48px",
              display: "inline-block",
              marginBottom: 32,
            }}
          >
            <RichText text={content.cta} />
          </div>
        )}
        {!content.hideUrl && (
          <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 30, color: c.text, opacity: 0.4 }}>
            {content.url || "stayinsured.de"}
          </div>
        )}
      </div>
    </div>
  );
}
