"use client"

import { useCart } from "@/context/CartContext"

export default function CartBar() {
  const { items, clearCart } = useCart()

  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  if (!items.length) return null

  const sendOrder = async () => {
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })

    clearCart()
    alert("Заявка отправлена")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3">
      <div className="max-w-md mx-auto bg-white border p-3 rounded-xl flex justify-between">

        <div>
          <div>Товаров: {totalQty}</div>
          <div>Позиций: {items.length}</div>
        </div>

        <div className="flex gap-2">
          <button onClick={clearCart}>Очистить</button>
          <button onClick={sendOrder}>Отправить</button>
        </div>

      </div>
    </div>
  )
}