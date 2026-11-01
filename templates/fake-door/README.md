# Fake Door Template

A single-page Next.js landing page for testing niche demand before building a real product. Visitors land, read your value prop, and drop their email if they're interested. You read `leads.json` to gauge interest.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## How to Customize for a New Niche

### 1. Edit `content.ts`

This is the **only file you need to change** for a new niche. All copy lives here:

```ts
// content.ts
export const content = {
  headline: "Your bold one-liner",
  subhead: "Explain the problem and your solution in 1-2 sentences.",
  features: [
    "Benefit 1 (specific, outcome-focused)",
    "Benefit 2",
    "Benefit 3",
  ],
  ctaText: "Get early access",
  secondaryCta: "No spam. Unsubscribe anytime.",
  footerNote: "We're in private beta — leave your email and we'll be in touch.",
} as const;
```

**Writing tips:**
- Headline: state the outcome, not the feature. "Book your next property" > "AI-powered property search"
- Features: 3 max. Each should be a concrete benefit, not a capability
- CTA: "early access" / "join the waitlist" / "notify me at launch" — implies scarcity + exclusivity
- Keep total word count under 100. People skim, not read

See `examples/` for 3 filled-in variations (real estate, restaurant, clinic).

### 2. Swap the Brand Color

Edit `app/globals.css`:

```css
:root {
  --brand: #e8a838;       /* Your accent color */
  --brand-dim: #e8a83840; /* Same color at 25% opacity */
}
```

Change the hex value and its 4-hex-digit alpha companion. That's it — the entire page re-themes.

**Color suggestions by niche:**
| Niche | Color | Hex |
|-------|-------|-----|
| Real estate | Forest green | `#2d6a4f` |
| Restaurant | Terracotta | `#dc4c3f` |
| Health/clinic | Medical blue | `#4a90d9` |
| Finance | Deep gold | `#c9a227` |
| Tech/SaaS | Electric violet | `#7c3aed` |
| Fitness | Hot coral | `#ff6b6b` |

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) and it auto-deploys on push.

**Note on `leads.json`:** Vercel's filesystem is ephemeral — files written during runtime won't persist between deploys. For production lead capture, connect a database (e.g., Supabase, Neon) or a third-party form service (e.g., Formspree, Basin). The template is designed so you only need to swap the `POST /api/lead` handler.

## Reading `leads.json`

Each email signup appends one JSON line to `leads.json` in the project root:

```json
{"email":"jane@example.com","timestamp":"2025-01-15T10:23:45.000Z","source":"https://linkedin.com/..."}
{"email":"bob@example.com","timestamp":"2025-01-15T11:01:12.000Z","source":"direct"}
```

**Fields:**
- `email` — the submitted email
- `timestamp` — ISO 8601 UTC
- `source` — the `Referer` header (where they came from: LinkedIn, Facebook, direct, etc.)

**Quick analysis (PowerShell):**
```powershell
# Count total leads
(Get-Content leads.json | Measure-Object).Count

# See source breakdown
Get-Content leads.json | ForEach-Object { ($_ | ConvertFrom-Json).source } | Group-Object | Sort-Object Count -Descending
```

## Project Structure

```
fake-door/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # The landing page
│   ├── globals.css         # Design tokens, brand color, animations
│   └── api/
│       └── lead/
│           └── route.ts    # POST handler → console + leads.json
├── components/
│   └── LeadForm.tsx        # Client-side email form
├── content.ts              # ← YOUR SWIPE FILE (edit this)
├── examples/
│   ├── real-estate.md
│   ├── restaurant.md
│   └── clinic.md
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Google Fonts**: Fraunces (display) + Outfit (body)
- Zero runtime dependencies beyond React/Next

## Testing Checklist

Before sharing your link:

- [ ] `npm run build` passes with no errors
- [ ] Headline reads well at a glance (test on mobile)
- [ ] Email form submits and you see `[LEAD]` in the terminal
- [ ] `leads.json` has a new line after submission
- [ ] Page loads in < 2s on 4G (Lighthouse > 90)
- [ ] Mobile: no horizontal scroll, form is usable with thumbs
- [ ] The "private beta" message is present in the footer

## Going Further

- **A/B test headlines**: Clone the repo, change only `headline`, deploy both, compare leads
- **UTM tracking**: Append `?utm_source=linkedin` to your share links, then check `source` in leads
- **DM tracking**: Manually log DMs in a spreadsheet alongside email signups
- **Kill threshold**: If < 5% of visitors submit email after 500+ impressions, the niche may not have demand
