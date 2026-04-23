"use client";

import type { Slide, SlideType, SlideItem, SlideStat, SlideColumn } from "@/types";
import { SLIDE_TYPE_LABELS, SLIDE_TYPE_ORDER } from "@/lib/presentations/slideRegistry";

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

export default function SlideInspector({ slide, onChange }: Props) {
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
        <textarea style={textarea} value={slide.title ?? ""} onChange={(e) => patch({ title: e.target.value })} />
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

      {(slide.type === "section" || slide.type === "numbered-list") && (
        <ItemsEditor items={slide.items ?? []} onChange={patchItems} max={slide.type === "section" ? 3 : 8} />
      )}

      {slide.type === "stats" && <StatsEditor stats={slide.stats ?? []} onChange={patchStats} />}

      {slide.type === "three-col" && <ColumnsEditor columns={slide.columns ?? []} onChange={patchColumns} />}

      {slide.type === "compare-2col" && (
        <>
          <div>
            <label style={label}>Left — title</label>
            <input style={input} value={slide.left?.title ?? ""} onChange={(e) => patch({ left: { title: e.target.value, body: slide.left?.body ?? "" } })} />
            <label style={{ ...label, marginTop: 8 }}>Left — body</label>
            <textarea style={textarea} value={slide.left?.body ?? ""} onChange={(e) => patch({ left: { title: slide.left?.title ?? "", body: e.target.value } })} />
          </div>
          <div>
            <label style={label}>Right — title</label>
            <input style={input} value={slide.right?.title ?? ""} onChange={(e) => patch({ right: { title: e.target.value, body: slide.right?.body ?? "" } })} />
            <label style={{ ...label, marginTop: 8 }}>Right — body</label>
            <textarea style={textarea} value={slide.right?.body ?? ""} onChange={(e) => patch({ right: { title: slide.right?.title ?? "", body: e.target.value } })} />
          </div>
        </>
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
            <button style={{ ...btn, marginTop: 6 }} onClick={() => remove(i)}>Remove</button>
          </div>
        ))}
        {columns.length < 3 && <button style={btn} onClick={add}>+ Add column</button>}
      </div>
    );
  }
}

function PhotoPicker({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
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
  return (
    <div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
      )}
      <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} style={{ fontSize: 12 }} />
      {value && (
        <button
          style={{ ...btn, marginTop: 6, display: "block" }}
          onClick={() => onChange(null)}
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
