import { useNavigate } from "react-router-dom"

import "./CartNotification.css"

function CartNotification({
  product,
  selectedSize,
  cartCount,
  onClose,
}) {
  const navigate = useNavigate()

  const handleViewCart = () => {
    onClose()
    navigate("/cart")
  }

  const handleCheckout = () => {
    onClose()
    navigate("/checkout")
  }

  const handleContinueShopping = () => {
    onClose()
  }

  return (
    <aside className="cart-notification">
      <div className="cart-notification-header">
        <span className="cart-notification-success">
          <span className="success-check">✓</span>
          ITEM ADDED TO YOUR CART
        </span>

        <button
          type="button"
          className="cart-notification-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>

      <div className="cart-notification-product">
        <div className="cart-notification-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="cart-notification-details">
          <h3>{product.title}</h3>

          <p>
            SIZE: {selectedSize}
          </p>
        </div>
      </div>

      <div className="cart-notification-actions">
        <button
          type="button"
          className="cart-notification-view-cart"
          onClick={handleViewCart}
        >
          VIEW CART ({cartCount})
        </button>

        <button
          type="button"
          className="cart-notification-checkout"
          onClick={handleCheckout}
        >
          CHECK OUT
        </button>

        <button
          type="button"
          className="cart-notification-continue"
          onClick={handleContinueShopping}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </aside>
  )
}

export default CartNotification