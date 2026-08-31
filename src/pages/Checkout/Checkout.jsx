import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { placeOrder } from "../../redux/slices/orderSlice"
import { clearCart } from "../../redux/slices/cartSlice"

import "./Checkout.css"

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.items)

  const { loading, error } = useSelector((state) => state.orders)

  const total = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )

  const handlePlaceOrder = async () => {
    if (!user?.id || cartItems.length === 0) {
      return
    }

    const orderData = {
      userId: user.id,

      items: cartItems.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      })),

      totalAmount: total,
      status: "placed",
      createdAt: new Date().toISOString(),
    }

    const result = await dispatch(placeOrder(orderData))

    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart())
      navigate("/orders")
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">
        <h1 className="checkout-title">CHECKOUT</h1>

        <p className="empty-msg">YOUR CART IS EMPTY</p>

        <Link to="/products" className="continue-btn">
          RETURN TO CATALOG
        </Link>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">CHECKOUT</h1>

        <div className="checkout-content">
          <div className="summary-card">
            <h2 className="summary-title">
              ORDER SUMMARY
            </h2>

            <div className="items-list">
              {cartItems.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="summary-item"
                >
                  <div className="item-details">
                    <span className="item-name">
                      {product.title}
                    </span>

                    <span className="item-qty">
                      ₹{product.price} × {product.quantity}
                    </span>
                  </div>

                  <span className="item-subtotal">
                    ₹{product.price * product.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="total-row">
              <span>TOTAL</span>

              <span className="total-amount">
                ₹{total}
              </span>
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button
              className="place-order-btn"
              disabled={loading}
              onClick={handlePlaceOrder}
            >
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout