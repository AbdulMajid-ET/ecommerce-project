import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchAllOrders } from "../../../redux/slices/orderSlice"
import { fetchUsers } from "../../../redux/slices/userSlice"

import "./Orders.css"

import AdminPageHeader from "../../../components/AdminPageHeader/AdminPageHeader"

function AdminOrders() {
  const dispatch = useDispatch()

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  )

  const { users } = useSelector(
    (state) => state.users
  )

  useEffect(() => {
    dispatch(fetchAllOrders())
    dispatch(fetchUsers())
  }, [dispatch])

  const getUserName = (userId) => {
    const user = users.find(
      (user) => user.id === userId
    )

    return user ? user.fullName : "Unknown User"
  }

  if (loading) {
    return (
      <p className="admin-orders-message">
        LOADING ORDERS...
      </p>
    )
  }

  if (error) {
    return (
      <p className="admin-orders-error">
        ERROR: {error}
      </p>
    )
  }

  return (
    <div className="admin-orders">

      <AdminPageHeader
        title="ORDER MANAGEMENT"
        subtitle="MANAGE YOUR STORE ORDERS"
      />

      {/* Order Count */}

      <div className="admin-orders-count">
        TOTAL ORDERS: {orders.length}
      </div>

      {/* Orders Table */}

      <div className="admin-orders-table-wrapper">

        <table className="admin-orders-table">

          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {orders.length > 0 ? (

              orders.map((order) => (

                <tr key={order.id}>

                  <td className="admin-order-id">
                    {order.id}
                  </td>

                  <td>
                    {getUserName(order.userId)}
                  </td>

                  <td className="admin-order-total">
                    ₹{order.totalAmount}
                  </td>

                  <td>
                    <span className="admin-order-status">
                      {order.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="admin-order-view-btn"
                    >
                      VIEW
                    </Link>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="5"
                  className="admin-orders-empty"
                >
                  NO ORDERS FOUND.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AdminOrders