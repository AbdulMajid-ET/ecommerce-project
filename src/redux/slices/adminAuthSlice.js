import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { loginAdmin } from "../../services/userService"

export const adminLoginAsync = createAsyncThunk(
  "adminAuth/adminLoginAsync",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginAdmin(email, password)

      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue(
          "Invalid admin email or password"
        )
      }

      const admin = response.data[0]

      return {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Something went wrong. Please try again."
      )
    }
  }
)

const initialState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const adminAuthSlice = createSlice({
  name: "adminAuth",

  initialState,

  reducers: {
    adminLogout: (state) => {
      state.admin = null
      state.isAuthenticated = false
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.admin = action.payload
        state.isAuthenticated = true
        state.error = null
      })

      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.loading = false
        state.admin = null
        state.isAuthenticated = false
        state.error = action.payload
      })
  },
})

export const { adminLogout } = adminAuthSlice.actions

export default adminAuthSlice.reducer