import { NextResponse } from "next/server";
import crypto from "crypto";
import { writeFile, appendFile, readFile } from "fs/promises";
import path from "path";

/**
 * Lemon Squeezy Webhook
 *
 * Configure in https://app.lemonsqueezy.com/settings/webhooks
 * URL: https://your-domain.com/api/webhook
 * Events: order_created, subscription_created, subscription_updated, subscription_cancelled
 *
 * LEMONSQUEEZY_WEBHOOK_SECRET is used to verify the signature.
 */

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Lemon Squeezy webhook not configured." },
      { status: 503 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing x-signature header." },
      { status: 400 }
    );
  }

  // Lemon Squeezy signs with HMAC-SHA256 of the raw body
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const expectedSignature = hmac.digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 401 }
    );
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const eventName = event?.meta?.event_name;
  const customerEmail = event?.data?.attributes?.user_email || event?.data?.attributes?.customer_email;
  const subscriptionId = event?.data?.id;
  const tier = event?.meta?.custom_data?.tier;
  const cadence = event?.meta?.custom_data?.cadence;

  if (eventName?.startsWith("subscription_") || eventName === "order_created") {
    const log = {
      event: eventName,
      timestamp: new Date().toISOString(),
      email: customerEmail,
      subscriptionId,
      tier,
      cadence,
    };

    await appendSubscriber(log);
    console.log(`[webhook] ${eventName}: ${customerEmail} (${tier}/${cadence})`);
  }

  return NextResponse.json({ received: true });
}

async function appendSubscriber(record: object) {
  const file = process.env.WAITLIST_FILE?.replace(/waitlist\.json$/, "subscribers.json");
  if (!file) return;
  try {
    const target = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
    try {
      await readFile(target);
    } catch {
      await writeFile(target, "", "utf-8");
    }
    await appendFile(target, JSON.stringify(record) + "\n", "utf-8");
  } catch (err) {
    console.error("[webhook] subscriber write failed:", err);
  }
}
