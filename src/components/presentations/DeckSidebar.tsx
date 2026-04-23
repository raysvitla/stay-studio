"use client";

import type { PaletteKey } from "@/types";
import { COLOR_SCHEMES } from "@/lib/brand";

interface Props {
  name: string;
  palette: PaletteKey;
  slideCount: number;
  busy: boolean;
  hdExport: boolean;
  onNameChange: (name: string) => void;
  onPaletteChange: (p: PaletteKey) => void;
  onGenerate: () => void;
  onExportZip: () => void;
  onExportPdf: () => void;
  onHdToggle: (v: boolean) => void;
  onNewDeck: () => void;
}

const panel: React.CSSProperties = {
  width: 260,
  flexShrink: 0,
  background: "#FFF",
  borderRight: "1px solid rgba(60,60,60,0.08)",
  padding: 18,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 14,
  fontFamily: "'Arimo', sans-serif",
  color: "#3C3C3C",
};

const label: React.CSSProperties = {
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(60,60,60,0.55)",
  marginBottom: 4,
};

const input: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(60,60,60,0.15)",
  borderRadius: 6,
  padding: "8px 10px",
  fontFamily: "'Arimo', sans-serif",
  fontSize: 13,
  color: "#3C3C3C",
  boxSizing: "border-box",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 8,
  padding: "12px 14px",
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#3C3C3C",
  background: "#E6FFA0",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(60,60,60,0.15)",
  borderRadius: 8,
  padding: "10px 14px",
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#3C3C3C",
  background: "#FFF",
  cursor: "pointer",
};

export default function DeckSidebar(props: Props) {
  return (
    <div style={panel}>
      <div>
        <div style={label}>Deck name</div>
        <input style={input} value={props.name} onChange={(e) => props.onNameChange(e.target.value)} />
      </div>

      <div>
        <div style={label}>Palette</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
          {COLOR_SCHEMES.map((s) => (
            <button
              key={s.id}
              onClick={() => props.onPaletteChange(s.id)}
              aria-label={s.name}
              title={s.name}
              style={{
                height: 32,
                borderRadius: 6,
                background: s.bg,
                border: props.palette === s.id ? "2px solid #3C3C3C" : "1px solid rgba(60,60,60,0.2)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div style={label}>AI generator</div>
        <button style={primaryBtn} onClick={props.onGenerate} disabled={props.busy}>
          {props.busy ? "Working…" : "✨ Generate from text"}
        </button>
      </div>

      <div style={{ height: 1, background: "rgba(60,60,60,0.08)", margin: "4px 0" }} />

      <div>
        <div style={label}>Export ({props.slideCount} slides)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={secondaryBtn} onClick={props.onExportPdf} disabled={props.busy}>Download PDF</button>
          <button style={secondaryBtn} onClick={props.onExportZip} disabled={props.busy}>Download ZIP (PNGs)</button>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginTop: 4, color: "rgba(60,60,60,0.7)" }}>
            <input type="checkbox" checked={props.hdExport} onChange={(e) => props.onHdToggle(e.target.checked)} />
            HD export (2×)
          </label>
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button style={{ ...secondaryBtn, color: "rgba(60,60,60,0.6)" }} onClick={props.onNewDeck}>New deck</button>
      </div>
    </div>
  );
}
