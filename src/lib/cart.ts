const KEY = "request"

export const loadCart = () => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const saveCart = (cart: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(cart))
}