import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

// NOTE on fonts:
// We load Mukta + Arimo via a <link> tag at runtime rather than next/font so the
// build doesn't depend on Google Fonts being reachable from the CI/sandbox. In
// production we'll self-host the font files under /public/fonts and swap this
// for a CSS @font-face declaration — the plan doc calls this out.

export const metadata: Metadata = {
  title: "Stay Studio",
  description:
    "Stay Studio — generate on-brand social, ad, and marketing creatives for Stay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500&family=Arimo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navigation />
        <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      </body>
    </html>
  );
}
