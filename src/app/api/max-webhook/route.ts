import { NextResponse } from "next/server"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("📦 ORDER BODY:", body)

    // 🔥 всегда приводим к массиву
    const items = Array.isArray(body.items) ? body.items : []

    if (items.length === 0) {
      return NextResponse.json(
        { error: "empty order" },
        { status: 400 }
      )
    }

    // 🧾 собираем текст заявки
    const message = items
      .map((i: any, idx: number) => {
        return `${idx + 1}. ${i.title ?? i.name} × ${i.qty ?? 1}`
      })
      .join("\n")

    console.log("📨 MESSAGE:", message)

    // 🟢 chat_id берём из env
    const chatId = Number(process.env.MAX_OPERATOR_CHAT_ID)

    if (!chatId) {
      console.error("❌ MAX_OPERATOR_CHAT_ID is missing")
      return NextResponse.json(
        { error: "missing chat id" },
        { status: 500 }
      )
    }

    // 🚀 отправка в MAX
    const result = await sendToOperator(chatId, message)

    console.log("📤 MAX RESULT:", result)

    // ❌ если MAX не принял
    if (!result.ok) {
      return NextResponse.json(
        {
          error: "MAX failed",
          details: result.data,
        },
        { status: 500 }
      )
    }

    // ✅ успех
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("❌ ORDER ERROR:", error)

    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    )
  }
}