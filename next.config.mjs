/** @type {import('next').NextConfig} */
// Stay Studio — Next config
//
// Phase 1 deploys to GitHub Pages as a static site, so we use Next's
// static export mode. This has three consequences:
//   1. API routes (app/api/*) cannot exist — Pages has no server.
//   2. next/font Google loader can't be used — we load fonts via <link> instead.
//   3. basePath must match the repo name for project pages
//      (username.github.io/<repo>/). The GitHub Actions workflow sets
//      NEXT_PUBLIC_BASE_PATH=/<repo-name> automatically; locally it is empty.
//
// When we move to Vercel in Phase 2 (auth + DB), drop `output: 'export'` and
// basePath — everything else stays the same.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
