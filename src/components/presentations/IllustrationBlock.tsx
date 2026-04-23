import type { CSSProperties } from "react";
import type { IllustrationSource } from "@/types";
import { illusSrc } from "@/lib/brand";

interface Props {
  source: IllustrationSource;
  radius?: number;
  padding?: number;
  style?: CSSProperties;
}

export default function IllustrationBlock({ source, radius = 28, padding = 48, style }: Props) {
  if (!source) return null;

  const isBrand = source.kind === "brand";
  const src = isBrand ? illusSrc(source.id) : source.dataUrl;
  const bg = isBrand ? source.accent : "transparent";
  const fit = isBrand ? "contain" : "cover";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        borderRadius: radius,
        padding: isBrand ? padding : 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }} />
    </div>
  );
}
