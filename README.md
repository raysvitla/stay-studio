# Stay Studio

Team tool for generating on-brand social media, Meta ads, Google Display creatives, and marketing imagery for Stay.

**Status:** Phase 1 scaffold, configured for static export to GitHub Pages. Organic social formats are live; Meta/Google/Email formats are listed in the UI but disabled until templates are built in Phase 2–3. Auth and server-side export are disabled for the static build (preserved under `src/app/_api_disabled/` for restoration in Phase 2). Designs persist to browser `localStorage`.

## Run it locally

```bash
cd stay-studio
npm install
npm run dev
```

Open http://localhost:3000. Type-check only: `npm run typecheck`.

## Deploy to GitHub Pages

Phase 1 ships as a static site on GitHub Pages. No server, no auth yet, designs save to each user's `localStorage`. The `.github/workflows/deploy.yml` workflow builds and deploys automatically on every push to `main`.

### One-time setup

From the `stay-studio/` folder on your machine:

```bash
# 1. Init git if you haven't already
git init -b main
git add .
git commit -m "Stay Studio — initial scaffold"

# 2. Create the repo and push (gh CLI)
gh repo create stay-studio --public --source=. --push
# If you want it private: --private
# If you want it under the Stay Insured org: prefix with the org slug,
#   e.g. "stayinsured/stay-studio" — requires org membership + repo-create rights.

# 3. Enable Pages with GitHub Actions as the source
gh api --method POST -H "Accept: application/vnd.github+json" \
  repos/:owner/stay-studio/pages \
  -f "source[branch]=main" -f "build_type=workflow"
# (If this fails, do it manually: repo > Settings > Pages >
#  Source: "GitHub Actions".)

# 4. Push again to trigger the workflow (or just wait for the one that
#    ran on step 2 to finish).
gh run watch
```

First deploy takes ~2 minutes. The URL will be:

```
https://<your-username>.github.io/stay-studio/
```

The workflow sets `NEXT_PUBLIC_BASE_PATH=/<repo-name>` automatically, so the app works at that subpath without manual config.

### Custom domain (optional, e.g. studio.stayinsured.de)

1. In your DNS, add a CNAME record pointing `studio.stayinsured.de` → `<your-username>.github.io`.
2. Add a file `public/CNAME` containing just `studio.stayinsured.de`.
3. In repo Settings > Secrets and variables > Actions > Variables, create a variable `NEXT_PUBLIC_BASE_PATH` with an empty value (overrides the workflow default).
4. Edit `.github/workflows/deploy.yml` to read the variable: `NEXT_PUBLIC_BASE_PATH: ${{ vars.NEXT_PUBLIC_BASE_PATH }}`.
5. Re-deploy.

### What GitHub Pages can't do (yet)

It's a static host, so:

- No Google SSO — app is public at the Pages URL. If you don't want that, make the repo private and use GitHub's "Private Pages" (available on Enterprise/Team) or migrate to Vercel.
- No server-side PNG export — browser-side `html-to-image` is the only path.
- No shared asset library — each user's uploads and designs live in their own browser's localStorage.

These all come back when we migrate to Vercel in Phase 2. The template components, brand tokens, editor UI, and data model are designed to survive that migration unchanged.

## Project layout

```
stay-studio/
├── public/assets/          Logos, illustrations, photos (copied from the design system)
├── src/
│   ├── app/
│   │   ├── layout.tsx      Root layout — loads Mukta + Arimo fonts
│   │   ├── page.tsx        Redirects to /editor
│   │   ├── editor/         The main editor screen
│   │   ├── admin/          Placeholder — designer-only admin area (Phase 2)
│   │   ├── api/auth/       NextAuth Google SSO (gated by AUTH_ENABLED)
│   │   └── api/export/     Server-side PNG export stub (Phase 2)
│   ├── components/
│   │   ├── editor/         Editor shell, Controls, Preview, TemplateRenderer
│   │   ├── templates/      One file per (format, style) template
│   │   └── ui/             Small shared UI pieces (empty for now)
│   ├── lib/
│   │   ├── brand.ts        Colours, type tokens, logo + illustration helpers
│   │   ├── formats.ts      24-format catalog with safe zones
│   │   ├── templates.ts    Style catalog + (format, style) → component registry
│   │   └── storage.ts      localStorage helpers (to be swapped for API in P2)
│   └── types/index.ts      Shared TS types
├── tailwind.config.ts      Tailwind for admin chrome only
└── next.config.mjs
```

## Formats ready in this scaffold

Eight templates across four formats — enough to dogfood immediately:

| Format | Styles |
|---|---|
| Instagram Post (1080×1350) | Statement · Illustrated · Stats |
| Instagram Square (1080×1080) | Statement · Illustrated · Stats |
| Instagram Story (1080×1920) | Hero · Stacked |
| LinkedIn Post (1200×627) | Split · Bold |
| LinkedIn Banner (1584×396) | Clean |

All 24 formats are listed in the UI but disabled ones show as greyed buttons — add their templates per `docs/adding-a-template.md` (coming soon) or this checklist:

1. Add the render component in `src/components/templates/`.
2. Register it in `src/lib/templates.ts` (TEMPLATE_MAP + STYLES).
3. Flip `status: 'ready'` on the matching format in `src/lib/formats.ts`.

## Brand guardrails enforced structurally

- Fonts are pinned (Mukta 400 headlines, Arimo body).
- Colour picker only shows the approved palette — no freeform hex.
- Logo variant auto-matches the background (charcoal logo on light, white on dark, etc.).
- Ad formats (Stories, Reels) render a red dashed safe-zone overlay when enabled.

## Persistence (today)

Each user's in-progress design auto-saves to `localStorage` under `stay_studio_current_draft`. Named/saved designs go under `stay_studio_designs`. In Phase 2 we swap `src/lib/storage.ts` for an API client hitting `/api/designs/*` backed by Postgres + R2.

## Auth (today)

`AUTH_ENABLED=false` in `.env.example`, so `/api/auth/*` returns 503 until flipped. Flip to `true` after filling in `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env.local`. Sign-in is restricted to the domains in `ALLOWED_EMAIL_DOMAINS` (default `stayinsured.de`).

## Export (today)

Browser-side via `html-to-image` — same engine as the original prototype, reliable for most formats. For high-DPI, font-embedded, or batch export we'll add a Playwright-based server route at `/api/export` in Phase 2.

## Next milestones

**Phase 1 finish (week 4)**
- IG Story safe-zone overlay QA (done in scaffold, needs visual check).
- Photo upload control (planned hook already in `DesignContent.photoUrl`).
- Named campaigns & saved design list UI.

**Phase 2 (weeks 5–8)**
- Google SSO live, Postgres + R2.
- Meta ad formats (5) + safe zones enforced.
- Campaigns feature — group designs, ZIP export.
- Cross-format generation: fill copy once, push to N formats.
- Designer approval workflow for uploads.
- Server-side PNG export via Playwright.

**Phase 3 (weeks 9–14)**
- Google Display + YouTube formats.
- Email + blog hero templates.
- Admin UI: manage users, templates, assets, analytics.
- Version history + audit log.

## Deployment (when ready)

- **App:** Vercel, one Next.js deployment per env (staging + prod).
- **DB:** Supabase or Neon Postgres.
- **Storage:** Cloudflare R2 (S3-compatible).
- **CDN:** Cloudflare in front.
- **Auth:** NextAuth + Google Workspace (internal OAuth consent).

Estimated cost for 5–20 active users: under €50/month across all vendors.

## Design-system anchor

This app reads brand tokens straight from `src/lib/brand.ts`, which mirrors the source of truth in `../colors_and_type.css` and `../README.md` of the parent Stay Design System folder. If brand colours or type change, update one file here and one file in the design system — they should never drift.
