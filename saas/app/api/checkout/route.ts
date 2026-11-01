import { NextResponse } from "next/server";
import Stripe from "stripe";
import { writeFile, appendFile } from "fs/promises";
import path from "path";

const TIER_TO_PRICE: Record<string, { monthly: string | undefined; annual: string | undefined }> = {
  professional: {
    monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY,
    annual: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL,
  },
  team: {
    monthly: process.env.STRIPE_PRICE_TEAM_MONTHLY,
    annual: process.env.STRIPE_PRICE_TEAM_ANNUAL,
  },
};

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey || stripeKey.includes("your_key_here")) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local to enable paid tiers. See README.md for setup steps.",
      },
      { status: 503 }
    );
  }

  // Accept both form-encoded (the <form action="/api/checkout">) and JSON
  let tier = "";
  let cadence = "monthly";
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    tier = String(form.get("tier") || "");
    cadence = String(form.get("cadence") || "monthly");
  } else if (contentType.includes("application/json")) {
    const body = await request.json();
    tier = body.tier;
    cadence = body.cadence || "monthly";
  }

  const priceConfig = TIER_TO_PRICE[tier];
  if (!priceConfig) {
    return NextResponse.json(
      { error: `Unknown tier: ${tier}. Expected 'professional' or 'team'.` },
      { status: 400 }
    );
  }

  const priceId = priceConfig[cadence as "monthly" | "annual"];
  if (!priceId || priceId.includes("price_xxx")) {
    return NextResponse.json(
      {
        error: `Stripe price ID for ${tier}/${cadence} is not configured. Set STRIPE_PRICE_${tier.toUpperCase()}_${cadence.toUpperCase()} in .env.local after creating the product in the Stripe dashboard.`,
      },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/?checkout=success`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Stripe checkout failed.";
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "checkout" });
}
