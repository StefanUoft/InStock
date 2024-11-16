// import React from 'react';
import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';
import './App.scss';
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/app.scss'



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/warehouses/:id" element={<WarehouseDetails />} />
          <Route path="*" element={<EditWarehouse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
