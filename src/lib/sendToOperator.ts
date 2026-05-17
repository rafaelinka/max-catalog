export async function sendToOperator(text: string) {
  const res = await fetch("https://platform-api.max.ru/messages", {
    method: "POST",
    headers: {
      Authorization: process.env.MAX_BOT_TOKEN as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: 429341005,
      text,
    }),
  })

  const data = await res.text()

  console.log("📤 MAX RESPONSE:", data)

  return { ok: res.ok, data }
}