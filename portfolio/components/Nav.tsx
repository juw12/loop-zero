import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 border-b border-hairline-light">
      <div className="max-w-page mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-medium text-ink tracking-tight"
        >
          {"Loop Zero"}
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-mist-light">
          <a href="#services" className="hover:text-ink transition-colors">
            What I build
          </a>
          <a href="#demos" className="hover:text-ink transition-colors">
            Try a demo
          </a>
          <a href="#contact" className="hover:text-ink transition-colors">
            Contact
          </a>
        </nav>
        <a
          href="https://calendly.com/your-handle/15min"
          className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-lg bg-ink text-paper hover:bg-navy-700 transition-colors"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
