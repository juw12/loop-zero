# Fake Door Example: Real Estate

## content.ts

```ts
export const content = {
  headline: "Book your next property without the hassle",
  subhead:
    "We're building a platform that finds, compares, and schedules your property viewings in one place. No more juggling 12 different listing sites.",
  features: [
    "Curated listings matched to your criteria",
    "One-tap viewing scheduling",
    "Instant price-drop alerts",
  ],
  ctaText: "Get early access",
  secondaryCta: "No spam. Unsubscribe anytime.",
  footerNote:
    "We're in private beta — leave your email and we'll be in touch.",
} as const;
```

## Brand Color

```css
--brand: #2d6a4f; /* Deep forest green — trust + nature */
--brand-dim: #2d6a4f40;
```

## Rationale

- **Headline**: Speaks to the pain point (too many platforms, friction)
- **Features**: Concrete outcomes, not features
- **CTA**: "Early access" frames it as exclusive, not "sign up"
- **Color**: Green signals trust, nature, and calm — fits real estate buyers
- **Tone**: Helpful, efficient, slightly premium
