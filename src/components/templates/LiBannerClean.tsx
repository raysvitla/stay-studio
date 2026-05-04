// Stay Studio — LinkedIn Banner — Clean (1584 × 396)
// Logo + URL on the left, optional illustration centre, headline on the right.

import type { TemplateRenderProps } from "@/types";
import { headlineScale, logoSrc, resolveIllustration } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function LiBannerClean({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const illus = resolveIllustration(content);
  const hs = headlineScale(content.headlineSize);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div>
        {!content.hideLogo && (
          <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 44, objectFit: "contain", display: "block", marginBottom: 16 }} />
        )}
        {!content.hideUrl && (
          <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 22, color: c.text, opacity: 0.5 }}>
            {content.url || "stayinsured.de"}
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {illus && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={illus.src}
            alt=""
            style={{
              height: 280,
              maxWidth: illus.isCustom ? 400 : "none",
              objectFit: illus.isCustom ? "cover" : "contain",
              borderRadius: illus.isCustom ? 16 : 0,
            }}
          />
        )}
      </div>
      <div style={{ maxWidth: 580, textAlign: "right" }}>
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 64 * hs,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: c.text,
            whiteSpace: "pre-wrap",
          }}
        >
          <RichText text={content.headline || "Insurance for international residents in Germany."} />
        </div>
      </div>
    </div>
  );
}
