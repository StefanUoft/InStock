
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WarehouseList from './components/WarehouseList/WarehouseList.jsx';
import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WarehouseList />} />
      <Route path="/warehouses/edit/:id" element={<EditWarehouse/>}/>
      <Route path="/warehouses/:id" element={<WarehouseDetails/>}/>
      <Route path="/warehouses/add" element={<p>AddWarehouse</p>}/>
      <Route path="*" element={<WarehouseList/>}/>      
      </Routes>
    </Router>
  );
}
export default App;