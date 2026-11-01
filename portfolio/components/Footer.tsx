export default function Footer() {
  return (
    <footer className="py-12 border-t border-hairline-light bg-ink text-paper">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-medium mb-1">
              {"Loop Zero"}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              AI Automation · Bangkok / ASEAN
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <a
              href="https://calendly.com/your-handle/15min"
              className="text-paper/80 hover:text-paper transition-colors"
            >
              Book a call
            </a>
            <a
              href="#demos"
              className="text-paper/80 hover:text-paper transition-colors"
            >
              Try a demo
            </a>
            <a
              href="#contact"
              className="text-paper/80 hover:text-paper transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-paper/40">
          Built in Bangkok · No enterprise theater · Replies within a business day
        </p>
      </div>
    </footer>
  );
}
