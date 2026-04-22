// Stay Studio — server-side PNG export endpoint
// Phase 1 stub. Real implementation will:
//   1. Accept a design JSON blob.
//   2. Launch headless Chromium (Playwright / @sparticuz/chromium on Vercel).
//   3. Navigate to /render?d=<id> where an internal route renders the
//      template at fmt.w × fmt.h with embedded fonts.
//   4. Screenshot at pixelRatio 1 and return the PNG.
//
// Browser-side html-to-image export is the default fallback in the editor.
// This endpoint is for batch export, high-DPI, and font-sensitive cases.

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "not_implemented",
      message:
        "Server-side PNG export is planned for Phase 2. The editor falls back to browser-side html-to-image.",
    },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json({ status: "ok", note: "POST a design JSON to export." });
}
