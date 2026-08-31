import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../redux/slices/authSlice"
import { clearCart } from "../../redux/slices/cartSlice"
import { clearWishlist } from "../../redux/slices/wishlistSlice"

import "./Navbar.css"

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.auth)

  const items = useSelector(
    (state) => state.cart?.items || []
  )

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  )

  const cartCount = items.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const handleLogout = () => {
    dispatch(clearCart())
    dispatch(clearWishlist())
    dispatch(logout())
    navigate("/")
  }

  return (
    <header className="header-wrapper">
      <div className="announcement-bar">
        <span>WEAR WHAT YOU FEEL LIKE YOU</span>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-left-group">
            <Link to="/" className="navbar-logo">
              FIND YOUR STYLE
            </Link>

            <div className="navbar-links">
              <Link to="/" className="nav-link">
                HOME
              </Link>

              <Link to="/products" className="nav-link">
                CATALOG
              </Link>

              <Link to="/about" className="nav-link">
                ABOUT
              </Link>
            </div>
          </div>

          <div className="navbar-actions">
            <Link
              to="/wishlist"
              className="icon-link"
              aria-label="Wishlist"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              {wishlistItems.length > 0 && (
                <span className="cart-badge">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="icon-link cart-icon-link"
              aria-label="Cart"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />

                <path d="M5 8h14l-1.2 12H6.2L5 8z" />
              </svg>

              {cartCount > 0 && (
                <span className="cart-badge overlapping-badge">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">
                  LOGIN
                </Link>

                <Link to="/register" className="nav-link">
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar