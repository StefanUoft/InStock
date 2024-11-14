import './App.scss'
import WarehouseInventoryList from './components/WarehouseInventoryList/WarehouseInventoryList'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
  <BrowserRouter>
      <Routes>
        <Route path="/inventory" element={<WarehouseInventoryList/>}/>
        <Route path="/warehouses/:id" element={<warehouseDetails/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


    