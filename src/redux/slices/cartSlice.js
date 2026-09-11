import { createSlice } from "@reduxjs/toolkit"

import { login, logout } from "./authSlice"

const initialState = {
  activeUserId: null,
  items: [],
  userCarts: {},
  buyNowItem: null,
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

      // If the same product with the same size
      // is already in the cart, do not add it again.
      if (existingProduct) {
        return
      }

      state.items.push({
        ...product,
        quantity: product.quantity || 1,
      })

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

    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null
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
  setBuyNowItem,
  clearBuyNowItem,
} = cartSlice.actions

export default cartSlice.reducer