import { NextResponse } from "next/server";
import Stripe from "stripe";
import { appendFile, readFile, writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook not configured." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email || session.customer_email;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;
      const amount = session.amount_total;
      const currency = session.currency;

      const log = {
        type: "checkout.session.completed",
        timestamp: new Date().toISOString(),
        email: customerEmail,
        subscriptionId,
        amount: amount ? amount / 100 : null,
        currency,
        sessionId: session.id,
      };

      await appendSubscriber(log);
      console.log("[webhook] checkout completed:", customerEmail);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log("[webhook] subscription cancelled:", sub.id);
      // TODO: revoke access in your app (e.g., delete license file entry)
      break;
    }

    default:
      console.log("[webhook] unhandled event:", event.type);
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
