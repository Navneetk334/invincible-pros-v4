import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Messaging is not configured." },
      { status: 500 },
    );
  }

  let payload: { source?: string; fields?: Record<string, string> };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const source = payload.source || "Website";
  const fields = payload.fields || {};

  const lines = [
    "🚀 <b>New project brief — INVINCIBLE PROS.</b>",
    `<b>Source:</b> ${esc(source)}`,
    "",
    ...Object.entries(fields)
      .filter(([, v]) => v && String(v).trim().length > 0)
      .map(([k, v]) => `<b>${esc(k)}:</b> ${esc(String(v))}`),
  ];

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not deliver the message." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not deliver the message." },
      { status: 502 },
    );
  }
}
