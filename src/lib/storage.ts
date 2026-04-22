// Stay Studio — localStorage persistence
// Phase 1 uses browser storage per user. Phase 2 swaps this file for an API
// client hitting /api/designs/*. Keep the shape stable so the swap is
// mechanical.

import type { Design, PaletteKey } from "@/types";

const CURRENT_DRAFT_KEY = "stay_studio_current_draft";
const DESIGNS_KEY = "stay_studio_designs";
const VALID_PALETTE: readonly PaletteKey[] = ["lilac", "yellow", "lime", "blue", "white", "dark"];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Drop palette keys we no longer ship (mint/peach/rose/sand) so old drafts
 * don't crash the UI on load — fall back to lilac. */
function migratePalette<T extends { color: PaletteKey | string }>(design: T): T {
  if (!VALID_PALETTE.includes(design.color as PaletteKey)) {
    return { ...design, color: "lilac" as PaletteKey };
  }
  return design;
}

/** Load the user's in-progress draft (auto-saved on every edit). */
export function loadCurrentDraft(): Design | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_DRAFT_KEY);
    if (!raw) return null;
    return migratePalette(JSON.parse(raw) as Design);
  } catch {
    return null;
  }
}

let quotaWarned = false;

export function saveCurrentDraft(design: Design): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(design));
  } catch (e) {
    if (!quotaWarned && e instanceof Error && /quota/i.test(e.message ?? e.name)) {
      quotaWarned = true;
      window.alert("Draft too large to auto-save (likely a big uploaded photo). Export before reloading the page or remove the photo.");
    }
  }
}

/** Library of named/saved designs. */
export function listDesigns(): Design[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(DESIGNS_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as Design[]).map(migratePalette);
  } catch {
    return [];
  }
}

export function saveDesign(design: Design): void {
  if (!isBrowser()) return;
  const all = listDesigns();
  const idx = all.findIndex((d) => d.id === design.id);
  if (idx >= 0) all[idx] = design;
  else all.push(design);
  try {
    window.localStorage.setItem(DESIGNS_KEY, JSON.stringify(all));
  } catch {
    // Quota — ignore.
  }
}

export function deleteDesign(id: string): void {
  if (!isBrowser()) return;
  const all = listDesigns().filter((d) => d.id !== id);
  window.localStorage.setItem(DESIGNS_KEY, JSON.stringify(all));
}

export function newDesignId(): string {
  return `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
