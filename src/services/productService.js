import api from "./api"

export const getProducts = () => {
  return api.get("/products")
}

export const getProductById = (id) => {
  return api.get(`/products/${id}`)
}

// Admin: Add product
export const createProduct = (productData) => {
  return api.post("/products", productData)
}

// Admin: Update product
export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData)
}

// Admin: Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`)
}

export const updateProductStock = (id, stock) =>
  api.patch(`/products/${id}`, { stock })