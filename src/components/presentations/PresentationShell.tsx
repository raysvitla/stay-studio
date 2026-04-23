"use client";

import { useCallback, useEffect, useState } from "react";
import type { PaletteKey, Presentation, Slide } from "@/types";
import { getColorScheme } from "@/lib/brand";
import {
  loadCurrentPresentation,
  saveCurrentPresentation,
  newPresentationId,
} from "@/lib/presentations/deckStorage";
import { defaultSlide } from "@/lib/presentations/slideRegistry";
import DeckSidebar from "./DeckSidebar";
import SlideCanvas from "./SlideCanvas";
import SlideInspector from "./SlideInspector";
import SlideStrip from "./SlideStrip";
import GenerateModal from "./GenerateModal";

function stablePresentation(): Presentation {
  return {
    id: "p_ssr_placeholder",
    name: "Untitled deck",
    palette: "lilac",
    slides: [
      defaultSlide("cover"),
      defaultSlide("section"),
      defaultSlide("stats"),
      defaultSlide("thanks"),
    ],
    createdAt: 0,
    updatedAt: 0,
  };
}

function freshPresentation(): Presentation {
  const base = stablePresentation();
  return { ...base, id: newPresentationId(), createdAt: Date.now(), updatedAt: Date.now() };
}

export default function PresentationShell() {
  const [presentation, setPresentation] = useState<Presentation>(stablePresentation);
  const [activeIdx, setActiveIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hdExport, setHdExport] = useState(true);
  const [generateOpen, setGenerateOpen] = useState(false);

  useEffect(() => {
    const saved = loadCurrentPresentation();
    setPresentation(saved ?? freshPresentation());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveCurrentPresentation(presentation);
  }, [presentation, ready]);

  useEffect(() => {
    if (activeIdx >= presentation.slides.length) {
      setActiveIdx(Math.max(0, presentation.slides.length - 1));
    }
  }, [presentation.slides.length, activeIdx]);

  const c = getColorScheme(presentation.palette);
  const activeSlide = presentation.slides[activeIdx] ?? presentation.slides[0];

  const updateSlide = useCallback((next: Slide) => {
    setPresentation((p) => {
      const slides = p.slides.slice();
      slides[activeIdx] = next;
      return { ...p, slides, updatedAt: Date.now() };
    });
  }, [activeIdx]);

  const reorder = useCallback((from: number, to: number) => {
    setPresentation((p) => {
      const slides = p.slides.slice();
      const [moved] = slides.splice(from, 1);
      slides.splice(to, 0, moved);
      return { ...p, slides, updatedAt: Date.now() };
    });
    setActiveIdx(to);
  }, []);

  const addSlide = useCallback((slide: Slide) => {
    setPresentation((p) => ({ ...p, slides: [...p.slides, slide], updatedAt: Date.now() }));
    setActiveIdx(presentation.slides.length);
  }, [presentation.slides.length]);

  const deleteSlide = useCallback((idx: number) => {
    setPresentation((p) => {
      const slides = p.slides.filter((_, i) => i !== idx);
      return { ...p, slides, updatedAt: Date.now() };
    });
    if (activeIdx >= idx && activeIdx > 0) setActiveIdx(activeIdx - 1);
  }, [activeIdx]);

  const setPalette = useCallback((palette: PaletteKey) => {
    setPresentation((p) => ({ ...p, palette, updatedAt: Date.now() }));
  }, []);

  const setName = useCallback((name: string) => {
    setPresentation((p) => ({ ...p, name, updatedAt: Date.now() }));
  }, []);

  const newDeck = useCallback(() => {
    if (!window.confirm("Start a new deck? Current deck will be replaced.")) return;
    setPresentation(freshPresentation());
    setActiveIdx(0);
  }, []);

  const onGenerated = useCallback((title: string, slides: Slide[]) => {
    setPresentation((p) => ({
      ...p,
      name: title || p.name,
      slides: slides.length > 0 ? slides : p.slides,
      updatedAt: Date.now(),
    }));
    setActiveIdx(0);
  }, []);

  const exportZip = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const { exportDeckAsZip } = await import("@/lib/presentations/deckExport");
      await exportDeckAsZip(presentation, { pixelRatio: hdExport ? 2 : 1 });
    } catch (e) {
      console.error(e);
      window.alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }, [presentation, hdExport, busy]);

  const exportPdf = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const { exportDeckAsPdf } = await import("@/lib/presentations/deckExport");
      await exportDeckAsPdf(presentation, { pixelRatio: hdExport ? 2 : 1 });
    } catch (e) {
      console.error(e);
      window.alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }, [presentation, hdExport, busy]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", fontFamily: "'Arimo', sans-serif" }}>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <DeckSidebar
          name={presentation.name}
          palette={presentation.palette}
          slideCount={presentation.slides.length}
          busy={busy}
          hdExport={hdExport}
          onNameChange={setName}
          onPaletteChange={setPalette}
          onGenerate={() => setGenerateOpen(true)}
          onExportZip={exportZip}
          onExportPdf={exportPdf}
          onHdToggle={setHdExport}
          onNewDeck={newDeck}
        />
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#DCDCDC",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 40,
              background: "#FFF",
              borderBottom: "1px solid rgba(60,60,60,0.08)",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 500, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "#3C3C3C" }}>
              Slide {activeIdx + 1} / {presentation.slides.length}
            </span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(60,60,60,0.4)", fontFamily: "monospace" }}>
              1920×1080
            </span>
          </div>
          {activeSlide && <SlideCanvas slide={activeSlide} c={c} />}
        </div>
        {activeSlide && <SlideInspector slide={activeSlide} onChange={updateSlide} />}
      </div>
      <SlideStrip
        slides={presentation.slides}
        activeIdx={activeIdx}
        c={c}
        setActiveIdx={setActiveIdx}
        onReorder={reorder}
        onAdd={addSlide}
        onDelete={deleteSlide}
      />
      {generateOpen && (
        <GenerateModal
          onClose={() => setGenerateOpen(false)}
          onDone={onGenerated}
        />
      )}
    </div>
  );
}
