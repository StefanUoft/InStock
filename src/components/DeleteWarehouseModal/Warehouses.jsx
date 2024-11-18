import React, { useState, useEffect } from "react";
import DeleteWarehouseModal from "./DeleteWarehouseModal";
import axios from "axios";
import TrashCanIcon from "../../assets/Icons/delete_outline-24px.svg";

function Warehouses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  // *** grabbing warehouse data start ***
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/warehouses"
        );

        if (Array.isArray(response.data)) {
          setWarehouses(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  // *** grabbing warehouse data end ***

  const openModal = (warehouseName) => {
    setSelectedWarehouse(warehouseName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteWarehouse = () => {
    console.log(`Deleting ${selectedWarehouse}`);
    closeModal();
  };

  return (
    <div>
      <h1>Warehouse list</h1>
      {warehouses.map((warehouse) => ( // assuming the warehouse route has been created/imported
        <button key={warehouse.id} onClick={() => openModal(warehouse.warehouse_name)}> 
          <img src={TrashCanIcon} alt="Delete warehouse" />
        </button> // this is the trash can icon in the warehouse list
      ))}

      <DeleteWarehouseModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onDelete={deleteWarehouse}
        itemName={selectedWarehouse}
      />
    </div>
  );
}

export default Warehouses;
