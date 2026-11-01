const DEMOS = [
  {
    title: "AI Review Responder",
    blurb:
      "Paste a customer review, get a professional reply in seconds. Negative or positive, the bot handles the tone.",
    href: "/demo/review-responder",
    accent: "For restaurants, e-commerce, any business with public reviews.",
  },
  {
    title: "AI Listing Writer",
    blurb:
      "Drop in property details, get a compelling real-estate listing that highlights lifestyle and closes with a CTA.",
    href: "/demo/listing-writer",
    accent: "For independent real-estate agents and property managers.",
  },
];

export default function Demos() {
  return (
    <section
      id="demos"
      className="py-24 sm:py-32 border-t border-hairline-light"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Try a demo
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
            See it work in 30 seconds.
          </h2>
          <p className="text-lg text-mist-light leading-relaxed">
            Two live demos. Click in, paste your real example, watch the output.
            No signup, no email gate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {DEMOS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="group block rounded-2xl p-8 bg-white border border-hairline-light hover:border-ink hover:shadow-lift transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-2xl font-medium text-ink">
                  {d.title}
                </h3>
                <svg
                  className="w-5 h-5 text-mist-light group-hover:text-ink group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
              <p className="text-base text-mist-light leading-relaxed mb-4">
                {d.blurb}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {d.accent}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
