import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { placeOrder } from "../../redux/slices/orderSlice"
import { clearCart, clearBuyNowItem } from "../../redux/slices/cartSlice"

import {
  reduceProductStock
} from "../../redux/slices/productSlice"

import "./Checkout.css"

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(
    (state) => state.auth.user
  )

  const cartItems = useSelector(
    (state) => state.cart.items
  )

  const buyNowItem = useSelector(
    (state) => state.cart.buyNowItem
  )

  const checkoutItems = buyNowItem
    ? [buyNowItem]
    : cartItems

  const { loading, error } = useSelector((state) => state.orders)

  const total = checkoutItems.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  )

  const handlePlaceOrder = async () => {
    if (!user?.id || checkoutItems.length === 0) return

    const orderData = {
      userId: user.id,
      items: checkoutItems.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
      })),
      totalAmount: total,
      status: "placed",
      createdAt: new Date().toISOString(),
    }

    const result = await dispatch(placeOrder(orderData))

    if (placeOrder.fulfilled.match(result)) {
      try {
        for (const item of checkoutItems) {
          await dispatch(
            reduceProductStock({
              id: item.id,
              quantity: item.quantity,
            })
          ).unwrap()
        }

        if (buyNowItem) {
          dispatch(clearBuyNowItem())
        } else {
          dispatch(clearCart())
        }

        navigate("/orders")
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
  }

  if (checkoutItems.length === 0) {
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
              {checkoutItems.map((product, index) => (
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