"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

type CartItem = {
  id: number
  title: string
  brand?: string
  weight?: number
  country?: string
  qty: number
}

type CartContextType = {
  request: CartItem[]
  addItem: (item: CartItem, qty?: number) => void
  setQty: (id: number, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const KEY = "request"

export function CartProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<CartItem[]>([])

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved) setRequest(JSON.parse(saved))
  }, [])

  // SAVE
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(request))
  }, [request])

  const addItem = (item: CartItem, qty = 1) => {
    setRequest((prev) => {
      const exists = prev.find((p) => p.id === item.id)

      if (!exists) {
        return [...prev, { ...item, qty }]
      }

      return prev.map((p) =>
        p.id === item.id
          ? { ...p, qty: p.qty + qty }
          : p
      )
    })
  }

  const setQty = (id: number, qty: number) => {
    setRequest((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    )
  }

  const clear = () => setRequest([])

  return (
    <CartContext.Provider
      value={{ request, addItem, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}