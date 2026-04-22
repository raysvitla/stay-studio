"use client";

// Stay Studio — editor shell
// Wires Controls + Preview + download handler + localStorage persistence.

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { Design, CarouselSlide, DesignContent } from "@/types";
import { getFormat, isCarouselFormat, readyFormats } from "@/lib/formats";
import { getStyles } from "@/lib/templates";
import { randomColorScheme } from "@/lib/brand";
import { loadCurrentDraft, saveCurrentDraft, newDesignId } from "@/lib/storage";
import { exportCarousel, exportAllFormats, exportSavedDesigns } from "@/lib/batchExport";
import Controls from "./Controls";
import Preview, { PreviewHandle } from "./Preview";

// Stable server-rendered starting state (no randomness, no Date.now()) so
// server and client HTML match during hydration. Real randomness is applied
// after mount (see effect below).
function stableDefaultDesign(): Design {
  const firstFormat = readyFormats()[0];
  const firstStyle = getStyles(firstFormat.id)[0]?.id ?? "statement";
  return {
    id: "d_ssr_placeholder",
    name: "Untitled",
    format: firstFormat.id,
    style: firstStyle,
    color: "lilac",
    content: {
      headline: "German bureaucracy is hard.\nStaying shouldn't be.",
      body: "We help international residents find the right insurance — fast and human.",
      cta: "Get a free quote →",
      stat: "3,000+",
      statLabel: "Clients protected",
      illustration: "03",
      illusAccent: "#FFFFA5",
      url: "stayinsured.de",
      photoUrl: null,
      customIllustration: null,
    },
    createdAt: 0,
    updatedAt: 0,
  };
}

function freshClientDesign(): Design {
  const base = stableDefaultDesign();
  const scheme = randomColorScheme();
  const accents = ["#FFFFA5", "#E6FFA0", "#E1F5FF", "#D9F5E5", "#FFD6C2", "#FFD4E5", "#F2E6D0", "#EBE1FF"];
  const accent = accents[Math.floor(Math.random() * accents.length)];
  return {
    ...base,
    id: newDesignId(),
    color: scheme.id,
    content: { ...base.content, illusAccent: accent },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/** Seed 3 starter slides when a user switches into a carousel format for the
 * first time — empty slides show placeholder text via CarouselSlide, which
 * is worse than giving them real starter content to edit. */
function seedCarouselSlides(base: DesignContent): CarouselSlide[] {
  return [
    {
      id: `s_${Date.now().toString(36)}_1`,
      content: { ...base, headline: "Insurance in Germany\nmade simple." },
    },
    {
      id: `s_${Date.now().toString(36)}_2`,
      content: { ...base, headline: "Everything in English.", body: "No translators, no jargon — a team that explains it like a friend." },
    },
    {
      id: `s_${Date.now().toString(36)}_3`,
      content: { ...base, headline: "Ready to switch?", cta: "Get a free quote →" },
    },
  ];
}

export default function EditorShell() {
  const [design, setDesign] = useState<Design>(stableDefaultDesign);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hdExport, setHdExport] = useState(true);
  const previewRef = useRef<PreviewHandle>(null);

  // After mount: either restore from localStorage, or pick a random fresh
  // default so new users don't always see the same lilac scheme.
  useEffect(() => {
    const saved = loadCurrentDraft();
    setDesign(saved ?? freshClientDesign());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveCurrentDraft(design);
  }, [design, ready]);

  // When switching formats, make sure the style is valid for the new format
  // and, for carousels, seed starter slides so the user isn't staring at a
  // blank canvas.
  useEffect(() => {
    const styles = getStyles(design.format);
    const styleValid = styles.some((s) => s.id === design.style);
    const next = styleValid ? design.style : styles[0]?.id;

    if (isCarouselFormat(design.format)) {
      if (!design.slides || design.slides.length === 0) {
        setDesign((d) => ({
          ...d,
          style: next ?? d.style,
          slides: seedCarouselSlides(d.content),
        }));
      } else if (!styleValid && next) {
        setDesign((d) => ({ ...d, style: next }));
      }
    } else if (!styleValid && next) {
      setDesign((d) => ({ ...d, style: next }));
    }
  }, [design.format, design.style, design.slides]);

  // Keep active slide in bounds when slides list shrinks.
  useEffect(() => {
    const total = design.slides?.length ?? 0;
    if (isCarouselFormat(design.format) && total > 0 && activeSlide >= total) {
      setActiveSlide(Math.max(0, total - 1));
    }
  }, [design.slides, design.format, activeSlide]);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      // Carousels export as a ZIP of every slide — that's what users actually
      // need when uploading to Instagram or Ads Manager.
      if (isCarouselFormat(design.format)) {
        await exportCarousel(design, { pixelRatio: hdExport ? 2 : 1 });
        return;
      }

      const el = previewRef.current?.getTemplateElement();
      if (!el) return;
      const fmt = getFormat(design.format);
      const savedTransform = el.style.transform;
      const savedPosition = el.style.position;
      try {
        el.style.transform = "none";
        el.style.position = "static";
        await new Promise((r) => setTimeout(r, 80));
        const dataUrl = await toPng(el, {
          width: fmt.w,
          height: fmt.h,
          pixelRatio: hdExport ? 2 : 1,
          cacheBust: true,
        });
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `stay-${design.format}-${design.style}-${design.color}.png`;
        a.click();
      } finally {
        el.style.transform = savedTransform;
        el.style.position = savedPosition;
      }
    } catch (e) {
      console.error("Export failed", e);
      window.alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setDownloading(false);
    }
  }, [design, downloading, hdExport]);

  const handleDownloadAllFormats = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await exportAllFormats(design, { pixelRatio: hdExport ? 2 : 1 });
    } catch (e) {
      console.error(e);
      window.alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setDownloading(false);
    }
  }, [design, downloading, hdExport]);

  const handleDownloadSaved = useCallback(async (designs: Design[]) => {
    if (downloading) return;
    setDownloading(true);
    try {
      await exportSavedDesigns(designs, { pixelRatio: hdExport ? 2 : 1 });
    } catch (e) {
      console.error(e);
      window.alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setDownloading(false);
    }
  }, [downloading, hdExport]);

  const updater = useCallback(
    (fn: (d: Design) => Design) => setDesign((prev) => fn(prev)),
    []
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Arimo',sans-serif" }}>
      <Controls
        design={design}
        setDesign={updater}
        onDownload={handleDownload}
        onDownloadAllFormats={handleDownloadAllFormats}
        onDownloadSaved={handleDownloadSaved}
        downloading={downloading}
        showSafeZone={showSafeZone}
        setShowSafeZone={setShowSafeZone}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        hdExport={hdExport}
        setHdExport={setHdExport}
      />
      <Preview
        ref={previewRef}
        design={design}
        showSafeZone={showSafeZone}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
    </div>
  );
}
