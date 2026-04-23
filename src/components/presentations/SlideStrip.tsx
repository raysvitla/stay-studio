"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Slide, ColorScheme, SlideType } from "@/types";
import {
  SLIDE_COMPONENTS,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  SLIDE_TYPE_ORDER,
  SLIDE_TYPE_LABELS,
  defaultSlide,
} from "@/lib/presentations/slideRegistry";

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

const PICK_W = 220;
const PICK_H = Math.round((PICK_W * SLIDE_HEIGHT) / SLIDE_WIDTH);
const PICK_COLS = 3;

export default function SlideStrip({ slides, activeIdx, c, canvasMode = "tinted", setActiveIdx, onReorder, onAdd, onDelete }: Props) {
  const useWhite = canvasMode === "white" && c.id !== "dark";
  const thumbBg = useWhite ? "#FFFFFF" : c.bg;
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPickerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

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
      <button
        onClick={() => setPickerOpen((v) => !v)}
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
      {pickerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <AddSlidePicker
            c={c}
            canvasMode={canvasMode}
            thumbBg={thumbBg}
            onPick={(t) => {
              onAdd(defaultSlide(t));
              setPickerOpen(false);
            }}
            onClose={() => setPickerOpen(false)}
          />,
          document.body,
        )}
    </div>
  );
}

function AddSlidePicker({
  c,
  canvasMode,
  thumbBg,
  onPick,
  onClose,
}: {
  c: ColorScheme;
  canvasMode: "white" | "tinted";
  thumbBg: string;
  onPick: (t: SlideType) => void;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(0,0,0,0.48)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        role="dialog"
        aria-label="Add slide"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFF",
          border: "1px solid rgba(60,60,60,0.15)",
          borderRadius: 12,
          boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
          width: "min(780px, 100%)",
          maxHeight: "86vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: "1px solid rgba(60,60,60,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#3C3C3C",
            }}
          >
            Add slide
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 28,
              height: 28,
              border: "none",
              borderRadius: "50%",
              background: "rgba(60,60,60,0.08)",
              color: "#3C3C3C",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            padding: 16,
            display: "grid",
            gridTemplateColumns: `repeat(${PICK_COLS}, ${PICK_W}px)`,
            gap: 12,
            overflowY: "auto",
            justifyContent: "center",
          }}
        >
        {SLIDE_TYPE_ORDER.map((t) => {
          const SlideComp = SLIDE_COMPONENTS[t];
          const preview = defaultSlide(t);
          const scale = PICK_W / SLIDE_WIDTH;
          return (
            <button
              key={t}
              onClick={() => onPick(t)}
              style={{
                border: "1px solid rgba(60,60,60,0.15)",
                background: "transparent",
                borderRadius: 8,
                padding: 0,
                cursor: "pointer",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3C3C3C";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(60,60,60,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: PICK_W,
                  height: PICK_H,
                  background: thumbBg,
                  overflow: "hidden",
                }}
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
                  {SlideComp && (
                    <SlideComp
                      c={c}
                      slide={preview}
                      canvasMode={canvasMode}
                      pageNumber={1}
                      totalPages={1}
                    />
                  )}
                </div>
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#3C3C3C",
                  borderTop: "1px solid rgba(60,60,60,0.08)",
                  background: "#FAFAFA",
                }}
              >
                {SLIDE_TYPE_LABELS[t]}
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
