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

const SHARED_FIELDS_CORE = ["headline", "body", "cta", "url"] as const;

export const STYLES: Record<string, StyleSpec[]> = {
  "ig-post": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
  ],
  "ig-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
  ],
  "ig-story": [
    { id: "hero", label: "Hero", component: "IgStoryHero", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stacked", label: "Stacked", component: "IgStoryStacked", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
  ],
  "li-post": [
    { id: "split", label: "Split", component: "LiPostSplit", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "bold", label: "Bold", component: "LiPostBold", fields: [...SHARED_FIELDS_CORE] },
  ],
  "li-banner": [
    { id: "clean", label: "Clean", component: "LiBannerClean", fields: ["headline", "url", "illustration"] },
  ],
  "li-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
  ],
  // Meta paid ads — same visual system as organic, but the user gets the right
  // export dimensions and can toggle ad safe zones. Templates are reused.
  "meta-feed-square": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
  ],
  "meta-feed-portrait": [
    { id: "statement", label: "Statement", component: "IgPostStatement", fields: [...SHARED_FIELDS_CORE] },
    { id: "illustrated", label: "Illustrated", component: "IgPostIllustrated", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stats", label: "Stats", component: "IgPostStats", fields: [...SHARED_FIELDS_CORE, "stat", "statLabel"] },
  ],
  "meta-story-ad": [
    { id: "hero", label: "Hero", component: "IgStoryHero", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
    { id: "stacked", label: "Stacked", component: "IgStoryStacked", fields: [...SHARED_FIELDS_CORE, "illustration", "illusAccent"] },
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
  ],
};

const TEMPLATE_MAP: Record<string, ComponentType<TemplateRenderProps>> = {
  "ig-post--statement": IgPostStatement,
  "ig-post--illustrated": IgPostIllustrated,
  "ig-post--stats": IgPostStats,
  "ig-square--statement": IgPostStatement,
  "ig-square--illustrated": IgPostIllustrated,
  "ig-square--stats": IgPostStats,
  "ig-story--hero": IgStoryHero,
  "ig-story--stacked": IgStoryStacked,
  "li-post--split": LiPostSplit,
  "li-post--bold": LiPostBold,
  "li-banner--clean": LiBannerClean,
  "li-square--statement": IgPostStatement,
  "li-square--illustrated": IgPostIllustrated,
  "li-square--stats": IgPostStats,
  "meta-feed-square--statement": IgPostStatement,
  "meta-feed-square--illustrated": IgPostIllustrated,
  "meta-feed-square--stats": IgPostStats,
  "meta-feed-portrait--statement": IgPostStatement,
  "meta-feed-portrait--illustrated": IgPostIllustrated,
  "meta-feed-portrait--stats": IgPostStats,
  "meta-story-ad--hero": IgStoryHero,
  "meta-story-ad--stacked": IgStoryStacked,
  "meta-carousel--slide": CarouselSlide,
  "ig-carousel--slide": CarouselSlide,
  "og-image--split": LiPostSplit,
  "og-image--bold": LiPostBold,
};

export function getTemplate(format: string, style: string): ComponentType<TemplateRenderProps> {
  return TEMPLATE_MAP[`${format}--${style}`] ?? IgPostStatement;
}

export function getStyles(format: string): StyleSpec[] {
  return STYLES[format] ?? [];
}
