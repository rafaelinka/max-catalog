import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import RequestDrawer from "@/components/RequestDrawer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>

        {/* =========================
            ERP REQUEST SYSTEM
        ========================= */}
        <CartProvider>

          {/* APP CONTENT */}
          {children}

          {/* GLOBAL DRAWER (opens only via button) */}
          <RequestDrawer />

        </CartProvider>

      </body>
    </html>
  )
}