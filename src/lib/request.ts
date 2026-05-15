export const loadRequest = () => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("request")
  return data ? JSON.parse(data) : []
}

export const saveRequest = (request: any[]) => {
  localStorage.setItem("request", JSON.stringify(request))
}