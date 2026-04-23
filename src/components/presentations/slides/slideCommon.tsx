import type { CSSProperties, ReactNode } from "react";
import type { ColorScheme } from "@/types";
import { logoSrc } from "@/lib/brand";

export const SLIDE_W = 1920;
export const SLIDE_H = 1080;

export const PAD = 96;

export const TITLE_STYLE: CSSProperties = {
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 400,
  fontSize: 112,
  lineHeight: 0.92,
  letterSpacing: "-0.045em",
  textTransform: "uppercase",
  whiteSpace: "pre-wrap",
  margin: 0,
};

export const SUBTITLE_STYLE: CSSProperties = {
  fontFamily: "'Arimo', sans-serif",
  fontWeight: 500,
  fontSize: 34,
  lineHeight: 1.3,
  margin: 0,
};

export const BODY_STYLE: CSSProperties = {
  fontFamily: "'Arimo', sans-serif",
  fontWeight: 400,
  fontSize: 24,
  lineHeight: 1.5,
  margin: 0,
};

export const LABEL_STYLE: CSSProperties = {
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 20,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  margin: 0,
};

export const NUM_STYLE: CSSProperties = {
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 400,
  fontSize: 56,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  margin: 0,
};

export function SlideLogo({ c, size = 48 }: { c: ColorScheme; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSrc(c.logoVariant)}
      alt="Stay"
      style={{ height: size, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

export function SlideBadge({ c, text }: { c: ColorScheme; text: string }) {
  return (
    <div
      style={{
        fontFamily: "'Mukta', sans-serif",
        fontWeight: 500,
        fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: c.bg,
        background: c.text,
        padding: "10px 18px",
        borderRadius: 999,
      }}
    >
      {text}
    </div>
  );
}

export function SlideFrame({
  c,
  children,
  bg,
  topBar,
}: {
  c: ColorScheme;
  children: ReactNode;
  bg?: string;
  topBar?: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg ?? c.bg,
        color: c.text,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${PAD / 2}px ${PAD}px 0 ${PAD}px`,
          flexShrink: 0,
          gap: 24,
        }}
      >
        <SlideLogo c={c} />
        {topBar}
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}
