"use client"

import Link from "next/link"
import { useMemo, useState, use } from "react"
import { products } from "@/data/products"
import { useCart } from "@/context/CartContext"

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const { items, addItem, open } = useCart()

  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return products.filter((p) => {
      return (
        p.category === id &&
        p.title
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    })
  }, [id, search])

  const totalQty = items.reduce(
    (a, i) => a + i.qty,
    0
  )

  return (
    <main className="p-4">

      {/* TOP */}
      <div className="flex justify-between mb-4">

        <Link href="/">Назад</Link>

        <button onClick={open}>
          🛒 {totalQty}
        </button>

      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Поиск"
        className="border p-2 w-full mb-4"
      />

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="border p-2"
          >
            <div>{p.title}</div>

            <button
              onClick={() =>
                addItem({
                  id: String(p.id),
                  title: p.title,
                  qty: 1,
                })
              }
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}