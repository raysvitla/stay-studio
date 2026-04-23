"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Images" },
  { href: "/presentations", label: "Presentations" },
];

export default function Navigation() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.replace(BASE, "") || "/";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        height: 44,
        padding: "0 20px",
        background: "#FFF",
        borderBottom: "1px solid rgba(60,60,60,0.08)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#3C3C3C",
          marginRight: 24,
        }}
      >
        Stay Studio
      </span>
      {LINKS.map((l) => {
        const active =
          l.href === "/" ? normalized === "/" : normalized.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontFamily: "'Mukta', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "6px 12px",
              borderRadius: 6,
              textDecoration: "none",
              color: active ? "#3C3C3C" : "rgba(60,60,60,0.55)",
              background: active ? "#E6FFA0" : "transparent",
              transition: "background 120ms ease",
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
