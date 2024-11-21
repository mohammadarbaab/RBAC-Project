import { configureStore, createReducer } from "@reduxjs/toolkit";
import userReducer from "../Features/auth/authSlice.js";
import authReducer from "../Features/auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
