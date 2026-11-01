# Loop Zero — AI Automation Agency Portfolio

A single-page, production-ready portfolio for an AI automation agency.
Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. No
external images, no database, no auth — it ships as a static-first site with
a single serverless function for the contact form.

> Everything on this page is placeholder copy written inline. Swap
> `Loop Zero` and the marketing text with your own before going live.

---

## What's inside

- **Hero** — brand, one-line tagline, primary CTA, and a pure-CSS "agent run" visual.
- **What I build** — three service cards (Quick Bot · Workflow System · Retainer).
- **Try the demos** — two demo cards linking to `/demo/review-responder` and `/demo/listing-writer`.
- **Contact** — email-capture form that `POST`s to `/api/contact`.
- **`/api/contact`** — a serverless route that logs submissions to the console and returns `200`.

Design: a calm, professional system — deep blue + warm neutral paper + a single
amber accent. Type is **Fraunces** (display) + **Instrument Sans** (body) +
**JetBrains Mono** (labels/prices), loaded and self-hosted via `next/font`.

## Stack

- Next.js `14.2.x` (App Router)
- React `18`
- Tailwind CSS `3.4`
- TypeScript `5.5`
- Vercel free tier compatible (static + one serverless function)

## Run locally

Requires Node 18.17+ (Node 20+ recommended).

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Open http://localhost:3000.

### Environment

No environment variables are required to run. A `.env.example` is provided as
a placeholder — copy it to `.env.local` if you later add real keys (a real
Calendly URL, an email endpoint, etc.). All `.env*` files are git-ignored.

## Build & start (production)

```bash
npm run build
npm start
```

## The contact form

The form in the **Contact** section `POST`s `{ name?, email, message? }` to
`/api/contact`. The route handler logs the payload to the server console and
responds `200`. To actually deliver leads, point it at a real endpoint — for
example add an email service call in `app/api/contact/route.ts`.

## Replace the placeholders

| Where | What to change |
| --- | --- |
| `components/Nav.tsx`, `components/Hero.tsx`, `components/Footer.tsx` | `Loop Zero` → your brand |
| `components/Hero.tsx` | tagline + CTA copy |
| `components/Hero.tsx`, `components/Contact.tsx` | `https://calendly.com/your-handle/15min` → your real Calendly link |
| `components/Demos.tsx` | `/demo/review-responder`, `/demo/listing-writer` → real demo routes |
| `components/Services.tsx` | pricing + service copy (currently inline) |

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
# 1. install the CLI (one time)
npm i -g vercel

# 2. log in
vercel login

# 3. from this folder, preview, then promote to production
vercel          # first run: confirm the framework preset (Next.js)
vercel --prod
```

Vercel auto-detects Next.js. No extra config is needed for the free tier.

### Option B — Git (recommended for ongoing deploys)

1. Push this folder to a Git remote (GitHub / GitLab / Bitbucket).
2. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel detects the Next.js preset automatically. Click **Deploy**.
   - Build command: `next build` (default)
   - Output directory: `.next` (default)
4. Every push to your main branch now deploys automatically; other branches
   get preview URLs.

### Environment variables (production)

None required. If you later wire the contact form to a real destination, add
the relevant keys in **Project → Settings → Environment Variables**.

### Framework / region

- Framework: **Next.js**
- Region: nearest to your audience (or `auto`)
- No build arguments, no env vars needed for the default deployment.

## Notes

- **Fonts** are fetched and self-hosted by `next/font/google` at build time, so
  the first build needs network access. After that they're cached.
- The demo routes (`/demo/*`) are not part of this package — the cards link to
  them as placeholders.
- Nothing here stores data. The contact form only logs to the console.
