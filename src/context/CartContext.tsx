"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"

export type CartItem = {
  id: string
  name: string
  qty: number
}

type CartContextType = {
  items: CartItem[]

  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void

  isOpen: boolean
  open: () => void
  close: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  /* =========================
     ADD ITEM
  ========================= */
  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: i.qty + item.qty,
              }
            : i
        )
      }

      return [...prev, item]
    })
  }

  /* =========================
     REMOVE
  ========================= */
  function removeItem(id: string) {
    setItems((prev) =>
      prev.filter((i) => i.id !== id)
    )
  }

  /* =========================
     CLEAR
  ========================= */
  function clearCart() {
    setItems([])
  }

  /* =========================
     DRAWER
  ========================= */
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <CartContext.Provider
      value={{
        items,

        addItem,
        removeItem,
        clearCart,

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

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    )
  }

  return ctx
}