"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import type { ColorScheme, Slide } from "@/types";
import { SLIDE_COMPONENTS, SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/presentations/slideRegistry";

export interface SlideCanvasHandle {
  getSlideElement: () => HTMLDivElement | null;
}

interface Props {
  slide: Slide;
  c: ColorScheme;
  /** When true, container fills its parent and scales to fit. When false,
   * renders at native 1920×1080 (used by off-screen export). */
  scaled?: boolean;
  pageNumber?: number;
  totalPages?: number;
  canvasMode?: "white" | "tinted";
}

const SlideCanvas = forwardRef<SlideCanvasHandle, Props>(function SlideCanvas({ slide, c, scaled = true, pageNumber, totalPages, canvasMode = "tinted" }, ref) {
  const innerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 700 });

  useEffect(() => {
    if (!scaled || !hostRef.current) return;
    const el = hostRef.current;
    const update = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scaled]);

  useImperativeHandle(ref, () => ({ getSlideElement: () => innerRef.current }), []);

  const Slide = SLIDE_COMPONENTS[slide.type];
  if (!Slide) return null;

  // In white-canvas mode, the slide background becomes white (except for the
  // "dark" palette which inverts). The original palette bg is still used as
  // the "accent" by slide components via c.bg.
  const useWhite = canvasMode === "white" && c.id !== "dark";
  const canvasBg = useWhite ? "#FFFFFF" : c.bg;
  const canvasFg = useWhite ? "#3C3C3C" : c.text;

  if (!scaled) {
    return (
      <div
        ref={innerRef}
        style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, background: canvasBg, color: canvasFg }}
      >
        <Slide c={c} slide={slide} pageNumber={pageNumber} totalPages={totalPages} canvasMode={canvasMode} />
      </div>
    );
  }

  const scale = Math.min(dims.w / SLIDE_WIDTH, dims.h / SLIDE_HEIGHT);
  const scaledW = Math.round(SLIDE_WIDTH * scale);
  const scaledH = Math.round(SLIDE_HEIGHT * scale);

  return (
    <div
      ref={hostRef}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 24,
        minHeight: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          width: scaledW,
          height: scaledH,
          position: "relative",
          boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            background: canvasBg,
            color: canvasFg,
          }}
        >
          <Slide c={c} slide={slide} pageNumber={pageNumber} totalPages={totalPages} canvasMode={canvasMode} />
        </div>
      </div>
    </div>
  );
});

export default SlideCanvas;
