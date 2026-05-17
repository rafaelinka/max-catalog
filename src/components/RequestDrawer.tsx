"use client"

import { useCart } from "@/context/CartContext"

export default function RequestDrawer() {
  const { items, isOpen, close, clear } = useCart()

  const totalQty = items.reduce(
    (a, i) => a + i.qty,
    0
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full max-w-sm bg-white h-full p-4 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">
            Ваша заявка ({totalQty})
          </h2>

          <button onClick={close}>✕</button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-auto">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between border-b py-2"
            >
              <div>{i.title}</div>
              <div>x{i.qty}</div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <button
          onClick={clear}
          className="mt-3 border p-2"
        >
          Очистить
        </button>

      </div>
    </div>
  )
}