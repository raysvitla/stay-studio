import type { Slide } from "@/types";
import { newSlideId } from "@/lib/presentations/slideRegistry";

export interface GenerateResult {
  title: string;
  slides: Slide[];
}

/** POSTs user text to /api/generate-deck and returns a normalized deck. */
export async function generateDeck(text: string): Promise<GenerateResult> {
  const res = await fetch("/api/generate-deck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Generation failed (${res.status}): ${body || res.statusText}`);
  }
  const json = (await res.json()) as { title?: string; slides?: Array<Omit<Slide, "id">> };
  const slides: Slide[] = (json.slides ?? []).map((s) => ({ ...s, id: newSlideId() }));
  return { title: json.title ?? "Generated deck", slides };
}
