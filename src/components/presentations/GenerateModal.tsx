"use client";

import { useState } from "react";
import type { Slide } from "@/types";

interface Props {
  onClose: () => void;
  onDone: (title: string, slides: Slide[]) => void;
}

export default function GenerateModal({ onClose, onDone }: Props) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(f: File | null) {
    if (!f) return;
    setStatus(`Reading ${f.name}…`);
    setBusy(true);
    try {
      const { parseUpload } = await import("@/lib/presentations/parseUpload");
      const parsed = await parseUpload(f);
      setText(parsed);
      setStatus(`Loaded ${parsed.length.toLocaleString()} characters from ${f.name}`);
    } catch (e) {
      setStatus(`Failed to read file: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleGenerate() {
    if (!text.trim() || busy) return;
    setBusy(true);
    setStatus("Generating… this takes ~5–10s.");
    try {
      const { generateDeck } = await import("@/lib/presentations/generateDeck");
      const { title, slides } = await generateDeck(text);
      if (slides.length === 0) {
        setStatus("Model returned no slides. Try different text.");
        return;
      }
      onDone(title, slides);
      onClose();
    } catch (e) {
      setStatus((e as Error).message || "Generation failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        fontFamily: "'Arimo', sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(640px, 92vw)",
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#3C3C3C",
            }}
          >
            Generate deck from text
          </h2>
          <button
            onClick={onClose}
            style={{ border: "none", background: "transparent", fontSize: 22, cursor: "pointer", color: "#3C3C3C" }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p style={{ margin: 0, fontSize: 13, color: "rgba(60,60,60,0.7)" }}>
          Paste any copy — a blog post, transcript, product brief. Claude picks slide layouts and writes on-brand copy. Or upload a .txt / .md / .docx / .pdf.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here…"
          style={{
            width: "100%",
            minHeight: 200,
            border: "1px solid rgba(60,60,60,0.15)",
            borderRadius: 8,
            padding: 12,
            fontFamily: "'Arimo', sans-serif",
            fontSize: 13,
            color: "#3C3C3C",
            resize: "vertical",
            boxSizing: "border-box",
          }}
          disabled={busy}
        />

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              border: "1px solid rgba(60,60,60,0.15)",
              borderRadius: 6,
              cursor: busy ? "not-allowed" : "pointer",
              fontSize: 12,
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#3C3C3C",
              background: "#FBFBFB",
            }}
          >
            📎 Upload file
            <input
              type="file"
              accept=".txt,.md,.docx,.pdf,text/plain,text/markdown,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              disabled={busy}
              style={{ display: "none" }}
            />
          </label>
          <span style={{ fontSize: 12, color: "rgba(60,60,60,0.6)" }}>
            {text.length.toLocaleString()} chars
          </span>
          <div style={{ flex: 1 }} />
          <button
            onClick={handleGenerate}
            disabled={busy || !text.trim()}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: 8,
              background: busy || !text.trim() ? "#DDD" : "#E6FFA0",
              color: "#3C3C3C",
              fontFamily: "'Mukta', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: busy || !text.trim() ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Working…" : "Generate"}
          </button>
        </div>

        {status && (
          <div style={{ fontSize: 12, color: "rgba(60,60,60,0.7)", background: "#F6F6F6", padding: "8px 12px", borderRadius: 6 }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
