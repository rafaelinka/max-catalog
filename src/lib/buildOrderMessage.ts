export function buildOrderMessage(request: any[]) {
  const items = request
    .map(
      (i) =>
        `• ${i.title} | x${i.qty} | ${i.weight} | ${i.country}`
    )
    .join("\n")

  const totalQty = request.reduce(
    (a, i) => a + i.qty,
    0
  )

  const totalItems = request.length

  const orderId =
    "ORD-" + Date.now().toString().slice(-6)

  const createdAt = new Date().toLocaleString("ru-RU")

  const message = `
📦 НОВАЯ ЗАЯВКА

🆔 ID: ${orderId}
🕒 Время: ${createdAt}

📋 Товары:
${items}

📊 ИТОГО:
- Позиции: ${totalItems}
- Кол-во единиц: ${totalQty}
  `.trim()

  return {
    message,
    orderId,
  }
}