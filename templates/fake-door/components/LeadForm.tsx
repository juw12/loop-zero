"use client";

import { useState } from "react";

export default function LeadForm({ ctaText }: { ctaText: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="animate-fade-in flex items-center justify-center gap-2 px-6 py-4 rounded-xl border text-sm"
        style={{ borderColor: "var(--brand-dim)", color: "var(--brand)", background: "var(--brand-dim)" }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        You&apos;re on the list. We&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--brand-dim)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "var(--brand)",
          color: "#0f0e0d",
        }}
      >
        {status === "loading" ? "Joining…" : ctaText}
      </button>
    </form>
  );
}
