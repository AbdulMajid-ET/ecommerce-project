import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice"

import "./Cart.css"

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const items = useSelector((state) => state.cart.items)

  const total = items.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  )

  const handleCheckout = () => {
    if (items.length === 0) return

    navigate("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart-container">
        <h1 className="cart-title">YOUR CART</h1>

        <p className="empty-message">
          Your cart is currently empty.
        </p>

        <Link
          to="/products"
          className="continue-shopping-link"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header-bar">
        <h1 className="cart-title">YOUR CART</h1>

        <Link
          to="/products"
          className="continue-shopping-link"
        >
          CONTINUE SHOPPING
        </Link>
      </div>

      <div className="cart-table">
        <div className="cart-table-header">
          <span className="col-product">PRODUCT</span>

          <span className="col-quantity">QUANTITY</span>

          <span className="col-total">TOTAL</span>
        </div>

        <div className="cart-table-body">
          {items.map((product) => (
            <div
              key={`${product.id}-${product.size || "default"}`}
              className="cart-item-row"
            >
              <div className="col-product product-info-group">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="cart-item-image"
                />

                <div className="product-details">
                  <h2 className="product-name">
                    {product.title}
                  </h2>

                  <p className="product-price">
                    RS.{" "}
                    {product.price.toLocaleString("en-IN")}
                    .00
                  </p>

                  {product.size && (
                    <p className="product-meta">
                      SIZE: {product.size}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-quantity quantity-actions">
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity({
                          id: product.id,
                          size: product.size,
                        })
                      )
                    }
                  >
                    −
                  </button>

                  <span className="qty-number">
                    {product.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    disabled={product.quantity >= product.stock}
                    onClick={() =>
                      dispatch(
                        increaseQuantity({
                          id: product.id,
                          size: product.size,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  aria-label="Remove item"
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: product.id,
                        size: product.size,
                      })
                    )
                  }
                >
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4.5H14M3 4.5V15C3 15.8284 3.67157 16.5 4.5 16.5H11.5C12.3284 16.5 13 15.8284 13 15V4.5M5.5 4.5V3C5.5 2.17157 6.17157 1.5 7 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V4.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="col-total item-total">
                RS.{" "}
                {(
                  product.price * product.quantity
                ).toLocaleString("en-IN")}
                .00
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-footer">
        <div className="summary-box">
          <div className="total-row">
            <span className="total-label">
              ESTIMATED TOTAL
            </span>

            <span className="total-amount">
              RS.{" "}
              {total.toLocaleString("en-IN")}
              .00
            </span>
          </div>

          <p className="taxes-note">
            TAXES INCLUDED. DISCOUNTS AND SHIPPING
            CALCULATED AT CHECKOUT.
          </p>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart