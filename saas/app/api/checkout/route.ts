import { NextResponse } from "next/server";
import { writeFile, appendFile } from "fs/promises";
import path from "path";

/**
 * Lemon Squeezy Checkout
 *
 * Required env vars:
 *   LEMONSQUEEZY_API_KEY       — from https://app.lemonsqueezy.com/settings/api
 *   LEMONSQUEEZY_STORE_ID      — from your store URL: lemonsqueezy.com/store/{STORE_ID}
 *   LEMONSQUEEZY_VARIANT_PRO_MONTHLY  — variant ID for Professional monthly
 *   LEMONSQUEEZY_VARIANT_PRO_ANNUAL   — variant ID for Professional annual
 *   LEMONSQUEEZY_VARIANT_TEAM_MONTHLY — variant ID for Team monthly
 *   LEMONSQUEEZY_VARIANT_TEAM_ANNUAL  — variant ID for Team annual
 */

const TIER_TO_VARIANT: Record<string, Record<string, string | undefined>> = {
  professional: {
    monthly: process.env.LEMONSQUEEZY_VARIANT_PRO_MONTHLY,
    annual: process.env.LEMONSQUEEZY_VARIANT_PRO_ANNUAL,
  },
  team: {
    monthly: process.env.LEMONSQUEEZY_VARIANT_TEAM_MONTHLY,
    annual: process.env.LEMONSQUEEZY_VARIANT_TEAM_ANNUAL,
  },
};

export async function POST(request: Request) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!apiKey || apiKey.includes("your_key_here")) {
    return NextResponse.json(
      {
        error:
          "Lemon Squeezy is not configured. Set LEMONSQUEEZY_API_KEY in .env.local to enable paid tiers. See saas/README.md.",
      },
      { status: 503 }
    );
  }

  if (!storeId || storeId.includes("your_store")) {
    return NextResponse.json(
      {
        error:
          "LEMONSQUEEZY_STORE_ID is not set. Get it from your Lemon Squeezy store URL.",
      },
      { status: 503 }
    );
  }

  let tier = "";
  let cadence: "monthly" | "annual" = "monthly";
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    tier = String(form.get("tier") || "");
    cadence = (String(form.get("cadence") || "monthly") as "monthly" | "annual");
  } else if (contentType.includes("application/json")) {
    const body = await request.json();
    tier = body.tier;
    cadence = body.cadence || "monthly";
  }

  const variantId = TIER_TO_VARIANT[tier]?.[cadence];
  if (!variantId || variantId.includes("your_variant")) {
    return NextResponse.json(
      {
        error: `Variant for ${tier}/${cadence} is not configured. Set LEMONSQUEEZY_VARIANT_${tier.toUpperCase()}_${cadence.toUpperCase()} in .env.local after creating the product.`,
      },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_options: {
              embed: false,
              media: false,
              logo: true,
              desc: true,
              discount: true,
              dark: true,
              subscription_preview: true,
              button_color: "#C97B24",
            },
            checkout_data: {
              email: "",
              custom: {
                tier,
                cadence,
              },
            },
            product_options: {
              redirect_url: `${siteUrl}/?checkout=success`,
              receipt_button_text: "Go to your account",
              receipt_thank_you_note: "Welcome to Loop Zero! Check your email for setup instructions.",
            },
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[lemon-squeezy] checkout error:", res.status, body);
      return NextResponse.json(
        { error: `Lemon Squeezy API error (${res.status})` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const url = data.data?.attributes?.url;

    if (!url) {
      return NextResponse.json(
        { error: "Lemon Squeezy did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(url, 303);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout creation failed.";
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "checkout", provider: "lemon-squeezy" });
}
