import api from "./api"

export const createOrder = (orderData) => {
  return api.post("/orders", orderData)
}

export const getOrders = (userId) => {
  return api.get(
    `/orders?userId=${encodeURIComponent(userId)}`
  )
}

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`)
}