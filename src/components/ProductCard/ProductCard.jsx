import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice"

import { useNavigate } from "react-router-dom"

import "./ProductCard.css"

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  )

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  )

  // Check whether this product is already in wishlist
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  )

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const isOnSale =
    product.originalPrice &&
    product.originalPrice > product.price

  return (
    <article className="product-card">

      {/* Product Image */}
      <div className="product-image-container">

        <Link
          to={`/products/${product.id}`}
          className="product-image-link"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
        </Link>

        {/* Sale Badge */}
        {isOnSale && (
          <span className="sale-badge">
            SALE
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          className={`wishlist-button ${isWishlisted
              ? "wishlist-active"
              : ""
            }`}
          aria-label={
            isWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
          onClick={handleWishlistClick}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Product Information */}
      <div className="product-info">

        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <h2
            className="product-title"
            title={product.title}
          >
            {product.title}
          </h2>
        </Link>

        <div className="product-price-row">

          {isOnSale && (
            <span className="original-price">
              RS. {product.originalPrice.toLocaleString()}
            </span>
          )}

          <span className="product-price">
            RS. {product.price.toLocaleString()}
          </span>

        </div>

      </div>
    </article>
  )
}

export default ProductCard