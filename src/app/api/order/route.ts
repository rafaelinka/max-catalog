import { NextResponse } from "next/server"
import { buildOrderMessage } from "@/lib/buildOrderMessage"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 🧠 собираем сообщение (может быть объект или строка)
    const rawMessage = buildOrderMessage(body)

    // 🔥 приводим к строке (ВАЖНО для MAX API)
    const message =
      typeof rawMessage === "string"
        ? rawMessage
        : JSON.stringify(rawMessage, null, 2)

    console.log("📦 ORDER MESSAGE:", message)

    // 🚀 отправка в MAX
    const result = await sendToOperator(message)

    console.log("📤 MAX RESULT:", result)

    // ❌ если MAX не принял
    if (!result.ok) {
      return NextResponse.json(
        {
          error: "operator failed",
          details: result.data,
        },
        { status: 500 }
      )
    }

    // ✅ успех
    return NextResponse.json({
      ok: true,
    })
  } catch (error) {
    console.error("❌ ORDER ERROR:", error)

    return NextResponse.json(
      {
        error: "internal error",
      },
      { status: 500 }
    )
  }
}