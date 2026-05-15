"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
import { products } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { categoryNames } from "@/data/categories"

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [id, setId] = useState("")
  const [search, setSearch] = useState("")
  const [subcategory, setSubcategory] = useState("all")

  // 🧠 GLOBAL CART
  const { request, addItem, setQty } = useCart()

  // get category id
  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  // products by category
  const categoryProducts = useMemo(() => {
    if (!products) return []
    return products.filter((p) => p.category === id)
  }, [id])

  // subcategories
  const subcategories = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.subcategory))
    return ["all", ...Array.from(set)]
  }, [categoryProducts])

  // filter
  const filtered = useMemo(() => {
    return categoryProducts.filter((p) => {
      const matchSub =
        subcategory === "all" || p.subcategory === subcategory

      const q = search.toLowerCase()

      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q)

      return matchSub && matchSearch
    })
  }, [categoryProducts, search, subcategory])

  // qty from global cart
  const getQty = (id: number) =>
    request.find((p) => p.id === id)?.qty || 0

  return (
    <main className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div
        className="sticky top-0 z-40 px-4 py-3"
        style={{
          background:
            "linear-gradient(0.5turn, rgba(20,30,48,0.98), rgba(40,65,111,0.98))",
        }}
      >
        <div className="max-w-md mx-auto text-white">

          {/* 🧠 РУССКОЕ НАЗВАНИЕ */}
          <h1 className="text-lg font-semibold">
            {categoryNames[id]}
          </h1>

          <p className="text-xs text-white/70">
            Товаров: {filtered.length} | В заявке:{" "}
            {request.reduce((s, p) => s + p.qty, 0)}
          </p>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full mt-2 px-3 py-2 rounded-lg text-black text-sm"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3 p-3">

        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border overflow-hidden flex flex-col"
          >

            {/* IMAGE */}
            <div className="relative h-32 bg-gray-100">
              <Image
                src={p.image || "/placeholder.jpg"}
                alt={p.title}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* INFO */}
            <div className="p-3 flex flex-col flex-1">

              <h2 className="text-sm font-semibold line-clamp-2">
                {p.title}
              </h2>

              <p className="text-xs text-gray-500">
                {p.brand}
              </p>

              {/* weight + country */}
              <p className="text-[11px] text-gray-400 mt-1">
                {p.weight} • {p.country}
              </p>

              {/* QTY CONTROL */}
              <div className="flex items-center justify-between mt-auto border rounded-lg px-2 py-1">

                <button
                  onClick={() =>
                    setQty(p.id, Math.max(getQty(p.id) - 1, 0))
                  }
                >
                  -
                </button>

                <input
                  value={getQty(p.id)}
                  onChange={(e) =>
                    setQty(p.id, Number(e.target.value))
                  }
                  className="w-10 text-center text-sm outline-none"
                />

                <button
                  onClick={() => addItem(p, 1)}
                >
                  +
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </main>
  )
}