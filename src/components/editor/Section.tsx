"use client";

// Collapsible section for the Controls inspector. Keeps the panel tidy by
// grouping related knobs behind a disclosure header. Open/closed state is
// optionally persisted to localStorage via `persistKey`.

import { useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "stay_studio_controls_sections";

function readStore(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(key: string, open: boolean) {
  if (typeof window === "undefined") return;
  try {
    const s = readStore();
    s[key] = open;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore quota */
  }
}

export default function Section({
  title,
  defaultOpen = true,
  persistKey,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  persistKey?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!persistKey) return;
    const saved = readStore()[persistKey];
    if (typeof saved === "boolean") setOpen(saved);
  }, [persistKey]);

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      if (persistKey) writeStore(persistKey, next);
      return next;
    });
  };

  return (
    <div style={{ borderTop: "1px solid rgba(60,60,60,0.08)" }}>
      <button
        onClick={toggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 2px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Arimo', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#3C3C3C",
        }}
      >
        <span>{title}</span>
        <span
          style={{
            fontSize: 10,
            color: "rgba(60,60,60,0.5)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 150ms",
            display: "inline-block",
          }}
        >
          ▶
        </span>
      </button>
      {open && <div style={{ paddingBottom: 8 }}>{children}</div>}
    </div>
  );
}
