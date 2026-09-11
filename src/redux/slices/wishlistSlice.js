import { createSlice } from "@reduxjs/toolkit"

import { login, logout } from "./authSlice"

const initialState = {
  activeUserId: null,
  items: [],
  userWishlists: {},
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload

      // Check whether product already exists
      const exists = state.items.some(
        (item) => item.id === product.id
      )

      if (!exists) {
        state.items.push(product)
      }

      if (state.activeUserId) {
        if (!state.userWishlists) {
          state.userWishlists = {}
        }

        // Save wishlist for current user
        state.userWishlists[state.activeUserId] =
          state.items
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      )

      if (state.activeUserId) {
        if (!state.userWishlists) {
          state.userWishlists = {}
        }

        // Save updated wishlist for current user
        state.userWishlists[state.activeUserId] =
          state.items
      }
    },

    clearWishlist: (state) => {
      state.items = []

      if (state.activeUserId) {
        if (!state.userWishlists) {
          state.userWishlists = {}
        }

        state.userWishlists[state.activeUserId] = []
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login, (state, action) => {
        const userId = action.payload?.id

        state.activeUserId = userId

        if (!state.userWishlists) {
          state.userWishlists = {}
        }

        state.items = userId
          ? state.userWishlists[userId] || []
          : []
      })

      .addCase(logout, (state) => {
        if (!state.userWishlists) {
          state.userWishlists = {}
        }

        if (state.activeUserId) {
          state.userWishlists[state.activeUserId] =
            state.items
        }

        state.activeUserId = null
        state.items = []
      })
  },
})

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions

export default wishlistSlice.reducer