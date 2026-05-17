"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { sendToOperator } from "@/lib/max/sendToOperator"

export default function RequestDrawer({ open, onClose }: any) {
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  async function handleSend() {
    setLoading(true)

    const message = `
🧾 НОВАЯ ЗАЯВКА

📦 Товары:
${items.map(i => `- ${i.title} ×${i.qty}`).join("\n")}

📊 Кол-во позиций: ${totalItems}

📲 Источник: max-catalog
`

    const res = await sendToOperator(message)

    setLoading(false)

    if (res.ok) {
      setSent(true)
      clearCart()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-t-2xl p-4">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Заявка</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CONTENT */}
        {sent ? (
          <div className="text-center py-10">
            <p className="text-green-600 font-semibold">
              Заявка отправлена
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 max-h-64 overflow-auto">
              {items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{i.title}</span>
                  <span>x{i.qty}</span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSend}
              disabled={loading || items.length === 0}
              className="w-full mt-4 bg-[#0B1F3A] text-white py-2 rounded"
            >
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}