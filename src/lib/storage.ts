// Stay Studio — localStorage persistence
// Phase 1 uses browser storage per user. Phase 2 swaps this file for an API
// client hitting /api/designs/*. Keep the shape stable so the swap is
// mechanical.

import type { Design } from "@/types";

const CURRENT_DRAFT_KEY = "stay_studio_current_draft";
const DESIGNS_KEY = "stay_studio_designs";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Load the user's in-progress draft (auto-saved on every edit). */
export function loadCurrentDraft(): Design | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Design;
  } catch {
    return null;
  }
}

export function saveCurrentDraft(design: Design): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(design));
  } catch {
    // Quota exceeded — ignore. The user can still export.
  }
}

/** Library of named/saved designs. */
export function listDesigns(): Design[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(DESIGNS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Design[];
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
