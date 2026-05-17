"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"

export type CartItem = {
  id: string
  title: string
  qty: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
  open: () => void
  close: () => void
  isOpen: boolean
}

const CartContext =
  createContext<CartContextType | null>(null)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id
      )

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + item.qty }
            : i
        )
      }

      return [...prev, item]
    })
  }

  function removeItem(id: string) {
    setItems((prev) =>
      prev.filter((i) => i.id !== id)
    )
  }

  function clear() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clear,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx)
    throw new Error("CartProvider missing")
  return ctx
}