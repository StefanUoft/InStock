import './App.scss'
import InventoryList from './components/WarehouseInventoryList/WarehouseInventoryList'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {
  

  return (
    <>
  <BrowserRouter>
  <Header/>
      <Routes>
        <Route path="/warehouses/:id" element={<InventoryList/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


    