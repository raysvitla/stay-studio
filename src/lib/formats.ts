// Stay Studio — format catalog
// All 24 formats live here. Phase 1 ships templates for the ones marked
// with `status: 'ready'`. The rest are listed so they appear (disabled) in
// the UI and we know the full scope.
//
// Dimensions are the exact export sizes. Safe zones matter for Meta ad
// formats so marketers don't put critical text under the platform's UI.

import type { FormatSpec } from "@/types";

export type FormatStatus = "ready" | "planned";

export interface FormatCatalogEntry extends FormatSpec {
  status: FormatStatus;
}

export const FORMATS: FormatCatalogEntry[] = [
  // ── Organic social ────────────────────────────────────────────────────
  { id: "ig-post", label: "Instagram Post", category: "organic-social", sub: "1080 × 1350 (4:5)", w: 1080, h: 1350, ratio: "4:5", status: "ready" },
  { id: "ig-square", label: "Instagram Square", category: "organic-social", sub: "1080 × 1080 (1:1)", w: 1080, h: 1080, ratio: "1:1", status: "ready" },
  { id: "ig-story", label: "Instagram Story", category: "organic-social", sub: "1080 × 1920 (9:16)", w: 1080, h: 1920, ratio: "9:16", status: "ready", safeZone: { top: 250, right: 0, bottom: 340, left: 0 } },
  { id: "li-post", label: "LinkedIn Post", category: "organic-social", sub: "1200 × 627 (1.91:1)", w: 1200, h: 627, ratio: "1.91:1", status: "ready" },
  { id: "li-square", label: "LinkedIn Square", category: "organic-social", sub: "1200 × 1200 (1:1)", w: 1200, h: 1200, ratio: "1:1", status: "ready" },
  { id: "ig-carousel", label: "Instagram Carousel", category: "organic-social", sub: "1080 × 1080 (1:1, 2–10 slides)", w: 1080, h: 1080, ratio: "1:1", status: "ready" },
  { id: "li-banner", label: "LinkedIn Banner", category: "organic-social", sub: "1584 × 396", w: 1584, h: 396, ratio: "4:1", status: "ready" },
  { id: "x-post", label: "X / Twitter Post", category: "organic-social", sub: "1600 × 900 (16:9)", w: 1600, h: 900, ratio: "16:9", status: "planned" },

  // ── Meta paid ads ─────────────────────────────────────────────────────
  { id: "meta-feed-square", label: "Meta Feed Ad — Square", category: "meta-ads", sub: "1080 × 1080", w: 1080, h: 1080, ratio: "1:1", status: "ready" },
  { id: "meta-feed-portrait", label: "Meta Feed Ad — Portrait", category: "meta-ads", sub: "1080 × 1350", w: 1080, h: 1350, ratio: "4:5", status: "ready" },
  { id: "meta-story-ad", label: "Meta Story & Reel Ad", category: "meta-ads", sub: "1080 × 1920", w: 1080, h: 1920, ratio: "9:16", status: "ready", safeZone: { top: 250, right: 0, bottom: 340, left: 0 } },
  { id: "meta-carousel", label: "Meta Carousel", category: "meta-ads", sub: "1080 × 1080 (2–10 slides)", w: 1080, h: 1080, ratio: "1:1", status: "ready" },
  { id: "meta-messenger", label: "Meta Messenger Inbox", category: "meta-ads", sub: "1200 × 628", w: 1200, h: 628, ratio: "1.91:1", status: "planned" },

  // ── Google / YouTube ──────────────────────────────────────────────────
  { id: "gads-landscape", label: "Google Display — Landscape", category: "google-youtube", sub: "1200 × 628", w: 1200, h: 628, ratio: "1.91:1", status: "planned" },
  { id: "gads-square", label: "Google Display — Square", category: "google-youtube", sub: "1200 × 1200", w: 1200, h: 1200, ratio: "1:1", status: "planned" },
  { id: "gads-leaderboard", label: "Leaderboard", category: "google-youtube", sub: "728 × 90", w: 728, h: 90, ratio: "8.1:1", status: "planned" },
  { id: "gads-mrec", label: "Medium Rectangle", category: "google-youtube", sub: "300 × 250", w: 300, h: 250, ratio: "1.2:1", status: "planned" },
  { id: "gads-halfpage", label: "Half Page", category: "google-youtube", sub: "300 × 600", w: 300, h: 600, ratio: "1:2", status: "planned" },
  { id: "gads-mobile", label: "Mobile Banner", category: "google-youtube", sub: "320 × 100", w: 320, h: 100, ratio: "3.2:1", status: "planned" },
  { id: "yt-thumbnail", label: "YouTube Thumbnail", category: "google-youtube", sub: "1280 × 720", w: 1280, h: 720, ratio: "16:9", status: "planned" },
  { id: "yt-endcard", label: "YouTube End Card", category: "google-youtube", sub: "1920 × 1080", w: 1920, h: 1080, ratio: "16:9", status: "planned" },

  // ── Email / misc ──────────────────────────────────────────────────────
  { id: "email-hero", label: "Email Hero", category: "email-misc", sub: "600 × 300", w: 600, h: 300, ratio: "2:1", status: "planned" },
  { id: "newsletter-banner", label: "Newsletter Banner", category: "email-misc", sub: "1200 × 400", w: 1200, h: 400, ratio: "3:1", status: "planned" },
  { id: "blog-hero", label: "Blog Hero", category: "email-misc", sub: "1920 × 1080", w: 1920, h: 1080, ratio: "16:9", status: "planned" },
  { id: "og-image", label: "OG / Social Share", category: "email-misc", sub: "1200 × 630", w: 1200, h: 630, ratio: "1.9:1", status: "ready" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  "organic-social": "Organic social",
  "meta-ads": "Meta paid ads",
  "google-youtube": "Google / YouTube",
  "email-misc": "Email + misc",
};

export function getFormat(id: string): FormatCatalogEntry {
  return FORMATS.find((f) => f.id === id) ?? FORMATS[0];
}

export function readyFormats(): FormatCatalogEntry[] {
  return FORMATS.filter((f) => f.status === "ready");
}

/** True when this format is a multi-slide carousel (IG / Meta). */
export function isCarouselFormat(formatId: string): boolean {
  return formatId === "ig-carousel" || formatId === "meta-carousel";
}
