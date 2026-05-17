export function buildOrderMessage(items: any[]) {
  return items
    .map((i, idx) => `${idx + 1}. ${i.title} × ${i.qty}`)
    .join("\n")
}