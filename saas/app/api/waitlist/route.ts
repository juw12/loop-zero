import { NextResponse } from "next/server";
import { writeFile, appendFile, readFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  let email = "";
  let source = "direct";
  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 }
    );
  }

  source = request.headers.get("referer") || "direct";

  const lead = {
    email,
    timestamp: new Date().toISOString(),
    source,
  };

  // Log to console
  console.log(`[WAITLIST] ${lead.timestamp} — ${lead.email} (source: ${source})`);

  // If a WAITLIST_FILE is set, append there too
  const file = process.env.WAITLIST_FILE;
  if (file) {
    try {
      const target = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
      try {
        await readFile(target);
      } catch {
        await writeFile(target, "", "utf-8");
      }
      await appendFile(target, JSON.stringify(lead) + "\n", "utf-8");
    } catch (err) {
      console.error("[waitlist] file write failed:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    message: "You're on the list. We'll be in touch within a week.",
  });
}
