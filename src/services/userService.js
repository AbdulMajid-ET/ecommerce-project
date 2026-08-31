import api from "./api"

export const registerUser = (userData) => {
  return api.post("/users", userData)
}

export const getUsers = () => {
  return api.get("/users")
}

export const loginUser = (email, password) => {
  return api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  )
}