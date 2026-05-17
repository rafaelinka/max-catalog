import { NextResponse } from "next/server"
import { buildOrderMessage } from "@/lib/buildOrderMessage"
import { sendToOperator } from "@/lib/sendToOperator"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const items = Array.isArray(body.items)
      ? body.items
      : []

    const safeBody = {
      ...body,
      items,
    }

    const rawMessage =
      buildOrderMessage(safeBody)

    const message =
      typeof rawMessage === "string"
        ? rawMessage
        : JSON.stringify(rawMessage)

    const result =
      await sendToOperator(message)

    if (!result.ok) {
      return NextResponse.json(
        { error: "operator failed" },
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