import Link from "next/link"

const tiles = [
  {
    title: "Каталог",
    icon: "📦",
    href: "/category/meat",
    desc: "Продукция компании",
  },
  {
    title: "Контакты",
    icon: "📞",
    href: "/contacts",
    desc: "Связаться с нами",
  },
  {
    title: "Доставка",
    icon: "🚚",
    href: "/delivery",
    desc: "Условия поставки",
  },
  {
    title: "Новинки",
    icon: "⭐",
    href: "/new",
    desc: "Новые товары",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f4f5]">

      {/* HERO */}
      <section className="px-5 pt-10 pb-6">
        <div className="max-w-md mx-auto">

          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            MAX Catalog
          </h1>

          <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
            B2B каталог продукции для оформления заявок
            и работы с операторами.
          </p>

        </div>
      </section>

      {/* TILES */}
      <section className="px-4 pb-10">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">

          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="
                bg-white
                rounded-2xl
                border
                border-neutral-200
                p-4
                min-h-[140px]
                flex
                flex-col
                justify-between
                active:scale-[0.98]
                transition
              "
            >
              <div className="text-3xl">
                {tile.icon}
              </div>

              <div>
                <h2 className="font-medium text-neutral-900">
                  {tile.title}
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  {tile.desc}
                </p>
              </div>
            </Link>
          ))}

        </div>
      </section>

    </main>
  )
}