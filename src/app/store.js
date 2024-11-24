import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/admin/userSlice.js"; 
import authReducer from "../Features/auth/authSlice.js"; 
import userListsReducer from "../Features/UsersLists/components/userListsSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    userLists: userListsReducer,
  },
});
