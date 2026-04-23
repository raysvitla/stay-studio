// Stay Studio — 2×2 Stat Grid
// Four stat cards in a checkerboard: two filled with palette accent, two
// outlined. Useful for "by the numbers" posts. Uses `content.stats[]`
// (up to 4 entries); falls back to defaults when empty.

import type { TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

const DEFAULT_STATS = [
  { value: "3,000+", label: "Clients protected" },
  { value: "24/7", label: "English support" },
  { value: "€0", label: "Broker fees" },
  { value: "5★", label: "Google reviews" },
];

export default function IgStatGrid({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const stats = (content.stats && content.stats.length > 0 ? content.stats : DEFAULT_STATS).slice(0, 4);
  while (stats.length < 4) stats.push({ value: "", label: "" });

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
        gap: 36,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 40, objectFit: "contain" }} />
        {content.accentText && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: c.text,
              opacity: 0.5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {content.accentText}
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 400,
          fontSize: 68,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: c.text,
        }}
      >
        <RichText text={content.headline || "By the numbers."} />
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 18,
          minHeight: 0,
        }}
      >
        {stats.map((s, i) => {
          const filled = i === 0 || i === 3;
          return (
            <div
              key={i}
              style={{
                borderRadius: 22,
                background: filled ? c.accent : "transparent",
                border: filled ? "none" : `2px solid ${c.text}`,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 500,
                  fontSize: 92,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: c.text,
                }}
              >
                <RichText text={s.value || ""} />
              </div>
              <div
                style={{
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: 22,
                  color: c.text,
                  opacity: filled ? 0.85 : 0.65,
                  lineHeight: 1.35,
                }}
              >
                <RichText text={s.label || ""} />
              </div>
            </div>
          );
        })}
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
