"use client"

import { createContext, useContext, useState, ReactNode } from "react"

/**
 * Один товар в корзине
 */
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

/**
 * Контекст корзины
 */
type CartContextType = {
  request: CartItem[]
  addItem: (product: Omit<CartItem, "qty">, qty?: number) => void
  setQty: (id: number, qty: number) => void
  removeItem: (id: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<CartItem[]>([])

  /**
   * ДОБАВИТЬ ТОВАР
   */
  const addItem = (product: Omit<CartItem, "qty">, qty = 1) => {
    setRequest((prev) => {
      const existing = prev.find((p) => p.id === product.id)

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + qty }
            : p
        )
      }

      return [...prev, { ...product, qty }]
    })
  }

  /**
   * ИЗМЕНИТЬ КОЛИЧЕСТВО
   */
  const setQty = (id: number, qty: number) => {
    setRequest((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    )
  }

  /**
   * УДАЛИТЬ ТОВАР
   */
  const removeItem = (id: number) => {
    setRequest((prev) => prev.filter((p) => p.id !== id))
  }

  /**
   * ОЧИСТИТЬ КОРЗИНУ
   */
  const clear = () => {
    setRequest([])
  }

  return (
    <CartContext.Provider
      value={{
        request,
        addItem,
        setQty,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}