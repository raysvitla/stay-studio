// Stay Studio — style catalog + template registry
// Maps (format, style) pairs to React components. Keep this file as the
// only place that knows what templates exist, so adding a new template is:
//   1. Create the component in components/templates/.
//   2. Add an entry to TEMPLATE_MAP + STYLES.

import type { ComponentType } from "react";
import type { StyleSpec, TemplateRenderProps } from "@/types";

import IgPostStatement from "@/components/templates/IgPostStatement";
import IgPostIllustrated from "@/components/templates/IgPostIllustrated";
import IgPostStats from "@/components/templates/IgPostStats";
import IgStoryHero from "@/components/templates/IgStoryHero";
import IgStoryStacked from "@/components/templates/IgStoryStacked";
import LiPostSplit from "@/components/templates/LiPostSplit";
import LiPostBold from "@/components/templates/LiPostBold";
import LiBannerClean from "@/components/templates/LiBannerClean";
import CarouselSlide from "@/components/templates/CarouselSlide";
import YtThumbnailAdvisor from "@/components/templates/YtThumbnailAdvisor";
import IgPhotoHero from "@/components/templates/IgPhotoHero";
import IgStatGrid from "@/components/templates/IgStatGrid";
import IgQuote from "@/components/templates/IgQuote";
import IgCompareTable from "@/components/templates/IgCompareTable";

const SHARED_FIELDS_CORE = ["headline", "body", "cta", "url"] as const;

const PHOTO_HERO: StyleSpec = { id: "photo-hero", label: "Photo hero", component: "IgPhotoHero", fields: [...SHARED_FIELDS_CORE, "photoUrl"] };
const STAT_GRID: StyleSpec = { id: "stat-grid", label: "Stat grid", component: "IgStatGrid", fields: [...SHARED_FIELDS_CORE, "stats"] };
const QUOTE: StyleSpec = { id: "quote", label: "Quote", component: "IgQuote", fields: [...SHARED_FIELDS_CORE] };
const COMPARE_TABLE: StyleSpec = { id: "compare-table", label: "Compare table", component: "IgCompareTable", fields: [...SHARED_FIELDS_CORE, "table"] };

export const STYLES: Record<string, StyleSpec[]> = {
  "ig-post": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
    PHOTO_HERO,
    STAT_GRID,
    QUOTE,
    COMPARE_TABLE,
  ],
  "ig-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
    PHOTO_HERO,
    STAT_GRID,
    QUOTE,
    COMPARE_TABLE,
  ],
  "ig-story": [
    { id: "hero", label: "Hero", component: "IgStoryHero", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stacked", label: "Stacked", component: "IgStoryStacked", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    PHOTO_HERO,
    QUOTE,
  ],
  "li-post": [
    { id: "split", label: "Split", component: "LiPostSplit", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "bold", label: "Bold", component: "LiPostBold", fields: [...SHARED_FIELDS_CORE] },
    PHOTO_HERO,
    STAT_GRID,
    QUOTE,
    COMPARE_TABLE,
  ],
  "li-banner": [
    { id: "clean", label: "Clean", component: "LiBannerClean", fields: ["headline", "url", "illustration"] },
  ],
  "li-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
    PHOTO_HERO,
    STAT_GRID,
    COMPARE_TABLE,
  ],
  // Meta paid ads — same visual system as organic, but the user gets the right
  // export dimensions and can toggle ad safe zones. Templates are reused.
  "meta-feed-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
    PHOTO_HERO,
    STAT_GRID,
    QUOTE,
    COMPARE_TABLE,
  ],
  "meta-feed-portrait": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
    PHOTO_HERO,
    QUOTE,
  ],
  "meta-story-ad": [
    { id: "hero", label: "Hero", component: "IgStoryHero", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stacked", label: "Stacked", component: "IgStoryStacked", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    PHOTO_HERO,
  ],
  "meta-carousel": [
    { id: "slide", label: "Slide", component: "CarouselSlide", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
  ],
  "ig-carousel": [
    { id: "slide", label: "Slide", component: "CarouselSlide", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
  ],
  "og-image": [
    { id: "split", label: "Split", component: "LiPostSplit", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "bold", label: "Bold", component: "LiPostBold", fields: [...SHARED_FIELDS_CORE] },
    PHOTO_HERO,
    COMPARE_TABLE,
  ],
  "yt-thumbnail": [
    { id: "advisor", label: "Advisor + Headline", component: "YtThumbnailAdvisor", fields: ["headline", "body", "url", "photoUrl", "illusAccent", "accentText"] },
  ],
};

const TEMPLATE_MAP: Record<string, ComponentType<TemplateRenderProps>> = {
  "ig-post--statement": IgPostStatement,
  "ig-post--illustrated": IgPostIllustrated,
  "ig-post--stats": IgPostStats,
  "ig-post--photo-hero": IgPhotoHero,
  "ig-post--stat-grid": IgStatGrid,
  "ig-post--quote": IgQuote,
  "ig-post--compare-table": IgCompareTable,
  "ig-square--statement": IgPostStatement,
  "ig-square--illustrated": IgPostIllustrated,
  "ig-square--stats": IgPostStats,
  "ig-square--photo-hero": IgPhotoHero,
  "ig-square--stat-grid": IgStatGrid,
  "ig-square--quote": IgQuote,
  "ig-square--compare-table": IgCompareTable,
  "ig-story--hero": IgStoryHero,
  "ig-story--stacked": IgStoryStacked,
  "ig-story--photo-hero": IgPhotoHero,
  "ig-story--quote": IgQuote,
  "li-post--split": LiPostSplit,
  "li-post--bold": LiPostBold,
  "li-post--photo-hero": IgPhotoHero,
  "li-post--stat-grid": IgStatGrid,
  "li-post--quote": IgQuote,
  "li-post--compare-table": IgCompareTable,
  "li-banner--clean": LiBannerClean,
  "li-square--statement": IgPostStatement,
  "li-square--illustrated": IgPostIllustrated,
  "li-square--stats": IgPostStats,
  "li-square--photo-hero": IgPhotoHero,
  "li-square--stat-grid": IgStatGrid,
  "li-square--compare-table": IgCompareTable,
  "meta-feed-square--statement": IgPostStatement,
  "meta-feed-square--illustrated": IgPostIllustrated,
  "meta-feed-square--stats": IgPostStats,
  "meta-feed-square--photo-hero": IgPhotoHero,
  "meta-feed-square--stat-grid": IgStatGrid,
  "meta-feed-square--quote": IgQuote,
  "meta-feed-square--compare-table": IgCompareTable,
  "meta-feed-portrait--statement": IgPostStatement,
  "meta-feed-portrait--illustrated": IgPostIllustrated,
  "meta-feed-portrait--stats": IgPostStats,
  "meta-feed-portrait--photo-hero": IgPhotoHero,
  "meta-feed-portrait--quote": IgQuote,
  "meta-story-ad--hero": IgStoryHero,
  "meta-story-ad--stacked": IgStoryStacked,
  "meta-story-ad--photo-hero": IgPhotoHero,
  "meta-carousel--slide": CarouselSlide,
  "ig-carousel--slide": CarouselSlide,
  "og-image--split": LiPostSplit,
  "og-image--bold": LiPostBold,
  "og-image--photo-hero": IgPhotoHero,
  "og-image--compare-table": IgCompareTable,
  "yt-thumbnail--advisor": YtThumbnailAdvisor,
};

export function getTemplate(format: string, style: string): ComponentType<TemplateRenderProps> {
  return TEMPLATE_MAP[`${format}--${style}`] ?? IgPostStatement;
}

export function getStyles(format: string): StyleSpec[] {
  return STYLES[format] ?? [];
}
