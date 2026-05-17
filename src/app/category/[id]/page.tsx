"use client"

import Link from "next/link"
import { useMemo, useState, use } from "react"

import { products } from "@/data/products"
import { useCart } from "@/context/CartContext"

const categories = [
  {
    id: "meat",
    title: "Колбасы",
    icon: "🥩",
  },
  {
    id: "cheese",
    title: "Сыры",
    icon: "🧀",
  },
  {
    id: "milk",
    title: "Молочка",
    icon: "🥛",
  },
]

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const { items, addItem } = useCart()

  const [search, setSearch] = useState("")
  const [activeSubcategory, setActiveSubcategory] =
    useState("all")

  /* =========================
     SUBCATEGORIES
  ========================= */

  const subcategories = useMemo(() => {
    const list = products.filter(
      (p) => p.category === id
    )

    return Array.from(
      new Set(list.map((p) => p.subcategory))
    )
  }, [id])

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = p.category === id

      const matchSearch =
        p.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        p.brand
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchSub =
        activeSubcategory === "all"
          ? true
          : p.subcategory === activeSubcategory

      return (
        matchCategory &&
        matchSearch &&
        matchSub
      )
    })
  }, [id, search, activeSubcategory])

  const totalQty = items.reduce(
    (a, i) => a + i.qty,
    0
  )

  return (
    <main className="min-h-screen bg-[var(--bg)]">

      {/* ================= TOPBAR ================= */}

      <section className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">

        <div className="max-w-md mx-auto px-4 pt-4 pb-4">

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <Link
              href="/"
              className="text-[18px] font-semibold text-[var(--primary)]"
            >
              Петров Продукт
            </Link>

            {/* CART */}

            <div
              className="
                relative
                w-11 h-11
                rounded-xl
                bg-[var(--surface)]
                border border-[var(--border)]
                flex items-center justify-center
              "
            >
              <span className="text-lg text-[var(--primary)]">
                📦
              </span>

              {totalQty > 0 && (
                <div
                  className="
                    absolute -top-1 -right-1
                    min-w-[18px] h-5 px-1
                    rounded-full
                    bg-[var(--accent)]
                    text-white text-[10px]
                    flex items-center justify-center
                  "
                >
                  {totalQty}
                </div>
              )}
            </div>

          </div>

          {/* CATEGORIES */}

          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none">

            {categories.map((cat) => {
              const active = cat.id === id

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className={`
                    flex items-center gap-2
                    px-4 h-11
                    rounded-xl
                    border
                    shrink-0

                    ${
                      active
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]"
                    }
                  `}
                >
                  <span>{cat.icon}</span>

                  <span className="text-sm font-medium">
                    {cat.title}
                  </span>
                </Link>
              )
            })}

          </div>

          {/* SEARCH */}

          <div className="mt-4">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Поиск товаров..."
              className="
                w-full h-12
                rounded-xl
                bg-[var(--surface)]
                border border-[var(--border)]
                px-4 text-sm
                outline-none
                text-[var(--text)]
              "
            />

          </div>

          {/* SUBCATEGORIES */}

          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none">

            <button
              onClick={() =>
                setActiveSubcategory("all")
              }
              className={`
                px-4 h-9 rounded-full text-sm border shrink-0

                ${
                  activeSubcategory === "all"
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]"
                }
              `}
            >
              Все
            </button>

            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  setActiveSubcategory(sub)
                }
                className={`
                  px-4 h-9 rounded-full text-sm border shrink-0

                  ${
                    activeSubcategory === sub
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)]"
                  }
                `}
              >
                {sub}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="px-4 py-4">

        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">

          {filtered.map((p) => (
            <div
              key={p.id}
              className="
                bg-[var(--surface)]
                border border-[var(--border)]
                rounded-2xl
                overflow-hidden
                flex flex-col
              "
            >

              <div className="aspect-square bg-gray-100">

                <img
                  src={p.image}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="p-3 flex flex-col flex-1">

                <h3 className="text-sm font-medium text-[var(--text)]">
                  {p.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {p.brand}
                </p>

                <div className="flex justify-between text-xs mt-2 text-[var(--text-secondary)]">

                  <span>{p.country}</span>

                  <span>{p.weight}</span>

                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: p.id,
                      title: p.title,
                      qty: 1,
                    })
                  }
                  className="
                    mt-auto
                    h-10
                    rounded-xl
                    bg-[var(--primary)]
                    text-white
                    text-sm font-medium
                    mt-3
                  "
                >
                  Добавить в заявку
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  )
}