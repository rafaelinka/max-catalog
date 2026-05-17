import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("📩 MAX WEBHOOK EVENT:", JSON.stringify(body, null, 2))

    // ====== Достаём базовые данные пользователя ======
    const chatId = body?.chat?.id
    const user = body?.user
    const message = body?.message?.text

    // ====== пример логики ======
    if (!chatId) {
      return NextResponse.json({ ok: false, error: "no chatId" }, { status: 400 })
    }

    console.log("👤 CHAT ID:", chatId)
    console.log("👤 USER:", user)
    console.log("💬 MESSAGE:", message)

    // ====== тут позже подключим CRM / заявки ======
    // например: сохранить в базу

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("WEBHOOK ERROR:", e)

    return NextResponse.json(
      { ok: false, error: "invalid request" },
      { status: 500 }
    )
  }
}