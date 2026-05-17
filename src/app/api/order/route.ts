import { NextResponse } from "next/server"
import { buildOrderMessage } from "@/lib/buildOrderMessage"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const message = buildOrderMessage(body)

    const result = await sendToOperator(message)

    // ✅ ВАЖНО: используем ok, а не success
    if (!result.ok) {
      return NextResponse.json(
        { error: "operator failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("ORDER ERROR:", error)

    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    )
  }
}