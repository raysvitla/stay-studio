// Stay Studio — Carousel slide (1080×1080)
// One slide of a multi-slide carousel (Instagram / Meta ads). The renderer
// picks the slide to show from `state.slides[state._activeSlide]` (or the
// first slide if unset). Slide indicator is drawn in the corner so
// marketers can see the slide's position when stitching the carousel
// together.
//
// First slide auto-styles as a hook (big headline, no body); middle slides
// show headline + body; last slide shows CTA + URL prominently.

import type { TemplateRenderProps, CarouselSlide as Slide } from "@/types";
import { logoSrc, resolveIllustration } from "@/lib/brand";

export default function CarouselSlide({ c, state, slideIndex }: TemplateRenderProps) {
  const slides: Slide[] | undefined = state.slides;
  const idx = slideIndex ?? 0;
  const total = slides?.length ?? 1;
  const content = slides?.[idx]?.content ?? state.content;
  const illus = resolveIllustration(content);

  const isFirst = idx === 0;
  const isLast = total > 1 && idx === total - 1;

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
        position: "relative",
      }}
    >
      {/* Header row: logo + slide indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 38, objectFit: "contain" }}
        />
        {total > 1 && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: c.text,
              opacity: 0.45,
              letterSpacing: "0.08em",
            }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Body — layout varies by slide position */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 40, minHeight: 0 }}>
        {illus && !isFirst && !isLast && (
          <div
            style={{
              background: content.illusAccent || c.accent,
              borderRadius: 24,
              padding: illus.isCustom ? 0 : 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 360,
              alignSelf: "stretch",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={illus.src}
              alt=""
              style={{
                width: illus.isCustom ? "100%" : "auto",
                height: illus.isCustom ? "100%" : "90%",
                objectFit: illus.isCustom ? "cover" : "contain",
              }}
            />
          </div>
        )}

        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: isFirst ? 128 : 88,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: c.text,
            whiteSpace: "pre-wrap",
          }}
        >
          {content.headline || (isFirst ? "Swipe to learn more" : isLast ? "Ready to switch?" : "Tap to continue")}
        </div>

        {!isFirst && content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 32,
              color: c.text,
              opacity: 0.7,
              lineHeight: 1.5,
            }}
          >
            {content.body}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        {isLast && content.cta ? (
          <div
            style={{
              background: c.text,
              color: c.bg,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 32,
              borderRadius: 14,
              padding: "18px 36px",
              display: "inline-block",
            }}
          >
            {content.cta}
          </div>
        ) : isFirst ? (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: c.text,
              opacity: 0.55,
              letterSpacing: "0.04em",
            }}
          >
            Swipe →
          </div>
        ) : (
          <span />
        )}
        <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 22, color: c.text, opacity: 0.4, marginLeft: "auto" }}>
          {content.url || "stayinsured.de"}
        </div>
      </div>
    </div>
  );
}
