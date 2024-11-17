import React from 'react';
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import AddWarehouse from "./components/AddWarehouse/AddWarehouse"; 
import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem";
import AddNewInventoryItem from "./components/AddNewInventoryItem/AddNewInventoryItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryList from "./components/InventoryList/InventoryList"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/warehouses/:id" element={<WarehouseDetails />} />
          <Route path="/warehouses/edit/:id" element={<EditWarehouse/>}/>
          <Route path="/warehouses/add" element={<AddWarehouse/>}/>
          <Route path="/inventory" element={<InventoryList/>}/>
          <Route path="/inventory/:id" element={<p>InventoryItemList</p>} /> 
          <Route path="/inventory/edit/:id" element={<EditInventoryItem/>} />
          <Route path="/inventory/add" element={<AddNewInventoryItem/>} />
          <Route path="*" element={<WarehouseList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
