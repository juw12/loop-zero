import { content } from "@/content";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background accent glow */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 max-w-3xl mx-auto text-center">
        {/* Beta badge */}
        <span
          className="animate-fade-up anim-delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-8 border"
          style={{
            borderColor: "var(--brand-dim)",
            color: "var(--brand)",
            background: "var(--brand-dim)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)" }} />
          Private Beta
        </span>

        {/* Headline */}
        <h1
          className="animate-fade-up anim-delay-2 font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6"
          style={{ textWrap: "balance" }}
        >
          {content.headline}
        </h1>

        {/* Subhead */}
        <p
          className="animate-fade-up anim-delay-3 text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ textWrap: "balance" }}
        >
          {content.subhead}
        </p>

        {/* Feature bullets */}
        <ul className="animate-fade-up anim-delay-4 flex flex-col sm:flex-row gap-3 sm:gap-6 mb-12">
          {content.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <svg
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--brand)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Email capture form */}
        <div className="animate-fade-up anim-delay-5 w-full max-w-md">
          <LeadForm ctaText={content.ctaText} />
        </div>

        {/* Secondary CTA link */}
        {content.secondaryCta && (
          <p className="animate-fade-up anim-delay-5 mt-4 text-sm text-white/40">
            {content.secondaryCta}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="relative py-8 text-center">
        <p className="animate-fade-in anim-delay-6 text-xs text-white/30 px-6 max-w-md mx-auto">
          {content.footerNote}
        </p>
      </footer>
    </main>
  );
}
