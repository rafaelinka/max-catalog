import { NextResponse } from "next/server"
import { OPERATOR_PHONE } from "@/config/operator"
import { buildOrderMessage } from "@/lib/buildOrderMessage"

export async function POST(req: Request) {
  try {
    const { request } = await req.json()

    if (!request?.length) {
      return NextResponse.json(
        { error: "empty request" },
        { status: 400 }
      )
    }

    const { message, orderId } =
      buildOrderMessage(request)

    // 🔥 лог (пока вместо MAX)
    console.log("==============")
    console.log("ORDER:", orderId)
    console.log("TO:", OPERATOR_PHONE)
    console.log(message)
    console.log("==============")

    return NextResponse.json({
      success: true,
      orderId,
    })
  } catch (e) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}