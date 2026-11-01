"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-t border-hairline-light bg-cream/40"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-6">
            Tell me what&apos;s eating your team&apos;s day.
          </h2>
          <p className="text-lg text-mist-light leading-relaxed">
            Send a quick note. I&apos;ll reply within a business day with whether
            it&apos;s a fit and what a first Quick Bot would look like.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white rounded-2xl p-8 border border-hairline-light shadow-card"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-[11px] uppercase tracking-widest text-mist-light mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-hairline-light bg-paper/40 px-4 py-3 placeholder:text-mist-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[11px] uppercase tracking-widest text-mist-light mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-hairline-light bg-paper/40 px-4 py-3 placeholder:text-mist-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block font-mono text-[11px] uppercase tracking-widest text-mist-light mb-2"
            >
              What task is eating your day?
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="e.g. We copy every LINE inquiry into a Google Sheet by hand, twice a day."
              className="w-full rounded-lg border border-hairline-light bg-paper/40 px-4 py-3 placeholder:text-mist-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
            />
          </div>

          {status === "success" && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-accent-soft border border-accent/30 px-4 py-3 text-sm text-ink">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-accent"
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
              Thanks. I&apos;ll reply within a business day.
            </div>
          )}

          {status === "error" && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Something went wrong. Try again, or email me directly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-ink text-paper font-medium hover:bg-navy-700 active:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
