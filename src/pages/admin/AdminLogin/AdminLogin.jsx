import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { adminLoginAsync } from "../../../redux/slices/adminAuthSlice"

import "./AdminLogin.css"

function AdminLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, error } = useSelector(
    (state) => state.adminAuth
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(
        adminLoginAsync({
          email,
          password,
        })
      ).unwrap()

      navigate("/admin")
    } catch (error) {

    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <h1 className="admin-login-title">
          ADMIN LOGIN
        </h1>

        <p className="admin-login-subtitle">
          ENTER YOUR DETAILS TO ACCESS THE ADMIN PANEL
        </p>

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >
          <div className="form-group">
            <label htmlFor="admin-email">
              EMAIL
            </label>

            <input
              type="email"
              id="admin-email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">
              PASSWORD
            </label>

            <input
              type="password"
              id="admin-password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-submit-btn"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminLogin