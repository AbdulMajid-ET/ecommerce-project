import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { addToCart } from "../../redux/slices/cartSlice"
import { fetchProductById } from "../../redux/slices/productSlice"

import "./ProductDetails.css"

function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const {
    selectedProduct,
    loading,
    error,
  } = useSelector((state) => state.products)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("30")

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
    if (isOutOfStock) return

    dispatch(
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
      })
    )
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

            <span className="sale-badge">SALE</span>
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
                  className={`size-btn ${
                    selectedSize === size ? "active" : ""
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
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              {isOutOfStock
                ? "OUT OF STOCK"
                : "ADD TO CART"}
            </button>

            <button
              type="button"
              className="btn-buy-now"
              disabled={isOutOfStock}
            >
              BUY IT NOW
            </button>
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails