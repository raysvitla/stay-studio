// Stay Studio — template router
// Looks up the right template by (format, style) and renders it at the
// format's exact pixel dimensions. Wrapped by <Preview> which scales it
// to fit the viewport.

import type { Design } from "@/types";
import { getFormat } from "@/lib/formats";
import { getTemplate } from "@/lib/templates";
import { getColorScheme } from "@/lib/brand";

export default function TemplateRenderer({
  design,
  slideIndex,
}: {
  design: Design;
  slideIndex?: number;
}) {
  const fmt = getFormat(design.format);
  const scheme = getColorScheme(design.color);
  const Template = getTemplate(design.format, design.style);
  return (
    <div style={{ width: fmt.w, height: fmt.h, background: scheme.bg }}>
      <Template c={scheme} state={design} slideIndex={slideIndex} />
    </div>
  );
}
