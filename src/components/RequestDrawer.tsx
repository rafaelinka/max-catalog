"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function RequestDrawer() {
  const {
    request,
    removeItem,
    clear,
    isOpen,
    close,
  } = useCart()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<null | string>(null)

  if (!isOpen) return null

  const totalQty = request.reduce((a, i) => a + i.qty, 0)

  /* =========================
     SEND ORDER
  ========================= */
  const sendOrder = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(data.orderId)

        // очищаем заявку
        clear()

        // закрываем через паузу
        setTimeout(() => {
          setSuccess(null)
          close()
        }, 2000)
      } else {
        alert("Ошибка отправки заявки")
      }
    } catch (e) {
      alert("Ошибка сети")
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={close}
      />

      {/* PANEL */}
      <div className="
        absolute bottom-0 left-0 right-0
        max-w-md mx-auto
        bg-[var(--surface)]
        border-t border-[var(--border)]
        rounded-t-2xl
        p-4
      ">

        {/* =========================
            SUCCESS STATE
        ========================= */}
        {success ? (
          <div className="py-10 text-center">

            <div className="text-[var(--primary)] font-semibold text-lg">
              Заявка отправлена
            </div>

            <div className="text-sm text-gray-500 mt-2">
              ID: {success}
            </div>

          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="mb-3">
              <div className="text-[var(--primary)] font-semibold">
                Заявка
              </div>

              <div className="text-xs text-gray-500">
                Позиции: {totalQty}
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-2 max-h-60 overflow-y-auto">

              {request.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex justify-between
                    items-center
                    p-2
                    border border-[var(--border)]
                    rounded-xl
                  "
                >
                  <div>
                    <div className="text-sm font-medium">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      x{item.qty}
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500"
                  >
                    удалить
                  </button>
                </div>
              ))}

            </div>

            {/* ACTIONS */}
            <button
              onClick={sendOrder}
              disabled={loading || request.length === 0}
              className="
                mt-3 w-full h-11
                bg-[var(--primary)]
                text-white
                rounded-xl
                font-medium
                disabled:opacity-50
              "
            >
              {loading
                ? "Отправка..."
                : "Отправить оператору"}
            </button>
          </>
        )}

      </div>
    </div>
  )
}