import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getUsers, updateUser } from "../../services/userService"

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getUsers()

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const toggleUserBlock = createAsyncThunk(
  "users/toggleUserBlock",
  async ({ id, isBlocked }, thunkAPI) => {
    try {
      const response = await updateUser(id, {
        isBlocked,
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  users: [],
  loading: false,
  error: null,

}

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(toggleUserBlock.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(toggleUserBlock.fulfilled, (state, action) => {
        state.loading = false

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        )

        if (index !== -1) {
          state.users[index] = action.payload
        }
      })

      .addCase(toggleUserBlock.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer