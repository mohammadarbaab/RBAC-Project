// userListsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./userListsApi"; // Your API call

const initialState = {
  usersList: [],
  status: "idle",
  error: null, // To store any error
};

// Thunk function for fetching users
export const fetchAllUsersAsync = createAsyncThunk(
  "userLists/fetchAllUsers", // Action type
  async (amount) => {
    const response = await fetchAllUsers(amount);
    return response.data; 
  }
);

export const userListsSlice = createSlice({
  name: "userLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle"; 
        state.usersList = action.payload; 
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.error.message; 
      });
  },
});

export default userListsSlice.reducer;

export const selectAllUserLists = (state) => state.userLists.usersList; 