# Loop Zero — SaaS Landing Page

The product surface for the AI automation agency. Single-page landing with Stripe Checkout and waitlist capture. Lives separately from the agency portfolio so you can iterate on the product without touching marketing copy.

## What's here

- **Landing page** (`/`) — hero, three feature cards, three pricing tiers, waitlist form
- **`/api/waitlist`** — POST endpoint that captures emails, logs to console, optionally writes to `WAITLIST_FILE`
- **`/api/checkout`** — POST endpoint that creates a Stripe Checkout session and redirects to Stripe
- **`/api/webhook`** — POST endpoint for Stripe webhook events (`checkout.session.completed`, `customer.subscription.deleted`)

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Stripe SDK (`stripe` npm package) — server-side only
- System fonts (no external font dependencies)

## Local development

```bash
npm install
cp .env.example .env.local
# edit .env.local — see "Stripe setup" below
npm run dev
```

Open http://localhost:3000

## Stripe setup (one-time)

1. Create a Stripe account at https://dashboard.stripe.com
2. Get your secret key: **Developers → API keys → Secret key** → copy into `STRIPE_SECRET_KEY`
3. Create two products in **Products**:
   - **Professional** — recurring, ฿990/month and ฿9,900/year (or your prices)
   - **Team** — recurring, ฿2,490/month and ฿24,900/year
4. Copy each Price ID (`price_...`) into the matching `STRIPE_PRICE_*` env var
5. Set up the webhook:
   - **Developers → Webhooks → Add endpoint**
   - URL: `https://your-domain.com/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`
6. For local testing, use the Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   That prints a `whsec_...` value — use it for `STRIPE_WEBHOOK_SECRET` locally.

## Free vs paid

- **Free tier**: handled client-side via `localStorage` in the demo apps (`/demos/listing-writer`, `/demos/review-responder`). The 3-free-per-month gate is a UX nudge, not an enforcement. Real enforcement needs server-side tracking per user (out of scope for v1).
- **Paid tier**: enforced via Stripe webhook. When `checkout.session.completed` fires, append the customer email to `subscribers.json` (or your own DB). On every page load, check the email against that file.

## Deploying

Standard Next.js. Deploy to Vercel:

```bash
cd ..
.\scripts\deploy-all.ps1 -Only saas
```

Then in Vercel project settings, add:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PROFESSIONAL_MONTHLY`
- `STRIPE_PRICE_PROFESSIONAL_ANNUAL`
- `STRIPE_PRICE_TEAM_MONTHLY`
- `STRIPE_PRICE_TEAM_ANNUAL`
- `NEXT_PUBLIC_SITE_URL` (your production domain)

## When Stripe isn't configured yet

The `/api/checkout` route returns a 503 with a clear message instead of breaking. The pricing buttons still appear; they just won't redirect to Stripe until keys are set. Perfect for staging without leaking the keys.
