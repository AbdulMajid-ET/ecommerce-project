import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchProducts } from "../../../redux/slices/productSlice"
import { fetchAllOrders } from "../../../redux/slices/orderSlice"
import { fetchUsers } from "../../../redux/slices/userSlice"

import StatCard from "../../../components/StatCard/StatCard"

import "./Dashboard.css"

function Dashboard() {
  const dispatch = useDispatch()

  const productsState = useSelector(
    (state) => state.products
  )

  const usersState = useSelector(
    (state) => state.users
  )

  const ordersState = useSelector(
    (state) => state.orders
  )

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchAllOrders())
    dispatch(fetchUsers())
  }, [dispatch])

  const isLoading =
    productsState.loading ||
    usersState.loading ||
    ordersState.loading

  const error =
    productsState.error ||
    usersState.error ||
    ordersState.error

  if (isLoading) {
    return (
      <p className="admin-dashboard-message">
        LOADING DASHBOARD...
      </p>
    )
  }

  if (error) {
    return (
      <p className="admin-dashboard-error">
        ERROR: {error}
      </p>
    )
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">
          DASHBOARD
        </h1>

        <p className="admin-dashboard-subtitle">
          OVERVIEW OF YOUR STORE
        </p>
      </div>

      <div className="admin-stat-grid">

        <StatCard
          title="Products"
          value={productsState.products.length}
        />

        <StatCard
          title="Users"
          value={usersState.users.length}
        />

        <StatCard
          title="Orders"
          value={ordersState.orders.length}
        />

      </div>

    </div>
  )
}

export default Dashboard