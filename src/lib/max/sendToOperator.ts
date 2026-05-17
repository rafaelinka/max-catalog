export async function sendToOperator(text: string) {
  try {
    console.log("📨 SENDING TO MAX:", text)

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

    const responseText = await res.text()

    console.log("📤 MAX STATUS:", res.status)
    console.log("📤 MAX RESPONSE:", responseText)

    return {
      ok: res.ok,
      status: res.status,
      data: responseText,
    }
  } catch (error) {
    console.error("❌ MAX SEND ERROR:", error)

    return {
      ok: false,
      error,
    }
  }
}