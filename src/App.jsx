import React from "react";
// import "./App.scss";
// import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';
// import AddWarehouse from './components/AddWarehouse/AddWarehouse.jsx';
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/app.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/warehouses/:id" element={<WarehouseDetails />} />{" "}
          {/* <Route path="/" element={<AddWarehouse />} /> */}
          {/* <Route path="/edit-warehouse" element={<EditWarehouse />} /> */}{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
