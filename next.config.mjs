/** @type {import('next').NextConfig} */
// Stay Studio — Next config
//
// On Vercel we run as a full Next app (serverless). API routes live under
// src/app/api/ and need this. `output: "export"` stays off here; if we ever
// need a static-only build again (GitHub Pages fallback), gate it behind an
// env var.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  basePath,
  assetPrefix: basePath || undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
