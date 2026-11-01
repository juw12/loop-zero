import { NextRequest, NextResponse } from "next/server";
import { writeFile, appendFile, readFile } from "fs/promises";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "leads.json");

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const lead = {
      email,
      timestamp: new Date().toISOString(),
      source: request.headers.get("referer") ?? "direct",
    };

    // Log to console
    console.log(`[LEAD] ${lead.timestamp} — ${lead.email} (source: ${lead.source})`);

    // Ensure file exists
    try {
      await readFile(LEADS_FILE);
    } catch {
      await writeFile(LEADS_FILE, "", "utf-8");
    }

    // Append one JSON object per line
    await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf-8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[LEAD:ERROR]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
