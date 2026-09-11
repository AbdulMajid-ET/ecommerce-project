import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from "../../services/productService"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await getProducts()

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await getProductById(id)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await createProduct(productData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await updateProduct(id, productData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, thunkAPI) => {
    try {
      await deleteProduct(id)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const reduceProductStock = createAsyncThunk(
  "products/reduceProductStock",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const response = await getProductById(id)

      const product = response.data

      if (product.stock < quantity) {
        return thunkAPI.rejectWithValue(
          `Not enough stock for ${product.title}`
        )
      }

      const newStock = product.stock - quantity

      const updateResponse = await updateProductStock(
        id,
        newStock
      )

      return updateResponse.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to update product stock"
      )
    }
  }
)

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
        state.selectedProduct = null
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false

        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        )

        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(removeProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false

        state.products = state.products.filter(
          (product) => product.id !== action.payload
        )
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(reduceProductStock.fulfilled, (state, action) => {
        state.loading = false

        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        )

        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
  },
})

export default productSlice.reducer