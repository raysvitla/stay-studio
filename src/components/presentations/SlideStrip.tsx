"use client";

import { useState } from "react";
import type { Slide, ColorScheme } from "@/types";
import { SLIDE_COMPONENTS, SLIDE_WIDTH, SLIDE_HEIGHT, SLIDE_TYPE_ORDER, SLIDE_TYPE_LABELS, defaultSlide } from "@/lib/presentations/slideRegistry";

interface Props {
  slides: Slide[];
  activeIdx: number;
  c: ColorScheme;
  canvasMode?: "white" | "tinted";
  setActiveIdx: (idx: number) => void;
  onReorder: (from: number, to: number) => void;
  onAdd: (slide: Slide) => void;
  onDelete: (idx: number) => void;
}

const THUMB_W = 180;
const THUMB_H = Math.round((THUMB_W * SLIDE_HEIGHT) / SLIDE_WIDTH);

export default function SlideStrip({ slides, activeIdx, c, canvasMode = "tinted", setActiveIdx, onReorder, onAdd, onDelete }: Props) {
  const useWhite = canvasMode === "white" && c.id !== "dark";
  const thumbBg = useWhite ? "#FFFFFF" : c.bg;
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      style={{
        flexShrink: 0,
        borderTop: "1px solid rgba(60,60,60,0.12)",
        background: "#FAFAFA",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        overflowX: "auto",
        overflowY: "hidden",
        height: THUMB_H + 48,
      }}
    >
      {slides.map((s, i) => {
        const Slide = SLIDE_COMPONENTS[s.type];
        const active = i === activeIdx;
        const scale = THUMB_W / SLIDE_WIDTH;
        return (
          <div
            key={s.id}
            draggable
            onDragStart={() => setDragIdx(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIdx !== null && dragIdx !== i) onReorder(dragIdx, i);
              setDragIdx(null);
            }}
            onDragEnd={() => setDragIdx(null)}
            onClick={() => setActiveIdx(i)}
            style={{
              position: "relative",
              width: THUMB_W,
              height: THUMB_H,
              flexShrink: 0,
              borderRadius: 6,
              overflow: "hidden",
              cursor: "pointer",
              outline: active ? "3px solid #C3D100" : "1px solid rgba(60,60,60,0.15)",
              background: thumbBg,
              opacity: dragIdx === i ? 0.4 : 1,
            }}
            title={`${i + 1}. ${SLIDE_TYPE_LABELS[s.type]}`}
          >
            <div
              style={{
                width: SLIDE_WIDTH,
                height: SLIDE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              {Slide && <Slide c={c} slide={s} canvasMode={canvasMode} pageNumber={i + 1} totalPages={slides.length} />}
            </div>
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 6,
                background: "rgba(0,0,0,0.7)",
                color: "#FFF",
                fontSize: 10,
                fontFamily: "'Mukta', sans-serif",
                fontWeight: 500,
                padding: "2px 6px",
                borderRadius: 3,
                letterSpacing: "0.08em",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            {slides.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(i);
                }}
                aria-label={`Delete slide ${i + 1}`}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 22,
                  height: 22,
                  border: "none",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.7)",
                  color: "#FFF",
                  cursor: "pointer",
                  fontSize: 14,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowAdd((v) => !v)}
          style={{
            width: THUMB_W,
            height: THUMB_H,
            flexShrink: 0,
            border: "2px dashed rgba(60,60,60,0.3)",
            background: "transparent",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "'Mukta', sans-serif",
            fontSize: 32,
            color: "rgba(60,60,60,0.55)",
          }}
        >
          +
        </button>
        {showAdd && (
          <div
            style={{
              position: "absolute",
              bottom: THUMB_H + 6,
              left: 0,
              background: "#FFF",
              border: "1px solid rgba(60,60,60,0.15)",
              borderRadius: 8,
              boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
              padding: 6,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              zIndex: 10,
              minWidth: 220,
            }}
          >
            {SLIDE_TYPE_ORDER.map((t) => (
              <button
                key={t}
                onClick={() => {
                  onAdd(defaultSlide(t));
                  setShowAdd(false);
                }}
                style={{
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  padding: "8px 12px",
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: 14,
                  cursor: "pointer",
                  borderRadius: 4,
                  color: "#3C3C3C",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F0F0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {SLIDE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
