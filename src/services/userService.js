import api from "./api"

export const registerUser = (userData) => {
  return api.post("/users", userData)
}

export const getUsers = () => {
  return api.get("/users")
}

export const updateUser = (id, userData) => {
  return api.patch(`/users/${id}`, userData)
}

export const loginUser = (email, password) => {
  return api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=user`
  )
}

export const loginAdmin = (email, password) => {
  return api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=admin`
  )
}