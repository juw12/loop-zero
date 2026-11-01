'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'review-responder:usage';
const FREE_LIMIT = 3;

const EXAMPLES = [
  'The food was okay but the wait was 45 minutes. Staff seemed overwhelmed.',
  'Absolutely loved my purchase! Fast shipping and beautiful packaging.',
  'The product broke after 2 days. Very disappointed with the quality.',
];

interface ReplyResult {
  text: string;
  variant: 'A' | 'B' | 'C';
}

export default function Home() {
  const [review, setReview] = useState('');
  const [results, setResults] = useState<ReplyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [email, setEmail] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) || '0');
    setUsageCount(stored);
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const limitReached = remaining === 0;

  async function handleGenerate() {
    if (limitReached) {
      setShowUpgrade(true);
      return;
    }
    if (!review.trim()) {
      setError('Please paste a review to generate replies.');
      return;
    }
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const variants = await Promise.all(
        (['A', 'B', 'C'] as const).map(async (variant) => {
          const res = await fetch('/api/respond', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ review, variant }),
          });
          if (!res.ok) throw new Error((await res.json()).error || 'Failed');
          const data = await res.json();
          return { text: data.reply, variant } as ReplyResult;
        })
      );
      setResults(variants);
      const next = usageCount + 1;
      localStorage.setItem(STORAGE_KEY, String(next));
      setUsageCount(next);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    alert(`Thanks — we'll email ${email} when the paid tier is live.`);
    setEmail('');
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Demo badge */}
      <div className="fixed top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Demo
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-10">
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2">
            AI for restaurants, e-commerce, and service businesses
          </p>
          <h1 className="font-display text-5xl font-bold mb-3 leading-tight">
            Replies that earn back the customer.
          </h1>
          <p className="text-ink/60 text-lg leading-relaxed max-w-xl">
            Paste any review. Get three polished replies in distinct tones — pick
            the one that fits your brand, hit send.
          </p>
        </header>

        {/* Usage meter */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-white border border-ink/5 px-4 py-3 text-sm">
          <span className="text-ink/60">
            {remaining > 0 ? (
              <>
                <strong className="text-ink">{remaining}</strong> free{' '}
                {remaining === 1 ? 'reply' : 'replies'} remaining this month
              </>
            ) : (
              <>
                <strong className="text-ink">Free tier used</strong> — upgrade
                for unlimited
              </>
            )}
          </span>
          {limitReached && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="text-accent font-medium hover:text-accent-dark cursor-pointer"
            >
              Upgrade →
            </button>
          )}
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 mb-6">
          <label htmlFor="review" className="block text-sm font-semibold mb-2">
            Customer review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Paste the review here…"
            rows={4}
            disabled={loading}
            className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
          />

          {/* Example chips */}
          {review === '' && !loading && (
            <div className="flex flex-wrap gap-2 mt-3">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setReview(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border border-ink/10 text-ink/50 hover:text-accent hover:border-accent/30 transition-colors cursor-pointer"
                >
                  Try: {ex.slice(0, 38)}…
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark active:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                Generating 3 variations…
              </>
            ) : limitReached ? (
              'Upgrade to generate more →'
            ) : (
              'Generate 3 replies'
            )}
          </button>
        </div>

        {/* Output */}
        {results.length > 0 && (
          <div className="space-y-4 mb-6">
            {results.map((r) => (
              <div key={r.variant} className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 animate-fade-in-up">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-bold">
                      {r.variant}
                    </span>
                    <h2 className="text-sm font-semibold text-ink/50 uppercase tracking-wide">
                      {r.variant === 'A' ? 'Professional' : r.variant === 'B' ? 'Warm & empathetic' : 'Short & direct'}
                    </h2>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(r.text)}
                    className="text-xs font-medium text-accent hover:text-accent-dark transition-colors cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">{r.text}</p>
                <p className="mt-4 text-xs text-ink/30">
                  {r.text.split(/\s+/).filter(Boolean).length} words
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade modal */}
        {showUpgrade && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4"
            onClick={() => setShowUpgrade(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-lift max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-2xl font-bold mb-2">
                You've used your 3 free replies.
              </h3>
              <p className="text-ink/60 mb-6 leading-relaxed">
                Drop your email and we'll let you know when paid tiers launch.
                Early-access teams get lifetime pricing.
              </p>
              <form onSubmit={handleUpgrade} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-accent text-white font-semibold py-3 hover:bg-accent-dark transition-colors cursor-pointer"
                >
                  Notify me at launch
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpgrade(false)}
                  className="w-full text-sm text-ink/50 hover:text-ink cursor-pointer"
                >
                  Maybe later
                </button>
              </form>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-ink/5 text-center text-xs text-ink/40">
          Built for SMBs with public reviews · Powered by your own API key · No data stored
        </footer>
      </div>
    </main>
  );
}
