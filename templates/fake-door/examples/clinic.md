# Fake Door Example: Telehealth / Clinic Scheduling

## content.ts

```ts
export const content = {
  headline: "See a doctor in under 24 hours",
  subhead:
    "We're building a way to book same-day appointments with vetted specialists — no insurance maze, no 3-week waits, no surprise bills.",
  features: [
    "Verified specialists in 40+ specialties",
    "Same-day & next-day availability",
    "Transparent pricing before you book",
  ],
  ctaText: "Notify me at launch",
  secondaryCta: "No account needed. We'll email you when we're live in your area.",
  footerNote:
    "We're in private beta — leave your email and we'll be in touch.",
} as const;
```

## Brand Color

```css
--brand: #4a90d9; /* Calm medical blue — clean, trustworthy, clinical */
--brand-dim: #4a90d940;
```

## Rationale

- **Headline**: Time-specific promise ("under 24 hours") creates immediate value
- **Features**: Addresses the 3 biggest pain points (trust, speed, cost)
- **CTA**: "Notify me" is low-commitment — important for skeptical health audience
- **Color**: Blue is the default trust color in healthcare; specific shade avoids "corporate" feel
- **Tone**: Reassuring, factual, slightly warm — not corporate or clinical
