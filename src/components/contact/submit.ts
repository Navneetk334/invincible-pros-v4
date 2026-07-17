/** POST a brief to the /api/contact route (which relays it to Telegram). */
export async function sendBrief(
  source: string,
  fields: Record<string, string>,
) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, fields }),
  });
  if (!res.ok) throw new Error("send_failed");
  return true;
}
