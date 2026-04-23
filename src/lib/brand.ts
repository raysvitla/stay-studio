// Stay Studio — brand tokens
// Single source of truth. Mirrors the design-system README + colors_and_type.css.
// Template renderers and the editor chrome both import from here.

import type { ColorScheme, IllustrationOption, LogoVariant, PaletteKey } from "@/types";

export const COLORS = {
  lilac: "#EBE1FF",
  yellow: "#FFFFA5",
  lime: "#E6FFA0",
  blue: "#E1F5FF",
  white: "#FFFFFF",
  offwhite: "#FCFCFC",
  whisper: "#EDEDED",
  charcoal: "#3C3C3C",
} as const;

/** Chromatic shades for charts / infographics (03 = darkest). */
export const CHROMATIC = {
  lilac: ["#D2C5EF", "#B9A8E0", "#A08CD0"],
  yellow: ["#FFED6E", "#FEDC37", "#FECA00"],
  lime: ["#DAF06B", "#CFE035", "#C3D100"],
  blue: ["#BFE2FB", "#93CBF6", "#66AFEA"],
} as const;

export const COLOR_SCHEMES: ColorScheme[] = [
  { id: "lilac", name: "Lilac", bg: COLORS.lilac, accent: COLORS.yellow, text: COLORS.charcoal, logoVariant: "dark" },
  { id: "yellow", name: "Yellow", bg: COLORS.yellow, accent: COLORS.lilac, text: COLORS.charcoal, logoVariant: "dark" },
  { id: "lime", name: "Lime", bg: COLORS.lime, accent: COLORS.lilac, text: COLORS.charcoal, logoVariant: "lime" },
  { id: "blue", name: "Blue", bg: COLORS.blue, accent: COLORS.lime, text: COLORS.charcoal, logoVariant: "blue" },
  { id: "dark", name: "Dark", bg: COLORS.charcoal, accent: COLORS.lilac, text: COLORS.white, logoVariant: "white" },
  { id: "white", name: "White", bg: COLORS.white, accent: COLORS.lilac, text: COLORS.charcoal, logoVariant: "dark" },
];

/** Illustration options available in the picker. */
export const ILLUSTRATIONS: IllustrationOption[] = [
  { id: "none", label: "None" },
  { id: "01", label: "Consulting" },
  { id: "02", label: "Direction" },
  { id: "03", label: "Protection" },
  { id: "04", label: "Mobile" },
  { id: "05", label: "Documents" },
  { id: "06", label: "Health" },
  { id: "07", label: "Security" },
  { id: "08", label: "Growth €" },
  { id: "09", label: "Horizon" },
  { id: "10", label: "Global" },
  { id: "11", label: "Building" },
];

/** Palette colours a user can pick for the illustration background panel. */
export const ILLUSTRATION_ACCENTS: Array<{ id: string; name: string }> = [
  { id: COLORS.lilac, name: "Lilac" },
  { id: COLORS.yellow, name: "Yellow" },
  { id: COLORS.lime, name: "Lime" },
  { id: COLORS.blue, name: "Blue" },
  { id: COLORS.white, name: "White" },
  { id: COLORS.charcoal, name: "Dark" },
];

/** basePath-aware asset URL. Raw <img src="..."> tags ignore Next's
 * assetPrefix, so for GitHub Pages project sites we must prepend the
 * basePath ourselves. NEXT_PUBLIC_BASE_PATH is set by the GitHub Actions
 * workflow at build time; locally it's empty. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Logo file paths — kept as a helper so components stay short. */
export function logoSrc(variant: LogoVariant): string {
  const map: Record<LogoVariant, string> = {
    dark: `${BASE}/assets/logos/alternative-logo.svg`,
    white: `${BASE}/assets/logos/alternative-logo-white.svg`,
    lime: `${BASE}/assets/logos/alternative-logo-light-lime.svg`,
    blue: `${BASE}/assets/logos/alternative-logo-pale-blue.svg`,
    yellow: `${BASE}/assets/logos/alternative-logo-pale-yellow.svg`,
  };
  return map[variant] ?? map.dark;
}

export function illusSrc(id: string): string {
  if (id === "none") return "";
  // SVG variants render white-only paths on transparent background, so the
  // surrounding `illusAccent` panel controls the perceived colour. PNG stays
  // around as a legacy asset but isn't used by templates anymore.
  return `${BASE}/assets/illustrations/illustration-${id}.svg`;
}

import type { DesignContent } from "@/types";

/** Resolve which image src a template should show for its illustration slot.
 * If the user has uploaded a custom image we use that (data URL); otherwise we
 * fall back to the brand SVG. Returns null when there's nothing to render. */
export function resolveIllustration(content: DesignContent): { src: string; isCustom: boolean } | null {
  if (content.customIllustration) return { src: content.customIllustration, isCustom: true };
  if (content.illustration && content.illustration !== "none") {
    return { src: illusSrc(content.illustration), isCustom: false };
  }
  return null;
}

export function assetPath(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getColorScheme(id: PaletteKey): ColorScheme {
  return COLOR_SCHEMES.find((c) => c.id === id) ?? COLOR_SCHEMES[0];
}

/** Pick a random color scheme — used for fresh design defaults so new users
 * don't always land on lilac and perceive the tool as "purple only". */
export function randomColorScheme(): ColorScheme {
  const idx = Math.floor(Math.random() * COLOR_SCHEMES.length);
  return COLOR_SCHEMES[idx];
}

/** Multiplier for the optional per-design body-size control.
 *  Applied by templates to their base body font size. */
export function bodyScale(size: DesignContent["bodySize"]): number {
  if (size === "S") return 0.78;
  if (size === "L") return 1.3;
  return 1;
}

/** Type tokens — mirrored from README §Typography. */
export const TYPE = {
  display: {
    family: "'Mukta', sans-serif",
    weight: 400,
    case: "uppercase" as const,
    letterSpacing: "-0.05em",
    lineHeight: 0.9,
  },
  body: {
    family: "'Arimo', sans-serif",
    weight: 400,
    lineHeight: 1.5,
  },
  subhead: {
    family: "'Arimo', sans-serif",
    weight: 500,
    lineHeight: 1.3,
  },
  descriptor: {
    family: "'Mukta', sans-serif",
    weight: 500,
    case: "uppercase" as const,
    letterSpacing: "0.05em",
  },
};
