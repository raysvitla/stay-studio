import type { ComponentType } from "react";
import type { Slide, SlideType, SlideRenderProps } from "@/types";

import CoverSlide from "@/components/presentations/slides/CoverSlide";
import SectionSlide from "@/components/presentations/slides/SectionSlide";
import StatsSlide from "@/components/presentations/slides/StatsSlide";
import NumberedListSlide from "@/components/presentations/slides/NumberedListSlide";
import ThreeColSlide from "@/components/presentations/slides/ThreeColSlide";
import Compare2Slide from "@/components/presentations/slides/Compare2Slide";
import PhotoHeroSlide from "@/components/presentations/slides/PhotoHeroSlide";
import ThanksSlide from "@/components/presentations/slides/ThanksSlide";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export const SLIDE_COMPONENTS: Record<SlideType, ComponentType<SlideRenderProps>> = {
  cover: CoverSlide,
  section: SectionSlide,
  stats: StatsSlide,
  "numbered-list": NumberedListSlide,
  "three-col": ThreeColSlide,
  "compare-2col": Compare2Slide,
  "photo-hero": PhotoHeroSlide,
  thanks: ThanksSlide,
};

export const SLIDE_TYPE_LABELS: Record<SlideType, string> = {
  cover: "Cover",
  section: "Section intro",
  stats: "Stats",
  "numbered-list": "Numbered list",
  "three-col": "Three columns",
  "compare-2col": "Comparison (2 col)",
  "photo-hero": "Photo hero",
  thanks: "Thanks / closing",
};

export const SLIDE_TYPE_ORDER: SlideType[] = [
  "cover",
  "section",
  "stats",
  "numbered-list",
  "three-col",
  "compare-2col",
  "photo-hero",
  "thanks",
];

export function newSlideId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Fresh defaults per slide type so newly-added slides have visible content. */
export function defaultSlide(type: SlideType): Slide {
  const base: Slide = { id: newSlideId(), type };
  switch (type) {
    case "cover":
      return { ...base, title: "We know the rules\nso you don't have to.", subtitle: "Insurance in Germany, made simple.", accentText: "DE · 2026" };
    case "section":
      return {
        ...base,
        title: "Insurance knowledge",
        body: "Three things every expat should know before picking a plan.",
        items: [
          { label: "01", text: "Public vs private — the real differences, in plain language." },
          { label: "02", text: "When PKV beats GKV (and when it doesn't)." },
          { label: "03", text: "How to switch without losing coverage." },
        ],
      };
    case "stats":
      return {
        ...base,
        title: "Stay philosophy",
        stats: [
          { value: "98%", label: "Customer satisfaction" },
          { value: "700+", label: "Expats onboarded" },
          { value: "92%", label: "Response within 2h" },
          { value: "1h 45m", label: "Average first reply" },
        ],
      };
    case "numbered-list":
      return {
        ...base,
        title: "How we work",
        items: [
          { label: "01", text: "You tell us about your situation." },
          { label: "02", text: "We compare plans across major German insurers." },
          { label: "03", text: "We explain pros and cons in English — no jargon." },
          { label: "04", text: "You pick. We handle paperwork." },
        ],
      };
    case "three-col":
      return {
        ...base,
        title: "Our services",
        columns: [
          { title: "Health insurance", body: "Public, private, and expat plans — we find the one that fits your income, family, and plans." },
          { title: "Pensions", body: "Riester, Rürup, or private — we translate the fine print and recommend the right fit." },
          { title: "General insurance", body: "Liability, home, legal — all in one place, in one language." },
        ],
      };
    case "compare-2col":
      return {
        ...base,
        title: "The dual system",
        left: { title: "GKV · Public", body: "Income-based premiums. Mandatory for most employees. Covers families for free." },
        right: { title: "PKV · Private", body: "Age-based premiums. Better doctor access, more services — but can be expensive later." },
      };
    case "photo-hero":
      return {
        ...base,
        title: "Meet the team.",
        subtitle: "Real humans. Fast replies. English-first.",
      };
    case "thanks":
      return { ...base, title: "Thanks for choosing\nand trusting us.", subtitle: "stayinsured.de" };
  }
}
