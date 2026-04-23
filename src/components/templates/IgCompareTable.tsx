// Stay Studio — Compare Table
// Pill-header comparison table with check / cross / text cells and an
// optional highlighted footer row. Reuses the `SlideTable` shape from
// Presentations so the data model is shared.

import type { CSSProperties } from "react";
import type { SlideIconName, TableCell, TemplateRenderProps } from "@/types";
import { logoSrc } from "@/lib/brand";
import RichText from "@/components/brand/RichText";
import Icon from "@/components/brand/Icon";

const DEFAULT_TABLE = {
  columns: ["Public", "Stay"],
  rows: [
    { label: "English support", cells: [{ kind: "cross" }, { kind: "check" }] as TableCell[] },
    { label: "Online enrolment", cells: [{ kind: "cross" }, { kind: "check" }] as TableCell[] },
    { label: "Dental add-on", cells: [{ kind: "cross" }, { kind: "check" }] as TableCell[] },
    { label: "Monthly cost", cells: [
      { kind: "text" as const, value: "€460" },
      { kind: "text" as const, value: "€120", highlight: true },
    ] },
  ],
  footer: null,
};

export default function IgCompareTable({ c, state }: TemplateRenderProps) {
  const { content } = state;
  const table = content.table ?? DEFAULT_TABLE;
  const colCount = table.columns.length;
  const gridTemplate = `minmax(200px, 1.1fr) ${"1fr ".repeat(Math.max(1, colCount)).trim()}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: c.bg,
        padding: 80,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logoSrc(c.logoVariant)} alt="Stay" style={{ height: 40, objectFit: "contain" }} />
      </div>

      <div
        style={{
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 400,
          fontSize: 64,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: c.text,
        }}
      >
        <RichText text={content.headline || "Compare your options."} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: gridTemplate, gap: 12, alignItems: "stretch" }}>
        <div />
        {table.columns.map((colLabel, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: c.accent,
                color: c.text,
                fontFamily: "'Arimo', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                borderRadius: 999,
                padding: "10px 20px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                border: `1.5px solid ${c.text}`,
                whiteSpace: "nowrap",
              }}
            >
              {colLabel}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: gridTemplate,
          rowGap: 10,
          columnGap: 12,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {table.rows.map((row, ri) => (
          <Row key={ri} row={row} textColor={c.text} accent={c.accent} bg={c.bg} cols={colCount} />
        ))}
      </div>

      {table.footer && table.footer.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: gridTemplate, gap: 12 }}>
          <div />
          {table.footer.map((f, i) => (
            <div
              key={i}
              style={{
                background: f.highlight ? c.text : c.accent,
                color: f.highlight ? c.bg : c.text,
                borderRadius: 18,
                padding: "14px 16px",
                textAlign: "center",
                fontFamily: "'Mukta', sans-serif",
                fontWeight: 500,
                fontSize: 22,
                border: `2px solid ${c.text}`,
              }}
            >
              {f.label}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        {content.cta ? (
          <div
            style={{
              background: c.text,
              color: c.bg,
              fontFamily: "'Arimo', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              borderRadius: 12,
              padding: "10px 22px",
            }}
          >
            <RichText text={content.cta} />
          </div>
        ) : (
          <span />
        )}
        <div
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontSize: 18,
            color: c.text,
            opacity: 0.4,
            marginLeft: "auto",
          }}
        >
          {content.url || "stayinsured.de"}
        </div>
      </div>
    </div>
  );
}

function Row({
  row,
  textColor,
  accent,
  bg,
  cols,
}: {
  row: { label: string; icon?: SlideIconName | null; cells: TableCell[] };
  textColor: string;
  accent: string;
  bg: string;
  cols: number;
}) {
  const labelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    borderRadius: 14,
    border: `2px solid ${textColor}`,
    background: "transparent",
    color: textColor,
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  };
  return (
    <>
      <div style={labelStyle}>
        {row.icon && (
          <span style={{ color: textColor, display: "inline-flex" }}>
            <Icon name={row.icon} size={20} />
          </span>
        )}
        <span>{row.label}</span>
      </div>
      {Array.from({ length: cols }).map((_, i) => (
        <Cell key={i} cell={row.cells[i]} textColor={textColor} accent={accent} bg={bg} />
      ))}
    </>
  );
}

function Cell({
  cell,
  textColor,
  accent,
  bg,
}: {
  cell: TableCell | undefined;
  textColor: string;
  accent: string;
  bg: string;
}) {
  const base: CSSProperties = {
    borderRadius: 14,
    border: `2px solid ${textColor}`,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    textAlign: "center",
    color: textColor,
  };
  if (!cell) return <div style={{ ...base, border: "none" }} />;
  if (cell.kind === "check") {
    return (
      <div style={{ ...base, background: accent }}>
        <Icon name="check" size={26} />
      </div>
    );
  }
  if (cell.kind === "cross") {
    return (
      <div style={{ ...base, background: "transparent", opacity: 0.5 }}>
        <Icon name="cross" size={26} />
      </div>
    );
  }
  const highlight = cell.highlight === true;
  return (
    <div
      style={{
        ...base,
        background: highlight ? textColor : "transparent",
        color: highlight ? bg : textColor,
      }}
    >
      {cell.value}
    </div>
  );
}
