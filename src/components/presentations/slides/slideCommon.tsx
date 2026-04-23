import type { CSSProperties, ReactNode } from "react";
import type { ColorScheme } from "@/types";
import { COLORS, logoSrc } from "@/lib/brand";

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

/** Resolves the effective on-screen colours for a slide given the canvas mode.
 * In "white" mode, the palette's bg becomes the ACCENT (used for pills,
 * illustration tints, highlight cards), and the slide bg/fg is white/charcoal —
 * except for the "dark" palette which stays inverted.
 * In "tinted" mode (legacy / old decks), bg and fg follow the palette directly. */
export function resolveCanvas(c: ColorScheme, canvasMode: "white" | "tinted" = "tinted") {
  if (canvasMode === "white" && c.id !== "dark") {
    return { bg: COLORS.white, fg: COLORS.charcoal, accent: c.bg, muted: "rgba(60,60,60,0.55)" };
  }
  return { bg: c.bg, fg: c.text, accent: c.accent, muted: c.id === "dark" ? "rgba(255,255,255,0.55)" : "rgba(60,60,60,0.55)" };
}

/** Pick the correct logo variant for the effective slide background colour. */
function logoForBg(bg: string, c: ColorScheme): string {
  if (bg === COLORS.white) return logoSrc("dark");
  if (bg === COLORS.charcoal) return logoSrc("white");
  return logoSrc(c.logoVariant);
}

export function SlideLogo({ c, size = 48, bg }: { c: ColorScheme; size?: number; bg?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={bg ? logoForBg(bg, c) : logoSrc(c.logoVariant)}
      alt="Stay"
      style={{ height: size, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

/** Page number in dark circle (bottom-left) + URL pill (bottom-right).
 * Matches Stay slide footer pattern. */
export function PageFooter({
  canvas,
  pageNumber,
  totalPages,
  url = "stayinsured.de",
}: {
  canvas: ReturnType<typeof resolveCanvas>;
  pageNumber?: number;
  totalPages?: number;
  url?: string;
}) {
  const showPage = typeof pageNumber === "number" && pageNumber > 0;
  return (
    <div
      style={{
        position: "absolute",
        left: PAD,
        right: PAD,
        bottom: PAD / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {showPage ? (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: canvas.fg,
            color: canvas.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Mukta', sans-serif",
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "0.04em",
          }}
        >
          {String(pageNumber).padStart(2, "0")}
          {typeof totalPages === "number" && totalPages > 0 && (
            <span style={{ opacity: 0.55, fontSize: 14, marginLeft: 2 }}>/{String(totalPages).padStart(2, "0")}</span>
          )}
        </div>
      ) : (
        <span />
      )}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "10px 22px",
          borderRadius: 999,
          border: `2px solid ${canvas.fg}`,
          background: "transparent",
          color: canvas.fg,
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {url}
      </div>
    </div>
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
  canvasMode = "tinted",
  pageNumber,
  totalPages,
  showFooter = true,
}: {
  c: ColorScheme;
  children: ReactNode;
  bg?: string;
  topBar?: ReactNode;
  canvasMode?: "white" | "tinted";
  pageNumber?: number;
  totalPages?: number;
  showFooter?: boolean;
}) {
  const canvas = resolveCanvas(c, canvasMode);
  const effectiveBg = bg ?? canvas.bg;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: effectiveBg,
        color: canvas.fg,
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
          position: "relative",
          zIndex: 2,
        }}
      >
        <SlideLogo c={c} bg={effectiveBg} />
        {topBar}
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
      {showFooter && <PageFooter canvas={canvas} pageNumber={pageNumber} totalPages={totalPages} />}
    </div>
  );
}
