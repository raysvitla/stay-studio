// Stay Studio — LinkedIn Post — Split layout (1200 × 627)
// Left: text column. Right: illustration column on accent bg.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, headlineScale, logoSrc, resolveIllustration } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function LiPostSplit({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const illus = resolveIllustration(content);
  const bs = bodyScale(content.bodySize);
  const hs = headlineScale(content.headlineSize);
  return (
    <div style={{ width: "100%", height: "100%", background: c.bg, display: "flex", overflow: "hidden" }}>
      <div style={{ flex: 1.1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 56px" }}>
        {!content.hideLogo ? (
          <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 32, objectFit: "contain", alignSelf: "flex-start" }} />
        ) : (
          <span />
        )}
        <div>
          <div
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 400,
              fontSize: 68 * hs,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: c.text,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.headline || "Reliable insurance for international residents."} />
          </div>
          {content.body && (
            <div
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 22 * bs,
                color: c.text,
                opacity: 0.65,
                marginTop: 18,
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
                fontSize: 20,
                borderRadius: 9,
                padding: "10px 24px",
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
      <div
        style={{
          flex: 0.9,
          background: illus?.isCustom ? c.bg : (content.illusAccent || c.accent),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: illus?.isCustom ? 0 : 32,
          overflow: "hidden",
        }}
      >
        {illus ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={illus.src}
            alt=""
            style={{
              height: illus.isCustom ? "100%" : 380,
              width: illus.isCustom ? "100%" : "auto",
              objectFit: illus.isCustom ? "cover" : "contain",
            }}
          />
        ) : (
          <div
            style={{
              opacity: 0.2,
              fontFamily: "'Mukta', sans-serif",
              fontSize: 48,
              textTransform: "uppercase",
              textAlign: "center",
              color: c.text,
            }}
          >
            Illustration
          </div>
        )}
      </div>
    </div>
  );
}
