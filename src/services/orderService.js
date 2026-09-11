import api from "./api"

// Place order
export const createOrder = (orderData) => {
  return api.post("/orders", orderData)
}

// Give me all orders belonging to this user.
export const getOrders = (userId) => {
  return api.get(
    `/orders?userId=${encodeURIComponent(userId)}`
  )
}

// Give me all orders for admin.
export const getAllOrders = () => {
  return api.get("/orders")
}

// Give me one specific order.
export const getOrderById = (id) => {
  return api.get(`/orders/${id}`)
}