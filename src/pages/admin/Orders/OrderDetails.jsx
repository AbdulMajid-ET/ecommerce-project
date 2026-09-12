import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { fetchOrderById } from "../../../redux/slices/orderSlice"
import { fetchUsers } from "../../../redux/slices/userSlice"

import "./OrderDetails.css"

function OrderDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { selectedOrder, loading, error } = useSelector(
    (state) => state.orders
  )

  const { users } = useSelector(
    (state) => state.users
  )

  useEffect(() => {
    dispatch(fetchOrderById(id))
    dispatch(fetchUsers())
  }, [dispatch, id])

  const getUserName = (userId) => {
    const user = users.find(
      (user) => user.id === userId
    )

    return user ? user.fullName : "Unknown User"
  }

  if (loading) {
    return (
      <p className="admin-order-details-message">
        LOADING ORDER...
      </p>
    )
  }

  if (error) {
    return (
      <p className="admin-order-details-error">
        ERROR: {error}
      </p>
    )
  }

  if (!selectedOrder) {
    return (
      <p className="admin-order-details-message">
        ORDER NOT FOUND
      </p>
    )
  }

  return (
    <div className="admin-order-details">

      {/* Header */}

      <div className="admin-order-details-header">

        <div>
          <h1 className="admin-order-details-title">
            ORDER DETAILS
          </h1>

          <p className="admin-order-details-subtitle">
            ORDER #{selectedOrder.id}
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="admin-order-back-btn"
        >
          BACK TO ORDERS
        </Link>

      </div>

      {/* Order Information */}

      <div className="admin-order-info">

        <div className="admin-order-info-item">
          <span className="admin-order-info-label">
            ORDER ID
          </span>

          <span className="admin-order-info-value">
            {selectedOrder.id}
          </span>
        </div>

        <div className="admin-order-info-item">
          <span className="admin-order-info-label">
            USER
          </span>

          <span className="admin-order-info-value">
            {getUserName(selectedOrder.userId)}
          </span>
        </div>

        <div className="admin-order-info-item">
          <span className="admin-order-info-label">
            STATUS
          </span>

          <span className="admin-order-info-value">
            {selectedOrder.status || "Pending"}
          </span>
        </div>

        <div className="admin-order-info-item">
          <span className="admin-order-info-label">
            TOTAL
          </span>

          <span className="admin-order-info-value">
            ₹{selectedOrder.totalAmount}
          </span>
        </div>

      </div>

      {/* Items */}

      <div className="admin-order-items">

        <h2 className="admin-order-items-title">
          ORDER ITEMS
        </h2>

        {selectedOrder.items?.length > 0 ? (

          <div className="admin-order-items-list">

            {selectedOrder.items.map((item, index) => (

              <div
                key={item.id || index}
                className="admin-order-item"
              >

                <div className="admin-order-item-info">

                  <p className="admin-order-item-title">
                    {item.title}
                  </p>

                  <p className="admin-order-item-quantity">
                    QUANTITY: {item.quantity}
                  </p>

                </div>

                <p className="admin-order-item-price">
                  ₹{item.price}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="admin-order-items-empty">
            NO ITEMS FOUND.
          </p>

        )}

      </div>

    </div>
  )
}

export default OrderDetails