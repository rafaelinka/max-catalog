import { NextResponse } from "next/server"
import { buildOrderMessage } from "@/lib/buildOrderMessage"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    console.log("📥 ORDER REQUEST START")

    const body = await req.json()

    console.log("📦 BODY:", body)

    const rawMessage = buildOrderMessage(body)

    console.log("🧠 RAW MESSAGE:", rawMessage)

    const message =
      typeof rawMessage === "string"
        ? rawMessage
        : JSON.stringify(rawMessage, null, 2)

    console.log("📨 FINAL MESSAGE:", message)

    const result = await sendToOperator(message)

    console.log("📤 SEND RESULT:", result)

    if (!result.ok) {
      return NextResponse.json(
        {
          error: "MAX API ERROR",
          details: result.data,
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      ok: true,
    })
  } catch (error: any) {
    console.error("❌ FULL ORDER ERROR:")
    console.error(error)

    return NextResponse.json(
      {
        error: "internal error",
        details: String(error),
      },
      {
        status: 500,
      }
    )
  }
}