import type { CSSProperties } from "react";
import type { SlideRenderProps, TableCell } from "@/types";
import { SlideFrame, TITLE_STYLE, PAD, resolveCanvas } from "./slideCommon";
import Pill from "../Pill";
import Icon from "../Icon";

export default function CompareTableSlide({ c, slide, pageNumber, totalPages, canvasMode = "tinted" }: SlideRenderProps) {
  const canvas = resolveCanvas(c, canvasMode);
  const table = slide.table ?? { columns: [], rows: [], footer: null };
  const colCount = table.columns.length;
  const gridTemplate = `minmax(240px, 1.2fr) ${"1fr ".repeat(Math.max(1, colCount)).trim()}`;

  return (
    <SlideFrame c={c} canvasMode={canvasMode} pageNumber={pageNumber} totalPages={totalPages}>
      <div
        style={{
          flex: 1,
          padding: `${PAD / 2}px ${PAD}px ${PAD + 72}px ${PAD}px`,
          display: "flex",
          flexDirection: "column",
          gap: 36,
          minHeight: 0,
        }}
      >
        <h1 style={{ ...TITLE_STYLE, fontSize: 88, color: canvas.fg, maxWidth: 1500 }}>
          {slide.title || "Compare your options"}
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: gridTemplate, gap: 16, alignItems: "stretch" }}>
          <div />
          {table.columns.map((colLabel, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <Pill variant="filled" accent={canvas.accent} text={canvas.fg} size="md">
                {colLabel}
              </Pill>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridTemplate,
            rowGap: 14,
            columnGap: 16,
            alignItems: "stretch",
          }}
        >
          {table.rows.map((row, ri) => (
            <Row key={ri} row={row} canvas={canvas} cols={colCount} />
          ))}
        </div>

        {table.footer && table.footer.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: gridTemplate, gap: 16, marginTop: "auto" }}>
            <div />
            {table.footer.map((f, i) => (
              <div
                key={i}
                style={{
                  background: f.highlight ? canvas.fg : canvas.accent,
                  color: f.highlight ? canvas.bg : canvas.fg,
                  borderRadius: 28,
                  padding: "22px 24px",
                  textAlign: "center",
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 500,
                  fontSize: 28,
                  letterSpacing: "-0.01em",
                  border: `2px solid ${canvas.fg}`,
                }}
              >
                {f.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}

function Row({
  row,
  canvas,
  cols,
}: {
  row: { label: string; icon?: import("@/types").SlideIconName | null; cells: TableCell[] };
  canvas: ReturnType<typeof resolveCanvas>;
  cols: number;
}) {
  const labelCellStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 20px",
    borderRadius: 18,
    border: `2px solid ${canvas.fg}`,
    background: "transparent",
    color: canvas.fg,
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    fontSize: 22,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  };
  return (
    <>
      <div style={labelCellStyle}>
        {row.icon && (
          <span style={{ color: canvas.fg, display: "inline-flex" }}>
            <Icon name={row.icon} size={24} />
          </span>
        )}
        <span>{row.label}</span>
      </div>
      {Array.from({ length: cols }).map((_, i) => {
        const cell = row.cells[i];
        return <Cell key={i} cell={cell} canvas={canvas} />;
      })}
    </>
  );
}

function Cell({ cell, canvas }: { cell: TableCell | undefined; canvas: ReturnType<typeof resolveCanvas> }) {
  const base: CSSProperties = {
    borderRadius: 18,
    border: `2px solid ${canvas.fg}`,
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    fontSize: 22,
    textAlign: "center",
  };
  if (!cell) return <div style={{ ...base, border: "none" }} />;
  if (cell.kind === "check") {
    return (
      <div style={{ ...base, background: canvas.accent, color: canvas.fg }}>
        <Icon name="check" size={32} />
      </div>
    );
  }
  if (cell.kind === "cross") {
    return (
      <div style={{ ...base, background: "transparent", color: canvas.fg, opacity: 0.5 }}>
        <Icon name="cross" size={32} />
      </div>
    );
  }
  const highlight = cell.highlight === true;
  return (
    <div
      style={{
        ...base,
        background: highlight ? canvas.fg : "transparent",
        color: highlight ? canvas.bg : canvas.fg,
      }}
    >
      {cell.value}
    </div>
  );
}
