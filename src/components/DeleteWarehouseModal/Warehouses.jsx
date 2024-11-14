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
          "http://localhost:8080/api/warehouses"
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
      {/* {warehouses.map((warehouse) => ( // assuming the warehouse route has been created/imported
        <button key={warehouse.id} onClick={() => openModal(warehouse.warehouse_name)}> 
          <img src={TrashCanIcon} alt="Delete warehouse" />
        </button> // this is the trash can icon in the warehouse list
      ))} */}
      {warehouses.map((warehouse) => (
        <div
          key={warehouse.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            paddingLeft: "20px",
          }}
        >
          <span>{warehouse.warehouse_name}</span> {/* Display warehouse name */}
          <button
            onClick={() => openModal(warehouse.warehouse_name)}
            style={{ marginLeft: "10px" }}
          >
            <img src={TrashCanIcon} alt="Delete warehouse" />
          </button>
        </div>
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
