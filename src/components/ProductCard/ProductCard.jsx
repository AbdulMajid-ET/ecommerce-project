import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import { addToWishlist } from "../../redux/slices/wishlistSlice"

import "./ProductCard.css"

function ProductCard({ product }) {
  const dispatch = useDispatch()

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <button
          type="button"
          className="wishlist-button"
          aria-label="Add to Wishlist"
          onClick={(e) => {
            e.preventDefault()
            dispatch(addToWishlist(product))
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h2
          className="product-title"
          title={product.title}
        >
          {product.title}
        </h2>

        <div className="product-bottom">
          <span className="product-price">
            ₹{product.price}
          </span>

          {product.stock > 0 ? (
            <span className="stock in-stock">
              IN STOCK
            </span>
          ) : (
            <span className="stock out-stock">
              OUT OF STOCK
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="view-product"
        >
          View Product →
        </Link>
      </div>
    </article>
  )
}

export default ProductCard