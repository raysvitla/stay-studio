// Stay Studio — IG Story — Stacked layout
// Top half: illustration on accent colour. Bottom half: text + CTA.

import type { TemplateRenderProps } from "@/types";
import { logoSrc, resolveIllustration } from "@/lib/brand";

export default function IgStoryStacked({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const illus = resolveIllustration(content);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          flex: 1,
          background: illus?.isCustom ? c.bg : (content.illusAccent || c.accent),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          position: "relative",
        }}
      >
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 44, position: "absolute", top: 80, left: 80, objectFit: "contain" }}
        />
        {illus ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={illus.src}
            alt=""
            style={{
              height: 560,
              width: illus.isCustom ? "100%" : "auto",
              objectFit: illus.isCustom ? "cover" : "contain",
              borderRadius: illus.isCustom ? 32 : 0,
            }}
          />
        ) : (
          <div style={{ height: 400, width: 400, borderRadius: "50%", background: c.bg, opacity: 0.4 }} />
        )}
      </div>

      <div
        style={{
          flex: 1,
          background: c.bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px 90px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 400,
              fontSize: 112,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: c.text,
              whiteSpace: "pre-wrap",
            }}
          >
            {content.headline || "Reliable insurance. Real humans."}
          </div>
          {content.body && (
            <div
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 38,
                color: c.text,
                opacity: 0.65,
                marginTop: 36,
                lineHeight: 1.5,
              }}
            >
              {content.body}
            </div>
          )}
        </div>

        <div>
          {content.cta && (
            <div
              style={{
                background: c.text,
                color: c.bg,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 700,
                fontSize: 38,
                borderRadius: 14,
                padding: "20px 44px",
                display: "inline-block",
                marginBottom: 28,
              }}
            >
              {content.cta}
            </div>
          )}
          <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 28, color: c.text, opacity: 0.4 }}>
            {content.url || "stayinsured.de"}
          </div>
        </div>
      </div>
    </div>
  );
}
