"use client";

// Stay Studio — controls panel
// The form the user interacts with to customise the design.

import { useEffect, useRef, useState } from "react";
import type { CarouselSlide, Design, DesignContent, PaletteKey } from "@/types";
import { CATEGORY_LABELS, FORMATS, getFormat, isCarouselFormat } from "@/lib/formats";
import { getStyles } from "@/lib/templates";
import { COLOR_SCHEMES, ILLUSTRATIONS, ILLUSTRATION_ACCENTS, illusSrc } from "@/lib/brand";
import { deleteDesign, listDesigns, saveDesign } from "@/lib/storage";
import Icon, { ICON_KEYWORDS, ICON_LABELS, ICON_NAMES, type IconName } from "@/components/brand/Icon";
import Section from "./Section";

const MAX_SLIDES = 10;

export default function Controls({
  design,
  setDesign,
  onDownload,
  onDownloadAllFormats,
  onDownloadSaved,
  downloading,
  showSafeZone,
  setShowSafeZone,
  activeSlide,
  setActiveSlide,
  hdExport,
  setHdExport,
}: {
  design: Design;
  setDesign: (updater: (d: Design) => Design) => void;
  onDownload: () => void;
  onDownloadAllFormats: () => void;
  onDownloadSaved: (designs: Design[]) => void;
  downloading: boolean;
  showSafeZone: boolean;
  setShowSafeZone: (v: boolean) => void;
  activeSlide: number;
  setActiveSlide: (idx: number) => void;
  hdExport: boolean;
  setHdExport: (v: boolean) => void;
}) {
  const fmt = getFormat(design.format);
  const styles = getStyles(design.format);
  const safeZoneApplies = Boolean(fmt.safeZone);
  const isCarousel = isCarouselFormat(design.format);
  const currentStyleFields = styles.find((s) => s.id === design.style)?.fields ?? [];
  const showIllustrationSection = (currentStyleFields as ReadonlyArray<string>).includes("illustration");
  const showPersonPhotoSection = (currentStyleFields as ReadonlyArray<string>).includes("photoUrl");
  const showAccentTextSection = (currentStyleFields as ReadonlyArray<string>).includes("accentText");

  // The content the user is currently editing: either the main design or the
  // active slide of a carousel.
  const editedContent: DesignContent = isCarousel && design.slides?.[activeSlide]
    ? design.slides[activeSlide].content
    : design.content;

  const set = <K extends keyof Design>(key: K, val: Design[K]) =>
    setDesign((d) => ({ ...d, [key]: val, updatedAt: Date.now() }));

  const setContent = <K extends keyof DesignContent>(key: K, val: DesignContent[K]) => {
    if (isCarousel && design.slides) {
      setDesign((d) => {
        const slides = (d.slides ?? []).map((s, i) =>
          i === activeSlide ? { ...s, content: { ...s.content, [key]: val } } : s
        );
        return { ...d, slides, updatedAt: Date.now() };
      });
    } else {
      setDesign((d) => ({ ...d, content: { ...d.content, [key]: val }, updatedAt: Date.now() }));
    }
  };

  const addSlide = () => {
    setDesign((d) => {
      const slides = d.slides ?? [];
      if (slides.length >= MAX_SLIDES) return d;
      const base = slides[slides.length - 1]?.content ?? d.content;
      const newSlide: CarouselSlide = {
        id: `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        content: { ...base, headline: "New slide", body: "", cta: "" },
      };
      return { ...d, slides: [...slides, newSlide], updatedAt: Date.now() };
    });
    setActiveSlide((design.slides?.length ?? 0));
  };

  const removeSlide = (idx: number) => {
    setDesign((d) => {
      const slides = (d.slides ?? []).filter((_, i) => i !== idx);
      return { ...d, slides, updatedAt: Date.now() };
    });
    setActiveSlide(Math.max(0, idx - 1));
  };

  const groupedByCategory = FORMATS.reduce<Record<string, typeof FORMATS>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});

  const hasIllustrationAccent =
    design.style !== "bold" && design.format !== "li-banner" && editedContent.illustration !== "none";
  const showTextFields = design.format !== "li-banner";
  const showStatsFields = design.style === "stats";
  const showStatGridEditor = design.style === "stat-grid";
  const showTableEditor = design.style === "compare-table";
  const photoLabel = design.style === "photo-hero" ? "Photo" : "Person photo";

  return (
    <div className="stay-scrollbar" style={{ width: 320, flexShrink: 0, background: "#FFFFFF", borderRight: "1px solid rgba(60,60,60,0.08)", height: "100vh", overflowY: "auto" }}>
      <div style={{ padding: "6px 18px 18px" }}>
        {/* ── FORMAT ─────────────────────────────────────────────── */}
        <Section title="Format" defaultOpen persistKey="format">
          <div style={group}>
            <div style={groupLabel}>Format</div>
            {Object.entries(groupedByCategory).map(([cat, list]) => (
              <div key={cat} style={{ marginBottom: 10 }}>
                <div style={categoryLabel}>{CATEGORY_LABELS[cat] ?? cat}</div>
                {list.map((f) => {
                  const disabled = f.status !== "ready";
                  const active = design.format === f.id;
                  return (
                    <button
                      key={f.id}
                      disabled={disabled}
                      onClick={() => {
                        const firstStyle = getStyles(f.id)[0]?.id ?? "";
                        setDesign((d) => ({ ...d, format: f.id, style: firstStyle, updatedAt: Date.now() }));
                      }}
                      style={{
                        ...formatBtn,
                        ...(active ? formatBtnActive : {}),
                        opacity: disabled ? 0.35 : 1,
                        cursor: disabled ? "not-allowed" : "pointer",
                      }}
                      title={disabled ? "Not ready in this phase" : f.sub}
                    >
                      <span style={formatName}>{f.label}</span>
                      <span style={formatSub}>{f.sub}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {styles.length > 1 && (
            <div style={group}>
              <div style={groupLabel}>Layout</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {styles.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => set("style", st.id)}
                    style={{ ...styleBtn, ...(design.style === st.id ? styleBtnActive : {}) }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isCarousel && design.slides && (
            <div style={group}>
              <div style={groupLabel}>
                Slides · editing {activeSlide + 1}/{design.slides.length}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {design.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 7,
                      fontFamily: "'Arimo',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      border: `1.5px solid ${activeSlide === i ? "#3C3C3C" : "rgba(60,60,60,0.15)"}`,
                      background: activeSlide === i ? "#3C3C3C" : "white",
                      color: activeSlide === i ? "white" : "#3C3C3C",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                {design.slides.length < MAX_SLIDES && (
                  <button
                    onClick={addSlide}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 7,
                      border: "1.5px dashed rgba(60,60,60,0.25)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 18,
                      color: "#3C3C3C",
                    }}
                    title="Add slide"
                  >
                    +
                  </button>
                )}
              </div>
              {design.slides.length > 1 && (
                <button
                  onClick={() => removeSlide(activeSlide)}
                  style={{
                    fontSize: 11,
                    color: "rgba(60,60,60,0.55)",
                    background: "transparent",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Remove slide {activeSlide + 1}
                </button>
              )}
              <div style={{ fontSize: 10, color: "rgba(60,60,60,0.45)", marginTop: 6, lineHeight: 1.4 }}>
                2–10 slides. Each slide has its own text. Export bundles them as a ZIP ready for Instagram / Meta Ads Manager.
              </div>
            </div>
          )}
        </Section>

        {/* ── CONTENT ────────────────────────────────────────────── */}
        <Section title="Content" defaultOpen persistKey="content">
          <div style={group}>
            <div style={groupLabel}>Headline</div>
            <TextFieldWithIcons
              value={editedContent.headline}
              onChange={(v) => setContent("headline", v)}
              rows={3}
              placeholder="Your headline here…"
            />
          </div>

          {showTextFields && (
            <div style={group}>
              <div style={groupLabel}>Body text</div>
              <TextFieldWithIcons
                value={editedContent.body}
                onChange={(v) => setContent("body", v)}
                rows={2}
                placeholder="Supporting message…"
              />
              <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
                <div style={{ ...groupLabel, marginBottom: 0, marginRight: 4 }}>Size</div>
                {(["S", "M", "L"] as const).map((size) => {
                  const current = editedContent.bodySize ?? "M";
                  const active = current === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setContent("bodySize", size)}
                      style={{ ...styleBtn, flex: "0 0 auto", padding: "6px 14px", ...(active ? styleBtnActive : {}) }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {showTextFields && (
            <div style={group}>
              <div style={groupLabel}>CTA</div>
              <TextFieldWithIcons
                value={editedContent.cta}
                onChange={(v) => setContent("cta", v)}
                rows={1}
                placeholder="e.g. Get a free quote →"
              />
            </div>
          )}

          {showStatsFields && (
            <div style={group}>
              <div style={groupLabel}>Big number</div>
              <input
                value={editedContent.stat}
                onChange={(e) => setContent("stat", e.target.value)}
                style={inputStyle}
                placeholder="e.g. 3,000+"
              />
              <input
                value={editedContent.statLabel}
                onChange={(e) => setContent("statLabel", e.target.value)}
                style={{ ...inputStyle, marginTop: 6 }}
                placeholder="e.g. Clients protected"
              />
            </div>
          )}

          {showStatGridEditor && (
            <div style={group}>
              <div style={groupLabel}>Stat grid (4 cells)</div>
              <StatGridEditor
                value={editedContent.stats ?? null}
                onChange={(v) => setContent("stats", v)}
              />
            </div>
          )}

          {showTableEditor && (
            <div style={group}>
              <div style={groupLabel}>Compare table</div>
              <TableEditor
                value={editedContent.table ?? null}
                onChange={(v) => setContent("table", v)}
              />
            </div>
          )}
        </Section>

        {/* ── VISUAL ─────────────────────────────────────────────── */}
        <Section title="Visual" defaultOpen persistKey="visual">
          <div style={group}>
            <div style={groupLabel}>Colour</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {COLOR_SCHEMES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => set("color", c.id as PaletteKey)}
                  title={c.name}
                  aria-label={c.name}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: c.bg,
                    border: `2.5px solid ${design.color === c.id ? "#3C3C3C" : "rgba(60,60,60,0.12)"}`,
                    cursor: "pointer",
                    padding: 0,
                    transition: "border-color 150ms",
                  }}
                />
              ))}
            </div>
          </div>

          {hasIllustrationAccent && (
            <div style={group}>
              <div style={groupLabel}>Illustration background</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ILLUSTRATION_ACCENTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setContent("illusAccent", c.id)}
                    title={c.name}
                    aria-label={c.name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: c.id,
                      padding: 0,
                      border: `2.5px solid ${editedContent.illusAccent === c.id ? "#3C3C3C" : "rgba(60,60,60,0.12)"}`,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {showIllustrationSection && (
            <div style={group}>
              <div style={groupLabel}>Illustration</div>
              <CustomIllustrationUploader
                value={editedContent.customIllustration ?? null}
                onChange={(url) => setContent("customIllustration", url)}
              />
              {!editedContent.customIllustration && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                  {ILLUSTRATIONS.map((il) => (
                    <button
                      key={il.id}
                      onClick={() => setContent("illustration", il.id)}
                      style={{
                        border: `2px solid ${editedContent.illustration === il.id ? "#3C3C3C" : "rgba(60,60,60,0.10)"}`,
                        borderRadius: 8,
                        padding: 4,
                        cursor: "pointer",
                        background: editedContent.illustration === il.id ? "#EBE1FF" : "white",
                        textAlign: "center",
                      }}
                    >
                      {il.id !== "none" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={illusSrc(il.id)}
                          alt={il.label}
                          style={{ width: "100%", height: 40, objectFit: "contain" }}
                        />
                      ) : (
                        <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "rgba(60,60,60,0.4)" }}>
                          None
                        </div>
                      )}
                      <div style={{ fontSize: 9, color: "rgba(60,60,60,0.5)", marginTop: 2 }}>{il.label}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {showPersonPhotoSection && (
            <div style={group}>
              <div style={groupLabel}>{photoLabel}</div>
              <PersonPhotoUploader
                value={editedContent.photoUrl ?? null}
                onChange={(url) => setContent("photoUrl", url)}
                label={photoLabel}
              />
            </div>
          )}
        </Section>

        {/* ── BRAND ──────────────────────────────────────────────── */}
        <Section title="Brand" defaultOpen={false} persistKey="brand">
          <div style={group}>
            <div style={groupLabel}>URL / handle</div>
            <input
              value={editedContent.url}
              onChange={(e) => setContent("url", e.target.value)}
              style={inputStyle}
              placeholder="stayinsured.de"
            />
          </div>

          {showAccentTextSection && (
            <div style={group}>
              <div style={groupLabel}>Accent badge</div>
              <input
                value={editedContent.accentText ?? ""}
                onChange={(e) => setContent("accentText", e.target.value || null)}
                style={inputStyle}
                placeholder="2025 · EP. 3 · NEW"
                maxLength={12}
              />
            </div>
          )}
        </Section>

        {/* ── EXPORT ─────────────────────────────────────────────── */}
        <Section title="Export" defaultOpen persistKey="export">
          {safeZoneApplies && (
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#3C3C3C", marginBottom: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} />
              Show ad safe zone
            </label>
          )}

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#3C3C3C", marginBottom: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={hdExport} onChange={(e) => setHdExport(e.target.checked)} />
            HD export (2× pixel ratio)
          </label>

          <button onClick={onDownload} disabled={downloading} style={{ ...downloadBtn, opacity: downloading ? 0.6 : 1 }}>
            {downloading ? "Exporting…" : isCarousel ? "⬇ Download carousel (ZIP)" : "⬇ Download PNG"}
          </button>

          {!isCarousel && (
            <button
              onClick={onDownloadAllFormats}
              disabled={downloading}
              style={{ ...downloadBtn, background: "white", color: "#3C3C3C", border: "1.5px solid rgba(60,60,60,0.15)", marginTop: 8, opacity: downloading ? 0.6 : 1 }}
              title="Render this design into every available format and bundle as ZIP"
            >
              ⬇ Download all formats (ZIP)
            </button>
          )}

          <div style={{ fontSize: 10, color: "rgba(60,60,60,0.4)", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
            Exports at full resolution ({fmt.sub})
          </div>

          <SavedDesignsPanel
            currentDesign={design}
            onLoad={(d) => setDesign(() => d)}
            onDownloadSaved={onDownloadSaved}
            downloading={downloading}
          />
        </Section>
      </div>
    </div>
  );
}

// Inline styles — kept here because Tailwind arbitrary borders/transitions get
// messy for a tight control panel. Migrate to Tailwind once the UI stabilises.
const group: React.CSSProperties = { marginBottom: 18 };
const groupLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "rgba(60,60,60,0.4)",
  marginBottom: 7,
};
const categoryLabel: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(60,60,60,0.3)",
  marginBottom: 4,
  marginTop: 6,
};
const formatBtn: React.CSSProperties = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 10px",
  borderRadius: 8,
  marginBottom: 4,
  background: "transparent",
  border: "1.5px solid rgba(60,60,60,0.10)",
  transition: "all 150ms",
  textAlign: "left",
};
const formatBtnActive: React.CSSProperties = { background: "#EBE1FF", borderColor: "#DDD0FF" };
const formatName: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#3C3C3C", fontFamily: "'Arimo',sans-serif" };
const formatSub: React.CSSProperties = { fontSize: 10, color: "rgba(60,60,60,0.4)", fontFamily: "monospace" };
const styleBtn: React.CSSProperties = {
  flex: "1 1 auto",
  padding: "7px 10px",
  borderRadius: 7,
  border: "1.5px solid rgba(60,60,60,0.12)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "'Arimo',sans-serif",
  color: "#3C3C3C",
};
const styleBtnActive: React.CSSProperties = { background: "#3C3C3C", color: "white", borderColor: "#3C3C3C" };
const textareaStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Arimo',sans-serif",
  fontSize: 13,
  color: "#3C3C3C",
  border: "1.5px solid rgba(60,60,60,0.15)",
  borderRadius: 8,
  padding: "8px 10px",
  resize: "vertical",
  outline: "none",
  boxSizing: "border-box",
  lineHeight: 1.5,
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Arimo',sans-serif",
  fontSize: 13,
  color: "#3C3C3C",
  border: "1.5px solid rgba(60,60,60,0.15)",
  borderRadius: 8,
  padding: "8px 10px",
  outline: "none",
  boxSizing: "border-box",
};
const downloadBtn: React.CSSProperties = {
  width: "100%",
  background: "#3C3C3C",
  color: "white",
  border: "none",
  borderRadius: 9,
  padding: "12px 0",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "'Arimo',sans-serif",
  letterSpacing: "0.01em",
};

function SavedDesignsPanel({
  currentDesign,
  onLoad,
  onDownloadSaved,
  downloading,
}: {
  currentDesign: Design;
  onLoad: (design: Design) => void;
  onDownloadSaved: (designs: Design[]) => void;
  downloading: boolean;
}) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState<string>(currentDesign.name);

  const refresh = () => setDesigns(listDesigns());

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setName(currentDesign.name);
  }, [currentDesign.id, currentDesign.name]);

  const toggle = (id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const save = () => {
    const toSave: Design = { ...currentDesign, name: name.trim() || "Untitled", updatedAt: Date.now() };
    saveDesign(toSave);
    refresh();
  };

  const remove = (id: string) => {
    deleteDesign(id);
    setSelected((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
    refresh();
  };

  const downloadSelected = () => {
    const chosen = designs.filter((d) => selected.has(d.id));
    if (chosen.length === 0) {
      window.alert("Select at least one design to download.");
      return;
    }
    onDownloadSaved(chosen);
  };

  return (
    <div style={{ ...group, marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(60,60,60,0.10)" }}>
      <div style={groupLabel}>Saved designs</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...inputStyle, flex: 1, fontSize: 12, padding: "7px 10px" }}
          placeholder="Design name"
        />
        <button
          onClick={save}
          style={{
            padding: "7px 12px",
            borderRadius: 7,
            border: "1.5px solid #3C3C3C",
            background: "#3C3C3C",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>

      {designs.length === 0 ? (
        <div style={{ fontSize: 11, color: "rgba(60,60,60,0.45)", fontStyle: "italic" }}>
          No saved designs yet. Save the current one to build a batch.
        </div>
      ) : (
        <>
          <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid rgba(60,60,60,0.08)", borderRadius: 7, padding: 4 }}>
            {designs.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 6px",
                  fontSize: 12,
                  borderRadius: 4,
                  background: selected.has(d.id) ? "#EBE1FF" : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(d.id)}
                  onChange={() => toggle(d.id)}
                  style={{ cursor: "pointer" }}
                />
                <button
                  onClick={() => onLoad(d)}
                  style={{ flex: 1, textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, color: "#3C3C3C" }}
                  title="Load into editor"
                >
                  {d.name}
                  <span style={{ color: "rgba(60,60,60,0.45)", marginLeft: 6, fontSize: 10 }}>{d.format}</span>
                </button>
                <button
                  onClick={() => remove(d.id)}
                  style={{ background: "none", border: "none", color: "rgba(60,60,60,0.45)", cursor: "pointer", fontSize: 13, padding: "0 4px" }}
                  title="Delete"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={downloadSelected}
            disabled={downloading || selected.size === 0}
            style={{
              ...downloadBtn,
              marginTop: 10,
              background: "white",
              color: "#3C3C3C",
              border: "1.5px solid rgba(60,60,60,0.15)",
              opacity: downloading || selected.size === 0 ? 0.5 : 1,
            }}
          >
            ⬇ Download selected ({selected.size}) as ZIP
          </button>
        </>
      )}
    </div>
  );
}

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB raw input; normalizer shrinks before storage.

function ImageUploader({
  value,
  onChange,
  label,
  hint,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  label: string;
  hint?: string;
}) {
  const [working, setWorking] = useState<"normalizing" | "removing-bg" | null>(null);
  const [bgProgress, setBgProgress] = useState<number | null>(null);

  const onPick = async (file: File | null) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      window.alert("Image must be under 8MB. Try compressing it first (tinypng.com).");
      return;
    }
    setWorking("normalizing");
    try {
      const { normalizeUploadedImage } = await import("@/lib/imageUtils");
      const url = await normalizeUploadedImage(file);
      onChange(url);
    } catch (e) {
      window.alert(`Couldn't read that file: ${(e as Error).message}`);
    } finally {
      setWorking(null);
    }
  };

  const onRemoveBg = async () => {
    if (!value) return;
    setWorking("removing-bg");
    setBgProgress(0);
    try {
      const { removeImageBackground } = await import("@/lib/bgRemoval");
      const url = await removeImageBackground(value, (p) => setBgProgress(p));
      onChange(url);
    } catch (e) {
      window.alert(`Background removal failed: ${(e as Error).message}`);
    } finally {
      setWorking(null);
      setBgProgress(null);
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {value ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 6, border: "1.5px solid rgba(60,60,60,0.15)", borderRadius: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Your upload" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6, flexShrink: 0, background: "repeating-conic-gradient(#eee 0 25%, #fff 0 50%) 0 0/8px 8px" }} />
            <span style={{ fontSize: 12, color: "#3C3C3C", flex: 1 }}>{label}</span>
            <button
              onClick={() => onChange(null)}
              disabled={working !== null}
              style={{
                background: "transparent",
                border: "1px solid rgba(60,60,60,0.18)",
                borderRadius: 6,
                fontSize: 11,
                padding: "4px 8px",
                cursor: working ? "not-allowed" : "pointer",
                color: "#3C3C3C",
              }}
            >
              Remove
            </button>
          </div>
          <button
            onClick={onRemoveBg}
            disabled={working !== null}
            style={{
              padding: "8px 10px",
              border: "1.5px solid rgba(60,60,60,0.15)",
              borderRadius: 8,
              background: working === "removing-bg" ? "#EBE1FF" : "white",
              fontSize: 12,
              fontWeight: 600,
              color: "#3C3C3C",
              cursor: working ? "not-allowed" : "pointer",
            }}
          >
            {working === "removing-bg"
              ? `✨ Removing background… ${bgProgress !== null ? `${Math.round(bgProgress * 100)}%` : ""}`
              : "✨ Remove background"}
          </button>
        </div>
      ) : (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 12px",
            border: "1.5px dashed rgba(60,60,60,0.22)",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#3C3C3C",
            cursor: working ? "wait" : "pointer",
            background: "#FCFCFC",
          }}
        >
          {working === "normalizing" ? "Processing…" : `⬆ Upload ${label.toLowerCase()}`}
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            style={{ display: "none" }}
            disabled={working !== null}
          />
        </label>
      )}
      <div style={{ fontSize: 10, color: "rgba(60,60,60,0.45)", marginTop: 4, textAlign: "center" }}>
        {hint ?? "PNG, JPG, SVG, WebP — max 8MB (auto-downscaled)"}
      </div>
    </div>
  );
}

// Text input with a row of insertable `{icon:name}` tokens below.
// Caret position is preserved so clicking an icon inserts it where the user
// was typing.
function TextFieldWithIcons({
  value,
  onChange,
  rows = 1,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");

  const insert = (name: IconName) => {
    const token = `{icon:${name}}`;
    const el = ref.current;
    if (!el) {
      onChange(value + (value.endsWith(" ") ? "" : " ") + token);
      return;
    }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + token + value.slice(end);
    onChange(next);
    setTimeout(() => {
      el.focus();
      const pos = start + token.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? ICON_NAMES.filter((n) => {
        const hay = `${n} ${ICON_LABELS[n]} ${ICON_KEYWORDS[n]}`.toLowerCase();
        return hay.includes(q);
      })
    : ICON_NAMES;

  return (
    <div>
      {rows > 1 ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          style={textareaStyle}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${ICON_NAMES.length} icons…`}
        style={{ ...inputStyle, marginTop: 6, fontSize: 12, padding: "6px 8px" }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          marginTop: 6,
          maxHeight: 120,
          overflowY: "auto",
          padding: 2,
          border: "1px solid rgba(60,60,60,0.08)",
          borderRadius: 6,
          background: "#FAFAFA",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ fontSize: 11, color: "rgba(60,60,60,0.55)", padding: "6px 4px" }}>
            No icons match &ldquo;{query}&rdquo;
          </div>
        ) : (
          filtered.map((n) => (
            <button
              key={n}
              type="button"
              title={`Insert ${ICON_LABELS[n]} icon`}
              onClick={() => insert(n)}
              style={{
                width: 26,
                height: 26,
                padding: 0,
                borderRadius: 5,
                border: "1px solid rgba(60,60,60,0.12)",
                background: "#FCFCFC",
                cursor: "pointer",
                color: "#3C3C3C",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={n} size={14} />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function CustomIllustrationUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}) {
  return <ImageUploader value={value} onChange={onChange} label="Your custom image" />;
}

// 2×2 editor for the Stat Grid template. Always renders 4 fixed rows.
function StatGridEditor({
  value,
  onChange,
}: {
  value: Array<{ value: string; label: string }> | null;
  onChange: (v: Array<{ value: string; label: string }>) => void;
}) {
  const stats = [...(value ?? []), { value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }].slice(0, 4);
  const update = (i: number, key: "value" | "label", v: string) => {
    const next = stats.map((s, idx) => (idx === i ? { ...s, [key]: v } : s));
    onChange(next);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 6 }}>
          <input
            value={s.value}
            onChange={(e) => update(i, "value", e.target.value)}
            style={{ ...inputStyle, flex: "0 0 40%", fontSize: 12 }}
            placeholder={`Stat ${i + 1} (e.g. 3,000+)`}
          />
          <input
            value={s.label}
            onChange={(e) => update(i, "label", e.target.value)}
            style={{ ...inputStyle, flex: 1, fontSize: 12 }}
            placeholder="Label (e.g. Clients)"
          />
        </div>
      ))}
    </div>
  );
}

// Compact compare-table editor: columns (2–3), rows with label + cells that
// cycle through check / cross / text modes. Optional highlighted footer row.
function TableEditor({
  value,
  onChange,
}: {
  value: import("@/types").SlideTable | null;
  onChange: (v: import("@/types").SlideTable) => void;
}) {
  const table: import("@/types").SlideTable = value ?? {
    columns: ["Public", "Stay"],
    rows: [{ label: "New row", cells: [{ kind: "cross" }, { kind: "check" }] }],
    footer: null,
  };
  const colCount = table.columns.length;

  const patch = (next: Partial<import("@/types").SlideTable>) => onChange({ ...table, ...next });

  const setCol = (i: number, v: string) => {
    const columns = table.columns.map((c, idx) => (idx === i ? v : c));
    patch({ columns });
  };
  const addCol = () => {
    if (colCount >= 3) return;
    const columns = [...table.columns, `Col ${colCount + 1}`];
    const rows = table.rows.map((r) => ({ ...r, cells: [...r.cells, { kind: "cross" as const }] }));
    patch({ columns, rows });
  };
  const removeCol = () => {
    if (colCount <= 2) return;
    const columns = table.columns.slice(0, -1);
    const rows = table.rows.map((r) => ({ ...r, cells: r.cells.slice(0, columns.length) }));
    patch({ columns, rows });
  };

  const setRowLabel = (i: number, v: string) => {
    const rows = table.rows.map((r, idx) => (idx === i ? { ...r, label: v } : r));
    patch({ rows });
  };
  const cycleCell = (ri: number, ci: number) => {
    const cur = table.rows[ri].cells[ci];
    const kind = cur?.kind ?? "check";
    const nextCell: import("@/types").TableCell =
      kind === "check" ? { kind: "cross" } : kind === "cross" ? { kind: "text", value: "—" } : { kind: "check" };
    const rows = table.rows.map((r, idx) =>
      idx === ri ? { ...r, cells: r.cells.map((c, j) => (j === ci ? nextCell : c)) } : r
    );
    patch({ rows });
  };
  const setCellText = (ri: number, ci: number, v: string) => {
    const rows = table.rows.map((r, idx) =>
      idx === ri
        ? {
            ...r,
            cells: r.cells.map((c, j) =>
              j === ci && c?.kind === "text" ? { ...c, value: v } : c
            ),
          }
        : r
    );
    patch({ rows });
  };
  const addRow = () => {
    const rows = [
      ...table.rows,
      {
        label: "New row",
        cells: Array.from({ length: colCount }, () => ({ kind: "cross" as const })),
      },
    ];
    patch({ rows });
  };
  const removeRow = (i: number) => {
    const rows = table.rows.filter((_, idx) => idx !== i);
    patch({ rows });
  };

  const cellBtn = (label: string, onClick: () => void, active = false): React.CSSProperties => ({});
  void cellBtn; // keep reference (lint)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(60,60,60,0.5)", marginBottom: 4 }}>Columns</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {table.columns.map((col, i) => (
            <input
              key={i}
              value={col}
              onChange={(e) => setCol(i, e.target.value)}
              style={{ ...inputStyle, flex: "1 1 90px", fontSize: 12 }}
              placeholder={`Col ${i + 1}`}
            />
          ))}
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={removeCol} disabled={colCount <= 2} style={miniBtn}>−</button>
            <button onClick={addCol} disabled={colCount >= 3} style={miniBtn}>+</button>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(60,60,60,0.5)", marginBottom: 4 }}>Rows</div>
        {table.rows.map((r, ri) => (
          <div key={ri} style={{ display: "flex", gap: 4, marginBottom: 6, alignItems: "center" }}>
            <input
              value={r.label}
              onChange={(e) => setRowLabel(ri, e.target.value)}
              style={{ ...inputStyle, flex: "1 1 90px", fontSize: 11 }}
              placeholder="Row label"
            />
            {r.cells.slice(0, colCount).map((cell, ci) => (
              <div key={ci} style={{ display: "flex", gap: 2 }}>
                <button
                  onClick={() => cycleCell(ri, ci)}
                  style={{ ...miniBtn, width: cell?.kind === "text" ? 22 : 30 }}
                  title="Click to cycle: ✓ → ✗ → text"
                >
                  {cell?.kind === "check" ? "✓" : cell?.kind === "cross" ? "✗" : "T"}
                </button>
                {cell?.kind === "text" && (
                  <input
                    value={cell.value}
                    onChange={(e) => setCellText(ri, ci, e.target.value)}
                    style={{ ...inputStyle, width: 52, fontSize: 11, padding: "4px 6px" }}
                  />
                )}
              </div>
            ))}
            <button onClick={() => removeRow(ri)} style={miniBtn} title="Remove row">×</button>
          </div>
        ))}
        <button onClick={addRow} style={{ ...miniBtn, width: "100%", marginTop: 2 }}>+ Add row</button>
      </div>
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  minWidth: 24,
  height: 26,
  padding: "0 6px",
  borderRadius: 6,
  border: "1px solid rgba(60,60,60,0.18)",
  background: "white",
  cursor: "pointer",
  fontSize: 12,
  fontFamily: "'Arimo',sans-serif",
  color: "#3C3C3C",
};

function PersonPhotoUploader({
  value,
  onChange,
  label = "Person photo",
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  label?: string;
}) {
  return <ImageUploader value={value} onChange={onChange} label={label} hint="Upload photo — try 'Remove background' for a clean cut-out" />;
}
