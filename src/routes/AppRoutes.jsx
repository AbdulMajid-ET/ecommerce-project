import { Route, Routes } from "react-router-dom"

import UserLayout from "../layouts/UserLayout"

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

import ProtectedRoute from "./ProtectedRoute"

function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes