export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Decorative grid wash */}
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-50 pointer-events-none" />

      <div className="relative max-w-page mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
            AI Automation · Bangkok / ASEAN
          </p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-ink mb-8">
            Repetitive work, automated out.
          </h1>

          <p className="text-lg sm:text-xl text-mist-light leading-relaxed max-w-2xl mb-10">
            We find the loops in your business — the email you send 40 times a week,
            the report you rebuild every Monday, the inquiry you copy into three
            systems — and build the bots that close them.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://calendly.com/your-handle/15min"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper font-medium hover:bg-navy-700 transition-colors"
            >
              Book a 15-min call
              <svg
                className="w-4 h-4"
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
            </a>
            <a
              href="#demos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-hairline-light text-ink hover:border-ink transition-colors"
            >
              Try a live demo
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-12 font-mono text-xs uppercase tracking-widest text-mist-light">
            Built for small businesses running on talent but bleeding time on admin
          </p>
        </div>
      </div>
    </section>
  );
}
