import rawProducts from "./products.json"

export const products = Array.isArray(rawProducts)
  ? rawProducts
  : []