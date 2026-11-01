import { NextRequest, NextResponse } from "next/server";

/**
 * Contact lead endpoint.
 *
 * Intentionally minimal: the portfolio has no database. Submissions are logged
 * to the server console and a 200 is returned so the form can show a success
 * state. To actually deliver leads, add an email/CRM call here (and a real
 * secret in your environment).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    // Basic validation — we still return 200 for a friendly UX, but only log
    // well-formed leads.
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const lead = {
      receivedAt: new Date().toISOString(),
      name: name || null,
      email: isValidEmail ? email : "(missing/invalid email)",
      message: message || null,
      valid: isValidEmail,
    };

    // eslint-disable-next-line no-console
    console.log("[contact] new lead:", JSON.stringify(lead, null, 2));

    return NextResponse.json({ ok: true, received: isValidEmail }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact] failed to parse request:", err);
    // Still 200 so the UI never hard-fails; the body signals the error.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
