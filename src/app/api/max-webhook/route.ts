import { NextResponse } from "next/server"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("📦 ORDER BODY:", body)

    // 🔥 гарантируем массив
    const items = Array.isArray(body.items) ? body.items : []

    if (items.length === 0) {
      return NextResponse.json(
        { error: "empty order" },
        { status: 400 }
      )
    }

    // 🧾 формируем текст
    const message = items
      .map(
        (i: any, idx: number) =>
          `${idx + 1}. ${i.title ?? i.name} × ${i.qty ?? 1}`
      )
      .join("\n")

    const chatId = Number(process.env.MAX_OPERATOR_CHAT_ID)

    const result = await sendToOperator(chatId, message)

    if (!result.ok) {
      return NextResponse.json(
        {
          error: "MAX failed",
          details: result.data,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("❌ ORDER ERROR:", error)

    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    )
  }
}