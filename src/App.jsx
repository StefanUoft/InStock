import './App.scss'
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Header from "./components/Header/Header"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/warehouses/:id" element={<WarehouseDetails/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


    