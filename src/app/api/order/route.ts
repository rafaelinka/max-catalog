import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  console.log("📦 NEW ORDER:", body)

  // 👉 сюда позже вставим MAX API
  // await fetch("MAX_WEBHOOK_URL", {...})

  return NextResponse.json({
    success: true,
  })
}