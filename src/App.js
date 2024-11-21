import React from "react";
import { Login } from "./Features/auth/components/Login";
import "./index.css";
import Protected from "./Features/auth/components/Protected";
import { Signup } from "./Features/auth/components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Logout from "./Features/auth/components/Logout";
import ProtectedAdmin from "./Features/auth/components/ProtectedAdmin";
import AdminHome from "./Features/admin/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
