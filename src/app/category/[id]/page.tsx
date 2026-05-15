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

  const { request, addItem, setQty } = useCart()

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  const categoryProducts = useMemo(() => {
    if (!products) return []
    return products.filter((p) => p.category === id)
  }, [id])

  const subcategories = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.subcategory))
    return ["all", ...Array.from(set)]
  }, [categoryProducts])

  const filtered = useMemo(() => {
    return categoryProducts.filter((p) => {
      const q = search.toLowerCase()

      return (
        (subcategory === "all" || p.subcategory === subcategory) &&
        (p.title.toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q))
      )
    })
  }, [categoryProducts, search, subcategory])

  const getQty = (id: number) =>
    request.find((p) => p.id === id)?.qty || 0

  return (
    <main className="min-h-screen bg-gray-100">

      {/* TOP */}
      <div className="sticky top-0 z-40 p-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <h1 className="text-lg font-semibold">
          {categoryNames[id]}
        </h1>

        <p className="text-xs opacity-70">
          Товаров: {filtered.length} | В заявке:{" "}
          {request.reduce((s, p) => s + p.qty, 0)}
        </p>

        <input
          className="mt-2 w-full px-3 py-2 rounded text-black text-sm"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-3 p-3 max-w-md mx-auto">

        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden border flex flex-col"
          >

            <div className="relative h-32 bg-gray-100">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="p-2 flex flex-col flex-1">

              <h2 className="text-sm font-medium line-clamp-2">
                {p.title}
              </h2>

              <p className="text-xs text-gray-500">
                {p.brand}
              </p>

              <p className="text-[11px] text-gray-400">
                {p.weight} • {p.country}
              </p>

              {/* CART CONTROLS */}
              <div className="mt-auto flex items-center justify-between border rounded-lg px-2 py-1">

                <button
                  onClick={() =>
                    setQty(p.id, Math.max(getQty(p.id) - 1, 0))
                  }
                >
                  -
                </button>

                <input
                  className="w-10 text-center text-sm outline-none"
                  value={getQty(p.id)}
                  onChange={(e) =>
                    setQty(p.id, Number(e.target.value))
                  }
                />

                {/* 🔥 FIX HERE */}
                <button
                  onClick={() =>
                    addItem(p, 1)   // ← ВАЖНО: qty теперь передаётся
                  }
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