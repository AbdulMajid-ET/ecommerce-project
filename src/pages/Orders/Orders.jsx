import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchOrders } from "../../redux/slices/orderSlice"

import "./Orders.css"

function Orders() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  )

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id))
    }
  }, [dispatch, user?.id])

  if (loading) {
    return (
      <div className="orders-page center-state">
        <h2 className="state-title">LOADING ORDERS...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-page center-state">
        <p className="error-message">{error}</p>
      </div>
    )
  }
// Empty orders
  if (orders.length === 0) {
    return (
      <div className="orders-page center-state">
        <h1 className="orders-title">MY ORDERS</h1>

        <p className="empty-msg">NO ORDERS FOUND</p>

        <Link
          to="/products"
          className="continue-btn"
        >
          START SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">MY ORDERS</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
            >
              <div className="order-header">
                <div>
                  <h2 className="order-id">
                    ORDER #{order.id}
                  </h2>

                  <span className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <span
                  className={`status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-items-section">
                <h3 className="section-subtitle">
                  ITEMS
                </h3>

                <div className="items-grid">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="order-item-row"
                    >
                      <span className="item-name">
                        {item.title}
                      </span>

                      <span className="item-qty">
                        × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-footer">
                <span>TOTAL</span>

                <span className="order-total-amount">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders