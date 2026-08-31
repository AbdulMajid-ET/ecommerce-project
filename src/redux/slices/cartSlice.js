import { createSlice } from "@reduxjs/toolkit"

import { login, logout } from "./authSlice"

const initialState = {
  activeUserId: null,
  items: [],
  userCarts: {},
}

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload

      const existingProduct = state.items.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size
      )

      if (existingProduct) {
        const newQuantity =
          existingProduct.quantity +
          (product.quantity || 1)

        existingProduct.quantity = Math.min(
          newQuantity,
          existingProduct.stock
        )
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        })
      }

      if (state.activeUserId) {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.userCarts[state.activeUserId] = state.items
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size
      )

      if (state.activeUserId) {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.userCarts[state.activeUserId] = state.items
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
      )

      if (item && item.quantity < item.stock) {
        item.quantity += 1
      }

      if (state.activeUserId) {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.userCarts[state.activeUserId] = state.items
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
      )

      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(
          (product) =>
            product.id !== action.payload.id ||
            product.size !== action.payload.size
        )
      }

      if (state.activeUserId) {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.userCarts[state.activeUserId] = state.items
      }
    },

    clearCart: (state) => {
      state.items = []

      if (state.activeUserId) {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.userCarts[state.activeUserId] = []
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login, (state, action) => {
        const userId = action.payload?.id

        state.activeUserId = userId

        if (!state.userCarts) {
          state.userCarts = {}
        }

        state.items = userId
          ? state.userCarts[userId] || []
          : []
      })

      .addCase(logout, (state) => {
        if (!state.userCarts) {
          state.userCarts = {}
        }

        if (state.activeUserId) {
          state.userCarts[state.activeUserId] = state.items
        }

        state.activeUserId = null
        state.items = []
      })
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer