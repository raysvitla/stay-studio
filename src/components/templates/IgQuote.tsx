// Stay Studio — Quote card
// Oversized quote with attribution pill below. Good for testimonials and
// positioning statements. Reuses `headline` as the quote body and `body`
// as the attribution line.
//
// Layout: logo (top), body wrapper (flex-grow, centered), footer (bottom).
// `flex-grow: 1` on the body keeps the quote vertically balanced no matter
// which of logo / CTA / URL the user has toggled off.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, headlineScale, logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgQuote({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const bs = bodyScale(content.bodySize);
  const hs = headlineScale(content.headlineSize);

  const showLogo = !content.hideLogo;
  const showCta = Boolean(content.cta) && !content.hideCta;
  const showUrl = !content.hideUrl;
  const showFooter = showCta || showUrl;

  // Per-element colour overrides (Visual section). Falls back to the palette
  // accent so existing designs render unchanged.
  const markColor = content.quoteMarkColor || c.accent;
  const pillBg = content.quotePillBg || c.accent;
  // Attribution copy can be a short tag ("— Maria K.") or a multi-line
  // testimonial. Switch radius based on that — 999 looks like a comic stroke
  // when the text wraps to 3 lines.
  const bodyText = content.body || "";
  const looksMultiLine = bodyText.length > 64 || bodyText.includes("\n");
  const pillRadius = looksMultiLine ? 32 : 999;
  const pillPadding = looksMultiLine ? "18px 28px" : "10px 22px";

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
        overflow: "hidden",
      }}
    >
      {showLogo && (
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 40, objectFit: "contain", flexShrink: 0 }}
        />
      )}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          // Reserve room for the oversized open-quote glyph so it never
          // crops against the canvas edge when logo is hidden.
          paddingTop: 80,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -20,
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 500,
            fontSize: 280,
            lineHeight: 0.8,
            color: markColor,
            pointerEvents: "none",
          }}
        >
          &ldquo;
        </div>

        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 80 * hs,
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
              alignSelf: "flex-start",
              maxWidth: "92%",
              background: pillBg,
              color: c.text,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 600,
              fontSize: 22 * bs,
              lineHeight: 1.45,
              borderRadius: pillRadius,
              padding: pillPadding,
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
      </div>

      {showFooter && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexShrink: 0 }}>
          {showCta ? (
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
          {showUrl && (
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
          )}
        </div>
      )}
    </div>
  );
}
