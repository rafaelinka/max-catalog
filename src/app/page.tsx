import Link from "next/link"
import { catalog } from "@/data/catalog"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3f5f7] p-4">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">

        <div
          className="rounded-lg px-5 py-5 text-white"
          style={{
            background:
              "linear-gradient(0.5turn, rgba(20,30,48,1) 0%, rgba(40,65,111,1) 100%)",
          }}
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            Каталог продукции
          </h1>

          <p className="text-sm text-white/70 mt-1">
            Оптовый ассортимент продукции
          </p>
        </div>

      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">

        {catalog.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="
              bg-white
              border
              border-gray-200
              rounded-lg
              p-4
              min-h-[140px]
              flex
              flex-col
              justify-between
              transition
              hover:border-gray-300
              hover:shadow-sm
            "
          >

            {/* ICON */}
            <div className="text-4xl">
              {cat.icon}
            </div>

            {/* TITLE */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 leading-tight">
                {cat.title}
              </h2>
            </div>

          </Link>
        ))}

      </div>

    </main>
  )
}