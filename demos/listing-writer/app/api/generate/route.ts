import { NextResponse } from 'next/server';
import { callLLM } from '@/lib/llm';

const VARIANT_PROMPTS = {
  A: 'You write compelling real estate listings. Highlight unique features, evoke lifestyle, end with a clear call to action. Keep the listing ≤200 words. Write in second person ("you"/"your") so the reader imagines themselves in the home.',
  B: 'You write real estate listings in a punchy, magazine-editor voice. Short sentences. Sensory details. Open with a striking one-liner. ≤150 words. End with urgency ("Available for viewing this Saturday").',
  C: 'You write warm, family-focused real estate listings. Lead with the daily-life angle ("Saturday mornings start with coffee on the balcony..."). Mention schools, parks, transit. ≤200 words.',
} as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      propertyType,
      bedrooms,
      bathrooms,
      location,
      features,
      variant = 'A',
    }: {
      propertyType?: string;
      bedrooms?: string | number;
      bathrooms?: string | number;
      location?: string;
      features?: string;
      variant?: keyof typeof VARIANT_PROMPTS;
    } = body;

    if (!propertyType || !location?.trim() || !features?.trim()) {
      return NextResponse.json(
        { error: 'Please provide property type, location, and key features.' },
        { status: 400 }
      );
    }

    const userPrompt = [
      `Property type: ${propertyType}`,
      `Bedrooms: ${bedrooms ?? 'unspecified'}`,
      `Bathrooms: ${bathrooms ?? 'unspecified'}`,
      `Location: ${location}`,
      `Key features: ${features}`,
    ].join('\n');

    const result = await callLLM({
      system: VARIANT_PROMPTS[variant] || VARIANT_PROMPTS.A,
      user: userPrompt,
      maxTokens: 400,
      temperature: variant === 'B' ? 0.95 : variant === 'C' ? 0.8 : 0.7,
    });

    return NextResponse.json({ listing: result.text, variant });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
