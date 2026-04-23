// Stay Studio — Photo Hero
// Full-bleed photo with a bold title overlaid. Scrim gradients keep the
// headline legible over any photo. Falls back to palette accent when no
// photo is uploaded.

import type { TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function IgPhotoHero({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const photo = content.photoUrl;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: photo ? "#000" : c.bg,
        overflow: "hidden",
        color: "#FFF",
      }}
    >
      {photo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
            }}
          />
        </>
      ) : null}

      {/* Header — logo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: 80,
          paddingBottom: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={photo ? logoSrc("white") : logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 42, objectFit: "contain" }}
        />
      </div>

      {/* Footer — headline + body + CTA + URL */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 80,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 108,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            lineHeight: 0.95,
            color: photo ? "#FFF" : c.text,
          }}
        >
          <RichText text={content.headline || "Meet your new coverage."} />
        </div>

        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 28,
              lineHeight: 1.45,
              color: photo ? "rgba(255,255,255,0.9)" : c.text,
              opacity: photo ? 1 : 0.7,
              maxWidth: 820,
            }}
          >
            <RichText text={content.body} />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginTop: 4 }}>
          {content.cta ? (
            <div
              style={{
                background: photo ? "#FFF" : c.text,
                color: photo ? "#111" : c.bg,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                borderRadius: 12,
                padding: "14px 28px",
                display: "inline-block",
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
              color: photo ? "rgba(255,255,255,0.75)" : c.text,
              opacity: photo ? 1 : 0.45,
              marginLeft: "auto",
            }}
          >
            {content.url || "stayinsured.de"}
          </div>
        </div>
      </div>
    </div>
  );
}
