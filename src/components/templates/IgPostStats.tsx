// Stay Studio — IG Post / Square — Stats layout
// Huge number + label, rule, supporting headline, CTA + URL.

import type { TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";

export default function IgPostStats({ c, state }: TemplateRenderProps) {
  const { content } = state;
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
      <img
        src={logoSrc(c.logoVariant)}
        alt="Stay"
        style={{ height: 38, objectFit: "contain", alignSelf: "flex-start" }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 200,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: c.text,
          }}
        >
          {content.stat || "3,000+"}
        </div>
        <div
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 500,
            fontSize: 48,
            color: c.text,
            opacity: 0.55,
            marginTop: 12,
          }}
        >
          {content.statLabel || "Clients protected"}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            borderRadius: 999,
            background: c.text,
            opacity: 0.18,
            margin: "32px 0",
          }}
        />
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 72,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: c.text,
            maxWidth: 800,
            whiteSpace: "pre-wrap",
          }}
        >
          {content.headline || "Trusted by international residents."}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        {content.cta && (
          <div style={{ fontFamily: "'Arimo', sans-serif", fontWeight: 700, fontSize: 30, color: c.text }}>
            {content.cta}
          </div>
        )}
        <div style={{ fontFamily: "'Arimo', sans-serif", fontSize: 22, color: c.text, opacity: 0.4, marginLeft: "auto" }}>
          {content.url || "stayinsured.de"}
        </div>
      </div>
    </div>
  );
}
