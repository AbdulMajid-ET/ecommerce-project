import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { placeOrder } from "../../redux/slices/orderSlice"
import {
  clearCart,
  clearBuyNowItem
} from "../../redux/slices/cartSlice"

import {
  reduceProductStock
} from "../../redux/slices/productSlice"

import "./Checkout.css"

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Contact State
  const [email, setEmail] = useState("")

  // Delivery Address State
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Kerala",
    pincode: "",
    phone: "",
  })

  // Billing Address Option Toggle
  const [billingOption, setBillingOption] = useState("same") // 'same' | 'different'

  // Billing Address Form State (when 'different' is selected)
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Kerala",
    pincode: "",
    phone: "",
  })

  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.items)
  const buyNowItem = useSelector((state) => state.cart.buyNowItem)

  const checkoutItems = buyNowItem ? [buyNowItem] : cartItems

  const { loading, error } = useSelector((state) => state.orders)

  const total = checkoutItems.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  )

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlaceOrder = async () => {
    if (!user?.id || checkoutItems.length === 0) return

    if (
      !email ||
      !address.firstName ||
      !address.lastName ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode ||
      !address.phone
    ) {
      alert("Please fill out all required contact and delivery fields.")
      return
    }

    if (
      billingOption === "different" &&
      (!billingAddress.firstName ||
        !billingAddress.lastName ||
        !billingAddress.address ||
        !billingAddress.city ||
        !billingAddress.state ||
        !billingAddress.pincode)
    ) {
      alert("Please fill out all required billing address fields.")
      return
    }

    const finalBillingAddress =
      billingOption === "same"
        ? { ...address, fullName: `${address.firstName} ${address.lastName}` }
        : { ...billingAddress, fullName: `${billingAddress.firstName} ${billingAddress.lastName}` }

    const orderData = {
      userId: user.id,
      email: email,
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
      shippingAddress: {
        ...address,
        fullName: `${address.firstName} ${address.lastName}`,
      },
      billingAddress: finalBillingAddress,
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
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>CHECKOUT</h1>
        <p>YOUR CART IS EMPTY</p>
        <Link to="/products">RETURN TO CATALOG</Link>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      {/* HEADER */}
      <header className="checkout-header">
        <div className="checkout-header-inner">
          <Link to="/" className="checkout-logo">
            Find Your Style
          </Link>
          <div className="checkout-bag">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0066cc"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* MAIN CHECKOUT LAYOUT */}
      <main className="checkout-layout">
        {/* LEFT SIDE */}
        <section className="checkout-left">
          {/* CONTACT */}
          <div className="checkout-section">
            <h2>Contact</h2>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-icon">?</span>
            </div>
          </div>

          {/* DELIVERY */}
          <div className="checkout-section">
            <h2>Delivery</h2>

            <div className="country-field">
              <span>Country/Region</span>
              <strong>India</strong>
              <span className="arrow">▼</span>
            </div>

            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={address.firstName}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={address.lastName}
                onChange={handleAddressChange}
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleAddressChange}
              />
              <span className="input-icon search-icon">🔍</span>
            </div>

            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              value={address.apartment}
              onChange={handleAddressChange}
            />

            <div className="form-row three">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
              />

              <div className="country-field state-select-field">
                <span>State</span>
                <select
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                >
                  <option value="Kerala">Kerala</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <span className="arrow">▼</span>
              </div>

              <input
                type="text"
                name="pincode"
                placeholder="PIN code"
                value={address.pincode}
                onChange={handleAddressChange}
              />
            </div>

            <div className="input-container">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={address.phone}
                onChange={handleAddressChange}
              />
              <span className="input-icon">?</span>
            </div>

            <label className="save-info">
              <input type="checkbox" />
              <span>Save this information for next time</span>
            </label>
          </div>

          {/* SHIPPING METHOD */}
          <div className="checkout-section">
            <h2>Shipping method</h2>
            <div className="shipping-box">
              Enter your shipping address to view available shipping methods.
            </div>
          </div>

          {/* PAYMENT */}
          <div className="checkout-section">
            <h2>Payment</h2>
            <p className="payment-subtitle">
              All transactions are secure and encrypted.
            </p>

            <div className="payment-box">
              <div className="payment-header">
                <div className="payment-title-group">
                  <span className="radio active"></span>
                  <strong>
                    Razorpay Secure (UPI, Card, Int'l Card, Apple Pay)
                  </strong>
                </div>

                <div className="payment-badges">
                  <span className="badge upi">UPI</span>
                  <span className="badge visa">VISA</span>
                  <span className="badge mc">MC</span>
                  <span className="badge count">+18</span>
                </div>
              </div>

              <div className="payment-description">
                You'll be redirected to Razorpay Secure (UPI, Card, Int'l Card,
                Apple Pay) to complete your purchase.
              </div>
            </div>
          </div>

          {/* BILLING ADDRESS */}
          <div className="checkout-section">
            <h2>Billing address</h2>

            <div className="billing-box">
              {/* Option 1: Same as shipping */}
              <label
                className={`billing-option ${
                  billingOption === "same" ? "selected" : ""
                }`}
                onClick={() => setBillingOption("same")}
              >
                <span
                  className={`radio ${billingOption === "same" ? "active" : ""}`}
                ></span>
                <span>Same as shipping address</span>
              </label>

              {/* Option 2: Use different billing address */}
              <label
                className={`billing-option ${
                  billingOption === "different" ? "selected" : ""
                }`}
                onClick={() => setBillingOption("different")}
              >
                <span
                  className={`radio ${
                    billingOption === "different" ? "active" : ""
                  }`}
                ></span>
                <span>Use a different billing address</span>
              </label>

              {/* Nested Address Form when 'different' is chosen */}
              {billingOption === "different" && (
                <div className="nested-billing-form">
                  <div className="country-field">
                    <span>Country/Region</span>
                    <strong>India</strong>
                    <span className="arrow">▼</span>
                  </div>

                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={billingAddress.firstName}
                      onChange={handleBillingAddressChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={billingAddress.lastName}
                      onChange={handleBillingAddressChange}
                    />
                  </div>

                  <div className="input-container">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={billingAddress.address}
                      onChange={handleBillingAddressChange}
                    />
                    <span className="input-icon search-icon">🔍</span>
                  </div>

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={billingAddress.apartment}
                    onChange={handleBillingAddressChange}
                  />

                  <div className="form-row three">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={billingAddress.city}
                      onChange={handleBillingAddressChange}
                    />

                    <div className="country-field state-select-field">
                      <span>State</span>
                      <select
                        name="state"
                        value={billingAddress.state}
                        onChange={handleBillingAddressChange}
                      >
                        <option value="Kerala">Kerala</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                      <span className="arrow">▼</span>
                    </div>

                    <input
                      type="text"
                      name="pincode"
                      placeholder="PIN code"
                      value={billingAddress.pincode}
                      onChange={handleBillingAddressChange}
                    />
                  </div>

                  <div className="input-container">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={billingAddress.phone}
                      onChange={handleBillingAddressChange}
                    />
                    <span className="input-icon">?</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PAY NOW BUTTON */}
          {error && <p className="error-message">{error}</p>}

          <button
            className="pay-btn"
            disabled={loading}
            onClick={handlePlaceOrder}
          >
            {loading ? "Placing order..." : "Pay now"}
          </button>
        </section>

        {/* RIGHT SIDE */}
        <aside className="checkout-right">
          <div className="order-summary">
            {checkoutItems.map((product, index) => (
              <div
                className="summary-product"
                key={`${product.id}-${index}`}
              >
                <div className="product-image-wrapper">
                  <img
                    src={
                      product.image ||
                      product.imageUrl ||
                      product.thumbnail
                    }
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="quantity-badge">{product.quantity}</span>
                </div>

                <div className="product-info">
                  <strong>{product.title}</strong>
                  <span>{product.size || ""}</span>
                </div>

                <div className="product-price">
                  ₹
                  {(product.price * product.quantity).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            ))}

            <div className="summary-row">
              <span>
                Subtotal ·{" "}
                {checkoutItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                items
              </span>
              <span>
                ₹
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="shipping-text">Enter shipping address</span>
            </div>

            <div className="summary-total">
              <strong>Total</strong>
              <div>
                <small>INR</small>
                <strong>
                  ₹
                  {total.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default Checkout