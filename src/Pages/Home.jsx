import React from "react";
import Navbar from "../Features/Navbar/Navbar";
import AdminPanel from "../Features/Components/AdminPanel";
// import { ProductList } from "./../features/productslist/components/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <AdminPanel></AdminPanel>
      </Navbar>
    </div>
  );
}

export default Home;
