import React from "react";
import Navbar from "../../Navbar/Navbar";
import UserManagement from "./UserManagement";

function AdminHome() {
  return (
    <div>
      <Navbar></Navbar>
      {/* First */}
      <UserManagement></UserManagement>
    </div>
  );
}

export default AdminHome;
