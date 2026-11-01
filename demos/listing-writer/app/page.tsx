'use client';

import { useState } from 'react';

const PROPERTY_TYPES = ['Condo', 'House', 'Townhouse', 'Commercial'];

export default function Home() {
  const [propertyType, setPropertyType] = useState('Condo');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState('');
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    if (!location.trim() || !features.trim()) {
      setError('Please fill in the location and key features.');
      return;
    }
    setLoading(true);
    setError('');
    setListing('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType,
          bedrooms,
          bathrooms,
          location,
          features,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setListing(data.listing);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Demo badge */}
      <div className="fixed top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Demo
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-2">
            AI Automation
          </p>
          <h1 className="font-display text-4xl font-bold mb-3">
            Listing Writer
          </h1>
          <p className="text-ink/60 text-lg leading-relaxed">
            Drop in property details, get a polished real-estate listing that
            highlights lifestyle and closes with a CTA.
          </p>
        </header>

        {/* Input form */}
        <div className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="propertyType"
                className="block text-sm font-semibold mb-2"
              >
                Property type
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-semibold mb-2"
                >
                  Beds
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  max="20"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-semibold mb-2"
                >
                  Baths
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  max="20"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-semibold mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Sukhumvit 39, Bangkok"
              disabled={loading}
              className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="features"
              className="block text-sm font-semibold mb-2"
            >
              Key features
            </label>
            <textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="e.g. Fully renovated, high floor, city view, walk to BTS Phrom Phong, pet-friendly building, pool and gym"
              rows={3}
              disabled={loading}
              className="w-full rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
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
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark active:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <span className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </span>
                Generating…
              </>
            ) : (
              'Generate Listing'
            )}
          </button>
        </div>

        {/* Output card */}
        {listing && (
          <div className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-ink/50 uppercase tracking-wide">
                Generated listing
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(listing)}
                className="text-xs font-medium text-accent hover:text-accent-dark transition-colors cursor-pointer"
              >
                Copy
              </button>
            </div>
            <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">
              {listing}
            </p>
            <p className="mt-4 text-xs text-ink/30">
              {listing.split(/\s+/).filter(Boolean).length} words
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-ink/30">
          This is a demo application. No real data is stored.
        </footer>
      </div>
    </main>
  );
}
