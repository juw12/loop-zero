import { NextResponse } from 'next/server';
import { callLLM } from '@/lib/llm';

const VARIANT_PROMPTS = {
  A: 'You write professional, empathetic replies to customer reviews. Acknowledge the issue, apologize sincerely if negative, mention a concrete fix, invite them back. Keep reply ≤80 words.',
  B: 'You write warm, human replies to customer reviews. Lead with a specific detail from what the customer said ("the 45-minute wait", "the broken product"). Apologize sincerely if negative. Be conversational, not corporate. ≤80 words.',
  C: 'You write short, direct replies to customer reviews. Three sentences max. No fluff. Apologize if negative, thank them if positive, offer a clear next step. ≤50 words.',
} as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      review,
      variant = 'A',
    }: {
      review?: string;
      variant?: keyof typeof VARIANT_PROMPTS;
    } = body;

    if (!review?.trim()) {
      return NextResponse.json(
        { error: 'Please provide a review to respond to.' },
        { status: 400 }
      );
    }

    if (review.length > 2000) {
      return NextResponse.json(
        { error: 'Review is too long (max 2000 characters).' },
        { status: 400 }
      );
    }

    const systemPrompt =
      VARIANT_PROMPTS[variant as keyof typeof VARIANT_PROMPTS] || VARIANT_PROMPTS.A;
    const temperature = variant === 'C' ? 0.6 : 0.7;
    const maxTokens = variant === 'C' ? 150 : 300;

    const result = await callLLM({
      system: systemPrompt,
      user: review,
      maxTokens,
      temperature,
    });

    return NextResponse.json({ reply: result.text, variant });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
