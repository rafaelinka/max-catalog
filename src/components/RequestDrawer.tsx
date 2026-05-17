"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

type Props = {
  open: boolean
  onClose: () => void
}

export default function RequestDrawer({ open, onClose }: Props) {
  const { items, clearCart } = useCart()

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend() {
    try {
      setLoading(true)
      setError(null)

      console.log("📦 SEND CLICKED")

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          orderId: Date.now().toString(),
        }),
      })

      const data = await res.json()

      console.log("📤 ORDER RESPONSE:", data)

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send order")
      }

      setSent(true)
      clearCart()

      setTimeout(() => {
        setSent(false)
        onClose()
      }, 1500)
    } catch (e: any) {
      console.error(e)
      setError(e.message || "Ошибка отправки")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      <div className="w-full bg-white rounded-t-2xl p-4 shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            Оформление заявки
          </h2>

          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[300px] overflow-y-auto mb-3">
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Корзина пуста
            </p>
          ) : (
            items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>{item.name}</span>
                <span>x{item.qty}</span>
              </div>
            ))
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {sent && (
          <div className="text-green-600 text-sm mb-2">
            Заявка отправлена ✓
          </div>
        )}

        {/* ACTION */}
        <button
          onClick={handleSend}
          disabled={loading || items.length === 0}
          className="w-full bg-[#0B1F3A] text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Отправка..." : "Отправить заявку"}
        </button>
      </div>
    </div>
  )
}