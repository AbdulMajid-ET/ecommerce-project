import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../../services/userService"
import { login } from "../../redux/slices/authSlice"

import "./Login.css"

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await loginUser(
        formData.email,
        formData.password
      )

      const users = response.data

      if (users.length === 0) {
        setError("Invalid email or password")
        return
      }

      const user = users[0]

      if (user.isBlocked) {
        setError("Your account has been blocked.")
        return
      }

      const safeUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }

      dispatch(login(safeUser))
      navigate("/")
    } catch (error) {
      console.error(error)
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>

        <p className="login-subtitle">
          ENTER YOUR DETAILS TO ACCESS YOUR ACCOUNT
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit-btn"
          >
            LOGIN
          </button>
        </form>

        <div className="login-footer">
          <span>DON'T HAVE AN ACCOUNT?</span>

          <Link
            to="/register"
            className="login-link"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login