import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function AdminProtectedRoute() {
  const { isAuthenticated, admin } = useSelector(
    (state) => state.adminAuth
  )

  if (!isAuthenticated || admin?.role !== "admin") {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminProtectedRoute