# Handoff — SaaS Landing Page

The product surface for the AI automation agency. Single-page landing with Lemon Squeezy Checkout and waitlist capture. Lives separately from the agency portfolio so you can iterate on the product without touching marketing copy.

## Why Lemon Squeezy (not Stripe)

If you signed up from Thailand or most of Asia-Pacific, you were redirected to Lemon Squeezy — that's the regional routing for sellers without a US-registered business entity. Lemon Squeezy is the right choice here: handles international tax/VAT automatically, no merchant account needed, simpler integration than Stripe, supports subscriptions + webhooks + checkout URLs out of the box.

## What's here

- **Landing page** (`/`) — hero, three feature cards, three pricing tiers, waitlist form
- **`/api/waitlist`** — POST endpoint that captures emails, logs to console, optionally writes to `WAITLIST_FILE`
- **`/api/checkout`** — POST endpoint that creates a Lemon Squeezy Checkout and redirects
- **`/api/webhook`** — POST endpoint for Lemon Squeezy webhook events (HMAC-SHA256 verified)

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Native `fetch` to Lemon Squeezy REST API (no SDK dependency)
- System fonts (no external font dependencies)

## Local development

```bash
npm install
cp .env.example .env.local
# edit .env.local — see "Lemon Squeezy setup" below
npm run dev
```

Open http://localhost:3000

## Lemon Squeezy setup (one-time)

1. Create a store at https://app.lemonsqueezy.com (you've likely done this if you're reading this)
2. Get an API key: https://app.lemonsqueezy.com/settings/api → click "Create API key" → copy the token into `LEMONSQUEEZY_API_KEY`
3. Get your Store ID: Look at your store URL — it's `app.lemonsqueezy.com/store/{STORE_ID}`. Copy the number into `LEMONSQUEEZY_STORE_ID`
4. Create two products in **Products → New Product**:
   - **Professional** — ฿990/month and ฿9,900/year variants
   - **Team** — ฿2,490/month and ฿24,900/year variants
   For each, copy the **Variant ID** (shown in the variant's URL) into the matching `LEMONSQUEEZY_VARIANT_*` env var
5. Set up the webhook:
   - https://app.lemonsqueezy.com/settings/webhooks → "Create webhook"
   - URL: `https://your-domain.com/api/webhook`
   - Events: `order_created`, `subscription_created`, `subscription_updated`, `subscription_cancelled`
   - Copy the signing secret into `LEMONSQUEEZY_WEBHOOK_SECRET`
6. For local testing, use a tunneling service (ngrok, cloudflare tunnel) so Lemon Squeezy can reach your localhost.

## Free vs paid

- **Free tier**: handled client-side via `localStorage` in the demo apps. The 3-free-per-month gate is a UX nudge, not enforcement.
- **Paid tier**: enforced via Lemon Squeezy webhook. When `subscription_created` fires, append the customer email to `subscribers.json` (or your own DB).

## Deploying

Standard Next.js. Deploy to Vercel:

```powershell
cd ..
.\scripts\deploy-all.ps1 -Only saas
```

Then in the Vercel project settings, add:
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `LEMONSQUEEZY_STORE_ID`
- `LEMONSQUEEZY_VARIANT_PRO_MONTHLY`
- `LEMONSQUEEZY_VARIANT_PRO_ANNUAL`
- `LEMONSQUEEZY_VARIANT_TEAM_MONTHLY`
- `LEMONSQUEEZY_VARIANT_TEAM_ANNUAL`
- `NEXT_PUBLIC_SITE_URL` (your production domain)

## When Lemon Squeezy isn't configured yet

The `/api/checkout` route returns a 503 with a clear message instead of breaking. The pricing buttons still appear; they just won't redirect until keys are set. Perfect for staging.
