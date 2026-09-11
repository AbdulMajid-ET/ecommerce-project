import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function AdminGuestRoute() {
    const isAuthenticated = useSelector(
        (state) => state.adminAuth.isAuthenticated
    )

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />
    }

    return <Outlet />
}

export default AdminGuestRoute