"use client"

import { createContext, useContext, useState } from "react"

export type CartItem = {
  id: number
  title: string
  brand: string
  category: string
  subcategory: string
  country: string
  weight: string
  image: string
  url: string
  qty: number
}

type CartContextType = {
  request: CartItem[]
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void
  removeItem: (id: number) => void
  clear: () => void

  // 🔥 NEW: drawer control
  isOpen: boolean
  open: () => void
  close: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [request, setRequest] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  /* =========================
     ADD ITEM
  ========================= */
  const addItem = (
    item: Omit<CartItem, "qty">,
    qty: number = 1
  ) => {
    setRequest((prev) => {
      const existing = prev.find((p) => p.id === item.id)

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, qty: p.qty + qty }
            : p
        )
      }

      return [...prev, { ...item, qty }]
    })
  }

  const removeItem = (id: number) => {
    setRequest((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  const clear = () => setRequest([])

  /* =========================
     DRAWER CONTROL
  ========================= */
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <CartContext.Provider
      value={{
        request,
        addItem,
        removeItem,
        clear,
        isOpen,
        open,
        close,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx)
    throw new Error("useCart must be used inside CartProvider")
  return ctx
}