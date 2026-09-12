import api from "./api"

export const createOrder = (orderData) => {
  return api.post("/orders", orderData)
}

export const getOrders = (userId) => {
  return api.get(`/orders?userId=${userId}`)
}

export const getAllOrders = () => {
  return api.get("/orders")
}

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`)
}