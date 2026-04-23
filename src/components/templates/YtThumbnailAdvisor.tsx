// Stay Studio — YouTube Thumbnail (1280×720) — Advisor + Headline
// Right-side photo of the advisor, left-side loud headline. Designed for the
// "is this the right insurance?" type of conversion videos — the hook text
// has to be readable at 180×320px when YouTube shrinks the thumbnail.

import type { TemplateRenderProps } from "@/types";
import { bodyScale, logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";

export default function YtThumbnailAdvisor({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const photo = content.photoUrl;
  const bs = bodyScale(content.bodySize);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: photo ? 1.2 : 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 48px 56px 64px",
          minWidth: 0,
        }}
      >
        <img
          src={logoSrc(c.logoVariant)}
          alt="Stay"
          style={{ height: 34, width: "auto", objectFit: "contain", alignSelf: "flex-start", marginBottom: 24 }}
        />
        <div
          style={{
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 400,
            fontSize: 112,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: c.text,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <RichText text={content.headline || "PKV vs GKV:\nthe truth"} />
        </div>
        {content.body && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 500,
              fontSize: 36 * bs,
              color: c.text,
              opacity: 0.72,
              marginTop: 20,
              lineHeight: 1.25,
              whiteSpace: "pre-wrap",
            }}
          >
            <RichText text={content.body} />
          </div>
        )}
        {content.url && (
          <div
            style={{
              fontFamily: "'Arimo', sans-serif",
              fontSize: 22,
              color: c.text,
              opacity: 0.45,
              marginTop: 26,
            }}
          >
            {content.url}
          </div>
        )}
      </div>

      {photo && (
        <div
          style={{
            flex: 1,
            position: "relative",
            background: content.illusAccent || c.accent,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>
      )}

      {content.accentText && (
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            background: c.text,
            color: c.bg,
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "10px 18px",
            borderRadius: 999,
          }}
        >
          {content.accentText}
        </div>
      )}
    </div>
  );
}
