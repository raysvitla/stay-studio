// Stay Studio — batch & multi-slide PNG export
//
// Bundles multiple PNGs into a ZIP the user can download in one click.
// Used in three places:
//   1. Carousel export — every slide of the current design as one ZIP.
//   2. "All formats" export — the current design rendered into every ready
//      format.
//   3. "All saved designs" — each design in the saved-library rendered as
//      its own PNG in one ZIP.
//
// Rendering uses an off-screen <div> in the live DOM (React + createRoot)
// because `html-to-image` needs the target element to be attached for
// layout + font resolution. We mount, wait one frame for fonts, snapshot,
// then unmount.

import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import React from "react";

import type { Design } from "@/types";
import { getFormat, readyFormats, isCarouselFormat } from "@/lib/formats";
import { getColorScheme } from "@/lib/brand";
import { getTemplate } from "@/lib/templates";

interface RenderedFrame {
  name: string;
  dataUrl: string;
}

export interface ExportOptions {
  /** 1 = native size, 2 = retina/HD (default). Caller controls this via the
   * "HD export" toggle in Controls. */
  pixelRatio?: number;
}

/** Mount an off-screen container and render a single design frame at full
 * resolution, snapshot as PNG, unmount. Returns a data URL. */
async function renderFrame(design: Design, slideIndex: number | undefined, pixelRatio = 2): Promise<string> {
  const fmt = getFormat(design.format);
  const scheme = getColorScheme(design.color);
  const Template = getTemplate(design.format, design.style);

  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.top = "-99999px";
  host.style.left = "0";
  host.style.width = `${fmt.w}px`;
  host.style.height = `${fmt.h}px`;
  host.style.pointerEvents = "none";
  document.body.appendChild(host);

  const root: Root = createRoot(host);
  const inner = document.createElement("div");
  inner.style.width = `${fmt.w}px`;
  inner.style.height = `${fmt.h}px`;
  inner.style.background = scheme.bg;
  host.appendChild(inner);

  const innerRoot = createRoot(inner);
  flushSync(() => {
    innerRoot.render(
      React.createElement(Template, { c: scheme, state: design, slideIndex }),
    );
  });

  // Give the browser a frame so fonts/images settle before snapshotting.
  await new Promise((r) => setTimeout(r, 120));

  try {
    const dataUrl = await toPng(inner, {
      width: fmt.w,
      height: fmt.h,
      pixelRatio,
      cacheBust: true,
    });
    return dataUrl;
  } finally {
    innerRoot.unmount();
    root.unmount();
    host.remove();
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(meta)?.[1] ?? "image/png";
  const bin = atob(b64);
  const len = bin.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) arr[i] = bin.charCodeAt(i);
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
  return s.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "untitled";
}

/** Export a carousel design: one PNG per slide, bundled into a ZIP. */
export async function exportCarousel(design: Design, opts: ExportOptions = {}): Promise<void> {
  if (!isCarouselFormat(design.format)) {
    throw new Error("Design is not a carousel");
  }
  const slides = design.slides ?? [];
  if (slides.length === 0) throw new Error("Carousel has no slides");
  const pr = opts.pixelRatio ?? 2;

  const frames: RenderedFrame[] = [];
  for (let i = 0; i < slides.length; i++) {
    const dataUrl = await renderFrame(design, i, pr);
    frames.push({ name: `carousel-${String(i + 1).padStart(2, "0")}.png`, dataUrl });
  }

  const zip = new JSZip();
  for (const f of frames) zip.file(f.name, dataUrlToBlob(f.dataUrl));
  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `stay-${slug(design.name)}-carousel.zip`);
}

/** Render the current design into EVERY ready format (keeping style mapping
 * best-effort) and bundle into a ZIP. Carousel format is skipped because it
 * needs multi-slide data; include only single-image formats. */
export async function exportAllFormats(design: Design, opts: ExportOptions = {}): Promise<void> {
  const formats = readyFormats().filter((f) => !isCarouselFormat(f.id));
  const zip = new JSZip();
  const pr = opts.pixelRatio ?? 2;

  for (const f of formats) {
    // Use the first available style for that format; fall back keeps original style.
    const clone: Design = { ...design, format: f.id };
    try {
      const dataUrl = await renderFrame(clone, undefined, pr);
      zip.file(`${f.id}.png`, dataUrlToBlob(dataUrl));
    } catch (err) {
      console.warn(`Failed to render ${f.id}:`, err);
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `stay-${slug(design.name)}-all-formats.zip`);
}

/** Export a list of saved designs as a single ZIP — one PNG per design. */
export async function exportSavedDesigns(designs: Design[], opts: ExportOptions = {}): Promise<void> {
  if (designs.length === 0) return;
  const zip = new JSZip();
  const pr = opts.pixelRatio ?? 2;

  for (const d of designs) {
    if (isCarouselFormat(d.format) && d.slides && d.slides.length > 0) {
      // Each carousel gets its own subfolder with its slides.
      const folder = zip.folder(slug(d.name) || d.id);
      if (!folder) continue;
      for (let i = 0; i < d.slides.length; i++) {
        const dataUrl = await renderFrame(d, i, pr);
        folder.file(`slide-${String(i + 1).padStart(2, "0")}.png`, dataUrlToBlob(dataUrl));
      }
    } else {
      const dataUrl = await renderFrame(d, undefined, pr);
      zip.file(`${slug(d.name)}-${d.format}.png`, dataUrlToBlob(dataUrl));
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, "stay-studio-designs.zip");
}
