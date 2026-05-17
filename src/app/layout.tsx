import type { Metadata } from "next"
import "./globals.css"

import { CartProvider } from "@/context/CartContext"
import RequestDrawer from "@/components/RequestDrawer"

export const metadata: Metadata = {
  title: "Петров Продукт",
  description: "B2B каталог",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>

        <CartProvider>

          {children}

          <RequestDrawer />

        </CartProvider>

      </body>
    </html>
  )
}