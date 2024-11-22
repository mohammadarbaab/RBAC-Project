
import React from "react";
import Navbar from "../Features/Navbar/Navbar";
import UserLists from "../Features/UsersLists/userLists";
// import AdminPanel from "../Features/Components/AdminPanel";
// import { ProductList } from "./../features/productslist/components/ProductList";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <UserLists></UserLists>
    </div>
  );
}

export default Home;
