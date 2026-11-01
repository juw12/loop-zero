const SERVICES = [
  {
    name: "Quick Bot",
    price: "$500",
    cadence: "one-time",
    summary: "One specific task, automated in days.",
    bullets: [
      "Pick a single task eating 30+ minutes a day",
      "Build on your existing stack (LINE, WhatsApp, Sheets, CRM)",
      "2-hour scoping call, 3–5 day build",
      "7-day support window plus a 1-page setup doc",
    ],
    best: "When you know exactly which task to automate first.",
    featured: false,
  },
  {
    name: "Workflow System",
    price: "$2,000",
    cadence: "one-time",
    summary: "Up to 3 connected automations, end-to-end.",
    bullets: [
      "Lead capture → qualification → CRM → follow-up, or similar",
      "Integrates up to 5 tools across your stack",
      "2–3 weeks from discovery to live",
      "14-day support plus a free 30-day re-tune",
    ],
    best: "When work falls between people and tools, and you can see the leak.",
    featured: true,
  },
  {
    name: "Retainer",
    price: "$500",
    cadence: "/ month",
    summary: "Ongoing builds, fixes, and tune-ups.",
    bullets: [
      "Up to 2 new automations or fixes per month",
      "Priority WhatsApp support, 4-hour response",
      "Monthly 30-min check-in (recorded)",
      "10% off any out-of-scope project",
    ],
    best: "When you already have one automation live and want to keep adding.",
    featured: false,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 border-t border-hairline-light"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            What I build
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
            Three ways to start.
          </h2>
          <p className="text-lg text-mist-light leading-relaxed">
            Pick the entry point that matches where you are. Most clients start
            with a Quick Bot, then add a Retainer once the first one is live.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className={`relative rounded-2xl p-8 border transition-shadow ${
                s.featured
                  ? "bg-ink text-paper border-ink shadow-lift"
                  : "bg-white text-ink border-hairline-light hover:shadow-card"
              }`}
            >
              {s.featured && (
                <span className="absolute -top-3 left-8 font-mono text-[10px] uppercase tracking-widest bg-accent text-ink px-2 py-1 rounded">
                  Most picked
                </span>
              )}
              <h3 className="font-display text-2xl font-medium mb-2">
                {s.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display text-3xl font-medium">
                  {s.price}
                </span>
                <span
                  className={`font-mono text-xs ${
                    s.featured ? "text-paper/60" : "text-mist-light"
                  }`}
                >
                  {s.cadence}
                </span>
              </div>
              <p
                className={`text-base mb-6 leading-relaxed ${
                  s.featured ? "text-paper/80" : "text-mist-light"
                }`}
              >
                {s.summary}
              </p>
              <ul className="space-y-2 mb-6">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        s.featured ? "text-accent-bright" : "text-accent"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span
                      className={s.featured ? "text-paper/90" : "text-ink/80"}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className={`text-xs italic ${
                  s.featured ? "text-paper/60" : "text-mist-light"
                }`}
              >
                Best: {s.best}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
