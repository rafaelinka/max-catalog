"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function RequestDrawer() {
  const { items, isOpen, close, clear } = useCart()

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const totalQty = items.reduce(
    (a, i) => a + i.qty,
    0
  )

  // ❌ если закрыт — ничего не показываем
  if (!isOpen) return null

  const buildMessage = () => {
    return items
      .map((i, idx) => {
        return `${idx + 1}. ${i.title} × ${i.qty}`
      })
      .join("\n")
  }

  const sendOrder = async () => {
    try {
      setLoading(true)

      const message = buildMessage()

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalQty,
          message,
        }),
      })

      if (!res.ok) {
        throw new Error("failed")
      }

      setSent(true)
      clear()

      setTimeout(() => {
        close()
        setSent(false)
      }, 1200)
    } catch (e) {
      alert("Ошибка отправки заявки")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

      <div className="w-full max-w-sm bg-white h-full p-4 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="font-semibold">
            Заявка ({totalQty})
          </h2>

          <button onClick={close}>
            ✕
          </button>

        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-auto">

          {items.length === 0 && (
            <div className="text-sm text-gray-500">
              Корзина пустая
            </div>
          )}

          {items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between py-2 border-b"
            >
              <div>{i.title}</div>
              <div>x{i.qty}</div>
            </div>
          ))}

        </div>

        {/* ACTIONS */}
        <div className="pt-3 flex gap-2">

          <button
            onClick={clear}
            className="flex-1 border rounded-lg p-2 text-sm"
          >
            Очистить
          </button>

          <button
            onClick={sendOrder}
            disabled={loading || items.length === 0}
            className="
              flex-1 rounded-lg p-2 text-sm text-white
              bg-blue-600 disabled:opacity-50
            "
          >
            {loading
              ? "Отправка..."
              : sent
              ? "Отправлено ✓"
              : "Отправить"}
          </button>

        </div>

      </div>
    </div>
  )
}