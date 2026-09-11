import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  fetchProducts,
  removeProduct,
} from "../../../redux/slices/productSlice"

import "./Products.css"

import AdminPageHeader from "../../../components/AdminPageHeader/AdminPageHeader"

function AdminProducts() {
  const dispatch = useDispatch()

  const { products, loading, error } = useSelector(
    (state) => state.products
  )

  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 5

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!confirmed) {
      return
    }

    try {
      await dispatch(removeProduct(id)).unwrap()

      alert("Product deleted successfully!")

      const remainingProducts = products.length - 1

      const newTotalPages = Math.ceil(
        remainingProducts / productsPerPage
      )

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
    } catch (error) {
      alert("Failed to delete product")
    }
  }

  const startIndex = (currentPage - 1) * productsPerPage

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  )

  const totalPages = Math.ceil(
    products.length / productsPerPage
  )

  if (loading) {
    return (
      <p className="admin-products-message">
        LOADING PRODUCTS...
      </p>
    )
  }

  if (error) {
    return (
      <p className="admin-products-error">
        ERROR: {error}
      </p>
    )
  }

  return (
    <div className="admin-products">

      <AdminPageHeader
        title="PRODUCT MANAGEMENT"
        subtitle="MANAGE YOUR STORE PRODUCTS"
        action={
          <Link
            to="/admin/products/add"
            className="admin-products-add-btn"
          >
            + ADD PRODUCT
          </Link>
        }
      />

      {/* Product Count */}
      <div className="admin-products-count">
        TOTAL PRODUCTS: {products.length}
      </div>

      {/* Table */}
      <div className="admin-products-table-wrapper">

        <table className="admin-products-table">

          <thead>
            <tr>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {currentProducts.length > 0 ? (

              currentProducts.map((product) => (

                <tr key={product.id}>

                  <td>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="admin-product-image"
                    />
                  </td>

                  <td className="admin-product-name">
                    {product.title}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ₹{product.price}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td>

                    <div className="admin-product-actions">

                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="admin-product-edit-btn"
                      >
                        EDIT
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="admin-product-delete-btn"
                      >
                        DELETE
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="admin-products-empty"
                >
                  NO PRODUCTS FOUND.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}
      {totalPages > 0 && (

        <div className="admin-products-pagination">

          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
            className="admin-pagination-btn"
          >
            PREVIOUS
          </button>

          <span className="admin-pagination-info">
            PAGE {currentPage} OF {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="admin-pagination-btn"
          >
            NEXT
          </button>

        </div>

      )}

    </div>
  )
}

export default AdminProducts