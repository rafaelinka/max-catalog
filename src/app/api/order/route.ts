import { NextResponse } from "next/server"
import { buildOrderMessage } from "@/lib/buildOrderMessage"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const { request } = await req.json()

    if (!request?.length) {
      return NextResponse.json(
        { error: "empty request" },
        { status: 400 }
      )
    }

    // 📦 формируем ERP заявку
    const { message, orderId } =
      buildOrderMessage(request)

    // 📤 отправляем оператору
    const result = await sendToOperator(message)

    if (!result.success) {
      return NextResponse.json(
        { error: "operator failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orderId,
      operator: "MAX_READY",
    })
  } catch (e) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}