import type { PaletteKey, Presentation } from "@/types";

const CURRENT_KEY = "stay_studio_current_presentation";
const LIBRARY_KEY = "stay_studio_presentations";
const VALID_PALETTE: readonly PaletteKey[] = ["lilac", "yellow", "lime", "blue", "white", "dark"];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function migratePalette<T extends { palette: PaletteKey | string }>(p: T): T {
  if (!VALID_PALETTE.includes(p.palette as PaletteKey)) {
    return { ...p, palette: "lilac" as PaletteKey };
  }
  return p;
}

export function loadCurrentPresentation(): Presentation | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    return migratePalette(JSON.parse(raw) as Presentation);
  } catch {
    return null;
  }
}

let quotaWarned = false;

export function saveCurrentPresentation(p: Presentation): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CURRENT_KEY, JSON.stringify(p));
  } catch (e) {
    if (!quotaWarned && e instanceof Error && /quota/i.test(e.message ?? e.name)) {
      quotaWarned = true;
      window.alert("Deck too large to auto-save (likely a big uploaded photo). Export before reloading or remove the photo.");
    }
  }
}

export function listPresentations(): Presentation[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(LIBRARY_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as Presentation[]).map(migratePalette);
  } catch {
    return [];
  }
}

export function newPresentationId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
