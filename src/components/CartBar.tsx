"use client"

import { useCart } from "@/context/CartContext"

export default function CartBar() {
  const { items, clearCart } = useCart()

  const totalQty = items.reduce((s, p) => s + p.qty, 0)

  if (items.length === 0) return null

  const sendOrder = async () => {
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      })

      alert("Заявка отправлена в MAX")
      clearCart()
    } catch (e) {
      alert("Ошибка отправки")
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
      <div className="max-w-md mx-auto bg-white border rounded-xl p-3 flex justify-between">

        <div>
          <div>Товаров: {totalQty}</div>
          <div>Позиций: {items.length}</div>
        </div>

        <div className="flex gap-2">
          <button onClick={clearCart}>
            Очистить
          </button>

          <button onClick={sendOrder}>
            Отправить
          </button>
        </div>

      </div>
    </div>
  )
}