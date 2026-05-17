"use client"

import { useState } from "react"
import { CartProvider } from "@/context/CartContext"
import RequestDrawer from "@/components/RequestDrawer"

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <CartProvider>
      {children}

      {/* DRAWER */}
      <RequestDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* FLOATING CART BUTTON */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-5 right-5 bg-[#0B1F3A] text-white px-4 py-3 rounded-xl shadow-lg z-50"
      >
        🧺 Корзина
      </button>
    </CartProvider>
  )
}