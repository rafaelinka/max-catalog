export async function sendToOperator(text: string) {
  console.log("🚀 STEP 1: sendToOperator called")

  console.log("TOKEN:", process.env.MAX_BOT_TOKEN)

  try {
    const payload = {
      chat_id: 429341005,
      text,
    }

    console.log("🚀 STEP 2: payload", payload)

    const res = await fetch("https://platform-api.max.ru/messages", {
      method: "POST",
      headers: {
        Authorization: process.env.MAX_BOT_TOKEN as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("🚀 STEP 3: request sent")

    const data = await res.text()

    console.log("🚀 STEP 4: status", res.status)
    console.log("🚀 STEP 5: response", data)

    return { ok: res.ok, status: res.status, data }
  } catch (e) {
    console.log("❌ ERROR IN MAX SEND:", e)
    return { ok: false, error: e }
  }
}