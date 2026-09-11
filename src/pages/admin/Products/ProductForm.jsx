import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import {
  addProduct,
  editProduct,
  fetchProductById,
} from "../../../redux/slices/productSlice"

import "./ProductForm.css"

function ProductForm() {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: "",
    description: "",
  })

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id, isEditMode])

  useEffect(() => {
    if (isEditMode && selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        price: selectedProduct.price ?? "",
        category: selectedProduct.category || "",
        stock: selectedProduct.stock ?? "",
        thumbnail: selectedProduct.thumbnail || "",
        description: selectedProduct.description || "",
      })
    }
  }, [isEditMode, selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    try {
      if (isEditMode) {
        await dispatch(
          editProduct({
            id,
            productData,
          })
        ).unwrap()

        alert("Product updated successfully!")
      } else {
        await dispatch(
          addProduct(productData)
        ).unwrap()

        alert("Product added successfully!")
      }

      navigate("/admin/products")
    } catch (error) {
      alert("Something went wrong")
    }
  }

  return (
    <div className="admin-product-form-page">

      <div className="admin-product-form-header">
        <h1 className="admin-product-form-title">
          {isEditMode ? "EDIT PRODUCT" : "ADD PRODUCT"}
        </h1>

        <p className="admin-product-form-subtitle">
          {isEditMode
            ? "UPDATE PRODUCT INFORMATION"
            : "ADD A NEW PRODUCT TO YOUR STORE"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="admin-product-form"
      >

        <div className="admin-form-group">
          <label htmlFor="title">
            PRODUCT NAME
          </label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>


        <div className="admin-form-row">

          <div className="admin-form-group">
            <label htmlFor="price">
              PRICE
            </label>

            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder=""
              min="0"
              required
            />
          </div>


          <div className="admin-form-group">
            <label htmlFor="stock">
              STOCK
            </label>

            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder=""
              min="0"
              required
            />
          </div>

        </div>


        <div className="admin-form-group">
          <label htmlFor="category">
            CATEGORY
          </label>

          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>


        <div className="admin-form-group">
          <label htmlFor="thumbnail">
            IMAGE URL
          </label>

          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>


        <div className="admin-form-group">
          <label htmlFor="description">
            DESCRIPTION
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder=""
            rows="6"
            required
          />
        </div>


        <div className="admin-product-form-actions">

          <button
            type="button"
            className="admin-form-cancel-btn"
            onClick={() => navigate("/admin/products")}
          >
            CANCEL
          </button>

          <button
            type="submit"
            className="admin-form-submit-btn"
          >
            {isEditMode
              ? "UPDATE PRODUCT"
              : "ADD PRODUCT"}
          </button>

        </div>

      </form>

    </div>
  )
}

export default ProductForm