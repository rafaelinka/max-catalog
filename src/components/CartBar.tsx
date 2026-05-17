"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function CartBar() {
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const totalQty = items.reduce((s, p) => s + p.qty, 0)

  if (items.length === 0) return null

  const buildMessage = () => {
    return items
      .map((p, i) => `${i + 1}. ${p.name} × ${p.qty}`)
      .join("\n")
  }

  const sendOrder = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalQty,
          message: buildMessage(),
        }),
      })

      if (!res.ok) throw new Error()

      clearCart()

      alert("Заявка отправлена")
    } catch (e) {
      alert("Ошибка отправки заявки")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
      <div className="max-w-md mx-auto bg-white border shadow-lg rounded-xl flex items-center justify-between p-3">

        <div>
          <div className="text-sm font-semibold">
            Заявка: {totalQty} товаров
          </div>

          <div className="text-xs text-gray-500">
            Позиций: {items.length}
          </div>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => clearCart()}
            className="px-3 py-2 text-xs border rounded-lg"
          >
            Очистить
          </button>

          <button
            onClick={sendOrder}
            disabled={loading}
            className="px-4 py-2 text-xs text-white rounded-lg"
            style={{
              background:
                "linear-gradient(0.5turn, rgba(20,30,48,1), rgba(40,65,111,1))",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>

        </div>

      </div>
    </div>
  )
}