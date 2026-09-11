import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { removeFromWishlist } from "../../redux/slices/wishlistSlice"
import { addToCart } from "../../redux/slices/cartSlice"

import "./Wishlist.css"

function Wishlist() {
  const dispatch = useDispatch()

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  )

  const handleMoveToCart = (product) => {
    if (product.stock <= 0) {
      return
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    )

    dispatch(removeFromWishlist(product.id))
  }

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist-container">
        <h1 className="wishlist-title">
          YOUR WISHLIST
        </h1>

        <p className="empty-message">
          Your wishlist is currently empty ❤️
        </p>

        <Link
          to="/products"
          className="empty-wishlist-shopping-btn"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header-bar">
        <h1 className="wishlist-title">
          YOUR WISHLIST
        </h1>

        <Link
          to="/products"
          className="continue-shopping-link"
        >
          CONTINUE SHOPPING
        </Link>
      </div>

      <div className="wishlist-table">
        <div className="wishlist-table-header">
          <span className="col-product">
            PRODUCT
          </span>

          <span className="col-stock">
            STATUS
          </span>

          <span className="col-actions">
            ACTION
          </span>
        </div>

        <div className="wishlist-table-body">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="wishlist-item-row"
            >
              <div className="col-product product-info-group">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="wishlist-item-image"
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
                </div>
              </div>

              <div className="col-stock stock-status">
                {product.stock > 0 ? (
                  <span className="in-stock">
                    IN STOCK ({product.stock})
                  </span>
                ) : (
                  <span className="out-of-stock">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              <div className="col-actions item-actions">
                <button
                  type="button"
                  className="move-to-cart-btn"
                  disabled={product.stock <= 0}
                  onClick={() =>
                    handleMoveToCart(product)
                  }
                >
                  MOVE TO CART
                </button>

                <button
                  type="button"
                  className="remove-btn"
                  aria-label={`Remove ${product.title} from wishlist`}
                  onClick={() =>
                    handleRemove(product.id)
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist