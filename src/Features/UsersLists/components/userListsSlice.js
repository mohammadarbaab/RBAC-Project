// userListsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./userListsApi"; // Your API call

const initialState = {
  usersList: [],
  status: "idle",
  error: null,  // To store any error
};

// Thunk function for fetching users
export const fetchAllUsersAsync = createAsyncThunk(
  "userLists/fetchAllUsers", // Action type
  async (amount) => {
    const response = await fetchAllUsers(amount);
    return response.data;  // Data we want to store in the Redux state
  }
);

export const userListsSlice = createSlice({
  name: "userLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = "loading";  // Set loading status
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";  // Reset to idle
        state.usersList = action.payload;  // Store data in the state
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";  // Error state
        state.error = action.error.message;  // Store error message
      });
  },
});

export default userListsSlice.reducer;

export const selectAllUserLists = (state) => state.userLists.usersList;  // Access the usersList in the store
