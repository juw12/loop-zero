import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

const FEATURES = [
  {
    title: "AI Listing Writer",
    blurb:
      "Three distinct listing descriptions in 10 seconds. Different tones for different buyers — pick the one that closes.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    accent: "bg-accent/10 text-accent",
  },
  {
    title: "AI Review Responder",
    blurb:
      "Paste any review. Get three replies in distinct tones — professional, warm, or short. Copy, send, move on.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    accent: "bg-navy-700/10 text-navy-700",
  },
  {
    title: "Lead Qualifier",
    blurb:
      "Coming soon — auto-score inquiries from LINE and Facebook against your ideal buyer profile. Reply to the right ones first.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    accent: "bg-accent-bright/15 text-accent",
  },
];

const TIERS = [
  {
    name: "Free",
    price: "฿0",
    cadence: "forever",
    blurb: "Try every tool. Limited monthly usage.",
    cta: { label: "Start free", href: "/demo/listing-writer", style: "outline" },
    features: [
      "3 listing generations / month",
      "3 review replies / month",
      "All 3 variants per generation",
      "Web app access",
      "No signup required",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: "฿990",
    cadence: "/ month",
    blurb: "For active agents shipping 5+ listings a month.",
    cta: { label: "Upgrade", tier: "professional", style: "primary" },
    features: [
      "Unlimited listing generations",
      "Unlimited review replies",
      "3 variants per generation",
      "Thai + English output",
      "Email support",
      "Export to MLS / DDProperty format",
    ],
    featured: true,
  },
  {
    name: "Team",
    price: "฿2,490",
    cadence: "/ month",
    blurb: "For agencies with 3+ agents.",
    cta: { label: "Upgrade", tier: "team", style: "outline" },
    features: [
      "Everything in Professional",
      "Up to 5 seats",
      "Shared brand voice settings",
      "Priority WhatsApp support",
      "Custom prompt tuning",
      "Quarterly review session",
    ],
    featured: false,
  },
];

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 border-b border-hairline-light">
        <div className="max-w-page mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-medium text-ink tracking-tight">
            Loop Zero
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-mist-light">
            <a href="#features" className="hover:text-ink transition-colors">Features</a>
            <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
            <a href="mailto:hello@loopzero.co" className="hover:text-ink transition-colors">Contact</a>
          </nav>
          <a
            href="#waitlist"
            className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-lg bg-ink text-paper hover:bg-navy-700 transition-colors"
          >
            Join waitlist
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="relative max-w-page mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              AI for Bangkok real estate agents
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-ink mb-8">
              Stop typing. Start closing.
            </h1>
            <p className="text-lg sm:text-xl text-mist-light leading-relaxed max-w-2xl mb-10">
              Three AI tools built for the daily work of Bangkok real estate
              agents. Listings that sell. Replies that earn back customers.
              Qualified leads you actually want to call back.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper font-medium hover:bg-navy-700 transition-colors"
              >
                Start free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-hairline-light text-ink hover:border-ink transition-colors"
              >
                See the tools
              </a>
            </div>
            <p className="mt-10 font-mono text-xs uppercase tracking-widest text-mist-light">
              Free tier forever · No credit card · Powered by your own API key (BYOK)
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 sm:py-32 border-t border-hairline-light">
        <div className="max-w-page mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              Three tools
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
              The work that eats your day, automated out.
            </h2>
            <p className="text-lg text-mist-light leading-relaxed">
              Each tool replaces a specific repetitive task with one that takes
              under 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-hairline-light shadow-card hover:shadow-lift transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${f.accent} flex items-center justify-center mb-5`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium text-ink mb-3">
                  {f.title}
                </h3>
                <p className="text-mist-light leading-relaxed">{f.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 sm:py-32 border-t border-hairline-light bg-cream/40">
        <div className="max-w-page mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              Pricing
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
              Pay only when it pays for itself.
            </h2>
            <p className="text-lg text-mist-light leading-relaxed">
              The Professional plan pays for itself if it saves you one deal per
              quarter. The Team plan pays for itself if it saves one per month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((t) => (
              <PricingCard key={t.name} tier={t} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-mist-light">
            All plans in Thai baht · Annual billing saves 2 months · Cancel anytime · 7-day refund
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-24 sm:py-32 border-t border-hairline-light">
        <div className="max-w-page mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              Early access
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
              Lifetime pricing for the first 50 agents.
            </h2>
            <p className="text-lg text-mist-light leading-relaxed mb-10">
              We&apos;re onboarding Bangkok agents one team at a time. Drop your
              email and we&apos;ll send you a setup call link within a week.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-hairline-light bg-ink text-paper">
        <div className="max-w-page mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl font-medium mb-1">Loop Zero</p>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                AI tools for Bangkok real estate agents
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <a href="#features" className="text-paper/80 hover:text-paper">Features</a>
              <a href="#pricing" className="text-paper/80 hover:text-paper">Pricing</a>
              <a href="mailto:hello@loopzero.co" className="text-paper/80 hover:text-paper">Contact</a>
            </div>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
            Built in Bangkok · Powered by your own API key · No data stored on our servers
          </p>
        </div>
      </footer>
    </>
  );
}

function PricingCard({ tier }: { tier: typeof TIERS[number] }) {
  const isPrimary = tier.cta.style === "primary";
  const buttonClass = isPrimary
    ? "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-bright transition-colors"
    : "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-hairline-light text-ink hover:border-ink transition-colors";

  return (
    <div
      className={`relative rounded-2xl p-8 border ${
        tier.featured
          ? "bg-ink text-paper border-ink shadow-lift"
          : "bg-white text-ink border-hairline-light"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-8 font-mono text-[10px] uppercase tracking-widest bg-accent text-ink px-2 py-1 rounded">
          Most picked
        </span>
      )}
      <h3 className="font-display text-2xl font-medium mb-2">{tier.name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-display text-4xl font-medium">{tier.price}</span>
        <span className={`font-mono text-xs ${tier.featured ? "text-paper/60" : "text-mist-light"}`}>
          {tier.cadence}
        </span>
      </div>
      <p className={`text-base mb-6 leading-relaxed ${tier.featured ? "text-paper/80" : "text-mist-light"}`}>
        {tier.blurb}
      </p>
      <ul className="space-y-2 mb-8">
        {tier.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg
              className={`w-4 h-4 mt-0.5 shrink-0 ${tier.featured ? "text-accent-bright" : "text-accent"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className={tier.featured ? "text-paper/90" : "text-ink/80"}>{feat}</span>
          </li>
        ))}
      </ul>
      {tier.cta.href ? (
        <a href={tier.cta.href} className={buttonClass}>
          {tier.cta.label}
        </a>
      ) : (
        <CheckoutButton tier={tier.cta.tier!} featured={tier.featured} className={buttonClass}>
          {tier.cta.label}
        </CheckoutButton>
      )}
    </div>
  );
}

function CheckoutButton({
  tier,
  featured,
  className,
  children,
}: {
  tier: string;
  featured: boolean;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <form action="/api/checkout" method="POST">
      <input type="hidden" name="tier" value={tier} />
      <input type="hidden" name="cadence" value="monthly" />
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
