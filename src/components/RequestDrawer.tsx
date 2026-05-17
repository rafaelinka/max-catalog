"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function RequestDrawer() {
  const {
    items,
    removeItem,
    clearCart,
    isOpen,
    close,
  } = useCart()

  const [loading, setLoading] = useState(false)

  const totalQty = items.reduce(
    (a, i) => a + i.qty,
    0
  )

  async function sendOrder() {
    try {
      setLoading(true)

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error(data)
        alert("Ошибка отправки")
        return
      }

      alert("Заявка отправлена")

      clearCart()
      close()
    } catch (e) {
      console.error(e)
      alert("Ошибка сети")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-3xl
          transition-transform duration-300
          max-w-md mx-auto
          border
          min-h-[300px]
          p-4

          ${
            isOpen
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Заявка
          </h2>

          <button
            onClick={close}
            className="text-sm"
          >
            ✕
          </button>

        </div>

        {/* EMPTY */}
        {items.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            Корзина пуста
          </div>
        )}

        {/* ITEMS */}
        <div className="mt-4 flex flex-col gap-3">

          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-3 flex items-center justify-between"
            >

              <div>
                <div className="text-sm font-medium">
                  {item.name}
                </div>

                <div className="text-xs text-gray-500">
                  Кол-во: {item.qty}
                </div>
              </div>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="text-xs text-red-500"
              >
                удалить
              </button>

            </div>
          ))}

        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="mt-6">

            <div className="text-sm mb-3">
              Всего товаров: {totalQty}
            </div>

            <button
              onClick={sendOrder}
              disabled={loading}
              className="w-full h-12 rounded-xl text-white font-medium"
              style={{
                background:
                  "linear-gradient(0.5turn, rgba(20,30,48,1), rgba(40,65,111,1))",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading
                ? "Отправка..."
                : "Отправить заявку"}
            </button>

          </div>
        )}

      </div>
    </>
  )
}