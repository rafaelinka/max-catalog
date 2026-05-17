export async function sendToOperator(text: string) {
  const res = await fetch("https://platform-api.max.ru/messages", {
    method: "POST",
    headers: {
      Authorization: process.env.MAX_BOT_TOKEN as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: 429341005, // твой оператор
      text: text,
    }),
  })

  const data = await res.json()

  console.log("📤 MAX SEND RESULT:", data)

  return data
}