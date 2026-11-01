"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setMessage(data.message || "You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-6 py-4 text-sm text-ink">
        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@agency.co.th"
        disabled={status === "loading"}
        className="flex-1 px-4 py-3 rounded-xl border border-hairline-light bg-white text-sm placeholder:text-mist-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl bg-ink text-paper font-medium hover:bg-navy-700 active:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? "Joining…" : "Join waitlist"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 mt-2 w-full text-left">{message}</p>
      )}
    </form>
  );
}
