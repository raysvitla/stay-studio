// Stay Studio — shared types

export type PaletteKey =
  | "lilac"
  | "yellow"
  | "lime"
  | "blue"
  | "dark"
  | "white";

export type LogoVariant = "dark" | "white" | "lime" | "blue" | "yellow";

export interface ColorScheme {
  id: PaletteKey;
  name: string;
  bg: string;
  accent: string;
  text: string;
  logoVariant: LogoVariant;
}

export type FormatCategory =
  | "organic-social"
  | "meta-ads"
  | "google-youtube"
  | "email-misc";

export interface FormatSpec {
  /** Internal slug, e.g. 'ig-square' */
  id: string;
  label: string;
  category: FormatCategory;
  sub: string;
  /** Export width in pixels */
  w: number;
  /** Export height in pixels */
  h: number;
  /** Safe zone in pixels (top/right/bottom/left) — relevant for ads */
  safeZone?: { top: number; right: number; bottom: number; left: number };
  /** Ratio string (1:1, 9:16, etc.) — for display only */
  ratio: string;
}

export interface StyleSpec {
  id: string;
  label: string;
  /** Which template component renders this style */
  component: string;
  /** Field IDs this style uses (for hiding irrelevant controls) */
  fields: Array<keyof DesignContent>;
}

export interface IllustrationOption {
  id: string;
  label: string;
}

/** The user-editable fields stored per design. */
export interface DesignContent {
  headline: string;
  body: string;
  cta: string;
  stat: string;
  statLabel: string;
  illustration: string;
  illusAccent: string;
  url: string;
  /** Optional photo — data URI for now (localStorage), R2 URL later. */
  photoUrl: string | null;
  /** User-uploaded custom illustration (data URL) — overrides `illustration` when set. */
  customIllustration?: string | null;
  /** Small accent label on YouTube thumbnails (e.g. "2025", "EP. 3"). */
  accentText?: string | null;
  /** Optional 4-cell stat grid data for `stat-grid` style. */
  stats?: Array<{ value: string; label: string }> | null;
  /** Optional comparison-table data for `compare-table` style. */
  table?: SlideTable | null;
  /** Body text size multiplier. See `bodyScale()` for the per-step multipliers.
   *  Lets users tighten a list or emphasise a short body without changing templates. */
  bodySize?: "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | null;
  /** Headline size multiplier. See `headlineScale()` for the per-step multipliers.
   *  Lets users punch up short headlines or fit longer ones without overflow. */
  headlineSize?: "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | null;
  /** When true, the Stay logo is hidden in the rendered template. */
  hideLogo?: boolean;
  /** When true, the URL / handle line is hidden in the rendered template. */
  hideUrl?: boolean;
  /** When true, the CTA pill is hidden even if `cta` text is set.
   *  (Clearing `cta` also hides it; this lets users pre-fill copy and toggle visibility.) */
  hideCta?: boolean;
  /** Optional override for the giant opening-quote glyph in the Quote layout.
   *  Hex string. When unset, falls back to the palette's accent colour. */
  quoteMarkColor?: string | null;
  /** Optional override for the attribution-pill background in the Quote layout.
   *  Hex string. When unset, falls back to the palette's accent colour. */
  quotePillBg?: string | null;
}

/** A single slide inside a carousel design. Each slide has its own content. */
export interface CarouselSlide {
  id: string;
  content: DesignContent;
}

export interface Design {
  id: string;
  name: string;
  format: string;
  style: string;
  color: PaletteKey;
  content: DesignContent;
  /** If present, design is a carousel (multi-slide). Overrides `content` at render time. */
  slides?: CarouselSlide[];
  /** Base64 thumbnail PNG for listing UI (optional). */
  thumbnail?: string;
  createdAt: number;
  updatedAt: number;
}

export interface TemplateRenderProps {
  c: ColorScheme;
  state: Design;
  /** For carousel templates — which slide (0-indexed) to render. */
  slideIndex?: number;
}

// ── Presentations ──────────────────────────────────────────────────────

export type SlideType =
  | "cover"
  | "section"
  | "stats"
  | "numbered-list"
  | "three-col"
  | "compare-2col"
  | "compare-table"
  | "photo-hero"
  | "thanks";

/** Kebab-case icon identifier from the central catalog (`icon-catalog.ts`).
 *  Loose-typed `string` so we don't have to mirror the catalog here every time
 *  it grows. Validation happens at render time via `ICON_BY_NAME`. */
export type SlideIconName = string;

export type IllustrationId = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11";

export type IllustrationSource =
  | { kind: "brand"; id: IllustrationId; accent: string }
  | { kind: "custom"; dataUrl: string }
  | null;

export interface SlideItem {
  label: string;
  text: string;
  icon?: SlideIconName | null;
}

export interface SlideStat {
  value: string;
  label: string;
}

export interface SlideColumn {
  title: string;
  body: string;
  icon?: SlideIconName | null;
}

export interface SlideCompareSide {
  title: string;
  body: string;
  icon?: SlideIconName | null;
}

export type TableCell =
  | { kind: "text"; value: string; highlight?: boolean }
  | { kind: "check" }
  | { kind: "cross" };

export interface TableRow {
  label: string;
  icon?: SlideIconName | null;
  cells: TableCell[];
}

export interface TableFooterCell {
  label: string;
  highlight?: boolean;
}

export interface SlideTable {
  columns: string[];
  rows: TableRow[];
  footer?: TableFooterCell[] | null;
}

export interface Slide {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  body?: string;
  items?: SlideItem[];
  stats?: SlideStat[];
  columns?: SlideColumn[];
  left?: SlideCompareSide;
  right?: SlideCompareSide;
  photoUrl?: string | null;
  accentText?: string | null;
  illustration?: IllustrationSource;
  table?: SlideTable | null;
}

export interface Presentation {
  id: string;
  name: string;
  palette: PaletteKey;
  slides: Slide[];
  createdAt: number;
  updatedAt: number;
  /** New decks default to "white" (canvas stays white, palette tints accents).
   * Old decks created before this field was introduced default to "tinted" so
   * their look doesn't change retroactively. */
  canvasMode?: "white" | "tinted";
}

export interface SlideRenderProps {
  c: ColorScheme;
  slide: Slide;
  pageNumber?: number;
  totalPages?: number;
  canvasMode?: "white" | "tinted";
}
