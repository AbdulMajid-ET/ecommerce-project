import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { adminLogout } from "../../redux/slices/adminAuthSlice"
import "./AdminHeader.css"

function AdminHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(adminLogout())
    navigate("/admin/login")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="admin-header-wrapper">

      <nav className="admin-navbar">
        <div className="admin-navbar-container">

          <Link
            to="/admin"
            className="admin-navbar-logo"
          >
            FASHION STORE
          </Link>

          <div className="admin-navbar-links">

            <Link
              to="/admin"
              className={`admin-nav-link ${isActive("/admin") ? "active" : ""
                }`}
            >
              DASHBOARD
            </Link>

            <Link
              to="/admin/products"
              className={`admin-nav-link ${isActive("/admin/products") ? "active" : ""
                }`}
            >
              PRODUCTS
            </Link>

            <Link
              to="/admin/users"
              className={`admin-nav-link ${isActive("/admin/users") ? "active" : ""
                }`}
            >
              USERS
            </Link>

            <Link
              to="/admin/orders"
              className={`admin-nav-link ${isActive("/admin/orders") ? "active" : ""
                }`}
            >
              ORDERS
            </Link>

          </div>

          <div className="admin-navbar-actions">

            <button
              type="button"
              className="admin-logout-button"
              onClick={handleLogout}
            >
              LOGOUT
            </button>

          </div>

        </div>
      </nav>

    </header>
  )
}

export default AdminHeader