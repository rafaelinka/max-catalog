import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import CartBar from "@/components/CartBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          {children}
          <CartBar />
        </CartProvider>
      </body>
    </html>
  )
}