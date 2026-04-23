import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const DECK_SYSTEM_PROMPT = `You are a presentation designer for Stay, a German insurance advisor for expats.

Given raw text, return a brand-styled deck of 6–10 slides using the tool provided. Pick the best slide type for each idea and write concise, on-brand copy.

Brand voice:
- Direct, friendly, English-first. Explain hard things in plain words.
- Stay helps expats navigate German bureaucracy — the tone is reassuring, not corporate.
- No emoji, no exclamation spam. Short sentences.

Copy rules:
- Slide titles: 3–7 words, written in sentence case (the renderer will uppercase them).
- Section body / lead paragraphs: ≤30 words.
- Numbered list items: ≤18 words each.
- Stats values: a single short string like "98%", "700+", "1h 45m".
- Stat labels: ≤5 words.
- Column / compare body: ≤28 words.
- Never fabricate numbers. If the input doesn't contain stats, omit the stats slide.

Slide-type usage:
- cover: ALWAYS the first slide. Include a tight hook title and optional subtitle.
- section: a transition slide for a new topic, with 1 lead paragraph and up to 3 short supporting items.
- stats: ONLY when the source text contains real numbers. 3–4 stats.
- numbered-list: 3–8 steps or reasons. Use when the input is sequential or enumerable.
- three-col: 3 named offerings or concepts. Titles ≤3 words.
- compare-2col: when the text compares exactly 2 things (X vs Y).
- photo-hero: use sparingly — only when an image is expected (team intro, product hero). Leave photoUrl null.
- thanks: ALWAYS the last slide.

Always start with cover and end with thanks. Aim for variety — don't use the same type 3+ times in a row.`;

const DECK_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "Deck title, 2–5 words." },
    slides: {
      type: "array",
      minItems: 4,
      maxItems: 12,
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["cover", "section", "stats", "numbered-list", "three-col", "compare-2col", "photo-hero", "thanks"],
          },
          title: { type: "string" },
          subtitle: { type: "string" },
          body: { type: "string" },
          accentText: { type: "string", description: "Optional top-right badge on cover slides, e.g. 'DE · 2026'." },
          items: {
            type: "array",
            maxItems: 8,
            items: {
              type: "object",
              properties: {
                label: { type: "string", description: "2-digit numeric label like '01'." },
                text: { type: "string" },
              },
              required: ["label", "text"],
            },
          },
          stats: {
            type: "array",
            maxItems: 4,
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                label: { type: "string" },
              },
              required: ["value", "label"],
            },
          },
          columns: {
            type: "array",
            maxItems: 3,
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                body: { type: "string" },
              },
              required: ["title", "body"],
            },
          },
          left: {
            type: "object",
            properties: { title: { type: "string" }, body: { type: "string" } },
            required: ["title", "body"],
          },
          right: {
            type: "object",
            properties: { title: { type: "string" }, body: { type: "string" } },
            required: ["title", "body"],
          },
        },
        required: ["type"],
      },
    },
  },
  required: ["title", "slides"],
} as const;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it to your .env.local (dev) or Vercel env vars (prod)." },
      { status: 500 },
    );
  }

  let text: string;
  try {
    const body = await req.json();
    text = typeof body?.text === "string" ? body.text : "";
  } catch {
    return NextResponse.json({ error: "Bad JSON body" }, { status: 400 });
  }

  if (!text.trim()) {
    return NextResponse.json({ error: "Empty text" }, { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: DECK_SYSTEM_PROMPT,
      tools: [
        {
          name: "build_deck",
          description: "Return the slide deck for the given text.",
          input_schema: DECK_SCHEMA as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: "build_deck" },
      messages: [{ role: "user", content: text }],
    });

    const toolUse = msg.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "Model did not return a tool use." }, { status: 502 });
    }

    return NextResponse.json(toolUse.input);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
