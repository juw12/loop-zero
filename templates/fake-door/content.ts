export const content = {
  /** Main headline — keep it short and benefit-driven */
  headline: "Book your next property without the hassle",

  /** Supporting paragraph below the headline */
  subhead:
    "We're building a platform that finds, compares, and schedules your property viewings in one place. No more juggling 12 different listing sites.",

  /** Exactly 3 feature bullets (short, punchy) */
  features: [
    "Curated listings matched to your criteria",
    "One-tap viewing scheduling",
    "Instant price-drop alerts",
  ],

  /** Primary CTA button text */
  ctaText: "Get early access",

  /** Optional secondary text below the form */
  secondaryCta: "No spam. Unsubscribe anytime.",

  /** Footer / fake-door message */
  footerNote:
    "We're in private beta — leave your email and we'll be in touch.",
} as const;

export type Content = typeof content;
