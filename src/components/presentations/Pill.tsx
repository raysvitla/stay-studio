import type { CSSProperties, ReactNode } from "react";

export type PillVariant = "filled" | "outlined" | "dark" | "ghost";

interface Props {
  variant?: PillVariant;
  accent?: string;
  text?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

export default function Pill({
  variant = "filled",
  accent = "#E6FFA0",
  text = "#3C3C3C",
  children,
  size = "md",
  style,
}: Props) {
  const sizes = {
    sm: { padV: 4, padH: 10, fs: 14 },
    md: { padV: 8, padH: 20, fs: 20 },
    lg: { padV: 12, padH: 28, fs: 26 },
  }[size];

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: `${sizes.padV}px ${sizes.padH}px`,
    borderRadius: 999,
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    fontSize: sizes.fs,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  };

  const variantStyle: CSSProperties =
    variant === "filled"
      ? { background: accent, color: text, border: `2px solid ${text}` }
      : variant === "outlined"
        ? { background: "transparent", color: text, border: `2px solid ${text}` }
        : variant === "dark"
          ? { background: text, color: accent, border: `2px solid ${text}` }
          : { background: "transparent", color: text, border: "2px solid transparent" };

  return <span style={{ ...base, ...variantStyle, ...style }}>{children}</span>;
}
