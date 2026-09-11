import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"

import authReducer from "./slices/authSlice"
import adminAuthReducer from "./slices/adminAuthSlice"

import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import wishlistReducer from "./slices/wishlistSlice"
import orderReducer from "./slices/orderSlice"
import userReducer from "./slices/userSlice"

const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key))
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },

  removeItem: (key) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "adminAuth", "cart", "wishlist", "orders"],
}

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  products: productReducer,
  users: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: orderReducer,
})

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
        ],
      },
    }),
})

export const persistor = persistStore(store)