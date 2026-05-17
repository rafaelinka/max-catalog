import { NextResponse } from "next/server"
import { sendToOperator } from "@/lib/sendToOperator"
import { buildOrderMessage } from "@/lib/buildOrderMessage"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const items = Array.isArray(body.items) ? body.items : []

    if (!items.length) {
      return NextResponse.json({ error: "empty cart" }, { status: 400 })
    }

    const message = buildOrderMessage(items)

    const chatId = Number(process.env.MAX_OPERATOR_CHAT_ID)

    const result = await sendToOperator(chatId, message)

    if (!result.ok) {
      return NextResponse.json(
        { error: "MAX error", details: result.data },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    )
  }
}