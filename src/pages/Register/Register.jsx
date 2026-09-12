import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import { getUsers, registerUser } from "../../services/userService"

import "./Register.css"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    try {
      const email = formData.email.trim()
      const password = formData.password

      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

      if (!emailRegex.test(email)) {
        setError("Please enter a valid Gmail address.")
        return
      }

      const passwordRegex =
        /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters and contain at least one special character."
        )
        return
      }

      const response = await getUsers()
      const users = response.data

      const emailExists = users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
      )

      if (emailExists) {
        setError("An account with this email already exists.")
        return
      }

      await registerUser({
        fullName: formData.fullName.trim(),
        email,
        password,
        role: "user",
      })

      alert("Registration successful")
      navigate("/login")
    } catch (error) {
      console.error(error)
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">REGISTER</h1>

        <p className="register-subtitle">
          CREATE AN ACCOUNT TO START SHOPPING
        </p>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <div className="form-group">
            <label htmlFor="fullName">FULL NAME</label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

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
            className="register-submit-btn"
            disabled={loading}
          >
            {loading
              ? "CREATING ACCOUNT..."
              : "REGISTER"}
          </button>
        </form>

        <div className="register-footer">
          <span>ALREADY HAVE AN ACCOUNT?</span>

          <Link
            to="/login"
            className="register-link"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register