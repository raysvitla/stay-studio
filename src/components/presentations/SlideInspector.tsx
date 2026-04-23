"use client";

import { useRef, useState } from "react";
import type {
  Slide,
  SlideType,
  SlideItem,
  SlideStat,
  SlideColumn,
  IllustrationSource,
  IllustrationId,
  SlideIconName,
  SlideTable,
  TableRow,
  TableCell,
  TableFooterCell,
} from "@/types";
import { SLIDE_TYPE_LABELS, SLIDE_TYPE_ORDER } from "@/lib/presentations/slideRegistry";
import { ILLUSTRATIONS, ILLUSTRATION_ACCENTS, illusSrc } from "@/lib/brand";
import { ICON_NAMES, ICON_LABELS } from "@/components/brand/Icon";
import Icon from "@/components/brand/Icon";

interface Props {
  slide: Slide;
  onChange: (next: Slide) => void;
}

const panelStyle: React.CSSProperties = {
  width: 340,
  flexShrink: 0,
  background: "#FFF",
  borderLeft: "1px solid rgba(60,60,60,0.08)",
  padding: 18,
  overflowY: "auto",
  fontFamily: "'Arimo', sans-serif",
  fontSize: 13,
  color: "#3C3C3C",
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const label: React.CSSProperties = {
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(60,60,60,0.55)",
  marginBottom: 4,
  display: "block",
};

const input: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(60,60,60,0.15)",
  borderRadius: 6,
  padding: "8px 10px",
  fontFamily: "'Arimo', sans-serif",
  fontSize: 13,
  color: "#3C3C3C",
  background: "#FFF",
  boxSizing: "border-box",
};

const textarea: React.CSSProperties = { ...input, minHeight: 72, resize: "vertical", fontFamily: "'Arimo', sans-serif" };

const btn: React.CSSProperties = {
  border: "1px solid rgba(60,60,60,0.15)",
  background: "#FFF",
  borderRadius: 6,
  padding: "6px 10px",
  fontFamily: "'Mukta', sans-serif",
  fontWeight: 500,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#3C3C3C",
  cursor: "pointer",
};

const ILLUS_SUPPORTED: SlideType[] = ["cover", "section", "stats", "numbered-list"];
const ICON_IN_TITLE_SUPPORTED: SlideType[] = ["cover", "section", "thanks", "photo-hero", "stats", "compare-2col", "three-col"];

export default function SlideInspector({ slide, onChange }: Props) {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  function patch(p: Partial<Slide>) {
    onChange({ ...slide, ...p });
  }

  function patchItems(items: SlideItem[]) {
    patch({ items });
  }
  function patchStats(stats: SlideStat[]) {
    patch({ stats });
  }
  function patchColumns(columns: SlideColumn[]) {
    patch({ columns });
  }

  function insertIconIntoTitle(iconName: SlideIconName) {
    const el = titleRef.current;
    const token = `{icon:${iconName}}`;
    const cur = slide.title ?? "";
    if (!el) {
      patch({ title: cur + (cur.endsWith(" ") ? "" : " ") + token });
      return;
    }
    const start = el.selectionStart ?? cur.length;
    const end = el.selectionEnd ?? cur.length;
    const next = cur.slice(0, start) + token + cur.slice(end);
    patch({ title: next });
    // Restore caret just after the inserted token.
    setTimeout(() => {
      el.focus();
      const pos = start + token.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  }

  return (
    <div style={panelStyle}>
      <div>
        <label style={label}>Slide type</label>
        <select
          value={slide.type}
          onChange={(e) => patch({ type: e.target.value as SlideType })}
          style={input}
        >
          {SLIDE_TYPE_ORDER.map((t) => (
            <option key={t} value={t}>{SLIDE_TYPE_LABELS[t]}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={label}>Title</label>
        <textarea
          ref={titleRef}
          style={textarea}
          value={slide.title ?? ""}
          onChange={(e) => patch({ title: e.target.value })}
        />
        {ICON_IN_TITLE_SUPPORTED.includes(slide.type) && (
          <IconInsertRow onPick={insertIconIntoTitle} />
        )}
      </div>

      {(slide.type === "cover" || slide.type === "photo-hero" || slide.type === "thanks" || slide.type === "numbered-list") && (
        <div>
          <label style={label}>Subtitle / body</label>
          <textarea style={textarea} value={slide.subtitle ?? slide.body ?? ""} onChange={(e) =>
            slide.type === "numbered-list"
              ? patch({ body: e.target.value })
              : patch({ subtitle: e.target.value })
          } />
        </div>
      )}

      {slide.type === "section" && (
        <div>
          <label style={label}>Lead paragraph</label>
          <textarea style={textarea} value={slide.body ?? ""} onChange={(e) => patch({ body: e.target.value })} />
        </div>
      )}

      {slide.type === "cover" && (
        <div>
          <label style={label}>Accent badge (top-right)</label>
          <input style={input} value={slide.accentText ?? ""} onChange={(e) => patch({ accentText: e.target.value || null })} placeholder="e.g. DE · 2026" />
        </div>
      )}

      {ILLUS_SUPPORTED.includes(slide.type) && (
        <IllustrationEditor
          source={slide.illustration ?? null}
          onChange={(next) => patch({ illustration: next })}
        />
      )}

      {(slide.type === "section" || slide.type === "numbered-list") && (
        <ItemsEditor items={slide.items ?? []} onChange={patchItems} max={slide.type === "section" ? 3 : 8} />
      )}

      {slide.type === "stats" && <StatsEditor stats={slide.stats ?? []} onChange={patchStats} />}

      {slide.type === "three-col" && <ColumnsEditor columns={slide.columns ?? []} onChange={patchColumns} />}

      {slide.type === "compare-2col" && (
        <>
          <div>
            <label style={label}>Left — title</label>
            <input
              style={input}
              value={slide.left?.title ?? ""}
              onChange={(e) => patch({ left: { ...(slide.left ?? { body: "" }), title: e.target.value } })}
            />
            <label style={{ ...label, marginTop: 8 }}>Left — body</label>
            <textarea
              style={textarea}
              value={slide.left?.body ?? ""}
              onChange={(e) => patch({ left: { ...(slide.left ?? { title: "" }), body: e.target.value } })}
            />
            <label style={{ ...label, marginTop: 8 }}>Left — icon</label>
            <IconPicker
              value={slide.left?.icon ?? null}
              onChange={(icon) => patch({ left: { ...(slide.left ?? { title: "", body: "" }), icon } })}
            />
          </div>
          <div>
            <label style={label}>Right — title</label>
            <input
              style={input}
              value={slide.right?.title ?? ""}
              onChange={(e) => patch({ right: { ...(slide.right ?? { body: "" }), title: e.target.value } })}
            />
            <label style={{ ...label, marginTop: 8 }}>Right — body</label>
            <textarea
              style={textarea}
              value={slide.right?.body ?? ""}
              onChange={(e) => patch({ right: { ...(slide.right ?? { title: "" }), body: e.target.value } })}
            />
            <label style={{ ...label, marginTop: 8 }}>Right — icon</label>
            <IconPicker
              value={slide.right?.icon ?? null}
              onChange={(icon) => patch({ right: { ...(slide.right ?? { title: "", body: "" }), icon } })}
            />
          </div>
        </>
      )}

      {slide.type === "compare-table" && (
        <TableEditor
          table={slide.table ?? { columns: [], rows: [], footer: null }}
          onChange={(table) => patch({ table })}
        />
      )}

      {slide.type === "photo-hero" && (
        <div>
          <label style={label}>Photo</label>
          <PhotoPicker value={slide.photoUrl ?? null} onChange={(v) => patch({ photoUrl: v })} />
        </div>
      )}
    </div>
  );

  function ItemsEditor({ items, onChange, max }: { items: SlideItem[]; onChange: (items: SlideItem[]) => void; max: number }) {
    function update(i: number, p: Partial<SlideItem>) {
      const next = items.slice();
      next[i] = { ...next[i], ...p };
      onChange(next);
    }
    function add() {
      if (items.length >= max) return;
      const nextNum = String(items.length + 1).padStart(2, "0");
      onChange([...items, { label: nextNum, text: "" }]);
    }
    function remove(i: number) {
      onChange(items.filter((_, idx) => idx !== i));
    }
    return (
      <div>
        <label style={label}>List items ({items.length}/{max})</label>
        {items.map((it, i) => (
          <div key={i} style={{ marginBottom: 10, border: "1px solid rgba(60,60,60,0.12)", borderRadius: 6, padding: 8, background: "#FBFBFB" }}>
            <input style={{ ...input, marginBottom: 6 }} value={it.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="01" />
            <textarea style={{ ...textarea, minHeight: 52 }} value={it.text} onChange={(e) => update(i, { text: e.target.value })} placeholder="Item text" />
            <div style={{ marginTop: 6 }}>
              <label style={label}>Icon (optional)</label>
              <IconPicker value={it.icon ?? null} onChange={(icon) => update(i, { icon })} />
            </div>
            <button style={{ ...btn, marginTop: 6 }} onClick={() => remove(i)}>Remove</button>
          </div>
        ))}
        {items.length < max && (
          <button style={btn} onClick={add}>+ Add item</button>
        )}
      </div>
    );
  }

  function StatsEditor({ stats, onChange }: { stats: SlideStat[]; onChange: (stats: SlideStat[]) => void }) {
    function update(i: number, p: Partial<SlideStat>) {
      const next = stats.slice();
      next[i] = { ...next[i], ...p };
      onChange(next);
    }
    function add() {
      if (stats.length >= 4) return;
      onChange([...stats, { value: "0%", label: "" }]);
    }
    function remove(i: number) {
      onChange(stats.filter((_, idx) => idx !== i));
    }
    return (
      <div>
        <label style={label}>Stats ({stats.length}/4)</label>
        {stats.map((s, i) => (
          <div key={i} style={{ marginBottom: 10, border: "1px solid rgba(60,60,60,0.12)", borderRadius: 6, padding: 8, background: "#FBFBFB" }}>
            <input style={{ ...input, marginBottom: 6, fontSize: 16, fontWeight: 600 }} value={s.value} onChange={(e) => update(i, { value: e.target.value })} placeholder="98%" />
            <input style={input} value={s.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="Customer satisfaction" />
            <button style={{ ...btn, marginTop: 6 }} onClick={() => remove(i)}>Remove</button>
          </div>
        ))}
        {stats.length < 4 && <button style={btn} onClick={add}>+ Add stat</button>}
      </div>
    );
  }

  function ColumnsEditor({ columns, onChange }: { columns: SlideColumn[]; onChange: (cols: SlideColumn[]) => void }) {
    function update(i: number, p: Partial<SlideColumn>) {
      const next = columns.slice();
      next[i] = { ...next[i], ...p };
      onChange(next);
    }
    function add() {
      if (columns.length >= 3) return;
      onChange([...columns, { title: "", body: "" }]);
    }
    function remove(i: number) {
      onChange(columns.filter((_, idx) => idx !== i));
    }
    return (
      <div>
        <label style={label}>Columns ({columns.length}/3)</label>
        {columns.map((col, i) => (
          <div key={i} style={{ marginBottom: 10, border: "1px solid rgba(60,60,60,0.12)", borderRadius: 6, padding: 8, background: "#FBFBFB" }}>
            <input style={{ ...input, marginBottom: 6 }} value={col.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="Column title" />
            <textarea style={{ ...textarea, minHeight: 60 }} value={col.body} onChange={(e) => update(i, { body: e.target.value })} placeholder="Column body" />
            <div style={{ marginTop: 6 }}>
              <label style={label}>Icon (optional)</label>
              <IconPicker value={col.icon ?? null} onChange={(icon) => update(i, { icon })} />
            </div>
            <button style={{ ...btn, marginTop: 6 }} onClick={() => remove(i)}>Remove</button>
          </div>
        ))}
        {columns.length < 3 && <button style={btn} onClick={add}>+ Add column</button>}
      </div>
    );
  }
}

function IconInsertRow({ onPick }: { onPick: (n: SlideIconName) => void }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ ...label, marginBottom: 4 }}>Insert icon into title</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {ICON_NAMES.map((n) => (
          <button
            key={n}
            type="button"
            title={ICON_LABELS[n]}
            onClick={() => onPick(n)}
            style={{
              ...btn,
              padding: 6,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
            }}
          >
            <Icon name={n} size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

function IconPicker({ value, onChange }: { value: SlideIconName | null; onChange: (n: SlideIconName | null) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      <button
        type="button"
        onClick={() => onChange(null)}
        style={{
          ...btn,
          padding: 6,
          width: 32,
          height: 32,
          background: value === null ? "rgba(60,60,60,0.12)" : "#FFF",
        }}
        title="None"
      >
        —
      </button>
      {ICON_NAMES.map((n) => (
        <button
          key={n}
          type="button"
          title={ICON_LABELS[n]}
          onClick={() => onChange(n)}
          style={{
            ...btn,
            padding: 6,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            background: value === n ? "rgba(60,60,60,0.12)" : "#FFF",
          }}
        >
          <Icon name={n} size={16} />
        </button>
      ))}
    </div>
  );
}

function IllustrationEditor({ source, onChange }: { source: IllustrationSource; onChange: (next: IllustrationSource) => void }) {
  const mode = source === null ? "none" : source.kind === "brand" ? "brand" : "custom";
  const brandId: IllustrationId = source?.kind === "brand" ? source.id : "08";
  const accent = source?.kind === "brand" ? source.accent : ILLUSTRATION_ACCENTS[0].id;
  const brandIds = ILLUSTRATIONS.filter((i) => i.id !== "none");

  function setMode(next: "none" | "brand" | "custom") {
    if (next === "none") onChange(null);
    else if (next === "brand") onChange({ kind: "brand", id: brandId, accent });
    else onChange(source?.kind === "custom" ? source : { kind: "custom", dataUrl: "" });
  }

  return (
    <div>
      <label style={label}>Illustration</label>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {(["none", "brand", "custom"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            style={{
              ...btn,
              flex: 1,
              background: mode === m ? "rgba(60,60,60,0.12)" : "#FFF",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "brand" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {brandIds.map((i) => {
              const isActive = source?.kind === "brand" && source.id === i.id;
              return (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => onChange({ kind: "brand", id: i.id as IllustrationId, accent })}
                  title={i.label}
                  style={{
                    border: isActive ? "2px solid #3C3C3C" : "1px solid rgba(60,60,60,0.15)",
                    borderRadius: 6,
                    padding: 4,
                    cursor: "pointer",
                    background: accent,
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={illusSrc(i.id)}
                    alt={i.label}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </button>
              );
            })}
          </div>
          <div>
            <label style={label}>Panel color</label>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {ILLUSTRATION_ACCENTS.map((a) => {
                const active = source?.kind === "brand" && source.accent === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() =>
                      onChange({ kind: "brand", id: brandId, accent: a.id })
                    }
                    title={a.name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: active ? "2px solid #3C3C3C" : "1px solid rgba(60,60,60,0.25)",
                      background: a.id,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {mode === "custom" && (
        <CustomIllustrationPicker
          value={source?.kind === "custom" ? source.dataUrl : ""}
          onChange={(dataUrl) => onChange(dataUrl ? { kind: "custom", dataUrl } : null)}
        />
      )}
    </div>
  );
}

function CustomIllustrationPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  async function onFile(f: File | null) {
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      window.alert("Image must be under 8MB.");
      return;
    }
    const { normalizeUploadedImage } = await import("@/lib/imageUtils");
    const dataUrl = await normalizeUploadedImage(f);
    onChange(dataUrl);
  }

  async function removeBg() {
    if (!value) return;
    setBusy(true);
    setProgress(0);
    try {
      const { removeImageBackground } = await import("@/lib/bgRemoval");
      const out = await removeImageBackground(value, (r) => setProgress(Math.round(r * 100)));
      onChange(out);
    } catch (e) {
      console.error(e);
      window.alert(`Background removal failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "contain", borderRadius: 6, marginBottom: 8, background: "rgba(0,0,0,0.04)" }} />
      )}
      <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} style={{ fontSize: 12 }} />
      {value && (
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          <button style={btn} onClick={removeBg} disabled={busy}>
            {busy ? `Removing… ${progress}%` : "Remove background"}
          </button>
          <button style={btn} onClick={() => onChange("")}>Clear</button>
        </div>
      )}
    </div>
  );
}

function TableEditor({ table, onChange }: { table: SlideTable; onChange: (t: SlideTable) => void }) {
  function setColumns(columns: string[]) {
    // Ensure each row's cells match column count.
    const rows = table.rows.map((r) => ({
      ...r,
      cells: Array.from({ length: columns.length }, (_, i) => r.cells[i] ?? ({ kind: "text", value: "" } as TableCell)),
    }));
    const footer = table.footer
      ? Array.from({ length: columns.length }, (_, i) => table.footer![i] ?? ({ label: "" } as TableFooterCell))
      : table.footer;
    onChange({ columns, rows, footer });
  }
  function addColumn() {
    setColumns([...table.columns, `Col ${table.columns.length + 1}`]);
  }
  function removeColumn(i: number) {
    setColumns(table.columns.filter((_, idx) => idx !== i));
  }
  function updateColumn(i: number, value: string) {
    const cols = table.columns.slice();
    cols[i] = value;
    setColumns(cols);
  }

  function addRow() {
    const newRow: TableRow = {
      label: "New row",
      cells: Array.from({ length: table.columns.length }, () => ({ kind: "text", value: "" } as TableCell)),
    };
    onChange({ ...table, rows: [...table.rows, newRow] });
  }
  function updateRow(i: number, p: Partial<TableRow>) {
    const rows = table.rows.slice();
    rows[i] = { ...rows[i], ...p };
    onChange({ ...table, rows });
  }
  function removeRow(i: number) {
    onChange({ ...table, rows: table.rows.filter((_, idx) => idx !== i) });
  }
  function updateCell(rowIdx: number, colIdx: number, cell: TableCell) {
    const rows = table.rows.slice();
    const cells = rows[rowIdx].cells.slice();
    cells[colIdx] = cell;
    rows[rowIdx] = { ...rows[rowIdx], cells };
    onChange({ ...table, rows });
  }
  function toggleFooter() {
    if (table.footer) onChange({ ...table, footer: null });
    else onChange({
      ...table,
      footer: Array.from({ length: table.columns.length }, () => ({ label: "" } as TableFooterCell)),
    });
  }
  function updateFooter(i: number, p: Partial<TableFooterCell>) {
    if (!table.footer) return;
    const footer = table.footer.slice();
    footer[i] = { ...footer[i], ...p };
    onChange({ ...table, footer });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <label style={label}>Columns ({table.columns.length})</label>
        {table.columns.map((col, i) => (
          <div key={i} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <input style={{ ...input, flex: 1 }} value={col} onChange={(e) => updateColumn(i, e.target.value)} />
            <button style={btn} onClick={() => removeColumn(i)} title="Remove column">×</button>
          </div>
        ))}
        <button style={btn} onClick={addColumn}>+ Column</button>
      </div>

      <div>
        <label style={label}>Rows ({table.rows.length})</label>
        {table.rows.map((row, ri) => (
          <div key={ri} style={{ marginBottom: 10, border: "1px solid rgba(60,60,60,0.12)", borderRadius: 6, padding: 8, background: "#FBFBFB" }}>
            <input
              style={{ ...input, marginBottom: 6 }}
              value={row.label}
              onChange={(e) => updateRow(ri, { label: e.target.value })}
              placeholder="Row label"
            />
            <div style={{ marginBottom: 6 }}>
              <label style={label}>Row icon</label>
              <IconPicker value={row.icon ?? null} onChange={(icon) => updateRow(ri, { icon })} />
            </div>
            {table.columns.map((_, ci) => {
              const cell = row.cells[ci] ?? ({ kind: "text", value: "" } as TableCell);
              return (
                <div key={ci} style={{ marginBottom: 6 }}>
                  <label style={label}>Col {ci + 1}</label>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <button
                      style={{ ...btn, flex: 1, background: cell.kind === "text" ? "rgba(60,60,60,0.12)" : "#FFF" }}
                      onClick={() => updateCell(ri, ci, { kind: "text", value: cell.kind === "text" ? cell.value : "" })}
                    >
                      Text
                    </button>
                    <button
                      style={{ ...btn, flex: 1, background: cell.kind === "check" ? "rgba(60,60,60,0.12)" : "#FFF" }}
                      onClick={() => updateCell(ri, ci, { kind: "check" })}
                    >
                      ✓
                    </button>
                    <button
                      style={{ ...btn, flex: 1, background: cell.kind === "cross" ? "rgba(60,60,60,0.12)" : "#FFF" }}
                      onClick={() => updateCell(ri, ci, { kind: "cross" })}
                    >
                      ✗
                    </button>
                  </div>
                  {cell.kind === "text" && (
                    <>
                      <input
                        style={input}
                        value={cell.value}
                        onChange={(e) => updateCell(ri, ci, { kind: "text", value: e.target.value, highlight: cell.highlight })}
                        placeholder="Cell text"
                      />
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 12 }}>
                        <input
                          type="checkbox"
                          checked={!!cell.highlight}
                          onChange={(e) => updateCell(ri, ci, { kind: "text", value: cell.value, highlight: e.target.checked })}
                        />
                        Highlight
                      </label>
                    </>
                  )}
                </div>
              );
            })}
            <button style={btn} onClick={() => removeRow(ri)}>Remove row</button>
          </div>
        ))}
        <button style={btn} onClick={addRow} disabled={table.columns.length === 0}>+ Row</button>
      </div>

      <div>
        <label style={label}>Footer row (e.g. pricing)</label>
        <button style={btn} onClick={toggleFooter}>
          {table.footer ? "Remove footer" : "+ Add footer"}
        </button>
        {table.footer && (
          <div style={{ marginTop: 8 }}>
            {table.footer.map((f, i) => (
              <div key={i} style={{ marginBottom: 6, border: "1px solid rgba(60,60,60,0.12)", borderRadius: 6, padding: 8, background: "#FBFBFB" }}>
                <input
                  style={{ ...input, marginBottom: 4 }}
                  value={f.label}
                  onChange={(e) => updateFooter(i, { label: e.target.value })}
                  placeholder={`Col ${i + 1} footer`}
                />
                <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <input
                    type="checkbox"
                    checked={!!f.highlight}
                    onChange={(e) => updateFooter(i, { highlight: e.target.checked })}
                  />
                  Highlight
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoPicker({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  async function onFile(f: File | null) {
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      window.alert("Photo must be under 8MB.");
      return;
    }
    const { normalizeUploadedImage } = await import("@/lib/imageUtils");
    const dataUrl = await normalizeUploadedImage(f);
    onChange(dataUrl);
  }

  async function removeBg() {
    if (!value) return;
    setBusy(true);
    setProgress(0);
    try {
      const { removeImageBackground } = await import("@/lib/bgRemoval");
      const out = await removeImageBackground(value, (r) => setProgress(Math.round(r * 100)));
      onChange(out);
    } catch (e) {
      console.error(e);
      window.alert(`Background removal failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
      )}
      <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} style={{ fontSize: 12 }} />
      {value && (
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          <button style={btn} onClick={removeBg} disabled={busy}>
            {busy ? `Removing… ${progress}%` : "Remove background"}
          </button>
          <button style={btn} onClick={() => onChange(null)}>Remove</button>
        </div>
      )}
    </div>
  );
}
