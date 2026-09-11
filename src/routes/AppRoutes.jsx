import { Route, Routes } from "react-router-dom"

// Layouts
import UserLayout from "../layouts/UserLayout"
import AdminLayout from "../layouts/AdminLayout"

// User Pages
import Home from "../pages/Home/Home"
import Products from "../pages/Products/Products"
import ProductDetails from "../pages/ProductDetails/ProductDetails"
import Cart from "../pages/Cart/Cart"
import Wishlist from "../pages/Wishlist/Wishlist"
import Checkout from "../pages/Checkout/Checkout"
import Orders from "../pages/Orders/Orders"
import About from "../pages/About/About"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

// User Route Protection
import ProtectedRoute from "./ProtectedRoute"
import GuestRoute from "./GuestRoute"

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin/AdminLogin"
import Dashboard from "../pages/admin/Dashboard/Dashboard"
import AdminProducts from "../pages/admin/Products/Products"
import ProductForm from "../pages/admin/Products/ProductForm"
import AdminUsers from "../pages/admin/Users/Users"
import AdminOrders from "../pages/admin/Orders/Orders"
import OrderDetails from "../pages/admin/Orders/OrderDetails"

// Admin Route Protection
import AdminProtectedRoute from "./AdminProtectedRoute"
import AdminGuestRoute from "./AdminGuestRoute"


function AppRoutes() {
  return (
    <Routes>

      {/* ==================== USER ROUTES ==================== */}

      <Route element={<UserLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

      </Route>

      <Route path="/about" element={<About />} />

      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      {/* ==================== ADMIN ROUTES ==================== */}

      {/* Admin Login */}
      <Route element={<AdminGuestRoute />}>
          <Route 
            path="/admin/login" 
            element={<AdminLogin />} 
          />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<Dashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/products/add"
            element={<ProductForm />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<ProductForm />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

          <Route
            path="/admin/orders/:id"
            element={<OrderDetails />}
          />

        </Route>
      </Route>

    </Routes>
  )
}

export default AppRoutes