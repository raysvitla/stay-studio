import type { CSSProperties } from "react";

export const ICON_NAMES = [
  // Stay brand
  "clover",
  "stay-wink",
  // People / identity
  "person",
  "users",
  "family",
  // Symbols / feeling
  "heart",
  "star",
  "sparkle",
  "thumbs-up",
  "lightbulb",
  "handshake",
  // Navigation / arrows
  "arrow-right",
  "arrow-up-right",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "chevron-right",
  // Geography / travel
  "globe",
  "map-pin",
  "plane",
  "car",
  "compass",
  // Home / work
  "house",
  "building",
  "briefcase",
  "graduation-cap",
  // Insurance / protection
  "shield",
  "umbrella",
  "lock",
  "key",
  // Health
  "tooth",
  "stethoscope",
  "pill",
  "bandage",
  // Money
  "euro",
  "piggy-bank",
  "credit-card",
  "wallet",
  "percent",
  "chart-line",
  // Documents / actions
  "file",
  "clipboard",
  "pen",
  // Communication
  "phone",
  "mail",
  "chat-bubble",
  "bell",
  "megaphone",
  // Time
  "calendar",
  "clock",
  // Status / primitives
  "check",
  "cross",
  "plus",
  "minus",
  "info",
  "warning",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const ICON_LABELS: Record<IconName, string> = {
  clover: "Stay mark",
  "stay-wink": "Winking smiley",
  person: "Person",
  users: "Two people",
  family: "Family",
  heart: "Heart",
  star: "Star",
  sparkle: "Sparkle",
  "thumbs-up": "Thumbs up",
  lightbulb: "Lightbulb",
  handshake: "Handshake",
  "arrow-right": "Arrow →",
  "arrow-up-right": "Arrow ↗",
  "arrow-up": "Arrow ↑",
  "arrow-down": "Arrow ↓",
  "arrow-left": "Arrow ←",
  "chevron-right": "Chevron ›",
  globe: "Globe",
  "map-pin": "Map pin",
  plane: "Plane",
  car: "Car",
  compass: "Compass",
  house: "House",
  building: "Building",
  briefcase: "Briefcase",
  "graduation-cap": "Graduation cap",
  shield: "Shield",
  umbrella: "Umbrella",
  lock: "Lock",
  key: "Key",
  tooth: "Tooth",
  stethoscope: "Stethoscope",
  pill: "Pill",
  bandage: "Bandage",
  euro: "Euro €",
  "piggy-bank": "Piggy bank",
  "credit-card": "Credit card",
  wallet: "Wallet",
  percent: "Percent %",
  "chart-line": "Chart / growth",
  file: "File",
  clipboard: "Clipboard",
  pen: "Pen",
  phone: "Phone",
  mail: "Mail",
  "chat-bubble": "Chat bubble",
  bell: "Bell",
  megaphone: "Megaphone",
  calendar: "Calendar",
  clock: "Clock",
  check: "Check ✓",
  cross: "Cross ✗",
  plus: "Plus +",
  minus: "Minus −",
  info: "Info",
  warning: "Warning",
};

/** Extra search terms so a marketer typing "insurance", "discount", or "safety"
 * finds the right icon even if the name doesn't contain that word. */
export const ICON_KEYWORDS: Record<IconName, string> = {
  clover: "stay logo mark brand four dots",
  "stay-wink": "smiley face emoji wink brand stay happy",
  person: "user profile individual",
  users: "people group community",
  family: "parents kids children",
  heart: "love like favourite favorite",
  star: "favourite favorite top rating",
  sparkle: "new magic shine fresh",
  "thumbs-up": "approve like good yes",
  lightbulb: "idea tip insight",
  handshake: "deal agreement partner trust",
  "arrow-right": "next forward continue",
  "arrow-up-right": "external link grow up",
  "arrow-up": "up increase grow",
  "arrow-down": "down decrease drop",
  "arrow-left": "back previous",
  "chevron-right": "more next forward",
  globe: "world international global expat",
  "map-pin": "location place address",
  plane: "flight travel airplane",
  car: "vehicle drive auto",
  compass: "direction navigate",
  house: "home flat apartment rent buy",
  building: "office company business",
  briefcase: "work job career employment",
  "graduation-cap": "student university study education",
  shield: "protect insurance coverage safe",
  umbrella: "protect rainy day safety insurance",
  lock: "secure private safe password",
  key: "access unlock secret",
  tooth: "dental teeth dentist",
  stethoscope: "doctor medical health checkup",
  pill: "medicine prescription rx health",
  bandage: "injury first aid",
  euro: "money price eur cost",
  "piggy-bank": "save savings deposit",
  "credit-card": "card payment debit",
  wallet: "money cash pocket",
  percent: "discount rate offer off",
  "chart-line": "growth trend analytics stats",
  file: "document paper contract",
  clipboard: "form checklist list",
  pen: "write edit sign",
  phone: "call contact support",
  mail: "email envelope letter message",
  "chat-bubble": "message talk support chat",
  bell: "notification alert reminder",
  megaphone: "announce news promo launch",
  calendar: "date schedule appointment book",
  clock: "time hour quick fast",
  check: "yes done correct ok",
  cross: "no cancel remove wrong",
  plus: "add more new",
  minus: "remove subtract less",
  info: "information detail about",
  warning: "caution alert careful",
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
    // ── Stay brand ─────────────────────────────────────────────
    case "clover":
      return (
        <svg {...commonProps}>
          <circle cx="8" cy="8" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="3.3" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="3.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "stay-wink":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
          <path d="M14 10h2.5" />
          <path d="M8 14.5c1.2 2 6.8 2 8 0" />
        </svg>
      );

    // ── People / identity ──────────────────────────────────────
    case "person":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3.2" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M15 14.5c3 .3 5.5 2.7 5.5 5.5" />
        </svg>
      );
    case "family":
      return (
        <svg {...commonProps}>
          <circle cx="7" cy="7" r="2.2" />
          <circle cx="17" cy="7" r="2.2" />
          <circle cx="12" cy="13" r="1.8" />
          <path d="M3 18c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          <path d="M13 18c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          <path d="M9.5 21c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" />
        </svg>
      );

    // ── Symbols / feeling ──────────────────────────────────────
    case "heart":
      return (
        <svg {...commonProps}>
          <path d="M12 20.5L4.2 12.7a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3l1.3-1.3a4.6 4.6 0 0 1 6.5 6.5z" />
        </svg>
      );
    case "star":
      return (
        <svg {...commonProps}>
          <path d="M12 3l2.8 5.8l6.2.9l-4.5 4.4l1.1 6.2L12 17.4l-5.6 2.9l1.1-6.2l-4.5-4.4l6.2-.9z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...commonProps}>
          <path d="M12 3l2 6l6 2l-6 2l-2 6l-2-6l-6-2l6-2z" />
        </svg>
      );
    case "thumbs-up":
      return (
        <svg {...commonProps}>
          <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
          <path d="M7 11l4-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.4l-1.4 6A2 2 0 0 1 16.6 20H7" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg {...commonProps}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M8 14a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3.5h-5c0-1.5-.5-2.5-1.5-3.5z" />
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

    // ── Arrows ────────────────────────────────────────────────
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
    case "arrow-up":
      return (
        <svg {...commonProps}>
          <path d="M12 4v16" />
          <path d="M6 10l6-6l6 6" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...commonProps}>
          <path d="M12 4v16" />
          <path d="M6 14l6 6l6-6" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...commonProps}>
          <path d="M20 12H4" />
          <path d="M10 6l-6 6l6 6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...commonProps}>
          <path d="M9 6l6 6l-6 6" />
        </svg>
      );

    // ── Geography / travel ────────────────────────────────────
    case "globe":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18z" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...commonProps}>
          <path d="M12 21s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      );
    case "plane":
      return (
        <svg {...commonProps}>
          <path d="M3 14l18-7l-5 14l-3-6l-4 4l-1-5z" />
        </svg>
      );
    case "car":
      return (
        <svg {...commonProps}>
          <path d="M4 16v-3l2-5a2 2 0 0 1 2-1.5h8a2 2 0 0 1 2 1.5l2 5v3" />
          <path d="M3 16h18v3H3z" />
          <circle cx="7.5" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "compass":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5.5l-5.5 2l2-5.5z" />
        </svg>
      );

    // ── Home / work ───────────────────────────────────────────
    case "house":
      return (
        <svg {...commonProps}>
          <path d="M3 11l9-7l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "building":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
          <path d="M10 21v-3h4v3" />
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
    case "graduation-cap":
      return (
        <svg {...commonProps}>
          <path d="M2 9l10-4l10 4l-10 4z" />
          <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
          <path d="M20 10v5" />
        </svg>
      );

    // ── Insurance / protection ────────────────────────────────
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6z" />
        </svg>
      );
    case "umbrella":
      return (
        <svg {...commonProps}>
          <path d="M3 12a9 9 0 0 1 18 0z" />
          <path d="M12 12v7a2 2 0 0 1-4 0" />
        </svg>
      );
    case "lock":
      return (
        <svg {...commonProps}>
          <rect x="4.5" y="11" width="15" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "key":
      return (
        <svg {...commonProps}>
          <circle cx="8" cy="15" r="4" />
          <path d="M11 13l9-9" />
          <path d="M15 6l3 3" />
          <path d="M18 5l3 3" />
        </svg>
      );

    // ── Health ────────────────────────────────────────────────
    case "tooth":
      return (
        <svg {...commonProps}>
          <path d="M7 3c-2 0-4 2-4 5c0 2 1 3 1 6c0 3 1 7 3 7c1.5 0 2-2 2.5-4c.3-1.3 1-2 2-2s1.7.7 2 2c.5 2 1 4 2.5 4c2 0 3-4 3-7c0-3 1-4 1-6c0-3-2-5-4-5c-2 0-3 1-4.5 1S9 3 7 3z" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...commonProps}>
          <path d="M5 3v7a4 4 0 0 0 8 0V3" />
          <path d="M5 3h2M11 3h2" />
          <path d="M9 14v3a4 4 0 0 0 8 0v-1" />
          <circle cx="17" cy="12" r="2.5" />
        </svg>
      );
    case "pill":
      return (
        <svg {...commonProps}>
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" />
          <path d="M9 9l6 6" transform="rotate(-30 12 12)" />
        </svg>
      );
    case "bandage":
      return (
        <svg {...commonProps}>
          <rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-45 12 12)" />
          <path d="M10 12h4M11 10v4M13 10v4" />
        </svg>
      );

    // ── Money ─────────────────────────────────────────────────
    case "euro":
      return (
        <svg {...commonProps}>
          <path d="M18 6a7 7 0 1 0 0 12" />
          <path d="M3 10h10" />
          <path d="M3 14h10" />
        </svg>
      );
    case "piggy-bank":
      return (
        <svg {...commonProps}>
          <path d="M3 13c0-4 3.5-7 8-7c3 0 5.5 1.5 6.5 4H20a1 1 0 0 1 1 1v2h-1.5c-.5 1.2-1.4 2.3-2.5 3v3h-2v-2c-1 .3-2 .5-3 .5s-2-.2-3-.5v2H7v-3c-2-1.4-3-3.3-3-5z" />
          <circle cx="15" cy="11" r="0.9" fill="currentColor" stroke="none" />
          <path d="M3 12a2 2 0 0 1 2 0" />
        </svg>
      );
    case "credit-card":
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h3" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3" />
          <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "percent":
      return (
        <svg {...commonProps}>
          <path d="M6 18L18 6" />
          <circle cx="7.5" cy="7.5" r="2" />
          <circle cx="16.5" cy="16.5" r="2" />
        </svg>
      );
    case "chart-line":
      return (
        <svg {...commonProps}>
          <path d="M3 21h18" />
          <path d="M4 17l5-6l4 3l6-8" />
          <path d="M15 6h4v4" />
        </svg>
      );

    // ── Documents / actions ───────────────────────────────────
    case "file":
      return (
        <svg {...commonProps}>
          <path d="M6 3h8l5 5v13H6z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...commonProps}>
          <rect x="5" y="5" width="14" height="16" rx="2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "pen":
      return (
        <svg {...commonProps}>
          <path d="M4 20l1-5L15 5l4 4L9 19z" />
          <path d="M13 7l4 4" />
        </svg>
      );

    // ── Communication ─────────────────────────────────────────
    case "phone":
      return (
        <svg {...commonProps}>
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6l9-6" />
        </svg>
      );
    case "chat-bubble":
      return (
        <svg {...commonProps}>
          <path d="M21 12a7 7 0 0 1-7 7H8l-4 3v-4.5A7 7 0 0 1 4 12a7 7 0 0 1 7-7h3a7 7 0 0 1 7 7z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...commonProps}>
          <path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2H4.5z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...commonProps}>
          <path d="M3 10v4a2 2 0 0 0 2 2h2l9 4V4L7 8H5a2 2 0 0 0-2 2z" />
          <path d="M18 9a3 3 0 0 1 0 6" />
        </svg>
      );

    // ── Time ──────────────────────────────────────────────────
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
    case "clock":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    // ── Status / primitives ───────────────────────────────────
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
    case "plus":
      return (
        <svg {...commonProps}>
          <path d="M12 4v16" />
          <path d="M4 12h16" />
        </svg>
      );
    case "minus":
      return (
        <svg {...commonProps}>
          <path d="M4 12h16" />
        </svg>
      );
    case "info":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "warning":
      return (
        <svg {...commonProps}>
          <path d="M12 3l10 17H2z" />
          <path d="M12 10v4" />
          <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
