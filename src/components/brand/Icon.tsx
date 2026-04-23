import type { CSSProperties } from "react";

export const ICON_NAMES = [
  "clover",
  "globe",
  "heart",
  "handshake",
  "arrow-right",
  "arrow-up-right",
  "check",
  "cross",
  "person",
  "tooth",
  "calendar",
  "euro",
  "house",
  "shield",
  "phone",
  "briefcase",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_LABELS: Record<IconName, string> = {
  clover: "Clover (Stay mark)",
  globe: "Globe",
  heart: "Heart",
  handshake: "Handshake",
  "arrow-right": "Arrow →",
  "arrow-up-right": "Arrow ↗",
  check: "Check ✓",
  cross: "Cross ✗",
  person: "Person",
  tooth: "Tooth",
  calendar: "Calendar",
  euro: "Euro €",
  house: "House",
  shield: "Shield",
  phone: "Phone",
  briefcase: "Briefcase",
};

interface Props {
  name: IconName;
  size?: number | string;
  stroke?: number;
  style?: CSSProperties;
  title?: string;
}

const STROKE = 2;
const V = 24;

export default function Icon({ name, size = "1em", stroke = STROKE, style, title }: Props) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: `0 0 ${V} ${V}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { display: "inline-block", verticalAlign: "-0.125em", flexShrink: 0, ...style },
    role: "img" as const,
    "aria-label": title ?? name,
  };

  switch (name) {
    case "clover":
      return (
        <svg {...commonProps}>
          <circle cx="8" cy="8" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="3.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "globe":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...commonProps}>
          <path d="M12 20.5L4.2 12.7a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3l1.3-1.3a4.6 4.6 0 0 1 6.5 6.5z" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...commonProps}>
          <path d="M3 12l4-4l3 2l4-4l4 4l3-1" />
          <path d="M7 13l3 3a2 2 0 0 0 3 0l2-2l2 2" />
          <path d="M10 15l2 2" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...commonProps}>
          <path d="M4 12h16" />
          <path d="M14 6l6 6l-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...commonProps}>
          <path d="M6 18L18 6" />
          <path d="M8 6h10v10" />
        </svg>
      );
    case "check":
      return (
        <svg {...commonProps}>
          <path d="M4 12l5 5l11-11" />
        </svg>
      );
    case "cross":
      return (
        <svg {...commonProps}>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </svg>
      );
    case "person":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      );
    case "tooth":
      return (
        <svg {...commonProps}>
          <path d="M7 3c-2 0-4 2-4 5c0 2 1 3 1 6c0 3 1 7 3 7c1.5 0 2-2 2.5-4c.3-1.3 1-2 2-2s1.7.7 2 2c.5 2 1 4 2.5 4c2 0 3-4 3-7c0-3 1-4 1-6c0-3-2-5-4-5c-2 0-3 1-4.5 1S9 3 7 3z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <circle cx="8" cy="15" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="15" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="16" cy="15" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "euro":
      return (
        <svg {...commonProps}>
          <path d="M18 6a7 7 0 1 0 0 12" />
          <path d="M3 10h10" />
          <path d="M3 14h10" />
        </svg>
      );
    case "house":
      return (
        <svg {...commonProps}>
          <path d="M3 11l9-7l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...commonProps}>
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </svg>
      );
  }
}
