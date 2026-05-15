import { create } from "zustand"

type CartItem = {
  id: number
  title: string
  brand: string
  image?: string
  qty: number
  category: string
  subcategory: string
}

type CartState = {
  items: CartItem[]

  add: (item: Omit<CartItem, "qty">) => void
  setQty: (id: number, qty: number, item?: Omit<CartItem, "qty">) => void
  remove: (id: number) => void
  clear: () => void
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  // ➕ добавить или увеличить
  add: (item) => {
    const exists = get().items.find((i) => i.id === item.id)

    if (!exists) {
      set({ items: [...get().items, { ...item, qty: 1 }] })
    } else {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        ),
      })
    }
  },

  // 🔢 установить количество
  setQty: (id, qty, item) => {
    if (qty <= 0) {
      set({ items: get().items.filter((i) => i.id !== id) })
      return
    }

    const exists = get().items.find((i) => i.id === id)

    if (!exists && item) {
      set({
        items: [...get().items, { ...item, qty }],
      })
      return
    }

    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, qty } : i
      ),
    })
  },

  // ❌ удалить
  remove: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),

  // 🧹 очистить
  clear: () => set({ items: [] }),
}))