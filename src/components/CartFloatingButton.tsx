"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"

export default function CartFloatingButton() {
  const [open, setOpen] = useState(false)

  const items = useCart((s) => s.items)
  const setQty = useCart((s) => s.setQty)

  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  if (totalQty === 0) return null

  return (
    <>
      {/* КНОПКА */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 text-white px-4 py-3 rounded-full text-sm shadow-lg"
        style={{
          background:
            "linear-gradient(0.5turn, rgba(20,30,48,1) 0%, rgba(40,65,111,1) 100%)",
        }}
      >
        Заявка ({totalQty})
      </button>

      {/* МОДАЛКА */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3">
              Ваша заявка
            </h2>

            {/* СПИСОК */}
            {items.map((p) => (
              <div key={p.id} className="border-b py-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.brand}</p>
                  </div>

                  <div className="text-sm">{p.qty} шт</div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => setQty(p.id, p.qty - 1, p)}>
                    -
                  </button>

                  <button onClick={() => setQty(p.id, p.qty + 1, p)}>
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* КНОПКА ОТПРАВКИ */}
            <button
              className="mt-4 w-full py-2 text-white rounded-lg"
              style={{
                background:
                  "linear-gradient(0.5turn, rgba(20,30,48,1) 0%, rgba(40,65,111,1) 100%)",
              }}
              onClick={() => alert("Заявка отправлена")}
            >
              Отправить заявку
            </button>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full py-2 border rounded-lg"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}