import axios from "axios"

// Here we are creating axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api
// Now it is a reusable axios instance