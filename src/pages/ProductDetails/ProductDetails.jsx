import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { addToCart, setBuyNowItem } from "../../redux/slices/cartSlice"
import { fetchProductById } from "../../redux/slices/productSlice"

import CartNotification from "../../components/CartNotification/CartNotification"

import { useNavigate } from "react-router-dom"

import "./ProductDetails.css"

function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  )

  const {
    selectedProduct,
    loading,
    error,
  } = useSelector((state) => state.products)

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  )

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("30")
  const [showCartNotification, setShowCartNotification] = useState(false)

  useEffect(() => {
    dispatch(fetchProductById(id))
    setQuantity(1)
    setSelectedSize("30")
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="product-status-message">
        LOADING...
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-status-message">
        {error}
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div className="product-status-message">
        PRODUCT NOT FOUND
      </div>
    )
  }

  const product = selectedProduct
  const isOutOfStock = product.stock <= 0

  const isAlreadyInCart = cartItems.some(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize
  )

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (isOutOfStock || isAlreadyInCart) return

    dispatch(
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
      })
    )

    setShowCartNotification(true)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (isOutOfStock) return

    dispatch(
      setBuyNowItem({
        ...product,
        quantity,
        size: selectedSize,
      })
    )

    navigate("/checkout")
  }

  const sizes = ["28", "30", "32", "34", "36"]

  return (
    <div className="product-details-wrapper">
      <div className="product-details-container">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-info-container">
          <span className="brand-label">
            FIND YOUR STYLE
          </span>

          <h1 className="product-title">
            {product.title}
          </h1>

          <div className="price-row">
            {product.originalPrice && (
              <span className="original-price">
                RS. {product.originalPrice}
              </span>
            )}

            <span className="current-price">
              RS. {product.price}
            </span>

            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className="sale-badge">
                  SALE
                </span>
              )}

          </div>

          <p className="taxes-included">
            TAXES INCLUDED.
          </p>

          <div className="size-section">
            <p className="section-label">SIZE</p>

            <div className="size-selector">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? "active" : ""
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <p className="section-label">
              QUANTITY ({quantity})
            </p>

            <div className="quantity-controls">
              <button
                type="button"
                className="qty-btn"
                disabled={
                  isOutOfStock || quantity <= 1
                }
                onClick={handleDecrease}
              >
                −
              </button>

              <span className="qty-number">
                {quantity}
              </span>

              <button
                type="button"
                className="qty-btn"
                disabled={
                  isOutOfStock ||
                  quantity >= product.stock
                }
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="btn-add-cart"
              disabled={isOutOfStock || isAlreadyInCart}
              onClick={handleAddToCart}
            >
              {isOutOfStock
                ? "OUT OF STOCK"
                : isAlreadyInCart
                  ? "ADDED TO CART"
                  : "ADD TO CART"}
            </button>

            <button
              type="button"
              className="btn-buy-now"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
            >
              BUY IT NOW
            </button>
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      {showCartNotification && (
        <CartNotification
          product={product}
          selectedSize={selectedSize}
          cartCount={cartCount}
          onClose={() => setShowCartNotification(false)}
        />
      )}
    </div>
  )

}

export default ProductDetails