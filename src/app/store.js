import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/admin/userSlice.js"; // Import user slice
import authReducer from "../Features/auth/authSlice.js"; // Import auth slice
import userListsReducer from "../Features/UsersLists/components/userListsSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer, // Assign user slice to 'user' key
    auth: authReducer, // Assign auth slice to 'auth' key
    userLists: userListsReducer,
  },
});
