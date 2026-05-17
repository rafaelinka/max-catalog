export async function sendToOperator(chatId: number, text: string) {
  const res = await fetch("https://platform-api.max.ru/messages", {
    method: "POST",
    headers: {
      Authorization: process.env.MAX_BOT_TOKEN as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  })

  const data = await res.text()

  return {
    ok: res.ok,
    data,
  }
}