import "./App.scss";
import InventoriesList from "./components/InventoryList/InventoryList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/inventory" element={<InventoriesList />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
