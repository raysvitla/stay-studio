// Stay Studio — deck export (ZIP of PNGs + single PDF).
// Mirrors src/lib/batchExport.ts — renders each slide off-screen with
// html-to-image at full 1920×1080, then bundles. PDF uses jsPDF.

import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import React from "react";

import type { ColorScheme, Presentation, Slide } from "@/types";
import { getColorScheme } from "@/lib/brand";
import { SLIDE_COMPONENTS, SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/presentations/slideRegistry";

export interface DeckExportOptions {
  pixelRatio?: number;
}

async function renderSlideToPng(
  slide: Slide,
  c: ColorScheme,
  pixelRatio: number,
  ctx: { pageNumber: number; totalPages: number; canvasMode: "white" | "tinted" },
): Promise<string> {
  const Slide = SLIDE_COMPONENTS[slide.type];
  if (!Slide) throw new Error(`Unknown slide type: ${slide.type}`);

  const useWhite = ctx.canvasMode === "white" && c.id !== "dark";
  const canvasBg = useWhite ? "#FFFFFF" : c.bg;
  const canvasFg = useWhite ? "#3C3C3C" : c.text;

  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.top = "-99999px";
  host.style.left = "0";
  host.style.width = `${SLIDE_WIDTH}px`;
  host.style.height = `${SLIDE_HEIGHT}px`;
  host.style.pointerEvents = "none";
  document.body.appendChild(host);

  const inner = document.createElement("div");
  inner.style.width = `${SLIDE_WIDTH}px`;
  inner.style.height = `${SLIDE_HEIGHT}px`;
  inner.style.background = canvasBg;
  inner.style.color = canvasFg;
  host.appendChild(inner);

  const innerRoot: Root = createRoot(inner);
  flushSync(() => {
    innerRoot.render(
      React.createElement(Slide, {
        c,
        slide,
        pageNumber: ctx.pageNumber,
        totalPages: ctx.totalPages,
        canvasMode: ctx.canvasMode,
      }),
    );
  });

  await new Promise((r) => setTimeout(r, 200));

  try {
    const dataUrl = await toPng(inner, {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      pixelRatio,
      cacheBust: true,
    });
    return dataUrl;
  } finally {
    innerRoot.unmount();
    host.remove();
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(meta)?.[1] ?? "image/png";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function slug(s: string): string {
  return s.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "deck";
}

export async function exportDeckAsZip(p: Presentation, opts: DeckExportOptions = {}): Promise<void> {
  if (p.slides.length === 0) throw new Error("Deck has no slides");
  const c = getColorScheme(p.palette);
  const pr = opts.pixelRatio ?? 2;
  const canvasMode = p.canvasMode ?? "tinted";
  const zip = new JSZip();
  for (let i = 0; i < p.slides.length; i++) {
    const dataUrl = await renderSlideToPng(p.slides[i], c, pr, {
      pageNumber: i + 1,
      totalPages: p.slides.length,
      canvasMode,
    });
    zip.file(`slide-${String(i + 1).padStart(2, "0")}.png`, dataUrlToBlob(dataUrl));
  }
  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `stay-${slug(p.name)}.zip`);
}

export async function exportDeckAsPdf(p: Presentation, opts: DeckExportOptions = {}): Promise<void> {
  if (p.slides.length === 0) throw new Error("Deck has no slides");
  const c = getColorScheme(p.palette);
  const pr = opts.pixelRatio ?? 2;
  const canvasMode = p.canvasMode ?? "tinted";

  const { default: jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SLIDE_WIDTH, SLIDE_HEIGHT] });

  for (let i = 0; i < p.slides.length; i++) {
    const dataUrl = await renderSlideToPng(p.slides[i], c, pr, {
      pageNumber: i + 1,
      totalPages: p.slides.length,
      canvasMode,
    });
    if (i > 0) pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT], "landscape");
    pdf.addImage(dataUrl, "PNG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
  }

  pdf.save(`stay-${slug(p.name)}.pdf`);
}
