# Fake Door Example: Restaurant Reservation Platform

## content.ts

```ts
export const content = {
  headline: "Skip the phone tag. Get your table.",
  subhead:
    "We're building the easiest way to reserve at your favorite restaurants — real-time availability, group bookings, and zero hold music.",
  features: [
    "Live availability, no callbacks",
    "Book for groups up to 20",
    "Automatic reminders & waitlist joining",
  ],
  ctaText: "Join the waitlist",
  secondaryCta: "Free for diners. We'll never sell your data.",
  footerNote:
    "We're in private beta — leave your email and we'll be in touch.",
} as const;
```

## Brand Color

```css
--brand: #dc4c3f; /* Warm terracotta — appetite, warmth, food */
--brand-dim: #dc4c3f40;
```

## Rationale

- **Headline**: Punchy, speaks directly to a universal pain (phone tag)
- **Features**: Specific numbers ("up to 20") add credibility
- **CTA**: "Waitlist" implies scarcity without being fake
- **Color**: Terracotta evokes warmth, food, appetite without being garish
- **Tone**: Conversational, slightly irreverent — matches food culture
