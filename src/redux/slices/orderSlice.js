import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
  createOrder,
  getOrders,
  getAllOrders,
  getOrderById,
} from "../../services/orderService"

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await createOrder(orderData)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, thunkAPI) => {
    try {
      const response = await getOrders(userId)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await getAllOrders()

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, thunkAPI) => {
    try {
      const response = await getOrderById(id)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PLACE ORDER

      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // FETCH USER ORDERS

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // FETCH ALL ORDERS

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })

      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // FETCH SINGLE ORDER

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
        state.selectedOrder = null
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedOrder = action.payload
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer