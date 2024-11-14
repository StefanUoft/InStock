
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<EditWarehouse />} />
      
      </Routes>
    </Router>
  );
}
export default App;