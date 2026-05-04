// Stay Studio — Icon renderer
//
// Resolves a kebab-case icon name to a rendered SVG. Most icons come from
// lucide-react via the catalog in `./icon-catalog`. Stay's own clover mark
// is rendered inline so it stays on-brand instead of using lucide's leaf.
//
// Backward compatibility: legacy names (heart, star, shield, etc.) keep
// their tokens, so existing saved designs render unchanged.

import type { CSSProperties } from "react";
import { ICON_BY_NAME, ICON_NAMES } from "./icon-catalog";

export { ICON_NAMES };
export type IconName = string;

/** Public labels (kept here for tooltips in the picker UI). */
export const ICON_LABELS: Record<string, string> = Object.fromEntries(
  Array.from(ICON_BY_NAME.values()).map((i) => [i.name, i.label])
);

interface Props {
  name: string;
  size?: number | string;
  stroke?: number;
  style?: CSSProperties;
  title?: string;
}

const STROKE = 2;

export default function Icon({ name, size = "1em", stroke = STROKE, style, title }: Props) {
  const wrapperStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "-0.125em",
    flexShrink: 0,
    ...style,
  };

  // Stay's own clover mark — keep custom so the brand asset doesn't drift.
  if (name === "clover") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="img"
        aria-label={title ?? "Stay clover"}
        style={wrapperStyle}
      >
        <circle cx="8" cy="8" r="3.3" fill="currentColor" />
        <circle cx="16" cy="8" r="3.3" fill="currentColor" />
        <circle cx="8" cy="16" r="3.3" fill="currentColor" />
        <circle cx="16" cy="16" r="3.3" fill="currentColor" />
      </svg>
    );
  }

  const def = ICON_BY_NAME.get(name);
  if (!def || !def.Component) return null;

  const C = def.Component;
  return (
    <C
      size={size}
      strokeWidth={stroke}
      // For "filled" variants we paint the glyph with the current text colour
      // and drop the stroke to avoid a double-line look.
      {...(def.fill ? { fill: "currentColor", stroke: "none" } : {})}
      style={wrapperStyle}
      aria-label={title ?? def.label}
    />
  );
}
