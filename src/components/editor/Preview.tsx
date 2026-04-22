"use client";

// Stay Studio — preview panel
// Renders the design at its exact pixel size inside a scaled wrapper that
// fits the viewport. The exposed ref points at the unscaled inner div so
// the export worker can grab it at full resolution.

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import type { Design } from "@/types";
import { getFormat, isCarouselFormat } from "@/lib/formats";
import TemplateRenderer from "./TemplateRenderer";

const HEAD = 44;
const PAD = 40;
const SIDE = 320;

export interface PreviewHandle {
  /** The unscaled, full-resolution template element — pass to html-to-image. */
  getTemplateElement: () => HTMLDivElement | null;
}

const Preview = forwardRef<
  PreviewHandle,
  {
    design: Design;
    showSafeZone: boolean;
    activeSlide: number;
    setActiveSlide: (idx: number) => void;
  }
>(function Preview({ design, showSafeZone, activeSlide, setActiveSlide }, ref) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ w: 1200, h: 800 });
    const isCarousel = isCarouselFormat(design.format);
    const totalSlides = design.slides?.length ?? 0;

    useEffect(() => {
      const fn = () => setDims({ w: window.innerWidth, h: window.innerHeight });
      fn();
      window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }, []);

    useImperativeHandle(ref, () => ({ getTemplateElement: () => innerRef.current }), []);

    const fmt = getFormat(design.format);
    const availW = Math.max(200, dims.w - SIDE - PAD * 2);
    const availH = Math.max(200, dims.h - HEAD - PAD * 2);
    const scale = Math.min(availW / fmt.w, availH / fmt.h);
    const scaledW = Math.round(fmt.w * scale);
    const scaledH = Math.round(fmt.h * scale);

    return (
      <div style={{ flex: 1, background: "#DCDCDC", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div
          style={{
            height: HEAD,
            background: "#FFF",
            borderBottom: "1px solid rgba(60,60,60,0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'Mukta', sans-serif", fontWeight: 500, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", color: "#3C3C3C" }}>
            Stay Studio
          </span>
          <span style={{ fontSize: 12, color: "rgba(60,60,60,0.4)", fontWeight: 600 }}>
            {fmt.label} · {fmt.sub}
          </span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(60,60,60,0.35)", fontFamily: "monospace" }}>
            {fmt.w}×{fmt.h} · {Math.round(scale * 100)}%
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: PAD }}>
          <div
            style={{
              width: scaledW,
              height: scaledH,
              position: "relative",
              boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              ref={innerRef}
              style={{
                width: fmt.w,
                height: fmt.h,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <TemplateRenderer design={design} slideIndex={isCarousel ? activeSlide : undefined} />
            </div>

            {isCarousel && totalSlides > 1 && (
              <>
                <button
                  onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                  disabled={activeSlide === 0}
                  aria-label="Previous slide"
                  style={{ ...carouselArrow, left: 12, opacity: activeSlide === 0 ? 0.25 : 0.85 }}
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveSlide(Math.min(totalSlides - 1, activeSlide + 1))}
                  disabled={activeSlide === totalSlides - 1}
                  aria-label="Next slide"
                  style={{ ...carouselArrow, right: 12, opacity: activeSlide === totalSlides - 1 ? 0.25 : 0.85 }}
                >
                  ›
                </button>
                <div style={carouselCounter}>
                  {activeSlide + 1} / {totalSlides}
                </div>
              </>
            )}

            {showSafeZone && fmt.safeZone && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: fmt.safeZone.top * scale,
                  left: fmt.safeZone.left * scale,
                  right: fmt.safeZone.right * scale,
                  bottom: fmt.safeZone.bottom * scale,
                  border: "2px dashed rgba(255, 80, 80, 0.75)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Preview;

const carouselArrow: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.65)",
  color: "white",
  fontSize: 28,
  lineHeight: 1,
  fontFamily: "'Arimo', sans-serif",
  cursor: "pointer",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const carouselCounter: React.CSSProperties = {
  position: "absolute",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(0,0,0,0.65)",
  color: "white",
  fontSize: 12,
  fontFamily: "'Arimo', sans-serif",
  fontWeight: 700,
  padding: "4px 10px",
  borderRadius: 999,
  letterSpacing: "0.04em",
  zIndex: 2,
};
