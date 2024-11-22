// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUser } from "./userApi";

// Async thunks for API calls
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await fetchUsers();
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  return await createUser(user);
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, user }) => {
    return await updateUser(id, user);
  }
);

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

// Slice
const userSlice = createSlice({
  name: "employe",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;